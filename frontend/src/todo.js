import React from "react";
import { Input, List, Icon, DatePicker } from "antd";

import "antd/dist/antd.css";

export default class Todo extends React.Component {
  // --- snip ---

  handlePressEnter = e => {
    // Create a todo object containing its index, content,
    // as well as an empty date
    const todo = {
      index: this.state.todos.length,
      content: e.target.value,
      date: null,
      dateString: ""
    };

    // Add the new todo to our array


    // Clear input
    e.target.value = "";
  };

  setDate = (index, date, dateString) => {
    // Set the date of the given todo
    let newTodos = [...this.state.todos];
    newTodos[index].date = date;
    newTodos[index].dateString = dateString;

    // Initialize the state
    this.setState({
      todos: newTodos
    });
  };

  render() {
    return (
      <div className="todoContainer">
        <h1>TODO App</h1>

        <Input
          placeholder="What needs to be done?"
          onPressEnter={this.handlePressEnter}
        />

        <List
          locale={{ emptyText: "No todo items" }}
          renderItem={item => (
            <TodoItem
              todo={item}
              removeTodo={this.removeTodo}
              setDate={this.setDate}
            />
          )}
        />
      </div>
    );
  }
}

class TodoItem extends React.Component {
  remove = () => {
    // Remove this TodoItem
    this.props.removeTodo(this.props.todo.index);
  };

  handleDateChange = (date, dateString) => {
    // Update the date when changed
    this.props.setDate(this.props.todo.index, date, dateString);
  }

  render() {
    return (
      <List.Item
        actions={[
          <DatePicker
            format="MM/DD/YYYY"
            onChange={this.handleDateChange}
            value={this.props.todo.date}
          />,
          <Icon
            type="close-circle"
            theme="filled"
            onClick={this.remove}
          />
        ]}
      >
        {this.props.todo.content}
      </List.Item>
    );
  }
}