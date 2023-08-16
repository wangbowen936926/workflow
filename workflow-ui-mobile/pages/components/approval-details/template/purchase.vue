<template>
	<u-collapse :value="['item']" :border="false" style="background: #fff;">
		<u-collapse-item v-if="data.nodeVariables.length && data.nodeVariables[0].value" title="主体信息" name="item">
			<pro-info-card :items="mainInfo" :data="data.nodeVariables[0].value" />
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
			label: '请购日期：',
			field: 'date'
		},{
			label: '请购单号：',
			field: 'purchase_code'
		},{
			label: '请购备注：',
			field: 'remark'
		},{
			label: '采购类型：',
			field: 'operation_type_code'
		}
	]
	
	const columns1 = [
		{
		    title: '来源订单号',
		    name: 'csoordercode',
		},
		{
		    title: '存货编码',
		    name: 'inventorycode',
		},
		{
		    title: '存货名称',
		    name: 'cname',
		},
		{
		    title: '唛头',
		    name: 'self_define7',
		},
		{
		    title: '规格型号',
		    name: 'cinvstd',
		},
		{
		    title: '主计量',
		    name: 'main_measure',
		    render: (entity: any) => (entity?.ccomunitname || entity?.main_measure)
		},
		{
		    title: '需求数量',
		    name: 'temp_quantity',
		},
		{
		    title: '需求日期',
		    name: 'requiredate',
		    render: (entity: any) => moment(entity.requiredate).format('YYYY-MM-DD')
		},
		{
		    title: '建议订货日期',
		    name: 'arrivedate',
		    render: (entity: any) => moment(entity.arrivedate).format('YYYY-MM-DD')
		},
		{
		    title: '颜色',
		    name: 'self_define2',
		},
		{
		    title: '克重',
		    name: 'self_define3',
		},
		{
		    title: '宽幅',
		    name: 'self_define4',
		},
		{
		    title: '材质',
		    name: 'self_define6',
		},
		{
		    title: '备注',
		    name: 'remark',
		},
		{
		    title: '销售批号',
		    name: 'sales_batch',
		}
	];
	
	// 询价及结果
	const columns2 = [
		{
		    title: '存货编号',
		    name: 'inventorycode',
		},
		{
		    title: '存货名称',
		    name: 'cname',
		},
		{
		    title: '规格型号',
		    name: 'cinvstd',
		},
		{
		    title: '供应商名称',
		    name: 'vendor_name',
		},
		{
		    title: '需求数量',
		    name: 'temp_quantity',
		},
		{
		    title: '价格',
		    name: 'price',
		},
		{
		    title: '交货日期',
		    name: 'delivery_date',
		},
		{
		    title: '付款条件',
		    name: 'payment_terms',
		},
		{
		    title: '账期',
		    name: 'accounting_period',
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