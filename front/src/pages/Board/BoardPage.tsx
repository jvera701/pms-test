import Board from "../../components/Board";
import DialogCard from "../../components/DialogCard";
import DialogStatus from "../../components/DialogStatus";
import DialogEditCard from "../../components/DialogEditCard";
import { Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UserAtom } from "../../store/userAtom";
import {
  getCards,
  getAllStatuses,
  addCard,
  addStatus,
  deleteCard,
  editCard,
} from "../../api/api";
import type { Card, Status } from "../../api/api";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";

function BoardPage() {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [showError, setShowError] = useState(false);
  //TODO: show error
  const [openCardDialog, setOpenCardDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<number | null>(null);

  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<Status | null>(null);

  const [cardId, setCardId] = useState(0);

  const user = useAtomValue(UserAtom);
  const navigate = useNavigate();

  const getAllCards = async () => {
    const newCards = await getCards(user.token, user.project?.id);
    if ("error" in newCards) {
      setShowError(true);
      return;
    }
    setCards(newCards);
  };
  const getStatuses = async () => {
    const statuses = await getAllStatuses(user.token, user.project?.id);
    if ("error" in statuses) {
      setShowError(true);
      return;
    }
    setStatuses(statuses);
  };

  const onSubmitDialog = async (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());

    const newCard = await addCard(
      user.token,
      user.project?.id,
      formJson.title,
      formJson.description,
      dialogStatus ? dialogStatus : undefined
    );
    if ("error" in newCard) {
      setShowError(true);
      return;
    }
    setCards((prevCard) => [...prevCard, newCard]);
    setOpenCardDialog(false);
  };

  const onSubmitStatusDialog = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const newStatus = await addStatus(
      user.token,
      user.project?.id,
      formJson.status
    );
    if ("error" in newStatus) {
      setShowError(true);
      return;
    }
    setStatuses((prevStatus) => [...prevStatus, newStatus]);
    setOpenStatusDialog(false);
  };

  const onSubmitEditDialog = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const editedCard = await editCard(
      user.token,
      user.project?.id,
      cardId,
      formJson.title,
      formJson.description,
      currentStatus === null ? undefined : currentStatus.id
    );
    if ("error" in editedCard) {
      setShowError(true);
      return;
    }
    setCards((prevCards) =>
      prevCards.map((prevCard) => {
        if (prevCard.id !== editedCard.id) {
          return prevCard;
        }
        return editedCard;
      })
    );
    setShowEditDialog(false);
  };

  const onDeleteCard = async (cardId: number) => {
    await deleteCard(user.token, user.project?.id, cardId);
    setCards((prevCards) => {
      return prevCards.filter((card) => card.id !== cardId);
    });
  };

  useEffect(
    () => {
      getAllCards();
      getStatuses();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <Container style={{ padding: "20px", width: "100vw" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => navigate("/projects")}
          variant="contained"
          size="medium"
          sx={{
            height: 40,
          }}
        >
          Go back
        </Button>
        <Typography
          variant="h2"
          style={{ paddingBottom: 20 }}
          color="textPrimary"
        >
          {user.project?.name}
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpenStatusDialog(true)}
          sx={{
            height: 40,
          }}
        >
          Add new status
        </Button>
      </div>
      <Board
        statuses={statuses}
        cards={cards}
        setDialogStatus={setDialogStatus}
        setOpenCardDialog={setOpenCardDialog}
        onDeleteCard={onDeleteCard}
        setCardTitle={setCardTitle}
        setCardDescription={setCardDescription}
        setShowEditDialog={setShowEditDialog}
        setCardId={setCardId}
        setCurrentStatus={setCurrentStatus}
      />
      <DialogCard
        isOpen={openCardDialog}
        setIsOpen={setOpenCardDialog}
        onSubmit={onSubmitDialog}
      />
      <DialogStatus
        isOpen={openStatusDialog}
        setIsOpen={setOpenStatusDialog}
        onSubmit={onSubmitStatusDialog}
      />
      <DialogEditCard
        isOpen={showEditDialog}
        setIsOpen={setShowEditDialog}
        onSubmit={onSubmitEditDialog}
        title={cardTitle}
        setTitle={setCardTitle}
        description={cardDescription}
        setDescription={setCardDescription}
        statusList={statuses}
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
      />
    </Container>
  );
}

export default BoardPage;
