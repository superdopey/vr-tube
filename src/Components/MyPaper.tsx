import { Grid, makeStyles, Paper } from "@material-ui/core"
import React from "react"
import classNames from "classnames"
interface IProps {
  size?: "small" | "normal"
  onClick?: () => void
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  paperSmall: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(3)
    }
  }
}))

const MyPaper: React.FC<IProps> = ({ children, size }) => {
  const classes = useStyles()
  const style = size === "small" ? classes.paperSmall : classes.paper
  //classNames('foo', { bar: true });
  // const myStyles = classNames("foo", "bar") // => 'foo bar'
  return (
    <>
      <Paper className={style}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            {children}
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default MyPaper

MyPaper.defaultProps = {
  size: "normal"
}
