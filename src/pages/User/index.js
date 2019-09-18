import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import {
  Container,
  Header,
  UserAvatar,
  UserName,
  UserBio,
  StarsList,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      stars: [],
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;

    const user = navigation.getParam('user');

    const res = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: res.data });
  }

  render() {
    const { stars } = this.state;
    const { navigation } = this.props;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <UserAvatar source={{ uri: user.avatar }} />
          <UserName>{user.name}</UserName>
          <UserBio>{user.bio}</UserBio>
        </Header>

        <StarsList
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
