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
		loginSeen: false,
		infos: ['男 / 1994.07', '集美大学 · 光电信息科学与工程', '本科 / 2017年毕业'],
	},
	methods: {
		changeInfos(i, ev) {
			this.infos[i] = ev.target.innerText;
		},
		clickSaveBtn() {
			var currentUser = AV.User.current();
			if (currentUser) {
				this.saveData();
			} else {
				this.showLogin();
			}
		},
		showLogin() {
			this.loginSeen = true;
		},

	}
});