export default function MiniBar({ value, color }) {
  return (
    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden flex-1">
      <div
        className="h-full rounded-full"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  );
}
