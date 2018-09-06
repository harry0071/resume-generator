# vue在线简历制作器

> 一款基于Vue.js的在线简历制作工具，可以方便的生成精美的个人简历。           
如果你喜欢此项目，欢迎点右上角 "star"一下，非常感谢！ 🤞

# 预览
预览链接👉 [点击预览](https://harry0071.github.io/resume-generator) 

# 技术栈
vue + vue-cli + es6 + leancloud + 响应式布局

## 功能
- 根据模板，在线生成精美的个人简历
- 注册登录之后，可以将简历保存到云端，方便在不同设备之间编辑
- 可以生成pdf文件
- 可以生成在线预览链接，方便分享给他人在线预览
- 除了默认主题色，还支持另外3种颜色(换肤功能)

## 更新日志
- 更新：上传头像限制图片格式，且图片最大5mb以内
- 优化：换肤组件(ChangeSkin.vue)和登录组件(Login.vue)做成异步组件，配合 webpack 的 code-splitting 功能实现按需加载，从而节省首次加载的时间，提高页面打开的速度
- 新增：右上角添加Github图标链接
- 新增：注册登录添加动画效果
- 新增：上传头像功能
- 新增：换肤功能
- 新增：分享链接 & 预览功能
- 新增：打印功能

## 问题汇总
<details>
  <summary>html对标签名和属性名(双引号外边的内容)大小写不敏感</summary>
  <p>v-on:myFn="xxx",这种写法是不行的，html会将双引号外面的内容全部转换成小写；不过双引号里面可以大写，比如v-on:myfn="aBc"是可以的</p>
  <p>`:shareLink="xxx"`,这种写法是不行的，html会将双引号外面的内容全部转换成小写；应该写成`:sharelink="xxx"`或者`:share-link="xxx"`</p>
</details>
<details>
  <summary>将字符串转成对象</summary>
  <p>
  	<pre>
  		var str = `baseInfo[0].age`;//这是个字符串
  		console.log(this.resume.str) //报错
  	</pre>
  </p>
    <p>解决办法：
  	<pre>
  		用eval
  		eval(`this.resume.${str}`)
  	</pre>
  </p>
</details>
<details>
  <summary>限制上传头像格式</summary>
  通过设置accept，限制只能上传图片     
  ```html
  <input type="file" accept="image/*" />
  ```
</details>
