import React from 'react';

/**
 * CircularTextButton
 * Props:
 * - text: string (text to display along the circle)
 * - radius: number (radius of the circle, default 40)
 * - fontSize: number (font size for the text, default 12)
 * - size: number (diameter of the button, default 80)
 * - arrow: boolean (show arrow in center)
 * - arrowSize: number (diameter of the arrow, default 30% of button size)
 * - onClick: function (button click handler)
 * - className: string (optional extra classes)
 */
const CircularTextButton = ({
  text = 'Scroll Down •',
  radius = 40,
  fontSize = 12,
  size = 80, // button diameter
  arrow = true,
  arrowSize, // arrow diameter, default 30% of button size
  onClick,
  className = '',
}) => {
  const VIEWBOX = 100;
  // Path for the circle
  const path = `M ${VIEWBOX / 2 - radius}, ${VIEWBOX / 2}
    a ${radius},${radius} 0 1,1 ${radius * 2},0
    a ${radius},${radius} 0 1,1 -${radius * 2},0`;

  // Arrow size in px
  const computedArrowSize = arrowSize || Math.round(size * 0.3);

  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center rounded-full bg-transparent transition-colors duration-300 p-0 ${className}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      aria-label={text.replace(/•/g, '').trim()}
      type="button"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute left-0 top-0 w-full h-full pointer-events-none"
        style={{ display: 'block' }}
      >
        <path
          id="circlePath"
          fill="none"
          stroke="none"
          d={path}
        />
        <text
          fontFamily="monospace"
          fontSize={fontSize}
          fontWeight="bold"
          fill="#fff"
          style={{ letterSpacing: 2 }}
        >
          <textPath
            href="#circlePath"
            startOffset="50%"
            textAnchor="middle"
            alignmentBaseline="middle"
            dominantBaseline="middle"
          >
            {text}
          </textPath>
        </text>
      </svg>
      {arrow && (
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
          style={{ width: computedArrowSize, height: computedArrowSize }}
        >
          <svg
            width={computedArrowSize}
            height={computedArrowSize}
            viewBox="0 0 16 16"
            fill="none"
            className="block"
          >
            <path
              d="M8 12L8 4M8 12L4 8M8 12L12 8"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </button>
  );
};

export default CircularTextButton; 