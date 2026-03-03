type TagVariant = 'success' | 'warning' | 'info' | 'default';

interface TagBadgeProps {
  label: string;
  variant?: TagVariant;
}

const variantClasses: Record<TagVariant, string> = {
  success: 'bg-accent-100 text-accent-700',
  warning: 'bg-amber-100 text-amber-700',
  info: 'bg-blue-100 text-blue-700',
  default: 'bg-warmblack-100 text-warmblack-600',
};

export default function TagBadge({ label, variant = 'default' }: TagBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full text-xs font-semibold px-2.5 py-0.5 ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
}
