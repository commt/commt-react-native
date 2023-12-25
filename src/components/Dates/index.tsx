import React from "react";
import { Container, Line, DateText } from "./styles";
import { ICustomMessage } from "../../context/reducers/messagesReducer";
import { DayProps } from "react-native-gifted-chat";
import calendar from "dayjs/plugin/calendar";
import dayjs from "dayjs";
dayjs.extend(calendar);

const formattedDate = (time: Date | number | undefined) => {
  return dayjs(time).calendar(null, {
    sameDay: "[Today]", // The same day (Today)
    lastDay: "[Yesterday]", // The day before (Yesterday)
    lastWeek: "MMM DD, YYYY", // Last week (May 06, 2023)
    sameElse: "MMM DD, YYYY", // Everything else (May 06, 2023)
  });
};

const Dates = (props: DayProps<ICustomMessage>) => {
  // check the times of consecutive messages to compare if they are on the same day or not
  const isSameDay = dayjs(props.currentMessage?.createdAt).isSame(
    props.previousMessage?.createdAt,
    "day",
  );
  if (!isSameDay) {
    return (
      <Container>
        <Line pos="left" />
        <DateText>{formattedDate(props.currentMessage?.createdAt)}</DateText>
        <Line pos="right" />
      </Container>
    );
  }
};

export default Dates;
