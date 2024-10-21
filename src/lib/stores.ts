import { type Writable, writable } from "svelte/store";
import type { Video } from "./types";

export let page : Writable<number> = writable(0)
export let selectedVideo : Writable<string> = writable("none")
export let videos : Writable<Video[]> = writable([])