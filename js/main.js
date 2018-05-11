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
		currentUser:null,
		infos: ['男 / 1994.07', '集美大学 · 光电信息科学与工程', '本科 / 2017年毕业'],
		signup: {
			email: '',
			password: '',
		},
		login:{email:'',password:'',},
	},
	methods: {
		changeInfos(i, ev) {
			this.infos[i] = ev.target.innerText;
		},
		clickSaveBtn() {
			if (this.currentUser) {
				this.saveData(this.currentUser).then(()=>alert('成功保存到云端!'));
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
				console.log(error)
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
			user.signUp().then(function(loginedUser) {
				console.log(loginedUser);
			}, function(error) {
				alert('此电子邮箱已经被占用!');
			});
		},
	}
});
