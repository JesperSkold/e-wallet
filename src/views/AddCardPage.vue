<template>
	<main>
		<h1>ADD NEW CARD</h1>
		<router-link to="/" class="go-back"><img src="../assets/go_back.svg" alt="go back btn" @click="$emit('goBack')" /></router-link>
		<h5>NEW CARD</h5>
		<CardItem :card="card" class="noEmits" />

		<form @submit.prevent="submitCard">
			<div>
				<label for="cardNumber">CARD NUMBER</label>
				<input
					name="cardNumber"
					id="card number"
					type="text"
					placeholder="XXXX XXXX XXXX XXXX"
					v-model="card.cardNumber"
					maxlength="16"
					@keydown="preventLetter($event)"
					required
				/>
			</div>

			<div>
				<label for="fullName">CARDHOLDER NAME</label>
				<input name="fullName" id="name" type="text" placeholder="Firstname Lastname" v-model="card.cardHolder" maxlength="30" @keydown="preventNum($event)" required />
			</div>

			<div class="month-year">
				<div class="month-container">
					<label for="months">MONTH</label>
					<select name="months" id="month" v-model="card.expireMonth" required>
						<option value="" disabled selected hidden></option>
						<option value="01">01</option>
						<option value="02">02</option>
						<option value="03">03</option>
						<option value="04">04</option>
						<option value="05">05</option>
						<option value="06">06</option>
						<option value="07">07</option>
						<option value="08">08</option>
						<option value="09">09</option>
						<option value="10">10</option>
						<option value="11">11</option>
						<option value="12">12</option>
					</select>
				</div>

				<div class="year-container">
					<label for="years">YEAR</label>
					<select name="years" id="year" v-model="card.expireYear" required>
						<option value="" disabled selected hidden></option>
						<option value="22">22</option>
						<option value="23">23</option>
						<option value="24">24</option>
						<option value="25">25</option>
						<option value="26">26</option>
					</select>
				</div>
			</div>

			<div class="vendor-container">
				<label for="vendor">VENDOR</label>
				<select name="vendor" id="vendor" v-model="card.vendor" required>
					<option value="" disabled selected hidden></option>
					<option value="bitcoin">Bitcoin Inc</option>
					<option value="blockchain">Blockchain Inc</option>
					<option value="evil">Evil Corp</option>
					<option value="ninja">Ninja Bank</option>
				</select>
			</div>

			<ul v-if="errors.length">
				<li v-for="error in errors" :key="error">{{ error }}</li>
			</ul>
			<button type="submit">ADD CARD</button>
		</form>
	</main>
</template>

<script>
import CardItem from "../components/CardItem.vue";
export default {
	components: {
		CardItem,
	},
	data() {
		return {
			filledOutForm: false,
			cardColor: "",
			textColor: "",
			card: {
				vendor: "",
				cardNumber: "",
				cardHolder: "",
				expireMonth: "",
				expireYear: "",
				CCV: this.randomizeCvv(),
				active: false,
			},
		};
	},
	computed: {
		errors() {
			return this.$store.state.errors;
		},
	},
	methods: {
		preventLetter(e) {
			if (!e.key.match(/\d|Backspace|Enter/)) {
				e.preventDefault();
			}
		},
		preventNum(e) {
			if (!e.key.match(/[A-Öa-ö\s]/) || e.key === "§") {
				e.preventDefault();
			}
		},
		randomizeCvv() {
			return String(Math.floor(Math.random() * 9)) + String(Math.floor(Math.random() * 9)) + String(Math.floor(Math.random() * 9));
		},
		submitCard() {
			this.$store.dispatch("card", { ...this.card });
		},
	},
};
</script>

<style lang="scss" scoped>
.noEmits {
	pointer-events: none;
}
main {
	display: flex;
	flex-direction: column;
	align-items: center;
}
form {
	display: flex;
	flex-direction: column;
	align-items: center;
}
div select,
div input {
	box-sizing: border-box;
	width: 32rem;
	display: block;
}
h1,
h5 {
	margin: 0;
}
h1 {
	margin-top: 1rem;
}
h5 {
	margin-bottom: 0.5rem;
}

.month-year {
	display: flex;
}

.month-container {
	margin: 0 2rem 0 0;
}
.year-container select,
.month-container select {
	width: 15rem;
}

input,
.vendor-container select,
.year-container select,
.month-container select {
	height: 2rem;
}
form > div {
	margin: 1rem;
}
button {
	cursor: pointer;
	margin: 2rem 0;
	background: none;
	font-size: 1.6rem;
	font-weight: 700;
	height: 4rem;
	width: 32rem;
	&:hover {
		color: white;
		background: black;
	}
}
.go-back {
	margin-right: 31rem;
	img {
		width: 5rem;
		cursor: pointer;
		color: white;
		border-radius: 100%;
		background: none;
		&:hover {
			background: #d0d0d0;
		}
	}
}
@media screen and (max-width: 425px) {
	form {
		transform: scale(0.55);
	}
	.go-back {
		margin-right: 16rem;
		width: 4rem;
	}
}
</style>
