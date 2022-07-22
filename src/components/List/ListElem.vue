<template>
  <div
    class="p-2"
    :style="`background-color: ${elem.styles.bgColor || 'white'}; ${
      elem.styles.border ? 'border: ' + elem.styles.border + 'px solid' : ''
    }`"
  >
    <div class="grid grid-cols-3 gap-8">
      <div v-for="(item, i) in items" :key="i">
        <div
          :class="`builder-elem mb-5 ${
            getSelected &&
            item.id === getSelected.id &&
            item.child_target === 'content'
              ? 'active'
              : ''
          } ${item.content_class}`"
          :style="`${
            settings.align ? 'text-align: ' + settings.align + ';' : ''
          } ${item.content_color ? 'color: ' + item.content_color : ''}`"
          @click.stop="settingChildOpen(item, 'content')"
        >
          {{ item.content }}
        </div>

        <div class="flex">
          <div class="flex-shrink-0">
            <div class="rounded-full h-14 w-14 border overflow-hidden">
              <img v-if="item.avatar" :src="item.avatar" :alt="item.title" />
              <div v-else class="w-full h-full bg-purple-400"></div>
            </div>
          </div>
          <div class="flex-grow ml-3 text-left">
            <div
              :class="`builder-elem ${
                getSelected &&
                item.id === getSelected.id &&
                item.child_target === 'title'
                  ? 'active'
                  : ''
              } ${item.title_class}`"
              :style="`${
                settings.color ? 'color: ' + settings.color + ';' : ''
              } ${item.title_color ? 'color: ' + item.title_color : ''}`"
              @click.stop="settingChildOpen(item, 'title')"
            >
              {{ item.title }}
            </div>
            <div>{{ item.position }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { clone } from "../../functions/helpers";

export default {
  props: {
    elem: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    ...mapActions(["settingOpen", "setVersion"]),
    settingChildOpen(item, type) {
      this.$store.commit("settingOpen", [item, type]);
      this.setVersion();
    },
  },
  computed: {
    ...mapGetters(["getSelected"]),
    settings() {
      let elem = this.elem;

      return {
        align: elem.styles.align,
        property: elem.styles.property,
        color: elem.styles.color,
      };
    },
    items() {
      // const list = this.elem.items;

      // list.forEach((h) => {
      //   if (h.styles && h.styles.title) {
      //     h.title_class = h.styles.title.typography;
      //     h.title_color = h.styles.title.color;
      //   }
      //   if (h.styles && h.styles.content) {
      //     h.content_class = h.styles.content.typography;
      //     h.content_color = h.styles.content.color;
      //   }
      // });

      // return list;

      return this.elem.items.map((h) => {
        if (h.child_styles && h.child_styles.title) {
          h.title_class = h.child_styles.title.typography;
          h.title_color = h.child_styles.title.color;
        }

        if (h.child_styles && h.child_styles.content) {
          h.content_class = h.child_styles.content.typography;
          h.content_color = h.child_styles.content.color;
        }

        return h;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.builder-elem {
  border: 1px dashed transparent;

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
