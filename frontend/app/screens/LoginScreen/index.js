import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Alert } from '../../components/common/Alert';
import { Share } from '../../components/common/Share';
import { Switch } from '../../components/common/Switch';

import { getItem, setItem } from '../../utils/AsyncStorage';


import styles from './styles';
import ApiController from '../../controller/ApiController';

export default class LoginScreen extends Component {
  state = {
    hasAdultContent: false
  };
  constructor(props)
  {
    super(props)
    state = {
      username: '',
      password: ''
    },
    console.log('constructor')
  }
  async componentDidMount() {
    try {
      const hasAdultContent = await getItem('@ConfigKey', 'hasAdultContent');

      this.setState({ hasAdultContent });
    } catch (error) {
      this.showError();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.hasAdultContent !== nextState.hasAdultContent) return true;
    return false;
  }

  showError = () => {
    Alert({
      title: 'Atencion',
      description: 'Algo salio mal, por favor reintente mas tarde :).'
    });
  };

  actionChangeAdultContent = async value => {
    try {
      this.setState({ hasAdultContent: value });
      await setItem('@ConfigKey', `{"hasAdultContent": ${value}}`);
    } catch (error) {
      this.showError();
    }
  };

  actionShare = () => {
    Share({
      message: ' Mira mas sobre series y Peliculas \u{1F37F}',
      url: 'https://www.themoviedb.org/',
      title: 'DistFlix',
      dialogTitle: 'Mira mas sobre series y Peliculas \u{1F37F}'
    });
  };

  actionRating = () => {
    Alert({
      title: 'Trabajo practico: Distflix',
      description:
        'Integrantes del Trabajo Practico: Garcia Guido Ivan, Olivares Lautaro, Lepera Mariano'
    });
  };

  handleUsername = (text) => {
    this.setState({ username: text })
  }
  handlePassword = (text) => {
      this.setState({ password: text })
  }

  login = (username,password) => 
  {
    let usuarioBuscado = {
      username: username,
      password: password
    }
     
    console.log(usuarioBuscado)
    ApiController.login(this.okLogin.bind(this),this.noOkLogin.bind(this),usuarioBuscado)
    //.then((res) => this.props.navigation.navigate('Main'))
    .catch((err) => alert(err.message))

  }
  
  noOkLogin()
  {
    alert("Las credenciales ingresadas no son validas.");
  }
  okLogin()
  {
    console.log('username:', this.state.username + " online")
    this.props.navigation.navigate('Main');
  }


  render() {
    const { hasAdultContent } = this.state;

    return (
      <ScrollView style={styles.bgWhite}>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text
              style={[styles.itemText2, styles.sectionText]}
              numberOfLines={2}
            >
              Login
            </Text>
            <View style={styles.logoDistFlix}>
              <Image
                // eslint-disable-next-line react-native/no-inline-styles
                style={styles.logoDistFlix}
                source={{ uri: 'https://i.ibb.co/1sQmfXC/logo.png' }}
              />
            </View>
            <View style={styles.item2}>
              <TextInput                 
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="  Usuario"
                onChangeText={this.handleUsername}
              />
            </View>
            <View style={styles.item2}>
              
              <TextInput 
                style={styles.input}
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                placeholder="  Contraseña"
                onChangeText={this.handlePassword}
              />
            </View>
            
            <View style={[styles.item, styles.itemNoBorder]}>
              <Text style={styles.itemText} numberOfLines={2}>
                Recordar Contraseña
              </Text>
              <Switch
                value={hasAdultContent}
                onValueChange={this.actionChangeAdultContent}
              />
            </View>
            
            <TouchableOpacity 
              style={styles.submitButton}
              onPress = {
                  () => this.login(this.state.username, this.state.password)
              }
              // onPress={this.actionLogin.bind (this.usuario, this.contraseña)}
            >
              <Text style={styles.submitButtonText}> Confirmar </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.registroText}
              onPress={
              () => this.props.navigation.navigate('Registro')} 
            >
              <Text> No tiene cuenta? Registrese </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.CambioText}
              onPress={
              () => this.props.navigation.navigate('ForgotPassword')} 
            >
              <Text> Cambiar Contraseña </Text>
            </TouchableOpacity>

          </View>
         
        </View>
      </ScrollView>
    );
  }
}
