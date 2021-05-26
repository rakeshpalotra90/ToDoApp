import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MyDay from "../screens/my-day";
import Calendar from "../screens/calendar";
import Tasks from "../screens/tasks";
import Lists from "../screens/lists";

import TabBottomBar from "../components/TabBottomBar";
import DefaultTheme from "../constants/theme/default";

const Stack = createStackNavigator();

const MyDayStack = () => {
  return (
    <Stack.Navigator initialRouteName="MyDay" headerMode="none">
      <Stack.Screen name="MyDay" component={MyDay} />
    </Stack.Navigator>
  );
};

const CalendarStack = () => {
  return (
    <Stack.Navigator initialRouteName="Calendar" headerMode="none">
      <Stack.Screen name="Calendar" component={Calendar} />
    </Stack.Navigator>
  );
};

const TasksStack = () => {
  return (
    <Stack.Navigator initialRouteName="Tasks" headerMode="none">
      <Stack.Screen name="Tasks" component={Tasks} />
    </Stack.Navigator>
  );
};

const ListsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Lists" headerMode="none">
      <Stack.Screen name="Lists" component={Lists} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Tasks"
      tabBarOptions={{
        activeTintColor: DefaultTheme.primary,
        inactiveTintColor: DefaultTheme.grey80,
        keyboardHidesTabBar: true,
      }}
      tabBar={(props) => <TabBottomBar {...props} />}
    >
      <Tab.Screen
        name="Myday"
        component={MyDayStack}
        options={{
          tabBarLabel: "My Day",
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          tabBarLabel: "Calendar",
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksStack}
        options={{
          tabBarLabel: "Tasks",
        }}
      />
      <Tab.Screen
        name="Lists"
        component={ListsStack}
        options={{
          tabBarLabel: "Lists",
        }}
      />
    </Tab.Navigator>
  );
}
