import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login"

export function isOfflineResponse(
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): response is GoogleLoginResponseOffline {
  return (response as GoogleLoginResponseOffline).code !== undefined
}
