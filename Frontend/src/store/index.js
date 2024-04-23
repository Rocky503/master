import { createStore } from 'vuex';

const store = createStore({
    state: {
        userId: null,
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
        },
    },
    actions: {
        updateUserId({ commit }, userId) {
            commit('setUserId', userId);
        },
    },
    getters: {
        getUserId(state) {
            return state.userId;
        },
    },
});

export default store;
