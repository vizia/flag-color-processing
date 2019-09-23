'use strict';

const flags = require('../public/flags');
const getCountryISO2 = require('country-iso-3-to-2');

function getFlag(id, props = {}) {
    const {viziaAssetsPath = '@vizia-assets'} = props;
    const iso2 = (id.length === 3 ? getCountryISO2(id) : id).toLowerCase();
    const countryCode = iso2 === 'uk' ? 'gb' : iso2;
    const flag = flags.find((flag) => flag.id === countryCode);

    if (!flag) {
        return null;
    }

    return Object.assign({}, flag, {
        src: Object.entries(flag.src)
            .map((entry) => [entry[0], `${viziaAssetsPath}/flags/public/${entry[1]}`])
            .reduce((memo, entry) => Object.assign(memo, {[entry[0]]: entry[1]}), {})
    });
}

module.exports = getFlag;
