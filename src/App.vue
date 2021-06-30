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
	@import url('https://pro.fontawesome.com/releases/v5.10.0/css/all.css');
</style>