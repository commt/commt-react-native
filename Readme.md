# COMMT: Chat Plugin for React Native

![npm](https://img.shields.io/npm/dw/%40commt%2Frn-sdk)
![npm](https://img.shields.io/npm/v/%40commt%2Frn-sdk)
![NPM](https://img.shields.io/npm/l/%40commt%2Frn-sdk?color=blue)


<p align="center">
<img src="./src/assets/images/react-native-logo.png" width="300" />
</p>
<br />

Welcome to Commt, a powerful chat plugin designed to seamlessly integrate secure and customizable chat functionalities into your React Native applications. Offering AES encryption as the default and end-to-end (E2E) support, Commt ensures a secure and reliable real-time communication experience for your users.

## Features
- Written in **TypeScript**
- Fully customizable pre-build components
- Multiple projects support with only one client configuration
- AES encryption as default and end-to-end (E2E) support
- Webhooks usage flexibility
- Customizable and easy to manage system messages
- `Typing`, `user online` and `message read` indicators
- Emoji keyboard and all emoji types support
- Hooks usage flexibility

## Installation

- NPM: `npm i -S @commt/rn-sdk`
- Yarn: `yarn add @commt/rn-sdk`

For detailed installation instructions and configuration options, please refer to our [documentation](https://commt.co/doc/react-native#installation).

## Usage

Get started with Commt in just a few steps:

- Initialize Commt: Import the Provider module and set up the chat plugin in your application by wrap your app with it.
- Customize UI: Tailor the UI elements to match your app's aesthetics. Trigger the `useTheme` hook by passing theme values and make the components custom.
- Implement Secure Chat: Utilize the secure and encrypted chat functionalities.

Check out our [documentation](https://commt.co/doc/react-native#introduction) for comprehensive usage examples and API reference.

## Example

You can get client configs info from [Commt Dashboard](https://dashboard.commt.co)

**App.tsx**
```
import CommtProvider from "@commt/rn-sdk";
import { useInitiate } from "@commt/rn-sdk/hooks";

const ClientConfig = {
  apiKey: "123456789?",
  projectId: "0987654321?",
  secret: "123456789018A_7JzPo?23F+4y#erPL" // Must to be 16, 24 or 32 bytes
};

function App(): JSX.Element {
  useInitiate(ClientConfig); // Initiate a client

  return (
    <CommtProvider>
      {/* All your ThemeProvider, NavigationContainer, etc. */}
    </CommtProvider>
  );
}
```

**Home.tsx**
```
import { useSetMessages, useSetRooms, useSetUsers } from "@commt/rn-sdk/hooks";

const Home = () => {
  // ...

  useEffect(async () => {
    await useSetUsers(usersArray); // Set users for commt
    await useSetRooms(roomsArray); // Set rooms for commt
    useSetMessages(messagesArray); // Set messages for commt
  }, [usersArray, roomsArray, messagesArray]);

  // ...

  return (
    <SafeAreaView>
      <Text
        style={styles.buttonText}
        onPress={() => navigation.navigate("Messages")}>
        Go Messages
      </Text>
    </SafeAreaView>
  );
};
```
**Messages-List.tsx**
```
import {
  QuickChat,
  MessageList,
  SearchInput,
  MessagesHeader
} from "@commt/rn-sdk/components";

const Messages = () => {
  // ...

  return (
    <Container>
      <MessagesHeader />
      <SearchInput />
      <InnerContainer>
        <QuickChat onPress={navigateToChat} />
        <MessageList onPress={navigateToChat} />
      </InnerContainer>
    </Container>
  );
};
```
<p align="center">
<img src="https://commt.co/images/media/Messages-List-Screen.png" width="200" />
</p>

**Chat.tsx**
```
import { ChatHeader, Chat } from "@commt/rn-sdk/components";

const Chats = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Chats">>();
  const roomId = route.params.roomId;
  const participants = route.params.participants;

  return (
    <Container>
      <ChatHeader roomId={roomId} participants={participants} />
      <Chat
        roomId={roomId}
        participants={participants}
        loadMoreMessages={YOUR_LOAD_MORE_MESSAGES_ACTION}
        />
    </Container>
  );
};
```

<p align="center">
<img src="https://commt.co/images/media/Chat-Screen.png" width="200" />
</p>

## Compatibility

Commt is compatible with:

- [React Native](https://commt.co/doc#react-native)
- [ReactJS](https://commt.co/doc#reactjs)
- [NodeJS](https://commt.co/doc#nodejs)

## Support and Feedback

For any questions, feedback or issues, feel free to reach out to us via <contact@commt.co>.

## License

[MIT](https://github.com/commt/commt-rn/blob/master/LICENSE)

## Contributors

- Mesut KILINCASLAN [mkilincaslan](https://github.com/mkilincaslan)
- Sedanur Akçil [sedanurakcil](https://github.com/sedanurakcil)