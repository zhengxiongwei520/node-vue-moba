<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}用户</h1>
    <el-form label-width="5rem" @submit.native.prevent="save">
      <el-form-item label="账号">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password" ></el-input>
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
    id: {}
  },
  data() {
    return {
      model: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async save() {
      if (!this.id) {
        // 不存在 保存
        await this.$http.post("/admin/api/rest/admin_users", this.model);
      } else {
        await this.$http.put(
          `/admin/api/rest/admin_users/${this.id}`,
          this.model
        );
      }
      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`/admin/api/rest/admin_users/${this.id}`);
      this.model = res.data;
    }
  },
  created () {
    this.id && this.fetch()
  }
};
</script>

<style>
</style>