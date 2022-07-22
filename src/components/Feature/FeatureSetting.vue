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
          <label for="font_style">{{ "Spacing" }}</label>
          <input
            class="block w-full border border-gray-500 rounded-md p-2"
            v-model="design.spacing"
          />
        </div>

        <div class="mb-3">
          <label for="color">{{ "Box Shadow" }}</label>
          <br />
          <select
            v-model="design.boxShadow"
            class="block w-full border border-gray-500 rounded-md p-2"
          >
            <option value="shadow-sm">sm</option>
            <option value="shadow-md">md</option>
            <option value="shadow-lg">lg</option>
          </select>
        </div>
      </div>

      <div v-else>
        <div class="mb-3">
          <label for="content">{{ "Layout" }}</label>
          <select
            class="block w-full border border-gray-500 rounded-md p-2"
            v-model="content.layout"
          >
            <option v-for="index in 4" :value="index" :key="index">
              Layout {{ index }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="link">{{ "Image" }}</label>
          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="(img, i) in images"
              :key="i"
              :class="content.image === img ? 'border-2 border-red-400' : ''"
            >
              <img :src="img" alt="" @click="content.image = img" />
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="tag">{{ "Title" }}</label>
          <input
            v-model="content.title"
            class="block w-full border border-gray-500 rounded-md p-2"
          />
        </div>

        <div class="mb-3">
          <label for="tag">{{ "Content" }}</label>
          <textarea
            v-model="content.content"
            class="block w-full border border-gray-500 rounded-md p-2"
          >
          </textarea>
        </div>

        <div class="mb-3">
          <label for="tag">{{ "Btn text" }}</label>
          <input
            v-model="content.btnText"
            class="block w-full border border-gray-500 rounded-md p-2"
          />
        </div>

        <div class="mb-3">
          <label for="tag">{{ "Btn Link" }}</label>
          <input
            v-model="content.link"
            class="block w-full border border-gray-500 rounded-md p-2"
          />
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
      images: [
        "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80",
        "https://img.freepik.com/free-photo/top-view-background-beautiful-white-grey-brown-cream-blue-background_140725-72219.jpg",
        "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v960-ning-30.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=63dd5f402645ef52fb7dfb592aec765a",
        "https://media.istockphoto.com/photos/forest-wooden-table-background-summer-sunny-meadow-with-green-grass-picture-id1353553203?b=1&k=20&m=1353553203&s=170667a&w=0&h=QTyTGI9tWQluIlkmwW0s7Q4z7R_IT8egpzzHjW3cSas=",
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const settings = this.settings;
      this.content = settings.content;
      this.design = settings.design;
    },
  },
  computed: {
    ...mapGetters(["getSelected"]),
    settings() {
      const elem = this.getSelected;

      return {
        design: {
          background: elem.styles.background,
          align: elem.styles.align,
          boxShadow: elem.styles.boxShadow,
          border: elem.styles.border,
          spacing: elem.styles.spacing,
          padding: elem.styles.padding,
        },
        content: {
          layout: elem.settings.layout,
          image: elem.settings.image,
          title: elem.settings.title,
          content: elem.settings.content,
          btnText: elem.settings.btnText,
          link: elem.settings.link,
        },
      };
    },
    styles() {},
  },
  watch: {
    content: {
      handler(val) {
        this.$emit("draft", {
          settings: val,
        });
      },
      deep: true,
    },
    design: {
      handler(val) {
        this.$emit("draft", {
          styles: val,
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
