<script lang="ts">
  import { page, videos, shownVideos } from "$lib/stores";
  import type { Video } from "$lib/types";
  let localPage: number = 0;
  let total = 0;
  let localVideos: Video[] = [];
  
  page.subscribe((page) => (localPage = page));
  let updatePage = () => {
    page.set(localPage);
  };
  let viewing = "Most Recent";

  const sortRecent = () => {
    viewing = "Most Recent";
    let sorted = [];
    for (let i = 0; i < localVideos.length; i++) {
      let pivotTotal =
        localVideos[i].Date.seconds + localVideos[i].Date.nanoseconds / 1e6;
      for (let j = i + 1; j < localVideos.length; j++) {
        let secondTotal =
          localVideos[j].Date.seconds + localVideos[j].Date.nanoseconds / 1e6;
        if (pivotTotal < secondTotal) {
          let aux = localVideos[i];
          localVideos[i] = localVideos[j];
          localVideos[j] = aux;
        }
      }
      sorted.push(localVideos[i]);
    }
    sorted.forEach((e) => console.log(e));
    shownVideos.set(sorted);
  };
  const sortViews = () => {
    viewing = "Most Views";
    let sorted = [];
    let count = 0;
    for (let i = 0; i < localVideos.length; i++) {
      for (let j = i + 1; j < localVideos.length; j++) {
        if (localVideos[i].Views < localVideos[j].Views) {
          let aux = localVideos[i];
          localVideos[i] = localVideos[j];
          localVideos[j] = aux;
        }
      }
      count += 1;
      sorted.push(localVideos[i]);
    }
    console.log(count);
    shownVideos.set(sorted);
  };
  const sortRating = () => {
    viewing = "Top Ratings";
    let sorted = [];
    let count = 0;
    for (let i = 0; i < localVideos.length; i++) {
      let pivotTotal = localVideos[i].Likes - localVideos[i].Dislikes;
      for (let j = i + 1; j < localVideos.length; j++) {
        let secondTotal = localVideos[j].Likes - localVideos[j].Dislikes;
        if (pivotTotal < secondTotal) {
          let aux = localVideos[i];
          localVideos[i] = localVideos[j];
          localVideos[j] = aux;
        }
      }
      count += 1;
      sorted.push(localVideos[i]);
    }
    console.log(count);
    shownVideos.set(sorted);
  };
  let flag = false
  shownVideos.subscribe((e) => {
    localVideos = e;
    total = e.length;
    if(!flag) {
      sortViews();
      flag = true
    }
  });
</script>

<div class="section-wrapper">
  <div class="sorting-div">
    <h3>Sorting</h3>
    <button on:click={sortViews}>Most Views</button>
    <button on:click={sortRecent}>Most Recent</button>
    <button on:click={sortRating}>Top Ratings</button>
    <p>Viewing by: {viewing}</p>
  </div>
  <div class="ad-div">
    <p>Some Ads Here</p>
  </div>
  <div class="dmca-alert">
    <p>DMCA</p>
    <p>
      Zamn is not responsible for the contents found here. We only index the
      links found on Google, Forum and Websites search engines.
    </p>
  </div>
  <div class="section-footer">
    <p>Page Number</p>
    <div class="page-control">
      <input bind:value={localPage} on:input={updatePage} type="number" />
    </div>
    <p>Total: {total}</p>
  </div>
</div>

<style>
  .section-wrapper {
    display: flex;
    flex-direction: column;
    grid-template-rows: repeat(1, 1fr);
    height: 100%;
    width: 20%;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    color: white;
    background-color: #101010;
  }
  .section-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .page-control {
    height: 50%;
    display: flex;
  }
  .ad-div {
    color: black;
    height: 30%;
    color: white;
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
    font-size: large;
  }
</style>
