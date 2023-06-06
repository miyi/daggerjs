const resolver = raw => (raw instanceof Object) ? Object.assign({
    path: raw.name,
    variables: raw.variables,
    constants: {
        title: raw.name,
        template: raw.name
    },
    modules: raw.name
}, raw) : {
    path: raw,
    constants: {
        title: raw,
        template: raw
    },
    modules: raw
};

return {
    mode: 'history',
    prefix: '',
    aliases: {
        '/1': '/index1'
    },
    default: '/index1',
    routing: { // path/constants/variables/tailable/modules/children,
        tailable: false,
        constants: {
            title: 'default, should be overwritten'
        },
        modules: ['test_script', 'script', 'component', 'prefix', 'suffix'],
        children: [resolver({
            name: 'index',
            path: 'index1', 
        }), Object.assign(resolver('controllers'), {
            children: [{
                name: 'focus',
                variables: {
                    focus: false
                }
            }, {
                name: 'boolean',
                variables: {
                    boolean: false
                }
            }, 'class', 'style', 'raw', {
                name: 'general',
                variables: {
                    index: 0
                }
            }, {
                name: 'text',
                variables: {
                    index: 0
                },
            }, 'lifeCycle', 'html', 'file', 'exist', 'each', 'value', 'checked', 'selected', 'modules', {
                name: 'href',
                modules: ['href', 'module_component']
            }, 'iframe', 'template', 'eventHandler', 'date', {
                name: 'custom',
                constants: {
                    title: 'custom class',
                    template: 'custom'
                },
            }, 'watch'].map(resolver)
        })]
    }
};
