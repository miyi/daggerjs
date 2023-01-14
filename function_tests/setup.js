const puppeteer = require('puppeteer');
const { pageExtend } = require('puppeteer-jquery');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const baseContentPath = resolve(__dirname, './cases');
const htmlTemplateStart = readFileSync('./template/index-start.html').toString();
const htmlTemplateEnd = readFileSync('./template/index-end.html').toString();
const versions = [{ tag: 'debug', path: '', desc: 'debug version' },
{ tag: 'debug.min', path: '.min', desc: 'minimal debug version' },
{ tag: 'release', path: '.release', desc: 'release version' },
{ tag: 'release.min', path: '.release.min', desc: 'minimal release version' }];
const frameworks = {};
versions.forEach(({ tag, path }) => (frameworks[tag] = readFileSync(`../src/dagger${ path }.js`).toString()));

const initialize = async (version, dirName, contentPath, configs = '') => browser.newPage().then(page => page.setContent(`${ htmlTemplateStart.replace('%CONFIGS%', configs) }${ frameworks[version] }${ htmlTemplateEnd.replace('%CONTENT%', readFileSync(resolve(dirName, contentPath))) }`) && page).then(page => pageExtend(page));

global.runner = (name, describe, it, dirName, callback, contentPath = 'content.html') => describe(name, () => versions.forEach(({ tag, desc }) => it(desc, () => initialize(tag, dirName, contentPath).then(page => Promise.all(callback(page)).then(() => page.close())))));

module.exports = async () => (global.browser = await puppeteer.launch({
    headless: true,
    args: [
        '–disable-gpu',
        '–disable-dev-shm-usage',
        '–disable-setuid-sandbox',
        '–no-first-run',
        '–no-sandbox',
        '–no-zygote',
        '–single-process'
    ]
}));
