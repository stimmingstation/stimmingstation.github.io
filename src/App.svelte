<script>
  import Footer from "./Footer.svelte";
  import YouTube from "./lib/YouTube.svelte";
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

<main class="desktop-view">
<!--  1st 274, 51 2nd 37, 81 3rd 1312, 41-->
  <YouTube videoUrl="https://www.youtube.com/watch?v=uyGj3HVtYwE" initX={274} initY={51} --width="1280px"/>
  <YouTube videoUrl="https://www.youtube.com/watch?v=ChBg4aowzX8" initX={37} initY={81} />
  <YouTube videoUrl="https://www.youtube.com/watch?v=Q4MOP8s9KyY" initX={1312} initY={41} />
  <Footer />
</main>

