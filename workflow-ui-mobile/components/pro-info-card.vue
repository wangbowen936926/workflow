<template>
	<view>
		<view v-for="(item, index) in items" class="item" :key="index" :style="{flexDirection: direction}">
			<text class="item__lable" :style="labelStyle">
			    {{ item.label }}
			</text>
			<view class="item__value" v-html="labelValue(item)"/>
		</view>
	</view>
</template>

<script setup lang="ts">
    import { computed } from "vue";
	
	interface Props {
		direction?: 'row' | 'column';
		labelWidth?: number;
		labelAlign?: 'left' | 'right';
		items: {
			label: string;
			field: string;
			render?: (v: any) => void;
		}[];
		data: {[propertyName: string]: any};
	}
	
    const props = withDefaults(defineProps<Props>(), {
		direction: 'row',
		labelAlign: 'right',
	});
	
	const labelStyle = computed(() => {
		return {
			width: props.labelWidth ? `${props.labelWidth}rpx` : 'fit-content',
			textAlign: props.labelAlign,
		}
	})
	
	const labelValue = computed(() => (item) => {
		return (item.render && typeof item.render == 'function') ? item.render(props.data[item.field]) : (props.data[item.field] || '~')
	})
	
</script>

<style scoped lang="scss">
	.item{
		display: flex;
		&__lable{
			display: inline-block;
			color: $text-color-inactive;
			font-size: 28rpx;
		}
		&__value{
			color: #000;
			font-size: 30rpx;
			font-weight: 500;
			width: calc(100% - 150rpx);
		}
	}
	.item:not(:last-of-type){
		padding-bottom: 33rpx;
	}
</style>