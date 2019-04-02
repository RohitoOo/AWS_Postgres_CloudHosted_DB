import React, { Component } from "react"
import { Box, Text, FormField, TextInput, Button, Select } from "grommet"
import axios from "axios"
import { Formik } from "formik"
// import * as Yup from "yup"
import { observer, inject } from "mobx-react"
import { compose } from "recompose"
// const schema = Yup.object().shape({
//   firstName: Yup.string().required("First Name is required"),
//   lastName: Yup.string().required("Last Name is required"),
//   email: Yup.string().required("Email is required"),
//   role: Yup.string().required("Role is required")
// })
class User extends Component {
  componentDidMount = async () => {}
  state = {
    validation: false,
    invitations: []
  }
  render() {
    const { validation, invitations } = this.state
    return (
      <div>
        <Formik
          ref={_ref => (this.rootFormik = _ref)}
          onSubmit={async (values, { resetForm }) => {
            const input = {
              username: values.username,
              email: values.email
            }

            // Save to Database

            this.props.userStore.saveUser(input)

            // Set Current User in Local Storage

            this.props.userStore.setUser(input)
            // Redirect To Next Page

            this.props.history.push("/partner")

            this.setState({
              validation: false
            })
            resetForm()
          }}
          validateOnChange={validation}
          //   validationSchema={schema}
          initialValues={{
            username: "",
            email: ""
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <Box pad={"medium"} gap="xsmall" width="large">
                {/* Users */}

                <Box
                  align="center"
                  background="light-1"
                  direction="row"
                  border={{ color: "border", size: "small" }}
                  round="xsmall">
                  <Box justify="center" pad="large">
                    <Text size="large" weight="bold">
                      Register
                    </Text>
                  </Box>
                </Box>

                {/* Invite User  */}
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
                        color={props.errors.lastName ? "brand" : null}>
                        Username
                      </Text>
                      <FormField>
                        <TextInput
                          type="text"
                          name="username"
                          value={props.values.username}
                          onChange={props.handleChange}
                        />
                      </FormField>
                    </Box>
                    <Box>
                      <Text
                        margin="xsmall"
                        color={props.errors.email ? "brand" : null}>
                        Email
                      </Text>
                      <FormField>
                        <TextInput
                          type="text"
                          name="email"
                          value={props.values.email}
                          onChange={props.handleChange}
                        />
                      </FormField>
                    </Box>

                    <Box justify="end" margin="small">
                      <Button
                        onClick={() => {
                          this.setState({ validation: true })
                        }}
                        // primary={true}
                        type="submit"
                        label="Register"
                        color="black"
                        hoverIndicator="#FF9900"
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
            </form>
          )}
        />
      </div>
    )
  }
}

const UserEnhanced = compose(
  inject("userStore"),
  observer
)(User)
export default UserEnhanced
