import { observable, action, decorate } from "mobx"
// import { GQL, CREATE_USER, UPDATE_USER, ALL_USERS } from "../api"
import { toJS } from "mobx"
import axios from "axios"
import _ from "lodash"

class GatewayStore {
  loading = false

  createGateway = async gateway => {
    console.log(gateway)
    this.loading = true
    await axios.post("http://localhost:4000/creategateway", {
      gateway
    })
    this.loading = false
  }
}

decorate(GatewayStore, {
  createGateway: action,
  loading: observable
})

export default new GatewayStore()
