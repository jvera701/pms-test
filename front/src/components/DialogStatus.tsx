import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";

type DialogStatusProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const DialogStatus: React.FC<DialogStatusProps> = (props) => {
  const { isOpen, setIsOpen, onSubmit } = props;
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
      <DialogTitle>Add a new status</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="status"
          name="status"
          label="Name"
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button type="submit">Add Status</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogStatus;
