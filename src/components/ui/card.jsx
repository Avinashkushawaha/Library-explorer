export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border bg-white dark:bg-zinc-900 ${className}`}>
      {children}
    </div>
  );
}
