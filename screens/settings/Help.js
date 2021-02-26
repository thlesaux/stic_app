import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert, ActivityIndicator, Image } from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import consts from '../../src/consts';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import { EventRegister } from 'react-native-event-listeners';
import * as SecureStore from 'expo-secure-store';


class Help extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async componentDidMount() {

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
                    <View style={styles.containerHelp}>
                        <Text style={[globalStyle.fontTextRegular, styles.textTitle]}>
                            Vous avez besoin d'aide ?
                        </Text>
                        <View style={styles.buttonsList}>
                            <TouchableOpacity style={[globalStyle.shadowStyle, styles.buttonContact]}>
                                <Text style={[globalStyle.fontTextRegular, styles.textButton]}>
                                    Email
                                </Text>
                                <Icon name="envelope" size={24} color={'#FFF'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[globalStyle.shadowStyle, styles.buttonContact]} onPress={() => Linking.openURL(`twitter://timeline`)}>
                                <Text style={[globalStyle.fontTextRegular, styles.textButton]}>
                                    Twitter
                                </Text>
                                <Icon name="twitter" size={24} color={'#FFF'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[globalStyle.shadowStyle, styles.buttonContact]} onPress={() => Linking.openURL(`https://fr.linkedin.com/`)}>
                                <Text style={[globalStyle.fontTextRegular, styles.textButton]}>
                                    Linkedin
                                </Text>
                                <Icon name="linkedin" size={24} color={'#FFF'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[globalStyle.shadowStyle, styles.buttonContact]} onPress={() => Linking.openURL(`https://www.jeedom.com/fr/`)}>
                                <Text style={[globalStyle.fontTextRegular, styles.textButton]}>
                                    Jeedom
                                </Text>
                                <Icon name="home" size={24} color={'#FFF'} />
                            </TouchableOpacity>
                        </View>
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        color: consts.BLACK,
        fontSize: 36,
        textAlign: 'center'
    },
    containerHelp: {
        width: '90%',
        flexGrow: 1,
        justifyContent: 'space-evenly'
    },
    buttonContact: {
        padding: '5%',
        backgroundColor: consts.BLACK,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '4%'
    },
    textButton: {
        color: '#FFF',
        fontSize: 18
    },
    buttonsList: {

    }
});

export default Help;