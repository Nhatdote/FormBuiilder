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
      selected: null,
      safeSelected: null,
    };
  },
  getters: {
    xBuilders: (state) => state.builders,
    getSelected: (state) => state.selected,
    getSafeSelected: (state) => state.safeSelected,
  },
  actions: {
    add: ({ commit }, item) => commit("add", item),
    update: ({ commit }, item, data) => commit("update", item, data),
    remove: ({ commit }, item) => commit("remove", item),
    set: ({ commit }, items) => commit("set", items),
    setSelect: ({ commit }, item) => commit("setSelect", item),
    setSafeSelect: ({ commit }, item) => commit("setSafeSelect", clone(item)),
    settingOpen: ({ commit }, item) => commit("settingOpen", item),
  },
  mutations: {
    add: (state, item) => state.builders.push(item),
    update: (state, props) => {
      state.builders.forEach((h, i) => {
        if (h === props.item) {
          state.builders[i] = props.data;
          state.selected = props.data;
        }
      });
    },
    remove: (state, item) => state.builders.filter((h) => h !== item),
    set: (state, items) => (state.builders = items),
    setSelect: (state, item) => (state.selected = item),
    setSafeSelect: (state, item) => (state.safeSelected = item),
    settingOpen: (state, item) => {
      state.selected = item;
      state.safeSelected = clone(item);
    },
  },
});

export default store;
