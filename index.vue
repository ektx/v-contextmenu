<template>
	<section v-show="showMenu" ref="contextMenu">
		<VContextMenusBody ref="contextmenu" :menus="menus"></VContextMenusBody>
	</section>
</template>

<script src="./main.js"></script>
