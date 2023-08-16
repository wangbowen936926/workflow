<template>
	<u-collapse :value="['item']" :border="false" style="background: #fff;">
		<u-collapse-item v-if="data.nodeVariables.length && data.nodeVariables[0].value" title="主体信息" name="item">
			<pro-info-card :label-width="220" :items="mainInfo" :data="data.nodeVariables[0].value" />
		</u-collapse-item>
		<u-collapse-item v-if="entry.length" title="明细信息" name="item">
			<pro-table :columns="columns1" :data="{list: entry}"/>
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
	import useTableData from '../hooks/useTableData';
	
	const props = defineProps<{
		data: {
			startFormTemplateId: string;
			processId: string;
			startTime: string;
			nodeVariables: {[propertyName: string]: any}[];
		}
	}>();
	
	const { entry } = useTableData(props.data.nodeVariables);
	
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
			label: '供应商：',
			field: 'vendor_name'
		},{
			label: '收款银行：',
			field: 'receive_bank'
		},{
			label: '银行账号：',
			field: 'bank_account'
		},{
			label: '付款类型：',
			field: 'pay_type'
		},{
			label: '优先级别：',
			field: 'pay_priority'
		},{
			label: '期望付款日期：',
			field: 'dprepaydate'
		},{
			label: '结算币种：',
			field: 'cexch_name'
		},{
			label: '备注：',
			field: 'marker'
		}
	]
	
	const columns1 = [
		{
		    title: '摘要',
		    name: 'digest',
		},
		{
		    title: '合同日期',
		    name: 'contract_date',
		},
		{
		    title: '合同编号',
		    name: 'contract_code',
		},
		{
		    title: '合同金额',
		    name: 'contract_money',
		},
		{
		    title: '累计已付款金额',
		    name: 'accumulated_paid_amount',
		},
		{
		    title: '本次付款金额',
		    name: 'current_payment_amount',
		},
		{
		    title: '付款次数',
		    name: 'payment_count',
		},
	];
	
</script>

<style scoped lang="scss">
	@import './style.scss';
</style>