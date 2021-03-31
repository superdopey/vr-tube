import { Container, CssBaseline } from "@material-ui/core"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"

interface IProps {}

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    flex: 1,
    display: "flex"
    // [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
    //   width: 600,
    //   marginLeft: "auto",
    //   marginRight: "auto",
    // },
  },
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column"
  }
}))

const MyContainer: React.FC<IProps> = ({ children }) => {
  const classes = useStyles()
  return (
    <main className={classes.layout}>
      <Container component="main" maxWidth="lg" className={classes.container}>
        <CssBaseline />
        {children}
      </Container>
    </main>
  )
}

export default MyContainer
