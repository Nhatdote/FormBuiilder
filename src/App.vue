<template>
  <div
    id="import-class"
    class="hidden p-1 p-2 p-3 p-4 p-5 p-6 p-7 p-8 p-9 p-10 shadow shadow-sm shadow-md shadow-lg"
  ></div>

  <div class="flex flex-col w-full min-h-screen shado gap-3 bg-gray-100">
    <div id="header" class="flex justify-between p-3 border-b bg-white">
      <img :src="'/logo.png'" alt="" style="height: 40px" />
      <button
        @click="exportJSON"
        class="flex align-items-center pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
      >
        <DownloadIcon class="h-5" />
        <span class="ml-2">Export</span>
      </button>
    </div>

    <div class="flex-grow flex gap-3">
      <div
        id="left"
        ref="left"
        class="flex-shrink-0 w-1/6 pl-3"
        @click.self="removeSelected"
      >
        <draggable
          class="dragArea grid grid-cols-2 gap-2 list-group"
          :list="elems"
          :group="{ name: 'builder', pull: 'clone', put: false }"
          :clone="onClone"
          item-key="id"
        >
          <template #item="{ element }">
            <div
              @dragstart="onDragStart(element)"
              @dragend="onDragEnd"
              class="bg-white p-2 hover:bg-gray-200 transition-all cursor-pointer"
            >
              <component
                :is="element.icon"
                :class="`w-8 h-8 mx-auto text-${element.color}`"
              ></component>
              <div>{{ element.label }}</div>
            </div>
          </template>
        </draggable>
      </div>

      <div id="main" class="flex-grow p-2 bg-white">
        <div class="h-full w-full flex items-center" v-show="isEmptyBuilder">
          <div
            class="border border-dashed border-4 text-center w-full h-60 flex items-center justify-center"
          >
            {{ "DRAG ITEM ON LEFT SIDE AND DROP HERE" }}
          </div>
        </div>

        <draggable
          v-show="!isEmptyBuilder"
          :class="`dragArea h-full w-full border p-2 ${
            dragging ? 'dragging' : ''
          }`"
          item-key="id"
          :list="xBuilders"
          group="builder"
          @click.self="removeSelected"
        >
          <template #item="{ element }">
            <div
              :class="`builder-elem ${
                getSelected && element.id === getSelected.id ? 'active' : ''
              }`"
            >
              <div
                class="builder-elem-remove"
                @click="removeElem(element)"
                title="Xoá"
              >
                &times;
              </div>
              <component
                @click="$store.commit('settingOpen', element)"
                :is="element.component"
                :elem="element"
              ></component>
            </div>
          </template>
        </draggable>
      </div>

      <div
        id="right"
        class="flex-shrink-0 w-1/6 p-2 bg-white text-left"
        ref="right"
      >
        <div v-if="getSelected">
          <component
            :is="getSelected.component_setting"
            @draft="settingDraft"
            :version="getVersion"
          ></component>

          <div class="py-2 sticky bottom-0 bg-white">
            <div class="flex gap-x-2">
              <button @click="settingCancel" class="w-full" :disabled="saving">
                {{ "DISCARD CHANGE" }}
              </button>
            </div>
          </div>
        </div>

        <div v-else class="pt-20 text-center">
          {{ "CLICK TO ELEM TO SETTINGS" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  HomeIcon,
  ShoppingCartIcon,
  FlagIcon,
  MenuAlt1Icon,
  CubeIcon,
  ClipboardListIcon,
  SwitchVerticalIcon,
  DownloadIcon,
} from "@heroicons/vue/outline";
import draggable from "vuedraggable";
import elems from "./functions/elems";
import { mapActions, mapGetters } from "vuex";
import { uuid, clone, _typeof } from "./functions/helpers";
import HeadingElem from "./components/Heading/HeadingElem.vue";
import HeadingSetting from "./components/Heading/HeadingSetting.vue";
import ParaElem from "./components/Paragraph/ParaElem.vue";
import ParaSetting from "./components/Paragraph/ParaSetting.vue";
import FeatureElem from "./components/Feature/FeatureElem.vue";
import FeatureSetting from "./components/Feature/FeatureSetting.vue";
import ListElem from "./components/List/ListElem.vue";
import ListSetting from "./components/List/ListSetting.vue";
import SimpleTextSetting from "./components/SimpleText/SimpleTextSetting.vue";
import SpacingElem from "./components/Spacing/SpacingElem.vue";
import SpacingSetting from "./components/Spacing/SpacingSetting.vue";
import downloadjs from "downloadjs";
import axios from "axios";

export default {
  components: {
    HomeIcon,
    ShoppingCartIcon,
    FlagIcon,
    MenuAlt1Icon,
    SwitchVerticalIcon,
    DownloadIcon,
    draggable,
    HeadingElem,
    HeadingSetting,
    ParaElem,
    ParaSetting,
    CubeIcon,
    FeatureElem,
    FeatureSetting,
    ClipboardListIcon,
    ListElem,
    ListSetting,
    SimpleTextSetting,
    SpacingElem,
    SpacingSetting,
  },
  data() {
    return {
      elems: elems,
      dragging: false,
      saving: false,
      isEmptyBuilder: true,
    };
  },
  async mounted() {
    this.isEmptyBuilder = !this.xBuilders.length && !this.dragging;

    try {
      const right = this.$refs.right;
      const left = this.$refs.left;

      let rect = right.getBoundingClientRect();
      right.style.height = rect.height + "px";
      right.style.position = "sticky";
      right.style.top = "10px";

      rect = left.getBoundingClientRect();
      left.style.height = rect.height + "px";
      left.style.position = "sticky";
      left.style.top = "10px";
    } catch {
      console.warn("can't set sticky panel");
    }

    const test = await axios.get("https://dev.beae.com");
    console.log(test);
  },
  methods: {
    ...mapActions([
      "set",
      "add",
      "update",
      "remove",
      "setSelect",
      "removeSelected",
      "setSafeSelect",
      "settingOpen",
    ]),
    onDragStart(elem) {
      this.dragging = true;
    },
    onClone(props) {
      props = clone(props);

      //@todo
      let items = props.items;
      if (items && Array.isArray(items)) {
        props.items = items.map((h) => {
          h.id = uuid();
          return h;
        });
      }

      return {
        ...props,
        id: uuid(),
      };
    },
    onDragEnd() {
      this.dragging = false;
    },
    settingCancel() {
      this.update({
        item: this.getSelected,
        data: clone(this.getSafeSelected),
      });
    },
    settingDraft(val) {
      Object.assign(this.getSelected, val);
    },
    sort(items) {
      console.log(this.builders);
    },
    removeElem(item) {
      console.log(1);
      if (!window.confirm("Are you sure?")) {
        return;
      }

      if (this.getSelected && this.getSelected.id === item.id) {
        this.setSelect(null);
      }

      this.remove(item);
      this.updateEmpty();
    },
    updateEmpty() {
      if (this.xBuilders.length) {
        this.isEmptyBuilder = false;
      } else {
        this.isEmptyBuilder = true;
      }
    },
    exportJSON() {
      const time = new Date().getTime();
      downloadjs(
        JSON.stringify(this.xBuilders),
        `${time}_builders.json`,
        "text/plain"
      );
    },
  },
  watch: {
    dragging(val) {
      this.isEmptyBuilder = !this.xBuilders.length && !val;
    },
  },
  computed: {
    ...mapGetters([
      "xBuilders",
      "getSelected",
      "getSafeSelected",
      "getVersion",
    ]),
  },
};
</script>

<style lang="scss" scoped></style>
