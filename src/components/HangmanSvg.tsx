import type { HangmanSvgProps } from "../interfaces/hangmanSvg";

const HANGMAN_PARTS = [
  <path key="base" d="M1,11 h8" />,
  <path key="pole" d="M9,11 v-10" />,
  <path key="top" d="M9,1 h-4" />,
  <path key="rope" d="M5,1 v2" />,
  <circle key="head" cx="5" cy="4" r="1" />,
  <path key="body" d="M5,5 v3" />,
  <path key="arm-left" d="M5,5 l-2,2" />,
  <path key="arm-right" d="M5,5 l2,2" />,
  <path key="leg-left" d="M5,8 l-2,2" />,
  <path key="leg-right" d="M5,8 l2,2" />,
];

export function HangmanSvg({ size = 220, stage }: HangmanSvgProps) {
  const visibleCount = stage === undefined ? HANGMAN_PARTS.length : Math.max(0, Math.min(stage, HANGMAN_PARTS.length));

  return (
    <svg viewBox="0 0 10 12" width={size} height={size}>
      <style>{`
        path,
        circle {
          stroke: #707070;
          stroke-width: 0.1;
          stroke-linecap: round;
          fill: none;
        }
      `}</style>
      {HANGMAN_PARTS.slice(0, visibleCount)}
    </svg>
  );
}
