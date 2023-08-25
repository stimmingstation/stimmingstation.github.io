<script>
  import Video from "./lib/Video.svelte";
</script>

<div class="grid1">
  <div style="padding-top:70px">
    <Video videoId="ChBg4aowzX8" name="Subway Surfer" />
  </div>
  <Video videoId="REuKymvrrqk" --width="1280px" name="Minecraft parkour" />
  <div style="padding-top:200px">
    <Video videoId="Q4MOP8s9KyY" name="Soap cutting" />
  </div>
</div>

<style>
  .grid1 {
    display: flex;
    gap: 0.3em;
  }
</style>
