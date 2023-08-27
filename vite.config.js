import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      // Reference: https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#onwarn
      onwarn(warning, defaultHandler) {
        const disabledWarnings = [
          'a11y-no-noninteractive-element-interactions',
          'a11y-no-static-element-interactions',
          'a11y-click-events-have-key-events',
        ]
        if (disabledWarnings.indexOf(warning.code) != -1) return
        defaultHandler(warning)
        console.log(`[Svelte] ${warning.code}: ${warning.message}`)
      },
    }),
  ],
})
