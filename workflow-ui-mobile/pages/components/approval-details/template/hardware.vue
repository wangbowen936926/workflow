<template>
	<u-collapse :value="['item']" :border="false" style="background: #fff;">
		<u-collapse-item v-if="data.nodeVariables.length && data.nodeVariables[0].value" title="主体信息" name="item">
			<pro-info-card :label-width="150" :items="mainInfo" :data="data.nodeVariables[0].value" />
		</u-collapse-item>
		<u-collapse-item v-if="entry.length" title="明细信息" name="item">
			<pro-table :columns="columns1" :data="{list: entry}"/>
		</u-collapse-item>
		<u-collapse-item v-if="inventory_entry.length" title="询价信息" name="item">
			<pro-table :columns="columns2" :data="{list: inventory_entry}"/>
		</u-collapse-item>
		<u-collapse-item v-if="result_entry.length" title="询价结果" name="item">
			<pro-table :columns="columns2" :data="{list: result_entry}"/>
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
	
	const { entry, inventory_entry, result_entry } = useTableData(props.data.nodeVariables);
	
	console.log(entry, inventory_entry, result_entry)
	
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
			label: '总金额：',
			field: 'amount_money',
			render: (val: any) => `<text style="color: #f45427">${ val }</text>`
		},{
			label: '备注：',
			field: 'marker'
		}
	]
	
	const columns1 = [
		{
			title: '使用部门',
			name: 'dept'
		},{
			title: '用途',
			name: 'way'
		},{
			title: '物品名称',
			name: 'name'
		},{
			title: '规格型号',
			name: 'model'
		},{
			title: '单位',
			name: 'unit'
		},{
			title: '数量',
			name: 'num'
		},{
			title: '预计单价',
			name: 'price'
		},{
			title: '预计金额',
			name: 'money'
		},{
			title: '需求日期',
			name: 'date'
		},{
			title: '备注',
			name: 'remark'
		}
	];
	
	// 询价及结果
	const columns2 = [
		{
			title: '供应商名称',
			name: 'vendor_name'
		},{
			title: '含税总价',
			name: 'amount'
		},{
			title: '付款条件',
			name: 'payment_terms'
		},{
			title: '账期',
			name: 'accounting_period'
		},{
			title: '联系人',
			name: 'contact'
		},{
			title: '联系电话',
			name: 'mobile'
		},{
			title: '备注',
			name: 'remark'
		}
	];
	
</script>

<style scoped lang="scss">
	@import './style.scss';
</style>