import React from "react";
import { Title, Container } from "./styles";
import PopUpButtons, { PopUpButtonsProps } from "../PopUpButtons";

const MessagesHeader = ({ popUpButtons }: PopUpButtonsProps) => {
  return (
    <Container>
      <Title>Messages</Title>
      {popUpButtons && <PopUpButtons popUpButtons={popUpButtons} />}
    </Container>
  );
};

export default MessagesHeader;
