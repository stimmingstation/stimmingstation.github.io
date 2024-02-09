import { writable } from 'svelte/store'
import { persisted } from 'svelte-persisted-store'

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
 *   title?: string,
 *   url: string,
 *   state: WindowState,
 *   params: any,
 * }} WindowContent
 * @todo the params field isn't used right now
 */

/** @type {WindowContent[]} */
const initialWindows = [
  {
    url: 'https://www.youtube.com/watch?v=ChBg4aowzX8',
    state: {
      x: 17,
      y: 21,
      w: 522,
      h: 312,
    },
    params: {},
  },
  {
    url: 'https://www.youtube.com/watch?v=Q4MOP8s9KyY' /* Soap Cutting */,
    state: {
      x: 947,
      y: 5,
      w: 522,
      h: 312,
    },
    params: {},
  },
  {
    url: 'https://www.youtube.com/watch?v=REuKymvrrqk' /* Minecraft */,
    state: {
      x: 368,
      y: 205,
      w: 734,
      h: 431,
    },
    params: {},
  },
  {
    url: 'https://www.youtube.com/watch?v=gHIS-Xb2DbY' /* Emojis */,
    state: {
      x: 33,
      y: 514,
      w: 522,
      h: 312,
    },
    params: {},
  },
  {
    url: 'https://www.youtube.com/watch?v=A7IMBnMU5a4' /* HeMan */,
    state: {
      x: 1038,
      y: 401,
      w: 449,
      h: 353,
    },
    params: {},
  },
]

export const windows = persisted('windows', initialWindows)
