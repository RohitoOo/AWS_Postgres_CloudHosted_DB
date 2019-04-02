import React from "react"
import { Box, Select } from "grommet"
export default props => (
  <Box>
    <Select
      // disabled={!wanEnabled}
      placeholder="GO TO"
      // value={this.props.values.wanName}
      options={[
        "Invite Users",
        "Update Partner Name",
        "Create Gateway",
        "Create Client Company",
        "Create Site",
        "Create Wan"
      ]}
      onChange={({ option }) => {
        switch (option) {
          case "Invite Users":
            return props.history.push("/inviteusers")
            break
          case "Update Partner Name":
            return props.history.push("/partner")
            break
          case "Create Gateway":
            return props.history.push("/creategateway")
            break
          case "Create Client Company":
            return props.history.push("/createclientcompany")
            break
          case "Create Site":
            return props.history.push("/createsite")
            break
          case "Create Wan":
            return props.history.push("/createwan")
            break
          default:
            return props.history.push("/inviteusers")
        }
      }}
    />
  </Box>
)
