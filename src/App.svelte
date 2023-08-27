<script>
  import TaskBar from './lib/TaskBar.svelte'
  import YouTube from './lib/applications/YouTube.svelte'
  import Custom from './lib/applications/Custom.svelte'
  import {windows} from './lib/store.js'
</script>

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

<main class='desktop-view'>

  <button on:click={() => {$windows = [...$windows, ...[{
      type: 'YouTube',
      videoUrl: 'https://www.youtube.com/watch?v=A7IMBnMU5a4',
      PosX: 1351,
      PosY: 400,
      Width: 500,
      Height: 380,
    }]]}}>
    Click Me
  </button>

  {#each $windows as window}
    {#if window.type === "YouTube"}
      <YouTube
        videoUrl={window.videoUrl}
        PosX={window.PosX}
        PosY={window.PosY}
        Width={window.Width}
        Height={window.Height}
      />
    {:else if window.type === "Custom"}
      <Custom
        PosX={window.PosX}
        PosY={window.PosY}
        Width={window.Width}
        Height={window.Height}
      />
    {/if}
  {/each}

  <TaskBar />
</main>
