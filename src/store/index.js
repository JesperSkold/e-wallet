import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		cards: [],
		errors: []
	},
	mutations: {
		AddCard(state, obj) {
			console.log(obj);
			state.errors = [];
			if (obj.cardNumber === "") {
				state.errors.push("You must fill out your card number!");
			} else if (obj.cardNumber.match(/\s+/g)) {
				state.errors.push("Fill out your card without spaces!");
			} else if (!obj.cardNumber.match(/^\d+$/)) {
				state.errors.push("You can only have numbers in your card number!");
			} else if (obj.cardNumber.length < 16 || obj.cardNumber.length > 16) {
				state.errors.push("Your card number needs to be exactly 12 numbers!");
			}

			if (obj.cardHolder === "" || obj.cardHolder.match(/^\s+$/)) {
				state.errors.push("You must fill out your name!");
			} else if (obj.cardHolder.match(/[0-9!@#$%^§&*()_+\-=[\]{};':"\\|,.<>/?¨´]+/g)) {
				state.errors.push("You cant have numbers or special characters in your name!");
			} else if (obj.cardHolder.length < 4) {
				state.errors.push("Your name must be longer than 3 letters, sorry!");
			} else if (obj.cardHolder.length > 29) {
				state.errors.push("I'm sorry if you have a long name, but it cant be more than 29 letters!");
			}

			if (obj.expireMonth === "") {
				state.errors.push("Select what month your card expires!");
			}

			if (obj.expireYear === "") {
				state.errors.push("Select what year your card expires!");
			}

			if (obj.vendor === "") {
				state.errors.push("Select a vendor!");
			}

			for (const value of state.cards) { //could be find HO func
				if (obj.cardNumber === value.cardNumber) {
					state.errors.push("A card with this number already exists!");
				}
			}
			if (!state.errors.length) {
				state.cards.push(obj)
				router.push("/")
			}
		},
		toggleActive(state, index) {
			for (const elem of state.cards) {
				if (elem.active === true) {
					elem.active = false;
				}
			}
			state.cards[index].active = !state.cards[index].active;
		},
		deleteCard(state, index) {
			state.cards.splice(index, 1)
		}
	},
	actions: {
		card(context, obj) {
			context.commit('AddCard', obj)
		},
		toggleActive(context, index) {
			context.commit('toggleActive', index)
		},
		deleteDispatch(context, index) {
			context.commit('deleteCard', index)
		}
	},
	getters: {
		checkActiveCard(state) {
			for (const obj of state.cards) {
				if (obj.active === true) {
					return "";
				}
			}
			return "You dont have an active card yet, pick a card to activate it!";
		},
		activeShadowHandler(state) {
			for (const obj of state.cards) {
				if (obj.active && obj.vendor === "bitcoin") {
					return "0px 22px 40px 4px rgba(250, 178, 25, 0.96) ";
				} else if (obj.active && obj.vendor === "blockchain") {
					return "0px 22px 30px 4px rgba(133, 20, 204, 0.9)";
				} else if (obj.active && obj.vendor === "evil") {
					return "0px 22px 30px 4px rgba(204, 20, 56, 0.9)";
				} else if (obj.active && obj.vendor === "ninja") {
					return "0px 22px 30px 4px rgba(31, 24, 30, 0.9)";
				}
			}
			return "";
		},
		vendorColorHandler: () => (card) => {
			if (card.vendor === "bitcoin") {
				return "#FFB84D";
			} else if (card.vendor === "blockchain") {
				return "#8B58F9";
			} else if (card.vendor === "evil") {
				return "#F33355";
			} else if (card.vendor === "ninja") {
				return "#222222";
			} else {
				return "#d0d0d0";
			}
		},
		textColorHandler: () => (card) => {
			if (card.vendor === "bitcoin") {
				return "black";
			} else if (card.vendor === "blockchain") {
				return "white";
			} else if (card.vendor === "evil") {
				return "white";
			} else if (card.vendor === "ninja") {
				return "white";
			} else {
				return "black";
			}
		},

		numberFormatting: () => (card) => {
			if (card.cardNumber) {
				return card.cardNumber.match(/.{1,4}/g).join(" ");
			}
			return "";
		}
	},
})