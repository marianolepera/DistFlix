import { StyleSheet } from 'react-native';
import { white, darkBlue, blue, lightGray } from '../../styles/Colors';
import { fontSizeResponsive } from '../../utils/Metrics';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: white
  },
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
    paddingTop: 25
  },
  section: {
    marginBottom: 40
  },
  sectionText: {
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: fontSizeResponsive(3)
  },
  item: {
    backgroundColor: white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: lightGray
  },
  item2: {
    backgroundColor: white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: lightGray
  },
  itemText: {
    fontSize: fontSizeResponsive(2.5),
    color: darkBlue,
    width: '80%'
  },
  volverText: {
    marginLeft: 0,
    marginTop: 3,
    color: darkBlue,
    borderColor: darkBlue,
    borderWidth: 0.2,
    borderRadius: 6,
    width:responsiveWidth(20)

  },
  itemText2: {
    fontSize: fontSizeResponsive(2.5),
    color: darkBlue,
    width: '80%',
    marginLeft: 150
  },
  itemTextVersion: {
    fontSize: fontSizeResponsive(2.5),
    color: blue
  },
  itemNoBorder: {
    borderBottomWidth: 0
  },
  icon: {
    marginRight: 5
  },
  submitButton: {
    backgroundColor: lightGray,
    padding: 8,
    margin: responsiveWidth(5),
    marginLeft: responsiveWidth(12),
    height:  responsiveWidth(12),
    width: responsiveWidth(70),
    paddingLeft:responsiveWidth(10),
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 30
 },
 submitButtonText:{
    fontSize: fontSizeResponsive(2.5),
    color: darkBlue,
    padding: 2,
    marginLeft: responsiveWidth(13)
 },
 input: {
  height: 40,
  width:responsiveWidth(90),
  color: darkBlue,
  borderColor: darkBlue,
  borderWidth: 2,
  borderRadius: 6
},
logoDistFlix: {
  height:  responsiveWidth(25) ,
  width: responsiveWidth(75),
  paddingLeft: 30
  // flex: 1,
  // marginBottom: 20

}
});

export default styles;