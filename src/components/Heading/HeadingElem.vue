<template>
  <component :is="settings.tag" :style="settings.styles">
    <span v-if="settings.link === null">{{ settings.content }}</span>
    <a v-else :href="settings.link" class="text-inherit" target="_blank">
      {{ settings.content }}
    </a>
  </component>
</template>

<script>
export default {
  props: {
    elem: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},
  computed: {
    settings() {
      const elem = this.elem;
      const styles = this.elem.styles;
      let elemStyles = [];

      if (styles) {
        styles.align && elemStyles.push(`text-align: ${styles.align}`);
        styles.color && elemStyles.push(`color: ${styles.color}`);
        switch (styles.property) {
          case "italic":
            elemStyles.push("font-style: italic");
            break;
          case "bold":
            elemStyles.push("font-weight: bold");
            break;
          case "line-through":
            elemStyles.push("text-decoration: line-through");
            break;
          default:
            elemStyles.push("font-style: normal");
        }
      }

      return {
        name: elem.name,
        tag: elem.settings && elem.settings.tag ? elem.settings.tag : "h1",
        link: elem.settings && elem.settings.link ? elem.settings.link : null,
        content:
          elem.settings && elem.settings.content
            ? elem.settings.content
            : elem.desc || elem.label,
        styles: elemStyles,
      };
    },
  },
};
</script>
