'use strict';

const flags = require('../public/flags');

function getFlag(id, props = {}) {
    const countryCode = id === 'uk' ? 'gb' : id;
    const {viziaAssetsPath = '@vizia-assets'} = props;
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
