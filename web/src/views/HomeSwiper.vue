<template>
  <div class="swiper">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="//ossweb-img.qq.com/upload/adw/image/20200429/0181ecf7eda7589f0e780207e135f974.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="//ossweb-img.qq.com/upload/adw/image/20200429/2556a7fe148ede142beb421ad1ffaacc.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="//ossweb-img.qq.com/upload/adw/image/20200429/0181ecf7eda7589f0e780207e135f974.jpeg" alt />
      </swiper-slide>

      <div class="swiper-pagination pagination-home text-right" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  }
};
</script>

<style>
</style>