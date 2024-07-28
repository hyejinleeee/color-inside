import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      boxShadow: {
        'inner-top-left': 'inset 3px 3px 5px rgba(0, 0, 0, 0.2)',
        'custom-inset': '0.5rem 0.5rem 0rem 0rem var(--border-color) inset',
        'progress-border': '0rem 0rem 0rem 0.1875rem var(--border-color)'
      },
      spacing: {
        '13': '3.25rem',
        '18': '4.5rem',
        '140px': '8.75rem',
        '200px': '12.5rem',
        '600px': '37.5rem',
        '744px': '46.5rem',
        '760px': '47.5rem'
      },
      fontSize: {
        '28px': ['1.75rem', { lineHeight: '1.35' }]
      },
      letterSpacing: {
        '0.28px': '-0.0175rem',
        '0.32px': '-0.02rem',
        '0.36px': '-0.0225rem',
        '0.48px': '-0.03rem',
        '0.56px': '-0.035rem'
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        default: 'var(--default-color)',
        pressed: 'var(--pressed-color)',
        disable: 'var(--disable-color)',
        'tertiary-default': 'var(--tertiary-color)',
        'tertiary-pressed': 'var(--tertiary-pressed-color)',
        'tertiary-disable': 'var(--tertiary-disable-color)',
        'text-button-disable': 'var( --text-button-disable-color)',
        toast: 'var(--toast-color)',
        'border-color': 'var(--border-color)',
        'bg-color': 'var(--bg-color)',
        layout: 'var(--layout-color)',
        'progress-total-color': 'var(--progress-total-color)',
        'progress-current-color': 'var(--progress-current-color)',
        'progress-border-color': 'var(--progress-border-color)',
        'font-color': 'var(--font-color)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '5xl': '2rem'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;

export default config;
