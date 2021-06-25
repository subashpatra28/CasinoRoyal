import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import CustomModal from "../modal/Modal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
const root = {
  width: "250px",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};

function Login(props) {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);

  function handleChange(e) {
    setUserName(e.target.value);
    if (userName !== "") {
      setError(false);
    }
  }

  function onSubmit() {
    if (userName !== "") {
      props.loginIn(userName);
      props.closeModal();
    } else {
      setError(true);
    }
  }
  return (
    <CustomModal open={props.isOpen}>
      <div style={root}>
        <Typography
          style={{
            margin: "10px",
          }}
          variant="h6"
        >
          User Name
        </Typography>

        <TextField
          style={{
            margin: "10px",
          }}
          id="username-input"
          placeholder="User name"
          variant="outlined"
          onChange={handleChange}
        />
        {error && <span style={{ color: "red" }}>Enter a User-Name</span>}

        <Button
          style={{
            margin: "20px",
          }}
          type="submit"
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Let me join !
        </Button>
      </div>
    </CustomModal>
  );
}

export default Login;
