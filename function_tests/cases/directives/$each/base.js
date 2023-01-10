describe('$each directive base test suite', () => {
    let page = null;
    afterEach(() => page && page.close());
    const contentPath = 'directives/$each/base.html';
    versions.forEach(({ tag, desc }) => it(desc, async () => {
        page = await initialize(tag, contentPath);
        const uls = page.jQuery('.each-ul-item');
        expect((await uls).length).toBe(3);
        const li1Text = await uls.eq(1).first('li').text();
        expect(li1Text).toBe('1 - b');
    }));
});
