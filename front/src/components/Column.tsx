import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import Cards from "./Card";
import type { Card, Status } from "../api/api";

interface ColumnProps {
  cards: Card[];
  status: string | null;
  statusId: number | null;
  setDialogStatus: React.Dispatch<React.SetStateAction<number | null>>;
  setOpenCardDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteCard: (cardId: number) => void;
  setCardTitle: React.Dispatch<React.SetStateAction<string>>;
  setCardDescription: React.Dispatch<React.SetStateAction<string>>;
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setCardId: React.Dispatch<React.SetStateAction<number>>;
  setCurrentStatus: React.Dispatch<React.SetStateAction<Status | null>>;
}

const Column: React.FC<ColumnProps> = (props) => {
  const {
    cards,
    status,
    statusId,
    setDialogStatus,
    setOpenCardDialog,
    onDeleteCard,
    setCardDescription,
    setCardTitle,
    setShowEditDialog,
    setCardId,
    setCurrentStatus,
  } = props;

  const onClickButton = () => {
    setDialogStatus(statusId);
    setOpenCardDialog(true);
  };

  return (
    <Paper
      sx={{
        height: "80vh",
        padding: "10px",
        background: "pink",
        overflowY: "scroll",
      }}
    >
      <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
        {status === null ? "Backlog" : status}
      </Typography>
      {cards
        .filter(
          (card) => card.status === status || card.status?.name === status
        )
        .map((card) => (
          <Cards
            title={card.title}
            description={card.description}
            id={card.id}
            onDeleteCard={onDeleteCard}
            setCardDescription={setCardDescription}
            setCardTitle={setCardTitle}
            setShowEditDialog={setShowEditDialog}
            setCardId={setCardId}
            setCurrentStatus={setCurrentStatus}
            status={status}
            statusId={statusId}
          />
        ))}
      <Button variant="contained" onClick={() => onClickButton()}>
        Add a card
      </Button>
    </Paper>
  );
};

export default Column;
