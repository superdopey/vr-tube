import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { observer } from "mobx-react"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import MyContainer from "../../../Components/MyContainer"
import MyPaper from "../../../Components/MyPaper"
import AuthorPicks from "./Components/AuthorPicks"
import LastPlaysList from "./Components/LastPlaysList"
import { searchStore } from "./Store"
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login"
import Config from "../../../Config/Config"
import { isOfflineResponse } from "../../../Helpers/TypeHelpers"
import { FormControlLabel, Grid, Radio, RadioGroup } from "@material-ui/core"
import { cacheStore } from "../../../Cache/CacheStore"

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%" // Fix IE 11 issue.
    //marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

type Inputs = {
  search: string
  type: string // "video" | "playlist"
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://twitter.com/superdopey">
        @superdopey
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

function Search() {
  const classes = useStyles()
  const history = useHistory()
  const { register, handleSubmit, watch, errors, setValue } = useForm<Inputs>()

  useEffect(() => {
    if (history.action === "POP" && history.location.pathname === "/") {
      searchStore.ClearSearch()
    }

    register({
      name: "type"
    })

    //setValue("search", "asot 950")
    setValue("type", "video") //default
  }, [history])

  const onSubmit = (data: Inputs) => {
    history.push(`/result/${encodeURIComponent(data.search)}/${data.type}`)
  }

  const { IsAuthenticated } = searchStore
  const { LastPlaysDesc } = cacheStore

  const renderSearch = () => {
    if (!IsAuthenticated) {
      return null
    }

    const hasError = errors.search !== undefined
    const errorText = hasError ? errors.search?.message : ""

    return (
      <MyPaper>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            inputRef={register({
              required: "Enter a search"
            })}
            focused={true}
            label="Search on youtube"
            name="search"
            autoFocus
            error={hasError}
            helperText={errorText}
          />

          <RadioGroup
            aria-label="type"
            name="typeGroupe"
            row
            defaultValue="video"
            onChange={(ev, value: string) => {
              //console.log("value", value)
              setValue("type", value)
            }}
          >
            <FormControlLabel
              value="video"
              control={<Radio color="primary" />}
              label="Video"
            />
            <FormControlLabel
              value="playlist"
              control={<Radio color="primary" />}
              label="Playlist"
            />
          </RadioGroup>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Search
          </Button>
        </form>

        <Copyright />
      </MyPaper>
    )
  }

  const renderGoogleButton = () => {
    if (IsAuthenticated) {
      return null
    }
    return (
      <MyPaper>
        <GoogleLogin
          clientId={Config.ClientId}
          buttonText="Login to Youtube to search"
          isSignedIn={true}
          //onAutoLoadFinished
          //scope="https://www.googleapis.com/auth/youtube.force-ssl"
          scope="https://www.googleapis.com/auth/youtube.readonly"
          onSuccess={(
            response: GoogleLoginResponse | GoogleLoginResponseOffline
          ) => {
            if (!isOfflineResponse(response)) {
              searchStore.AuthenticateGoogle(response.accessToken)
            }
          }}
          onFailure={(responseGoogle) => {
            console.log("fail", responseGoogle)
          }}
          cookiePolicy={"single_host_origin"}
        />
      </MyPaper>
    )
  }

  const renderVideos = () => {
    if (LastPlaysDesc.length > 0) {
      return (
        <Grid container spacing={2}>
          <Grid item md={6}>
            <LastPlaysList inColumn={true} />
          </Grid>
          <Grid item md={6}>
            <AuthorPicks inColumn={true} />
          </Grid>
        </Grid>
      )
    }

    return <AuthorPicks />
  }

  return (
    <MyContainer>
      {renderGoogleButton()}
      {renderSearch()}
      {renderVideos()}
      {/* <Box mt={8}>
          <Copyright />
        </Box> */}
    </MyContainer>
  )
}

export default observer(Search)
