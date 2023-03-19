module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '200px',
      xm: '350px',
      s: '390px',
      sm: '640px',
      md: '768px',
      ld: { min: '769px', max: '897px' },
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        Monstserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          dark: {
            primary20: 'rgba(255, 134, 148, 1)',
            primary40: 'rgba(255, 109, 127, 1)',
            primary60: 'rgba(255, 81, 101, 1',
            primary80: 'rgba(255, 74, 96, 1)',
            primary90: 'rgba(237, 26, 51, 1)',
          },
          light: {
            primary20: 'rgba(255, 134, 148, 1)',
            primary40: 'rgba(255, 109, 127, 1)',
            primary60: 'rgba(255, 81, 101, 1)',
            primary80: 'rgba(255, 74, 96, 1)',
            primary90: 'rgba(237, 26, 51, 1)',
          },
        },
        secondary: {
          dark: {
            secondary20: 'rgba(253, 214, 163, 1)',
            secondary40: 'rgba(252, 198, 126, 1)',
            secondary60: 'rgba(251, 189, 108, 1)',
            secondary80: 'rgba(251, 181, 89, 1)',
            secondary90: 'rgba(250, 173, 71, 1)',
            secondary100: 'rgba(255, 156, 39, 1)',
          },
          light: {
            secondary20: 'rgba(253, 214, 163, 1)',
            secondary40: 'rgba(252, 198, 126, 1)',
            secondary60: 'rgba(251, 189, 108, 1)',
            secondary80: 'rgba(251, 181, 89, 1)',
            secondary90: 'rgba(250, 173, 71, 1)',
            secondary100: 'rgba(255, 156, 39, 1)',
          },
        },
        main: {
          dark: {
            white: 'rgba(0, 0, 0, 1)',
            black: 'rgba(255, 255, 255, 1)',
          },
          light: {
            white: 'rgba(255, 255, 255, 1)',
            black: 'rgba(0, 0, 0, 1)',
            yellow: 'rgba(255, 237, 213, 1)',
          },
        },
        neutral: {
          dark: {
            neutral10: 'rgba(163, 165, 168, 1)',
            neutral20: 'rgba(213, 213, 213, 1)',
            neutral40: 'rgba(80, 82, 84, 1)',
            neutral60: 'rgba(35, 36, 37, 1)',
            neutral80: 'rgba(32, 32, 33, 1)',
            neutral90: 'rgba(3, 13, 27, 1)',
          },
          light: {
            neutral10: 'rgba(163, 165, 168, 1)',
            neutral20: 'rgba(213, 213, 213, 1)',
            neutral40: 'rgba(80, 82, 84, 1)',
            neutral60: 'rgba(35, 36, 37, 1)',
            neutral80: 'rgba(32, 32, 33, 1)',
            neutral90: 'rgba(3, 13, 27, 1)',
          },
        },
        mediumGray: {
          dark: {
            mediumGray: 'rgba(102, 107, 111, 1)',
          },
          light: {
            mediumGray: 'rgba(102, 107, 111, 1)',
          },
        },
        darkGray: {
          dark: {
            darkGray: 'rgba(85, 88, 90, 1)',
          },
          light: {
            darkGray: 'rgba(85, 88, 90, 1)',
          },
        },
        grayButton: {
          dark: {
            grayButton: 'rgba(213, 216, 219, 1)',
          },
          light: {
            grayButton: 'rgba(213, 216, 219, 1)',
          },
        },
        mediumLightGray: {
          dark: 'rgba(209, 211, 216, 1)',
          light: 'rgba(209, 211, 216, 1)',
        },
        linearGradientWhite: {
          dark: {
            linearGradientWhite: 'rgba(255, 253, 253, 1)',
          },
          light: {
            linearGradientWhite: 'rgba(245, 245, 245, 1)',
          },
        },
        success: {
          dark: {
            success20: 'rgba(129, 209, 18, 1)',
            success40: 'rgba(102, 179, 13, 1)',
            success60: 'rgba(79, 150, 9, 1)',
            success80: 'rgba(79, 150, 9, 1)',
            success90: 'rgba(43, 100, 3, 1)',
            Success100: 'rgba(0, 216, 145, 0.2)',
          },
          light: {
            success20: 'rgba(129, 209, 18, 1)',
            success40: 'rgba(102, 179, 13, 1)',
            success60: 'rgba(79, 150, 9, 1)',
            success80: 'rgba(79, 150, 9, 1)',
            success90: 'rgba(43, 100, 3, 1)',
            Success100: 'rgba(0, 216, 145, 0.2)',
          },
        },
        warning: {
          dark: {
            warning90: 'rgba(255, 158, 12, 1)',
          },
          light: {
            warning90: 'rgba(255, 158, 12, 1)',
          },
        },
        red: {
          dark: {
            red20: 'rgba(255, 102, 120, 0.2)',
            red90: 'rgba(226, 43, 43, 1)',
            D71920: 'rgba(215, 25, 32, 1)',
          },
          light: {
            red20: 'rgba(255, 102, 120, 0.2)',
            red90: 'rgba(226, 43, 43, 1)',
            D71920: 'rgba(215, 25, 32, 1)',
          },
        },
        badgeGreen: {
          dark: {
            badgeGreen40: 'rgba(50, 201, 151, 1)',
            badgeGreen80: 'rgba(0, 146, 98, 1)',
          },
          light: {
            badgeGreen10: 'rgba(241, 251, 248, 1)',
            badgeGreen40: 'rgba(50, 201, 151, 1)',
            badgeGreen80: 'rgba(0, 146, 98, 1)',
          },
        },
      },
      backgroundImage: {
        'gradient-red':
          'linear-gradient(273.38deg, #ED1C1C -1.39%, #ED351C 13.55%, #F25D5D 81.86%, #FFFFFF 203.53%)',
        'gradient-orange':
          'linear-gradient(131.35deg, #FAAC27 18.86%, #FF252E 127.52%)',
      },
      fontSize: {
        h5: '24px',
        h6: '18px',
        body1: '16px',
        body2: '14px',
        caption1: '12px',
        caption2: '11px',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
      keyframes: {
        updown: {
          '0%': { top: '0' },
          '100%': { top: '100%' },
        },
      },
      animation: {
        updown: 'updown 2s ease-in-out infinite alternate-reverse',
      },
      boxShadow: {
        '3xl': '0px 4px 15px #C4C4C4',
      },
      backroundPosition: {
        'left-up': 'left bottom 2000px',
        'top-4': 'center top 1rem',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp'),
  ],
};
