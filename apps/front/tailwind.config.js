const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      borderWidth: {
        1: '1px',
      },
      fontSize: {
        h1: '40px',
        h2: '36px',
        h3: '32px',
        h4: '28px',
        h5: '24px',
        "h5-2": ['22px', '20px'],
        h6: '20px',
      },
    },
  },
  plugins: [],
};
