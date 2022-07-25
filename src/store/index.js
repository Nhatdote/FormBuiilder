import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { clone, _typeof } from "../functions/helpers";

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
      version: 1,
    };
  },
  getters: {
    xBuilders: (state) => state.builders,
    getSelected: (state) => state.selected,
    getSafeSelected: (state) => state.safeSelected,
    getVersion: (state) => state.version,
  },
  actions: {
    add: ({ commit }, item) => commit("add", item),
    update: ({ commit }, props) => commit("update", props),
    remove: ({ commit }, item) => commit("remove", item),
    set: ({ commit }, items) => commit("set", items),
    setSelect: ({ commit }, item) => commit("setSelect", item),
    removeSelected: ({ commit }) => commit("removeSelected"),
    setSafeSelect: ({ commit }, item) => commit("setSafeSelect", clone(item)),
    settingOpen: ({ commit }, props) => commit("settingOpen", props),
    setVersion: ({ commit }) => commit("setVersion"),
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
    remove: (state, item) =>
      (state.builders = state.builders.filter((h) => h !== item)),
    set: (state, items) => (state.builders = items),
    setSelect: (state, item) => (state.selected = item),
    removeSelected: (state) => (state.selected = null),
    setSafeSelect: (state, item) => (state.safeSelected = item),
    settingOpen: (state, item) => {
      state.selected = item;
      state.safeSelected = clone(item);
    },
    setVersion: (state) => state.version++,
  },
});

export default store;
