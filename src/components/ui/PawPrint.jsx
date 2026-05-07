export default function PawPrint({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="currentColor">
      <ellipse cx="10" cy="10" rx="5" ry="6" opacity="0.4" />
      <ellipse cx="22" cy="8" rx="5" ry="6" opacity="0.4" />
      <ellipse cx="33" cy="13" rx="4.5" ry="5.5" opacity="0.4" />
      <ellipse cx="5" cy="22" rx="4" ry="5" opacity="0.4" />
      <ellipse cx="20" cy="28" rx="12" ry="10" />
    </svg>
  );
}
