<template>
  <div class="races-content">
    <!-- {{cates.filter(v => v.cate.name == "KPL").length}}
    {{cates.length}}-->
    <my-list-card
      title="图文攻略"
      icon="iconfont icon-xinwen"
      :moreFlag="{flag:true,url:'/racescenter'}"
      :cates="cates"
      ref="racescenter"
      @sendActive="getActive"
      class="mt-3"
      :header="false"
      :white="false"
      :py3="false"
    >
      <template #items="{cate}">
        <div class="fz-sm d-flex flex-wrap mt-2">
          <div class="desc w-100">
            <div class="top w-100 d-flex ai-center">
              <h3 class="title p-2 fz-lg text-blue-1">{{desc[active].title}}</h3>
              <span class="px-2 py-1 Officiallyheld text-grey-6 fz-xs">官方举办</span>
            </div>
            <img :src="desc[active].src" class="w-100 mt-2" />
          </div>

          <div class="w-100 bg-grey-5 text-grey-6 py-2 fz-xs text-center">赛事资讯</div>
          <ul>
            <li
              class="w-100 fz-xs py-2 px-1 d-flex jc-between"
              v-for="(item,i) in cate.list"
              :key="i"
              to="/"
              v-show="i < a"
            >
              <span class="title text-ellipsis">{{item.title}}</span>
              <span class="time fz-xs text-grey-3">{{item.createdAt | dateFormate('MM-dd')}}</span>
            </li>
          </ul>
          <div class="py-2 w-100">
            <div
              class="text-center text-grey-6 fz-xs bg-grey-5 over mb-2"
              @click="loadMore"
              tag="div"
              to="/strategycenter"
            >
              <span v-if="a<cate.list.length">点击加载</span>
              <span v-else>已显示全部内容</span>
            </div>
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
      a: 10,
      active: 0,
      desc: [
        {
          title: "王者荣耀2020KPL春季赛",
          src:
            "//ossweb-img.qq.com/upload/webplat/info/yxzj/20200317/86411251821858.jpg"
        },
        {
          title: "2019王者荣耀冬季冠军杯",
          src:
            "//ossweb-img.qq.com/upload/webplat/info/yxzj/20190704/60525442238684.jpg"
        },
        {
          title: "KPLGT王者荣耀国际巡回赛",
          src:
            "//ossweb-img.qq.com/upload/webplat/info/yxzj/20200311/977191553035606.jpg"
        },
        {
          title: "王者荣耀城市赛",
          src:
            "//ossweb-img.qq.com/upload/webplat/info/yxzj/20200324/28944586661236.jpg"
        },
        {
          title: "王者荣耀高校赛",
          src:
            "//ossweb-img.qq.com/upload/webplat/info/yxzj/20191016/1256167860129.jpg"
        },
        {
          title: "王者荣耀TGA",
          src:
            "//ossweb-img.qq.com/upload/webplat/info/yxzj/20191119/56868961133189.jpg"
        },
        {
          title: "微信游戏邀请赛",
          src:
            "//ossweb-img.qq.com/upload/webplat/info/yxzj/20181228/468561433983164.jpg"
        },
        {
          title: "模拟战大师赛",
          src:
            "//ossweb-img.qq.com/upload/webplat/info/yxzj/20200417/974231226462650.jpg"
        }
      ]
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/races/list");
      this.cates = res.data;
      this.cates = [
        { name: "KPL", list: this.cates.filter(v => v.cate.name == "KPL") },
        {
          name: "冬季冠军杯",
          list: this.cates.filter(v => v.cate.name == "冬季冠军杯")
        },
        { name: "KPLGT", list: this.cates.filter(v => v.cate.name == "KPLGT") },
        {
          name: "城市赛",
          list: this.cates.filter(v => v.cate.name == "城市赛")
        },
        {
          name: "高校联赛",
          list: this.cates.filter(v => v.cate.name == "高校联赛")
        },
        { name: "TGA", list: this.cates.filter(v => v.cate.name == "TGA") },
        { name: "WGI", list: this.cates.filter(v => v.cate.name == "WGI") },
        {
          name: "模拟战大师赛",
          list: this.cates.filter(v => v.cate.name == "模拟战大师赛")
        }
      ];
    },
    loadMore() {
      this.a += 5;
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
      this.a = 10;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.races-content {
  li {
    width: 100vw;
    .title {
      width: 75%;
      display: inline-block;
    }
    .time {
      display: inline-block;
      text-align: center;
    }
  }
  .Officiallyheld {
    border: 1px solid $border-color;
    border-radius: 1.5rem;
  }
  .navBox {
    overflow-x: scroll;
    overflow-y: hidden;
    padding-bottom: 1rem;
    padding: 0 1rem 0.5rem 0.5rem;
    .nav {
      width: 150%;
      overflow: auto;
    }
    .nav-item {
      margin-right: 1rem;
      .nav-link {
        padding-bottom: 0.3rem;
      }
    }
  }
  .over {
    border-radius: 1rem;
    padding: 0.7rem 0;
  }
}
</style>