'use strict';

const axiomPalette = require('@brandwatch/axiom-materials/dist/colors');

module.exports = {
    base: [
        axiomPalette.uiCarbonDarker,
        axiomPalette.uiWhiteNoise
    ],
    brand: Object.values(axiomPalette.productColors)
        // Add additional colours to fill the gaps (e.g. red, navy)
        .concat(...[
            axiomPalette.sentimentNegativeActive,
            axiomPalette.socialFacebookActive
        ])
};
