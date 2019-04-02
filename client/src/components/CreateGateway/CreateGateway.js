import React, { Component } from "react"
import {
  Grommet,
  Box,
  Image,
  Text,
  FormField,
  TextInput,
  Button,
  Select
} from "grommet"
import axios from "axios"
import { Formik } from "formik"
import * as Yup from "yup"
import { NavLink } from "react-router-dom"
import _ from "lodash"
import SelectOptions from "../SelectOptions"
import { observer, inject } from "mobx-react"
import { compose } from "recompose"
const schema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  role: Yup.string().required("Role is required")
})
class Partner extends Component {
  componentWillMount = async () => {
    const currentUser = await JSON.parse(localStorage.getItem("currentUser"))

    console.log(currentUser)
    this.setState({
      currentUser
    })
  }
  state = {
    validation: false,
    currentUser: ""
  }
  render() {
    const { validation, currentUser } = this.state
    return (
      <div>
        <Formik
          ref={_ref => (this.rootFormik = _ref)}
          onSubmit={async (values, { resetForm }) => {
            // Create Gateway

            const gateway = {
              name: values.gatewayName,
              ip: values.ipaddress,
              partner_id: currentUser.partner_id
            }

            this.props.gatewayStore.createGateway(gateway)
            // Update Partner (gateway_id)

            this.setState({
              //   invitations: [...this.props.userStore.users],
              validation: false
            })
            // alert("Invitation Sent")
            resetForm()
          }}
          validateOnChange={validation}
          //   validationSchema={schema}
          initialValues={{
            ipaddress: "",
            gatewayName: ""
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <Box>
                <SelectOptions {...this.props} />
                <Box pad={"medium"} gap="xsmall" width="large">
                  {/* Users */}
                  <Box
                    align="center"
                    background="light-1"
                    direction="row"
                    border={{ color: "border", size: "small" }}
                    round="xsmall">
                    <Box justify="center" pad="large">
                      <Text>
                        Welcome! {currentUser.username}
                        ...
                      </Text>
                    </Box>
                  </Box>

                  {/* Update Partner */}
                  <Box
                    background="light-1"
                    pad="small"
                    gap="medium"
                    border={{ color: "border", size: "small" }}
                    round="xsmall">
                    <Box gap="small" pad="small" justify="between">
                      <Box>
                        <Text
                          margin="xsmall"
                          color={props.errors.email ? "brand" : null}>
                          Gateway Name
                        </Text>
                        <FormField>
                          <TextInput
                            name="gatewayName"
                            value={props.values.gatewayName}
                            onChange={props.handleChange}
                          />
                        </FormField>
                      </Box>
                      <Box>
                        <Text
                          margin="xsmall"
                          color={props.errors.email ? "brand" : null}>
                          IP
                        </Text>
                        <FormField>
                          <TextInput
                            name="ipaddress"
                            value={props.values.ipaddress}
                            onChange={props.handleChange}
                          />
                        </FormField>
                      </Box>
                      <Box justify="end" margin="small">
                        <Button
                          onClick={() => {
                            this.setState({ validation: true })
                          }}
                          type="submit"
                          label="Create Gateway"
                          color="brand"
                          hoverIndicator="brand"
                        />
                      </Box>
                    </Box>
                  </Box>

                  {/* Footer */}
                  {/* <Box
                  pad="medium"
                  margin="large"
                  background="black"
                  round
                  direction="row"
                  gap="large"
                  justify="end"> */}
                  {/* {_.isEmpty(props.errors)
                ? null
                : (console.log(props.errors),
                  (
                    <Button
                      label="Check Missing Fields"
                      color="brand"
                      hoverIndicator="brand"
                      onClick={this.handleMissingFields}
                    />
                  ))} */}

                  {/* <Button
                    // disabled={_.isEmpty(props.errors) ? false : true}
                    type="submit"
                    label="Update"
                    color="brand"
                    hoverIndicator="brand"
                  />
                </Box> */}
                </Box>
              </Box>
            </form>
          )}
        />
      </div>
    )
  }
}

const PartnerEnhanced = compose(
  inject("userStore", "partnerStore", "gatewayStore"),
  observer
)(Partner)
export default PartnerEnhanced
