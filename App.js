// import * as React from "react";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, BackHandler } from "react-native";
import * as NavigationBarButtonStyle from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";

export default function App() {
  const WEBVIEW = useRef();
  const [webViewcanGoBack, setWebViewcanGoBack] = useState(false);
  useEffect(() => {
    NavigationBarButtonStyle.setBackgroundColorAsync("#000");
    NavigationBarButtonStyle.setButtonStyleAsync("light");
  }, []);
  useEffect(() => {
    const backAction = () => {
      if (webViewcanGoBack) {
        WEBVIEW.current.goBack();
        return true;
      } else {
        return false;
      }
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [webViewcanGoBack]);
  return (
    <>
      <StatusBar style="light" />
      <WebView
        style={styles.container}
        ref={WEBVIEW}
        // originWhitelist={["*"]}
        source={{ uri: "http://192.168.1.236:3000" }}
        onLoadProgress={({ nativeEvent }) => {
          setWebViewcanGoBack(nativeEvent.canGoBack);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
