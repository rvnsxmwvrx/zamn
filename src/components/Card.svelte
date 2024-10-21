<script lang="ts">
    import { selectedVideo } from "$lib/stores"
    export let thumbLink : string
    export let videoTitle : string
    export let videoLink : string
    let selectVideo = () => {
        selectedVideo.set(videoLink)
    }
</script>
<div class="video-card" on:click={selectVideo} >
    <img src={thumbLink} alt="Video Thumb"/>
    <p>{videoTitle}</p>
</div>
<style>
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
    img {
        height: 100%;
        width: 100%;
        object-fit: fill;
    }
    p {
        font-size: small;
    }
</style>