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
          <label for="font_style">{{ "Spacing" }}</label>
          <input
            class="block w-full border border-gray-500 rounded-md p-2"
            v-model="getSelected.styles.spacing"
          />
        </div>

        <div class="mb-3">
          <label for="color">{{ "Box Shadow" }}</label>
          <br />
          <select
            v-model="getSelected.styles.boxShadow"
            class="block w-full border border-gray-500 rounded-md p-2"
          >
            <option value="shadow-sm">Small</option>
            <option value="shadow-md">Medium</option>
            <option value="shadow-lg">Large</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="border">Border</label>
          <div class="flex gap-2 items-center w-100">
            <select
              style="width: 55px"
              class="block border border-gray-500 rounded-md p-1"
              v-model="getSelected.styles.border_width"
            >
              <option value="">None</option>
              <option v-for="index in 5" :value="`${index}px`" :key="index">
                {{ index }}px
              </option>
            </select>

            <select
              class="block border border-gray-500 rounded-md p-1 flex-grow"
              v-model="getSelected.styles.border_style"
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
            </select>

            <color-picker
              v-model:pureColor="getSelected.styles.border_color"
              useType="pure"
              disableHistory
              shape="circle"
              lang="en"
            />

            <select
              style="width: 55px"
              class="block border border-gray-500 rounded-md p-1"
              v-model="getSelected.styles.border_radius"
            >
              <option value="0">None</option>
              <option v-for="index in 10" :value="`${index}px`" :key="index">
                {{ index }} Radius
              </option>
            </select>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="mb-3">
          <label for="content">{{ "Layout" }}</label>
          <select
            class="block w-full border border-gray-500 rounded-md p-2"
            v-model="getSelected.settings.layout"
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
              <img
                :src="img"
                alt=""
                @click="getSelected.settings.image = img"
              />
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="tag">{{ "Title" }}</label>
          <input
            v-model="getSelected.settings.title"
            class="block w-full border border-gray-500 rounded-md p-2"
          />
        </div>

        <div class="mb-3">
          <label for="tag">{{ "Content" }}</label>
          <textarea
            v-model="getSelected.settings.content"
            class="block w-full border border-gray-500 rounded-md p-2"
          >
          </textarea>
        </div>

        <div class="mb-3">
          <label for="tag">{{ "Btn text" }}</label>
          <input
            v-model="getSelected.settings.btnText"
            class="block w-full border border-gray-500 rounded-md p-2"
          />
        </div>

        <div class="mb-3">
          <label for="tag">{{ "Btn Link" }}</label>
          <input
            v-model="getSelected.settings.link"
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
  mounted() {},
  methods: {},
  computed: {
    ...mapGetters(["getSelected"]),
  },
  watch: {},
};
</script>
