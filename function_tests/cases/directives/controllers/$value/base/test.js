runner('$value directive base test suite', describe, it, __dirname, async page => {
    const selectors = ['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week'];
    const helper = (selectorValueMapping, defaultValue = '') => Promise.all(selectors.map((selector, index) => page.jQuery(`#${selector}`).val().then(value => expect(`${ selector }: ${ value }`).toBe(`${ selector }: ${ Reflect.has(selectorValueMapping, selector) ? selectorValueMapping[selector] : defaultValue }`))));
    // default value
    await helper({
        color: '#000000',
        range: '50'
    });
    await page.jQuery('#button1').trigger('click'); // set value as 66
    await helper({
        color: '#000000',
        date: '1965-12-31',
        'datetime-local': '1965-12-31T16:00',
        file: '',
        month: '',
        time: '',
        week: ''
    }, '66');
});
