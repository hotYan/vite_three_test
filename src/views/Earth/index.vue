<template>
  <div class="">3d</div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  onMounted,
  watch,
  defineProps,
  withDefaults,
  defineEmits,
  defineExpose,
} from "vue";

const count = ref(0); //响应式的值
const state = reactive({ count: 0 }); //响应式对象
const age = computed(() => state.count); //响应式计算属性
const doubleAge = computed({
  get() {
    return state.count * 2;
  },
  set(val: number) {
    state.count = val / 2;
  },
});
onMounted(() => {});
watch(count, () => {}); // 监听单个值
watch([count, age], () => {}); // 监听多个值
// const props = defineProps({ msg: String});// 没有默认值
const props = withDefaults(defineProps<{ msg?: string }>(), { msg: "hello" }); // 带默认值
const emit = defineEmits(["click"]);
emit("click", count.value);
defineExpose();
</script>

<style lang="scss" scoped></style>
