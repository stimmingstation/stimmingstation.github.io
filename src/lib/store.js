import { persisted } from 'svelte-persisted-store'

/**
 * State for the Window.svelte component
 * @typedef {{
 *   x: number,
 *   y: number,
 *   z: number,
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

/** @returns {WindowContent[]} */
export function initialWindows() {
  return [
    {
      url: 'https://www.youtube.com/watch?v=ChBg4aowzX8' /* Subway Surfers */,
      state: {
        x: 17,
        y: 21,
        z: 0,
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
        z: 1,
        w: 522,
        h: 312,
      },
      params: {},
    },
    {
      url: 'https://www.youtube.com/watch?v=gHIS-Xb2DbY' /* Emojis */,
      state: {
        x: 33,
        y: 514,
        z: 2,
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
        z: 3,
        w: 734,
        h: 431,
      },
      params: {},
    },
    {
      url: 'https://www.youtube.com/watch?v=A7IMBnMU5a4' /* HeMan */,
      state: {
        x: 1038,
        y: 401,
        z: 4,
        w: 449,
        h: 353,
      },
      params: {},
    },
  ]
}

export const zIndex = persisted('zIndex', 50)
export const windows = persisted('windows', initialWindows())
