<script lang="ts">
  import VideoViewer from "./VideoViewer.svelte";
  import Card from "./Card.svelte";
  import { type Video } from "$lib/types";
  import { videos, shownVideos, page, selectedVideo as selectedStore } from "$lib/stores";
  import { onMount } from "svelte";
  let localPage = 0;
  page.subscribe((e) => (localPage = e));
  let localVideos : Video[] = [];
  shownVideos.subscribe(e => localVideos = e)
  async function fetchVideos() {
    try {
      const response = await fetch('/api/getVideos');
      if (response.ok) {
        const data = await response.json();
        console.log(data.videos)
        localVideos = data.videos

      } else {
        console.error('Failed to fetch videos:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
    videos.set(localVideos)
    shownVideos.set(localVideos)
  }
  onMount(() => fetchVideos())
  let videosPerPage = 8;
  $: localShownVideos = localVideos.slice(
    localPage * videosPerPage,
    localPage * videosPerPage + videosPerPage
  );
  let selectedVideo : Video | undefined = undefined;
  selectedStore.subscribe((e) => (selectedVideo = e));
  function getThumbName(video: string) : string {
    let sections = video.split("/")
    let start = "i-" + sections[2]
    let end = sections[3].length-1
    for(let i = sections[3].length-1; i >= 0; i--) {
      if(sections[3][i] == ".") {
        end = i
        break
      }
    }
    let link = sections[0] + "//" + start + "/thumbs/" + sections[3].substring(0, end) + ".png"
    return link
  }

  function getVideoTitle(name: string) : string {
    return name.split("/").pop()!.split(".")[0]
  }
  function clamp(value: number, max: number) : number {
    if(value > max) return max;
    return value;
  }
</script>

{#if !selectedVideo}
  <div class="content-wrapper">
    {#each localShownVideos as video}
      <Card
        thumbLink={getThumbName(video.Link)}
        videoTitle={getVideoTitle(video.Name)}
        video={video}
        rating={video.Likes + video.Dislikes == 0 ? 0 : (video.Likes / (video.Likes + video.Dislikes)) * 100}
        views={video.Views}
      />
    {/each}
    <p>Viewing {localPage * videosPerPage} - {clamp(localPage * videosPerPage + videosPerPage, localVideos.length)}/{localVideos.length} videos</p>
  </div>
{/if}

{#if selectedVideo}
  <div class="video-wrapper">
    <VideoViewer />
  </div>
{/if}

<style>
  .content-wrapper {
    text-align: center;
    width: 77vw;
    padding-left: 1vw;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    grid-auto-rows: 200px;
    background-color: #141414;
    overflow: hidden;
  }
  .video-wrapper {
    text-align: center;
    width: 77vw;
    padding-left: 1vw;
    overflow-y: scroll;
  }
  p {
    color: white;
  }
</style>
