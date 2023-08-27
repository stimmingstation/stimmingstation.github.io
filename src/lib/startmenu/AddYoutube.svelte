<script>
  import { onMount } from 'svelte'

  // default 16:9
  let Width = 300
  let Height = 55

  import Window from '../Window.svelte'

  // force window to be on top and centered
  onMount(() => {
    const window = document.querySelector('#AddYoutubeWindow')
    window.style.zIndex = 9999
    window.style.left = 'calc(50% - ' + (Width / 2) + 'px)'
    window.style.top = 'calc(50% - ' + (Height / 2) + 'px)'
  })

</script>

<Window ID='AddYoutubeWindow'
        title='Add Youtube Video'
        Width={Width} Height={Height}
        Draggable={false}
        Resizable={false}
        TopMost={true}>
  <div style='text-align: center;'>
    <form>
      <label>
        url: <input name='url' type='url'>
      </label>
      <button type='submit'>Load</button>
    </form>
  </div>
</Window>

<style>
    button {
        font-size: 11px;
        outline: 1px solid #000000;
        background: #C0C0C0;
        border-width: 1px;
        border-style: solid;
        border-color: #FFFFFF #808080 #808080 #FFFFFF;
        padding: 2px 10px 1px 10px;
        margin: 5px 3px;
        bottom: 0;
    }
</style>