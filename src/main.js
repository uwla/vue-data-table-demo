import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import { VueDataTable, VdtActionButtons } from '@uwlajs/vue-data-table'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@uwlajs/vue-data-table/dist/VueDataTable.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.component('vue-data-table', VueDataTable)
Vue.component('vdt-actions', VdtActionButtons)

new Vue({
    render: (h) => h(App),
}).$mount('#app')
