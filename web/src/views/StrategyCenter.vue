<template>
  <div class="swiper">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="item in swiperList" :key="item">
        <img class="w-100" :src="item" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right" slot="pagination"></div>
    </swiper>

    <Strategy></Strategy>
  </div>
</template>

<script>
import Strategy from "./Strategy";
export default {
  data() {
    return {
      swiperList: [
        "https://shp.qpic.cn/cfwebcap/0/82d90968e8f9e9155bdcdd28ded549e2/0/",
        "https://shp.qpic.cn/cfwebcap/0/0d0994e32bf5aa6da74a885d8dbf6182/0/",
        "https://shp.qpic.cn/cfwebcap/0/85b2aa8170869826c38f730ef06e0798/0/",
        "https://shp.qpic.cn/cfwebcap/0/5b2c74d4b0d2fb89759255332cd27d2a/0/"
      ],
      swiperOptions: {
        pagination: {
          el: ".pagination-home"
        },
        autoplay: {
          disableOnInteraction: false,
          delay: 1000
        }
      }
    };
  },
  components: {
    Strategy
  }
};
</script>

<style>
</style>