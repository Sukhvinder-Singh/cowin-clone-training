const path = require("path");

/**
 * 
 * @param {String} minifiedCSSPath Path of the minified CSS file compiled using SASS/SCSS
 * @returns Filename from CSS path without extension
 */
const extractCSSBuildFilename = minifiedCSSPath => {
    let cssFilename = path.basename(minifiedCSSPath);
    let extractedName = cssFilename
        .replace(".min", "")
        .replace(".css", "")
        .replace(".scss", "")
        .replace(".sass", "")
        .replace(".less", "");
    return extractedName;
}

module.exports = {
    /**
     * 
     * @param {String} jsBundleName Desired filename of bundled JavaScript file
     * @param {String} jsEntryPoint Path of main JavaScript entry point
     * @param {String} minifiedCssEntryPoint Path of the minified CSS file compiled using SASS/SCSS
     * @returns Entry point configuration object for webpack
     */
    getBundleConfig: (jsBundleName, jsEntryPoint, minifiedCssEntryPoint) => {
        return {
            [`${jsBundleName}.min`]: jsEntryPoint,
            [`${extractCSSBuildFilename(minifiedCssEntryPoint)}.slim.min`]: minifiedCssEntryPoint
        }
    }
}