<script lang="ts">
	import * as ding from '@/utils/dingtalk';
	import * as user from '@/service/user';
	// import * as approve from '@/service/approve';
	
	export default {
		onLaunch: function() {
			if(ding.isDingPlatform){
				ding.hideNavBar();
				ding.getAuthCode().then(res => {
				    user.ddLogin(res.code).then((e: {token: string, userInfo: {}}) => {
						uni.setStorage({key: 'token', data: e.token});
						uni.setStorage({key: 'userInfo', data: e.userInfo});
						// approve.getFlowCategory().then(res => {
						// 	console.log("类别", res);
						// })
				    });
				}).catch(err => {
				    console.log('获取code失败：',err);
				});
			}else{
				//uni.redirectTo({url: '/pages/login/login'});
			}
			// approve.getFlowCategory().then(res => {
			// 	console.log("类别", res);
			// })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-plus/index.scss";
	/*每个页面公共css */
</style>
