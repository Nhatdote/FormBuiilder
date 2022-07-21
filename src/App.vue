<template>
  <div class="flex flex-col w-full min-h-screen shado gap-3 bg-gray-100">
    <div id="header" class="flex justify-between p-2 border-b bg-white">
      <ShoppingCartIcon class="text-green-600 h-10 w-10" />
      <button
        class="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
      >
        Import/Export
      </button>
    </div>

    <div class="flex-grow flex gap-3">
      <div id="side" class="flex-shrink-0 w-1/6 pl-3">
        <draggable
          class="grid grid-cols-2 gap-2 list-group"
          :list="elems"
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

      <div
        id="main"
        class="flex-grow p-2 bg-white"
        @dragenter="control.dragging = true"
        @dragleave="control.dragging = false"
      >
        <div class="h-full w-full flex items-center" v-if="isEmptyBuilder">
          <div
            class="border border-dashed border-4 text-center w-full h-60 flex items-center justify-center"
          >
            {{ "DRAG ITEM ON LEFT SIDE AND DROP HERE" }}
          </div>
        </div>

        <draggable
          v-else
          class="h-full w-full border p-2"
          item-key="id"
          :list="builders"
          @change="sort"
          @drop="onDrop"
        >
          <template #item="{ element }">
            <div
              :class="`builder-elem border border-dashed border-transparent relative ${
                selected && element.id === selected.id ? 'active' : ''
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
                @click="settingOpen(element)"
                :is="element.component"
                :elem="element"
              ></component>
            </div>
          </template>
        </draggable>
      </div>

      <div id="right" class="flex-shrink-0 w-1/6 p-2 bg-white text-left">
        <div v-if="selected">
          <component
            :is="selected.component_setting"
            :elem="selected"
            @draft="settingDraft"
          ></component>

          <div class="py-2 sticky bottom-0 bg-white">
            <div
              class="text-red-500 text-sm py-2"
              v-if="selected && selected.draft"
            >
              {{ "Thay đổi này chưa được lưu" }}
            </div>

            <div class="flex gap-x-2">
              <button
                @click="settingSave"
                class="w-full bg-purple-500 text-white hover:bg-purple-600 transition-all"
                :disabled="saving"
              >
                {{ saving ? "SAVING..." : "SAVE" }}
              </button>
              <button @click="settingCancel" class="w-full" :disabled="saving">
                {{ "CANCEL" }}
              </button>
            </div>
          </div>
        </div>

        <div v-else class="pt-20">
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
} from "@heroicons/vue/outline";
import draggable from "vuedraggable";
import elems from "./functions/elems";
import { mapActions, mapGetters } from "vuex";
import { uuid, clone } from "./functions/helpers";
import HeadingElem from "./components/Heading/HeadingElem.vue";
import HeadingSetting from "./components/Heading/HeadingSetting.vue";
import ParaElem from "./components/Paragraph/ParaElem.vue";
import ParaSetting from "./components/Paragraph/ParaSetting.vue";
import FeatureElem from "./components/Feature/FeatureElem.vue";
import FeatureSetting from "./components/Feature/FeatureSetting.vue";
import ListElem from "./components/List/ListElem.vue";
import ListSetting from "./components/List/ListSetting.vue";

export default {
  components: {
    HomeIcon,
    ShoppingCartIcon,
    FlagIcon,
    MenuAlt1Icon,
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
  },
  data() {
    return {
      elems: elems,
      builders: [],
      control: this.defaultControl(),
      selected: null,
      safeSelected: null,
      saving: false,
      isEmptyBuilder: true,
    };
  },
  mounted() {
    this.isEmptyBuilder = !this.builders.length && !this.control.dragging;
    this.builders = this.xBuilders;
  },
  methods: {
    ...mapActions(["set"]),
    defaultControl() {
      return {
        dragging: false,
        selected: null,
      };
    },
    onDragStart(elem) {
      this.control = {
        ...this.control,
        dragging: true,
        selected: elem,
      };
    },
    onDrop() {
      if (this.control && this.control.selected) {
        this.builders.push({
          ...this.control.selected,
          id: uuid(),
        });
      }

      this.control = this.defaultControl();
    },
    onDragEnd() {
      this.control = this.defaultControl();
    },
    settingOpen(item) {
      this.selected = clone(item);
      this.safeSelected = clone(item);
    },
    settingSave() {
      this.saving = true;

      this.safeSelected = this.builders.find(
        (h) => h.id === this.safeSelected.id
      );
      this.selected = this.builders.find((h) => h.id === this.safeSelected.id);

      setTimeout((h) => {
        this.saving = false;
      }, 1000);
    },
    settingCancel() {
      this.builders = this.builders.map((h) => {
        if (h.id === this.selected.id) {
          h = this.safeSelected;
        }

        return h;
      });

      this.selected = clone(this.safeSelected);
    },
    settingDraft(val) {
      this.builders = this.builders.map((h) => {
        if (h.id === this.selected.id) {
          h = {
            ...h,
            ...val,
          };
        }

        return h;
      });
    },
    sort(items) {
      console.log(this.builders);
    },
    removeElem(item) {
      if (!window.confirm("Are you sure?")) {
        return;
      }

      if (this.selected && this.selected.id === item.id) {
        this.selected = null;
      }

      this.builders = this.builders.filter((h) => h !== item);
      this.updateEmpty();
    },
    updateEmpty() {
      if (this.builders.length) {
        this.isEmptyBuilder = false;
      } else {
        this.isEmptyBuilder = true;
      }
    },
  },
  watch: {
    "control.dragging"(val) {
      this.isEmptyBuilder = !this.builders.length && !val;
    },
    builders: {
      handler(val) {
        this.set(val);
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(["xBuilders"]),
  },
};
</script>

<style lang="scss" scoped>
button[disabled] {
  background: rgb(168 85 247) !important;
  opacity: 0.7 !important;
}
.blink {
  animation: blink 0.2s ease infinite alternate;
}
@keyframes blink {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.builder-elem {
  &:hover {
    border-color: red;

    .builder-elem-remove {
      display: flex;
    }
  }
  &.active {
    border-style: solid;
    border-color: red;
  }
}
.builder-elem-remove {
  position: absolute;
  top: 0;
  right: 0;
  width: 18px;
  height: 18px;
  display: none;
  align-items: center;
  justify-content: center;
  background: red;
  opacity: 0.8;
  color: white;
  font-weight: bold;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}
</style>
