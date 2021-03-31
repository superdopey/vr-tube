import { Button } from "@material-ui/core"
import { observer } from "mobx-react"
import React, { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import MyAppBar from "../../../Components/MyAppBar"
import MyContainer from "../../../Components/MyContainer"
import MyPaper from "../../../Components/MyPaper"
import SearchResultButton from "../Search/Components/SearchResultButton"

import { searchStore } from "../Search/Store"
interface IProps {}

const SearchResultsPage: React.FC<IProps> = () => {
  const { SearchResult, Error } = searchStore
  const { search, type, pageToken } = useParams<{
    search: string
    type: "video" | "playlist"
    pageToken?: string
  }>()
  const history = useHistory()
  const decodedToken =
    pageToken !== undefined ? decodeURIComponent(pageToken) : undefined

  useEffect(() => {
    searchStore.Search(decodeURIComponent(search), type, decodedToken)
  }, [search, decodedToken])

  const renderResults = () => {
    if (SearchResult === undefined || Error !== "") {
      return null
    }

    const renderNextButton = () => {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push(
              `/result/${encodeURIComponent(
                search
              )}/${type}/${encodeURIComponent(SearchResult.nextPageToken)}`
            )
          }}
        >
          Volgende
        </Button>
      )
    }

    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "auto",
          flexDirection: "column"
        }}
      >
        {SearchResult.items.map((item, key) => {
          const id = type === "video" ? item.id.videoId : item.id.playlistId
          if (id === undefined) {
            return null
          }
          return (
            <SearchResultButton
              id={id}
              title={item.snippet.title}
              author={item.snippet.channelTitle}
              thumbnailUrl={item.snippet.thumbnails.medium.url}
              key={key}
            />
          )
        })}

        {renderNextButton()}
      </div>
    )
  }

  const renderError = () => {
    if (Error === "") {
      return null
    }
    return <MyPaper>{Error}</MyPaper>
  }

  return (
    <MyContainer>
      <MyAppBar title={search} buttonClick={() => history.goBack()} />
      {renderError()}
      {renderResults()}
    </MyContainer>
  )
}

export default observer(SearchResultsPage)
