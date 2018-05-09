export default function setContextmenu (state, data) {
    if (Object.keys(data).length > 1) {
        state.contextmenu = data
    } else {
        state.contextmenu.show = data.show
    }
}