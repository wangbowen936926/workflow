<template>
	<u-collapse :value="['item']" :border="false" style="background: #fff;">
		<u-collapse-item v-if="data.nodeVariables.length && data.nodeVariables[0].value" title="主体信息" name="item">
			<pro-info-card :label-width="150" :items="mainInfo" :data="data.nodeVariables[0].value" />
		</u-collapse-item>
		<u-collapse-item v-if="entry.length" title="明细信息" name="item">
			<pro-table :columns="columns1" :data="{list: entry}"/>
		</u-collapse-item>
		<u-collapse-item v-if="value_entry.length" title="资产价值" name="item">
			<pro-table :columns="columns2" :data="{list: value_entry}"/>
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
	
	const { entry, value_entry } = useTableData(props.data.nodeVariables);
	
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
			label: '处置原因：',
			field: 'reason'
		},{
			label: '备注：',
			field: 'marker'
		}
	]
	
	const columns1 = [
		{
		    title: '资产类型',
		    name: 'asset_type',
		},{
		    title: '所属产线',
		    name: 'prod_line',
		},{
		    title: '车间编号',
		    name: 'workshop_no',
		},{
		    title: '资产名称',
		    name: 'asset_name',
		},{
		    title: '规格型号',
		    name: 'model',
		    width: 150,
		},{
		    title: '数量',
		    name: 'num',
		},{
		    title: '存放地点',
		    name: 'storage_location',
		},{
		    title: '日常维护人',
		    name: 'maintenancer',
		}
	];
	
	// 资产价值
	const columns2 = [
		{
		    title: '资产原值',
		    name: 'asset_cost',
		},{
		    title: '入账时间',
		    name: 'entry_time',
		},{
		    title: '已提折旧',
		    name: 'accumulated_depreciation',
		},{
		    title: '资产净值',
		    name: 'asset_value',
		},{
		    title: '剩余期间',
		    name: 'remaing_period',
		}
	];
	
</script>

<style scoped lang="scss">
	@import './style.scss';
</style>