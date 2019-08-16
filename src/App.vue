<template>
	<div>
		<top-menu />
		<transition name="fade" appear mode="out-in">
			<router-view />
		</transition>
	</div>
</template>

<script>
import TopMenu from './components/TopMenu'

export default {
	components: {
		TopMenu
	}
}
</script>

<style>

</style>