<template>
  <div>
    <div class="flex justify-between tab-header text-center mb-3">
      <div
        :class="`w-full tab-item p-1 cursor-pointer ${
          activeTab === t.id ? 'active' : ''
        }`"
        @click="activeTab = t.id"
        v-for="t in tabs"
        :key="t.id"
      >
        {{ t.label }}
      </div>
    </div>

    <div class="tab-content">
      <div v-if="activeTab === 'design'">
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

      <div v-else>
        <div class="mb-3">
          <label for="text">Display text</label>
          <input
            type="text"
            class="block w-full border border-gray-500 rounded-md p-2"
            v-model="text"
          />
        </div>

        <div class="mb-3">
          <label for="tag">Tag</label>
          <select
            v-model="settings[target + '_tag']"
            class="block w-full border border-gray-500 rounded-md p-2"
          >
            <option value="div">Div</option>
            <option value="p">Paragraph</option>
            <option v-for="index in 6" :value="`h${index}`" :key="index">
              H{{ index }}
            </option>
          </select>
        </div>
      </div>
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
      target: "title",
      settings: {},
      text: "",
      activeTab: "content",
      tabs: [
        { id: "content", label: "Content" },
        { id: "design", label: "Design" },
      ],
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
        [target + "_tag"]: elem ? elem.styles[target + "_tag"] : null,
      };

      this.text = item[target];
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
    text(val) {
      const builders = this.xBuilders;
      const item = this.getSelected;

      builders.forEach((h, i) => {
        if (h.id === item.parent_id) {
          const _item = h.items.find((v) => v.id === item.id);
          _item[this.target] = val;
        }
      });
    },
  },
};
</script>
