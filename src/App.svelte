<script>
  import TaskBar from './lib/TaskBar.svelte'
  import YouTube from './lib/applications/YouTube.svelte'
  import Custom from './lib/applications/Custom.svelte'
  import { windows, zIndex, initialWindows } from './lib/store.js'
  import AddWindowModal from './lib/startmenu/AddWindowModal.svelte'
  import { extractYouTubeVideoId } from './lib/utils'
  import DosBox from './lib/applications/DosBox.svelte'
  import { onMount } from 'svelte'

  let addWindowModal = false
  let newX = 25
  let newY = 30

  function openWindow(url, title = 'Custom', width = 500, height = 380) {
    $windows = [
      ...$windows,
      {
        title: title,
        url: url,
        state: {
          x: newX,
          y: newY,
          z: $zIndex++,
          w: width,
          h: height,
        },
        params: {},
      },
    ]
    newX += 10
    newY += 10
  }

  /** @param {string} url */
  function deriveUrlType(url) {
    if (extractYouTubeVideoId(url)) return 'YouTube'
    if (url.endsWith('.jsdos')) return 'DosBox'
    return null
  }

  // Compresses string to GZIP. Retruns a Promise with Base64 string
  const compress = string => {
    const blobToBase64 = blob =>
      new Promise((resolve, _) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result.split(',')[1])
        reader.readAsDataURL(blob)
      })
    const byteArray = new TextEncoder().encode(string)
    const cs = new CompressionStream('gzip')
    const writer = cs.writable.getWriter()
    writer.write(byteArray)
    writer.close()
    return new Response(cs.readable).blob().then(blobToBase64)
  }

  // Decompresses base64 encoded GZIP string. Retruns a string with original text.
  const decompress = base64string => {
    const bytes = Uint8Array.from(atob(base64string), c => c.charCodeAt(0))
    const cs = new DecompressionStream('gzip')
    const writer = cs.writable.getWriter()
    writer.write(bytes)
    writer.close()
    return new Response(cs.readable).arrayBuffer().then(function (arrayBuffer) {
      return new TextDecoder().decode(arrayBuffer)
    })
  }

  onMount(() => {
    const hash = window.location.hash
    if (hash) {
      try {
        decompress(hash.slice(1)).then(value => {
          $windows = JSON.parse(value)
        })
      } catch (e) {
        console.error('Failed to parse windows from URL', e)
      }
      window.location.hash = ''
    }
  })
</script>

<main class="desktop-view">
  <!--
    We use the window.state object pointer as a key to make things work
    Reference: https://learn.svelte.dev/tutorial/keyed-each-blocks
  -->
  {#each $windows as w (w.state)}
    {@const urlType = deriveUrlType(w.url)}
    {#if urlType == 'YouTube'}
      <YouTube content={w} />
    {:else if urlType == 'DosBox'}
      <DosBox content={w} />
    {:else}
      <Custom content={w} />
    {/if}
  {/each}

  <!-- HACK: should become part of the $windows store instead -->
  {#if addWindowModal}
    <AddWindowModal
      on:close={() => (addWindowModal = false)}
      on:openUrl={e => openWindow(e.detail.url)}
    />
  {/if}

  <TaskBar
    menu={[
      {
        name: 'New Window',
        click() {
          addWindowModal = true
        },
      },
      {
        name: 'JS Paint',
        click() {
          openWindow('https://jspaint.app/', 'JS Paint')
        },
      },
      {
        name: 'Compiler Explorer',
        click() {
          openWindow('https://godbolt.org', 'Compiler Explorer')
        },
      },
      {
        name: 'DOOM',
        click() {
          openWindow(
            'https://cdn.dos.zone/custom/dos/ultimate-doom.jsdos',
            'DOOM',
            533,
            354,
          )
        },
      },
      {
        name: 'DVD Screensaver',
        click() {
          openWindow(
            'https://dvd-screensaver.surge.sh/',
            'DVD Screensaver',
            533,
            354,
          )
        },
      },
      {
        name: 'Windows XP',
        click() {
          openWindow('https://lrusso.github.io/VirtualXP/VirtualXP.htm', 'Windows XP', 800, 600)
        },
      },
      {
        name: 'Linux Shell',
        click() {
          openWindow('https://shell.segfault.net', 'SegFault')
        },
      },
      {
        name: 'GitHub',
        click() {
          window.open('https://git.stimming.club', '_blank')
        },
      },
      {
        name: 'Reset Desktop',
        click() {
          console.log('Haha, IDA reference')
          $windows = initialWindows()
        },
      },
      {
        name: '❤️ Share Desktop',
        click() {
          const url = new URL(window.location.href)
          compress(JSON.stringify($windows)).then(value => {
            url.hash = value
            navigator.clipboard.writeText(url.href)
          })
        },
      },
    ]}
  />
</main>

<style>
  .desktop-view {
    background-size: cover;
    background-color: #2e6e6d;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
</style>
