import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { useState } from "react";

const listProjects = [
  "first",
  "second",
  "first",
  "second",
  "first",
  "second",
  "first",
];
function ProjectPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container maxWidth="xl">
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const project = formJson.project;
            console.log(project);
            setIsOpen(false);
          },
        }}
      >
        <DialogTitle>Add a new project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="project"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button type="submit">Add New</Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h2" align="center" gutterBottom color="textPrimary">
        Your Projects
      </Typography>

      <Grid direction="row" container spacing={3}>
        // TODO: add id
        {listProjects.map((project) => (
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardActionArea>
                <CardContent>{project}</CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: 20 }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Add new Project
      </Button>
    </Container>
  );
}

export default ProjectPage;
