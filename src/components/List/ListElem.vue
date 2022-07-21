<template>
  <div :class="`bg-white p-2`">
    <div class="grid grid-cols-3 gap-8">
      <div v-for="(item, i) in items" :key="i">
        <div
          class="mb-4 builder-elem"
          :style="`${settings.align ? 'text-align: ' + settings.align : ''}`"
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
              class="font-bold builder-elem"
              :style="`${
                settings.color ? 'color: ' + settings.color + ';' : ''
              }`"
              @click.stop="test"
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
    test() {
      alert(1);
    },
  },
  computed: {
    settings() {
      const elem = this.elem;

      return {
        align: elem.styles.align,
        property: elem.styles.property,
        color: elem.styles.color,
      };
    },
    items() {
      return this.elem.items;
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
