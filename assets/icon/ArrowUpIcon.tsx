import React from 'react';

interface ArrowUpIconProps {
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export const ArrowUpIcon: React.FC<ArrowUpIconProps> = ({
  size = 24,
  color = 'currentColor',
  className = '',
  onClick,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    onClick={onClick}
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);
