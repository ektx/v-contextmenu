<template>
	<div id="app">
		<header>
			<h1>@ektx/v-contextmenu</h1>
		</header>
		<main>
			<aside @contextmenu.prevent="aside"></aside>
			<section @contextmenu.prevent="section"></section>
		</main>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {
	},
	data () {
		return {
			menu: [
				{
					title: 'VContenxtmenu'
                },
                {
					type: 'separator'
                },
                {
					title: '@宅龙猫',
					// 自定义样式
					classes: 'hello'
                },
				{
					title: '联系方式',
					children: [
                        {
                            title: '邮箱',
                            children: [
                                {
                                    title: 'ektx1989@gmail.com'
                                },
                                {
                                    title: 'hello@world.com'
                                },
                                {
                                    title: 'hi@world.com'
                                }
                            ]
						},
						{
							type: 'separator'
						},
                        {
                            title: '地区',
                            children: [
                                {
                                    title: 'china',
                                    children: [
                                        {
                                            title: 'zhejiang',
                                            children: [
                                                {
                                                    title: '杭州',
                                                    children: [
                                                        {
                                                            title: '西湖区'
                                                        },
                                                        {
                                                            title: '上城区'
                                                        },
                                                        {
															disabled: true,
                                                            title: ';)'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            title: '安徽',
                                            children: [
                                                {
                                                    title: '合肥'
                                                },
                                                {
                                                    title: '铜陵'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
						}
					]
				},
				{
					type: 'separator'
				},
				{
					title: 'Github.com',
					evt () {
						console.log('你点击了 github')
					}
				},
				{
					type: 'separator'
				},
				{
					title: '点击事件示例',
					children: [{
						title: '行内命令',
						evt () {
							console.log('行内命令')
						}
					}, {
						title: '外部命令',
						evt: this.clickEvt
					}]
				},
				{
					type: 'separator'
				},
				{
					disabled: true,
					title: this.getTime()
				}
			],
			asideMenu: [
				{
					title: '@ektx/VContextMenu'
				},
				{
					title: this.getTime()
				}
			]
		}
	},
	methods: {
		aside (evt) {
			this.$VContextmenu.show(this.asideMenu, evt)
		},
		section (evt) {
            this.$VContextmenu.show(this.menu, evt)
		},

		clickEvt () {
			console.log(new Date())
		},

		getTime () {
			return new Date
		}
	}
}
</script>

<style lang="scss">
@import '../../style/index.scss';

body, div, section, header, main, aside {
	margin: 0;
	padding: 0;
}

#app {
	display: flex;
	flex-direction: column;
	height: 100vh;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	main {
		display: flex;
		flex: 1;

		aside {
			flex: 1;
			background: yellow;
		}
	
		section {
			flex: 2;
			background: yellowgreen;
		}
	}
}

.hello {
	font-size: 18px;
	font-weight: bold;
	color: orange;
}
</style>
