import axios, { AxiosError, AxiosResponse } from "axios"
import Config from "../Config/Config"
import { YtSearchResult, YtSearchOptions } from "../Models/Youtube"
import { cacheStore } from "../Cache/CacheStore"

const baseYtUrl = `https://youtube.googleapis.com/youtube/v3/search?key=${Config.YoutubeApiKey}`

const json2Qs = (obj: any) => {
  const queryString = Object.entries(obj)
    .map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
    })
    .join("&")

  return queryString
}

export class YouTubeService {
  public static SearchCached(
    term: string,
    type: "video" | "playlist",
    nextPageToken?: string
  ) {
    return new Promise<YtSearchResult>((resolve, reject) => {
      //check cachStore First
      const cachedSearch = cacheStore.Get(term, type, nextPageToken)
      if (cachedSearch !== undefined) {
        console.log("return cached result")
        resolve(cachedSearch.SearchResult)
        return
      }

      //no chache check api
      YouTubeService.Search(term, type, nextPageToken)
        .then((result) => {
          //add to cache
          cacheStore.AddSearch(term, type, result, nextPageToken)
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public static Search(
    term: string,
    type: "video" | "playlist",
    nextPageToken?: string
  ) {
    return new Promise<YtSearchResult>((resolve, reject) => {
      const options: YtSearchOptions = {
        part: "snippet",
        q: term,
        type,
        //type: "video",
        //type: "playlist",
        maxResults: 50
      }
      if (nextPageToken) {
        options.pageToken = nextPageToken
      }
      const url = `${baseYtUrl}&${json2Qs(options)}`

      axios
        .get(url, {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then((response: AxiosResponse<YtSearchResult>) => {
          resolve(response.data)
        })
        .catch((error: AxiosError) => {
          console.log(
            "axios",
            error.message,
            error.response?.data.error.message
          )
          reject(error)
        })
    })
  }

  public static SearchAuthenticated(
    accessToken: string,
    term: string,
    nextPageToken?: string
  ) {
    return new Promise<YtSearchResult>((resolve, reject) => {
      const options: YtSearchOptions = {
        part: "snippet",
        q: term,
        type: "video"
        //   pageToken: nextPageToken
      }
      if (nextPageToken) {
        options.pageToken = nextPageToken
      }
      const url = `${baseYtUrl}&${json2Qs(options)}`
      const bearerAuthorization = `Bearer ${accessToken}`

      axios
        .get(url, {
          headers: {
            "Content-type": "application/json",
            Authorization: bearerAuthorization
          }
        })
        .then((response: AxiosResponse<YtSearchResult>) => {
          resolve(response.data)
        })
        .catch((error: AxiosError) => {
          console.log(
            "axios",
            error.message,
            //error.response?.statusText,
            error.response?.data.error.message
          )
          reject(error)
        })
    })
  }
}
