import { IConfig } from "./IConfig"
const isProd = process.env.NODE_ENV === "production"

const DevConfig: IConfig = {
  Env: "Dev",
  SocketServer: "http://localhost:2000",
  YoutubeApiKey: "AIzaSyCgcXo5mfEuppRfCs2pivQOWfSDwHrnPgQ", //MyFirstProject, please replace with your own api key

  //google oauth
  ClientId: "",
  ClientSecret: ""
}

const ProdConfig = {
  Env: "Production",
  SocketServer: "http://localhost:2000",
  YoutubeApiKey: "",
  //google oauth
  ClientId: "",
  ClientSecret: ""
}
export default isProd ? ProdConfig : DevConfig
