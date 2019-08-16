<template>
    <b-container>
        <b-jumbotron header="Histórico" bg-variant="info" text-variant="light" lead="Veja o histórico de vendas, compras, ganhos e despesas aqui.">
            <hr />
            <b-table small striped hover responsive bordered dark class="text-center" :items="items" :fields="fields">
                <template :slot="'company'" slot-scope="data">
                    <i v-if="data.value === 'BMW'" :class="getStockIcon(data.value)"></i>
					<font-awesome-icon v-else :icon="['fab', getStockIcon(data.value)]" />
                    {{ data.value }}
                </template>
                <template :slot="'expenses'" slot-scope="data">
                    {{ -(data.value) | money }}
                </template>
                <template :slot="'profit'" slot-scope="data">
                    {{ data.value | money }}
                </template>
                <template :slot="'balance'" slot-scope="{ item }">
                    {{ item.balance | money }}
                </template>
            </b-table>
        </b-jumbotron>
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            fields: [
                { key: 'company', sortable: true, label: 'Empresa', thClass: 'pl-md-4' },
                { key: 'expenses', sortable: true, label: 'Despesas', thClass: ['bg-danger', 'pl-md-4'] },
                { key: 'profit', sortable: true, label: 'Receitas', thClass: ['bg-success', 'pl-md-4'] },
                { key: 'sold', sortable: true, label: 'Vendidas', thClass: 'pl-md-4' },
                { key: 'bought', sortable: true, label: 'Compradas', thClass: 'pl-md-4' },
                { key: 'balance', sortable: true, label: 'Balanço', thClass: 'pl-md-4' }
            ],
            items: []
        }
    },
    mounted() {
        for (var key in this.getHistory) {
            let total = (this.getHistory[key].profit - this.getHistory[key].expenses)
            this.items.push({
                company: key,
                ...this.getHistory[key],
                balance: total,
                _cellVariants: { balance: (total === 0 ? '' :  total > 0 ? 'success' : 'danger') }
            })
        }
    },
    computed: {
        getHistory() {
            return this.$store.getters.getHistory
        }
    },
    methods: {
        getStockIcon(company) {
            return this.$store.getters.getStock(company).icon
        }
    },
}
</script>

<style>

</style>
