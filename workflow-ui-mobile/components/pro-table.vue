<template>
	<view class="pro-table">
		<uni-table stripe :border="false" emptyText="">
			<uni-tr>
				<uni-th v-for="(item, index) in columns" :key="index" align="center">{{ item.title }}</uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in dataSource" :key="index" @click="emits('onSelectionRow', item)">
				<uni-td v-for="(cl, clIndex) in columns" :key="clIndex" align="center">
					<template v-if="instance.slots[cl.name]">
						<slot :name="cl.name" :row="item"/>
					</template>
					<template v-else>
						{{ (typeof cl?.render == 'function') ? cl.render(item) : (item[cl.name] || '~') }}
					</template>
				</uni-td>
			</uni-tr>
		</uni-table>
		<template v-if="page.total > dataSource.length">
			<uni-pagination style="margin: 25rpx 0;" :total="page.total" :current="page.current" :pageSize="page.pageSize" @change="onPageChange" />
		</template>
		<template v-if="!dataSource.length">
			<u-empty :icon="emptyIcon"></u-empty>
		</template>
	</view>
</template>

<script setup lang="ts">
	import uniTable from '@/uni_modules/uni-table/components/uni-table/uni-table.vue';
	import uniTr from '@/uni_modules/uni-table/components/uni-tr/uni-tr.vue';
	import uniTh from '@/uni_modules/uni-table/components/uni-th/uni-th.vue';
	import uniPagination from '@/uni_modules/uni-pagination/components/uni-pagination/uni-pagination.vue';
	import emptyIcon from '@/static/image/empty/no-data.png';
	import { ref, reactive, watch, onMounted, getCurrentInstance } from 'vue';
	
	const instance = getCurrentInstance();
	
	type Columns = {
		title: string;
		name: string;
		render?: (e: {[propertyName: string]: any}) => any;
	}[];
	
	type Data = {
		total: number;
		list: any[];
	};
	
	type Pagination = {
		current?: number;
		pageSize?: number;
	};
	
	type Request = (params: {current: number; pageSize: number}, filter: {[propertyName: string]: any}) => Data;
	
	interface Props {
		columns: Columns;
		data?: Data;
		defaultSize?: number;
		pagination?: Pagination;
		request?: Request;
	}
	
	const props = withDefaults(defineProps<Props>(), {
		defaultSize: 10
	});
	
	const { data, pagination, defaultSize } = props;
	
	const emits = defineEmits(['onSelectionRow', 'onPageChange']);
	
	const dataSource = ref([]);
	
	const page = reactive({
		current: 1,
		pageSize: defaultSize,
		total: 0
	});
	
	const onPageChange = (e: {type: 'prev' | 'next', current: number}) => {
		if(data != undefined){
			return emits('onPageChange', e);
		}
		page.current = e.current;
	}
	
	const updataData = async () => {
		if(data?.list){
			return dataSource.value = data.list;
		}
		if(props.request && typeof props.request == 'function'){
			try{
				const res = await props.request({current: page.current, pageSize: page.pageSize}, {});
				dataSource.value = res.list || [];
				page.total = res.total || 0;
			} catch (err) {
				console.log("获取表格数据异常：", err);
			}
		}
	}
	
	defineExpose({
		reload: updataData
	});
	
	watch(() => [data.total, pagination], () => {
		page.total = data.total;
		if(pagination){
			const { current = page.current, pageSize = page.pageSize } = pagination;
			page.current = current;
			page.pageSize = pageSize;
		}
	}, {
		deep: true
	});
	
	watch(() => [data, page], () => updataData(), {
		deep: true,
		immediate: true
	});
	
</script>

<style>
	.pro-table /deep/ .uni-table-th{
		color: #333333;
		border-bottom: 0;
		background-color: #f3f4f6;
	}
	
	.pro-table /deep/ .uni-table-th-content{
		width: max-content;
	}
	
	.pro-table /deep/ .uni-table .uni-table-tr:not(:last-child) .uni-table-td{
		border-bottom: 0;
	}
	
	.pro-table /deep/ .uni-table-td,
	.pro-table /deep/ .uni-table-td *{
		white-space: nowrap;
	}
</style>