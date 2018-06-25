<template>
  <div id="login" v-show="isLogin">
  <div style="position:relative;">
  <div class="panfish">
  <img src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png" class="normal" v-show="normalSeen">
  <img src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png" class="greeting" v-show="greetingSeen">
  <img src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png" class="blindfold" v-show="blindSeen"></div>
  <form @submit.prevent="$emit('onSignup')">
            <a href="javascript:;" @click="$emit('logintrue')" :class={active:loginpartSeen}>登录</a><a href="javascript:;" @click="$emit('loginfalse')" :class={active:!loginpartSeen}>注册</a><span class="close" @click="$emit('close')">×</span>
            <div id="login-part" v-if="loginpartSeen">
            <label>邮箱：<input type="email" required v-model="login.email" @focus="normalSeen=false;greetingSeen=true;blindSeen=false"
            @blur="normalSeen=true;greetingSeen=false;blindSeen=false"
            ></label>
            <label>密码：<input type="password" required v-model="login.password" @focus="normalSeen=false;greetingSeen=false;blindSeen=true"
            @blur="normalSeen=true;greetingSeen=false;blindSeen=false"
            ></label>
            <button type="submit">登录</button>
           </div>
           <div id="signup-part" v-if="!loginpartSeen">
            <label>邮箱：<input type="email" required v-model="signup.email"
            @focus="normalSeen=false;greetingSeen=true;blindSeen=false"
            @blur="normalSeen=true;greetingSeen=false;blindSeen=false"
            ></label>
            <label>密码：<input type="password" required v-model="signup.password"
            @focus="normalSeen=false;greetingSeen=false;blindSeen=true"
            @blur="normalSeen=true;greetingSeen=false;blindSeen=false"
            ></label>
            <button type="submit">注册</button> 
            </div>
        </form>
        </div>
    </div>
</template>

<script>
  export default {
    props:['loginpartSeen','login','signup','isLogin'],
    data(){
        return {
            normalSeen:true,
            greetingSeen:false,
            blindSeen:false,
        }
    }
  }
</script>