const vueNav = {
	props: ['mode', 'currentUser', 'shareLink',],
	template: `<nav v-show="mode==='edit'">
        <button id="save-btn" @click="$emit('clickSaveBtn')">{{saveBtnText(currentUser)}}</button>
        <button id="skin-btn" @click="$emit('change-skin-seen')">换肤</button>
        <button id="print-btn" @click="$emit('print')">打印</button>
        <button id="share-btn" @click="showShareLink(shareLink)" v-show="currentUser">分享</button>
        <button id="logout" @click="$emit('clickLogout')" v-show="currentUser">退出</button>
    </nav>`,
	methods: {
		showShareLink(link) {
			swal({
				title: '下面是您的预览链接',
				input: 'textarea',
				inputValue: link,
				confirmButtonText: '查看预览',
				showCancelButton: true,
				cancelButtonText: '确定',
			}).then((result)=>{
				if(result.value){
					open(link);
				}
			});
		},
		saveBtnText(currentUser){
			if(currentUser){
				return '保存到云端';
			}else{
				return '登录后保存';
			}
		},
	},
};