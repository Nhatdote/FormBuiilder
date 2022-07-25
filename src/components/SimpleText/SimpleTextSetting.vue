<template>
  <div>
    <div class="mb-3 flex">
      <color-picker
        v-model:pureColor="settings[target + '_color']"
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
        v-model="settings[target + '_typography']"
        class="block w-full border border-gray-500 rounded-md p-2"
      >
        <option value="">{{ "None" }}</option>
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
import { clone } from "../../functions/helpers";

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
      target: "title",
      settings: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const item = this.getSelected;
      const target = item.child_target;
      const elem = this.getMainElem(item);

      this.target = target;
      this.settings = {
        [target + "_color"]: elem ? elem.styles[target + "_color"] : null,
        [target + "_typography"]: elem
          ? elem.styles[target + "_typography"]
          : null,
      };
    },
    getMainElem(item) {
      if (!item) {
        var item = this.getSelected;
      }
      const builders = this.xBuilders;

      return builders.find((h) => h.id === item.parent_id);
    },
  },
  computed: {
    ...mapGetters(["getSelected", "xBuilders"]),
  },
  watch: {
    version() {
      this.init();
    },
    settings: {
      handler(val) {
        const builders = this.xBuilders;
        const item = this.getSelected;

        builders.forEach((h, i) => {
          if (h.id === item.parent_id) {
            builders[i].styles = {
              ...h.styles,
              ...val,
            };
          }
        });
      },
      deep: true,
    },
  },
};
</script>
