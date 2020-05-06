<template>
  <div>
    <h1>分类列表</h1>
    <el-select v-model="parent" placeholder="选择上级分类" v-if="list">
      <el-option
        v-for="item in cates"
        :key="item.value"
        :label="item.name"
        :value="item._id"
      ></el-option>
    </el-select>
    <el-table
      :data="!this.parent ? this.list : this.list.filter(v=>v.parent!=undefined&&v.parent._id==this.parent)"
      v-if="list"
    >
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类" width="250"></el-table-column>
      <el-table-column prop="name" label="名称" width="250"></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/cates/edit/${scope.row._id}`)"
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
      list: null,
      cates: null,
      parent: ""
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/admin/api/rest/cates");
      this.list = res.data;
    },
    async remove(row) {
      await this.$confirm(`此操作将永久删除分类  ${row.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`/admin/api/rest/cates/${row._id}`);
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
  },
  watch: {
    list() {
      this.cates = this.list.filter(v=>v.parent==undefined);
      this.cates.unshift({name:'全部'})
    }
  }
};
</script>

<style>
</style>