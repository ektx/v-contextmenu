
export default {
    state: {
        show: true,
        data: {},
        evt: null
    },
    mutations: {
        setContextmenu (state, data) {
            if (Object.keys(data).length > 1) {
                Object.assign(state, data)
            } else {
                state.show = data.show
            }
        }
    }
}
