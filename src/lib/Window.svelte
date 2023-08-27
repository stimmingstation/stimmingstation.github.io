<script>
  import { draggable as agnosticDraggable } from 'svelte-agnostic-draggable'
  import { onMount, createEventDispatcher } from 'svelte'
  import { zIndex, windows } from './store.js'

  const dispatch = createEventDispatcher()

  /** @type {import('./store.js').WindowState} */
  export let state
  export let title // TODO: move to state?
  export let draggable = true
  export let resizable = true
  export let topmost = false
  export let special = ''

  let isResizing = false
  let initialWidth = state.w
  let initialHeight = state.h

  /** @type HTMLElement */
  export let window = undefined

  function moveUp() {
    window.style.zIndex = '' + $zIndex++
  }

  onMount(() => {
    if (!topmost) {
      // set the initial position of the window
      window.style.left = state.x + 'px'
      window.style.top = state.y + 'px'

      // add listener to bring window to front
      window.addEventListener('mousedown', () => {
        moveUp()
      })

      // add listener to bring window to front
      window.addEventListener('touchstart', () => {
        moveUp()
      })

      moveUp()
    }
  })

  // map all touch events to mouse events
  import mapTouchToMouseFor from 'svelte-touch-to-mouse'

  mapTouchToMouseFor('.draggable')

  // Svelte Event Handling
  function onDragMove(event) {
    if (resizable) {
      if (isResizing) {
        state.w = initialWidth + event.detail.position.left - state.x
        state.h = initialHeight + event.detail.position.top - state.y
      } else {
        state.x = event.detail.position.left
        initialWidth = state.w
        state.y = event.detail.position.top
        initialHeight = state.h
        isResizing = true
      }
    }
  }

  function onDragStop() {
    isResizing = false
  }

  function onSpecialClicked() {
    dispatch('special')
  }

  function onMinimizeClicked() {
    alert('TODO')
  }

  function onCloseClicked() {
    $windows = $windows.filter(w => w.state != state)
    dispatch('close')
  }

  function conditionalDraggable(draggableElement, options) {
    if (draggable) {
      return agnosticDraggable(draggableElement, options)
    } else {
      return { destroy() {} }
    }
  }
</script>

<div
  class="window"
  use:conditionalDraggable={{
    handle: '.window--header',
    cursor: 'grabbing',
  }}
  style="width:{state.w}px; height:{state.h}px;"
  bind:this={window}
>
  <div class="{draggable ? 'draggable ' : ''}window--header">
    <p class="window--title">{title}</p>
    <div class="window--button-group">
      {#if special}
        <button class="window--button" on:click={onSpecialClicked}
          >{special}</button
        >
      {/if}
      <!-- <button class="window--button" on:click={onMinimizeClicked}>_</button> -->
      <button class="window--button" on:click={onCloseClicked}>❌</button>
    </div>
  </div>
  <div class="window--content">
    <slot />
  </div>

  {#if resizable}
    <div
      class="draggable window--resize"
      use:agnosticDraggable={{ helper: 'clone', revert: true }}
      on:drag:move={onDragMove}
      on:drag:stop={onDragStop}
    ></div>
  {/if}
</div>

<style>
  .draggable {
    -webkit-touch-callout: none;
    -ms-touch-action: none;
    touch-action: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: move;
  }

  .window {
    position: absolute;
    left: 0;
    top: 0;
    padding: 2px;
    background: #ccc;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    border-top: 1px solid silver;
    border-left: 1px solid silver;
    box-shadow:
      1px 0 #000,
      0 1px #000,
      1px 1px #000,
      inset 1px 1px #fff,
      0 0 150px 1px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }

  .window--header {
    color: #fff;
    margin-bottom: 2px;
    display: flex;
    justify-content: space-between;
    background-color: #1b4eaa;
    font-size: 8px;
    padding: 2px 2px 1px;
    user-select: none;
  }

  .window--title {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
  }

  .window--resize {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 32px;
    height: 32px;
    background-color: transparent;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAiklEQVRYR+WUwQ3AIAwDm3UzUNZtxQ8hhBpIbGhZIKezsVzkJ4z7ZnaXu6oq/wSorVMMwAHqzNvOQQzQAUY/DWIADjBSXmDSd4AO4FnXb3TAozxlB+gAnsxTDMABVpSH7AAdYEX5mR2IVD5lgA4QmfmUAThApvJXO0AHyFS+ZweQyrsG6ADIzNtbD4OSoCHdTWtaAAAAAElFTkSuQmCC');
    cursor: nwse-resize;
  }

  .window--content {
    -webkit-user-drag: none;
    position: relative;
    padding: 3px;
    width: 100%;
    height: 100%;
  }

  .window--button-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  button {
    outline: none;
    cursor: pointer;
  }

  .window--button {
    color: #000;
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    box-shadow:
      inset 1px 1px #dfdfdf,
      1px 0 #000,
      0 1px #000,
      1px 1px #000;
    background-color: silver;
    font-size: 9px;
    width: 14px;
    height: 14px;
    line-height: 14px !important;
  }

  .window--button:active {
    border-top: 1px solid #000;
    border-left: 1px solid #000;
    border-right: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    box-shadow:
      inset 1px 1px grey,
      1px 0 #fff,
      0 1px #fff,
      1px 1px #fff;
  }
</style>
