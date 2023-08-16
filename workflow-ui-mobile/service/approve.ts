import request from '@/core/utils/request';

/**
 * 根据状态查询流程
 */
export function getFlowByStatus(data: {}) {
	return request.get('/api/v1.0/workflow/process', data);
}

/**
 * 获取流程详情
 */
export function getFlowDetailsById(processId: string) {
	return request.get(`/api/v1.0/workflow/process/${processId}`);
}

/**
 * 获取流转记录
 */
export function getTransferRecordsById(processId: string) {
	return request.get(`/api/v1.0/workflow/process/${processId}/transfer-records`);
}

// 审批：退回列表
export function getRollbackList(id: string) {
  return request.get(`/api/v1.0/workflow/task/${id}/rollback`);
}

// 审批：转审
export function taskTasksfer(data: {
  taskId: string;
  comment: string;
  transferUserId: string;
  carbonCopyUserIds: string[];
}) {
  return request.post(`/api/v1.0/workflow/task/transfer`, data);
}

// 审批：拒绝
export function taskReject(data: {
  taskId: string;
  comment: string;
  carbonCopyUserIds: string[];
}) {
  return request.post(`/api/v1.0/workflow/task/reject`, data);
}

// 审批：同意
export function taskAgree(data: {
  taskId: string
  comment: string;
  carbonCopyUserIds: string[];
}) {
  return request.post('/api/v1.0/workflow/task/agree', data)
}

/**
 * 获取流程类别
 */
export function getFlowCategory (data?: {current: number, pageSize: number}) {
	return request.get('/api/v1.0/workflow/category/list', data);
}

export async function getDictValueEnum(dictType: string, isDigital?: boolean) {
	const res = await request.get(`/api/v1.0/system/dict/data/type/${dictType}`);
	if(res.code == 200){
		const opts = {};
		res?.data.forEach((item: any) => {
			opts[item.dictValue] = {
				text: item.dictLabel,
				label: item.dictLabel,
				value: isDigital ? Number(item.dictValue) : item.dictValue,
				key: item.dictCode,
				listClass: item.listClass,
				status: item.listClass,
				type: item.cssClass
			};
		});
		return opts;
	}
	return {};
}