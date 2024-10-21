<script lang="ts">
    import { selectedVideo } from "$lib/stores"
    import type { Video } from "$lib/types";
    export let thumbLink : string
    export let videoTitle : string
    export let video : Video | undefined
    export let rating : number
    export let views : number
    let selectVideo = () => {
        selectedVideo.set(video)
        fetch("/api/addView", {
            body: JSON.stringify({link: video?.Link}),
            method: "POST"
        })
    }
</script>
<div class="video-card" on:click={selectVideo} >
    <img src={thumbLink} alt="Video Thumb"/>
    <div class="card-metadata">
        {#if views > 0}
        <p>{views}</p>
        {/if}
        {#if views <= 0}
        <p>No Views</p>
        {/if}
        <p>{videoTitle}</p>
        <p>{Math.floor(rating)}%</p>
    </div>
</div>
<style>
    p {
        margin: 0 10%;
    }
    .video-card {
        margin: 0 auto;
        min-width: 100%;
        min-height: 100%;
        max-height: 100%;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
        border-style: solid;
        border-width: 1px;
        background-color: black;
        color: white;
        border-radius: 15px;
        border-width: 0;
    }
    .card-metadata {
        max-height: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    img {
        border-radius: 15px;
        height: 90%;
        width: 100%;
        object-fit: contain;
        background-color: #090909;
    }
    p {
        font-size: small;
    }
</style>