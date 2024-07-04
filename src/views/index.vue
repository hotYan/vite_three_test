<template>
  <div style="position: relative">
    <Menu class="left_warp"></Menu>
    <div class="right_warp">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from "../components/Menu.vue";
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

<style scoped>
.left_warp {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  background-color: #001529;
}
.right_warp {
  width: calc(100vw - 200px);
  height: 100vh;
  margin-left: 200px;
  background-color: darkcyan;
  /* padding: 20px; */
}
</style>
