<template>...</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {},
  computed: {
    ...mapGetters(["getSelected"]),
  },
};
</script>
