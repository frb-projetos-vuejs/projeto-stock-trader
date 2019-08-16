import Vue from 'vue'
import Router from 'vue-router'

import Main from './components/Main'
import Portfolio from './components/Portfolio'
import Stocks from './components/Stocks'
import History from './components/History'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Main },
        { path: '/portfolio', component: Portfolio },
        { path: '/stocks', component: Stocks },
        { path: '/history', component: History },
    ]
})