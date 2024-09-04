import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import InteractiveProgressBarOverlay from "./InteractiveProgressBar";
import { countAwaits } from "./countAwaits";
import SuccessMessage from "./SuccessMessage";

const MyForm: React.FC = () => {
  const [name, setName] = useState("");
  const [complaint, setComplaint] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiRequestsCount, setApiRequestsCount] = useState(0);
  const [apiRequestsDone, setApiRequestsDone] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Loading....");
  const [isComplaintSubmitted, setIsComplaintSubmitted] = useState(false);

  const incrementStepsDone = (nextLoadingMessage?: string) => {
    if (apiRequestsDone + 1 < apiRequestsCount) {
      setApiRequestsDone((prev) => prev + 1);
      setLoadingMessage(nextLoadingMessage ?? "");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      setLoadingMessage("Retriving User information");
      // API Call 1

      await axios.get("http://localhost:3001/long-request-1");
      incrementStepsDone("Intiating Complaint submission");

      await axios.get("http://localhost:3001/long-request-2");
      incrementStepsDone("Confirming Complaint");

      // API Call 3
      await axios.get("http://localhost:3001/long-request-3");
      incrementStepsDone();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setApiRequestsCount(0);
      setApiRequestsDone(0);
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
      {!loading && !isComplaintSubmitted && (
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

      <InteractiveProgressBarOverlay
        loading={loading}
        apiRequestsCount={apiRequestsCount}
        apiRequestsDone={apiRequestsDone}
        message={loadingMessage}
      />
      {isComplaintSubmitted && (
        <SuccessMessage message="Your Complaint is submitted to our management !!" />
      )}
    </Box>
  );
};

export default MyForm;
