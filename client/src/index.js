import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./components/App"
import * as serviceWorker from "./serviceWorker"
import { Provider } from "mobx-react"
import userStore from "./stores/userStore"
import partnerStore from "./stores/partnerStore"
import gatewayStore from "./stores/gatewayStore"

const stores = {
  userStore,
  partnerStore,
  gatewayStore
}

window._____APP_STATE_____ = stores

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("root")
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()