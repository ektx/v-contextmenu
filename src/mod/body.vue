<template>
    <div class="v-contextmenu-body" :style="iStyle" >
        <ul>
            <li 
                v-for="(item, index) in list" 
                :key="index"
                :class="{hold: holdIndex === index}"
                @mouseenter="mouseover(index, item, $event)"
                @mouseleave="mouseleave(index, item)"
                @click="click(item)"               
            >
                <template v-if="item.type">
                    <span class="separator"></span>
                </template>
                <a :disabled="item.disabled" :class="['v-contextmenu-link', item.classes]" v-else>
                    <span>{{item.title}}</span>
                    <i v-if="item.children"></i>
                </a>
            </li>
        </ul>
        <VContextMenusBody 
            v-if="child.length" 
            :list="child" 
            :styles="childStyle"
            immediate
        />
    </div>
</template>

<script>
export default {
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
                this.child = this.current.children
            } else {
                this.child = []
            }

        },
        list: {
            handler (val) {
                // 重置子级内容
                this.child = []
                this.current = {}
                this.holdIndex = -1
            },
            deep: true
        },
        styles (val) {
            this.holdIndex = -1
            this.update()
        }
    },
    mounted () {
        this.update()
    },
    updated () {
        this.update()
    },
    methods: {
        mouseover (i, item, evt) {
            if (item.type) return
            this.holdIndex = i
            this.current = item

            // 定位处理
            let elBCR = this.$el.getBoundingClientRect()
            let liBCR = evt.target.getBoundingClientRect()

            let _style = Object.assign({}, this.childStyle, {
                el: {
                    dom: this.$el,
                    bcr: elBCR,
                },
                li: {
                    dom: evt.target,
                    bcr: liBCR
                }
            })

            Object.freeze(_style)

            this.childStyle = _style
        },

        mouseleave (i, item) {
            if (item.type) return

            if (!item.children) {
                this.holdIndex = -1
            }

            if (item.disabled) {
                this.$VContextmenu.config({disabled: false})
            }
        },

        update () {
            let elBCR = this.$el.getBoundingClientRect()
            let winW = window.innerWidth
            let winH = window.innerHeight
            let top = this.styles.top || 0
            let left = this.styles.left || 0

            if (this.styles.el) {
                left = this.styles.el.bcr.right
                top = this.styles.li.bcr.top
            }

            if (left + elBCR.width > winW) {
                if (this.immediate) {
                    let remianSpace = winW - this.styles.el.bcr.right
                    
                    // 剩余空间大时 .|*
                    if (remianSpace > this.styles.el.bcr.right) {
                        left = this.styles.el.bcr.right
                    }
                    // *|. 
                    else {
                        left = this.styles.el.bcr.left -elBCR.width
                    }
                } else {
                    left = left - elBCR.width
                }
            }


            if (top + elBCR.height > winH) {
                top = winH - elBCR.height
            }

            Object.assign(this.iStyle, {
                top: top + 'px',
                left: left + 'px',
                visibility: 'visible'
            })

        },

        click (item) {
            // 更新事件控制机制
            this.$VContextmenu.config({disabled: item.disabled || false})
            if (item.evt) item.evt()
        }
    }
}
</script>
