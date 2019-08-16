import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'car-makes-icons/dist/style.css'
import router from './router'
import store from './store/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLightbulb, faDollarSign, faBars, faSave, faDownload } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faApple, faTwitter, faYoutube, faMicrosoft } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faLightbulb, faDollarSign, faApple, faGoogle, faTwitter, faBars, faYoutube, faMicrosoft, faSave, faDownload)

Vue.filter('money', (value) => {
	return `R$ ${parseFloat(value).toFixed(2)}`.replace('.', ',')
})

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
