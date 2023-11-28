import React, { useContext } from "react";
import SearchIcon from "../../assets/icons/svg/SearchIcon";
import { Container, SearchTextInput } from "./styles";
import { CommtContext } from "../../context/Context";
import { setSearchValue } from "../../context/actions/appActions";

const SearchInput = () => {
  const {
    state: {
      app: { searchValue },
    },
    dispatch,
  } = useContext(CommtContext);

  return (
    <Container>
      <SearchIcon />
      <SearchTextInput
        value={searchValue}
        onChangeText={(text: string) => setSearchValue(text)(dispatch)}
        placeholder="Search for a user or message..."
      />
    </Container>
  );
};
export default SearchInput;
