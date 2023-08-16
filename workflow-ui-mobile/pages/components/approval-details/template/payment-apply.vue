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
			label: '单据编号：',
			field: 'dvouch_code'
		},{
			label: '单据日期：',
			field: 'dvouch_date'
		},{
			label: '付款总额：',
			field: 'amount',
			render: (val: any) => `<text style="color: #f45427">${ val }</text>`
		},{
			label: '期望付款日期：',
			field: 'dprepaydate'
		},{
			label: '币种：',
			field: 'cexch_name'
		},{
			label: '付款事由：',
			field: 'pay_reason'
		},{
			label: '付款优先级：',
			field: 'pay_priority'
		},{
			label: '付款类型：',
			field: 'pay_type'
		},{
			label: '收款人：',
			field: 'receiver'
		},{
			label: '收款银行：',
			field: 'receive_bank'
		},{
			label: '银行账号：',
			field: 'bank_account'
		}
	]
	
	const columns1 = [
		{
		    title: '来源',
		    name: 'csource',
		},
		{
		    title: '来源订单号',
		    name: 'corderno',
		},
		{
		    title: '部门',
		    name: 'cdepname',
		},
		{
		    title: '业务员',
		    name: 'cpersonname',
		},
		{
		    title: '源单币种',
		    name: 'cexchName',
		},
		{
		    title: '金额',
		    name: 'iapplyamt_f',
		},
		{
		    title: '订单号',
		    name: 'corderno',
		},
		{
		    title: '已付款',
		    name: 'main_measure',
		},
		{
		    title: '备注',
		    name: 'remark',
		}
	];
	
</script>

<style scoped lang="scss">
	@import './style.scss';
</style>