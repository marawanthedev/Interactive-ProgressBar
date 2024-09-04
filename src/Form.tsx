import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import SuccessMessage from "./SuccessMessage";
import { useInteractiveProgressBar } from "./InteractiveProgressBar/useInteractiveProgressBar";

const MyForm: React.FC = () => {
  const [name, setName] = useState("");
  const [complaint, setComplaint] = useState("");
  const [email, setEmail] = useState("");
  const [isComplaintSubmitted, setIsComplaintSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    ProgressBar,
    utils: { countAwaits },
    incrementStepsDone,
    setApiRequestsCount,
    setLoadingMessage,
  } = useInteractiveProgressBar({ isLoading });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // API Call 1
      setLoadingMessage("Retriving User Details");

      await axios.get("http://localhost:3001/long-request-1");

      incrementStepsDone("Initiating Complaint");
      await axios.get("http://localhost:3001/long-request-2");

      // API Call 3
      incrementStepsDone("Confirming Complaint");
      await axios.get("http://localhost:3001/long-request-3");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
      setIsComplaintSubmitted(true);
    }
  };

  useEffect(() => {
    setApiRequestsCount(countAwaits(handleSubmit));
  }, []);

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
      {!isLoading && !isComplaintSubmitted && (
        <>
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
        </>
      )}

      <ProgressBar />

      {isComplaintSubmitted && (
        <SuccessMessage message="Your Complaint is submitted to our management !!" />
      )}
    </Box>
  );
};

export default MyForm;
