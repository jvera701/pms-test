import React from "react";
import { Grid } from "@mui/material";
import Column from "./Column";
import type { Card, Status } from "../api/api";

type BoardProps = {
  statuses: Status[];
  cards: Card[];
  setDialogStatus: React.Dispatch<React.SetStateAction<number | null>>;
  setOpenCardDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteCard: (cardId: number) => void;
  setCardTitle: React.Dispatch<React.SetStateAction<string>>;
  setCardDescription: React.Dispatch<React.SetStateAction<string>>;
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setCardId: React.Dispatch<React.SetStateAction<number>>;
  setCurrentStatus: React.Dispatch<React.SetStateAction<Status | null>>;
};

const Board: React.FC<BoardProps> = (props) => {
  const {
    statuses,
    cards,
    setDialogStatus,
    setOpenCardDialog,
    onDeleteCard,
    setCardTitle,
    setCardDescription,
    setShowEditDialog,
    setCardId,
    setCurrentStatus,
  } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Column
          cards={cards}
          status={null}
          statusId={null}
          setDialogStatus={setDialogStatus}
          setOpenCardDialog={setOpenCardDialog}
          onDeleteCard={onDeleteCard}
          setCardDescription={setCardDescription}
          setCardTitle={setCardTitle}
          setShowEditDialog={setShowEditDialog}
          setCardId={setCardId}
          setCurrentStatus={setCurrentStatus}
        />
      </Grid>
      {statuses.map((stat) => (
        <Grid item xs={4} key={stat.id}>
          <Column
            cards={cards}
            statusId={stat.id}
            status={stat.name}
            setDialogStatus={setDialogStatus}
            setOpenCardDialog={setOpenCardDialog}
            onDeleteCard={onDeleteCard}
            setCardDescription={setCardDescription}
            setCardTitle={setCardTitle}
            setShowEditDialog={setShowEditDialog}
            setCardId={setCardId}
            setCurrentStatus={setCurrentStatus}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Board;
