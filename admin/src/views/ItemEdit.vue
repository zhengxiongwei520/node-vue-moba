<template class="itemedit">
  <div class="edit">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name" maxlength="10"></el-input>
      </el-form-item>

      <el-form-item label="图标" class="icon1">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/admin/api/upload/items'"
          :headers="getAuthHeader()"
          :show-file-list="false"
          :on-success="handleIconSuccess"
          :before-upload="beforeIconUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
        await this.$http.put(`/admin/api/rest/items/${this.id}`, this.model);
      } else {
        // 保存
        await this.$http.post("/admin/api/rest/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: `保存物品名称成功`
      });
    },
    async fetch() {
      const res = await this.$http.get(`/admin/api/rest/items/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get("/admin/api/rest/items");
      this.parents = res.data;
    },
    handleIconSuccess(res) {
      this.$set(this.model, "icon", res.url);
    },
    beforeIconUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchParents();
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.icon1 .el-icon-plus:before {
  line-height: 164px;
}
.avatar-uploader .el-upload {
  width: 178px;
  height: 178px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: inline-block;
}
</style>