import React from "react";
import { FlatList, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Container } from "native-base";
import Header from "../../components/Header";
import TaskItem from "../../components/TaskItem";
import DefaultTheme from "../../constants/theme/default";
import Svgs from "../../constants/svgs";

import { Task, useTasks } from "../../hooks/useTasks";

export default function Tasks() {
  const { tasks, loading, toggleTodo } = useTasks()!;

  const renderItem = ({ item }: { item: Task }) => {
    return <TaskItem data={item} toggleTodo={toggleTodo} />;
  };

  return (
    <Container style={styles.container}>
      <Header
        title="Tasks"
        rightComponent={
          <View style={styles.headerRightIcons}>
            <View style={styles.iconContainer}>
              <Svgs.Search />
            </View>
            <View style={styles.iconContainer}>
              <Svgs.Filter />
            </View>
            <View style={styles.iconContainer}>
              <Svgs.User />
            </View>
            <View style={styles.iconContainer}>
              <Svgs.Add />
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          </View>
        }
      />
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator style={{ marginVertical: 40 }} />
        ) : (
          <FlatList
            data={tasks}
            contentContainerStyle={styles.list}
            renderItem={renderItem}
            keyExtractor={(_, index) => `${index}`}
          />
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.primary,
  },
  headerRightIcons: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
  content: {
    flex: 1,
    backgroundColor: DefaultTheme.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  list: {
    padding: 10,
  },
  badgeContainer: {
    backgroundColor: DefaultTheme.home,
    padding: 2,
    borderRadius: 20,
    position: 'absolute',
    right: 0,
    top: -8,
  },
  badgeText: {
    color: DefaultTheme.white,
    fontSize: 10,
    fontWeight: "400",
    paddingHorizontal: 3,
  }
});
