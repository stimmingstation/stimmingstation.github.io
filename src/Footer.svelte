<script>
  import { onMount } from "svelte";
  import TaskMenu from "./lib/TaskBar.svelte";

  let src = "logo_start.png";

  let time = new Date();
  let access = {
    TaskMenu: false,
    Youtube: true,
    Calculator: false
  };

  const watchClock = time => (time < 10 ? `0${time}` : time);
  const toggleAccess = name => {
    access[name] = true;
  };

  $: hours = watchClock(time.getHours());
  $: minutes = watchClock(time.getMinutes());
  $: seconds = watchClock(time.getSeconds());

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

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
    box-shadow: inset 1px 1px #dfdfdf, 1px 0 #000, 0 1px #000, 1px 1px #000;
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

  .menu__button {
    align-items: center;
    display: flex;
    font-size: 14px;
    color: #000;
    padding: 1px 6px;
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    box-shadow: inset 1px 1px #dfdfdf, 1px 0 #000, 0 1px #000, 1px 1px #000;
    background-color: silver;
  }

  .menu__button img {
    width: 15px;
    margin-right: 3px;
  }

  .btn--start:focus {
    outline-color: #000;
    outline-style: dotted;
    outline-width: 1px;
    outline-offset: -3px;
  }

  .menu__button:active {
    border-top: 1px solid #000;
    border-left: 1px solid #000;
    border-right: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    box-shadow: inset 1px 1px grey, 1px 0 #fff, 0 1px #fff, 1px 1px #fff;
  }

  .deep-box {
    border-top: 1px solid gray;
    border-left: 1px solid gray;
    box-shadow: 1px 0 #fff, 0 1px #fff, 1px 1px #fff;
    background-color: #b8b8b8;
    padding: 1px 2px;
    font-size: 14px;
  }

  .deep-box {
    font-size: 10px;
  }
</style>

{#if access.TaskMenu}
  <TaskMenu {toggleAccess} />
{/if}

<header id="navigationbar">
  <nav>
    <div class="menu">
      <div class="menu__left">
        <button
          id="start-panel"
          class="btn--start menu__button"
          on:click={() => (access.TaskMenu = !access.TaskMenu)}>
          <img {src} alt="logo_start" />
          Start
        </button>
      </div>
      <div>
        <div id="datetime" class="deep-box">{hours}:{minutes}:{seconds}</div>
      </div>
    </div>
  </nav>
</header>
