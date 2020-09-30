import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';

import { Constants } from 'expo';
import { Feather } from '@expo/vector-icons';

import { Alert } from '../../components/common/Alert';
import { Share } from '../../components/common/Share';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';
import { Switch } from '../../components/common/Switch';

import { getItem, setItem } from '../../utils/AsyncStorage';
import { darkBlue } from '../../styles/Colors';

import styles from './styles';

export default class ConfigurationScreen extends Component {
  state = {
    hasAdultContent: false
  };

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

  render() {
    const { hasAdultContent } = this.state;

    return (
      <ScrollView style={styles.bgWhite}>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text
              style={[styles.itemText, styles.sectionText]}
              numberOfLines={2}
            >
              Interface
            </Text>
            <View style={[styles.item, styles.itemNoBorder]}>
              <Text style={styles.itemText} numberOfLines={2}>
                Mostrar contenido para Adultos ( ͡° ͜ʖ ͡°)
              </Text>
              <Switch
                value={hasAdultContent}
                onValueChange={this.actionChangeAdultContent}
              />
            </View>
          </View>
          <View>
            <Text
              style={[styles.itemText, styles.sectionText]}
              numberOfLines={2}
            >
              Aplicacion
            </Text>
            <TouchableOpacity onPress={this.actionShare}>
              <View style={styles.item}>
                <Text style={styles.itemText} numberOfLines={2}>
                  Compartir
                </Text>
                <Feather
                  name="share"
                  size={22}
                  color={darkBlue}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.actionRating}>
              <View style={styles.item}>
                <Text style={styles.itemText} numberOfLines={2}>
                  Informacion
                </Text>
                <Feather
                  name="star"
                  size={22}
                  color={darkBlue}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <View style={[styles.item, styles.itemNoBorder]}>
              <Text style={styles.itemTextVersion} numberOfLines={2}>
                Version 
                {Constants.manifest.version}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
