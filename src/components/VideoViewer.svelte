<script>
    import { selectedVideo } from "$lib/stores";
    let videoLink = ""
    selectedVideo.subscribe(e => videoLink = e)
</script>
<div class="video-viewer">
    <div class="back-button">
        <button on:click={() => selectedVideo.set("none")}>Back</button>
        <div class="ad-div">
            <iframe title="referral" src="https://go2.eabids.com/refban.go?sizeid=1&pid=146351" frameborder="0" width="468" height="60" scrolling="no"></iframe>
        </div>
    </div>
    <div class="video-player-wrapper">
        <video src={videoLink} controls>
            <track kind="captions"/>
        </video>
    </div>
    <div class="ad-div">
        <p>More Ads Here</p>
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
        background-color: #dddddd;
        color: black;
        height: 100%;
        width: 100%;
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