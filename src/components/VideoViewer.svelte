<script lang="ts">
  import { selectedVideo } from "$lib/stores";
  import type { Video } from "$lib/types";
  let video: Video | undefined = undefined;
  selectedVideo.subscribe((e) => (video = e));
  let isoDate = "";
  $: if (video) {
    let totalMilliseconds =
      video.Date.seconds * 1000 + video.Date.nanoseconds / 1e6;
    let date = new Date(totalMilliseconds);

    isoDate = date.getDate().toString() + "/" + (date.getMonth() + 1).toString() + "/" + date.getFullYear().toString();
  }
  const likeVideo = () => {
    fetch("/api/likeVideo", {
      method: "POST",
      body: JSON.stringify({link: video?.Link})
    })
  }
  const dislikeVideo = () => {
    fetch("/api/dislikeVideo", {
      method: "POST",
      body: JSON.stringify({link: video?.Link}),
    })
  }
</script>

<div class="video-viewer">
  <div class="back-button">
    <button on:click={() => selectedVideo.set(undefined)}>Back</button>
    <div class="ad-div">
    </div>
  </div>
  <div class="video-player-wrapper">
    <video src={video?.Link} controls>
      <track kind="captions" />
    </video>
  </div>
  <div class="video-metadata">
    <p>Views: {video?.Views}</p>
    <p>Likes: {video?.Likes}</p>
    <p>Dislikes: {video?.Dislikes}</p>
    <p>Uploaded At: {isoDate}</p>
    <button class="rating-button" on:click={likeVideo}>Like</button>
    <button class="rating-button" on:click={dislikeVideo}>Dislike</button>
  </div>
  <div class="ad-div">
  </div>
</div>

<style>
  .video-viewer {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background-color: #101010;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .video-player-wrapper {
    width: 80%;
    height: 50%;
    margin: 0 auto;
    background-color: black;
  }
  .back-button {
    display: flex;
    height: 30%;
    width: 80%;
    margin-top: 1%;
  }
  .ad-div {
    background-color: #101010;
    color: black;
    height: 100%;
    width: 100%;
  }
  .video-metadata {
    display: grid;
    color: white;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    align-items: center;
  }
  .rating-button {
    width: 100%;
    height: 80%;
  }
  button {
    background-color: #101010;
    color: white;
    border-width: 1px;
    border-radius: 15px;
    width: 10%;
  }
  video {
    margin: 0 auto;
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
</style>
