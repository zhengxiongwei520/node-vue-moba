<template>
  <div class="page-article">
    <div class="article-header p-2 d-flex jc-between ai-center">
      <span class="iconfont icon-gengduo"></span>
      <h4 class="flex-1 ml-2 text-title fz-ssm text-ellipsis" >{{article.title}}</h4>
      <span class="fz-xs">{{article.createdAt | dateFormate('MM-dd') }}</span>
    </div>
    <div class="article-body p-3">
      <div class="body fs-lg" v-html="article.body"></div>
    </div>
    <div class="related mt-3 border-top px-2">
      <div class="mb-2">
        <span class="iconfont icon-gengduo"></span>
        <strong class="text-title ml-1">相关资讯</strong>
      </div>
      <div class="d-flex al-center flex-wrap mb-2 w-100 ">
        <router-link
          class="p-1 d-flex w-100 jc-between"
          tag="div"
          :to="`/article/${item._id}`"
          v-for="item in article.related"
          :key="item._id"
        >
          <span style="width:75%" class="text-ellipsis">{{item.title}}</span>
          <span class="fz-sm text-grey-1">{{item.createdAt | dateFormate('yyyy-MM-dd')}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { require: true },
    article: {}
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.page-article {
  .icon-gengduo {
    font-size: 1.5385rem;
  }
  .article-header {
    border-bottom: solid 1px $border-color;
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
  .related {
  }
}
</style>