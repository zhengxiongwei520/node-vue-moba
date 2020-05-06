<template>
  <div>
    <el-table :data="list">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="title" label="标题" width="250"></el-table-column>
      <el-table-column label="所属分类" width="250" prop="cate.name"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/strategies/edit/${scope.row._id}`)"
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
      const res = await this.$http.get("/admin/api/rest/strategies");
      this.list = res.data;
    },
    async remove(row) {
      await this.$confirm(`此操作将永久删除  ${row.title}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`/admin/api/rest/strategies/${row._id}`);
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