import { computed } from 'vue';

const useTableData = (nodeVariables: {[propertyName: string]: any}[]) => {
	
	const find = (propertyName: string, or?: string) => {
		const data = nodeVariables.find(item => {
			return item.value[propertyName] || item.value[or];
		});
		return data?.value[propertyName] || data?.value[or] || [];
	}
	
	// 获取明细表
	const entry = computed(() => find('entry'));
	
	// 获取询价表
	const inventory_entry = computed(() => find('inventory_entry', 'inquiry_entry'));
	
	// 获取最终供应商
	const result_entry = computed(() => find('result_entry', 'inquiry_result'));
	
	const value_entry = computed(() => find('value_entry'));
	
	return {
		entry,
		inventory_entry,
		result_entry,
		value_entry
	}
}

export default useTableData;