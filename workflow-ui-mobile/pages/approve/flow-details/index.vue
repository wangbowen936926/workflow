<template>
	<pro-page-view :title="title">
		<u-sticky bgColor="#fff">
		    <u-tabs 
			    :scrollable="false"
			    :current="curNow" 
				:list="tabs" 
				lineColor="#000"
				:inactiveStyle="{
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
		<view class="conent-body">
			<view>
				<view v-show="curNow == 0">
					<u-skeleton
					    title
						rows="4"
						:loading="loading"
						:style="{padding: `${loading ? '33rpx' : 0}`, background: '#fff'}"
					>
						<component :is="templ[details.startFormTemplateId]" :data="details"/>
						<flow-steps :list="recordsStepsData" style="padding-top: 22rpx; background: #f3f4f6;" />
					</u-skeleton>
				</view>
				<pro-table 
				    v-show="curNow == 1" 
					:columns="records_column" 
					:data="records"
					style="padding: 20rpx; background: #fff;" 
				>
				    <template #updatedTime={row}>
						{{ moment(row.updatedTime).format('YYYY-MM-DD HH:mm:ss') || '~' }}
					</template>
				</pro-table>
			</view>
		</view>
		<view v-if="processStage == 'unfinished'" class="footer">
			<u-button type="primary" text="处理" @click="isActions = true"/>
		</view>
		<u-action-sheet :actions="handleType" :show="isActions" cancelText="取消" @close="isActions = false" @select="getHandleType"/>
	</pro-page-view>
</template>

<script setup lang="ts">
	import { onLoad } from "@dcloudio/uni-app";
	import { computed, reactive, ref } from 'vue';
	import { records_column } from './table-columns';
	import { useNavigate } from '@/hooks';
	import templ from '@/pages/components/approval-details';
	import flowSteps from './flow-steps';
	import moment from 'moment';
	import * as service from '@/service/approve'; 
	
	const curNow = ref(0);
	
	const details = ref<{[propertyName: string]: any}>({
		title: '',
		templateId: '',
		nodeVariables: []
	});
	
	const loading = ref(false);
	
	const isActions = ref(false);
	
	const taskId = ref('');
	
	const processStage = ref('');
	
	const processId = ref('');
	
	const navigate = useNavigate();
	
	const records = reactive({
		list: []
	});
	
	const recordsStepsData = ref([]);
	
	const handleType = ref([
		{
			way: 'agree',
			name:'同意',
			color:'#3c9cff',
		},
		{
			way: 'reject',
			name: '拒绝',
			color: '#e45656'
		},
		{
			way: 'transfer',
			name: '转发', 
		},
		{
			way: 'rollback',
			name: '退回',
		}
	]);
	
	const tabs = ref([
		{
			name: '表单信息'
		},{
			name: '流转记录'
		}
	]);
	
	const title = computed(() => {
		return details.value.title || '详情';
	})
	
	const onTabChange = (e: {index: number}) => {
		curNow.value = e.index;
		// if(e.index == 1 && !records.list.length){
		// 	getTransferRecords(processId.value);
		// }
	}
	
	const getHandleType = (e) => {
		isActions.value = false;
		navigate(`/pages/approve/handle-to-do-tasks/index?way=${e.way}&taskId=${taskId.value}`);
	}
	
	const getDetailsInfo = (id: string) => {
		loading.value = true;
		service.getFlowDetailsById(id).then(data => {
			details.value = data;
		}).catch(err => {
			console.log(err, "getDetailsInfo");
		}).finally(() => {
			loading.value = false;
		})
	}
	
	const getTransferRecords = (id: string) => {
		service.getTransferRecordsById(id).then((res: any) => {
			records.list = res.data;
			recordsStepsData.value = res.data.map(item => {
				return {
					title: item.payload.nodeName,
					status: 'agree',
					iconText: item.nextNodeUserList?.map((item: any) => item && item?.userName || '').join(','),
					content: item.payload.comment,
					datetime: moment(item.updatedTime).format('MM-DD HH:mm:ss'),
				}
			})
			if(processStage.value === 'unfinished'){
				const userInfo = uni.getStorageSync('userInfo');
				recordsStepsData.value.push({
					title: '审批人',
					desc: '我(审批中)',
					iconText: userInfo?.userName,
					status: 'processing',
				});
			}
		}).catch(err => {
			console.log(err, "getTransferRecords");
		});
	}
	
	onLoad((option) => {
		taskId.value = option.taskId;
		processStage.value = option.processStage;
		processId.value= option.processId;
		getDetailsInfo(option.processId);
		getTransferRecords(option.processId);
	});
	
</script>

<style>
	.conent-body /deep/ .u-cell__title-text{
		font-weight: bold;
	}
	.conent-body /deep/ .u-cell__body{
		background-color: #fff !important;
	}
</style>

<style>
	.conent-body /deep/ .u-cell__body .u-cell__left-icon-wrap{
		margin: 0;
	}
</style>

<style scoped lang="scss">
	.conent-body{
		padding-top: 22rpx;
		background-color: $bg-color;
		> view{
			max-height: calc(100vh - (88px + 73.1px + 22rpx));
			overflow-y: auto;
		}
	}
	.footer{
		position: fixed;
		bottom: 0;
		padding: 30rpx;
		width: calc(100vw - 60rpx);
		z-index: 1;
		background-color: $bg-color-default;
	}

</style>
