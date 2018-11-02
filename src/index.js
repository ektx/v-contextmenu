import Layer from './menu'

const install = (Vue, opts = {}) => {
    if (install.installed) return

    Vue.prototype.$VContextmenu = Layer
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install
}