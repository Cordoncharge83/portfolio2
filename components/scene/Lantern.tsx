export function Lantern({ className = "lantern" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 64" aria-hidden="true">
      <path d="M18 6h12M24 2v4" stroke="#A98563" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="12" y="10" width="24" height="6" rx="2" fill="#A98563" />
      <rect x="14" y="16" width="20" height="36" rx="3" fill="#F0B25A" opacity=".9" />
      <rect x="14" y="16" width="20" height="36" rx="3" fill="none" stroke="#7A5A3C" strokeWidth="2" />
      <path d="M24 16v36" stroke="#7A5A3C" strokeWidth="2" />
      <rect x="12" y="52" width="24" height="6" rx="2" fill="#A98563" />
    </svg>
  );
}
