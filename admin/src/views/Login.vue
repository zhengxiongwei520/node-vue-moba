<template>
  <div class="login-contaier">
    <el-card header="请先登录" class="card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("/admin/api/login", this.model);
      localStorage.token = res.data.token;
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功"
      });
    }
  }
};
</script>

<style>
.card {
  width: 25rem;
  margin: 5rem auto;
}
</style>