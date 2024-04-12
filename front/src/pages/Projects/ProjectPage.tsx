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
import { useState, useEffect } from "react";
import { UserAtom } from "../../store/userAtom";
import { getProjects, addProject } from "../../api/api";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

type Project = {
  id: number;
  name: string;
};

function ProjectPage() {
  const [listProjects, setListProjects] = useState<Project[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useAtom(UserAtom);
  const navigate = useNavigate();

  const getAllProjects = async () => {
    const newProjects = await getProjects(user.token);
    setListProjects(newProjects);
  };

  const logout = () => {
    setUser({
      token: "",
    });
    navigate("/");
  };

  useEffect(
    () => {
      getAllProjects();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Container maxWidth="xl">
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const project = formJson.project;
            const addProjects = await addProject(user.token, project);
            setListProjects((prevList) => [...prevList, addProjects]);
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
        {listProjects.map((project) => (
          <Grid item xs={4} key={project.id}>
            <Card variant="outlined">
              <CardActionArea>
                <CardContent>{project.name}</CardContent>
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
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: 20, marginLeft: 20 }}
        onClick={logout}
      >
        Logout
      </Button>
    </Container>
  );
}

export default ProjectPage;
