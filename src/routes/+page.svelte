<script lang="ts">
	import Input from '$lib/Input.svelte';
	import { gameTime, time } from '../stores/time';
	//Get the value of the input field
	const onChange = (e: any) => {
		//If the value is not a number and if it is a number less than 0 strip the last character
		if (isNaN(e.target.value) || e.target.value < 0) {
			e.target.value = e.target.value.slice(0, -1);
			return;
		}
		if (e.target.name === 'standard') {
			$time.north.standard = e.target.value;
			$time.south.standard = e.target.value;
			$time.east.standard = e.target.value;
			$time.west.standard = e.target.value;
			$gameTime.standard = e.target.value;
		} else {
			$time.north.bonus = e.target.value;
			$time.south.bonus = e.target.value;
			$time.east.bonus = e.target.value;
			$time.west.bonus = e.target.value;
			$gameTime.bonus = e.target.value;
		}
	};
</script>

<section>
	<div class="pagetitle">
		<h1>Welcome to Mahjong!</h1>
	</div>
	<div class="inputs">
		<Input
			name="standard"
			{onChange}
			type="text"
			placeholder="Enter the standard time"
			label="Standard Time"
		/>
		<Input
			name="bonus"
			{onChange}
			type="text"
			placeholder="Enter the bank time"
			label="Reserved Time"
		/>
	</div>
	<a  data-sveltekit-prefetch href="/game">
        <div class="cta">
            Start the game
        </div>
    </a>
</section>

<style>
    a{
        text-decoration: none;
    }
	section {
		max-width: 1200px;
		margin: 0 auto;
        height: 100vh;
		padding-top: 50px;
	}
	.pagetitle {
		text-align: center;
		font-size: 1.5rem;
	}
	.inputs {
		width: 100%;
		display: flex;
		margin-top: 25px;
		gap: 50px;
	}
	.cta {
		text-decoration: none;
        text-align: center;
		width: 100%;
		padding: 10px;
		border: none;
		border-radius: 5px;
		background-color: #1a74e2;
		color: #fff;
		font-size: 1rem;
		margin-top: 25px;
		cursor: pointer;
		scale: 1;
		transform: translateY(0);
		transition: all 0.2s ease-in-out;
	}
	.cta:hover {
		transform: translateY(-1px);
		transition: all 0.2s ease-in-out;
	}
	.cta:active {
		scale: 0.98;
		transition: all 0.2s ease-in-out;
	}
	@media (max-width: 768px) {
		.inputs {
			gap: 15px;
			flex-direction: column;
		}
	}
</style>
