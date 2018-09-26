# VContextmenu

右键菜单功能

![demo](http://wx2.sinaimg.cn/mw690/9444af88gy1frnp17o49hg20fv08tgnn.gif)

## 使用方式

1. 安装

```shell
yarn add @ektx/v-contextmenu
```

2. 在 vues 的 state 中添加共享状态与方法

> 请先确保你有使用 vuex

```javascript
import VContextmenu from '@ektx/v-contextmenu/store'

const store = new Vuex.Store({
	modules: { VContextmenu }
})
```

3. 在页面中调用组件

```html
<template>
	<main>
		<!-- 绑定事件 -->
		<div @contextmenu.prevent="rightClick"></div>

		<!-- 引用 HTML 结构 -->
		<VContextmenus />
	</main>
</template>

<script>
	// 引入
	import VContextmenus from '@ektx/v-contextmenus'

	export default {
		components: {
			VContextmenus
		},
		data () {
			return {
				// 菜单内容
				menu: {
					data: [
						{
							title: 'v-contenxtmenus',
							classes: 'hello',
							evt (data) {
								alert('Welcome Use v-contenxtmenus!')
							}
						},
						{
							title: '联系方式',
							children: [
								{
									title: 'ektx1989@gmail.com'
								},
								{
									title: '@宅龙猫'
								}
							]
						},
						{
							type: 'separator'
						},
						{
							title: 'Github.com',
							evt () {

							}
						},
						{
							type: 'separator'
						},
						{
							disabled: true,
							title: 'v 0.1.0'
						}
					]
				}
			}
		},
		methods: {
			// 自定义事件
			rightClick (evt) {
				this.$store.commit('setContextmenu', {
					data: this.menu, evt
				})
			}
		}
	}
</script>
```

## 事件方法

* 展示菜单功能

> store.commit('setContextmenu', {data, evt})

@data 菜单内容
@evt 鼠标事件


* 关闭菜单

> store.commit('setContextmenu', { show: false })

