<template>
  <div>
    <div class="mb-3">
      <label for="color">{{ "Font color" }}</label>
      <color-picker useType="pure" disableHistory shape="circle" lang="en" />
    </div>
  </div>
</template>

<script>
import { ColorPicker } from "vue3-colorpicker";
import { mapGetters } from "vuex";

export default {
  components: {
    ColorPicker,
  },
  props: {},
  data() {
    return {};
  },
  mounted() {
    console.log(this.getSelected);
  },
  computed: {
    ...mapGetters(["getSelected"]),
  },
};
</script>
