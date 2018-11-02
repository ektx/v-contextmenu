import VuePlugin from 'rollup-plugin-vue'

export default {
    input: './src/index.js',
    output: {
        file: './dist/vcontextmenu.js',
        format: 'esm'
    },
    plugins: [VuePlugin()]
}