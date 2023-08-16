<template>
	<pro-page-view n-left-icon='close' @onNavbarLeftClick="onNavbarLeftClick">
		<pro-menu-bar :items="items" @onClick="onMenuClick"/>
		<view class="menu-category">
			<u-skeleton
			    title
				rows="3"
				titleHeight="25"
				rowsHeight="25"
				:loading="loading"
				:style="{padding: `${loading ? '33rpx' : 0}`, background: '#fff'}"
			>
			    <pro-menu-bar
			        style="padding-bottom: 40rpx"
			        title="采购管理"
			    	:items="procures" 
			    	@onClick="(i, item: {}) => onMenuClick(0, item)"
			    />
			    <pro-menu-bar
			        style="padding-bottom: 40rpx"
			        title="销售管理"
			    	:items="sales" 
					@onClick="(i, item: {}) => onMenuClick(0, item)"
			    />
			    <pro-menu-bar
			        style="padding-bottom: 40rpx"
			        title="资产管理"
			    	:items="propertys" 
					@onClick="(i, item: {}) => onMenuClick(0, item)"
			    />
			    <pro-menu-bar
			        style="padding-bottom: 40rpx"
			        title="资金管理"
			    	:items="funds" 
					@onClick="(i, item: {}) => onMenuClick(0, item)"
			    />
			</u-skeleton>
		</view>
	</pro-page-view>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { useNavigate } from '@/hooks';
	import config from '@/configs';
	import * as ding from '@/utils/dingtalk';
	
	const items = ref([
		{
			tabIndex: 0,
			text: '待我处理',
			icon: '../../static/image/filter-class/wait-icon.png',
		},{
			tabIndex: 2,
			text: '我已处理',
			icon: '../../static/image/filter-class/processed-icon.png',
		},{
			tabIndex: 8,
			text: '我发起的',
			icon: '../../static/image/filter-class/iposted-icon.png',
		},{
			tabIndex: 3,
			text: '抄送我的',
			icon: '../../static/image/filter-class/copy-icon.png',
		}
	]);
	
	const procures = ref([
		{
			id: '226',
			text: '原辅材料',
			icon: '../../static/image/home-menu/icon1.png',
		},{
			id: '227',
			text: '五金配件',
			icon: '../../static/image/home-menu/icon2.png',
		},{
			id: '228',
			text: '办公用品',
			icon: '../../static/image/home-menu/icon3.png',
		},{
			id: '241',
			text: '库存商品',
			icon: '../../static/image/home-menu/icon4.png',
		}
	]);
	
	const sales = ref([
		{
			id: '232',
			text: '境外销售',
			icon: '../../static/image/home-menu/icon5.png',
		},{
			id: '233',
			text: '境内销售',
			icon: '../../static/image/home-menu/icon6.png',
		}
	]);
	
	const propertys = ref([
		{
			id: '229',
			text: '资产申领',
			icon: '../../static/image/home-menu/icon7.png',
		},{
			id: '242',
			text: '资产采购',
			icon: '../../static/image/home-menu/icon8.png',
		},{
			id: '230',
			text: '资产处置',
			icon: '../../static/image/home-menu/icon9.png',
		},{
			id: '243',
			text: '基建工程',
			icon: '../../static/image/home-menu/icon10.png',
		}
	])
	
	const funds = ref([
		{
			id: '239',
			text: '分期付款',
			icon: '../../static/image/home-menu/icon11.png',
		},{
			id: '231',
			text: '费用付款',
			icon: '../../static/image/home-menu/icon12.png',
		},{
			id: '240',
			text: '境外付款',
			icon: '../../static/image/home-menu/icon13.png',
		},{
			id: '236',
			text: '排款计划',
			icon: '../../static/image/home-menu/icon14.png',
		},{
			id: '237',
			text: '资金调拨',
			icon: '../../static/image/home-menu/icon15.png',
		},{
			id: '235',
			text: '工资发放',
			icon: '../../static/image/home-menu/icon16.png',
		}
	])
	
	const loading = ref(true);
	
	const navigate = useNavigate();
	
	const onNavbarLeftClick = () => {
		if(ding.isDingPlatform){
			return ding.quitApp();
		}
		console.warn('不是钉钉环境');
	}
	
	const onMenuClick = (index: number, item: any) => {
		navigate('/pages/approve/index').then(() => {2
		    // 首次跳转到的页面无法监听到事件，这里延迟100毫秒触发
			setTimeout(() => {
				uni.$emit('switchApproveSuccess', {
					tabIndex: item.tabIndex || 0,
					categoryId: item.id || ''
				});
			}, 100)
		});
		console.log("环境：", process.env, config);
	}
	
	onMounted(() => {
		setTimeout(() => {
			loading.value = false;
		}, 1000)
	})

</script>

<style scoped lang="scss">
	.menu-category{
		padding-top: 22rpx;
		background-color: $bg-color;
	}

</style>