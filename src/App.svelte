<script lang="ts">
  let circle: (number|string)[][] = [];

  let color = "0"

  function addNewChild(e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement; }, color: string) {
    const newChild:(number|string)[] = [
      e.offsetX,
      e.offsetY,
      color,
    ]
    circle = [...circle, newChild];
  }

  // Sample options
  // let options = [
  //   {name: 'Red', value: "red"},
  //   {name: 'Blue', value: "blue"},
  // ];

  // function handleSelectChange(event: any) {
  //   color = event.target.value;
  // }

  function downloadFile() {
    let textContent = circle.join('\n');
    textContent = "x,y,label\n" + textContent
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
</script>

<style>
  .circle {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    position: absolute;
  }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->

<main class="w-screen h-screen ">
  <div class="inset-0 bg-[url(/img/grid.svg)] bg-center cursor-pointer w-full h-full border" on:click={(e) => addNewChild(e, color)}>
    {#each circle as child}
      <div class="circle bg-data-{child[2]}" style="left: {child[0]}px; top: {child[1]}px; background: bg-data-{child[2]}"></div>
    {/each}
  </div>

  <div class="fixed bottom-0 left-1/2 -translate-x-1/2 py-4 w-screen flex justify-center bg-slate-50 border border-t-slate-700/10">
    <div class="flex gap-4 items-center">
      {#each ['0','1','2','3'] as index}
        {#if index == color}
          <button class="p-4 bg-data-{index} border-4 border-slate-50 shadow-lg w-min rounded-full" on:click={() => (color=index)}></button>
        {:else}
          <button class="p-4 bg-data-{index} w-min h-min rounded-full" on:click={() => (color=index)}></button>
        {/if}
      {/each}
        <!-- <button class="p-4 bg-data-0 w-min rounded-full" on:click={() => (color="0")}></button>
        <button class="p-4 bg-data-1 w-min rounded-full" on:click={() => (color="1")}></button>
        <button class="p-4 bg-data-2 w-min rounded-full" on:click={() => (color="2")}></button>
        <button class="p-4 bg-data-3 w-min rounded-full" on:click={() => (color="3")}></button> -->
      <button class="tt  rounded-full text-red-600 flex flex-col items-center" on:click={() => (circle=[])}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span class="tt-text tt-pos-top w-fit bg-slate-50 border border-slate-100 text-slate-800">clear</span>
      </button>
      <button on:click={downloadFile} class="tt text-green-700 flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        <span class="tt-text tt-pos-top w-fit bg-white text-slate-800">download</span>
      </button>
    </div>
  </div>
</main>