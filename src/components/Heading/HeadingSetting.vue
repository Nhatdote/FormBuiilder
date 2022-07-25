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
            v-model="getSelected.styles.align"
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
            v-model="getSelected.styles.property"
          >
            <option value="normal">{{ "Normal" }}</option>
            <option value="italic">{{ "Italic" }}</option>
            <option value="bold">{{ "Bold" }}</option>
            <option value="line-through">{{ "Line through" }}</option>
          </select>
        </div>

        <div class="mb-3 flex">
          <color-picker
            v-model:pureColor="getSelected.styles.color"
            useType="pure"
            disableHistory
            shape="circle"
            lang="en"
          />
          <label for="color">{{ "Text color" }}</label>
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
            v-model="getSelected.settings.content"
            class="block w-full border border-gray-500 rounded-md p-2"
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="link">{{ "Link" }}</label>
          <input
            type="text"
            v-model="getSelected.settings.link"
            class="block w-full border border-gray-500 rounded-md p-2"
          />
        </div>

        <div class="mb-3">
          <label for="tag">{{ "Tag name" }}</label>
          <select
            v-model="getSelected.settings.tag"
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
import { mapGetters } from "vuex";

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
  mounted() {},
  methods: {},
  computed: {
    ...mapGetters(["getSelected"]),
  },
  watch: {},
};
</script>
