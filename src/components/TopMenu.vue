<template>
	<div>
	<b-navbar toggleable="lg" variant="info">
		<b-navbar-brand>
			<span class="menu-title">
				<transition name="fade" appear mode="out-in">
					<b-spinner key=1 v-if="loadingLoad || loadingSave" class="items-color margin-spinner" label="Carregando..."></b-spinner>
					<span key=2 v-else>Stock Trader Vue</span>
				</transition>
			</span>
		</b-navbar-brand>
		<b-navbar-toggle target="toggle-topo"><font-awesome-icon icon="bars" class="items-color" /></b-navbar-toggle>

		<b-collapse is-nav id="toggle-topo">
			<b-navbar-nav>
				<b-nav-item to="/" class="splitter-left">Início</b-nav-item>
				<b-nav-item to="/portfolio">Portfólio</b-nav-item>
				<b-nav-item to="/stocks">Ações</b-nav-item>
				<b-nav-item to="/history">Histórico</b-nav-item>
			</b-navbar-nav>
			<hr class="d-md-none" />
			<b-navbar-nav class="ml-auto">
				<b-nav-item class="d-none d-md-block" v-b-tooltip.hover :title="field" v-for="(stock, field) in getStocks" :key="stock.id">
					<i v-if="stock.id === 0" :class="stock.icon"></i>
					<font-awesome-icon v-else :icon="['fab', stock.icon]" />
					: {{ getInventory.owned[field] }}
				</b-nav-item>
				<b-nav-item class="d-none d-md-block">Saldo: {{ getCash | money }}</b-nav-item>
				<b-nav-item-dropdown id="menu-dropdown" text="Inventário" class="d-md-none" type="dark" variant="info">
					<b-dropdown-item><small>Saldo: {{ getCash | money }}</small></b-dropdown-item>
					<b-dropdown-divider />
					<b-dropdown-item v-for="(stock, field) in getStocks" :key="stock.id">
						<small><i v-if="stock.id === 0" :class="stock.icon"></i>
						<font-awesome-icon v-else :icon="['fab', stock.icon]" />
						{{ field }}: {{ getInventory.owned[field] }}</small>
					</b-dropdown-item>
				</b-nav-item-dropdown>
				<b-nav-item @click="newDay" class="splitter">Finalizar dia</b-nav-item>
				<hr class="d-md-none" />
				<b-nav-item>Dia nº {{ getDay }}</b-nav-item>
				<b-nav-item class="d-md-none" @click="saveState">Salvar</b-nav-item>
				<b-nav-item class="d-md-none" @click="loadState">Carregar</b-nav-item>
				<b-nav-item v-b-tooltip.hover title="Salvar" class="d-none d-md-block" @click="saveState">
					<transition name="fade" appear mode="out-in">
						<font-awesome-icon key=1 v-if="!loadingSave" icon="save" />
						<b-spinner key=2 small class="items-color" v-else label="Carregando..."></b-spinner>
					</transition>
				</b-nav-item>
				<b-nav-item v-b-tooltip.hover title="Carregar" class="d-none d-md-block" @click="loadState">
					<transition name="fade" appear mode="out-in">
						<font-awesome-icon key=1 v-if="!loadingLoad" icon="download" />
						<b-spinner key=2 small class="items-color" v-else label="Carregando..."></b-spinner>
					</transition>
				</b-nav-item>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
	</div>
</template>

<script>
import PostService from '../services/PostService'

export default {
	data() {
		return {
			ps: null,
			loadingSave: false,
			loadingLoad: false,
		}
	},
	computed: {
		getCash() {
			return this.$store.getters.getCash
		},
		getStocks() {
			return this.$store.getters.getStocks
		},
		getInventory() {
			return this.$store.getters.getInventory
		},
		getDay() {
			return this.$store.getters.getDay
		},
		getState() {
			return this.$store.getters.getState
		}
	},
	created() {
		this.ps = new PostService()
	},
	methods: {
		newDay() {
            this.$store.dispatch('randomizePrices')
            this.messageToast('Você iniciou um novo dia. Verifique os novos preços das ações.', 'warning')
        },
        messageToast(message, variant) {
            this.$bvToast.toast(message, {
                title: 'Operação realizada',
                variant: variant,
                toaster: 'b-toaster-bottom-center',
                solid: false
			})
		},
		saveState() {
			//console.log(this.getState)
			this.loadingSave = true
			setTimeout(() => {
				this.ps.Post(this.getState, this.cbSaved, this.cbSavedError)
			}, 1000)
		},
		loadState() {
			this.loadingLoad = true
			setTimeout(() => {
				this.ps.Get(this.cbLoaded, this.cbLoadedError)
			}, 1000)
		},
		cbSaved(resp) {
			this.messageToast('Dados salvos com sucesso.', 'success')
			this.endSave()
			//console.log(resp)
		},
		cbSavedError(resp) {
			this.messageToast('Erro ao salvar arquivos.\n' + resp.status + '-' + resp.statusText, 'danger')
			this.endSave()
			//console.log(resp)
		},
		cbLoaded(resp) {
			this.messageToast('Dados carregados com sucesso.', 'success')
			this.$store.dispatch('loadState', resp.data)
			this.endLoad()
			/* console.log(resp) */
		},
		cbLoadedError(resp) {
			this.messageToast('Erro ao carregar arquivos.\n' + resp.status + '-' + resp.statusText, 'danger')
			this.endLoad()
		},
		endSave() {
			this.loadingSave = false
		},
		endLoad() {
			this.loadingLoad = false
		}
	},
}
</script>

<style scoped>

@media(min-width:576px) {
	.splitter {
		/* border-right: 1px solid rgba(0, 0, 0, 0.412); */
		border-right: 1px solid #7ff8e8;
	}
	.splitter-left {
		border-left: 1px solid #7ff8e8;
		margin-left: -4px;
	}
}

.margin-spinner {
	margin-left: 56px;
	margin-right: 56px;
	width: 1.5rem;
	height: 1.5rem;
}

.items-color {
	color: cyan !important;
}

.navbar-nav > li > a {
    color: cyan !important;
}

.navbar-nav > li > a:hover {
    color: white !important;
}

.menu-title {
	color: rgb(27, 247, 255) !important;
	font-weight: 600;
}

#menu-dropdown >>> .nav-link {
	color: cyan !important;
}

#menu-dropdown >>> a {
	color: cyan !important;
}

#menu-dropdown >>> ul {
	background-color: #17A2B8 !important;
}

#menu-dropdown >>> small {
	color: cyan !important;
}

#menu-dropdown >>> .dropdown-divider {
	border: 1px solid cyan !important;
}

</style>

