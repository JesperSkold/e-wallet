<template>
	<section>
		<div v-for="(card, i) in cards" :key="card.cardNumber" class="card-container">
			<CardItem v-if="card.active" :card="card" :style="{ 'box-shadow': activeShadowHandler }" @delete="deleteEcho" :index="i" />
			<CardItem :card="card" :layerIndex="'layer' + ' l-' + i" :index="i" @delete="deleteEcho" />
		</div>
	</section>
</template>

<script>
import CardItem from "./CardItem.vue";
export default {
	components: {
		CardItem,
	},
	methods: {
		deleteEcho(index) {
			this.$emit("delete", index);
		},
	},
	computed: {
		cards() {
			return this.$store.state.cards;
		},
		activeShadowHandler() {
			return this.$store.getters.activeShadowHandler;
		},
	},
};
</script>

<style lang="scss" scoped>
section {
	min-height: 30vh;
	margin: 0;
	padding: 0;
	position: relative;

	.card-container {
		min-width: 95vw;
		margin: 0;
		padding: 0;
	}
}
@media screen and (max-width: 425px) {
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		min-height: 0;
	}
	.card-container {
		min-width: 0 !important;
		display: flex;
		justify-content: center;
	}
}
</style>
