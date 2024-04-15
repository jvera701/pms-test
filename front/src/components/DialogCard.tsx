import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";

type DialogCardProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const DialogCard: React.FC<DialogCardProps> = (props) => {
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
      <DialogTitle>Add a new Card</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Card Title"
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="description"
          name="description"
          label="Card Description"
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button type="submit">Add Card</Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogCard;
