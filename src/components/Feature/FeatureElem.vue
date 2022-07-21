<template>
  <div>
    <div
      :class="`flex ${settings.boxShadow ? settings.boxShadow : ''} layout-${
        settings.layout
      }`"
      :style="`${settings.border ? 'border: ' + settings.border : ''}`"
    >
      <div class="left">
        <img
          v-if="settings.image"
          :src="settings.image"
          alt=""
          class="w-full"
        />
        <div
          v-else
          :style="`width: 100%; min-height: 300px; background-color: ${settings.background}`"
        ></div>
      </div>
      <div
        class="right"
        :style="`${
          settings.padding ? 'padding: ' + settings.padding + 'px;' : ''
        } ${settings.align ? 'text-align: ' + settings.align : ''}`"
      >
        <div
          class="font-bold"
          :style="settings.spacing ? `margin: ${settings.spacing}px 0` : ''"
        >
          {{ settings.title }}
        </div>
        <div :style="settings.spacing ? `margin: ${settings.spacing}px 0` : ''">
          {{ settings.content }}
        </div>
        <a
          :href="settings.link"
          target="_blank"
          v-if="settings.link"
          class="bg-purple-500 hover:bg-purple-600 btn"
        >
          {{ settings.btnText }}
        </a>
        <button class="bg-purple-500 hover:bg-purple-600" v-else>
          {{ settings.btnText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
    settings() {
      const elem = this.elem;

      return {
        layout: elem.settings.layout,
        image: elem.settings.image,
        background: elem.styles.background,
        title: elem.settings.title,
        content: elem.settings.content,
        btnText: elem.settings.btnText,
        link: elem.settings.link,
        align: elem.styles.align,
        boxShadow: elem.styles.boxShadow,
        border: elem.styles.border,
        spacing: elem.styles.spacing,
        padding: elem.styles.padding,
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
