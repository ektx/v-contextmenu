<template>
    <section v-show="show" class="v-contextmenu-mod">
        <VContextMenusBody :list="data" :styles="styles"/>
    </section>
</template>

<script>
import VContextMenusBody from './body.vue'

export default {
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
        this.update()
        document.addEventListener('click', this.close)
    },
    watch: {
        /**
         * 监听事件变化 
         * @param [event] 事件
         */
        event (val) {
            this.update()
        }
    },
    methods: {
        // 关闭菜单
        close () {
            this.$VContextmenu.close(this.key)
        },
        // 更新菜单的位置
        update () {
            this.styles = Object.assign({}, {
                top: this.event.clientY,
                left: this.event.clientX
            })
        }
    }
}
</script>
