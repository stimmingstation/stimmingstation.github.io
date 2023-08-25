<script>
  export let title;

  let workspaceNode;
  let workspaceChildNode;
  let coords = {
    active: false,
    currX: 0,
    currY: 0,
    initX: 0,
    initY: 0,
    offsetX: 0,
    offsetY: 0
  };

  const dragStart = e => {
    if (e.type === "touchstart") {
      coords.initX = e.touches[0].clientX - coords.offsetX;
      coords.initY = e.touches[0].clientY - coords.offsetY;
    } else {
      coords.initX = e.clientX - coords.offsetX;
      coords.initY = e.clientY - coords.offsetY;
    }

    if (e.target === workspaceChildNode) {
      coords.active = true;
    }
  };

  const dragEnd = e => {
    coords.initX = coords.currX;
    coords.initY = coords.currY;

    coords.active = false;
  };

  const drag = e => {
    if (coords.active) {
      if (e.type === "touchmove") {
        coords.currX = e.touches[0].clientX - coords.initX;
        coords.currY = e.touches[0].clientY - coords.initY;
      } else {
        coords.currX = e.clientX - coords.initX;
        coords.currY = e.clientY - coords.initY;
      }

      coords.offsetX = coords.currX;
      coords.offsetY = coords.currY;
    }
  };
</script>

<div
  class="workspace-item workspace-item--window"
  style="transform: translate3d({coords.currX}px,{coords.currY}px, 0);"
  bind:this={workspaceNode}>
  <div
    class="workspace-item__header"
    bind:this={workspaceChildNode}
    on:touchstart={dragStart}
    on:touchend={dragEnd}
    on:touchmove={drag}
    on:mousedown={dragStart}
    on:mouseup={dragEnd}
    on:mousemove={drag}>
    <p>{title}</p>
    <div class="workspace-item__button">
      <button class="button-window">?</button>
      <button class="button-window">_</button>
      <button class="button-window">X</button>
    </div>
  </div>
  <div class="workspace-item__content">
    <slot />
  </div>
</div>

<style>
  .workspace {
    position: relative;
  }

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

  .workspace-item__panel {
    margin: 0 3px 3px;
    height: 12px;
  }

  .workspace-item__panel ul {
    display: inline-block;
    vertical-align: top;
    margin: 0;
    padding: 0;
  }

  .workspace-item__panel ul li {
    display: inline-block;
    vertical-align: top;
    padding: 0;
    padding-bottom: 2px;
    position: relative;
    border: 1px solid transparent;
    border-bottom: 0 none;
    font-size: 8px;
    cursor: pointer;
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
