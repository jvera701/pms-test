import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";

import type { Status } from "../api/api";

type DialogEditProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  statusList: Status[];
  currentStatus: Status | null;
  setCurrentStatus: React.Dispatch<React.SetStateAction<Status | null>>;
};

const DialogEditCard: React.FC<DialogEditProps> = (props) => {
  const {
    isOpen,
    setIsOpen,
    onSubmit,
    title,
    setTitle,
    description,
    setDescription,
    statusList,
    currentStatus,
    setCurrentStatus,
  } = props;

  console.log(setCurrentStatus);
  const onSelectStatus = (event: SelectChangeEvent) => {
    const name = event.target.value;
    if (name === "backlog") {
      setCurrentStatus(null);
    } else {
      const statusFound = statusList.find((element) => element.name === name);
      statusFound &&
        setCurrentStatus({
          id: statusFound?.id,
          name: name,
        });
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          onSubmit(event);
        },
      }}
    >
      <DialogTitle>Edit Card</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Title"
          variant="standard"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="description"
          name="description"
          label="Description"
          variant="standard"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value);
          }}
        />
        <InputLabel>Select Status</InputLabel>
        <Select
          value={currentStatus === null ? "backlog" : currentStatus.name}
          onChange={onSelectStatus}
          sx={{ marginTop: 2 }}
        >
          <MenuItem value="backlog">Backlog</MenuItem>
          {statusList.map((status) => (
            <MenuItem key={status.id} value={status.name}>
              {status.name}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button type="submit">Edit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogEditCard;
