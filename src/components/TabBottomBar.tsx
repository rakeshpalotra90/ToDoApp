import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import DefaultTheme from "../constants/theme/default";
import Svgs from "../constants/svgs";

const { width } = Dimensions.get("window");
const bottomSpace = getBottomSpace();

const RenderIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  return useMemo(() => {
    switch (name) {
      case "Myday":
        return focused ? <Svgs.MyDayActive /> : <Svgs.MyDay />;
      case "Calendar":
        return focused ? <Svgs.CalendarActive /> : <Svgs.Calendar />;
      case "Tasks":
        return focused ? <Svgs.TasksActive /> : <Svgs.Tasks />;
      case "Lists":
        return focused ? <Svgs.ListsActive /> : <Svgs.Lists />;
      default:
        return focused ? <Svgs.ListsActive /> : <Svgs.Lists />;
    }
  }, [focused]);
};

const TabBottomBar = (props: any) => {
  const [position] = useState(
    new Animated.ValueXY({ x: (width / 4) * 2, y: 0 })
  );

  const animStyles = {
    position: "absolute",
    top: -1,
    left: 0,
    height: 4,
    width: width / 4,
    backgroundColor: DefaultTheme.primary,
    transform: position.getTranslateTransform(),
  };

  const navigate = (route: string) => {
    switch (route) {
      case "Myday":
        animate(0);
        break;
      case "Calendar":
        animate(width / 4);
        break;
      case "Tasks":
        animate((width / 4) * 2);
        break;
      case "Lists":
        animate((width / 4) * 3);
        break;
    }
  };

  const animate = (value: number) => {
    Animated.timing(position, {
      toValue: { x: value, y: 0 },
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return useMemo(
    () => (
      <Animated.View style={styles.container as any}>
        <Animated.View style={animStyles as any} />
        {props.state.routes.map((route: any, index: number) => {
          const { options } = props?.descriptors?.[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = props.state.index === index;

          const onPress = () => {
            const event = props.navigation.emit({
              type: "tabPress",
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              props.navigation.navigate(route.name);
            }
            navigate(route.name);
          };

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={onPress}
              style={styles.tabItem}
            >
              <RenderIcon name={route.name} focused={isFocused} />
              <Text
                adjustsFontSizeToFit={true}
                style={[
                  styles.tabText,
                  {
                    color: isFocused
                      ? DefaultTheme.primary
                      : DefaultTheme.grey80,
                  },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    ),
    [props]
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.white,
    elevation: 8,
    paddingBottom: bottomSpace > 0 ? getBottomSpace() : 10,
    flexDirection: "row",
    borderColor: DefaultTheme.grey20,
    borderTopWidth: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "400",
    marginTop: 5,
  },
});

export default TabBottomBar;
