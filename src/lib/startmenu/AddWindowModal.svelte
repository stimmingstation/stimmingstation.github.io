<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import Window from '../Window.svelte'

  const dispatch = createEventDispatcher()

  /** @type HTMLElement */
  let root

  /** @type {import('../store').WindowState} */
  let state = {
    x: -1,
    y: -1,
    w: 300,
    h: 55,
  }

  /** @type HTMLElement */
  let input = undefined

  // force window to be on top and centered
  onMount(() => {
    root.style.zIndex = '99999999'
    root.style.left = `calc(50% - ${state.w / 2}px)`
    root.style.top = `calc(50% - ${state.h / 2}px)`
    input.focus()
  })

  function handleSubmit(e) {
    const formData = new FormData(e.target)

    const data = {}
    for (let field of formData) {
      const [key, value] = field
      data[key] = value
    }
    console.log(data)

    const url = data['url']

    const { target } = e
    dispatch('openUrl', { target, url })
    dispatch('close')
  }
</script>

<Window
  title="Add Window"
  {state}
  draggable={false}
  resizable={false}
  topmost={true}
  bind:root
  on:close={() => dispatch('close')}
>
  <div style="text-align: center;">
    <form on:submit|preventDefault={handleSubmit}>
      <label>
        URL: <input
          name="url"
          type="url"
          autocomplete="off"
          bind:this={input}
        />
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
