import { useEffect, useState } from "react";

import Table from "../../../components/Table";
import { users } from "../../../Services/fectchApi";

import { Avatar, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import ButtonCustom from "../../../components/Button";
import CustomizedMenus from "../../../components/CustomizedMenu";
import Services from "../../../Services";

function User({}) {
  const [userSelected, setUserSelected] = useState([]);
  const [activeFilter, settActiveFilter] = useState(true);
  const [filter, setFilter] = useState("");
  const [user, setUser] = useState([]);
  const [userShow, setUserShow] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        <Avatar
          src={params.row.avatar_url}
          alt={params.row.username}
          sx={{ width: 30, height: 30 }}
        />
      ),
    },
    { field: "first_name", headerName: "First name", width: 150 },
    { field: "last_name", headerName: "Last name", width: 150 },
    {
      field: "phone_number",
      headerName: "phone_number",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: "300",
      renderCell: (params) => (
        <>
          <Button
            style={{
              color: "red",
              padding: ".3rem 2rem",
              fontSize: ".8rem",
            }}
            onClick={(e) => {
              handleRemove(params.row.user_id);
            }}
          >
            Remove
          </Button>
          <Button
            sx={{
              marginLeft: "1rem",
              background: "rgb(251, 146, 60)",
              color: "#fff",
              padding: ".3rem 2rem",
              fontSize: ".8rem",
              "&:hover": {
                background: "rgb(251, 146, 60)",
                filter: "brightness(120%)",
              },
            }}
            onClick={(e) => {
              handleDetail(params.row.user_id);
            }}
          >
            Detail
          </Button>
        </>
      ),
    },
  ];
  // Function to handle remove action
  function handleRemove(id) {
    console.log(`Remove product with ID ${id}`);
  }
  // Function to handle detail action
  function handleDetail(id) {
    console.log(`Show detail for product with ID ${id}`);
  }
  useEffect(() => {
    const initUser = async () => {
      const result = await Services.getDataFromApi("/api/user/all");
      const usersWithId = result.data.map((user, index) => ({
        ...user,
        id: index + 1,
      }));
      if (result.status === 200) {
        setUser(usersWithId);
        setUserShow(usersWithId);
      } else {
        console.log(result.status);
      }
    };
    initUser();
  }, []);

  return (
    <div className="w-full mt-12">
      <div className="w-full end flex mb-4">
        {userSelected.length > 0 && (
          <ButtonCustom
            nameButton="Remove product selected"
            style={{ marginRight: "1rem", color: "red" }}
          />
        )}
        <CustomizedMenus
          nameButton={"Filter"}
          active={activeFilter}
          setActive={settActiveFilter}
        >
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("preparing");
            }}
          >
            Status: preparing
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("ship");
            }}
          >
            Status: ship
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("ship");
            }}
          >
            Status: ...
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("ship");
            }}
          >
            Status: ...
          </MenuItem>
          <MenuItem
            disableRipple
            sx={{
              color: "red",
              borderTop: "1px solid red",
            }}
            onClick={(e) => {
              settActiveFilter(false);
            }}
          >
            Cancel filter
          </MenuItem>
        </CustomizedMenus>
      </div>
      <Table
        data={userShow}
        columns={columns}
        pageSize={12}
        setSelection={setUserSelected}
      ></Table>
    </div>
  );
}

export default User;
