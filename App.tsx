import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/client";
import Compose from "./src/utils/Compose";
import { ProvideTasks } from "./src/hooks/useTasks";
import { AppNavigator } from "./src/navigation";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Compose components={[ProvideTasks]}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <AppNavigator />
        </View>
      </Compose>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;