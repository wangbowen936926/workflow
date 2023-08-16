<template>
	<u-collapse :value="['item']" :border="false" style="background: #fff;">
		<u-collapse-item v-if="data.nodeVariables.length && data.nodeVariables[0].value" title="主体信息" name="item">
			<pro-info-card :items="mainInfo" :data="data.nodeVariables[0].value" />
		</u-collapse-item>
	</u-collapse>
	<view class="main-info">
		<text class="label">流程编号</text>
		<text class="value">{{ data.processId || '~' }}</text>
	</view>
	<view class="main-info">
		<text class="label">发起时间</text>
		<text class="value">{{ moment(data.startTime).format('YYYY-MM-DD HH:mm:ss') || '~' }}</text>
	</view>
</template>

<script setup lang="ts">
	import moment from 'moment';
	
	defineProps<{
		data: {
			startFormTemplateId: string;
			processId: string;
			startTime: string;
			nodeVariables: {[propertyName: string]: any}[];
		}
	}>();
	
	const mainInfo = [
		{
			label: '主办公司：',
			field: 'company'
		},{
			label: '主办人员：',
			field: 'person'
		},{
			label: '主办部门：',
			field: 'cdept_name'
		},{
			label: '付款事由：',
			field: 'pay_reason'
		},{
			label: '结算币种：',
			field: 'cexch_name'
		},{
			label: '付款金额：',
			field: 'amount',
			render: (val: any) => `<text style="color: #f45427">${ val }</text>`
		},{
			label: '支付日期：',
			field: 'payment_date'
		},{
			label: '支付备注：',
			field: 'remark'
		}
	]
	
</script>

<style scoped lang="scss">
	@import './style.scss';
</style>