<script setup lang="ts">
  import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
  import { getAuthCode } from "@/utils/auth";
  onLaunch(() => {
    getAuthCode().then(res => {
        console.log(res);
        uni.showToast({
          title: '登录成功',
          icon: 'none',
          duration: 2000
        });
      }).catch(err => {
        console.log(err, "错误")
        uni.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 2000
      });
    });
  });
  onShow(() => {
    console.log("App Show");
  });
  onHide(() => {
    console.log("App Hide");
  });
</script>
<style scoped lang="scss">
  @import "uview-plus/index.scss";
</style>
