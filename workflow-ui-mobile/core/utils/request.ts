import Axios from './axios';
// import config from '@/configs';

// const env = process.env.NAME || 'development';

const request = new Axios({
	//baseURL: config[env].APP_BASE_URL,
	baseURL: 'http://121.37.102.204/dev-api',
	header: {
	  'Content-Type': 'application/json;charset=UTF-8',
	}
});

request.interceptors.request(config => {
	const token = uni.getStorageSync('token') || 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjkyMzYxNjBlLWJhYWQtNDdjZi1hOGY0LTVkYjJiYzkxM2Y1NyJ9.lEVLTGh-G_aaC74PgtpdqTAwS3S-9qi56Lz-xt0_rg03fN3yN1eyoxpgTNNGsX0zHKzNLVhpcOQAnB4rz6RvZw';
	config.header['Authorization'] = `Bearer ${token}`;
	return config
});

/**
 * description: 响应拦截器
 * @createTime: 2023-07-15 21:29:56
 * @param 
 * @return 
 */
request.interceptors.response(res => {
	console.log('请求结果：', res);
	if(res.statusCode === 200 && res.errMsg === 'request:ok' && (res.data.code === 200 || res.data.code == undefined)){
		return res.data;
	}
	const errMsg = {
		code: res?.data?.code || -1,
		msg: formatError(res),
	};
	if(res.errMsg === 'request:fail'){
		return errMsg;
	}
	return Promise.reject(errMsg);
});

/**
 * description: 格式化异常
 * @createTime: 2023-07-15 21:29:24
 * @param 
 * @return 
 */
const formatError = (result: any) => {
    if (!result.statusCode && result.errMsg === 'request:fail') {
		return '无法连接到服务器，请检查您当前的网络环境，或稍后重试～';
	}
	if (result.statusCode === 502) {
		return '请求的服务正在维护，请稍后重试！';
	}
	return (result.data && result.data.msg) ? result.data.msg : '服务请求发生未知错误！';
}

export default request;