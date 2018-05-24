const vueLogin = {
    props:['loginpartSeen','login','signup','isLogin'],
  template:`<div id="login" v-show="isLogin">
        <form @submit.prevent="$emit('onSignup')">
            <a href="javascript:;" @click="$emit('logintrue')" :class={active:loginpartSeen}>登录</a><a href="javascript:;" @click="$emit('loginfalse')" :class={active:!loginpartSeen}>注册</a><span class="close" @click="$emit('close')">×</span>
            <div id="login-part" v-if="loginpartSeen">
            <label>邮箱：<input type="email" required v-model="login.email"></label>
            <label>密码：<input type="password" required v-model="login.password"></label>
            <button type="submit">登录</button> 
           </div>
           <div id="signup-part" v-if="!loginpartSeen">
            <label>邮箱：<input type="email" required v-model="signup.email"></label>
            <label>密码：<input type="password" required v-model="signup.password"></label>
            <button type="submit">注册</button> 
            </div>
        </form>
    </div>`,
};