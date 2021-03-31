import { makeAutoObservable, toJS } from "mobx"
import { Preview } from "../../../Models/Preview"
import { YtSearchResult } from "../../../Models/Youtube"
import { YouTubeService } from "../../../Services/YoutubeService"

export default class Store {
  //private Searcher = new YTSearcher(Config.YoutubeApiKey)
  public IsLoading = false
  //public IsAuthenticated = false
  public IsAuthenticated = true // google loging disabled for now
  private AccessToken = ""

  public SearchResult?: YtSearchResult = undefined
  public SearchTerm = ""
  public Error = ""
  public Previews: Preview[] = [
    {
      id: "HrbqeYVZ2Do",
      title: "Weekend Playlist 15",
      author: "Guiseppe Ottaviani",
      thumbnailUrl: "https://i.ytimg.com/vi/HrbqeYVZ2Do/mqdefault.jpg"
    },
    {
      id: "ab7NLz9XlX4",
      title: "Giuseppe Ottaviani @ Exchange LA (28 FEB 2020)",
      author: "Guiseppe Ottaviani",
      thumbnailUrl: "https://i.ytimg.com/vi/ab7NLz9XlX4/mqdefault.jpg"
    },
    {
      id: "EJ08EoFVm2k",
      title:
        "Armin van Buuren live at @A State Of Trance 950 (Jaarbeurs, Utrecht - The Netherlands)",
      author: "Armin van Buuren",
      thumbnailUrl: "https://i.ytimg.com/vi/EJ08EoFVm2k/mqdefault.jpg"
    },
    {
      id: "PLYSug20_LW6VcbMX2Im9B9s6cZ9OmCCy5",
      title: "Greatest 90's Dance Hits",
      author: "Steve Garratt",
      thumbnailUrl: "https://i.ytimg.com/vi/8DNQRtmIMxk/mqdefault.jpg"
    }
    //
  ]
  constructor() {
    makeAutoObservable(this)
    //Config.
  }

  public async Search(
    search: string,
    type: "video" | "playlist",
    nextPageToken?: string
  ) {
    this.Error = ""

    this.IsLoading = true
    this.SearchTerm = search

    try {
      const result = await YouTubeService.SearchCached(
        search,
        type,
        nextPageToken
      )

      // console.log("search", toJS(result))

      if (nextPageToken === undefined) {
        this.SearchResult = result
      } else if (this.SearchResult !== undefined) {
        this.SearchResult.items.push(...result.items)
        this.SearchResult.nextPageToken = result.nextPageToken
        this.SearchResult = { ...this.SearchResult }
      }
    } catch (error) {
      console.log("error", error)
      this.Error = "An error occured"
    } finally {
      this.IsLoading = false
    }
  }

  public AuthenticateGoogle(accesToken: string) {
    this.AccessToken = accesToken
    this.IsAuthenticated = true
  }

  public ClearSearch() {
    this.SearchResult = undefined
  }
}
export const searchStore = new Store()
