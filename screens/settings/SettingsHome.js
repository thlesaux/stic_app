import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert, ActivityIndicator } from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import consts from '../../src/consts';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import { EventRegister } from 'react-native-event-listeners';
import * as SecureStore from 'expo-secure-store';


class SettingsHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: null,
      inscriptionDate: null
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.getUserInfo();
    this.createEventListenerRefresh();
    this.setState({ loading: false });
  }

  /**
  * Create a listener to refresh data
  */
  createEventListenerRefresh() {
    this.listener = EventRegister.addEventListener('refreshSettingsHome', async () => {
      await this.getUserInfo();
    });
  }


  /**
   * Get the current user token
   */
  getToken = async () => SecureStore.getItemAsync('secure_token');


  async getUserInfo() {
    const token = await this.getToken();

    await fetch(consts.API_URL + '/api/getUser', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        if (data.response.status == 200) {
          this.setState({
            username: data.response.user.Username,
            inscriptionDate: data.response.user.createdAt
          })
        }
      })
      .catch(e => {
        console.log(e);
      })
  }


  setDateFormat(date) {
    if (date != null) {
      let tempDate = new Date(date);
      return `${tempDate.getDay()}-${tempDate.getMonth()}-${tempDate.getFullYear()}`
    }
    else {
      return 'N/A';
    }
  }

  /**
  * Log out pop-up confirmation
  */
  onLogOutPress() {
    Alert.alert(
      "Se déconnecter",
      "Êtes-vous sur de vouloir vous déconnecter ?",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Déconnecter", style: "destructive", onPress: () => this.logOut() }
      ],
      { cancelable: true }
    );
  }

  /**
  * Log out form the app
  */
  async logOut() {
    await SecureStore.deleteItemAsync('secure_token');
    this.props.navigation.navigate("Login");
  }



  render() {
    if (this.state.loading) {
      return (
        <View style={globalStyle.containerLoading}>
          <ActivityIndicator size="large" color={consts.BLUE} />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <View style={styles.containerTitle}>
            <Text style={[globalStyle.fontTitleRegular, styles.titleText]}>Mon compte</Text>
            <Text style={[globalStyle.fontTextRegular, styles.textUserInfo]}>Inscrit le N/A</Text>
            <Text style={[globalStyle.fontTextRegular, styles.textUserInfo]}>Luap</Text>
          </View>

          <View style={[styles.containerButtonsSettings]}>
            <TouchableOpacity style={styles.buttonSetting} onPress={() => this.props.navigation.navigate('FormEditInformation')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="ios-information-circle" size={24} color={consts.BLACK} />
                <Text style={[globalStyle.fontTextRegular, styles.textButtonSetting]}>
                  Mes informations
              </Text>
              </View>
              <Icon name="ios-arrow-forward" size={20} color={consts.BLACK} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSetting}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="ios-sync" size={24} color={consts.BLACK} />
                <Text style={[globalStyle.fontTextRegular, styles.textButtonSetting]}>
                  Version
                </Text>
              </View>
              <Text style={globalStyle.fontTextRegular}>{Constants.manifest.version}</Text>
            </TouchableOpacity>

          </View>

          <View style={[styles.containerButtonsSettings]}>

            <TouchableOpacity style={styles.buttonSetting} onPress={() => { this.props.navigation.navigate('SettingsHelp') }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="ios-help-circle-outline" size={24} color={consts.BLACK} />
                <Text style={[globalStyle.fontTextRegular, styles.textButtonSetting]}>
                  Aide
                </Text>
              </View>
              <Icon name="ios-arrow-forward" size={20} color={consts.BLACK} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSetting} onPress={() => { this.props.navigation.navigate('AboutUs') }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="ios-person" size={24} color={consts.BLACK} />
                <Text style={[globalStyle.fontTextRegular, styles.textButtonSetting]}>
                  À propos
              </Text>

              </View>
              <Icon name="ios-arrow-forward" size={20} color={consts.BLACK} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSetting} onPress={() => { Linking.openURL('mailto:paul.demets@next-u.fr') }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="ios-bug" size={24} color={consts.BLACK} />
                <Text style={[globalStyle.fontTextRegular, styles.textButtonSetting]}>
                  Signaler un bug
              </Text>

              </View>
              <Icon name="ios-arrow-forward" size={20} color={consts.BLACK} />
            </TouchableOpacity>

          </View>
          <View style={[styles.containerButtonsSettings]}>
            <TouchableOpacity style={styles.buttonSetting} onPress={() => this.onLogOutPress()}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="ios-log-out-outline" size={24} color={consts.RED} />
                <Text style={[globalStyle.fontTextRegular, styles.textButtonSetting, styles.textLogOut]}>
                  Se déconnecter
              </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: consts.BACKGROUND_COLOR,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  containerTitle: {
    //margin: '10%',
    width: '90%',
    alignSelf: 'center',
    marginTop: '15%',
    marginBottom: '10%',
  },
  containerButtonsSettings: {
    marginBottom: '5%',
    borderBottomWidth: .4,
    borderBottomColor: consts.LIGHT_GRAY,
    width: '90%'
  },
  titleText: {
    fontSize: 26
  },
  buttonSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '4%',
    alignItems: 'center'
  },
  textButtonSetting: {
    paddingLeft: '4%',
    fontSize: 18,
    lineHeight: 21,
  },
  textLogOut: {
    color: consts.RED
  },
  textUserInfo: {
    color: consts.LIGHT_GRAY,
    fontSize: 18,
  }

});

export default SettingsHome;