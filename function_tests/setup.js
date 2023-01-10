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

global.versions = versions;
global.initialize = async (version, contentPath, configs = '') => browser.newPage().then(page => page.setContent(`${ htmlTemplateStart.replace('%CONFIGS%', configs) }${ frameworks[version] }${ htmlTemplateEnd.replace('%CONTENT%', readFileSync(resolve(baseContentPath, contentPath))) }`) && page).then(page => pageExtend(page));

module.exports = async () => (global.browser = await puppeteer.launch({ headless: true }));
