Vue.component('vue-changeskin', {
	props: ['info'],
	template: `
        <div id="change-skin" v-show="changeSkinSeen">
            <div class="skin-container">
                <span class="default" @click="changeSkin('default')"></span>
                <span class="pink" @click="changeSkin('pink')"></span>
                <span class="blue" @click="changeSkin('blue')"></span>
                <span class="purple" @click="changeSkin('purple')"></span>
            </div>
        </div>`,
	methods: {
	},

});