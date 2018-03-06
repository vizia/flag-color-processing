'use strict';

const ratioPath = '1x1';
const flagList = require('../public/1x1/flags');

function flagTemplate(flag) {
    return `
        <div class="flag-comparison">
            <div class="flag-comparison__header">${flag}</div>
            <div class="flag-comparison__body">
                <div class="flag">
                    <div class="flag__media">
                        <img src="/flag-svg-collection/flags/${ratioPath}/${flag}" />
                    </div>
                </div>
                <div class="flag">
                    <div class="flag__media">
                        <img src="/${ratioPath}/${flag}" />
                    </div>
                </div>
            </div>
        </div>
    `.trim();
}

function listTemplate() {
    const flags = flagList.map((flag) => flagTemplate(flag)).join('');
    return `
        <div class="flag-list">
            ${flags}
        </div>
    `.trim();
}

document.querySelector('#bundle-container').innerHTML = listTemplate();
