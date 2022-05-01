const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
    plugins: [
        purgecss({
            content: ['./public/**/*.html', './src/**/*.js', './public/**/*.ejs'],
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