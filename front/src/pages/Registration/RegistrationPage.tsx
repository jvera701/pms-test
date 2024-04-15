import { Container, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../../api/api";
import { UserAtom } from "../../store/userAtom";
import { useSetAtom } from "jotai";

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const setAtom = useSetAtom(UserAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const result = await signUp(email, password);
      if ("error" in result) {
        setError(true);
      } else {
        setAtom({
          token: result.access_token,
          project: undefined,
        });
        navigate("/projects");
      }
    }
  };
  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom color="textPrimary">
        Registration
      </Typography>
      <Typography
        variant="body1"
        align="center"
        style={{ marginBottom: 20 }}
        color="textPrimary"
      >
        Please register to create an account.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <p style={{ color: "red" }}>
            An error happened, please try again with a different email
          </p>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ marginTop: 20 }}
        >
          Sign Up
        </Button>
      </form>
      <Typography
        variant="body1"
        align="center"
        color="textPrimary"
        style={{ marginTop: 20 }}
      >
        Already have an account? <Link to="/">Login here</Link>
      </Typography>
    </Container>
  );
};

export default RegistrationPage;
