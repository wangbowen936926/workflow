<template>
	<view :style="{height: containerHeight, background, overflowY: 'auto'}">
		<template v-if="navbar">
			<u-navbar 
				:title="title"
				:titleStyle="titleStyle"
				:autoBack="((nLeftIcon || nLeftText) && !isCustomNavLeftEvent) ? autoBack : false"
				:leftIconColor="'#000'"
				:left-icon="nLeftIcon"
				:right-icon="nRightIcon"
				:left-text="nLeftText"
				:right-text="nRightText"
				@leftClick="leftClick"
				@rightClick="rightClick"
			>
				<template v-if="instance.slots['navbar-left']" #left>
					<slot name="navbar-left"></slot>
				</template>
				<template v-if="instance.slots['navbar-right']" #right>
					<slot name="navbar-right"></slot>
				</template>
			</u-navbar>
		</template>
		<view :style="`padding-top: ${navbar ? '44px' : 0}`">
			<slot></slot>
		</view>
		<u-loading-page :loading="loading" iconSize="30" :loading-text="loadingText" fontSize="16" />
	</view>
</template>

<script setup lang="ts">
	import { getCurrentInstance, computed } from 'vue';
	import { checkRouteSwitchTabType } from '@/utils/router'
	
	interface Props {
		loading?: boolean;
		loadingText?: string;
		navbar?: boolean;
		title?: string;
		autoBack?: boolean;
		nLeftIcon?: string;
		nRightIcon?: string;
		nLeftText?: string;
		nRightText?: string;
		background?: string;
	}
	
	withDefaults(defineProps<Props>(), {
		loadingText: '努力加载中...',
		title: 'OA系统',
		navbar: true,
		autoBack: true,
		nLeftIcon: 'arrow-left',
		background: 'white'
	});
	
	const emits = defineEmits(['onNavbarLeftClick', 'onNavbarRightClick']);
	
	const instance = getCurrentInstance() as any;
	
	const isCustomNavLeftEvent = instance.vnode.props['onOnNavbarLeftClick'] ? true : false;
	
	const titleStyle = {
	    fontWeight: "bold",
		fontSize: '33rpx'
	    // fontFamily: "'Courier New', Courier, monospace"
	};
	
	const containerHeight = computed(() => {
		const path = instance.$pageInstance.ctx.$page.path;
		const result = checkRouteSwitchTabType(path);
		return result ? 'calc(100vh - 50px)' : '100vh';
	})
	
	const leftClick = () => {
		if(isCustomNavLeftEvent){
			return emits('onNavbarLeftClick');
		}
	}
	
	const rightClick = () => {
		emits('onNavbarRightClick');
	}
	
</script>

<style scoped lang="scss"></style>