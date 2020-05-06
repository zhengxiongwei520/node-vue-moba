<template>
  <div class="p-2 heroeslist-page">
    <div class="nav w-100 d-flex jc-between" v-if="heroes">
      <div tag="div" v-for="(item,i) in heroes" :key="item.name">
        <span
          class="nav-item fz-sm"
          :class="{active:i==currentIndex}"
          @click="currentIndex=i"
        >{{item.name}}</span>
      </div>
    </div>
    <ul class="heroes-list d-flex flex-wrap mt-4" v-if="heroes">
      <router-link :to="`/hero/${hero._id}`" tag="li" v-for="hero in heroes[currentIndex].heroesList" :key="hero._id">
        <div>
          <img :src="hero.avatar" class="w-100" />
          <p class="fz-xs text-center">{{hero.name}}</p>
        </div>
      </router-link >
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heroes: null,
      currentIndex: 0
    };
  },
  methods: {
    async fetchHeroes() {
      let allHeroes = [];
      const res = await this.$http.get("/heroes/list");
      this.heroes = res.data.filter(v => {
        return v.name != "热门";
      });
      this.heroes.forEach(element => {
        allHeroes = allHeroes.concat(element.heroesList);
      });
      allHeroes
      this.heroes.unshift({ name: "全部", heroesList: allHeroes });
    },
    getActive(data) {
      this.active = data;
    }
  },
  created() {
    this.fetchHeroes();
  }
};
</script>

<style lang="scss">
.heroeslist-page {
  .nav {
    .nav-item {
      width: 14.2%;
    }
  }
  .heroes-list {
    li {
      width: 20%;
      padding: 0.4rem;
    }
  }
}
</style>