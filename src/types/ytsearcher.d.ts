//declare module "ytsearcher"

declare module "ytsearcher" {
  declare class YTSearcher {
    public search: (
      query: string,
      options?: SearchOptions
    ) => Promise<SearchResult>

    constructor(apiKey: string)
    constructor({ key: string, revealkey: boolean })
  }

  export type SearchOptions = {
    part: string
    forContentOwner?: boolean
    forDeveloper?: boolean
    forMine?: boolean
    relatedToVideoId?: string
    channelId?: string
    channelType?: "any" | "show"
    eventType?: "completed" | "live" | "upcoming"
    location?: string
    locationRadius?: string
    maxResults?: number
    onBehalfOfContentOwner?: string
    order?: string
    pageToken?: string
    publishedAfter?: Date | string
    publishedBefore?: Date | string
    q?: string
    regionCode?: string
    relevanceLanguage?: string
    safeSearch?: "moderate" | "none" | "strict"
    topicId?: string
    type?: "channel" | "playlist" | "video"
    videoCaption?: string
    videoCaption?: string
    videoDefinition?: "any" | "high" | "standard"
    videoDimension?: "2d" | "3d" | "any"
    videoDuration?: "any" | "long" | "medium"
    videoEmbeddable?: "any" | "true"
    videoLicense?: "any" | "creativeCommon" | "youtube"
    videoSyndicated?: "any" | "true"
    videoType?: "any" | "episode" | "movie"
  }

  export interface ThumbNailImage {
    url: string
    width: number
    height: number
  }

  export interface ThumbnailImages {
    default: ThumbNailImage
    medium: ThumbNailImage
    high: ThumbNailImage
  }

  export interface Page {
    kind: string
    url: string
    id: string
    publishedAt: Date
    channelId: string
    title: string
    description: string
    thumbnails: ThumbnailImages
    channelTitle: string
    liveBroadcastContent: string
  }

  export interface SearchResult {
    options: Record<string, never> | Options
    totalResults: number
    pages: number
    nextPageToken: string
    currentPage: Page[]
    first: Page
  }

  export const validOptions: string[]
  export const YTSearcher: YTSearcher
}
