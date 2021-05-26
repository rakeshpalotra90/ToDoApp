import React, { useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import moment from "moment";

import DefaultTheme from "../constants/theme/default";
import Svgs from "../constants/svgs";

import { Task } from "../hooks/useTasks";

function getTagBackgroung(title: string) {
  switch (title) {
    case "Celebration":
        return DefaultTheme.tag15;
    case "Chores":
      return DefaultTheme.tag18;
    default:
      return DefaultTheme.tag17;
  }
}

const TaskItem = ({
  data,
  toggleTodo,
}: {
  data: Task;
  toggleTodo: (id: number) => void;
}) => {
  return useMemo(
    () => (
      <View style={styles.itemContainer}>
        <View style={styles.itemRow}>
          <View style={styles.itemColumnContainer}>
            <View style={styles.itemRowContainer}>
              {data.priority && (
                <View style={styles.itemIconLeftContainer}>
                  <Svgs.Priority />
                </View>
              )}
              <View style={styles.itemTitleContent}>
                <Text
                  style={[
                    styles.itemTitle,
                    data.completed && styles.lineThrough,
                  ]}
                >
                  {data.text}
                </Text>
              </View>
            </View>
            {data.timeStamp && (
              <View style={styles.itemRowContainer}>
                <View style={styles.itemIconTextContainer}>
                  <Svgs.Date />
                  <Text style={styles.itemIconText}>
                    {moment(data.timeStamp).format("DD MMM")}
                  </Text>
                </View>
                <View style={styles.itemIconTextContainer}>
                  <Svgs.Time />
                  <Text style={styles.itemIconText}>
                    {moment(data.timeStamp).format("HH.mm")}
                  </Text>
                </View>
                <View style={styles.itemIconTextContainer}>
                  <Svgs.Comment />
                  <Text style={styles.itemIconText}>{data.comment}</Text>
                </View>
                {data.repeat && (
                  <View style={styles.itemIconTextContainer}>
                    <Svgs.Repeat />
                  </View>
                )}
              </View>
            )}
            {(data.tags ?? []).length > 0 && (
              <View key="tags" style={styles.itemRowContainer}>
                {data.tags.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={[
                        styles.itemTagContainer,
                        { backgroundColor: getTagBackgroung(item.title) },
                      ]}
                    >
                      <Text style={styles.itemTagText}>{item.title}</Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
          <View style={styles.itemIconRightContainer}>
            <TouchableOpacity key={'completedId'} onPress={() => toggleTodo(data.id)}>
              {data.completed ? <Svgs.RadioActive /> : <Svgs.RadioInactive />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ),
    [data]
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 5,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderColor: DefaultTheme.grey20,
    borderWidth: 1,
    borderRadius: 9,
  },
  itemRow: {
    flexDirection: "row",
  },
  itemRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemTitleContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    lineHeight: 20,
    color: DefaultTheme.black,
    fontWeight: "700",
  },
  lineThrough: {
    textDecorationLine: "line-through",
  },
  itemIconLeftContainer: {
    paddingRight: 5,
  },
  itemIconRightContainer: {
    paddingLeft: 5,
  },
  itemColumnContainer: {
    flex: 1,
  },
  itemIconTextContainer: {
    marginTop: 8,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  itemIconText: {
    fontSize: 13,
    color: DefaultTheme.grey90,
    fontWeight: "400",
    paddingLeft: 4,
  },
  itemTagContainer: {
    marginTop: 8,
    marginRight: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: DefaultTheme.tag15,
  },
  itemTagText: {
    fontSize: 12,
    color: DefaultTheme.black,
    fontWeight: "400",
  },
});

export default TaskItem;
