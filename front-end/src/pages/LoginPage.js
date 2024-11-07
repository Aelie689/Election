import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";

export default function LogIn() {
  const navigate = useNavigate();
  const { loginUser } = useUser();
  const { isAuthenticated, login, logout } = useAuth();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    console.log("handleSubmit");
    
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);

//     try {
//       const response = await fetch("http://localhost:5050/user/authenticateUser", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: data.get("username"),
//           password: data.get("password"),
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const authenticatedUser = await response.json();
//       loginUser(authenticatedUser);
//       login();
//       navigate("/");
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Incorrect username or password");
//     }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <Typography
          variant="h4"
          component="div"
          fontWeight={"bold"}
          sx={{ mb: 3 }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }} style={{ color: "black" }}>Election Results Submission System</Typography>
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            sx={{
              // Root class for the input field
              "& .MuiOutlinedInput-root": {
                color: "#000",
                fontFamily: "Arial",
                // Class for the border around the input field
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2e2e2e",
                  borderWidth: "2px",
                },
              },
              // Class for the label of the input field
              "& .MuiInputLabel-outlined": {
                color: "#2e2e2e",
              },
            }} 
          />
          <TextField
            margin="normal"
            sx={{
              // Root class for the input field
              "& .MuiOutlinedInput-root": {
                color: "#000",
                fontFamily: "Arial",
                // Class for the border around the input field
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2e2e2e",
                  borderWidth: "2px",
                },
              },
              // Class for the label of the input field
              "& .MuiInputLabel-outlined": {
                color: "#2e2e2e",
              },
            }}            
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            color="black"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "white"}}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
