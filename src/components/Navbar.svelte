<script lang="ts">
  import { videos, shownVideos } from "$lib/stores";
  import FuzzySearch from "fuzzy-search"
  import type { Video } from "$lib/types";
  let localVideos : Video[] = []
  let fuzzy : FuzzySearch<Video>
  videos.subscribe(e => {
    localVideos = e
    fuzzy = new FuzzySearch(localVideos, ["Name"], {sort: true})    
  })
  let input : string
  let searchDiv : HTMLDivElement
  const searchVideo = () => {
    if(input == "") {
      localVideos.forEach(e => console.log(e.Link))
      shownVideos.set(localVideos)
      return
    }
    shownVideos.set(fuzzy.search(input))
  }
</script>

<nav class="main-navbar">
  <h5>Zamn</h5>
  <div bind:this={searchDiv} class="search">
    <input bind:value={input} on:input={searchVideo} type="text" placeholder="Search"/>
    <button>Go</button>
  </div>
</nav>

<style>
  .search {
    margin-left: 60vw;
    width: 20vw;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .main-navbar {
    padding: 0 5vw;
    height: 5vh;
    margin: 0 auto;
    border-style: solid;
    border-width: 1px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;
    border-radius: 15px;
  }
  h5 {
    width: 20vw;
  }
  input {
    background-color: #101010;
    color: white;
    border-width: 0 0 1px 0;
    border-radius: 15px;
    margin-right: 1vw;
  }
  button {
    background-color: #101010;
    color: white;
    border-width: 1px;
    border-radius: 15px;
  }
</style>
