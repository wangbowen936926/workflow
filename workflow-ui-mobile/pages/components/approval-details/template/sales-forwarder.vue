<template>
	<u-collapse :value="['item']" :border="false" style="background: #fff;">
		<u-collapse-item v-if="data.nodeVariables.length && data.nodeVariables[0].value" title="主体信息" name="item">
			<pro-info-card :items="mainInfo" :data="data.nodeVariables[0].value" />
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
			label: '客户名称：',
			field: 'customer_name'
		},{
			label: '终端客户：',
			field: 'terminal_customer'
		},{
			label: '销售批号：',
			field: 'order_code'
		},{
			label: '合同金额：',
			field: 'contract_money',
			render: (val: any) => `<text style="color: #f45427">${ val }</text>`
		},{
			label: '合同编号：',
			field: 'contract_code'
		},{
			label: '结算方式：',
			field: 'settlement_method'
		},{
			label: '合同备注：',
			field: 'remark'
		},{
			label: '货代公司：',
			field: 'forwarding_company'
		}
	]
	
	const columns1 = [
		{
		    title: '存货编码',
		    name: 'inventorycode',
		},{
		    title: '存货名称',
		    name: 'cname'
		},{
		    title: '唛头',
		    name: 'self_define7',
		},{
		    title: '规格型号',
		    name: 'cinvstd',
		},{
		    title: '主计量',
		    name: 'ccomunitname',
		},{
		    title: '数量',
		    name: 'quantity',
		},{
		    title: '含税单价',
		    name: 'price',
		},{
		    title: '含税金额',
		    name: 'money',
		    render: (record: any) => ((record?.quantity || 0) * (record?.price || 0)).toFixed(2)
		},{
		    title: '终端单价',
		    name: 'terminal_price',
		},{
		    title: '终端金额',
		    name: 'terminal_money',
		    render: (record: any) => ((record?.quantity || 0) * (record?.terminal_price || 0)).toFixed(2)
		},{
		    title: '备注',
		    name: 'remark',
		},{
		    title: '颜色',
		    name: 'self_define2',
		},{
		    title: '克重',
		    name: 'self_define3',
		},{
		    title: '宽幅',
		    name: 'self_define4',
		},{
		    title: '材质',
		    name: 'self_define6',
		},{
		    title: '销售批号',
		    name: 'order_code',
		}
	];
	
</script>

<style scoped lang="scss">
	@import './style.scss';
</style>