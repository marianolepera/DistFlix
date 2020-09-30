import { StyleSheet } from 'react-native';

import { white, pink, blue, lightGray, darkBlue } from '../../styles/Colors';
import { fontSizeResponsive } from '../../utils/Metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white
  },
  buttonShare: {
    paddingRight: 15,
    paddingLeft: 20
  },
  containerMovieInfo: {
    margin: 20,
    marginTop: 35
  },
  subTitleInfo: {
    fontSize: fontSizeResponsive(2.1),
    color: blue,
    textAlign: 'justify'
  },
  readMore: {
    color: pink,
    marginTop: 5,
    textAlign: 'right'
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  submitButton: {
    backgroundColor: lightGray,
    padding: 10,
    margin: 5,
    height: 40,
    fontSize: 20,
    fontWeight: "bold"
 },
 submitButtonText:{
    color: darkBlue,
    padding: 2,
    marginLeft: 120
 },
 submitButtonText2:{
    color: darkBlue,
    padding: 2,
    marginLeft: 100
 },
 input: {
  height: 200,
  width: 368,
  borderColor: darkBlue,
  borderWidth: 1
}
});

export default styles;
