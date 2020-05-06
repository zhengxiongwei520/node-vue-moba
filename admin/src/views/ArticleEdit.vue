<template>
  <div class="cateEdit">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.cates" multiple>
          <el-option v-for="item in cates" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>


      <el-form-item label="文章内容">
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
  props: {
    // 接受通过路由传过来的/cate/edit/:id   中的 :id
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {
        title: "",
        cates: [],
        body: ""
      },
      cates: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        // id存在是编辑
        await this.$http.put(`/admin/api/rest/articles/${this.id}`, this.model);
      } else {
        // 保存
        await this.$http.post("/admin/api/rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: `保存分类名称成功`
      });
    },
    async fetch() {
      const res = await this.$http.get(`/admin/api/rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCates() {
      const res = await this.$http.get("/admin/api/cates/articles");
      this.cates = res.data;
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("/admin/api/upload/articles", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();

      // axios({
      //   url: "https://fakeapi.yoursite.com/images",
      //   method: "POST",
      //   data: formData
      // })
      //   .then(result => {
      //     let url = result.data.url; // Get url from response
      //     Editor.insertEmbed(cursorLocation, "image", url);
      //     resetUploader();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchCates();
  }
};
</script>

<style>
</style>