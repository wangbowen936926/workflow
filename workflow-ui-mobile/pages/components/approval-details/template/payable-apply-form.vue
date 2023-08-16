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
	
	enum HasInventory {
		'不入库',
		'入库',
		'其他'
	}
	
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
			label: '付款事由：',
			field: 'pay_reason'
		},{
			label: '付款类型：',
			field: 'pay_type'
		},{
			label: '优先级别：',
			field: 'pay_priority'
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
			label: '期望付款日期：',
			field: 'dprepaydate'
		},{
			label: '付款总额：',
			field: 'amount',
			render: (val: any) => val ? `<text style="color: #f45427">${ val }</text>` : '~'
		}
	]
	
	const columns1 = [
		{
		    title: '应付类型',
		    name: 'define',
		},
		{
		    title: '安全投入',
		    name: 'safety_investment',
		},
		{
		    title: '摘要',
		    name: 'digest',
		},
		{
		    title: '发票类型',
		    name: 'invoice_type',
		},
		{
		    title: '发票日期',
		    name: 'invoice_date',
		    render: (entity: any) => moment(entity.invoice_date).format('YYYY-MM-DD')
		},
		{
		    title: '发票号码',
		    name: 'invoice_code',
		},
		{
		    title: '金额',
		    name: 'amount',
		},
		{
		    title: '是否入库',
		    name: 'has_inventory',
		    render: (entity: any) => HasInventory[entity.has_inventory]
		},
		{
		    title: '备注',
		    name: 'remark',
		},
	];
	
</script>

<style scoped lang="scss">
	@import './style.scss';
</style>