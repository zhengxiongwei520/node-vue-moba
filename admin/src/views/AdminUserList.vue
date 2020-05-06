<template>
  <div>
    <el-table :data="list">
      <el-table-column prop="_id" label="ID" width="180"></el-table-column>
      <el-table-column prop="username" label="账号" width="180"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/admin/api/rest/admin_users");
      this.list = res.data;
    },
    async remove(row) {
      await this.$confirm(`此操作将永久删除  ${row.title}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`/admin/api/rest/admin_users/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>
</style>