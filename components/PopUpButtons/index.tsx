import React, { useState } from "react";
import { Modal } from "react-native";
import { Backdrop, Container, ButtonCard, Title } from "./styles";
import Dots from "../../assets/icons/svg/Dots";

export interface PopUpButtonsProps {
  popUpButtons?: Array<{
    icon?: React.JSX.Element;
    title: string;
    onPress: () => void;
  }>;
}

const PopUpButtons = ({ popUpButtons }: PopUpButtonsProps) => {
  const [isOpenPopUp, setIsOpenPopUp] = useState<boolean>(false);
  const togglePopUpButtons = () => setIsOpenPopUp(!isOpenPopUp);

  return (
    <>
      <Dots onPress={togglePopUpButtons} />
      <Modal
        visible={isOpenPopUp}
        animationType="fade"
        transparent={true}
        onRequestClose={togglePopUpButtons}>
        <Backdrop onPress={togglePopUpButtons}>
          <Container>
            {popUpButtons?.map((item, index) => (
              <ButtonCard onPress={item.onPress} key={index}>
                {item.icon}
                <Title hasIcon={!!item.icon}>{item.title}</Title>
              </ButtonCard>
            ))}
          </Container>
        </Backdrop>
      </Modal>
    </>
  );
};

export default PopUpButtons;
