import Vue from 'vue';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
    name: 'VContextMenusBody',
    props: {
        list: Array,
        styles: Object,
        // 通知组件是否要立刻渲染
        immediate: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            current: {},
            child: [],
            holdIndex: -1,
            childStyle: {
                el: {},
                li: {}
            },
            iStyle: {
                top: 0,
                left: 0,
                visibility: 'hidden'
            },
        }
    },
    watch: {
        holdIndex (val) {
            if (this.current.children && this.holdIndex > -1) {
                this.child = this.current.children;
            } else {
                this.child = [];
            }

        },
        list: {
            handler (val) {
                // 重置子级内容
                this.child = [];
                this.current = {};
                this.holdIndex = -1;
            },
            deep: true
        },
        styles (val) {
            this.holdIndex = -1;
            this.update();
        }
    },
    mounted () {
        this.update();
    },
    updated () {
        this.update();
    },
    methods: {
        mouseover (i, item, evt) {
            if (item.type) return
            this.holdIndex = i;
            this.current = item;

            // 定位处理
            let elBCR = this.$el.getBoundingClientRect();
            let liBCR = evt.target.getBoundingClientRect();

            let _style = Object.assign({}, this.childStyle, {
                el: {
                    dom: this.$el,
                    bcr: elBCR,
                },
                li: {
                    dom: evt.target,
                    bcr: liBCR
                }
            });

            Object.freeze(_style);

            this.childStyle = _style;
        },

        mouseleave (i, item) {
            if (item.type) return

            if (!item.children) {
                this.holdIndex = -1;
            }

            if (item.disabled) {
                this.$VContextmenu.config({disabled: false});
            }
        },

        update () {
            let elBCR = this.$el.getBoundingClientRect();
            let winW = window.innerWidth;
            let winH = window.innerHeight;
            let top = this.styles.top || 0;
            let left = this.styles.left || 0;

            if (this.styles.el) {
                left = this.styles.el.bcr.right;
                top = this.styles.li.bcr.top;
            }

            if (left + elBCR.width > winW) {
                if (this.immediate) {
                    let remianSpace = winW - this.styles.el.bcr.right;
                    
                    // 剩余空间大时 .|*
                    if (remianSpace > this.styles.el.bcr.right) {
                        left = this.styles.el.bcr.right;
                    }
                    // *|. 
                    else {
                        left = this.styles.el.bcr.left -elBCR.width;
                    }
                } else {
                    left = left - elBCR.width;
                }
            }


            if (top + elBCR.height > winH) {
                top = winH - elBCR.height;
            }

            Object.assign(this.iStyle, {
                top: top + 'px',
                left: left + 'px',
                visibility: 'visible'
            });

        },

        click (item) {
            // 更新事件控制机制
            this.$VContextmenu.config({disabled: item.disabled || false});
            if (item.evt) item.evt();
        }
    }
};

/* script */
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "v-contextmenu-body", style: _vm.iStyle },
    [
      _c(
        "ul",
        _vm._l(_vm.list, function(item, index) {
          return _c(
            "li",
            {
              key: index,
              class: { hold: _vm.holdIndex === index },
              on: {
                mouseenter: function($event) {
                  _vm.mouseover(index, item, $event);
                },
                mouseleave: function($event) {
                  _vm.mouseleave(index, item);
                },
                click: function($event) {
                  _vm.click(item);
                }
              }
            },
            [
              item.type
                ? [_c("span", { staticClass: "separator" })]
                : _c(
                    "a",
                    {
                      class: ["v-contextmenu-link", item.classes],
                      attrs: { disabled: item.disabled }
                    },
                    [
                      _c("span", [_vm._v(_vm._s(item.title))]),
                      _vm._v(" "),
                      item.children ? _c("i") : _vm._e()
                    ]
                  )
            ],
            2
          )
        })
      ),
      _vm._v(" "),
      _vm.child.length
        ? _c("VContextMenusBody", {
            attrs: { list: _vm.child, styles: _vm.childStyle, immediate: "" }
          })
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/zhuwenlong/Sites/v-contextmenu/src/mod/body.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var VContextMenusBody = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

//

var script$1 = {
    name: 'v-contextmenu',
    components: { VContextMenusBody },
    data () {
        return {
            // 默认定位
            styles: {
                top: 0,
                left: 0
            },
            // 默认不显示
            show: false
        }
    },
    created () {
        this.update();
        document.addEventListener('click', this.close);
    },
    watch: {
        /**
         * 监听事件变化 
         * @param [event] 事件
         */
        event (val) {
            this.update();
        }
    },
    methods: {
        // 关闭菜单
        close () {
            this.$VContextmenu.close(this.key);
        },
        // 更新菜单的位置
        update () {
            this.styles = Object.assign({}, {
                top: this.event.clientY,
                left: this.event.clientX
            });
        }
    }
};

/* script */
            const __vue_script__$1 = script$1;
            
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "section",
    {
      directives: [
        { name: "show", rawName: "v-show", value: _vm.show, expression: "show" }
      ],
      staticClass: "v-contextmenu-mod"
    },
    [
      _c("VContextMenusBody", { attrs: { list: _vm.data, styles: _vm.styles } })
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/zhuwenlong/Sites/v-contextmenu/src/mod/menu.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Menu = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

let ModelConstructor = Vue.extend(Menu);

let keyStep = 2018;
let lib = {};

const VContextmenu = function (opts) {
    let instance = new ModelConstructor({
        data: opts
    });

    lib[keyStep].$el = instance;

    document.body.appendChild(instance.$mount().$el);
};

// 展示菜单
VContextmenu.show = function (opts, evt) {
    let el = evt.target;
    
    if (lib[keyStep]) {
        lib[keyStep].$el.show = true;
        lib[keyStep].$el.event = evt;
        lib[keyStep].$el.data = opts;
        return
    }

    lib[keyStep] = {
        target: el
    };

    opts = Object.assign({}, {
        show: true,
        event: evt,
        data: opts,
        key: keyStep
    });

    return VContextmenu(opts)
};

// 手动关闭功能
VContextmenu.close = function (key) {
    // 如果设置了不可点击时
    if (lib.disabled) return
    lib[key].$el.show = false;
};

VContextmenu.config = function (opts) {
    Object.assign(lib, opts);
};

const install = (Vue$$1, opts = {}) => {
    if (install.installed) return

    Vue$$1.prototype.$VContextmenu = VContextmenu;
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

var index = {
    install
};

export default index;
