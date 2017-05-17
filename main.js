import Expo from 'expo';
import React from 'react';
import {
  Text, View, TextInput,
  Button, StatusBar, ScrollView,
  Image, StyleSheet,
} from 'react-native';
import firebase from 'firebase';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      newTodo: '',
      todos: [],
      loading: true,
    };

    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyDtwnTCrh9Ks-oMqCB5W38_cCMU_O-aCeE',
      authDomain: 'fir-sample-fa817.firebaseapp.com',
      databaseURL: 'https://fir-sample-fa817.firebaseio.com',
      projectId: 'fir-sample-fa817',
      storageBucket: 'fir-sample-fa817.appspot.com',
      messagingSenderId: '449013032578',
    };
    firebase.initializeApp(config);

    // Get a reference to the database service
    this.firebaseRef = firebase.database().ref('todos');

    this.getTodos = this.getTodos.bind(this);
    this.saveTodos = this.saveTodos.bind(this);

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.renderTodos = this.renderTodos.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos() {
    this.firebaseRef.on('value', (snapshot) => {
      const todos = snapshot.val();

      this.setState({
        todos,
        loading: false,
      });
    });
  }

  saveTodos(todos) {
    this.firebaseRef.set(todos);
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
    }, () => this.saveTodos(updatedTodos));
  }

  renderTodos() {
    const { todos } = this.state;

    return todos.map((todo, index) => (
      <Text
        key={todo + index}
        style={styles.todo}
      >
        {index + 1}) {todo}
      </Text>
    ));
  }

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: 'http://i.imgur.com/5NOt0wv.png' }}
        />

        <Text style={styles.title}>
          FIREBASE TO DO LIST
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => this.handleChangeText(text)}
            value={this.state.newTodo}
            placeholder={'Enter a new TO DO'}
            autoCorrect={false}
            autoCapitalize={'none'}
            underlineColorAndroid={'transparent'}
          />
        </View>

        <Button
          title={'Add TO DO'}
          onPress={this.handlePress}
          color={'#e67e22'}
        />

        <ScrollView style={styles.todosContainer}>
          { loading ?
            <Text>LOADING TODO LIST...</Text>
            :
            this.renderTodos()
          }
        </ScrollView>

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
  image: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    color: '#34495e',
    marginTop: 10,
    marginBottom: 20,
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
  todosContainer: {
    backgroundColor: '#DDD',
    alignSelf: 'stretch',
    padding: 20,
  },
  todo: {
    color: '#444',
    fontSize: 14,
    fontWeight: '700',
    fontStyle: 'italic',
    marginBottom: 10,
  },
});

Expo.registerRootComponent(App);
