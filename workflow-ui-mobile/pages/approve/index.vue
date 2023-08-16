<template>
    <pro-page-view
	    :loading='loading' 
	    title="审批中心" 
		n-left-icon='close' 
		n-right-icon='setting-fill' 
		@onNavbarLeftClick='onNavbarLeftClick' 
		@onNavbarRightClick="isActions = true"
	>
		<u-sticky bgColor="#fff">
            <u-tabs 
			    :current="current" 
				:list="items" 
				lineColor="#000"
				:inactiveStyle= "{
					color: '#757678'
				}"
				:activeStyle="{
					color: '#000',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				}" 
			    @click="onTabChange"
			/>
		</u-sticky>
		<view style="margin: 50rpx 20rpx;">
			<pro-table :columns="columns[current]" :data="data" :pagination="pagination" @onPageChange="onPageChange">
				<template #title={row}>
					<text style="color: #3c9cff" @click="toDetails(row)">{{ row.title }}</text>
				</template>
				<template #startTime={row}>
					{{ moment(row.startTime).format('YYYY-MM-DD HH:mm:ss') || '~' }}
				</template>
				<template #taskEndedTime={row}>
					{{ moment(row.taskEndedTime).format('YYYY-MM-DD HH:mm:ss') || '~' }}
				</template>
				<template #endTime={row}>
					{{ moment(row.endTime).format('YYYY-MM-DD HH:mm:ss') || '~' }}
				</template>
				<template #status={row}>
					<u-tag plain plainFill size="mini" :text="statusOption[row.status]?.text || ''" :type="FlowStatusColorType[row.status]"/>
				</template>
			</pro-table>
		</view>
		<!-- 页数大小弹框 -->
		<u-action-sheet :show="isActions" :actions="pageSizeOption" cancelText="取消" @close="isActions = false" @select="getSelectedPageSize"/>
    </pro-page-view>
</template>

<script setup lang="ts">
    import { ref, reactive } from 'vue';
	import { onLoad } from "@dcloudio/uni-app";
	import { useNavigate } from '@/hooks';
	import columns from './table-columns';
	import { FlowStatusColorType } from '@/types/enums';
	import moment from 'moment';
	import * as service from '@/service/approve';
	import * as ding from '@/utils/dingtalk';
	
	const navigate = useNavigate();
	
    const current = ref(0);
	
	const loading = ref(false);
	
	const isActions = ref(false);
   
    const items = ref([{
		name: '待我处理',
		processStage: 'unfinished',
	},{
		name: '退回给我',
		processStage: 'rollback',
	},{
		name: '我已处理',
		processStage: 'processed',
	},{
		name: '抄送我的',
		processStage: 'cc',
	},{
		name: '审批中',
		processStage: 'approval',
	},{
		name: '已结束',
		processStage: 'finished',
	},{
		name: '被驳回',
		processStage: 'rejected',
	},{
		name: '已撤销',
		processStage: 'reovke',
	},{
		name: '我发起的',
		processStage: 'created',
	}]);
	
	const pageSizeOption = ref([
		{
			name:'5条页',
			value: 5
		},{
			name: '10条页',
			value: 10
		},{
			name: '20条页', 
			value: 20
		}
	]);
	
	const data = reactive({
		total: 1,
		list: []
	});
	
	const pagination = reactive({
		current: 1,
		pageSize: 5
	})
	
	const statusOption = ref({});
	
	const categoryId = ref('');
	
	uni.$on('switchApproveSuccess', e => {
		current.value = e.tabIndex;
		categoryId.value = e.categoryId;
		pagination.current = 1;
		requestData();
	});
	
	const onNavbarLeftClick = () => {
		if(ding.isDingPlatform){
			return ding.quitApp();
		}
		console.warn('不是钉钉环境');
	}
	
	const getSelectedPageSize = (e: any) => {
		pagination.current = 1;
		pagination.pageSize = e.value;
		isActions.value = false;
		requestData();
	}
	
	const requestData = () => {
		loading.value = true;
		service.getFlowByStatus({
			status: 'ALL',
			categoryId: categoryId.value,
			pageNumber: pagination.current,
			pageSize:  pagination.pageSize,
			processStage: items.value[current.value]?.processStage
		}).then((res: any) => {
			data.total = res.data.total;
			data.list = res.data.items;
		}).catch(err => {
			uni.showToast({
				title: err.msg || '请求异常，稍后重试',
				icon: 'none'
			});
		}).finally(() => {
			loading.value = false;
		})
	}

    const onTabChange = (item: {index: number}) => {
		pagination.current = 1;
		current.value = item.index;
		requestData();
    }
	
	const toDetails = (row: {taskId: string, processId: string}) => {
		const status = items.value[current.value].processStage;
		navigate(`/pages/approve/flow-details/index?processId=${row.processId}&processStage=${status}&taskId=${row.taskId}`);
	}
	
    const onPageChange = (e: {current: number}) => {
		pagination.current = e.current;
		requestData();
	}
	
	onLoad(async () => {
		statusOption.value = await service.getDictValueEnum('process_status');
		requestData();
	})

</script>

<style scoped lang="scss">
	

</style>