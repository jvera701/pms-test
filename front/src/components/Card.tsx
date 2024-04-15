import React from "react";
import {
  Typography,
  Card as CardMaterial,
  CardContent,
  CardActions,
  CardActionArea,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import type { Card, Status } from "../api/api";

type CardProps =
  | Omit<Card, "status"> & {
      onDeleteCard: (cardId: number) => void;
      setCardTitle: React.Dispatch<React.SetStateAction<string>>;
      setCardDescription: React.Dispatch<React.SetStateAction<string>>;
      setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
      setCardId: React.Dispatch<React.SetStateAction<number>>;
      setCurrentStatus: React.Dispatch<React.SetStateAction<Status | null>>;
      status: string | null;
      statusId: number | null;
    };

const Card: React.FC<CardProps> = (props) => {
  const {
    title,
    description,
    id,
    onDeleteCard,
    setCardDescription,
    setCardTitle,
    setShowEditDialog,
    setCardId,
    setCurrentStatus,
    status,
    statusId,
  } = props;

  const onClickAction = () => {
    setCardDescription(description);
    setCardTitle(title);
    setCardId(id);

    setCurrentStatus(
      status === null
        ? null
        : {
            id: statusId || 0,
            name: status,
          }
    );

    setShowEditDialog(true);
  };
  return (
    <CardMaterial
      variant="outlined"
      sx={{
        padding: "8px",
        marginBottom: "8px",
      }}
    >
      <CardActionArea onClick={onClickAction}>
        <CardContent>
          <Typography
            variant="h5"
            align="left"
            color="textPrimary"
            style={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography variant="h6" align="left" color="textPrimary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={() => onDeleteCard(id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </CardMaterial>
  );
};

export default Card;
