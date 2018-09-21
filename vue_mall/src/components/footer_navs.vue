<template>
    <footer>
        <div class="footer_box flex_box">
            <router-link tag="nav" :to="{name:'Home'}" class="flex_item"><i class="fa fa-home"></i><p>首页</p></router-link>
            <router-link tag="nav" :to="{name:'Hello'}" class="flex_item"><i class="fa fa-gift"></i><p>商城</p></router-link>
            <router-link tag="nav" to="" class="flex_item"><i class="fa fa-shopping-cart"></i><p>购物车</p></router-link>
            <router-link tag="nav" to="" class="flex_item"><i class="fa fa-user"></i><p>我的</p></router-link>
        </div>
    </footer>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
footer{
    width: 100%;
    height: 12vw;
    .footer_box{
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 0;
        height: 12vw;
        background: #fff;
        box-shadow: 0 -1px 4px 1px rgba(0,0,0,.1);
        nav{
            margin-top: 1vw;
            color: #999;
            text-align: center;
            .fa{
                font-size: 5vw;
            }
        }
        nav.router-link-active.router-link-exact-active{
        color: #333;
        }
    }
}
</style>


