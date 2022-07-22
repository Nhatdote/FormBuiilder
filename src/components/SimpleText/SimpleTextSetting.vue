<template>
  <div>
    <div class="mb-3 flex">
      <color-picker
        v-model:pureColor="target.color"
        useType="pure"
        disableHistory
        shape="circle"
        lang="en"
      />
      <label for="color">{{ "Font color" }}</label>
    </div>

    <div class="mb-3">
      <label for="color">{{ "Typography" }}</label>
      <select
        v-model="target.typography"
        class="block w-full border border-gray-500 rounded-md p-2"
      >
        <option value="font-bold">{{ "Bold" }}</option>
        <option value="italic">{{ "Italic" }}</option>
        <option value="line-through">{{ "Line through" }}</option>
        <option value="underline">{{ "Underline" }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import { ColorPicker } from "vue3-colorpicker";
import { mapGetters } from "vuex";

export default {
  components: {
    ColorPicker,
  },
  props: {
    version: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      target: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.target =
        this.getSelected.child_styles[this.getSelected.child_target] || {};
    },
  },
  computed: {
    ...mapGetters(["getSelected"]),
  },
  watch: {
    version() {
      this.init();
    },
    target: {
      handler(val) {
        this.$emit("draft", {
          child_styles: {
            ...this.getSelected.styles,
            [this.getSelected.child_target]: val,
          },
        });
      },
      deep: true,
    },
  },
};
</script>
