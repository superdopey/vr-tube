import React from "react"
import Typography from "@material-ui/core/Typography"
import { searchStore } from "../Store"
import SearchResultButton from "./SearchResultButton"
import { cacheStore } from "../../../../Cache/CacheStore"
interface IProps {
  inColumn?: boolean
}

const LastPlaysList: React.FC<IProps> = ({ inColumn }) => {
  const { LastPlaysDesc } = cacheStore
  return (
    <>
      <Typography component="h1" variant="h4" align="center">
        Lasted played
      </Typography>
      {LastPlaysDesc.map((lp, key) => (
        <SearchResultButton
          id={lp.id}
          title={lp.title}
          author={lp.author}
          thumbnailUrl={lp.thumbnailUrl}
          key={key}
          inColumn={inColumn}
        />
      ))}
    </>
  )
}

export default LastPlaysList

LastPlaysList.defaultProps = {
  inColumn: false
}
