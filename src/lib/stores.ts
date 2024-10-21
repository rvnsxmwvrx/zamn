import { type Writable, writable } from "svelte/store";
import type { Video } from "./types";

export let page : Writable<number> = writable(0)
export let selectedVideo : Writable<Video | undefined> = writable(undefined)
export let videos : Writable<Video[]> = writable([])
export let shownVideos : Writable<Video[]> = writable([])