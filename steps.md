使用的是 @vue/cli  也就是cli3的脚手架 不用自己安装webpack的那些包
@vue/cli 需要preset，选择 Babel,Router,Vuex,Css
Router mode:history mode 
之后都选最基础的 enter 一直按


### 初始化
server后端：
mkdir server
npm init -y  

package.json 中的 script(脚本) 添加     "serve": "nodemon index.js"   这样以后输入 npm run serve 就是直接用nomdemon启动服务器 npm i -g nodemon 没有就安装

web手机端:
vue create web
vue create element 
vue create router   --- 记得选 n 非默认的，会显示#号

admin管理员：
vue create admin
vue create element
vue create router

### admin具体代码  管理后台 其实还是个网站 只是用它来操作数据库
npm run serve // 启动网站
vue add element // 添加element-ui模块 全部引用 一直enter就完事了


1. 创建分类
2. 分类列表
3. 修改列表
4. 删除分类
5. 子分类

#### 通用CRUD接口


**element-ui详细细节就不写上来了，多看文档吧**
使用ele的布局容器来当做管理后台的基础布局 记得给html添加router 这样才可以进行跳转



### server服务端
npm i express@next  // 使用express开发 @next下一个版本 node开发的一个框架
npm i mongoose // MongoDB的一个开发框架
npm i cors // 处理跨域问题