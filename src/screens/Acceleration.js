import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  AsyncStorage,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import axios, {AxiosResponse} from 'axios';

import AccelerationItem from '../components/AccelerationItem';
import '../typedef';

export default class Acceleration extends Component {
  /**
   *@type {{user: UserModel|null, accelerations: AccelerationModel, loading: boolean}} state
   */
  state = {
    user: null,
    accelerations: [],
    loading: true,
  };

  async componentDidMount() {
    await Promise.all([this.loadUser(), this.getAccelerations()]);
    this.setState({loading: false});
  }
  /**
   * @returns {Promise}
   */
  async loadUser() {
    const user = await AsyncStorage.getItem('user');
    if (user && user.length) {
      this.setState({user: JSON.parse(user)});
    }
  }

  /**
   * @returns {Promise}
   */
  async getAccelerations() {
    const url = 'https://api.codenation.dev/v1/acceleration';
    /**
     * @type {AxiosResponse<AccelerationModel[]>}
     */
    const response = await axios.get(url);
    if (response && response.data) {
      this.setState({accelerations: response.data});
    }
  }

  render() {
    const user = this.state.user;
    const userImage = user ? user.picture : null;
    const accelerations = this.state.accelerations;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.headerImage}
            source={{
              uri:
                'https://forum.codenation.com.br/uploads/default/original/2X/2/2d2d2a9469f0171e7df2c4ee97f70c555e431e76.png',
            }}
          />
          {userImage && (
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Profile')}
              className="user-image-btn">
              <Image
                style={styles.userImage}
                source={{
                  uri: userImage,
                }}
              />
            </TouchableHighlight>
          )}
        </View>

        {this.state.loading && (
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color="#7800ff" />
          </View>
        )}
        {!this.state.loading && (
          <View>
            <Text style={styles.title}>Acelerações</Text>
            <FlatList
              data={accelerations}
              keyExtractor={item => item.slug}
              renderItem={({item, index}) => <AccelerationItem item={item} />}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#7800ff',
    borderBottomWidth: 2,
    padding: 16,
    paddingTop: 55,
  },
  headerImage: {
    height: 45,
    width: 250,
  },
  userImage: {
    height: 45,
    width: 45,
    borderRadius: 100,
    alignContent: 'flex-end',
  },
  languageContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: '#7800ff',
    fontSize: 30,
    padding: 16,
  },
});
