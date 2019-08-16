<template>
    <b-container>
        <b-row class="d-flex">
            <panel v-for="(stock, field) in getStocks" :company="field" :key="field" :isBuy="true" />
        </b-row>
    </b-container>
</template>

<script>
import Panel from './Panel'

export default {
    components: {
        Panel
    },
    computed: {
        getStocks() {
			return this.$store.getters.getStocks
		}
    },
}
</script>

<style>

</style>
