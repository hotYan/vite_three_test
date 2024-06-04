<template>
  <div class="">
    <ul>
      <li
        :class="[currentRoute === list.link ? 'active' : '']"
        v-for="list in Lists"
        :key="list.name"
        @click="handleClick(list.link)"
      >
        {{ list.name }}
      </li>
    </ul>
  </div>
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
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
console.log(route, 11);

const handleClick = (link: string) => {
  router.push({ path: link });
};
const Lists = [
  {
    name: "3D地球",
    link: "/earth",
  },
  {
    name: "平面地图",
    link: "/map",
  },
  {
    name: "粮仓",
    link: "/flame",
  },
];
// === 响应式基础 ====
const count = ref(0); //响应式的值
const state = reactive({ count: 0 }); //响应式对象
// ===  计算属性 ===
const currentRoute = computed(() => route.path);
const age = computed(() => state.count); //响应式计算属性
// 可写计算属性
const doubleAge = computed({
  get() {
    return state.count * 2;
  },
  set(val: number) {
    state.count = val / 2;
  },
});
// === watch ===
watch(count, () => {}); // 监听单个值
watch([count, age], () => {}); // 监听多个值

// === 生命周期 ===
onMounted(() => {});

// === Props ===
// const props = defineProps({ msg: String});// 没有默认值
const props = withDefaults(defineProps<{ msg?: string }>(), { msg: "hello" }); // 带默认值

// === Emits ===
const emit = defineEmits(["click"]);
emit("click", count.value);

// === 暴露组件的属性或方法 ====
defineExpose();
</script>

<style scoped>
ul {
  padding: 0;
}
ul li {
  list-style-type: none;
  text-align: center;
  padding: 10px 0;
  color: #1677ff;
}
.active {
  color: white;
  background: #1677ff;
}
</style>
