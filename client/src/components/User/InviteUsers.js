import React from "react"
import {
  Box,
  Text,
  FormField,
  TextInput,
  Button,
  Select,
  DataTable,
  Heading,
  Menu,
  Image
} from "grommet"
import { NavLink } from "react-router-dom"
import { Formik } from "formik"
import * as Yup from "yup"
import { More } from "grommet-icons"
// import { StatusBadge } from "../../Shared/StatusBadge"
import styled from "styled-components"
import { observer, inject } from "mobx-react"
import { compose } from "recompose"
import SelectOptions from "../SelectOptions"

const StyledMenu = styled(Menu)`
  & > div {
    padding: 6px;
  }
`
const StyledDataTable = styled(DataTable)`
  & > tbody > tr {
    border-bottom-color: #cccccc;
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }
`
const STATUS_COLORS = { Active: "status-ok", offline: "status-error" }

const schema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  role: Yup.string().required("Role is required")
})
class CreateGateway extends React.Component {
  state = {
    validation: false,
    invitations: [],
    users: []
  }

  componentWillMount = async () => {
    const currentUser = await JSON.parse(localStorage.getItem("currentUser"))

    const users = await this.props.userStore.getAllUsers(currentUser.partner_id)

    this.setState({
      users: [...users.data],
      currentUser: { currentUser }
    })
  }

  render() {
    const { validation, currentUser, users } = this.state
    return (
      <div>
        <Formik
          ref={_ref => (this.rootFormik = _ref)}
          onSubmit={async (values, { resetForm }) => {
            let role
            switch (values.role) {
              case "Admin":
                role = 1
                break
              case "Editor":
                role = 2
                break
              case "View Only":
                role = 3
                break
              default:
                role = 1
            }

            // Grab Partner ID of Current User

            const { partner_id } = JSON.parse(
              localStorage.getItem("currentUser")
            )
            const user = {
              userName: values.userName,
              email: values.email,
              phone: values.phone,
              role,
              partner_id
            }

            await this.props.userStore.updateUser({ ...user })

            alert(`${user.email} added to Partner List`)
            resetForm()
          }}
          validateOnChange={validation}
          //   validationSchema={schema}
          initialValues={{
            userName: "",
            email: "",
            phone: "",
            role: ""
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              {currentUser ? (
                <Box>
                  <SelectOptions {...this.props} />
                  <Box pad={"medium"} gap="xsmall">
                    {/* Users */}
                    <Box
                      align="center"
                      background="light-1"
                      direction="row"
                      pad="small"
                      gap="medium"
                      border={{ color: "border", size: "small" }}
                      round="xsmall">
                      <Box margin="medium">
                        <Image
                          src={
                            "data:image/png;base64,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"
                          }
                        />
                        {/* <Location size="48px" color="purple" /> */}
                      </Box>
                      {/* Invite User  */}
                      <Box
                        background="light-1"
                        pad="small"
                        margin="medium"
                        gap="medium"
                        border={{ color: "border", size: "small" }}
                        round="xsmall">
                        <Box
                          margin="medium"
                          border={{
                            color: "border",
                            size: "small",
                            side: "bottom"
                          }}>
                          <Text size="large" weight="bold">
                            Invite User
                          </Text>
                        </Box>
                        <Box
                          gap="small"
                          pad="small"
                          direction="row"
                          justify="between">
                          <Box>
                            <Text
                              margin="xsmall"
                              color={props.errors.userName ? "brand" : null}>
                              Username
                            </Text>
                            <FormField>
                              <TextInput
                                name="userName"
                                value={props.values.userName}
                                onChange={props.handleChange}
                              />
                            </FormField>
                          </Box>
                          <Box>
                            <Text
                              type="email"
                              margin="xsmall"
                              color={props.errors.email ? "brand" : null}>
                              Email
                            </Text>
                            <FormField>
                              <TextInput
                                name="email"
                                value={props.values.email}
                                onChange={props.handleChange}
                              />
                            </FormField>
                          </Box>
                          <Box>
                            <Text
                              margin="xsmall"
                              color={props.errors.phone ? "brand" : null}>
                              Phone Number
                            </Text>
                            <FormField>
                              <TextInput
                                name="phone"
                                value={props.values.phone}
                                onChange={props.handleChange}
                              />
                            </FormField>
                          </Box>
                          <Box>
                            <Text
                              margin="xsmall"
                              color={props.errors.role ? "brand" : null}>
                              Role
                            </Text>
                            <Select
                              placeholder="Role"
                              value={props.values.role}
                              options={["Admin", "Editor", "View Only"]}
                              onChange={({ option }) => {
                                props.setFieldValue("role", option)
                              }}
                            />
                          </Box>
                          <Box justify="center">
                            <Button
                              onClick={() =>
                                this.setState({ validation: true })
                              }
                              type="submit"
                              label="Send Invite"
                              color="brand"
                              hoverIndicator="brand"
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    {/* ManageUsersTable */}
                    <Box justify="start">
                      <Box direction="row" align="center" justify="between">
                        <Heading level="3" margin={{ bottom: "xsmall" }}>
                          User List - {currentUser.partner_id}
                        </Heading>
                        <Button
                          label="Create Gateway"
                          hoverIndicator="brand"
                          onClick={() =>
                            this.props.history.push("/creategateway")
                          }
                        />
                      </Box>
                      <Box
                        pad="medium"
                        background="white"
                        round="4px"
                        elevation="xsmall"
                        border={{ color: "border", size: "small" }}>
                        <StyledDataTable
                          // sortable={true}
                          columns={[
                            {
                              property: "username",
                              header: "Username",
                              primary: true
                            },
                            {
                              property: "email",
                              header: "Email"
                            },
                            {
                              property: "phone",
                              header: "Phone"
                            },
                            {
                              property: "role_id",
                              header: "Role"
                            },
                            {
                              property: "partner_id",
                              header: "Partner"
                            }

                            //   {
                            //     property: "action",
                            //     header: "Actions",
                            //     render: id => (
                            //       <StyledMenu
                            //         icon={<More />}
                            //         items={[
                            //           {
                            //             label: "Delete User",
                            //             onClick: () =>
                            //               // Handle Delete User
                            //               alert("Handle Delete")
                            //             // this.setState({
                            //             //   invitations: invitations.filter(
                            //             //     invitation =>
                            //             //       invitation.firstName !== id.firstName
                            //             //   )
                            //             // })
                            //           }
                            //         ]}
                            //       />
                            //     )
                            //   }
                          ]}
                          data={users}
                        />
                        {console.log(users)}
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
              ) : (
                <Box size="xlarge">Loading...</Box>
              )}
            </form>
          )}
        />
      </div>
    )
  }
}

const CreateGatewayEnhanced = compose(
  inject("userStore"),
  observer
)(CreateGateway)
export default CreateGatewayEnhanced