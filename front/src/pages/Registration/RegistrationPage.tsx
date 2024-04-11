import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const RegistrationPage: React.FC = () => {
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
      <Typography variant="body1" align="center" color="textPrimary">
        Already have an account? <Link to="/">Login here</Link>
      </Typography>
    </Container>
  );
};

export default RegistrationPage;
