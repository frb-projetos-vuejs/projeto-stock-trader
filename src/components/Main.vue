<template>
	<b-container>
		<b-jumbotron header="Bem vindo ao Stock Trader!" bg-variant="info" text-variant="light" lead="Negocie e consulte suas ações!">
			<b-alert show variant="primary">
				<font-awesome-icon icon="lightbulb" />
				Você pode salvar e carregar os dados.
			</b-alert>
			<b-alert show variant="success">
				<font-awesome-icon icon="dollar-sign" />
				Clique em Finalizar Dia para iniciar um novo dia.
			</b-alert>
			<hr />
			Saldo: {{ getCash | money }}
		</b-jumbotron>
	</b-container>
</template>

<script>

export default {
	computed: {
		getCash() {
			return this.$store.getters.getCash
		}
	}
}

</script>

<style>

</style>
