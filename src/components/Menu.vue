<template>
  <div class="">
    <ul>
      <li
        :class="[currentRoute === list.path ? 'active' : '']"
        v-for="list in Lists"
        :key="list.name"
        @click="handleClick(list.path)"
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
console.log(router, 22);

const handleClick = (path: string) => {
  router.push({ path });
};
const Lists = computed(() => {
  const arr = router.options.routes[0].children!.map((item) => {
    return {
      name: item.name,
      path: "/" + item.path,
      hidden: item.meta && item.meta.hidden ? item.meta.hidden : false,
    };
  });
  return arr.filter((i) => i.hidden !== true);
});

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
  color: rgba(255, 255, 255, 0.65);
}

li:hover {
  cursor: pointer;
  color: #ffffff;
  /* background: #1677ff; */
}
.active {
  color: #ffffff;
  background: #1677ff;
  border-radius: 4px;
}
</style>
