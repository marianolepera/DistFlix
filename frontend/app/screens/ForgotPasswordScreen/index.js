import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Alert } from '../../components/common/Alert';
import { Share } from '../../components/common/Share';

import { getItem, setItem } from '../../utils/AsyncStorage';

import styles from './styles';
import ApiController from '../../controller/ApiController';


export default class ForgotPasswordScreen extends Component {
  state = {
    hasAdultContent: false
  };
  constructor(props)
  {
    super(props)
    state = {
      username: '',
      oldpassword: '',
      newpassword: ''
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
  handleOldPassword = (text) => {
      this.setState({ oldpassword: text })
  }
  handleNewPassword = (text) => {
    this.setState({ newpassword: text })
}

cambiarPassword = (username, oldpassword, newpassword) => 
  {
    let datosNuevos = {
      username: username,
      oldpassword: oldpassword,
      newpassword: newpassword
    }
     alert('Cambio de contraseña de ' + username + ' exitoso!');
     //grabar voto
     ApiController.cambiarPassword(this.okCambio.bind(this),this.noOkCambio.bind(this),datosNuevos);
  }

  noOkCambio()
  {
    alert("No se pudo modificar la contraseña");
  }
  okCambio()
  {
    alert("Contraseña modificada!");
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
                placeholder="  Contraseña Antigua"
                secureTextEntry={true}
                onChangeText={this.handleOldPassword}
              />
            </View>
            <View style={styles.item2}>
          
              <TextInput 
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="  Nueva Contraseña"
                onChangeText={this.handleNewPassword}
              />
            </View>
            
            
            <TouchableOpacity 
              style={styles.submitButton}
              onPress = {
                  () => this.props.navigation.navigate('Login')
              }
              // onPress = {
              //     () => this.cambiarPassword(this.state.username, this.state.oldpassword, this.state.newpassword)
              // }
            >
              <Text style={styles.submitButtonText}> Modificar Contraseña </Text>
            </TouchableOpacity>

          </View>
         
        </View>
      </ScrollView>
    );
  }
}
