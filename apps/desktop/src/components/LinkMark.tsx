export function LinkMark({ small = false }: { small?: boolean }) {
  return (
    <svg
      width={small ? 28 : 42}
      height={small ? 28 : 42}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M27 11h7a9 9 0 0 1 0 18h-9"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M21 37h-7a9 9 0 0 1 0-18h9"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="m18 28 12-8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
