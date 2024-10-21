<script lang="ts">
  import Sections from "./Sections.svelte";
  import Content from "./Content.svelte";
</script>

<div class="wrapper">
  <Sections />
  <Content />
</div>

<style>
  .wrapper {
    display: flex;
    margin: 2vh auto;
    width: 98vw;
    height: 88vh;
  }
</style>
