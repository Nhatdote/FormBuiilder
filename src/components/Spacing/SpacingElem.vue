<template>
  <div :style="`padding: ${elem.settings.spacing}px 0`"></div>
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
};
</script>
