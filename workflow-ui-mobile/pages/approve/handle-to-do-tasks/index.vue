<template>
	<pro-page-view :title="title">
		<uni-forms :modelValue="form" label-position="top" style="margin: 30rpx;">
			<uni-forms-item v-if="way == 'transfer'" label="转交人" name="transferUserId">
				<uni-data-select v-model="form.transferUserId" :localdata="userOption" placeholder="请选择" />
			</uni-forms-item>
			<uni-forms-item v-if="way == 'rollback'" label="退回节点" name="targetId">
				<uni-data-select v-model="form.targetId" :localdata="rollbackOption" placeholder="请选择" />
			</uni-forms-item>
			<uni-forms-item label="抄送人员" name="carbonCopyUserIds">
				<uni-data-select v-model="form.carbonCopyUserIds" :localdata="userOption" placeholder="请选择" />
			</uni-forms-item>
			<uni-forms-item label="审批意见" name="comment">
				<uni-easyinput type="textarea" v-model="form.comment" placeholder="请输入审批意见" />
			</uni-forms-item>
		</uni-forms>
		<view class="action">
			<u-button class="action__btn" type="primary" @click="submit">{{ title }}</u-button>
			<u-button class="action__btn" @click="cancel">暂不处理</u-button>
		</view>
	</pro-page-view>
</template>

<script setup lang="ts">
	import { computed, reactive, ref } from 'vue';
	import { onLoad } from "@dcloudio/uni-app";
	import { useNavigate } from '@/hooks';
	import uniForms from '@/uni_modules/uni-forms/components/uni-forms/uni-forms.vue';
	import uniFormsItem from '@/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue';
	import uniDataSelect from '@/uni_modules/uni-data-select/components/uni-data-select/uni-data-select.vue';
	import uniEasyinput from '@/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue';
	import * as approve from '@/service/approve';
	import * as user from '@/service/user';
	
	enum WayEnum {
		agree = '同意',
		reject = '拒绝',
		transfer = '转发',
		rollback = '退回',
	}
	
	const way = ref('');
	
	const taskId = ref('');
	
    const userOption = ref([]);
	const rollbackOption = ref([]);
	
    const form = reactive<{
		transferUserId?: string;
		targetId?: string;
		carbonCopyUserIds?: string;
		comment?: string;
	}>({});
	
	const navigate = useNavigate();
	
	const title = computed(() => `确认${WayEnum[way.value] || '处理'}`);
	
	const service = reactive({
		agree: 'taskAgree',
		reject: 'taskReject',
		transfer: 'taskTasksfer',
		rollback: 'taskTasksfer',
	});
	
	const getUsers = () => {
		user.getSystemUsers().then((res: {rows: []}) => {
			userOption.value = res.rows?.map((item: {userName: string, userId: string}) => ({
				text: item.userName,
				value: item.userId.toString()
			}))
		});
	}
	
	const getRollbackList = (id: string) => {
		approve.getRollbackList(id).then((res: {}[]) => {
			rollbackOption.value = res.map((item: {id: string, name: string}) => ({
				text: item.name,
				value: item.id
			}))
		});
	}
	
	const submit = () => {
		const name = service[way.value];
		approve[name]({
			taskId: taskId.value,
			...form
		}).then(res => {
			uni.showToast({title: `已${WayEnum[way.value]}`, icon: 'success'});
			setTimeout(() => navigate('/pages/approve/index'), 1000);
		}).catch(err => {
			uni.showToast({title: '处理失败', icon: 'none'});
		})
	}
	
	const cancel = () => uni.navigateBack();
	
	onLoad((option) => {
		way.value = option.way;
		taskId.value = option.taskId;
		getUsers();
		getRollbackList(taskId.value);
	});
	
</script>

<style scoped lang="scss">
    .action{
		margin: 30rpx;
		&__btn{
			margin-bottom: 30rpx;
		}
	}
</style>
