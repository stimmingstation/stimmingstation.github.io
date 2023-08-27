import { writable } from 'svelte/store'

export const zIndex = writable(1)

/**
 * State for the Window.svelte component
 * @typedef {{
 *   x: number,
 *   y: number,
 *   w: number,
 *   h: number,
 * }} WindowState
 */

/**
 * Object representing all Windows
 * @typedef {{
 *   url: string,
 *   state: WindowState,
 *   params: any,
 * }} Window
 * @todo the params field isn't used right now
 */

/** @type {Window[]} */
const initialWindows = [
  {
    url: 'https://www.youtube.com/watch?v=ChBg4aowzX8',
    state: {
      x: 17,
      y: 21,
      w: 630,
      h: 354,
    },
    params: {},
  },
  {
    url: 'https://www.youtube.com/watch?v=Q4MOP8s9KyY',
    state: {
      x: 1187,
      y: 25,
      w: 630,
      h: 354,
    },
    params: {},
  },
  {
    url: 'https://www.youtube.com/watch?v=REuKymvrrqk',
    state: {
      x: 473,
      y: 242,
      w: 862,
      h: 483,
    },
    params: {},
  },
  {
    url: 'https://www.youtube.com/watch?v=gHIS-Xb2DbY',
    state: {
      x: 13,
      y: 500,
      w: 628,
      h: 354,
    },
    params: {},
  },
  {
    url: 'https://www.youtube.com/watch?v=A7IMBnMU5a4',
    state: {
      x: 1351,
      y: 400,
      w: 500,
      h: 380,
    },
    params: {},
  },
]

export const windows = writable(initialWindows)
