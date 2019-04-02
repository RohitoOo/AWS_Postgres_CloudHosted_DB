import { observable, action, decorate } from "mobx"
// import { GQL, CREATE_USER, UPDATE_USER, ALL_USERS } from "../api"
import { toJS } from "mobx"
import axios from "axios"
import _ from "lodash"

class PartnerStore {
  loading = false

  updatePartner = async partner => {
    this.loading = true
    await axios.post("http://localhost:4000/updatepartner", {
      partner
    })
    this.loading = false
  }
}

decorate(PartnerStore, {
  updatePartner: action,
  loading: observable
})

export default new PartnerStore()
