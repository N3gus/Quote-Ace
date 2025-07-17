import type { SVGProps } from "react";

/**
 * Renders the application's logo as an SVG component.
 * The logo is a shield icon, representing security and protection.
 * @param {SVGProps<SVGSVGElement>} props - Standard SVG properties.
 * @returns {React.ReactElement} The rendered SVG logo.
 */
export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
