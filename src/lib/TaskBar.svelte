<script>
  import { onMount } from 'svelte'

  export let menu

  let startOpen = false

  let time = new Date()
  const watchClock = time => (time < 10 ? `0${time}` : time)
  $: hours = watchClock(time.getHours())
  $: minutes = watchClock(time.getMinutes())
  $: seconds = watchClock(time.getSeconds())

  /** @type HTMLElement */
  let menuElement = undefined
  let startButton = undefined

  onMount(() => {
    document.addEventListener(
      'click',
      function (event) {
        if (!event.target) return
        if (event.target == startButton) {
          startOpen = !startOpen
        } else if (startOpen && !menuElement.contains(event.target)) {
          startOpen = false
        }
      },
      false,
    )
    const interval = setInterval(() => {
      time = new Date()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })
</script>

<div
  class="menu-panel {startOpen ? 'menu-panel--show' : ''}"
  bind:this={menuElement}
>
  {#if startOpen}
    <ul>
      {#each menu as item (item)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li
          on:click={async () => {
            startOpen = false
            if (item.click) {
              item.click()
            }
          }}
        >
          {item.name}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<header id="taskbar">
  <nav>
    <div class="menu">
      <div class="menu--left">
        <button
          id="start-panel"
          class="btn--start menu--button"
          bind:this={startButton}
        >
          <img src="/logo_start.png" alt="logo_start" />
          Start
        </button>
      </div>
      <div>
        <div id="datetime" class="deep-box">{hours}:{minutes}:{seconds}</div>
      </div>
    </div>
  </nav>
</header>

<style>
  header {
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 90;
  }
  nav {
    background-color: silver;
    padding: 3px;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    box-shadow:
      inset 1px 1px #dfdfdf,
      1px 0 #000,
      0 1px #000,
      1px 1px #000;
  }

  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* .menu ul li {
    display: inline-block;
    list-style-type: none;
  } */

  button {
    outline: none;
    cursor: pointer;
  }

  .btn--start {
    font-weight: 700;
  }

  .menu--button {
    align-items: center;
    display: flex;
    font-size: 14px;
    color: #000;
    padding: 1px 6px;
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
  }

  .menu--button img {
    width: 15px;
    margin-right: 3px;
  }

  .btn--start:focus {
    outline-color: #000;
    outline-style: dotted;
    outline-width: 1px;
    outline-offset: -3px;
  }

  .menu--button:active {
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

  .deep-box {
    border-top: 1px solid gray;
    border-left: 1px solid gray;
    box-shadow:
      1px 0 #fff,
      0 1px #fff,
      1px 1px #fff;
    background-color: #b8b8b8;
    padding: 1px 2px;
    font-size: 14px;
  }

  .deep-box {
    font-size: 10px;
  }

  .menu-panel {
    border-top: 1px solid silver;
    border-left: 1px solid silver;
    background-color: silver;
    width: 200px;
    display: none;
    z-index: 99999999;
  }

  .menu-panel--show {
    border-top: 1px solid silver;
    border-left: 1px solid silver;
    background-color: silver;
    width: 200px;
    display: block !important;
    position: absolute;
    bottom: 28px;
  }

  .menu-panel ul {
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
  }

  .menu-panel ul li {
    /* margin-left: 0.5em; */
    font-size: 8px;
    color: #000;
    padding: 3px;
    padding-left: 0.5em;
    cursor: pointer;
    display: flex;
  }

  .menu-panel ul li:hover {
    background-color: #0090e4;
    color: #fff;
    text-shadow: 0 0 transparent !important;
  }
</style>
