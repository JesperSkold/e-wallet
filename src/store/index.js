import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router"

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    cards: [],
    errors: []
  },
  mutations:{
    AddCard(state, obj){
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
    }
  },
  actions:{
    card(context, obj){
      context.commit('AddCard', obj)
    }
  },
  getters:{

  }
})