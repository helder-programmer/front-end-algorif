import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {},
        screens: {
            'xs': '400px',

            'smMui': '600px',

            'sm': '640px',

            'md': '768px',

            'mdMui': '1024px',

            'lg': '1024px',

            'xl': '1280px',

            '2xl': '1536px',
        }
    },
    plugins: [],
}
export default config
