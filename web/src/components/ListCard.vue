<template>
  <div>
    <my-card :title="title" :moreFlag="moreFlag" :border="border" :header="header"></my-card>

    <div class="card-body py-1" :class="{'bg-white':white,'px-3':py3}">
      <div class="navBox">
        <div class="nav d-flex jc-between fz-xs">
          <div
            class="nav-item"
            :class="{active: active === i }"
            v-for="(cate,i) in cates"
            :key="i"
            @click="$refs.list.$swiper.slideTo(i)"
          >
            <div class="nav-link active">{{cate.name}}</div>
          </div>
        </div>
      </div>
      <div>
        <swiper ref="list" @slide-change="slideChange" :options="{autoHeight:true}">
          <swiper-slide v-for="(cate,i) in cates" :key="i" @slideChangeTransitionEnd="active = i">
            <slot name="items" :cate="cate"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    py3: { type: Boolean, default: true },
    header: { type: Boolean, default: true },
    white: { type: Boolean, default: true },
    load: { type: Object },
    title: { type: String, default: "" },
    icon: { type: String },
    border: { type: Boolean, default: true },
    moreFlag: {
      type: Object,
      default: function() {
        return {
          flag: true,
          url: ""
        };
      }
    },
    cates: { type: Array, required: true }
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    slideChange() {
      this.active = this.$refs.list.$swiper.realIndex;
      this.$emit("sendActive", this.active);
    }
  },
  watch: {}
};
</script>

<style lang="scss">
</style>