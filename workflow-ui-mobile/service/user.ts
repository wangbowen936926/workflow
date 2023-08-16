import request from '@/core/utils/request';

export function login(data: {}) {
	return request.post('/api/v1.0/login', data);
}

export function ddLogin(code: string) {
	return request.get('/api/v1.0/ding/login', {code});
}

export function getUserInfo() {
	return request.get('/api/v1.0/getInfo');
}

export function getSystemUsers(data: {pageSize: number, currentPage: number} = {pageSize: 9999, currentPage: 1}) {
	return request.get('/api/v1.0/system/user/list', data);
}