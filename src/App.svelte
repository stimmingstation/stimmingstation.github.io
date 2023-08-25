<script>
  import Footer from "./Footer.svelte";
  import Youtube from "./lib/Youtube.svelte";
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
  <Youtube videoUrl="https://www.youtube.com/watch?v=REuKymvrrqk" --width="1280px"/>
  <Youtube videoUrl="https://www.youtube.com/watch?v=ChBg4aowzX8" />
  <Youtube videoUrl="https://www.youtube.com/watch?v=Q4MOP8s9KyY" />
  <Footer />
</main>

