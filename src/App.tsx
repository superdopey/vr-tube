import React from "react"

import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { observer } from "mobx-react"
import YoutubePlayer from "./Screens/Youtube/YoutubePlayer/YoutubePlayer"
import Search from "./Screens/Youtube/Search/Search"
import SearchResultsPage from "./Screens/Youtube/SearchResultsPage/SearchResultsPage"
import Config from "./Config/Config"
import { cacheStore } from "./Cache/CacheStore"

console.log("Env", Config.Env)
//cacheStore
function App() {
  if (!cacheStore.IsHydrated) {
    return null
  }

  return (
    <Router>
      <Switch>
        <Route path="/play/:id/:title/" exact>
          <YoutubePlayer />
        </Route>
        <Route path="/result/:search/:type/:pageToken?">
          <SearchResultsPage />
        </Route>
        <Route path="/" exact>
          <Search />
        </Route>
      </Switch>
    </Router>
  )
}

export default observer(App)
