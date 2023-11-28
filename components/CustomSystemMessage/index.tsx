import React from "react";
import {
  Container,
  Time,
  Button,
  ButtonTitle,
  ImageMessage,
  TextContainer,
  TextMessage,
} from "./styles";
import { SystemMessageProps } from "react-native-gifted-chat";
import { ICustomMessage } from "../../context/reducers/messagesReducer";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const CustomSystemMessage = (props: SystemMessageProps<ICustomMessage>) => {
  const { currentMessage } = props;

  const renderContent = () => {
    if (currentMessage?.type === "button") {
      return (
        <Button onPress={currentMessage.onPress}>
          <ButtonTitle>{currentMessage.text}</ButtonTitle>
        </Button>
      );
    } else if (currentMessage?.type === "image") {
      return (
        currentMessage.image && (
          <ImageMessage source={{ uri: currentMessage.image }} />
        )
      );
    } else {
      return (
        <TextContainer>
          <TextMessage>{currentMessage?.text}</TextMessage>
        </TextContainer>
      );
    }
  };

  return (
    <Container>
      {renderContent()}
      <Time>{dayjs(currentMessage?.createdAt).format("LT")}</Time>
    </Container>
  );
};

export default CustomSystemMessage;
