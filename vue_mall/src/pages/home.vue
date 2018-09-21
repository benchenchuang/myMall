<template>
    <div class="home">
        <router-view></router-view>
        <nav-tab></nav-tab>
    </div>
</template>
<script>
import navTab from '../components/footer_navs'
export default {
    components:{
        navTab
    }
}
</script>
<style lang="less" scoped>

</style>


