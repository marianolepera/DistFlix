import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { Modal } from '../Modal';
import { TouchableOpacity } from '../../common/TouchableOpacity';
import { Switch } from '../../common/Switch';

import { darkBlue } from '../../../styles/Colors';

import styles from './styles';

export default class FilterModal extends Component {
  state = {
    filter: this.props.filterType,
    name: this.props.filterName,
    actionFilter: this.props.actionFilter,
    actionSwitchMovie: this.props.actionSwitchMovie
  };

  changeValues = (filter, name) => {
    this.setState({ filter, name });
  };

  render() {
    const { filter, name, actionFilter, actionSwitchMovie } = this.state;
    const { isVisible, style } = this.props;

    return (
      <Modal isVisible={isVisible} actionOpenClose={actionFilter} style={style}>
        <View style={styles.containerModal}>
          <Text style={styles.modalTitle}>Filtros</Text>
          <ScrollView>
            <View style={styles.containerScroll}>
              <View style={styles.containerSection}>
                <Text style={styles.optionSectionTitle} numberOfLines={2}>
                  Fecha de Estreno
                </Text>
                <View style={styles.containerRow}>
                  <Text style={styles.optionTitle} numberOfLines={2}>
                    Las ultimas
                  </Text>
                  <Switch
                    value={filter === 'release_date.desc'}
                    onValueChange={() =>
                      this.changeValues('release_date.desc', 'Ultimos Estrenos')
                    }
                  />
                </View>
                <View style={styles.containerRow}>
                  <Text style={styles.optionTitle} numberOfLines={2}>
                    Las mas Vintage
                  </Text>
                  <Switch
                    value={filter === 'release_date.asc'}
                    onValueChange={() =>
                      this.changeValues('release_date.asc', 'Las mas Antiguas')
                    }
                  />
                </View>
              </View>
              <View style={styles.containerSection}>
                <Text style={styles.optionSectionTitle} numberOfLines={2}>
                  Popularidad
                </Text>
                <View style={styles.containerRow}>
                  <Text style={styles.optionTitle} numberOfLines={2}>
                    Mas Populares
                  </Text>
                  <Switch
                    value={filter === 'popularity.desc'}
                    onValueChange={() =>
                      this.changeValues('popularity.desc', 'Mas Populares')
                    }
                  />
                </View>
                <View style={styles.containerRow}>
                  <Text style={styles.optionTitle} numberOfLines={2}>
                    Menos Populares
                  </Text>
                  <Switch
                    value={filter === 'popularity.asc'}
                    onValueChange={() =>
                      this.changeValues('popularity.asc', 'Las menos Populares')
                    }
                  />
                </View>
              </View>
              <View>
                <Text style={styles.optionSectionTitle} numberOfLines={2}>
                  Recaudacion
                </Text>
                <View style={styles.containerRow}>
                  <Text style={styles.optionTitle} numberOfLines={2}>
                    Mayor Recaudacion
                  </Text>
                  <Switch
                    value={filter === 'revenue.desc'}
                    onValueChange={() =>
                      this.changeValues('revenue.desc', 'Mayor Recaudacion')
                    }
                  />
                </View>
                <View style={styles.containerRow}>
                  <Text style={styles.optionTitle} numberOfLines={2}>
                    Menor Recaudacion
                  </Text>
                  <Switch
                    value={filter === 'revenue.asc'}
                    onValueChange={() =>
                      this.changeValues('revenue.asc', 'Menor Recaudacion')
                    }
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={actionFilter}
            >
              <Feather
                name="chevron-down"
                size={styles.icon.fontSize}
                color={darkBlue}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonSave]}
              onPress={() => actionSwitchMovie(filter, name, false)}
            >
              <Text style={[styles.buttonText, styles.buttonTextSave]}>
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
