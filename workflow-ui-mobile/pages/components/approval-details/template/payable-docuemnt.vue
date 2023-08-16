<template>
	<u-collapse :value="['item']" :border="false" style="background: #fff;">
		<u-collapse-item v-if="data.nodeVariables.length && data.nodeVariables[0].value" title="主体信息" name="item">
			<pro-info-card :label-width="140" :items="mainInfo" :data="data.nodeVariables[0].value" />
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
			label: '应付类型：',
			field: 'define'
		},{
			label: '结算币种：',
			field: 'cexch_name'
		},{
			label: '摘要：',
			field: 'digest'
		}
	]
	
	const columns1 = [
		{
		  title: '安全投入',
		  name: 'safety_investment',
		},
		{
		  title: '摘要',
		  name: 'digest',
		},
		{
		  title: '合同日期',
		  name: 'createdTime',
		},
		{
		  title: '相关合同编号',
		  name: 'contractCode',
		},
		{
		  title: '合同金额',
		  name: 'contractAmount',
		},
		{
		  title: '发票类型',
		  name: 'invoice_type',
		},
		{
		  title: '发票日期',
		  name: 'invoice_date',
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
		  name: 'is_warehousing',
		  render: (v: string | number) => (v == 0 ? '是' : v == 1 ? '否' : '~')
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