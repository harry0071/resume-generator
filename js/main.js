Vue.component('vue-item', {
	props: ['info'],
	template: `<div class=item>
                        <header class=item-hd>
                            <span class=item-time contenteditable>2017.07 ~ 2018.01</span>
                            <h3 class=item-name contenteditable>xxxxx</h3>
                        </header>
                        <div class=item-bd>
                            <p class=section-content contenteditable @blur="triggerEdited">{{info}}</p>
                        </div>
                    </div>`,
	methods: {
		triggerEdited(ev) {
			this.$emit('get-edit', ev.target.innerText);
		},
	}

});
let app = new Vue({
	el: '#app',
	data: {
		isLogin: false,
		changeSkinSeen:false,
		currentUser:AV.User.current(),
		loginpartSeen: true,
		resume:{
			imgUrl:'',
			skinColor:null,
			name:'王小明',
			job:'Web前端开发工程师',
			infos: ['男', '1994.07', '集美大学', '信息科学与工程'],
			contacts:[{icon:'icon-homepage',link:'http://toadw.cn/'},{icon:'icon-github',link:'https://github.com/toadwoo'},{icon:'icon-email',link:'toadwoo@foxmail.com'},{icon:'icon-phone',link:'tel:138*****123'}],
			titles:['实践经历','项目经验','专业技能','奖项证书'],
			practices:[{time:`2016.07 ~ 2016.10`,company:`四三九九(厦门)网络股份有限公司`,description:`负责4399儿歌、动漫业务PC端及移动端的多个活动页面的前端开发，原有网站的前端界面更新及维护，使其达到更好的视觉体验和用户体验。同时参与了4399表情站整站的前端开发，并兼容至IE6，上线后不断的维护与优化。`,},{time:`2016.07 ~ 2016.10`,company:`四三九九(厦门)网络股份有限公司`,description:`负责4399儿歌、动漫业务PC端及移动端的多个活动页面的前端开发，原有网站的前端界面更新及维护，使其达到更好的视觉体验和用户体验。同时参与了4399表情站整站的前端开发，并兼容至IE6，上线后不断的维护与优化。`,},{time:`2015.10 ~ 至今`,company:`集美大学·智弧信息科技工作室`,description:`负责与客户对接开发需求、制作原型及UI，并参与项目的研发及维护，此外还负责项目的前端工作分配，参与各创业比赛及路演， 以智弧工作室为项目参加福建省“创青春”创新创业大赛获得创业之星称号。`,}],
			projects:[{time:'2017.02',art:'图书盒子Pro·微信小程序',description:'该项目基于微信小程序MINA框架的WXML、WXSS，视图层采用Flex弹性布局，逻辑层采用模块化的开发，项目使用了开放的图书馆数据接口，后端采用 LeanCloud后端云进行云端数据存储，极大方便了同学查询馆藏图书及借阅情况，上线 2周用户近 1000人，Github获得近 50个Star。',link:'https://www.github.com'},{time:'2016.12',art:'思客拓客·创业想法交流平台',description:'该项目为移动端产品，利用了HTML5、CSS3、Sass、Iconfont、rem自适应等技术来丰富展示前端界面， 使用BaiduTemplate做为模板引擎进行数据逻辑处理，通过Ajax与后端进行数据交互，实现了大量的前后端分离，以及复杂的业务逻辑。',link:'https://www.github.com'},{time:'2016.09',art:'链接有空·时间售卖与技能交易平台',description:'该平台是基于微信公众号的移动端Web应用，采用了Vue.js做为MVVM框架，实现了部分数据的前后端分离。产品上线后不断的维护与重构，优化用户体验及性能。',link:'https://www.github.com'},],
			skills:['熟悉使用HTML5、CSS3、Sass，能准确还原设计稿。','会点设计，有点审美能力，重视用户体验','了解 MVVM框架 Vue、微信小程序','熟练使用Git进行版本控制和代码托管、Markdown进行文档编写，并以MacOS X、WebStorm作为日常开发环境进行工作，了解项目开发流程及开发调试工具的使用。'],
			prizes:[{time:'2013-2017',description:'集美大学专业二等奖学金·多次获得'},{time:'2015.05',description:'集美大学首届数学建模大赛·二等奖'},{time:'2016.09',description:'福建省“创青春”创新创业大赛·创业之星'}],
		},
		signup: {
			email: ``,
			password: ``,
		},
		login:{email:``,password:``,},
	},
	methods: {
		changeResume(key, ev) {
			let value = `ev.target.innerText`;

			//key === 'skills[0].name'
			//由于传过来的 skills[0].name 是个字符串,所以要用eval做处理
			eval(`this.resume.${key}=${value}`);
		},
		saveImg(ev){
			console.log(ev)
			let file = ev.target.files[0];
			let avFile = new AV.File(file.name, file).save().then(data=>app.resume.imgUrl=data.thumbnailURL(200, 200),error=>console.log(error));
		},
		addPractice(){
			this.resume.practices.push({time:'填写时间',company:'实习公司',description:'具体描述',});
		},
		addProject(){
			this.resume.projects.push({time:'填写时间',art:'项目名称',description:'具体描述',link:''});
		},
		addSkill(){
			this.resume.skills.push('熟悉xxxxxx，精通xxxxx');
		},
		addPrize(){
			this.resume.prizes.push({time:'填写时间',description:'填写具体内容'});
		},
		addInfo(){
			this.resume.infos.push('请填写个人信息');
		},
		addContact(){
			this.resume.contacts.push({icon:'icon-dot',link:'联系方式'})
		},
		deleteItem(key,i){
			this.resume[key].splice(i,1);
		},
		clickSaveBtn() {
			if (this.currentUser) {
				this.saveData(this.currentUser).then(()=>alert('成功保存到云端!'),()=>{alert('保存失败!')});
			} else {
				this.isLogin = true;
			}
		},
		clickLogout(){
			AV.User.logOut().then(()=>location.reload());
		},
		saveData(currentUser){
			var user = AV.Object.createWithoutData('User', currentUser.id);
			user.set('resume', this.resume);
			return user.save();
		},
		onSignup() {
			if (this.loginpartSeen) {
				this.doLogin();
			} else {
				this.doSignup();
			}
		},
		doLogin() {
			AV.User.logIn(this.login.email, this.login.password).then((loginedUser)=> {
				this.isLogin= false;
				this.currentUser = AV.User.current();
			}, function(error) {
				if (error.code === 211) {
					alert('该邮箱未注册,请先注册!');
				} else if (error.code === 210) {
					alert('邮箱和密码不匹配!');
				}
			});
		},
		doSignup() {
			let user = new AV.User();
			user.setUsername(this.signup.email);
			user.setPassword(this.signup.password);
			user.setEmail(this.signup.email);
			user.signUp().then((loginedUser)=> {
				alert('注册成功!');
				this.isLogin = false;
				this.currentUser = loginedUser;
			}, function(error) {
				//console.dir(error) 可以看出error的层级
				alert(error.rawMessage);
			});
		},
		print(){
			document.title = this.resume.name+'的简历';
			print();
			document.title = '在线简历编辑器';
		},
		changeSkin(color){
			color=='default'? this.resume.skinColor = null : this.resume.skinColor = color;
			this.changeSkinSeen = false;
		},
		getLcData(){
			var query = new AV.Query('User');
			query.get(this.currentUser.id).then((datas)=> {
				//this.currentUser = datas;
	    		Object.assign(this.currentUser,datas);
	    		let data = this.currentUser.toJSON();
	    		Object.assign(this.resume,data.resume);
    		});
		},
	}
});

if(app.currentUser){
	app.getLcData();
}
