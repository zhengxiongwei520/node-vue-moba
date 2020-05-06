<template>
  <div>
    <Article :article="article"></Article>
  </div>
</template>

<script>
import Article from "../components/Article";
export default {
  props: { id: {} },
  data() {
    return {
      article: {}
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/strategies/${this.id}`);
      this.article = res.data;
    }
  },
  components: {
    Article
  },
  created() {
    this.fetch()
  }
};
</script>

<style>
</style>