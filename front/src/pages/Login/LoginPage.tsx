import { Container, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";

function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
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
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
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
