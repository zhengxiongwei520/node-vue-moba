<template>
  <div class="card" :class="{'p-3':header,'bg-white':white}" >
    <div v-if="header" class="card-header d-flex" :class="{'border-bottom': border, 'pb-2':border}">
      <span class="iconfont" v-if="icon" :class="icon"></span>
      <div class="flex-1 ml-2 fz-sm">
        <strong>{{title}}</strong>
      </div>

      <router-link :to="moreFlag.url" class="iconfont icon-gengduo" v-if="moreFlag.flag" tag="div"></router-link>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    header: { type: Boolean, default: true },
    white: { type: Boolean, default: true },
    title: { type: String, required: true },
    icon: { type: String, default: "icon-xinwen" },
    border: { type: Boolean, default: true },
    moreFlag: {
      type: Object,
      default: function() {
        return {
          flag: false,
          url: ""
        };
      }
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
</style>