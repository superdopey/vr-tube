import { Grid, makeStyles } from "@material-ui/core"
import { ChevronRightOutlined } from "@material-ui/icons"
import React from "react"
import { Link } from "react-router-dom"
import { cacheStore } from "../../../../Cache/CacheStore"
import MyPaper from "../../../../Components/MyPaper"
interface IProps {
  id: string
  title: string
  author: string
  thumbnailUrl: string
  inColumn?: boolean
}

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  img: {
    //marginRight: "10px"
    width: "100%",
    height: "auto",
    backgroundColor: "#000"
  }
}))

const SearchResultButton: React.FC<IProps> = ({
  id,
  author,
  title,
  inColumn,
  thumbnailUrl
}) => {
  const classes = useStyles()

  const imageMd = inColumn ? 4 : 3
  const contentMd = inColumn ? 8 : 9

  //https://i.ytimg.com/vi/EJ08EoFVm2k/mqdefault.jpg
  return (
    <Link
      to={`/play/${id}/${encodeURIComponent(title)}`}
      style={{ textDecoration: "none" }}
      onClick={() => cacheStore.AddLastPlay(id, title, author, thumbnailUrl)}
    >
      <MyPaper size="small">
        <Grid container spacing={2}>
          <Grid item md={imageMd} sm={imageMd} xs={12}>
            <img src={thumbnailUrl} className={classes.img} alt={title} />
          </Grid>
          <Grid
            item
            md={contentMd}
            sm={contentMd}
            xs={12}
            className={classes.contentContainer}
          >
            <div style={{ flex: 1 }}>
              {title}
              <br />
              <span style={{ color: "#888" }}>{author}</span>
            </div>

            <ChevronRightOutlined />
          </Grid>
        </Grid>
      </MyPaper>
    </Link>
  )
}

export default SearchResultButton

SearchResultButton.defaultProps = {
  inColumn: false
}
