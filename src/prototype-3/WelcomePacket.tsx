import type { Program } from '@/data/types';
import { branches } from '@/data/branches';
import Button from '@/components/Button';

interface WelcomePacketProps {
  program: Program;
  childName: string;
  parentName: string;
  onClose: () => void;
}

function getBranchName(branchId: string): string {
  const branch = branches.find((b) => b.id === branchId);
  return branch ? branch.name : branchId;
}

function getBranchNeighborhood(branchId: string): string {
  const branch = branches.find((b) => b.id === branchId);
  return branch ? branch.neighborhood : '';
}

const whatToBringBySport: Record<string, string[]> = {
  Soccer: [
    'Shin guards (required)',
    'Cleats or athletic shoes',
    'Water bottle',
    'Comfortable athletic clothing',
    'Sunscreen',
  ],
  Basketball: [
    'Basketball shoes (non-marking soles)',
    'Water bottle',
    'Athletic shorts and t-shirt',
    'Mouthguard (optional but recommended)',
  ],
  'Flag Football': [
    'Cleats or athletic shoes',
    'Water bottle',
    'Athletic clothing',
    'Mouthguard (optional)',
    'Sunscreen',
  ],
  Volleyball: [
    'Court shoes (non-marking soles)',
    'Knee pads (recommended)',
    'Water bottle',
    'Athletic clothing',
  ],
  'Martial Arts': [
    'Uniform (provided first month)',
    'Water bottle',
    'No jewelry allowed during class',
    'Hair tied back',
  ],
  Skateboarding: [
    'Helmet (required, rentals available)',
    'Elbow and knee pads (required)',
    'Closed-toe shoes',
    'Water bottle',
  ],
  Dance: [
    'Dance shoes or clean sneakers',
    'Comfortable clothing that allows movement',
    'Water bottle',
    'Hair tied back',
  ],
  default: [
    'Athletic shoes',
    'Water bottle',
    'Comfortable athletic clothing',
    'Sunscreen (for outdoor activities)',
    'Positive attitude!',
  ],
};

function getWhatToBring(sport: string): string[] {
  return whatToBringBySport[sport] ?? whatToBringBySport['default'];
}

export default function WelcomePacket({
  program,
  childName,
  parentName,
  onClose,
}: WelcomePacketProps) {
  const branchId = program.branchIds[0];
  const items = getWhatToBring(program.sport);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Print content */}
      <div className="bg-white rounded-xl shadow-card p-8 print:shadow-none print:rounded-none">
        {/* Header */}
        <div className="text-center mb-8 border-b border-warmblack-100 pb-6">
          <p className="font-display font-bold text-2xl text-coral-500 tracking-tight print:text-black">
            Forward
          </p>
          <h1 className="font-display font-black text-3xl text-warmblack-900 mt-3">
            Welcome to {program.name}!
          </h1>
          {childName && (
            <p className="text-xl text-warmblack-500 mt-2">
              We're excited to have you, <span className="font-bold text-warmblack-800">{childName}</span>!
            </p>
          )}
        </div>

        {/* Program Details */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-warmblack-400 mb-2">
              Program
            </h3>
            <p className="text-warmblack-800 font-semibold">{program.name}</p>
            <p className="text-warmblack-500 text-sm">{program.sport}</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-warmblack-400 mb-2">
              Location
            </h3>
            <p className="text-warmblack-800 font-semibold">
              {branchId ? getBranchName(branchId) : 'TBD'}
            </p>
            <p className="text-warmblack-500 text-sm">
              {branchId ? getBranchNeighborhood(branchId) : ''}
            </p>
          </div>
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-warmblack-400 mb-2">
              Schedule
            </h3>
            <p className="text-warmblack-800 font-semibold">{program.schedule}</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-warmblack-400 mb-2">
              Season Dates
            </h3>
            <p className="text-warmblack-800 font-semibold">{program.seasonDates}</p>
          </div>
        </div>

        {/* Family Info */}
        <div className="bg-surface-100 rounded-lg p-4 mb-8 print:bg-gray-50">
          <h3 className="font-display font-bold text-sm uppercase tracking-wider text-warmblack-400 mb-2">
            Family Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-warmblack-400">Player</p>
              <p className="text-warmblack-800 font-semibold">{childName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-warmblack-400">Parent/Guardian</p>
              <p className="text-warmblack-800 font-semibold">{parentName || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* What to Bring */}
        <div className="mb-8">
          <h3 className="font-display font-bold text-lg text-warmblack-800 mb-3">
            What to Bring
          </h3>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-warmblack-600">
                <span className="text-coral-500 mt-0.5 print:text-black">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Coach Contact */}
        <div className="bg-surface-100 rounded-lg p-4 mb-8 print:bg-gray-50">
          <h3 className="font-display font-bold text-sm uppercase tracking-wider text-warmblack-400 mb-2">
            Coach Contact
          </h3>
          <p className="text-warmblack-500 text-sm italic">
            Your coach will reach out before the first session. Contact your branch front desk for any questions.
          </p>
          <p className="text-warmblack-800 font-semibold mt-1">
            {branchId ? getBranchName(branchId) : ''} Front Desk
          </p>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-warmblack-100">
          <p className="text-sm text-warmblack-400">
            Powered by Forward &times; YMCA of San Diego
          </p>
          <p className="text-xs text-warmblack-300 mt-1">
            Every Kid Needs a Team
          </p>
        </div>
      </div>

      {/* Non-printable actions */}
      <div className="flex gap-3 mt-6 no-print">
        <Button variant="primary" size="lg" onClick={handlePrint}>
          Print Welcome Packet
        </Button>
        <Button variant="ghost" size="lg" onClick={onClose}>
          Back
        </Button>
      </div>
    </div>
  );
}
