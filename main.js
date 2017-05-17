import Expo from 'expo';
import React from 'react';
import {
  Text, View, TextInput,
  Button, StatusBar, StyleSheet,
} from 'react-native';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      newTodo: '',
      todos: [],
    };

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.renderTodos = this.renderTodos.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  handleChangeText(text) {
    this.setState({
      newTodo: text,
    });
  }

  handlePress() {
    const { newTodo, todos } = this.state;

    const updatedTodos = todos.concat([newTodo]);

    this.setState({
      todos: updatedTodos,
      newTodo: '',
    });
  }

  renderTodos() {
    const { todos } = this.state;

    return todos.map((todo, index) => (
      <Text
        key={todo + index}
        style={styles.todo}
      >
        {todo}
      </Text>
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          FIREBASE TO DO LIST
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => this.handleChangeText(text)}
            value={this.state.newTodo}
            placeholder={'Enter a new TO DO'}
          />
        </View>

        <Button
          title={'Add TO DO'}
          onPress={this.handlePress}
        />

        {this.renderTodos()}

        <StatusBar barStyle={'dark-content'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    paddingTop: 40,
  },
  title: {
    margin: 24,
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    color: '#34495e',
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: 300,
    borderWidth: 2,
    borderColor: '#ddd',
    margin: 10,
    padding: 15,
  },
  todo: {
    color: '#444',
    fontSize: 16,
    margin: 2,
  },
});

Expo.registerRootComponent(App);
