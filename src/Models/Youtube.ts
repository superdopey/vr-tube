export type YtSearchResult = {
  kind: string
  etag: string
  nextPageToken: string
  regionCode: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: YtItem[]
}

export type YtItem = {
  kind: string
  etag: string
  id: {
    kind: string
    videoId?: string
    playlistId?: string
  }
  snippet: {
    publishedAt: Date
    channelId: string
    title: string
    description: string
    thumbnails: {
      default: YtThumbnail
      medium: YtThumbnail
      high: YtThumbnail
    }
    channelTitle: string
    liveBroadcastContent: string
    publishTime: Date
  }
}

export type YtThumbnail = {
  url: string
  width: number
  height: number
}

export type YtSearchOptions = {
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
  videoDefinition?: "any" | "high" | "standard"
  videoDimension?: "2d" | "3d" | "any"
  videoDuration?: "any" | "long" | "medium"
  videoEmbeddable?: "any" | "true"
  videoLicense?: "any" | "creativeCommon" | "youtube"
  videoSyndicated?: "any" | "true"
  videoType?: "any" | "episode" | "movie"
}
