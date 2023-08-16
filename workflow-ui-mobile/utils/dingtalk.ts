import * as dd from 'dingtalk-jsapi';
import config from '@/configs';

export const isDingPlatform = (dd.env.platform === 'notInDingTalk' ? false : true);

export function hideNavBar () {
	
	dd.biz.navigation.hideBar({
		hidden: true,
		onSuccess: (res) => {
			
		},
		onFail: (err) => {
			
		}
	});
}

export function getAuthCode(corpId: string = config.APP.CORP_ID): Promise<any> {
    return new Promise((resolve, reject) => {
        dd.ready(() => {
            dd.runtime.permission.requestAuthCode({
                corpId: corpId
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        });
    })
}

export function quitApp () {
	// dd.biz.navigation.quit({
	//     onFail: () => uni.showToast({
	//     	title: '操作异常，稍后重试~'
	//     })
	// });
	dd.biz.navigation.close({
	    onFail: () => uni.showToast({
	    	title: '操作异常，稍后重试~'
	    })
	});
}