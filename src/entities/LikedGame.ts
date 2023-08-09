import { Genre } from "./Genre";
import { Platform } from "./Platform";

export default interface LikedGame {
    name: String,
    id: String,
    slug: String,
    liked?: Boolean,
    // genre: Genre[],
    // platform: Platform,
}