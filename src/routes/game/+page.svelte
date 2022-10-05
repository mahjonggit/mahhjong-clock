<script lang="ts">
	import { onMount } from 'svelte';
	import { current, gameTime, time } from '../../stores/time';
	type Player = 'east' | 'north' | 'south' | 'west';
	const intervals = {
		east: {},
		north: {},
		south: {},
		west: {}
	};
	let playersWhoHaveLost = 0;
	const playerOrder = ['east', 'north', 'west', 'south'];
    onMount(()=>{
        //If gametime is -1 then the game has not started yet
        if ($gameTime.standard === -1) {
            //Redirect to the home page
            window.location.href = '/';
        }
    })
	let gameStarted = false;

	const decrementTime = () => {
		const interval = setInterval(() => {
			if ($time[$current as Player].standard > 0) {
				$time[$current as Player].standard--;
			} else if ($time[$current as Player].bonus > 0) {
				$time[$current as Player].bonus--;
			} else {
				playersWhoHaveLost++;
				nextPlayer();
			}
		}, 1000);
		//Store the interval in the intervals object for the current player
		intervals[$current as Player] = interval;
	};
	const nextPlayer = () => {
		if (!gameStarted) {
			gameStarted = true;
			return decrementTime();
		}
		clearInterval(intervals[$current as Player] as number);
		let i = playerOrder.indexOf($current);
		while (true) {
			i++;
			if (i >= playerOrder.length) {
				i = 0;
			}
			if (
				$time[playerOrder[i] as Player].standard > 0 ||
				$time[playerOrder[i] as Player].bonus > 0
			) {
				let prev = $current;
				$current = playerOrder[i];
				if (playersWhoHaveLost === 3) {
					//Clear all the intervals
					Object.values(intervals).forEach((interval) => {
						clearInterval(interval as number);
					});
					break;
				}
				//If the bonus time is not 0
				if ($time[prev as Player].bonus > 0) {
					$time[prev as Player].standard = $gameTime.standard;
				}
				decrementTime();
				break;
			}
		}
	};
	const reset = () => {
		$time = {
			east: {
				standard: $gameTime.standard,
				bonus: $gameTime.bonus
			},
			north: {
				standard: $gameTime.standard,
				bonus: $gameTime.bonus
			},
			south: {
				standard: $gameTime.standard,
				bonus: $gameTime.bonus
			},
			west: {
				standard: $gameTime.standard,
				bonus: $gameTime.bonus
			}
		};
		Object.values(intervals).forEach((interval) => {
			clearInterval(interval as number);
		});
		gameStarted = false;
		$current = 'east';
		playersWhoHaveLost = 0;
	};
</script>

<section>
	<div class="box">
		<button on:click={reset} class="reset">Reset</button>
		<div
			class="north player {$current === 'north' ? 'active' : ''}  {$time.north.bonus === 0
				? 'lost'
				: ''}"
		>
			<p class="japanese">北 (North)</p>
			<div class="time">
				<div class="standard">
					<p class="time_title">Time</p>
					<p class="time">{$time.north.standard}</p>
				</div>
				<div class="bank">
					<p class="time_title">Reserve</p>
					<p class="time">{$time.north.bonus}</p>
				</div>
			</div>
		</div>
		<div class="south player {$current === 'south' ? 'active' : ''} {$time.south.bonus === 0
            ? 'lost'
            : ''}">
			<p class="japanese">南 (South)</p>
			<div class="time">
				<div class="standard">
					<p class="time_title">Time</p>
					<p class="time">{$time.south.standard}</p>
				</div>
				<div class="bank">
					<p class="time_title">Reserve</p>
					<p class="time">{$time.south.bonus}</p>
				</div>
			</div>
		</div>
		<div class="east player {$current === 'east' ? 'active' : ''} {$time.east.bonus === 0
            ? 'lost'
            : ''}">
			<p class="japanese">東 (East)</p>
			<div class="time">
				<div class="standard">
					<p class="time_title">Time</p>
					<p class="time">{$time.east.standard}</p>
				</div>
				<div class="bank">
					<p class="time_title">Reserve</p>
					<p class="time">{$time.east.bonus}</p>
				</div>
			</div>
		</div>
		<div class="west player {$current === 'west' ? 'active' : ''} {$time.west.bonus === 0
            ? 'lost'
            : ''}">
			<p class="japanese">西 (West)</p>
			<div class="time">
				<div class="standard">
					<p class="time_title">Time</p>
					<p class="time">{$time.west.standard}</p>
				</div>
				<div class="bank">
					<p class="time_title">Reserve</p>
					<p class="time">{$time.west.bonus}</p>
				</div>
			</div>
		</div>
		<button on:click={nextPlayer}>{gameStarted ? 'Next' : 'Start'}</button>
	</div>
</section>

<style>
	section {
		width: 100%;
		max-width: 1000px;
		height: 100vh;
		display: flex;
		margin: 0 auto;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.box {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 50px;
		margin: 0 auto;
	}
	.time {
		display: flex;
		justify-content: space-between;
		width: fit-content;
		gap: 20px;
		font-size: 2rem;
	}
	.time_title {
		font-size: 1.2rem;
		color: #1a74e2;
	}
	.player {
		width: fit-content;
		height: fit-content;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		opacity: 0.5;
	}
	.japanese {
		font-size: 2rem;
		text-align: center;
		margin-bottom: 10px;
	}
	.north {
		top: 150px;
	}
	.south {
		bottom: 150px;
	}
	.east {
		right: 60px;
	}
	.west {
		left: 60px;
	}
	button {
		cursor: pointer;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 50px;
		background-color: #1a74e2;
		color: white;
		font-size: 1.2rem;
		border: none;
		outline: none;
		cursor: pointer;
	}
	.active {
		opacity: 1;
	}
	.active .japanese {
		color: #1a74e2;
	}
	.lost {
		color: red;
	}
    .lost .time_title{
        color: red;
    }
	.reset {
		border-radius: 0;
		width: 100%;
		height: 50px;
		transform: unset;
		position: fixed;
		top: 0;
		left: 0;
		cursor: pointer;
		background-color: #ff8787a1;
		color: black;
	}
	@media (max-width: 1000px) {
		.japanese {
			font-size: 1.5rem;
		}
		.time {
			font-size: 2rem;
			gap: 20px;
		}
		.north {
			top: 80px;
		}
		.south {
			bottom: 80px;
		}
		.east {
			right: -0;
			transform: rotate(-90deg);
		}
		.west {
			left: -0;
			transform: rotate(90deg);
		}
	}
</style>
