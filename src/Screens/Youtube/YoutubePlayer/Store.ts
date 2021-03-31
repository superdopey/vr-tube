import { makeAutoObservable, runInAction } from "mobx"
import { Page } from "ytsearcher"

export default class Store {
  public Loop = true

  constructor() {
    makeAutoObservable(this)
  }

  public SetLoop(loop: boolean) {
    this.Loop = loop
  }
}
export const youtubePlayerstore = new Store()
