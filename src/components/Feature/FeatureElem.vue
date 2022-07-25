<template>
  <div>
    <div :class="classNames.wrap" :style="css.wrap">
      <div class="left">
        <img
          v-if="elem.settings.image"
          :src="elem.settings.image"
          alt=""
          class="w-full"
        />
        <div
          v-else
          :style="`width: 100%; min-height: 300px; background-color: ${elem.styles.background}`"
        ></div>
      </div>
      <div class="right" :style="css.right">
        <div
          class="font-bold"
          :style="
            elem.styles.spacing ? `margin: ${elem.styles.spacing}px 0` : ''
          "
        >
          {{ elem.settings.title }}
        </div>
        <div
          :style="
            elem.styles.spacing ? `margin: ${elem.styles.spacing}px 0` : ''
          "
        >
          {{ elem.settings.content }}
        </div>
        <a
          :href="elem.settings.link"
          target="_blank"
          v-if="elem.settings.link"
          class="bg-purple-500 hover:bg-purple-600 btn"
        >
          {{ elem.settings.btnText }}
        </a>
        <button class="bg-purple-500 hover:bg-purple-600" v-else>
          {{ elem.settings.btnText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
  computed: {
    classNames() {
      const elem = this.elem;
      const styles = elem.styles;

      const wrapClass = ["flex overflow-hidden"];
      styles.boxShadow && wrapClass.push(styles.boxShadow);
      wrapClass.push(`layout-${elem.settings.layout || "1"}`);

      return {
        wrap: wrapClass.join(" "),
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
      }
      styles.border_radius &&
        wrapCss.push(`border-radius: ${styles.border_radius}`);

      const rightCss = [];
      styles.padding && rightCss.push(`padding: ${styles.padding}px`);
      styles.align && rightCss.push(`text-align: ${styles.align}`);
      styles.background &&
        rightCss.push(`background-color: ${styles.background}`);

      return {
        wrap: wrapCss.join(";"),
        right: rightCss.join(";"),
      };
    },
  },
};
</script>

<style scoped lang="scss">
a.btn {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
  display: inline-block;
  color: unset;
}

.layout-1,
.layout-2 {
  .left {
    flex-basis: 50%;
  }
  .right {
    flex-basis: 50%;
  }
}

.layout-2 {
  flex-direction: row-reverse;
}

.layout-3 {
  flex-direction: column;
}

.layout-4 {
  flex-direction: column-reverse;
}
</style>
