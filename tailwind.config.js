module.exports = {
    purge: [
        './src/components/**/*.{ts,tsx,js,jsx}',
        './src/pages/**/*.{ts,tsx,js,jsx}'
    ],
    theme: {
        extend: {
            colors: {
                gray: {
                    blend: '#5b6467'
                }
            }
        }
    },
    variants: {
        backgroundColor: [
            'responsive',
            'dark',
            'group-hover',
            'focus-within',
            'active',
            'hover',
            'focus',
            'disabled'
        ],
        translate: ['active', 'hover'],
        backgroundOpacity: ['active', 'hover']

    },
    plugins: [require('tailwind-caret-color')()]
}
