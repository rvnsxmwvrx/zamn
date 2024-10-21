<script lang="ts">
    import { page } from "$lib/stores";
    import { videos } from "$lib/stores";
    let localPage : number = 0
    let total = 0
    videos.subscribe(e => total = e.length)
    page.subscribe(page => localPage = page)
    let updatePage = () => {
        page.set(localPage)
    }
    let viewing = "Most Recent"
</script>
<div class="section-wrapper">
    <h3>Sorting</h3>
    <div class="sorting-div">
        <button on:click={() => viewing = "Most Views"}>Most Views</button>
        <button on:click={() => viewing = "Most Recent"}>Most Recent</button>
        <button on:click={() => viewing = "Top Ratings"}>Top Ratings</button>
    </div>
    <p>Viewing by: {viewing}</p>
    <div class="dmca-alert">
        <p>DMCA</p>
        <p>Zamn.com is not responsible for the contents found here. We only index the links found on Google, Forum and Websites search engines.</p>
    </div>
    <div class="section-footer">
        <p>Page Number</p>
        <div class="page-control">
            <input bind:value={localPage} on:input={updatePage} type="number"/>
        </div>
        <p>Total: {total}</p>
    </div>
</div>
<style>
    .section-wrapper {
        height: 90vh;
        width: 20vw;
        text-align: center;
        border-style: solid;
        border-width: 1px;
        color: white;
        background-color: #101010;
    }
    .section-footer {
        position: absolute;
        bottom: 5vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 10vh;
        width: 20vw;
    }
    .page-control {
        height: 50%;
        display: flex;
    }
    .sorting-div {
        display: flex;
        flex-direction: column;
    }
    button {
        color: #aaaaaa;
        background-color: #101010;
        border-width: 0;
    }
    button:hover {
        color: white;
        font-size:large;
    }
    .dmca-alert {
        bottom: 30%;
        position: absolute;
        width:20vw;
    }
</style>