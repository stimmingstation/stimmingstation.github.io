import { writable } from 'svelte/store'

export const zIndex = writable(1)
export const windows = writable([
  {
    type: 'YouTube',
    videoUrl: 'https://www.youtube.com/watch?v=ChBg4aowzX8',
    PosX: 17,
    PosY: 21,
    Width: 630,
    Height: 354,
  },
  {
    type: 'YouTube',
    videoUrl: 'https://www.youtube.com/watch?v=Q4MOP8s9KyY',
    PosX: 1187,
    PosY: 25,
    Width: 630,
    Height: 354,
  },
  {
    type: 'YouTube',
    videoUrl: 'https://www.youtube.com/watch?v=REuKymvrrqk',
    PosX: 473,
    PosY: 242,
    Width: 862,
    Height: 483,
  },
  {
    type: 'YouTube',
    videoUrl: 'https://www.youtube.com/watch?v=gHIS-Xb2DbY',
    PosX: 13,
    PosY: 500,
    Width: 628,
    Height: 354,
  },
  {
    type: 'YouTube',
    videoUrl: 'https://www.youtube.com/watch?v=A7IMBnMU5a4',
    PosX: 1351,
    PosY: 400,
    Width: 500,
    Height: 380,
  },
])
