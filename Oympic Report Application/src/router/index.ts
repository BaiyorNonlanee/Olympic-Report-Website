import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CountryDetailView from '@/views/event/CountryDetailView.vue'
import SportListView from '@/views/event/SportListView.vue'
import CheerupView from '@/views/event/CheerupView.vue'
import LayoutView from '@/views/event/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetWorkErrorView.vue'
import InfoService from '@/services/InfoService'
import nProgress from 'nprogress'
import AddDataView from '@/views/event/DataFormView.vue' 
import MainPage from '@/App.vue'
import { useInfoStore } from '@/stores/country'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import UserView from '@/views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-view',
      component: HomeView,
      props: route => ({
        page: parseInt(route.query.page?.toString() || '1'),
        limit: parseInt(route.query.limit?.toString() || '5')
      })
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/add-data',
      name: 'add-data',
      component: AddDataView
    },
    {
      path: '/users',
      name: 'users',
      component: UserView
    },
    {
      path: '/main-page',
      name: 'main-page',
      component: MainPage,
    },    
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    },
    { 
      path: '/countries/:id',
      name: 'layout-view',
      component: LayoutView,
      props: true,
      beforeEnter: async (to) => {
        const id = to.params.id as string
        const countryStore = useInfoStore()
        try {
          const response = await InfoService.getCountry(id)
          countryStore.setCountry(response.data)
        } catch (error) {
          if (error.response && error.response.status === 404) {
            return { name: '404-resource-view', params: { resource: 'country' } }
          } else {
            return { name: 'network-error-view' }
          }
        }
      },
      children: [
        {
          path: '',
          name: 'country-detail-view',
          component: CountryDetailView,
          props: true
        },
        {
          path: 'sportlist',
          name: 'country-sportlist-view',
          component: SportListView,
          props: true
        },
        {
          path: 'cheerup',
          name: 'country-cheerup-view',
          component: CheerupView,
          props: true
        },
        {
          path: 'cheerup/:athleteId',
          name: 'athlete-cheerup-view',
          component: CheerupView,
          props: true
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
