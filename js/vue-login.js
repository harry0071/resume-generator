const vueLogin = {
  template:`<div id="login" v-show="isLogin">
            <form @submit.prevent="onSignup">
                <a href="javascript:;" @click="loginpartSeen=true">登录</a>
                <a href="javascript:;" @click="loginpartSeen=false">注册</a>
                <span class="close" @click="isLogin = false;loginpartSeen=true">×</span>
                <div id="login-part" v-if="loginpartSeen">
                    <label>邮箱：
                        <input type="email" required v-model="login.email">
                    </label>
                    <label>密码：
                        <input type="password" required v-model="login.password">
                    </label>
                    <button type="submit">登录</button>
                </div>
                <div id="signup-part" v-if="!loginpartSeen">
                    <label>邮箱：
                        <input type="email" required v-model="signup.email">
                    </label>
                    <label>密码：
                        <input type="password" required v-model="signup.password">
                    </label>
                    <button type="submit">注册</button>
                </div>
            </form>
        </div>`,
  methods:{
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
  },
  data(){
    return {
      loginpartSeen: true,
      signup: {email: ``,password: ``,},
      login:{email:``,password:``,},
    }
  },
};