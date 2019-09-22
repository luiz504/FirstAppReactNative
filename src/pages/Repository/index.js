import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Browser } from './styles';

export default class Repository extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      repoUrl: {},
      loading: true,
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;

    const starredRepo = navigation.getParam('repository');

    this.setState({
      repoUrl: starredRepo,
    });
  };

  hideSpinner = () => {
    this.setState({ loading: false });
  };

  render() {
    const { repoUrl, loading } = this.state;

    return (
      <>
        <Browser
          source={{ uri: repoUrl.html_url }}
          onLoad={() => this.hideSpinner()}
        />
        {loading && <ActivityIndicator size={60} color="#7159c1" />}
      </>
    );
  }
}
