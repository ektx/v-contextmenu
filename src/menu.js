import Vue from 'vue'
import Menu from './mod/menu.vue'
let ModelConstructor = Vue.extend(Menu)

let keyStep = 2018
let lib = {}

const VContextmenu = function (opts) {
    let instance = new ModelConstructor({
        data: opts
    })

    lib[keyStep].$el = instance

    document.body.appendChild(instance.$mount().$el)
}

// 展示菜单
VContextmenu.show = function (opts, evt) {
    let el = evt.target
    
    if (lib[keyStep]) {
        lib[keyStep].$el.show = true
        lib[keyStep].$el.event = evt
        lib[keyStep].$el.data = opts
        return
    }

    lib[keyStep] = {
        target: el
    }

    opts = Object.assign({}, {
        show: true,
        event: evt,
        data: opts,
        key: keyStep
    })

    return VContextmenu(opts)
}

// 手动关闭功能
VContextmenu.close = function (key) {
    // 如果设置了不可点击时
    if (lib.disabled) return
    lib[key].$el.show = false
}

VContextmenu.config = function (opts) {
    Object.assign(lib, opts)
}

export default VContextmenu