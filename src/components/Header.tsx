import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Header, Left } from "native-base";
import DefaultTheme from "../constants/theme/default";

const HeaderContainer = ({
  title = "",
  rightComponent = <View />,
}) => {
  return (
    <Header noShadow style={styles.headerContainer}>
      <Left style={styles.row}>
        <View style={styles.content}>
          <Text
            adjustsFontSizeToFit={true}
            style={styles.headerTitle}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
      </Left>
      <View>{rightComponent}</View>
    </Header>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: DefaultTheme.primary,
    borderBottomWidth: 0,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    borderBottomColor: DefaultTheme.white,
    borderBottomWidth: 2,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 19,
    color: DefaultTheme.white,
    fontWeight: '700',
  },
});

export default HeaderContainer;
