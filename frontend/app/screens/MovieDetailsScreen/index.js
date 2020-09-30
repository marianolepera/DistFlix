import React, { Component } from 'react';
import { ScrollView, View, Text, AsyncStorage } from 'react-native';

import { Feather } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import { Alert } from '../../components/common/Alert';
import { Share } from '../../components/common/Share';
import Spinner from '../../components/common/Spinner';
import NotificationCard from '../../components/cards/NotificationCard';
import PosterRow from '../../components/cards/rows/PosterRow';
import PersonModal from '../../components/modals/PersonModal';
import PersonListRow from '../../components/cards/rows/PersonListRow';
import PersonRow from '../../components/cards/rows/PersonRow';
import SectionRow from '../../components/cards/rows/SectionRow';
import MainInfoRow from '../../components/cards/rows/MainInfoRow';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';

import request from '../../services/Api';

import language from '../../assets/language/iso.json';
import { darkBlue } from '../../styles/Colors';

import styles from './styles';
import ApiController, { USER_STORAGE_KEY } from '../../controller/ApiController';


const uninformed = 'Uninformed';

const renderTruncatedFooter = handlePress => (
  <TouchableOpacity onPress={handlePress}>
    <Text style={styles.readMore}>Leer mas</Text>
  </TouchableOpacity>
);

const renderRevealedFooter = handlePress => (
  <TouchableOpacity onPress={handlePress}>
    <Text style={styles.readMore}>Ver menos</Text>
  </TouchableOpacity>
);

function createData(item){
  return {
    user: item.username,
    comentario: item.description,
  };
}

export default class MovieDetailsScreen extends Component {
  constructor(props)
  {
    super(props)
    state = {
      username: "",
      description: '',
      imdbID: this.props.navigation.getParam('id'),
      comentarios: [
        //{ key: 1, user: "pedro", comentario: "coment1" },
        //{ key: 2, user: "juan", comentario: "coment2" },

      ]
      
    }//,
    //console.log('constructor',this.props)
  }



  handleUsername = (text) => {
    this.setState({ username: text })
  }
  handleDescription = (text) => {
      this.setState({ description: text })
  }
  handleimdbID = (text) => {
    this.setState({ imdbID: text })
}
enviarcomentario = (username, description, id) => 
  {
    let datosComentario = {
      username: username,
      description: description,
      imdbID: id
    }
     //grabar voto
     console.log(datosComentario);
     ApiController.grabarComentario(this.okComentario.bind(this),this.noOkComentario.bind(this),datosComentario);
  }

  noOkComentario()
  {
    alert("No se envio en comentario.");
  }
  okComentario()
  {
    alert("Comentario Enviado!");
    this.props.navigation.navigate('Main');
  }

  okEnvioComentario(newData)
  {
    
    var i,newArray = [];
    for (i = 0; i < newData.length; i++) {
      newArray.push(createData(newData[i],i));
    }
    this.setState({FlatListItems: newArray});
    console.log("setee flatlist");
    // //console.log(this.state.data);
    console.log("id de la pelicula", this.state.id);
    console.log("estructura array", newArray);
    console.log("flat list items" , this.state.FlatListItems);
    console.log("DAtA JSON" , newData);
  }
 
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'Detalles de la Pelicula',
      headerRight: (
        <TouchableOpacity
          style={styles.buttonShare}
          onPress={params.actionShare}
        >
          <Feather name="share" size={23} color={darkBlue} />
        </TouchableOpacity>
      )
    };
  };

  state = {
    isLoading: true,
    isError: false,
    isVisible: false,
    showImage: false,
    creditId: null
  };

  componentDidMount() {
    this.props.navigation.setParams({ actionShare: this.actionShare });
    this.requestMoviesInfo();
    AsyncStorage.getItem(USER_STORAGE_KEY).then((usuario) => this.setState({username: usuario}))
    ApiController.getCommentsById(this.props.navigation.state.params.id,this.okEnvioComentario.bind(this));
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.isVisible !== nextState.isVisible ||
      this.state.showImage !== nextState.showImage ||
      this.state.isLoading !== nextState.isLoading ||
      this.state.isError !== nextState.isError
    ) {
      return true;
    }
    return false;
  }

  requestMoviesInfo = async () => {
    try {
      this.setState({ isLoading: true });

      const { id } = this.props.navigation.state.params;

      const data = await request(`movie/${id}`, {
        include_image_language: 'en,null',
        append_to_response: 'credits,videos,images'
      });

      this.setState({
        isLoading: false,
        isError: false,
        id,
        backdropPath: data.backdrop_path || '',
        title: data.title || '',
        voteAverage: data.vote_average || 0,
        video: data.videos.results[0] || [],
        overview: data.overview || uninformed,
        cast: this.sliceArrayLength(data.credits.cast, 15),
        crew: this.sliceArrayLength(data.credits.crew, 15),
        productionCompanies: this.sliceArrayLength(
          data.production_companies,
          10
        ),
        images: this.formatImageUrl(data.images.backdrops),
        infosDetail: this.getInfosDetail(data)
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        isError: true
      });
    }
  };

  /* eslint-disable camelcase */
  getInfosDetail = ({
    runtime,
    genres,
    original_language,
    release_date,
    budget,
    revenue,
    adult
  }) => {
    return {
      Duracion: this.convertMinsToHrsMins(runtime || 0),
      Genero: this.convertToGenre(this.sliceArrayLength(genres, 2) || ''),
      Lenguaje: this.convertToUpperCaseFirstLetter(
        language[original_language] || ''
      ),
      Estreno: this.convertToDate(release_date || ''),
      Presupuesto: this.convertToDolar(budget || 0),
      Recaudacion: this.convertToDolar(revenue || 0),
      Adultos: this.convertAdult(adult || '')
    };
  };
  /* eslint-enable camelcase */

  formatImageUrl = images => {
    return this.sliceArrayLength(images, 15).map(item => {
      return { url: `https://image.tmdb.org/t/p/original/${item.file_path}` };
    });
  };

  sliceArrayLength = (arr, num) => {
    return arr.length > num ? arr.slice(0, num) : arr;
  };

  convertToDolar = value => {
    return (
      `$${value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` ||
      uninformed
    );
  };

  convertAdult = adult => (adult === false ? 'Yes' : 'No' || uninformed);

  convertMinsToHrsMins = runtime => {
    let h = Math.floor(runtime / 60);
    let m = runtime % 60;
    h = h < 10 ? `0${h}` : h;
    m = m < 10 ? `0${m}` : m;
    return h && m ? `${h}h ${m}m` : uninformed;
  };

  convertToGenre = genre => {
    return genre.length > 0
      ? genre.length > 1
        ? `${genre[0].name}, ${genre[1].name}`
        : genre[0].name
      : uninformed;
  };

  convertToUpperCaseFirstLetter = originalLanguage => {
    return originalLanguage.charAt(0).toUpperCase() + originalLanguage.slice(1);
  };

  convertToDate = releaseDate => {
    const date = new Date(releaseDate);
    return (
      `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}` ||
      uninformed
    );
  };

  actionPerson = (creditId = '') => {
    this.setState(({ isVisible }) => {
      return { creditId, isVisible: !isVisible };
    });
  };

  actionImage = () => {
    this.setState(({ showImage }) => {
      return { showImage: !showImage };
    });
  };

  actionShare = () => {
    const { isError, title, id } = this.state;

    if (isError) {
      Alert({
        title: 'Atencion',
        description: 'Algo malio sal, por favor intente mas tarde.'
      });
    } else {
      Share({
        message: `${title}, averigua todo sobre esta pelicula \u{1F37F}`,
        url: `https://www.themoviedb.org/movie/${id}`,
        title: 'Distflix',
        dialogTitle: `${title}, averigua todo sobre esta pelicula \u{1F37F}`
      });
    }
  };

  renderItem = (item, type, actionTeamDetail) => (
    <PersonRow item={item} type={type} actionTeamDetail={actionTeamDetail} />
  );

  renderListEmpty = () => (
    <View>
      <Text style={styles.subTitleInfo}></Text>
    </View>
  );

  render() {
    const {
      isLoading,
      isError,
      backdropPath,
      voteAverage,
      video,
      title,
      infosDetail,
      overview,
      cast,
      crew,
      productionCompanies,
      comments,
      images,
      creditId,
      isVisible,
      showImage
    } = this.state;

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <NotificationCard
            icon="alert-octagon"
            action={this.requestMoviesInfo}
          />
        ) : (
          <ScrollView>
            <PosterRow
              title={title}
              backdropPath={backdropPath}
              voteAverage={voteAverage}
              images={images}
              video={video}
              navigate={navigate}
              showImage={showImage}
              onPress={this.actionImage}
            />
            <View style={styles.containerMovieInfo}>
              <MainInfoRow data={infosDetail} />
              <SectionRow title="Sinopsis">
                <ReadMore
                  numberOfLines={3}
                  renderTruncatedFooter={renderTruncatedFooter}
                  renderRevealedFooter={renderRevealedFooter}
                >
                  <Text style={styles.subTitleInfo}>{overview}</Text>
                </ReadMore>
              </SectionRow>
              <SectionRow title="Reparto">
                <PersonListRow
                  data={cast}
                  type="character"
                  keyItem="creditId"
                  ListEmptyComponent={this.renderListEmpty}
                  actionTeamDetail={this.actionPerson}
                  renderItem={this.renderItem}
                />
              </SectionRow>
              <SectionRow title="Equipo Tecnico">
                <PersonListRow
                  data={crew}
                  type="job"
                  keyItem="creditId"
                  ListEmptyComponent={this.renderListEmpty}
                  actionTeamDetail={this.actionPerson}
                  renderItem={this.renderItem}
                />
              </SectionRow>
              <SectionRow title="Productor">
                <PersonListRow
                  data={productionCompanies}
                  type="production"
                  keyItem="id"
                  ListEmptyComponent={this.renderListEmpty}
                  actionTeamDetail={this.actionPerson}
                  renderItem={this.renderItem}
                />
              </SectionRow>
              <SectionRow title="Comentarios" isLast>
                <PersonListRow
                  data={comments}
                  type="comment"
                  keyItem="id"
                  ListEmptyComponent={this.renderListEmpty}
                  actionTeamDetail={this.actionPerson}
                  renderItem={this.renderItem}
                />
                <TextInput 
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder=" Ingrese su comentario..."
                  onChangeText={this.handleDescription}
                />
                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={
                    () =>// this.enviarcomentario( this.state.username, this.state.comment, this.state.imdbID)
                    this.enviarcomentario(this.state.username,  this.state.description, this.state.id)
                  } 
                  >
                  <Text style={styles.submitButtonText2}> Enviar Comentario </Text>
                </TouchableOpacity>
                <FlatList
                  style = {{flex: 1}}
                  data = {this.state.FlatListItems}
                  renderItem = {({item}) => {
                    return (
                          <View
                          style= {{flex:1 , }}
                          >
                            <Text
                            style = {{fontSize: 15, padding: 10}}
                            >{item.user}</Text>
                            <Text
                            style = {{fontSize: 15, padding: 10}}
                            >{item.comentario}</Text>
                          </View>
                    );
                  }}
                />
              </SectionRow>
            </View>
          </ScrollView>
        )}
        <PersonModal
          isVisible={isVisible}
          creditId={creditId}
          actionClose={this.actionPerson}
          style={styles.bottomModal}
        />
      </View>
    );
  }

  // [
  //   { key: 1, user: "pedro", comentario: "coment1" },
  //   { key: 2, user: "juan", comentario: "coment2" },

  // ]
}
