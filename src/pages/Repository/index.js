import React, { Component } from 'react';
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
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;

    const starredRepo = navigation.getParam('repository');

    this.setState({
      repoUrl: starredRepo,
    });
  };

  render() {
    const { repoUrl } = this.state;

    return <Browser source={{ uri: repoUrl.html_url }} />;
  }
}
