<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { BeakerIcon } from "@heroicons/vue/solid";

defineProps({
  msg: String,
});

const store = useStore();

const counter = computed(() => store.getters.count);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button
      type="button"
      @click="store.dispatch('increment')"
      class="block mx-auto mb-1"
    >
      Count from vuex: {{ counter }}
    </button>

    <button type="button" @click="store.dispatch('resetCounter')">Reset</button>
    <p class="font-bold underline">
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
