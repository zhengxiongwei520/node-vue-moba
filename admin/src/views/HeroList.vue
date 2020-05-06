<template>
  <div>
    <h1>英雄列表</h1>
    <el-select v-model="selectCate">
      <el-option v-for="item in cates" :key="item._id" :label="item.name" :value="item._id"></el-option>
    </el-select>

    <el-table :data="newList">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="名称" width="250"></el-table-column>
      <el-table-column prop="title" label="称号" width="250"></el-table-column>
      <el-table-column label="头像" width="250">
        <template slot-scope="scope" props="avatar">
          <img :src="scope.row.avatar" style="width:3rem;" />
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/heros/edit/${scope.row._id}`)"
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
      list: [],
      newList: [],
      cates: [],
      selectCate: "全部"
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/admin/api/rest/heros");
      this.list = res.data;
      this.newList = res.data;
    },
    async fetchCate() {
      const res = await this.$http.get("/admin/api/cates/heroes");
      this.cates = res.data;
    },
    async remove(row) {
      await this.$confirm(`此操作将永久删除分类  ${row.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`/admin/api/rest/heros/${row._id}`);
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
    this.fetchCate();
  },
  watch: {
    selectCate(val) {
      this.newList = this.list.filter(item => {
        for (let index = 0; index < item.cate.length; index++) {
          return item.cate[index] == val;
        }
      });
    }
  }
};
</script>

<style>
</style>