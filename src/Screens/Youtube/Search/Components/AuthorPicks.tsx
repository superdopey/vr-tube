import React from "react"
import Typography from "@material-ui/core/Typography"
import { searchStore } from "../Store"
import SearchResultButton from "./SearchResultButton"
interface IProps {
  inColumn?: boolean
}

const AuthorPicks: React.FC<IProps> = ({ inColumn }) => {
  const { Previews } = searchStore
  return (
    <>
      <Typography component="h1" variant="h4" align="center">
        Author picks
      </Typography>
      {Previews.map((preview, key) => (
        <SearchResultButton
          id={preview.id}
          title={preview.title}
          author={preview.author}
          thumbnailUrl={preview.thumbnailUrl}
          key={key}
          inColumn={inColumn}
        />
      ))}
    </>
  )
}

export default AuthorPicks
AuthorPicks.defaultProps = {
  inColumn: false
}
