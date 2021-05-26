import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Task } from "../hooks/useTasks";

import TaskItem from "./TaskItem";

const data: Task = {
  id: 1,
  text: "Call carpenter to fix kitchen pipe",
  completed: false,
  priority: true,
  repeat: false,
  tags: [
    {
      id: 1,
      title: "Home",
    },
    {
      id: 2,
      title: "Celebration",
    },
    {
      id: 3,
      title: "Chores",
    },
  ],
  timeStamp: null,
  comment: 0,
};

Enzyme.configure({ adapter: new Adapter() });

describe("<TaskItem />", () => {
  const toggleTodo = jest.fn();
  const wrapper = shallow(<TaskItem data={data} toggleTodo={toggleTodo} />);

  it("renders correctly", () => {
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it("should have tags", () => {
    const tag = wrapper.findWhere((n) => n.key() === `tags`);
    tag.contains("Home");
  });

  it("should call toggleTodo", () => {
    const button = wrapper.findWhere((n) => n.key() === `completedId`);
    button.simulate("press");
  });
});
