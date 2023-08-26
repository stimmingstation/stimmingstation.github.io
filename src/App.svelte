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
  <!-- Subway Surfer -->
  <YouTube videoUrl="https://www.youtube.com/watch?v=ChBg4aowzX8" PosX={17} PosY={21} Width={634} Height={354}/>
  <!-- Soap Cutting -->
  <YouTube videoUrl="https://www.youtube.com/watch?v=Q4MOP8s9KyY" PosX={1187} PosY={25} Width={634} Height={354}/>
  <!-- Minecraft Parkour -->
  <YouTube videoUrl="https://www.youtube.com/watch?v=REuKymvrrqk" PosX={473} PosY={242} Width={862} Height={483}/>
  <!-- Zoomer Memes -->
  <YouTube videoUrl="https://www.youtube.com/watch?v=x9ne04xJawI" PosX={1351} PosY={422} Width={500} Height={500}/>
  <!-- EMOMOMO -->
  <YouTube videoUrl="https://www.youtube.com/watch?v=gHIS-Xb2DbY" PosX={13} PosY={560} Width={631} Height={354}/>

  <Footer/>
</main>
