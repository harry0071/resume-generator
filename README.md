# vue在线简历制作器

> 一个基于Vue.js的在线简历制作工具，可以方便的生成精美的个人简历。

## 用法
将项目clone到本地。然后执行下面的命令

``` bash
# 首先安装依赖
npm i

# 然后运行项目
npm start

# 发布打包
npm run build

# 或者
# 发布打包并查看分析报告
npm run build --report
```

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
  <summary>vue的html中不能出现delete</summary>
  <p>
    <pre>
      <div @click="delete"></div>
      这样写会报错，经查，是由于html中不能用delete
    </pre>
  </p>
    <p>解决办法：
    <pre>
      换个函数名，比如remove
    </pre>
  </p>
</details>
