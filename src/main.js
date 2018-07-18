import 'css/style.css';
import 'css/change_skin.css';
import 'css/pink_skin.css';
import 'css/blue_skin.css';
import 'css/gray_skin.css';

import Vue from 'vue';
import swal from 'sweetalert2';

import AV from 'leancloud-storage';
let APP_ID = 'U2vtDMuIgkOrm8iLIQzs9YsR-gzGzoHsz';
let APP_KEY = 'ohdM2AWuPnuLTicwNt3eIxJA';

AV.init({
	appId: APP_ID,
	appKey: APP_KEY
});


const Login = () => import(/* webpackChunkName: "login" */ 'cp/Login.vue');
const ChangeSkin = () => import(/* webpackChunkName: "change_skin" */ 'cp/ChangeSkin.vue');
import Resume from 'cp/Resume.vue';
import LeftNav from 'cp/LeftNav.vue';
import GithubCorner from 'cp/GithubCorner.vue';
import defaultResume from 'js/defaultResume.js';

const app = new Vue({
	el: '#app',
	components:{
		Login,
		ChangeSkin,
		Resume,
		LeftNav,
		GithubCorner
	},
	data: {
		mode:'edit',
		isLogin:false,
		changeSkinSeen:false,
		currentUser:AV.User.current(),
		shareUser:{id:null},
		shareSeen:false,
		shareLink:'',
		loginpartSeen: true,
		resume:defaultResume,
		signup: {
			email: ``,
			password: ``,
		},
		login:{email:``,password:``,},
	},
	watch:{
		'currentUser' : function (newVal) {
			if (newVal) {
				this.getLcData('currentUser');
				this.shareLink = location.origin + location.pathname + '?uid=' + this.currentUser.id;
			}
		},
	},
	created(){
		if (this.currentUser) {
			this.shareLink = location.origin + location.pathname + '?uid=' + this.currentUser.id;
		}
	},
	methods: {
		changeResume(key, ev) {
			const value = `ev.target.innerText`;

			//key === 'skills[0].name'
			//由于传过来的 skills[0].name 是个字符串,所以要用eval做处理
			eval(`this.resume.${key}=${value}`);
		},
		saveImg(ev){
			console.log(ev)
			let file = ev.target.files[0];
			let avFile = new AV.File(file.name, file).save().then(data=>app.resume.imgUrl=data.thumbnailURL(200, 200),error=>console.log(error));
		},
		addItem(key){
			const data = this.resume[key][this.resume[key].length-1];
			this.resume[key].push(JSON.parse(JSON.stringify(data)));
		},
		deleteItem(key,i){
			this.resume[key].splice(i,1);
		},
		clickSaveBtn() {
			if (this.currentUser) {
				this.saveData(this.currentUser).then(()=>swal("成功保存到云端！",'',"success"),()=>{swal("保存失败！", '',"error");});
			} else {
				this.isLogin = true;
			}
		},
		clickLogout(){
			AV.User.logOut().then(()=>location.reload());
		},
		saveData(currentUser){
			const user = AV.Object.createWithoutData('User', currentUser.id);
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
			AV.User.logIn(this.login.email, this.login.password).then(loginedUser => {
				this.isLogin= false;
				this.currentUser = AV.User.current();
			}, error => {
				if (error.code === 211) {
					swal("该邮箱未注册，请先注册！",'',"warning");
				} else if (error.code === 210) {
					swal("邮箱和密码不匹配！",'',"warning");
				}
			});
		},
		doSignup() {
			let user = new AV.User();
			user.setUsername(this.signup.email);
			user.setPassword(this.signup.password);
			user.setEmail(this.signup.email);
			user.signUp().then(loginedUser => {
				swal("注册成功",'',"success");
				this.isLogin = false;
				this.currentUser = loginedUser;
			}, error => {
				//console.dir(error) 可以看出error的层级
				swal(error.rawMessage,'',"warning");
			});
		},
		print(){
			document.title = this.resume.name+'的简历';
			print();
			document.title = 'STAGE在线简历编辑器';
		},
		changeSkin(color){
			color=='default'? this.resume.skinColor = null : this.resume.skinColor = color;
			this.changeSkinSeen = false;
		},
		getLcData(user){
			const query = new AV.Query('User');
			query.get(this[user].id).then((datas)=> {
				if(!this.currentUser){
					this.currentUser={};
				}
	    		Object.assign(this.currentUser,datas);
	    		let data = datas.toJSON();
	    		Object.assign(this.resume,data.resume);
    		});
		},
	}
});

//获取分享链接的uid
let search = location.search;
let reg = /\?uid=(\w+)/;
let matches = search.match(reg);
let uid;
if(matches){
	uid = matches[1];
}

if(uid){
	app.shareUser.id = uid;
	app.mode = 'share';
	app.getLcData('shareUser');
}else if(app.currentUser){
	app.getLcData('currentUser');
	app.mode = 'edit';
}


