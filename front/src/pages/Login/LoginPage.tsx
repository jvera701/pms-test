import { Container, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/api";
import { useState } from "react";
import { UserAtom } from "../../store/userAtom";
import { useSetAtom } from "jotai";
import "./styles.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const setAtom = useSetAtom(UserAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      const result = await login(email, password);
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
        My PMS page
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
          <p style={{ color: "red" }}>An error happened, please try again</p>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ marginTop: 20 }}
        >
          Login
        </Button>
      </form>
      <Typography
        variant="body1"
        align="center"
        style={{ marginTop: 20 }}
        color="textPrimary"
      >
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>
    </Container>
  );
}

export default LoginPage;
