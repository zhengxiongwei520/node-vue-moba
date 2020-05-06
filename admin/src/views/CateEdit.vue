<template>
  <div class="cateEdit">
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="model.name" maxlength="10"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    // 接受通过路由传过来的/cate/edit/:id   中的 :id
    id: {}
  },
  data() {
    return {
      model: {},
      parents: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        // id存在是编辑
        await this.$http.put(`/admin/api/rest/cates/${this.id}`, this.model);
      } else {
        // 保存
        await this.$http.post("/admin/api/rest/cates", this.model);
      }
      this.$router.push("/cates/list");
      this.$message({
        type: "success",
        message: `保存分类名称成功`
      });
    },
    async fetch() {
      const res = await this.$http.get(`/admin/api/rest/cates/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get("/admin/api/cates/''");
      this.parents = res.data;
    }
  },
  created() {
    this.id && this.fetch()
    this.fetchParents()
  }
};
</script>

<style>
</style>