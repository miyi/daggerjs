const resolver = raw => (raw instanceof Object) ? Object.assign({
    path: raw.name,
    variables: raw.variables,
    constants: {
        title: raw.name,
        directive: raw.name
    },
    modules: raw.name
}, raw) : {
    path: raw,
    constants: {
        title: raw,
        directive: raw
    },
    modules: raw
};

return {
    mode: 'history',
    prefix: '',
    aliases: {
        '/index': '/index1',
        '/demo_local.html': '/index2'
    },
    default: '/index1',
    routing: { // path/constants/variables/tailable/modules/children,
        tailable: false,
        constants: {
            title: 'default, should be overwritten'
        },
        modules: ['test_script', 'script', 'component', 'prefix', 'suffix'],
        children: [{
            path: 'index1',
            constants: {
                title: 'index',
                template: 'index'
            },
            modules: 'index'
        }, {
            path: 'controllers',
            constants: {
                title: 'controllers',
                template: 'controllers'
            },
            modules: 'controllers',
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
                    directive: 'custom'
                },
            }, 'watch'].map(resolver)
        }]
    }
};
