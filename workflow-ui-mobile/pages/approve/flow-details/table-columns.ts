export const records_column = [{
	title: '节点名称',
	name: 'nodeName',
	render: (row: any) => row?.payload.nodeName
},{
	title: '处理人',
	name: 'fromUserName',
},{
	title: '办理人',
	name: 'nextUser',
	render: (row: any) => row.nextNodeUserList?.map((item: any) => item && item.userName).join(',')
},{
	title: '接收人',
	name: 'toUserID',
},{
	title: '任务类型',
	name: 'type',
	render: (row: any) => row?.payload.type
},{
	title: '处理时间',
	name: 'updatedTime',
},{
	title: '审批意见',
	name: 'comment',
	render: (row: any) => row?.payload.comment
}];