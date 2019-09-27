import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  AsyncStorage,
} from 'react-native';
import axios, {AxiosResponse} from 'axios';

import '../typedef';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
  };

  async componentDidMount() {
    const user = await AsyncStorage.getItem('user');
    if (user && user.length) {
      this.props.navigation.navigate('Acceleration');
    }
  }

  async submit() {
    const {email, password} = this.state;
    this.setState({isLoading: true});
    try {
      const respose = await this.login(email, password);

      if (respose.data && respose.data.token) {
        await AsyncStorage.setItem('user', JSON.stringify(respose.data));
        this.props.navigation.navigate('Acceleration');
      } else {
        Alert.alert('Erro ao fazer login');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao fazer login');
    }
    this.setState({isLoading: false});
  }

  /**
   * Faz o login na conta do usuário
   *
   * @param {string} email
   * @param {string} password
   *
   * @returns {Promise<AxiosResponse<UserModel>>}
   */
  async login(email, password) {
    const url = 'https://api.codenation.dev/v1/user/auth';
    const params = {
      email,
      password,
    };
    return await axios.post(url, params);
  }

  emailTest(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  render() {
    const {email, password, isLoading} = this.state;
    let btnDisable = true;
    if (
      !isLoading &&
      password.length &&
      email.length &&
      this.emailTest(email)
    ) {
      btnDisable = false;
    }

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
        </View>
        <Text style={styles.title}>Login</Text>
        <View style={styles.form}>
          <TextInput
            className="email-input"
            placeholder="Email"
            value={email}
            style={styles.input}
            autoCompleteType="email"
            keyboardType="email-address"
            onChangeText={value => {
              this.setState({email: value});
            }}
          />
          <TextInput
            className="password-input"
            placeholder="Password"
            value={password}
            style={styles.input}
            autoCompleteType="password"
            secureTextEntry={true}
            onChangeText={value => {
              this.setState({password: value});
            }}
          />
          <Button
            className="submit-login"
            title="Entrar"
            color="#7800ff"
            disabled={btnDisable}
            onPress={() => this.submit()}
          />
        </View>
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
  title: {
    color: '#7800ff',
    fontSize: 30,
    padding: 16,
  },
  form: {
    padding: 16,
  },
  input: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#CCC',
    marginBottom: 15,
  },
});
