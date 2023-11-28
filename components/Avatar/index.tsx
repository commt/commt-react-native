import React, { useContext } from "react";
import {
  AvatarContainer,
  UserName,
  UserAvatar,
  OnlineIndicator,
  Container,
} from "./styles";
import { CommtContext } from "../../context/Context";
import { IndicatorProps } from "../../context/reducers/appReducer";

type AvatarProps = {
  uri: string | undefined;
  userName?: string;
  width?: number;
  height?: number;
  online: boolean;
  onPress?: () => void;
};

const Avatar = ({
  uri,
  userName,
  width = 48,
  height = 48,
  online,
  onPress,
}: AvatarProps) => {
  const {
    state: {
      app: {
        configs: { indicators },
      },
    },
  } = useContext(CommtContext);

  return (
    <Container>
      {/* // TODO: Implement routing to another screen */}
      <AvatarContainer onPress={onPress}>
        <UserAvatar source={{ uri }} width={width} height={height} />
        {indicators.includes(IndicatorProps.ONLINE) && online && (
          <OnlineIndicator />
        )}
      </AvatarContainer>
      {userName && (
        <UserName
          online={indicators.includes(IndicatorProps.ONLINE) ? online : false}>
          {userName}
        </UserName>
      )}
    </Container>
  );
};

export default Avatar;
