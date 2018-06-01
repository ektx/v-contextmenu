export default {
    name: 'v-contextmenus-body',
    props: ['menus'],
    data () {
        return {
            openMenu: null,
            lazyShow: null
        }
    },
    methods: {
        /*
            右键菜单功能
            @index [number] 当前点击对象的索引
            @evt [event] 鼠标事件
        */
        contextmenuMouseOverFun (index, evt) {

            let data = this.menus.inner[index]
            let _BCR = evt.target;

            if (!evt.target) return;

            _BCR = _BCR.getBoundingClientRect()

            this.hideOpenMenu()

            if (data.hasOwnProperty('children')) {

                this.openMenu = data.children.state

                this.$set(this.openMenu, 'show', true)

                this.$nextTick( ()=> {
                    let childrenUL = evt.target.nextElementSibling.querySelector('ul')
                    let ULBCR = childrenUL.getBoundingClientRect()

                    let top = 0;
                    let left = 0;


                    if (window.innerHeight < _BCR.top + ULBCR.height) {
                        top = window.innerHeight - ULBCR.height
                    } else {
                        top = _BCR.top
                    }

                    if (window.innerWidth < _BCR.left + _BCR.width + ULBCR.width) {
                        left = window.innerWidth - ULBCR.width
                    } else {

                        left = _BCR.left + _BCR.width
                    }

                    this.$set(this.openMenu, 'position', {
                        top,
                        left
                    })

                })
            
            }
        },

        /*
            鼠标懒处理功能
            @index [number] 当前点击对象的索引
            @evt [event] 鼠标事件
        */
        contextmenuMouseOverLazy (index, evt) {
            
            clearTimeout(this.lazyShow)

            this.lazyShow = setTimeout(() => {
                this.contextmenuMouseOverFun(index, evt)
            }, 100)
        },

        /*
            点击事件
            @index 		[number] 	当前点击对象的索引
            @evt 		[event] 	鼠标事件
            @callback 	[function] 	回调事件
        */
        contextmenuClick (index, evt, callback) {

            if (callback) callback()

        },

        hideOpenMenu (type = 'one') {

            let forArr = function(arr) {
                for (let val of arr) {
                    if (val.children) {
                        val.children = resetState(val.children)
                    }
                }

                return arr
            }

            let resetState = function(obj) {

                for (let [key, val] of Object.entries(obj)) {
                    if (key === 'inner') {

                        val = forArr(val)
                    }

                    if (key === 'state') {
                        obj.state.show = false
                    }
                }

                return obj
            }

            if (this.openMenu) {
                if (type === 'all') {
                    this.menus = resetState(this.menus)
                } else {
                    this.$set(this.openMenu, 'show', false)
                }
            }

        }
    } // end methods
}