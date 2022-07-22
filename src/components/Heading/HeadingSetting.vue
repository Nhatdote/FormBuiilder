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
        <div class="mb-3">
          <label for="align">{{ "Alignment" }}</label>
          <select
            class="block w-full border border-gray-500 rounded-md p-2"
            v-model="design.align"
          >
            <option value="left">{{ "Left" }}</option>
            <option value="center">{{ "Center" }}</option>
            <option value="right">{{ "Right" }}</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="font_style">{{ "Font style" }}</label>
          <select
            class="block w-full border border-gray-500 rounded-md p-2"
            v-model="design.property"
          >
            <option value="normal">{{ "Normal" }}</option>
            <option value="italic">{{ "Italic" }}</option>
            <option value="bold">{{ "Bold" }}</option>
            <option value="line-through">{{ "Line through" }}</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="color">{{ "Text color" }}</label>
          <br />
          <color-picker
            v-model:pureColor="design.color"
            useType="pure"
            disableHistory
            shape="circle"
            lang="en"
          />
        </div>

        <div class="mb-3 hidden">
          <label for="text_shadow">{{ "Text shadow" }}</label>
          <select
            class="block w-full border border-gray-500 rounded-md p-2"
            v-model="design.text_shadow"
          >
            <option v-for="index in 3" :value="index" :key="index">
              {{ index }}px
            </option>
          </select>
        </div>
      </div>

      <div v-else>
        <div class="mb-3">
          <label for="content">{{ "Heading text" }}</label>
          <textarea
            cols="30"
            rows="5"
            v-model="content.content"
            class="block w-full border border-gray-500 rounded-md p-2"
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="link">{{ "Link" }}</label>
          <input
            type="text"
            v-model="content.link"
            class="block w-full border border-gray-500 rounded-md p-2"
          />
        </div>

        <div class="mb-3">
          <label for="tag">{{ "Tag name" }}</label>
          <select
            v-model="content.tag"
            class="block w-full border border-gray-500 rounded-md p-2"
          >
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
import "vue3-colorpicker/style.css";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { ColorPicker },
  data() {
    return {
      activeTab: "content",
      tabs: [
        { id: "content", label: "Content" },
        { id: "design", label: "Design" },
      ],
      content: {},
      design: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["update"]),
    init() {
      const settings = this.settings;
      this.content = {
        content: settings.content,
        link: settings.link,
        tag: settings.tag,
      };
      this.design = {
        align: settings.align,
        property: settings.property,
        color: settings.color,
        text_shadow: settings.text_shadow,
      };
    },
  },
  computed: {
    ...mapGetters(["getSelected"]),
    settings() {
      const elem = this.getSelected;
      const data = {};

      if (elem && elem.settings) {
        const settings = elem.settings;
        data.tag = settings.tag || "h1";
        data.content = settings.content || elem.desc || elem.label;
        data.link = settings.link || null;
      }

      if (elem && elem.styles) {
        const styles = elem.styles;
        data.align = styles.align || "left";
        data.property = styles.property || "normal";
        data.color = styles.color || "black";
        data.text_shadow = styles.text_shadow || "null";
      }

      return data;
    },
  },
  watch: {
    content: {
      handler(val) {
        this.$emit("draft", {
          settings: {
            content: val.content,
            tag: val.tag,
            link: val.link,
          },
        });
      },
      deep: true,
    },
    design: {
      handler(val) {
        this.$emit("draft", {
          styles: {
            align: val.align,
            property: val.property,
            color: val.color,
            text_shadow: val.text_shadow,
          },
        });
      },
      deep: true,
    },
    getSelected() {
      this.init();
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-item {
  border-bottom: 3px solid transparent;
  &.active {
    border-color: red;
  }
}
</style>
