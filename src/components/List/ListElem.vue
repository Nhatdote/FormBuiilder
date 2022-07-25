<template>
  <div :class="classNames.wrap" :style="css.wrap">
    <div class="grid grid-cols-3 gap-8">
      <div v-for="(item, i) in items" :key="i">
        <div
          :class="`${
            getSelected &&
            item.id === getSelected.id &&
            item.child_target === 'content'
              ? 'active'
              : ''
          } ${classNames.content}`"
          :style="css.content"
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
              :class="`${
                getSelected &&
                item.id === getSelected.id &&
                item.child_target === 'title'
                  ? 'active'
                  : ''
              } ${classNames.title}`"
              :style="css.title"
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
    settingChildOpen(item, target) {
      item.parent_id = this.elem.id;
      item.child_target = target;

      this.$store.commit("settingOpen", clone(item));
      this.setVersion();
    },
  },
  computed: {
    ...mapGetters(["getSelected"]),
    items() {
      return this.elem.items;
    },
    classNames() {
      const elem = this.elem;

      const wrapClass = [];
      elem.styles.boxShadow && wrapClass.push(elem.styles.boxShadow);
      elem.styles.padding && wrapClass.push(elem.styles.padding);

      const contentClass = ["builder-elem", "mb-5"];
      elem.styles.content_typography &&
        contentClass.push(elem.styles.content_typography);

      const titleClass = ["builder-elem"];
      elem.styles.title_typography &&
        titleClass.push(elem.styles.title_typography);

      return {
        wrap: wrapClass.join(" "),
        content: contentClass.join(" "),
        title: titleClass.join(" "),
      };
    },
    css() {
      const elem = this.elem;
      const styles = elem.styles;

      const wrapCss = [];
      styles.bgColor && wrapCss.push(`background-color: ${styles.bgColor}`);
      if (styles.border_width) {
        wrapCss.push(`border: ${styles.border_width} solid`);
        styles.border_style &&
          wrapCss.push(`border-style: ${styles.border_style}`);
        styles.border_color &&
          wrapCss.push(`border-color: ${styles.border_color}`);
        styles.border_radius &&
          wrapCss.push(`border-radius: ${styles.border_radius}`);
      }

      const contentCss = [];
      styles.align && contentCss.push(`text-align: ${styles.align}`);
      styles.content_color && contentCss.push(`color: ${styles.content_color}`);

      const titleCss = [];
      styles.title_color && titleCss.push(`color: ${styles.title_color}`);

      return {
        wrap: wrapCss.join(";"),
        content: contentCss.join(";"),
        title: titleCss.join(";"),
      };
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
