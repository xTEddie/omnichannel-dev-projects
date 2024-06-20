/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { OmnichannelChatSDK } from '@microsoft/omnichannel-chat-sdk';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const { AzureLogger, setLogLevel } = require("@azure/logger");

function App(): React.JSX.Element {
  const [chatSDK, setChatSDK] = useState();

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    console.log("@azure/communication-common");
    console.log(require('@azure/communication-common/package.json').version);
    console.log("@azure/communication-chat");
    console.log(require('@azure/communication-chat/package.json').version);
    console.log("@azure/communication-signaling");
    console.log(require('@azure/communication-signaling/package.json').version);
  }, []);

  useEffect(() => {
    const debug = () => {
      setLogLevel("verbose");

      AzureLogger.log = (...args: any[]) => {
        console.log("[Azure][Log][Start]");
        console.log(...args);
        console.log("[Azure][Log][End]");
      };
    }

    const init = async () => {
      console.log("[init]");

      const omnichannelConfig = {
        orgId: '',
        orgUrl: '',
        widgetId: ''
      };

      const chatSDK = new OmnichannelChatSDK(omnichannelConfig);
      setChatSDK(chatSDK as any);

      // chatSDK.setDebug(true);
      await chatSDK.initialize();
    }

    // debug();
    init();
  }, []);

  const startChat = useCallback(async () => {
    console.log("[startChat]");
    await (chatSDK as any).startChat();

    (chatSDK as any).onNewMessage((message: any) => {
      console.log("New Message");
      console.log(message);
    })

  }, [chatSDK]);

  const sendMessage = useCallback(async () => {
    console.log("[sendMessage]");
    await (chatSDK as any).sendMessage({
      content: "hi"
    });
  }, [chatSDK]);

  const endChat = useCallback(async () => {
    console.log("[endChat]");
    await (chatSDK as any).endChat();
  }, [chatSDK]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Button title="Start Chat" onPress={startChat}/>
        <Button title="Send Message" color={"green"} onPress={sendMessage}/>
        <Button title="End Chat" color={"red"} onPress={endChat}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default App;
