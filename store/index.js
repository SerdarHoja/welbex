export const state = () => ({
    list: [],
});
export const mutations = {
    list(state, list) {
        state.list = list;
    },
    sortByTitle(state) {
        state.list.sort((a, b) => a.title.localeCompare(b.title));
    },
    sortByQuantity(state) {
        state.list.sort((a, b) => a.quantity - b.quantity);
    },
    sortByDistance(state) {
        state.list.sort((a, b) => a.distance - b.distance);
    },
};
export const actions = {
    async fetchList({ commit }) {
        try {
            return await this.$axios
                .$get("/list")
                .then((response) => {
                    if (response) {
                        commit("list", response);
                        console.log({ response });
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response);
                    }
                });
        } catch (e) {
            throw e;
        }
    },
    async fetchListByFilter({ commit }, params) {
        try {
            return await this.$axios
                .request({
                    url: "/listByFilter",
                    method: "get",
                    params: {
                        columnName: params.columnName,
                        type: params.type,
                        value: params.value,
                    },
                })
                .then((response) => {
                    if (response) {
                        commit("list", response.data);
                        console.log({ response });
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response);
                    }
                });
        } catch (e) {
            throw e;
        }
    },
};
export const getters = {
    list: (state) => state.list,
};