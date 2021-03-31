import React, { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import YouTube, { Options } from "react-youtube"
import MyAppBar from "../../../Components/MyAppBar"
import { useHistory } from "react-router-dom"
import MyContainer from "../../../Components/MyContainer"
import MyPaper from "../../../Components/MyPaper"
import { youtubePlayerstore } from "./Store"
import { observer } from "mobx-react"
import { Checkbox, FormControlLabel } from "@material-ui/core"
interface IProps {}

interface ParamTypes {
  id: string
  title: string
  type: "video" | "playlist"
}

const YoutubePlayer: React.FC<IProps> = () => {
  const playerRef = useRef<YouTube>(null)
  const { id, title, type } = useParams<ParamTypes>()
  useEffect(() => {
    //mix list: RDEJ08EoFVm2k https://www.youtube.com/watch?v=EJ08EoFVm2k&list=RDEJ08EoFVm2k&start_radio=1&t=37
    //PL before 3nM2CXPLRq3VVDzs1VVVZNy4MAwr6SK
    //play list: https://www.youtube.com/playlist?list=PLM3nM2CXPLRq3VVDzs1VVVZNy4MAwr6SK
    //video: eqdB4wqfhhc
  }, [])

  const getHeight = () => {
    const width = window.innerWidth
    const height = width * 0.5
    return height.toString()
  }

  const { Loop } = youtubePlayerstore

  const opts: Options = {
    height: getHeight(),
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      list: id,
      loop: Loop ? 1 : 0
    }
  }

  const renderPlayer = () => {
    //

    return (
      <MyPaper>
        <YouTube
          videoId={id}
          opts={opts}
          ref={playerRef}
          className="youtube"
          onStateChange={(event) => {
            if (event.data === YouTube.PlayerState.PAUSED) {
              event.target.playVideo()
            }
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              //checked={state.checkedB}
              defaultChecked
              onChange={(ev, checked) => {
                youtubePlayerstore.SetLoop(checked)
              }}
              color="primary"
            />
          }
          label="Loop"
        />
      </MyPaper>
    )
  }
  const history = useHistory()
  return (
    <MyContainer>
      <MyAppBar
        title={decodeURIComponent(title)}
        buttonClick={() => {
          history.goBack()
        }}
      />

      {renderPlayer()}
    </MyContainer>
  )
}

export default observer(YoutubePlayer)
