const common_column1 = [{
	title: '流程标题',
	name: 'title',
},{
	title: '发起时间',
	name: 'startTime',
},{
	title: '发起人',
	name: 'startUserName',
},{
	title: '流程模型',
	name: 'workflowName',
},{
	title: '流程节点',
	name: 'taskName',
},{
	title: '流程状态',
	name: 'status',
}];

const common_column2 = [
	{
		title: '流程标题',
		name: 'title'
	},{
		title: '发起时间',
		name: 'startTime'
	},{
		title: '发起人',
		name: 'startUserName'
	},{
		title: '部门',
		name: 'startDeptName'
	},{
		title: '流程模型',
		name: 'workflowName'
	},{
		title: '办理节点',
		name: 'currentActivityName'
	},{
		title: '办理状态',
		name: 'currentActivityName'
	},{
		title: '审批时间',
		name: 'taskEndedTime'
	},{
		title: '流程节点',
		name: 'taskName'
	},{
		title: '流程状态',
		name: 'status'
	}
]

const iposter_column = [
	{
		title: '流程标题',
		name: 'title'
	},{
		title: '完成时间',
		name: 'endTime'
	},{
		title: '流程节点',
		name: 'taskName'
	},{
		title: '流程状态',
		name: 'status'
	},{
		title: '发起人',
		name: 'startUserName'
	},{
		title: '模型名称',
		name: 'workflowName'
	},{
		title: '部门',
		name: 'startDeptName'
	},{
		title: '流程编号',
		name: 'workflowId'
	}
]

export default {
	0: common_column1,
	1: common_column1,
	2: common_column2,
	3: common_column2,
	4: common_column2,
	5: common_column2,
	6: common_column2,
	7: common_column2,
	8: iposter_column
}