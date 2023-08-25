<script>
    export let title;

    export let posX = 0;
    export let posY = 0;

    let prevPosX = 0;
    let prevPosY = 0;

    let active = false;

    let windowNode;
    let windowChildNode;

    const dragStart = e => {
        e.preventDefault();
        active = true;
    };

    const dragEnd = e => {
        e.preventDefault();
        active = false;
    };

    const drag = e => {
        e.preventDefault();

        if (active) {
            posX += e.movementX;
            posY += e.movementY;

            console.log(`posX: ${posX}, posY: ${posY}`)
        }
    };
</script>

<div class="workspace-item workspace-item--window"
     style="transform: translate3d({posX}px,{posY}px, 0);">
  <div class="workspace-item__header"
       on:mousedown={dragStart}
       on:touchstart={dragStart}>
    <p>{title}</p>
    <div class="workspace-item__button">
      <button class="button-window">?</button>
      <button class="button-window">_</button>
      <button class="button-window">X</button>
    </div>
  </div>
  <div class="workspace-item__content">
    <slot/>
  </div>
</div>

<svelte:window
    on:touchend={dragEnd}
    on:touchmove={drag}
    on:mouseup={dragEnd}
    on:mousemove={drag}
/>

<style>
    .workspace-item {
        user-select: none;
    }

    .workspace-item__header {
        color: #fff;
        margin-bottom: 2px;
        display: flex;
        justify-content: space-between;
        cursor: move;
        background-color: #1b4eaa;
        font-size: 8px;
        padding: 2px 2px 1px;
        user-select: none;
    }

    .workspace-item--window {
        position: absolute;
        left: 0;
        top: 0;
        padding: 2px;
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
        background-color: silver;
        border: 1px solid #555;
        background: #ccc;
        border-top: 1px solid silver;
        border-left: 1px solid silver;
        box-shadow: 1px 0 #000, 0 1px #000, 1px 1px #000, inset 1px 1px #fff,
        0 0 150px 1px rgba(0, 0, 0, 0.5);
    }

    .workspace-item__content {
        -webkit-user-drag: none;
        position: relative;
    }

    .button-window {
        color: #000;
        border-top: 1px solid #fff;
        border-left: 1px solid #fff;
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
        box-shadow: inset 1px 1px #dfdfdf, 1px 0 #000, 0 1px #000, 1px 1px #000;
        background-color: silver;
        font-size: 12px;
        width: 14px;
        height: 14px;
        line-height: 14px !important;
    }
</style>
