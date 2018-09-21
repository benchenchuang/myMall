import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Hello from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '商城首页'
      },
      children:[
        {
          path:'/hello',
          name:'Hello',
          component:Hello,
          meta:{
            title:"hello页面"
          }
        }
      ]
    }
    
  ]
})
