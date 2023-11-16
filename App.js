import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, BackHandler } from "react-native";
import * as NavigationBarButtonStyle from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";
import * as SplashScreen from "expo-splash-screen";
import { Camera } from "expo-camera";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const WEBVIEW = useRef();
  const [webViewcanGoBack, setWebViewcanGoBack] = useState(false);
  const [_, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    NavigationBarButtonStyle.setBackgroundColorAsync("#000");
    NavigationBarButtonStyle.setButtonStyleAsync("light");
    requestPermission();

    SplashScreen.hideAsync();
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
        originWhitelist={["*"]}
        source={{ uri: "https://nuvi-app-share.wacky.kr/onboarding" }}
        onLoadProgress={({ nativeEvent }) => {
          setWebViewcanGoBack(nativeEvent.canGoBack);
        }}
        javaScriptEnabled
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        javaScriptEnabledAndroid
        useWebkit
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
