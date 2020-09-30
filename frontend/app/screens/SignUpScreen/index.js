import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Alert } from '../../components/common/Alert';
import { Share } from '../../components/common/Share';

import { getItem, setItem } from '../../utils/AsyncStorage';

import styles from './styles';
import ApiController from '../../controller/ApiController';


export default class SignUpScreen extends Component {
  state = {
    hasAdultContent: false
  };
  constructor(props)
  {
    super(props)
    state = {
      username: '',
      password: '',
      email: ''
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
      title: 'Informacion',
      description:
        'Integrantes del Trabajo Practico: Garcia Guido Ivan, Olivera Lautaro, Lepera Mariano'
    });
  };
  handleUsername = (text) => {
    this.setState({ username: text })
  }
  handlePassword = (text) => {
      this.setState({ password: text })
  }
  handleEmail = (text) => {
    this.setState({ email: text })
}

registrarUsuario = (username, password, email) => 
  {
    let usuarioRegistro = {
      username: username,
      password: password,
      email: email
    }
     alert('Creacion del usuario ' + username + ' exitosa!');
     //grabar voto
     ApiController.registrarUsuario(this.okRegistro.bind(this),this.noOkRegistro.bind(this),usuarioRegistro);
  }

  noOkRegistro()
  {
    alert("El usuario indicado ya existe.");
  }
  okRegistro()
  {
    alert("Usuario creado!");
    this.props.navigation.navigate('Login');
  }

  render() {
    

    return (
      <ScrollView style={styles.bgWhite}>
        <View style={styles.container}>
            <TouchableOpacity 
              
              onPress = {
                  () => this.props.navigation.navigate('Login')
              }
              // onPress = {
              //     () => this.cambiarPassword(this.state.username, this.state.oldpassword, this.state.newpassword)
              // }
            >
              <Text style={styles.volverText}> Volver</Text>
            </TouchableOpacity>
          <View style={styles.section}>
            <Text
              style={[styles.itemText2, styles.sectionText]}
              numberOfLines={2}
            >
              Registro
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
                placeholder="  Contraseña"
                secureTextEntry={true}
                onChangeText={this.handlePassword}
              />
            </View>
            <View style={styles.item2}>
          
              <TextInput 
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="  Email"
                onChangeText={this.handleEmail}
              />
            </View>
            
            
            <TouchableOpacity 
              style={styles.submitButton}
              onPress = {
                  () => this.registrarUsuario(this.state.username, this.state.password, this.state.email)
              }
            >
              <Text style={styles.submitButtonText}> Registrarse </Text>
            </TouchableOpacity>

          </View>
         
        </View>
      </ScrollView>
    );
  }
}
