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
          <label for="align">{{ "Alignment" }}</label>
          <select
            class="block w-full border border-gray-500 rounded-md p-2"
            v-model="getSelected.styles.align"
          >
            <option
              v-for="align in alignments"
              :value="align.id"
              :key="align.id"
            >
              {{ align.label }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="boxShadow" class="ml-2">{{ "Box shadow" }}</label>
          <select
            v-model="getSelected.styles.boxShadow"
            class="block w-full border border-gray-500 rounded-md p-2"
          >
            <option value="">None</option>
            <option value="shadow-sm">Small</option>
            <option value="shadow-md">Medium</option>
            <option value="shadow-lg">Large</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="padding">Padding</label>
          <select
            v-model="getSelected.styles.padding"
            class="block w-full border border-gray-500 rounded-md p-2"
          >
            <option value="">None</option>
            <option v-for="index in 10" :value="`p-${index}`" :key="index">
              {{ index }}
            </option>
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
              <option
                v-for="radius in borderRadius"
                :key="radius"
                :value="radius"
              >
                {{ radius }}
              </option>
            </select>
          </div>
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
                        element.avatar === img ? 'border-4 border-red-400' : ''
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
import {
  avatars,
  uuid,
  alignments,
  borderRadius,
} from "../../functions/helpers";
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
      images: avatars,
      bgColor: "white",
      alignments,
      borderRadius,
    };
  },
  mounted() {},
  methods: {
    toggleCollapse(item) {
      if (this.collapse && this.collapse === item.id) {
        this.collapse = null;
        return;
      }

      this.collapse = item.id;
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
      if (pos === -1) {
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
  },
  watch: {
    bgColor(val) {
      this.getSelected.styles.bgColor = val;
    },
  },
};
</script>

<style lang="scss" scoped>
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
