runner('$value directive base test suite', describe, it, __dirname, async page => {
    const selectors = ['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week'];
    const helper = (selectorValueMapping, defaultValue = '') => Promise.all(selectors.map(selector => page.jQuery(`#${ selector }`).val().then(value => expect(`${ selector }: ${ value }`).toBe(`${ selector }: ${ Reflect.has(selectorValueMapping, selector) ? selectorValueMapping[selector] : defaultValue }`))));
    await helper({ // default value
        color: '#000000',
        range: '50'
    });
    await page.jQuery('#button1').click(); // set value as 66
    await helper({
        color: '#000000',
        date: '1965-12-31',
        'datetime-local': '1965-12-31T16:00',
        file: '',
        month: '',
        time: '',
        week: ''
    }, '66');
    await page.jQuery('#button2').click(); // set value as #aabb00
    await helper({
        date: '',
        'datetime-local': '',
        file: '',
        month: '',
        number: '',
        range: '50',
        time: '',
        week: ''
    }, '#aabb00');
    await page.jQuery('#button3').click(); // set value as 2023-08-30
    await helper({
        color: '#000000',
        'datetime-local': '2023-08-30T00:00',
        file: '',
        month: '',
        number: '',
        range: '50',
        time: '',
        week: ''
    }, '2023-08-30');
    await page.jQuery('#button4').click(); // set value as 2023-08
    await helper({
        color: '#000000',
        date: '',
        date: '2023-08-01',
        'datetime-local': '2023-08-01T00:00',
        file: '',
        number: '',
        range: '50',
        time: '',
        week: ''
    }, '2023-08');
    await page.jQuery('#button5').click(); // set value as 2023-W08
    await helper({
        color: '#000000',
        date: '',
        'datetime-local': '',
        file: '',
        month: '',
        number: '',
        range: '50',
        time: ''
    }, '2023-W08');
    await page.jQuery('#button6').click(); // set value as 20:44
    await helper({
        color: '#000000',
        date: '',
        'datetime-local': '',
        file: '',
        month: '',
        number: '',
        range: '50',
        week: ''
    }, '20:44');
    await page.jQuery('#button7').click(); // set value as 135
    await page.jQuery('#range').val().then(value => expect(value).toBe('100'));
});
