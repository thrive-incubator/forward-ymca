import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Region } from '@/data/types';

interface SanDiegoMapProps {
  onSelectRegion: (region: Region) => void;
  isKidMode: boolean;
}

const REGION_FILLS: Record<Region, string> = {
  north: '#f68b1f',
  coastal: '#177fb2',
  central: '#6e7f3a',
  south: '#7fd3e6',
  east: '#c9dd7a',
};

const REGION_FILLS_HOVER: Record<Region, string> = {
  north: '#e07a10',
  coastal: '#126a96',
  central: '#5c6b2e',
  south: '#6ac4d8',
  east: '#b8d060',
};

const LEGEND_ITEMS: { region: Region; label: string; kidLabel: string; emoji: string; color: string }[] = [
  { region: 'north', label: 'North County', kidLabel: 'Up North!', emoji: '🏖️', color: '#f68b1f' },
  { region: 'coastal', label: 'Coastal', kidLabel: 'By the Beach!', emoji: '🌊', color: '#177fb2' },
  { region: 'central', label: 'Central SD', kidLabel: 'Downtown!', emoji: '🏙️', color: '#6e7f3a' },
  { region: 'south', label: 'South Bay', kidLabel: 'Down South!', emoji: '☀️', color: '#7fd3e6' },
  { region: 'east', label: 'East County', kidLabel: 'Out East!', emoji: '🏔️', color: '#c9dd7a' },
];

// County silhouette path (single source of truth)
const COUNTY_PATH = `M160,115
  C150,90 160,75 185,70
  L720,70
  C745,72 750,85 750,105
  L750,410
  C748,440 735,450 708,455
  L260,470
  C220,472 205,455 202,428
  L196,360
  C194,340 182,330 162,320
  C132,306 125,290 146,275
  C175,255 188,238 192,210
  L198,165
  C202,145 215,132 240,125
  L270,118
  Z`;

export default function SanDiegoMap({ onSelectRegion, isKidMode }: SanDiegoMapProps) {
  const [hovered, setHovered] = useState<Region | null>(null);

  function getFill(region: Region) {
    return hovered === region ? REGION_FILLS_HOVER[region] : REGION_FILLS[region];
  }

  function regionProps(region: Region) {
    return {
      onClick: () => onSelectRegion(region),
      onMouseEnter: () => setHovered(region),
      onMouseLeave: () => setHovered(null),
      style: {
        cursor: 'pointer' as const,
        transition: 'filter 0.12s ease',
        filter: hovered === region ? 'brightness(1.06)' : 'none',
      },
    };
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full"
    >
      {/* Legend above map */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-4">
        {LEGEND_ITEMS.map((item) => (
          <button
            key={item.region}
            type="button"
            onClick={() => onSelectRegion(item.region)}
            onMouseEnter={() => setHovered(item.region)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80"
          >
            <span
              className="w-4 h-4 rounded-sm shrink-0 border border-warmblack-200"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm font-display font-bold text-warmblack-700">
              {item.emoji} {isKidMode ? item.kidLabel : item.label}
            </span>
          </button>
        ))}
      </div>

      {/* SVG Map */}
      <svg
        viewBox="0 0 864 540"
        role="img"
        aria-label="San Diego County regions map"
        className="w-full h-auto block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path id="countyShape" d={COUNTY_PATH} />
          <clipPath id="clipCounty">
            <use href="#countyShape" />
          </clipPath>
        </defs>

        {/* White base fill */}
        <use href="#countyShape" fill="#ffffff" />

        {/* All regions clipped to county silhouette */}
        <g clipPath="url(#clipCounty)">

          {/* 5: North County — oversized slab, clipped to county top */}
          <g {...regionProps('north')}>
            <path
              fill={getFill('north')}
              stroke="#0f172a"
              strokeWidth={4}
              d="M120,50 L800,50 L800,255 L120,255 Z"
            />
          </g>

          {/* 2: East County — big block on right */}
          <g {...regionProps('east')}>
            <path
              fill={getFill('east')}
              stroke="#0f172a"
              strokeWidth={4}
              d="M430,210 L820,210 L820,520 L360,520 L360,300
                 C370,270 395,250 430,240 Z"
            />
          </g>

          {/* 3: Central SD — blob in middle-left */}
          <g {...regionProps('central')}>
            <path
              fill={getFill('central')}
              stroke="#0f172a"
              strokeWidth={4}
              d="M210,240
                 C270,210 360,230 405,245
                 C430,255 430,290 405,315
                 C380,345 365,360 360,395
                 L360,435
                 L285,435
                 C250,430 235,415 220,395
                 C205,370 195,340 200,305
                 C205,275 210,260 210,240 Z"
            />
          </g>

          {/* 4: Coastal — left coastal strip, oversized to fill county edge */}
          <g {...regionProps('coastal')}>
            <path
              fill={getFill('coastal')}
              stroke="#0f172a"
              strokeWidth={4}
              d="M100,100 L210,100 L210,240 L210,300 L200,400 L200,500 L100,500 Z"
            />
          </g>

          {/* 1: South Bay — bottom-left band */}
          <g {...regionProps('south')}>
            <path
              fill={getFill('south')}
              stroke="#0f172a"
              strokeWidth={4}
              d="M120,400 L420,400 L420,520 L120,520 Z"
            />
          </g>

        </g>

        {/* County outline on top */}
        <use href="#countyShape" fill="none" stroke="#0f172a" strokeWidth={6} style={{ pointerEvents: 'none' }} />

        {/* District numbers */}
        <text x={450} y={165} textAnchor="middle" dominantBaseline="central" fontFamily="ui-sans-serif, system-ui" fontWeight={800} fontSize={28} fill="rgba(15,23,42,0.8)" style={{ pointerEvents: 'none' }}>5</text>
        <text x={590} y={345} textAnchor="middle" dominantBaseline="central" fontFamily="ui-sans-serif, system-ui" fontWeight={800} fontSize={28} fill="rgba(15,23,42,0.8)" style={{ pointerEvents: 'none' }}>2</text>
        <text x={285} y={330} textAnchor="middle" dominantBaseline="central" fontFamily="ui-sans-serif, system-ui" fontWeight={800} fontSize={28} fill="rgba(15,23,42,0.8)" style={{ pointerEvents: 'none' }}>3</text>
        <text x={175} y={350} textAnchor="middle" dominantBaseline="central" fontFamily="ui-sans-serif, system-ui" fontWeight={800} fontSize={28} fill="rgba(15,23,42,0.8)" style={{ pointerEvents: 'none' }}>4</text>
        <text x={290} y={455} textAnchor="middle" dominantBaseline="central" fontFamily="ui-sans-serif, system-ui" fontWeight={800} fontSize={28} fill="rgba(15,23,42,0.8)" style={{ pointerEvents: 'none' }}>1</text>
      </svg>
    </motion.div>
  );
}
