<template>
    <b-container>
        <b-jumbotron header="Portfólio" bg-variant="info" text-variant="light" lead="Aqui você pode vender suas ações.">
            <hr />
            <b-row class="d-flex">
                <panel v-for="(stock, field) in getStocks" :company="field" :key="field" :isBuy="false" />
            </b-row>
            <hr />
            Saldo: {{ getCash | money }}
        </b-jumbotron>
    </b-container>
</template>

<script>
import Panel from './Panel'

export default {
    components: {
        Panel
    },
    computed: {
        getCash() {
			return this.$store.getters.getCash
        },
        getStocks() {
			return this.$store.getters.getStocks
		}
    },
}
</script>

<style>

</style>
