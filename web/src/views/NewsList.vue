<template>
  <div class="newslist-page">
    <div class="nav d-flex">
      <div
        class="nav-item2 text-center p-2 fz-xs"
        v-for="(item,i) in cates"
        :key="item._id"
        @click="navClick(i)"
        :class="{active:currentIndex == i}"
      >
        <p>{{item.name}}</p>
      </div>
    </div>

    <ul v-if="cates" class="newslist p-1">
      <router-link
        :to="`/article/${news._id}`"
        v-for="news in cates[currentIndex].newsList.slice(0, limit)"
        :key="news._id"
        class="w-100 p-1 d-flex jc-between"
        tag="li"
      >
        <p class="title fz-ssm text-ellipsis">{{news.title}}</p>
        <p class="time fz-xs text-grey-3">{{news.createdAt | dateFormate("yyyy-MM-dd")}}</p>
      </router-link>
    </ul>

    <div class="w-100 bg-grey-4 p-2 text-center" v-if="cates">
      <p class="text-grey-3 fz-ssm" @click="limit+=4">
        <span v-if="limit<cates[currentIndex].newsList.length">点击加载更多</span>
        <span v-else>已加载完毕</span>
      </p>
    </div>
    <p>ss</p>
    <p>ss</p>
    <p>ss</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cates: null,
      currentIndex: 0,
      limit: 4
    };
  },
  methods: {
    async fetchCates() {
      const res = await this.$http.get("/news/list");
      this.cates = res.data;
    },
    navClick(i) {
      this.currentIndex = i;

      this.limit = 4;
    }
  },
  created() {
    this.fetchCates();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

.newslist-page {
  .nav-item2 {
    width: 20%;
    border-right: solid 1px map-get($map: $colors, $key: "border-rgiht");
    &.active {
      background: url("https://game.gtimg.cn/images/yxzj/m/m201606/cp/video_navBg.png");
      background-size: 100%;
      p {
        width: 99%;
        color: map-get($map: $colors, $key: "white");
        text-shadow: 0 0 25px rgb(213, 182, 126);
      }
    }
    &:nth-child(5) {
      border-right: none;
    }
  }
  .newslist {
    .title {
      width: 70%;
      color: #333334;
    }
  }
}
</style>