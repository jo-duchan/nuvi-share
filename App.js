import * as React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  return (
    <WebView
      style={styles.container}
      originWhitelist={["*"]}
      source={{ uri: "http://192.168.1.236:3000" }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
