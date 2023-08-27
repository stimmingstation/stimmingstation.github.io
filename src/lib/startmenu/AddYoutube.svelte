<script>
  import { onMount } from 'svelte'

  import Window from '../Window.svelte'

  /** @type HTMLElement */
  let window

  /** @type {import('../store').WindowState} */
  let state = {
    x: -1,
    y: -1,
    w: 300,
    h: 55,
  }

  // force window to be on top and centered
  onMount(() => {
    window.style.zIndex = '9999'
    window.style.left = `calc(50% - ${state.w / 2}px)`
    window.style.top = `calc(50% - ${state.h / 2}px)`
  })
</script>

<Window
  title="Add Youtube Video"
  {state}
  draggable={false}
  resizable={false}
  topmost={true}
  bind:window
>
  <div style="text-align: center;">
    <!--    <form on:submit|preventDefault={}>-->
    <form>
      <label>
        url: <input name="url" type="url" />
      </label>
      <button type="submit">Load</button>
    </form>
  </div>
</Window>

<style>
  button {
    font-size: 11px;
    outline: 1px solid #000000;
    background: #c0c0c0;
    border-width: 1px;
    border-style: solid;
    border-color: #ffffff #808080 #808080 #ffffff;
    padding: 2px 10px 1px 10px;
    margin: 5px 3px;
    bottom: 0;
  }
</style>
