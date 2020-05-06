<template>
  <div class="cateEdit">
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="广告位名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="广告位信息">
        <el-button type="info" @click="model.items.push({})">添加广告信息</el-button>
        <el-card type="flex" style="marginTop:1rem;"> 
          <el-col v-for="(item,i) in model.items" :key="i" :md="24" style="margin:1rem 0;">
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/admin/api/upload/ads'"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="跳转链接(URL)" label-width>
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label-width="8rem" style="marginTop:1rem;">
              <el-button type="danger" @click="model.items.splice(i, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-card>
      </el-form-item>

      <el-form-item style="marginTop:3rem;">
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
      model: {
        name: "",
        items: []
      }
    };
  },
  methods: {
    async save() {
      if (this.id) {
        // id存在是编辑
        await this.$http.put(`/admin/api/rest/ads/${this.id}`, this.model);
      } else {
        // 保存
        await this.$http.post("/admin/api/rest/ads", this.model);
      }
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: `保存广告成功`
      });
    },
    async fetch() {
      const res = await this.$http.get(`/admin/api/rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    beforeAvatarUpload(file) {
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
  }
};
</script>

<style>
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
  min-width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  min-width: 178px;
  height: 178px;
  display: block;
}
.el-icon-plus:before {
  line-height: 164px;
}
</style>