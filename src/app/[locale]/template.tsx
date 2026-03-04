/**
 * template.tsx re-mounts on EVERY route change (unlike layout.tsx which persists).
 * This gives us a clean page-enter animation on every navigation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-page-enter">
      {children}
    </div>
  );
}
