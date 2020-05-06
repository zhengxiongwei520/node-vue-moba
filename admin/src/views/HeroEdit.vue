<template class="itemedit">
  <div class="edit">
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save" class="elForm">
      <el-tabs value="relationships" type="border-card">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <el-form-item label="分类">
            <el-select v-model="model.cate" multiple>
              <el-option v-for="item in cates" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="难度">
            <el-rate
              :max="10"
              v-model="model.scores.difficult"
              :colors="colors"
              show-score
              style="marginTop:0.6rem;"
            ></el-rate>
          </el-form-item>

          <el-form-item label="技能">
            <el-rate
              :max="10"
              v-model="model.scores.ability"
              :colors="colors"
              show-score
              style="marginTop:0.6rem;"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              :max="10"
              v-model="model.scores.attack"
              :colors="colors"
              show-score
              style="marginTop:0.6rem;"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              :max="10"
              v-model="model.scores.tank"
              :colors="colors"
              show-score
              style="marginTop:0.6rem;"
            ></el-rate>
          </el-form-item>
          <el-form-item label="头像" class="avatar1">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/admin/api/upload/heros'"
              :headers="getAuthHeader()"
              :show-file-list="false"
              :on-success="res => $set(model, 'avatar', res.url)"
              :before-upload="beforeIconUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="原画" class="avatar1">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/admin/api/upload/banners'"
              :headers="getAuthHeader()"
              :show-file-list="false"
              :on-success="res => $set(model, 'banner', res.url)"
              :before-upload="beforeIconUpload"
            >
              <img v-if="model.banner" :src="model.banner" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="最佳搭档"></el-form-item>

          <el-form-item label="使用技巧">
            <el-input v-model="model.usageTips" type="textarea"></el-input>
          </el-form-item>

          <el-form-item label="对抗技巧">
            <el-input v-model="model.battleTips" type="textarea"></el-input>
          </el-form-item>

          <el-form-item label="团战技巧">
            <el-input v-model="model.teamfightTips" type="textarea"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="技能信息" name="skills" class="skills">
          <el-button @click="model.skills.push({})" style="marginBottom:2rem;">
            <i class="el-icon-plus"></i> 添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <!-- :md="12" 这个意思是普通电脑屏幕展示2个col（24/12=2）-->
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标" class="icon1">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/admin/api/upload/skills'"
                  :headers="getAuthHeader()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                  :before-upload="beforeIconUpload"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea" autosize></el-input>
              </el-form-item>
              <el-form-item label="小技巧" type="textarea" autosize>
                <el-input v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="冷却">
                <el-input v-model="item.cooldown"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.skills.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="英雄关系" name="relationships">
          <el-button
            @click="model.relationships.push({name:'',heroes:[]})"
            style="marginBottom:2rem;"
          >
            <i class="el-icon-plus"></i> 添加关系
          </el-button>
          <el-row>
            <el-card class="box-card" :md="6" v-for="(item,i) in model.relationships" :key="i">
              <el-form-item label="关系名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="item.heroes.push({_id:'',desc:''})">
                  <i class="el-icon-plus"></i> 添加英雄
                </el-button>
              </el-form-item>
              <div class="box-card eroes-list" v-for="(item2,i) in item.heroes" :key="i">
                <el-form-item label="英雄">
                  <el-select v-model="item2._id" filterable placeholder="请选择">
                    <el-option
                      v-for="hero in heroes"
                      :key="hero._id"
                      :label="hero.name"
                      :value="hero._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input v-model="item2.desc"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="item.heroes.splice(i,1)" type="danger">删除英雄</el-button>
                </el-form-item>
              </div>

              <el-button type="warning" @click="model.relationships.splice(i,1)">删除关系</el-button>
            </el-card>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item>
        <el-button type="primary" native-type="submit" style="marginTop:1rem;">保存</el-button>
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
        avatar: "",
        banner: "",
        scores: {
          difficult: 0,
          ability: 0,
          attack: 0,
          tank: 0
        },
        items1: [],
        items2: [],
        usageTips: "",
        battleTips: "",
        teamfightTips: "",
        skills: [
          // name:'',
          // icon:'',
          // description:'',
          // tips:'',
        ],
        relationships: []
      },

      cates: [],
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      items: [],
      heroes: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        // id存在是编辑
        await this.$http.put(`/admin/api/rest/heros/${this.id}`, this.model);
      } else {
        // 保存
        await this.$http.post("/admin/api/rest/heros", this.model);
      }
      this.$router.push("/heros/list");
      this.$message({
        type: "success",
        message: `保存物品名称成功`
      });
    },
    async fetch() {
      const res = await this.$http.get(`/admin/api/rest/heros/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchParents() {
      const res = await this.$http.get("/admin/api/rest/heros");
      this.parents = res.data;
    },
    handleAvatarSuccess(res) {
      this.$set(this.model, "avatar", res.url);
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
    },
    async fetchCate() {
      const res = await this.$http.get(`/admin/api/cates/heroes`);
      this.cates = res.data;
    },
    async fetchItem() {
      const res = await this.$http.get(`/admin/api/rest/items`);
      this.items = res.data;
    },
    async fetchHero() {
      const res = await this.$http.get("/admin/api/rest/heroes");
      this.heroes = res.data;
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchParents();
    this.fetchCate();
    this.fetchItem();
    this.fetchHero();
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
/* .avatar1 .el-icon-plus:before {
  line-height: 164px;
} */
.avatar-uploader .el-upload {
  width: 178px;
  height: 178px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: inline-block;
}
.icon1 .el-icon-plus:before {
  line-height: 164px;
}
.el-icon-plus {
  line-height: 2rem;
}

.el-icon-plus:before {
  line-height: 3rem;
}
</style>