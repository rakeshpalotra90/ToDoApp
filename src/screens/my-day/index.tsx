import React from "react";
import { StyleSheet, View } from "react-native";
import { Container } from "native-base";
import Header from "../../components/Header";
import DefaultTheme from "../../constants/theme/default";

export default function MyDay() {
  return (
    <Container style={styles.container}>
      <Header
        title="My Day"
      />
      <View style={styles.content} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.primary,
  },
  content: {
    flex: 1,
    backgroundColor: DefaultTheme.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
});
