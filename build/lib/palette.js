'use strict';

const axiomPalette = require('@brandwatch/axiom-materials/dist/cjs/colors');

module.exports = {
    base: [
        axiomPalette.uiBlack,
        axiomPalette.uiWhiteNoise
    ],
    brand: [].concat(
        Object.values(axiomPalette.productColors),
        Object.values(axiomPalette.productActiveColors),
        Object.values(axiomPalette.productHoverColors),
        // Red
        axiomPalette.sentimentNegativeActive,
        // Navy
        axiomPalette.socialTumblrHover
    )
};
