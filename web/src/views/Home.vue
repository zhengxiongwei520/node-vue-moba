<template>
  <div class="bg-grey-2">
    <!-- end of swiper -->
    <HomeSwiper></HomeSwiper>
    <!-- 首页导航栏 home-anv -->
    <HomeNav></HomeNav>

    <my-list-card title="新闻资讯" :cates="cates" icon="caidan" :moreFlag="{flag:true,url:'/newsList'}" class="mt-3">
      <template #items="{cate}">
        <router-link
          class="fz-ssm pb-2 d-flex py-2"
          v-for="(item,i) in cate.newsList"
          :key="i"
          tag="div"
          :to="`/article/${item._id}`"
        >
          <span class="text-grey">[{{item.cateName}}]</span>
          <span class="px-1">|</span>
          <span class="text-dark flex-1 text-ellipsis">{{item.title}}</span>
          <span class="text-grey">{{item.createdAt | dateFormate('MM-dd')}}</span>
        </router-link>
      </template>
    </my-list-card>

    <my-list-card title="英雄列表" :cates="heroesList" icon="hero" class="mt-3" :moreFlag="{flag:true,url:'/heroesList'}">
      <template #items="{cate}">
        <div class="fz-xs d-flex flex-wrap text-center" style="margin:0 -0.5rem;">
          <router-link
            v-for="(item,i) in cate.heroesList"
            :key="i"
            style="width:20%;"
            class="p-2"
            :to="`/hero/${item._id}`"
            tag="div"
          >
            <img :src="item.avatar" class="w-100" />
            <div class="mt-1">{{item.name}}</div>
          </router-link>
        </div>
      </template>
    </my-list-card>

    <strategy></strategy>

    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111s</p>
  </div>
</template>

<script>
import HomeNav from "./HomeNav";
import HomeSwiper from "./HomeSwiper";
import Strategy from "./Strategy";
export default {
  data() {
    return {
      cates: [],
      heroesList: []
    };
  },
  methods: {
    async fetchCates() {
      const res = await this.$http.get("/news/list");
      res.data.forEach(element => {
        element.newsList = element.newsList.slice(0,5)
      });
      this.cates = res.data
    },
    async fetchHeroesList() {
      const res = await this.$http.get("/heroes/list");
      this.heroesList = res.data;
    }
  },
  created() {
    this.fetchCates();
    this.fetchHeroesList();
  },
  filters: {
    dateFormate(val, fmt) {
      let getDate = new Date(val);
      let o = {
        // year不写在这里是因为不用判断是否+0
        "M+": getDate.getMonth() + 1,
        "d+": getDate.getDate(),
        "h+": getDate.getHours(),
        "m+": getDate.getMinutes(),
        "s+": getDate.getSeconds(),
        "q+": Math.floor((getDate.getMonth() + 3) / 3), // 季度
        S: getDate.getMilliseconds() // 毫秒
      };
      if (/(y+)/.test(fmt)) {
        // 判断是否需要出现年份
        fmt = fmt.replace(
          RegExp.$1,
          (getDate.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
        // 有需要就把 fmt中的 yyyy替代成年份 有几个Y显示几个数字
      }
      for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(String(o[k]).length)
          );
        }
      }
      return fmt;
    }
  },
  components: {
    HomeNav,
    HomeSwiper,
    strategy: Strategy
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: white;
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, "info");
    }
  }
}

</style>