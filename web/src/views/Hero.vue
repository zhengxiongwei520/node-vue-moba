<template>
  <div v-if="id" class="hero-page">
    <div class="topbar bg-black text-white d-flex p-2 ai-center fz-xs">
      <router-link to="/" class="sprite sprite-logo"></router-link>
      <div class="flex-1 px-2">
        <span>王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <!-- end of topbar -->

    <div v-if="hero" class="banner" :style="`backgroundImage:url('${hero.banner}');`">
      <div class="info text-white d-flex flex-column jc-end h-100 p-3">
        <div class="fz-xxs my-2">{{hero.title}}</div>
        <div>
          <strong>{{hero.name}}</strong>
        </div>
        <div class="fz-xxs my-1">{{hero.cate.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between fz-xxs ai-center">
          <div v-if="hero.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{hero.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue">{{hero.scores.ability}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{hero.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-yellow-1">{{hero.scores.tank}}</span>
          </div>
          <router-link tag="div" class="text-grey" to="/">皮肤: 6 &gt;</router-link>
        </div>
      </div>
    </div>

    <!-- end of banner -->
    <div class="nav px-3 py-1 bg-white fz-xs" v-if="hero">
      <div class="border-bottom d-flex jc-around py-2">
        <span
          class="nav-item"
          v-for="(item,i) in nav"
          :key="i"
          :class="{active:active==i}"
          @click=" $refs.list.$swiper.slideTo(i)"
        >{{item}}</span>
      </div>
    </div>
    <!-- end of nav -->
    <div class="swiper" v-if="hero">
      <swiper ref="list" @slide-change="() => {active = $refs.list.$swiper.realIndex}">
        <swiper-slide @slideChangeTransitionEnd="active = 0">
          <div class="skills bg-white p-1">
            <div class="d-flex jc-around">
              <button class="btn lg-btn">
                <span class="iconfont icon-xinwen mr-2"></span>
                <span>英雄介绍视频</span>
              </button>
              <button class="btn lg-btn">
                <span class="iconfont icon-xinwen mr-2"></span>
                <span>一图是英雄</span>
              </button>
            </div>
            <!-- end of button -->
            <ul class="d-flex jc-around w-100 my-4" v-if="hero.skills==[]">
              <li
                v-for="(skill,i) in hero.skills"
                :key="i"
                class="icon"
                :class="{active:currentIndex==i}"
                @click="currentIndex=i"
              >
                <img :src="skill.icon" class="w-100 h-100" />
              </li>
            </ul>
            <div v-if="hero.skills==[]" class="p-2 fz-xs">
              <div class="title">
                <strong class="fz-xs">{{hero.skills[currentIndex].name}}</strong>
                <span
                  class="ml-3 text-grey-1"
                >(冷却值：{{hero.skills[currentIndex].cooldown}} 消耗：{{hero.skills[currentIndex].cost}})</span>
              </div>
              <div class="body mt-4 text-dark-1">{{hero.skills[currentIndex].description}}</div>
            </div>
          </div>
          <div class="tips">
            <my-card title="出装" :border="false" :moreFlag="{flag:false}">
              <div class="items-tips mt-2">
                <p class="fz-sm mb-2">顺风出装</p>
                <ul class="d-flex items1 jc-around border-bottom pb-2 mb-2">
                  <li v-for="item in hero.items1" :key="item._id" class="text-center">
                    <img :src="item.icon" alt />
                    <span class="fz-xs">{{item.name}}</span>
                  </li>
                </ul>
                <p class="mb-2 fz-sm">逆风出装</p>
                <ul class="items2 d-flex jc-around">
                  <li v-for="item in hero.items2" :key="item._id" class="text-center">
                    <img :src="item.icon" alt />
                    <span class="fz-xs">{{item.name}}</span>
                  </li>
                </ul>
              </div>
            </my-card>
          </div>

          <my-card title="使用技巧" :border="false">
            <p class="fz-xs mt-2">{{hero.usageTips}}</p>
          </my-card>

          <my-card title="对抗技巧" :border="false">
            <p class="fz-xs mt-2">{{hero.battleTips}}</p>
          </my-card>

          <my-card title="团队技巧" :border="false">
            <p class="fz-xs mt-2">{{hero.teamfightTips}}</p>
          </my-card>

          <my-card title="英雄关系" :border="false">
            <!-- {{hero.relationships[0]}} -->
            <div v-for="(item) in hero.relationships" :key="item._id">
              <p class="fz-xs mt-2 mb-2">{{item.name}}</p>
              <div v-for="item2 in item.heroes" :key="item2._id._id" class="d-flex jc-around mb-3">
                <img :src="item2._id.avatar" style="width:3rem;height:3rem;"/>
                <p class="fz-xs ml-2">{{item2.desc}}</p>
              </div>
            </div>
          </my-card>
        </swiper-slide>
        <swiper-slide @slideChangeTransitionEnd="active = 1">
          <span>进阶攻略内容</span>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      require: true
    }
  },
  data() {
    return {
      hero: null,
      nav: ["英雄初识", "进阶攻略"],
      active: 0,
      currentIndex: 0
    };
  },
  methods: {
    async fetchHero() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.hero = res.data;
    }
  },
  created() {
    this.fetchHero();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.hero-page {
  .banner {
    height: 51vw;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .info {
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  }
  .badge {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    // line-height: 1rem;
    margin: 0 0.2rem;
    text-align: center;
    border-radius: 50%;
    border: solid 1px rgba(255, 255, 255, 0.3);
    transform: scale(0.66);
  }
  .swiper {
    .icon {
      width: 4rem;
      height: 4rem;
      border: 0.0769rem solid map-get($colors, "white");
      &.active {
        border: 0.0769rem solid map-get($colors, "primary");
        border-radius: 47%;
      }
    }
    .body {
      line-height: 1rem;
    }
  }
  .items-tips {
    .items1 {
      li {
        width: 20%;
        img {
          border-radius: 50%;
          width: 2.8rem;
          height: 2.8rem;
        }
      }
    }
    .items2 {
      li {
        width: 20%;
      }
      img {
        width: 2.8rem;
        height: 2.8rem;
        border-radius: 50%;
      }
    }
  }
}
</style>