<template>
  <div>
    <h1>{{id ? '编辑攻略' : '新建攻略'}}</h1>  
    <el-form
      label-width="120px"
      @submit.native.prevent="save('model')"
      :rules="rules"
      ref="model"
      :model="model"
    >
      <el-form-item label="所属分类" prop="cate">
        <el-select v-model="model.cate" >
          <el-option v-for="item in cates" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="攻略标题" prop="title">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="攻略描述" prop="desc">
        <el-input v-model="model.desc" maxlength="40"></el-input>
      </el-form-item>

      <el-form-item label="攻略封面" prop="cover">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/admin/api/upload/covers'"
          :headers="getAuthHeader()"
          :show-file-list="false"
          :on-success="res => $set(model, 'cover', res.url)"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="model.cover" :src="model.cover" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="攻略内容" prop="body">
        <VueEditor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></VueEditor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: { id: {} },
  data() {
    return {
      model: {
        cate: null,
        title: "",
        body: "",
        desc: "",
        cover: ""
      },
      cates: [],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        desc: [{ required: true, message: "请输入描述", trigger: "blur" }],
        cate: [{ required: true, message: "请选择一个分类", trigger: "blur" }],
        cover: [{ required: true, message: "请选择一张封面", trigger: "blur" }],
        body: [{ required: true, message: "请输入攻略内容", trigger: "blur" }]
      }
    };
  },
  methods: {
    async save(model) {
      await this.$refs[model].validate(valid => {
        if (valid) {
          // 可以提交
          if (this.id) {
            // id存在是编辑
            this.$http.put(`/admin/api/rest/strategies/${this.id}`, this.model);
          } else {
            // 保存
            this.$http.post("/admin/api/rest/strategies", this.model);
          }
          this.$router.push("/strategies/list");
          this.$message({
            type: "success",
            message: `保存分类名称成功`
          });
        } else {
          // 不可以提交
          this.$message({
            type: "warning",
            message: "无法保存，请认真填写"
          });
          return false;
        }
      });
    },
    async fetchCates() {
      const res = await this.$http.get(`/admin/api/cates/strategies`);
      this.cates = res.data;
    },
    async fetchStrategy() {
      const res = await this.$http.get(`/admin/api/rest/strategies/${this.id}`);
      this.model = res.data;
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("image", file);

      const res = await this.$http.post(
        "/admin/api/upload/strategies",
        formData
      );
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
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
    this.fetchCates();
    this.id && this.fetchStrategy();
  },
  components: {
    VueEditor
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


