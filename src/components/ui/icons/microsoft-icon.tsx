import * as React from "react";

export function MicrosoftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_4294_555)">
        <path d="M11.4062 11.9062H0V0.5H11.4062V11.9062Z" fill="#F1511B" />
        <path d="M24 11.9062H12.5939V0.5H24V11.9062Z" fill="#80CC28" />
        <path d="M11.4059 24.5002H0V13.094H11.4059V24.5002Z" fill="#00ADEF" />
        <path d="M24 24.5002H12.5939V13.094H24V24.5002Z" fill="#FBBC09" />
      </g>
      <defs>
        <clipPath id="clip0_4294_555">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
