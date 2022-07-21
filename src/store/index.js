import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { clone } from "../functions/helpers";

const store = createStore({
  // plugins: [
  //   createPersistedState({
  //     storage: window.sessionStorage,
  //   }),
  // ],
  state() {
    return {
      builders: [],
    };
  },
  getters: {
    xBuilders: (state) => state.builders,
  },
  actions: {
    add: ({ commit }, item) => commit("add", item),
    update: ({ commit }, item, data) => commit("update", item, data),
    remove: ({ commit }, item) => commit("remove", item),
    set: ({ commit }, items) => commit("set", items),
  },
  mutations: {
    add: (state, item) => state.builders.push(item),
    update: (state, item, data) => {
      state.builders = state.builders.map((h) => {
        if (h === item) {
          h = {
            ...h,
            ...data,
          };
        }
        return h;
      });
    },
    remove: (state, item) => state.builders.filter((h) => h !== item),
    set: (state, items) => (state.builders = clone(items)),
  },
});

export default store;
