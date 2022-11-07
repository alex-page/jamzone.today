const plugin = require("tailwindcss/plugin");

const rotateX = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-x-25": {
      transform: "rotateX(25deg)",
    },
  });
});

const perspective = plugin(function ({ addUtilities }) {
  addUtilities({
    ".perspective-lg": {
      perspective: "1024px",
    },
  });
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/root.tsx",
    "./app/routes/**/*.tsx",
    "./app/components/**/*.tsx",
  ],
  theme: {
    boxShadow: {
      border: "0 0 0 1px",
    },
    fontFamily: {
      sans: [
        "SFRounded",
        "ui-rounded",
        "SF Pro Rounded",
        "system-ui",
        "Helvetica Neue",
        "Arial",
        "Helvetica",
        "sans-serif",
      ],
      mono: [
        "ui-monospace",
        "SFMono-Regular",
        "SF Mono",
        "Menlo",
        "Consolas",
        "Liberation Mono",
        "monospace",
      ],
    },
    extend: {},
  },
  plugins: [rotateX, perspective],
};
