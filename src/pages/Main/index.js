import React, { Component } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  InputUser,
  SubmitButton,
  ListUser,
  User,
  UserAvatar,
  UserName,
  UserBio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  // use async cause we need load the data to render
  async componentDidMount() {
    console.tron.log(this.props);
    const users = await AsyncStorage.getItem('users');
    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  // don't need be async
  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true });

    const res = await api.get(`/users/${newUser}`);

    const selectedData = {
      name: res.data.name,
      login: res.data.login,
      bio: res.data.bio,
      avatar: res.data.avatar_url,
    };

    this.setState({
      users: [...users, selectedData],
      newUser: '',
      loading: false,
    });

    Keyboard.dismiss(); // close keyboard after submit
  };

  render() {
    const { users, newUser, loading } = this.state;

    return (
      <Container>
        <Form>
          <InputUser
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="add User"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>

        <ListUser
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <UserAvatar source={{ uri: item.avatar }} />
              <UserName>{item.name}</UserName>
              <UserBio>{item.bio}</UserBio>

              <ProfileButton onPress={() => {}}>
                <ProfileButtonText>View Profile</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
Main.navigationOptions = {
  title: 'Users',
};
