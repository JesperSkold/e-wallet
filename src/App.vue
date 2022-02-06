<template>
	<div id="app">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
export default {
	name: "App",
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Saira:wght@200&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Saira:wght@200&display=swap");
body {
	min-height: 100vh;
	margin: 0;
	padding: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
	font-family: "Source Sans Pro", sans-serif;
}
p,
label,
li {
	font-family: "PT Mono", monospace;
}
</style>
