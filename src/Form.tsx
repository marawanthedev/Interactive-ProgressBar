import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

const MyForm: React.FC = () => {
  const [name, setName] = useState("");
  const [complaint, setComplaint] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // API Call 1

      await axios.get("http://localhost:3001/long-request-1");

      await axios.get("http://localhost:3001/long-request-2");

      // API Call 3
      await axios.get("http://localhost:3001/long-request-3");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Typography variant="h6">Complaint Form</Typography>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Complaint"
        variant="outlined"
        value={complaint}
        onChange={(e) => setComplaint(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit complaint
      </Button>
    </Box>
  );
};

export default MyForm;
