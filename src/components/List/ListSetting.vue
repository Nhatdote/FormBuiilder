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
        <div class="mb-3 flex items-center">
          <color-picker
            v-model:pureColor="bgColor"
            useType="pure"
            disableHistory
            shape="circle"
            lang="en"
          />
          <label for="background" class="ml-2">{{ "Background" }}</label>
        </div>

        <div class="mb-3">
          <label for="border" class="ml-2">{{ "Border" }}</label>
          <select
            v-model="getSelected.styles.border"
            class="block w-full border border-gray-500 rounded-md p-2"
          >
            <option v-for="index in 4" :value="index" :key="index">
              {{ index }}px
            </option>
          </select>
        </div>
      </div>

      <div v-else>
        <draggable
          tag="ul"
          :list="getSelected.items"
          class="list-group"
          handle=".handle"
          item-key="id"
        >
          <template #item="{ element }">
            <div class="border p-2 rounded-md shadow-sm mb-2">
              <div class="flex list-user">
                <div
                  class="font-bold flex-grow"
                  @click="toggleCollapse(element)"
                >
                  {{ element.title }}
                </div>
                <div class="flex-shrink-0 list-user-actions">
                  <DuplicateIcon
                    title="Clone"
                    class="w-6 h-6 p-1 text-green-600"
                    @click="userClone(element)"
                  />
                  <TrashIcon
                    title="Delete"
                    class="w-6 h-6 p-1 text-red-600"
                    @click="userDelete(element)"
                  />
                  <MenuAlt4Icon
                    title="Sort"
                    class="handle w-6 h-6 p-1 text-gray-400"
                  />
                </div>
              </div>
              <div v-show="element.id === collapse" class="transition-all">
                <div class="mb-2">
                  <label for="title" class="text-sm">{{ "Name" }}</label>
                  <input
                    type="text"
                    class="block w-full border border-gray-500 rounded-md p-2"
                    v-model="element.title"
                  />
                </div>
                <div class="mb-2">
                  <label for="avatar" class="text-sm">{{ "Avatar" }}</label>
                  <div class="grid grid-cols-4 gap-2">
                    <div
                      v-for="(img, i) in images"
                      :key="i"
                      :class="
                        element.avatar === img ? 'border-2 border-red-400' : ''
                      "
                    >
                      <img :src="img" alt="" @click="element.avatar = img" />
                    </div>
                  </div>
                </div>
                <div class="mb-2">
                  <label for="position" class="text-sm">{{ "Position" }}</label>
                  <input
                    type="text"
                    class="block w-full border border-gray-500 rounded-md p-2"
                    v-model="element.position"
                  />
                </div>
                <div class="mb-2">
                  <label for="content" class="text-sm">{{ "Content" }}</label>
                  <textarea
                    type="text"
                    class="block w-full border border-gray-500 rounded-md p-2"
                    rows="5"
                    v-model="element.content"
                  ></textarea>
                </div>
              </div>
            </div>
          </template>
        </draggable>

        <div class="text-blue-500 font-bold cursor-pointer" @click="userAdd">
          {{ "+ Add item" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import { mapGetters } from "vuex";
import { clone, uuid } from "../../functions/helpers";
import { DuplicateIcon, TrashIcon, MenuAlt4Icon } from "@heroicons/vue/outline";
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
    ColorPicker,
    DuplicateIcon,
    TrashIcon,
    MenuAlt4Icon,
  },
  data() {
    return {
      collapse: null,
      activeTab: "content",
      tabs: [
        { id: "content", label: "Content" },
        { id: "design", label: "Design" },
      ],
      content: {},
      design: {},
      images: [
        "https://thumbs.dreamstime.com/b/funny-cartoon-monster-face-vector-square-avatar-halloween-175916751.jpg",
        "https://thumbs.dreamstime.com/b/cute-monster-face-square-avatar-vector-stock-cute-monster-face-square-avatar-114650081.jpg",
        "https://thumbs.dreamstime.com/b/cartoon-monster-face-vector-halloween-happy-monster-square-avatar-funny-monster-mask-blue-design-t-shirt-sticker-print-97157979.jpg",
        "https://previews.123rf.com/images/juristka/juristka1705/juristka170500007/77884667-cartoon-monster-face-vector-halloween-blue-smiling-fairy-tale-avatar-vector-illustration-.jpg",
        "https://as1.ftcdn.net/v2/jpg/01/93/12/70/1000_F_193127021_CH25xxBJmcBtWJ3TS6oK70IHDfI4vNLy.jpg",
        "https://media.istockphoto.com/vectors/cartoon-monster-face-vector-halloween-pink-monster-avatar-vector-id610668770?k=20&m=610668770&s=170667a&w=0&h=QfeALgkZMc6HNRc2P4QvEhCC_TXf_GgMlQ4CT6ghCmk=",
        "https://media.istockphoto.com/vectors/funny-cartoon-monster-face-vector-monster-square-avatar-vector-id1212937699?k=20&m=1212937699&s=170667a&w=0&h=qvoSZ28QKOdtTi74dOgGAw_egmlIBWe66tJxlPCH26A=",
        "https://img.myloview.com/stickers/funny-cartoon-monster-face-vector-monster-square-avatar-400-205411727.jpg",
      ],
      bgColor: "white",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    toggleCollapse(item) {
      if (this.collapse && this.collapse === item.id) {
        this.collapse = null;
        return;
      }

      this.collapse = item.id;
    },
    init() {
      const settings = this.settings;
      this.content = settings.content;
      this.design = settings.design;
    },
    userAdd() {
      const uid = uuid();
      this.getSelected.items.push({
        id: uid,
        component_setting: "SimpleTextSetting",
        avatar: null,
        title: "Name " + uid,
        position: "Position " + uid,
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      });
    },
    userClone(item) {
      const newItem = {
        ...item,
        id: uuid(),
        title: item.title + " copy",
      };

      let items = this.getSelected.items;
      let pos = items.findIndex((h) => h === item);
      if (!pos) {
        this.getSelected.items.push(newItem);
      } else {
        pos = pos + 1;
        items = [...items.slice(0, pos), newItem, ...items.slice(pos)];
        this.getSelected.items = items;
      }
    },
    userDelete(item) {
      this.getSelected.items = this.getSelected.items.filter((h) => h !== item);
    },
  },
  computed: {
    ...mapGetters(["getSelected"]),
    settings() {
      const elem = this.getSelected;
      let design = {};
      let content = {};

      if (elem && elem.styles) {
        design = {
          background: elem.styles.background,
          align: elem.styles.align,
          boxShadow: elem.styles.boxShadow,
          border: elem.styles.border,
          spacing: elem.styles.spacing,
          padding: elem.styles.padding,
        };
      }

      if (elem && elem.settings) {
        content = {
          layout: elem.settings.layout,
          image: elem.settings.image,
          title: elem.settings.title,
          content: elem.settings.content,
          btnText: elem.settings.btnText,
          link: elem.settings.link,
        };
      }

      return {
        design: design,
        content: content,
      };
    },
    styles() {},
  },
  watch: {
    bgColor(val) {
      this.getSelected.styles.bgColor = val;
    },
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
    getSelected(val) {
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
.list-user {
  .list-user-actions {
    display: none;
  }
  &:hover {
    .list-user-actions {
      display: flex;
    }
  }
}
</style>
