<template>
  <div class="strategy-content">
    <my-list-card
      title="图文攻略"
      icon="iconfont icon-xinwen"
      :moreFlag="{flag:true,url:'/strategycenter'}"
      :cates="cates"
      ref="strategycenter"
      @sendActive="getActive"
      class="mt-3"
      :header="true"
    >
      <template #items="{cate}">
        <div class="fz-xxs d-flex flex-wrap mt-2">
          <div
            v-for="(item,i) in cate.list"
            :key="i"
            tag="div"
            to="/"
            class="d-flex w-100 mb-1 p-1 border-bottom"
            style="height:5.5rem;"
            v-show="i < a"
          >
            <router-link tag="div" :to="`/strategies/${item._id}`" style="width:35%;" class="mr-1">
              <img :src="item.cover" alt class="w-100" />
            </router-link>
            <router-link
              :to="`/strategies/${item._id}`"
              tag="div"
              style="width:60%"
              class="d-flex flex-wrap text-left"
            >
              <span class="text-ellipsis mt-1 fz-xs w-100">
                <strong>{{item.title}}</strong>
              </span>
              <span
                class="text-ellipsis-wrap fz-xxs w-100"
                style="line-height:1rem;height:40%"
              >{{item.desc}}</span>
              <span
                class="w-100 fz-xxs"
                style="height:15%"
              >{{item.updatedAt | dateFormate('MM-dd')}}</span>
            </router-link>
          </div>
          <div class="py-2">
            <div
              class="fz-xxs text-center text-grey-1"
              @click="loadMore"
              v-if="a<cate.list.length"
            >点击加载更多</div>
            <router-link v-else tag="div" to="/strategycenter">
              已加载完毕
              <span v-if="$route.path != '/strategycenter'">，点击跳转到攻略中心</span>
            </router-link>
          </div>
        </div>
      </template>
      <!-- {{$refs}} -->
    </my-list-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cates: [],
      a: 4,
      active: 0
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/strategies/list");
      this.cates = res.data;
    },
    loadMore() {
      this.a += 4;
    },
    getActive(data) {
      this.active = data;
    }
  },
  created() {
    this.fetch();
  },
  watch: {
    active() {
      this.a = 4;
    }
  }
};
</script>

<style lang="scss">
.strategy-content {
  .card-body {
    .d-flex {
      justify-content: space-around;
    }
  }
}
</style>