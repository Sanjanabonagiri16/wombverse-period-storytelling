
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#800000', // Dark Maroon
					foreground: '#ffffff'
				},
				secondary: {
					DEFAULT: '#374151', // Dark Grey
					foreground: '#ffffff'
				},
				destructive: {
					DEFAULT: '#e11d48',
					foreground: '#ffffff'
				},
				muted: {
					DEFAULT: '#1f2937',
					foreground: '#e5e7eb'
				},
				accent: {
					DEFAULT: '#b91c1c', // A brighter red for accents
					foreground: '#ffffff'
				},
				popover: {
					DEFAULT: '#1e293b',
					foreground: '#e5e7eb'
				},
				card: {
					DEFAULT: '#111827',
					foreground: '#e5e7eb'
				},
				// Professional, dark palette
				womb: {
					charcoal: '#1a1a1a', // Near Black
					crimson: '#800000',  // Dark Maroon
					plum: '#5C4033',     // Dark Brown
					softwhite: '#f9fafb',// White
					warmgrey: '#6b7280', // Grey
					deepgrey: '#1f2937', // Darker Grey
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				'glow': {
					'0%': {
						boxShadow: '0 0 20px rgba(230, 57, 70, 0.3)'
					},
					'100%': {
						boxShadow: '0 0 30px rgba(230, 57, 70, 0.6), 0 0 40px rgba(125, 91, 166, 0.3)'
					}
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-200% 0'
					},
					'100%': {
						backgroundPosition: '200% 0'
					}
				},
				'gradient-shift': {
					'0%, 100%': {
						backgroundPosition: '0% 50%'
					},
					'50%': {
						backgroundPosition: '100% 50%'
					}
				},
				'rainbow': {
					'0%': { filter: 'hue-rotate(0deg)' },
					'100%': { filter: 'hue-rotate(360deg)' }
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 5px rgba(230, 57, 70, 0.4)'
					},
					'50%': {
						boxShadow: '0 0 20px rgba(230, 57, 70, 0.8), 0 0 30px rgba(125, 91, 166, 0.4)'
					}
				},
				'slide-in-left': {
					'0%': {
						transform: 'translateX(-100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'slide-in-right': {
					'0%': {
						transform: 'translateX(100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'zoom-in': {
					'0%': {
						transform: 'scale(0)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'shimmer': 'shimmer 3s linear infinite',
				'gradient-shift': 'gradient-shift 8s ease infinite',
				'rainbow': 'rainbow 4s linear infinite',
				'pulse-glow': 'pulse-glow 1.5s ease-in-out infinite',
				'slide-in-left': 'slide-in-left 0.5s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'zoom-in': 'zoom-in 0.4s ease-out'
			},
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			backgroundImage: {
				'mesh-gradient': `
					radial-gradient(circle at 20% 80%, rgba(230, 57, 70, 0.15) 0%, transparent 50%),
					radial-gradient(circle at 80% 20%, rgba(125, 91, 166, 0.15) 0%, transparent 50%),
					radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
				`
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
