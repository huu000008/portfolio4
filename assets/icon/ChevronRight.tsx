export const ChevronRight = ({ size = 24 }: { size?: number }) => {
  return (
    <svg
      enableBackground="new 0 0 24 24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      width={size}
      height={size}
    >
      <path
        clipRule="evenodd"
        d="m9.8 6.5c-.2 0-.5.1-.6.3-.4.4-.4.9 0 1.3l3.8 3.8-3.9 3.9c-.4.4-.4.9 0 1.3s.9.4 1.3 0l4.5-4.5c.4-.4.4-.9 0-1.3l-4.5-4.5c-.2-.1-.4-.3-.6-.3"
        fill="#b0b8c1"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};
