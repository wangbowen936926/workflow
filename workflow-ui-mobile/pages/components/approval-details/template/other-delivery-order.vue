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
			label: '出库单号：',
			field: 'order_code'
		},{
			label: '出库日期：',
			field: 'date'
		},{
			label: '仓库名称：',
			field: 'store_name'
		},{
			label: '出库类别：',
			field: 'delivery_type'
		},{
			label: '出库部门：',
			field: 'delivery_dept'
		},{
			label: '出库备注：',
			field: 'marker'
		}
	]
	
	const columns1 = [
		{
		    title: '存货编码',
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
		    title: '主计量',
		    name: 'main_measure',
		    render: (entity: any) => entity?.ccomunitname || entity?.main_measure
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
		    title: '数量',
		    name: 'num',
		},
		{
		    title: '批号',
		    name: 'batch',
		},
		{
		    title: '货位',
		    name: 'goods_allocation',
		},
		{
		    title: '项目',
		    name: 'project',
		},
		{
		    title: '金额',
		    name: 'money',
		},
		{
		    title: '单价',
		    name: 'price',
		},
		{
		    title: '包装方式',
		    name: 'self_define5',
		},
		{
		    title: '备注',
		    name: 'remark',
		},
		{
		    title: '唛头',
		    name: 'self_define7',
		},
		{
		    title: '用途',
		    name: 'use',
		},
		{
		    title: '货号',
		    name: 'self_define10',
		}
	];
	
</script>

<style scoped lang="scss">
	@import './style.scss';
</style>