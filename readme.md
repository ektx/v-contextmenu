# VContextmenu

右键菜单功能

![demo](http://wx4.sinaimg.cn/large/9444af88gy1fwtpbclrn2g20lw0e740a.gif)

## 安装

```bash
yarn add @ektx/v-contextmenu
npm i @ektx/v-contextmenu
```

## NPM 使用

### 引用组件
```js
import Vue from 'vue';
import VContextmenu from '@ektx/v-contextmenu';
import '@ektx/v-contextmenu/dist/vcontextmenu.css';

Vue.use(VContextmenu);
```

### Vue 页面使用
```html
<template>
	<!-- 绑定事件 -->
	<div @contextmenu.prevent="rightClick"></div>
</template>

<script>
	export default {
		name: 'demo',
		data () {
			return {
				// 菜单内容
				menu: [{
					title: 'v-contenxtmenus',
					classes: 'hello',
					evt (data) {
						alert('Welcome Use v-contenxtmenus!')
					}
				},
				{
					title: '联系方式',
					children: {
						title: 'ektx1989@gmail.com'
					},
					{
						title: '@宅龙猫'
					}]
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
				}]
			}
		},
		methods: {
			// 自定义事件
			rightClick (evt) {
				this.$VContextmenu.show(this.menu, evt)
			}
		}
	}
</script>
```

## 事件方法
```js
/**
 * 显示功能
 * @param [Array] 菜单内容
 * @param [event] JS事件
 */
this.$VContextmenu.show(data, evt)
```

### data 说明
| 标签 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| title | `String` | 菜单列表标题 | - |
| evt | `Function` | 菜单点击事件 | - |
| disabled | `Boolean` | 是否可以使用 | - |
| classes | `Class` | 自定义样式名 | - |
| type | `separator` | 分隔线 | - |