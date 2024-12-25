import React, { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "utils";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-reset-cover.jpeg";

function Cover() {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      handleError("Email is required!");
      return;
    }

    try {
      const url = "http://localhost:8080/auth/forgotpassword";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        handleError(errorData.message || "Failed to send reset email");
        return;
      }

      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message || "Reset email sent successfully");
      } else {
        handleError(result.message || "An error occurred");
      }
    } catch (error) {
      handleError("Network error: " + error.message);
    }
  };

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an email in maximum 60 seconds
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={4}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                variant="standard"
              />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Reset
              </Button>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <ToastContainer />
    </CoverLayout>
  );
}

export default Cover;
