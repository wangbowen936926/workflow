<template>
	<view class="menu-bar">
		<u-collapse value="item" accordion :border="false">
			<u-collapse-item name="item" :title="title" :isLink="(title && isCollapseMode) ? true : false" :disabled="!isCollapseMode">
				<u-grid :border="false" :col="columns">
					<u-grid-item v-for="(menu, index) in items" class="menu-bar__item" :key="index" @click="to(index, menu)">
						<u--image class="menu-bar__icon" :src="menu.icon" :width="`${iconSize}rpx`" :height="`${iconSize}rpx`"/>
						<text class="menu-bar__text">{{ menu.text }}</text>
					</u-grid-item>
				</u-grid>
			</u-collapse-item>
		</u-collapse>
	</view>
</template>

<script setup lang="ts">
	import { computed, getCurrentInstance } from 'vue';
	import * as router from '@/utils/router';
	
	interface Props {
		title?: string;
		columns?: number;
		iconSize?: number;
		isCollapseMode?: boolean;
		items: {
			icon: string;
			text: string;
			to?: string;
		}[];
	}
	
	const props = withDefaults(defineProps<Props>(), {
		columns: 4,
		iconSize: 90,
		isCollapseMode: true,
		items: () => []
	});
	
	const emits = defineEmits(['onClick']);
	
	const instance = getCurrentInstance();
	
	const titlePaddingLR = computed(() => {
		return `calc(((100% / ${props.columns}) - ${props.iconSize}rpx) / 2)`;
	})
	
	const to = (index: number, menu: {to?: string}) => {
		if(instance.vnode.props['onOnClick']){
			return emits('onClick', index, menu);
		}
		const path = menu.to || '';
		if(!path){
			return uni.showToast({
				title: '暂未开放，敬请期待~',
				icon: 'none'
			})
		}
		const arr = path.split('?');
		const result = router.checkRouteSwitchTabType(arr[0]);
		if(result){
			uni.switchTab({url: path});
		}else{
			uni.navigateTo({url: path});
		}
	}

	
</script>

<style>
	.menu-bar /deep/ .u-cell{
		display: v-bind(props.title ? 'block' : 'none');
	}
	.menu-bar /deep/ .u-cell__body{
		padding: 20rpx v-bind(titlePaddingLR);
		background-color: #fff !important;
	}
	.menu-bar /deep/ .u-cell__body .u-cell__left-icon-wrap{
		margin: 0;
	}
	.menu-bar /deep/ .u-cell--disabled{
		color: unset;
	}
	.menu-bar /deep/ .u-cell__title-text{
		font-size: 33rpx;
		font-weight: bold;
	}
	.menu-bar /deep/ .u-collapse-item__content__text.content-class{
		padding: 0 !important;
	}
</style>

<style scoped lang="scss">
	.menu-bar{
		background-color: $bg-color-default;
		&__title{
			font-size: 33rpx;
			font-weight: bold;
			line-height: 80rpx;
		}
		&__item{
			margin: 20rpx 0;
		}
		&__text{
			color: $text-color-menu;
			font-size: 26rpx;
			margin-top: 16rpx;
		}
	}

</style>