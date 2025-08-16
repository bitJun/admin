import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '高考后台',
    locale: false,
  },
  routes: [
    {
      path: '/login',
      component: './Login',
      layout: false,
    },
    // {
    //   path: '/',
    //   redirect: '/home',
    // },
    {
      name: '工作台',
      path: '',
      component: './Home',
    },
    {
      name: '会员价格自定义',
      path: '/member_price',
      component: './MemberPrice',
    },
    {
      name: '卡管理',
      path: '/card',
      routes: [
        {
          name: '发行卡',
          path: 'card/create',
          component: './Card/create',
        },
        {
          name: '发行记录',
          path: 'card/record',
          component: './Card/record',
        },
        {
          name: '卡列表',
          path: 'card/list',
          component: './Card/list',
        },
      ],
    },
    {
      name: '用户管理',
      path: '/member',
      routes: [
        {
          name: '用户列表',
          path: '/member/list',
          component: './Member/list',
        },
        {
          name: '用户详情',
          path: '/member/detail',
          component: './Member/detail',
          hideInMenu: true
        },
      ],
    },
    {
      name: '文章管理',
      path: '/article',
      routes: [
        {
          name: '升学规划',
          path: '/article/school',
          component: './Article/school',
        },
        {
          name: '军旅规划',
          path: '/article/army',
          component: './Article/army',
        },
      ],
    },
    {
      name: '财务管理',
      path: '/finance',
      component: './Finance',
    },
    {
      name: '活动管理',
      path: '/activity',
      routes: [
        {
          name: '新建活动',
          path: '/activity/add',
          component: './Activity',
        }
      ]
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      target: 'https://youjia-admin.529603395.xyz',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/dev-api': {
      target: 'https://youjia.529603395.xyz',
      changeOrigin: true,
      pathRewrite: { '^/dev-api': '' },
    }
  },
});

