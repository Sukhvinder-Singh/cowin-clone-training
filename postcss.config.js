const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
    plugins: [
        purgecss({
            content: ['./**/*.html', './**/*.js'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: {
                standard: [],
                deep: [],
                greedy: [],
                keyframes: [],
                variables: []
            }
        })
    ]
}