import { makeAutoObservable, runInAction, toJS } from "mobx"
import { AsyncTrunk } from "mobx-sync"
import { SearchCache } from "../Models/Cache"
import { Preview } from "../Models/Preview"
import { YtSearchResult } from "../Models/Youtube"
import { format, formatDistance, formatRelative, subDays } from "date-fns"

export default class Store {
  public IsHydrated = false
  public SearchCaches: SearchCache[] = []
  public LastPlays: Preview[] = []

  public get LastPlaysDesc(): Preview[] {
    return this.LastPlays.slice().reverse().slice(0, 5)
  }

  constructor() {
    makeAutoObservable(this)
  }

  public SetHydrated() {
    this.IsHydrated = true
  }

  public AddSearch(
    term: string,
    type: string,
    result: YtSearchResult,
    pageToken?: string
  ) {
    const newSearchCache: SearchCache = {
      Term: term,
      Created: new Date(),
      SearchResult: result,
      PageToken: pageToken,
      Type: type
    }

    this.SearchCaches.push(newSearchCache)
  }

  public AddLastPlay(
    id: string,
    title: string,
    author: string,
    thumbnailUrl: string
  ) {
    const foundIndex = this.LastPlays.findIndex((x) => x.id === id)

    if (foundIndex > -1) {
      this.LastPlays.splice(foundIndex, 1)
    }
    this.LastPlays.push({
      id,
      title,
      author,
      thumbnailUrl
    })
  }

  public Get(term: string, type: string, pageToken?: string) {
    const expireInDays = 7

    const dateLastWeek = subDays(new Date(), expireInDays)
    //const myDate = new Date(this.SearchCaches[0].Created)
    //console.log("dateLastWeek", dateLastWeek)
    //console.log("date", myDate)

    //console.log("notExpiredYet", dateLastWeek < myDate)

    return this.SearchCaches.find(
      (x) =>
        x.Term === term &&
        x.PageToken === pageToken &&
        x.Type === type &&
        dateLastWeek < new Date(x.Created)
    )
  }
}
export const cacheStore = new Store()

const trunk = new AsyncTrunk(cacheStore, { storage: localStorage })
trunk.init().then(() => {
  cacheStore.SetHydrated()

  // const caches = cacheStore.SearchCaches.map((sc) => {
  //   return { ...sc, SearchResult: undefined }
  // })
  // console.log("cached searches", caches)
  //console.log("plays", toJS(cacheStore.LastPlays))
})
