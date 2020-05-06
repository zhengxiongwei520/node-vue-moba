<template>
  <div>
    <div class="topbar bg-black py-2 px-2 d-flex ai-center">
      <router-link tag="i" to="/" class="sprite sprite-logo"></router-link>
      <div class="px-2 fz-xxs flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1">团队成就梦想</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-3 pb-2">
      <div class="nav nav-inverse d-flex jc-around text-white ai-center fz-xxs">
        <div
          class="nav-item"
          v-for="(item,i) in nav"
          :key="item.i"
          :class="{'active': $route.path == item.path}"
          @click="activeIndex=i"
        >
          <router-link :to="item.url" tag="div" class="nav-link active">{{item.name}}</router-link>
        </div>
      </div>
    </div>
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        { name: "首页", url: "/", path: "/" },
        { name: "攻略中心", url: "/strategycenter", path: "/strategycenter" },
        { name: "赛事中心", url: "/racescenter", path: "/racescenter" }
      ],
      activeIndex: 0
    };
  }
};
</script>

<style>
</style>