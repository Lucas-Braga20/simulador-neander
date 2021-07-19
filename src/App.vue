<template>
	<div id="app">
		<Neander/>
	</div>
</template>

<script>
	// Styles
	import '../public/css/style.css';

	// Componentes
	import Neander from './components/Neander.vue';

	export default {
		name: 'App',
		components: {
			Neander,
		},
	};
</script>

<style>
	@import '../public/icons/fontawesome-free-5.15.3-web/css/all.css';
</style>
