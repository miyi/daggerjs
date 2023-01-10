describe('$each directive nested test suite', () => {
    let page = null;
    afterEach(() => page && page.close());
    const contentPath = 'directives/$each/nested.html';
    versions.forEach(({ tag, desc }) => it(desc, async () => {
        page = await initialize(tag, contentPath);
        const divs = page.jQuery('.each-div-layer1');
        expect((await divs).length).toBe(3);
        const spans = divs.find('span');
        expect((await spans).length).toBe(6);
        expect((await spans.eq(0).text())).toBe('0 - a - 0 - m');
        expect((await spans.eq(2).text())).toBe('1 - b - 0 - m');
        expect((await spans.eq(5).text())).toBe('2 - c - 1 - n');
    }));
});
