<template>
  <div class="home-nav ">
    <div class="nav-icons text-center mt-3 bg-white fz-xs pt-3 text-grey1">
      <div class="d-flex flex-wrap">
        <div class="nav-icon-item mb-2" v-for="(n,i) in 10" :key="n" v-show="spreadFlag ? true :!spreadFlag&&i<4">
          <i class="sprite sprite-news"></i>           
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="py-1 bg-light fz-xs d-flex jc-center ai-center" @click="spread">
        <i class="sprite sprite-arrow" :class="{spread : !spreadFlag}"></i>
        <div class="">{{spreadFlag ? "收起" : "展开"}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spreadFlag: false // 展开标记
    };
  },
  methods: {
    spread() {
      this.spreadFlag = !this.spreadFlag;
    }
  }
};
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.spread{
  transform: rotate(180deg);
}

.nav-icons {
  .nav-icon-item {
    width: 25%;
    border-right: solid 1px $border-color;
    &:nth-child(4n) {
      border-right: none;   
    }
  }
}
</style>