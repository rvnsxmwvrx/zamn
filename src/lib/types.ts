export type Video = {
    Name: string,
    Link: string,
    Views: number,
    Likes: number,
    Dislikes: number,
    Date: ShopeeDate
}

export type ShopeeDate = {
    seconds: number,
    nanoseconds: number
}