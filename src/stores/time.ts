import { writable } from 'svelte/store';
export const gameTime = writable({
    standard: -1,
    bonus: -1
});


export const current = writable('east');

export const time = writable({
    east: {
        standard: 2,
        bonus: 1
    },
    north: {
        standard: 2,
        bonus: 1
    },
    west: {
        standard: 2,
        bonus: 1
    },
    south: {
        standard: 2,
        bonus: 1
    }
});

