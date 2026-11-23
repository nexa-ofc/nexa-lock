export default function DeviceIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <rect x="6" y="3" width="12" height="18" rx="2"/>
      <path d="M10 17h4" strokeLinecap="round"/>
    </svg>
  );
}
