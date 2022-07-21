<template>
  <component :is="settings.tag">
    {{ settings.content }}
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
  computed: {
    settings() {
      const elem = this.elem;
      return {
        name: elem.name,
        tag: "p",
        content:
          elem.settings && elem.settings.content
            ? elem.settings.content
            : elem.desc || elem.label,
      };
    },
  },
};
</script>
