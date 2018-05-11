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
		currentUser:AV.User.current(),
		loginpartSeen: true,
		infos: [`男 / 1994.07`, `集美大学 · 光电信息科学与工程`, `本科 / 2017年毕业`],
		practices:[{time:`2016.07 ~ 2016.10`,company:`四三九九(厦门)网络股份有限公司`,description:`负责4399儿歌、动漫业务PC端及移动端的多个活动页面的前端开发，原有网站的前端界面更新及维护，使其达到更好的视觉体验和用户体验。同时参与了4399表情站整站的前端开发，并兼容至IE6，上线后不断的维护与优化。`,},{time:`2016.07 ~ 2016.10`,company:`四三九九(厦门)网络股份有限公司`,description:`负责4399儿歌、动漫业务PC端及移动端的多个活动页面的前端开发，原有网站的前端界面更新及维护，使其达到更好的视觉体验和用户体验。同时参与了4399表情站整站的前端开发，并兼容至IE6，上线后不断的维护与优化。`,},{time:`2015.10 ~ 至今`,company:`集美大学·智弧信息科技工作室`,description:`负责与客户对接开发需求、制作原型及UI，并参与项目的研发及维护，此外还负责项目的前端工作分配，参与各创业比赛及路演， 以智弧工作室为项目参加福建省“创青春”创新创业大赛获得创业之星称号。`,}],
		signup: {
			email: ``,
			password: ``,
		},
		login:{email:``,password:``,},
	},
	methods: {
		changeInfos(i, ev) {
			this.infos[i] = ev.target.innerText;
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
user.set('infos', this.infos);
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
		getLcData(){
var query = new AV.Query('User');
  query.get(this.currentUser.id).then((datas)=> {
    this.currentUser = datas;
    let data = this.currentUser.toJSON();
    this.infos = data.infos;

  });
		},
	}
});

if(app.currentUser){
	app.getLcData();
}
