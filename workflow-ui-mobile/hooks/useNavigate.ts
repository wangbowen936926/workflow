import * as router from '@/utils/router';

export const useNavigate = () => {
	
	const navigate = (path: string, option?: {redirect: boolean}) => {
		
		return new Promise((resolve, reject) => {
			
			const route = router.findRoute(path);
			
			if(!route){
				return uni.showToast({title: '当前路由不存在，请检查~', icon: 'none'});
			}
			const isSwitchTab = router.checkRouteSwitchTabType(path);
			
			const option = {
				url: path,
				success: res => resolve(res),
				fail: err => reject(err),
			}
		
			if(isSwitchTab){
				return uni.switchTab(option);
			}
			uni.navigateTo(option);
		})
	}
	return navigate;
}