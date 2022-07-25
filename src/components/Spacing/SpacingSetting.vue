<template>
  <div class="py-5">
    <div class="mb-3">
      <label for="spacing">{{ "Spacing" }}</label>
      <input
        type="number"
        class="block w-full border border-gray-500 rounded-md p-2"
        v-model="getSelected.settings.spacing"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {},
  computed: {
    ...mapGetters(["getSelected"]),
  },
};
</script>
