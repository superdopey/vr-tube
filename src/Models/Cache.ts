import { YtSearchResult } from "./Youtube"

export type SearchCache = {
  Term: string
  PageToken?: string
  SearchResult: YtSearchResult
  Created: Date
  Type: string
}
