
<template>
	<section class="contextmenu-body-mod">
		<template v-if="menus.state && menus.state.show">
		<ul 
			v-show="menus.state.show"
			:style="{
				top: menus.state.position.top +'px',
				left: menus.state.position.left +'px'
			}"
		>
			<li v-for="(data, index) in menus.inner">
				<div 
					v-if="'title' in data" 
					:key="index" 
					:class="{noEvt: data.disabled}" 
					@mouseover="contextmenuMouseOverLazy(index, $event)"
					@click="contextmenuClick(index, $event, data.evt)"
				>
					{{ data.title }}

					<i v-if="data.children"></i>
				</div>
				<div class="separator" :key="index" v-else-if="'type' in data"></div>

				<template v-if="data.children">
					<v-contextmenus-body :menus="data.children">
					</v-contextmenus-body>
				</template>
			</li>
		</ul>
		</template>
	</section>
</template>

<script src="./main.js"></script>
<style lang="scss" scoped src="./layout.scss"></style>