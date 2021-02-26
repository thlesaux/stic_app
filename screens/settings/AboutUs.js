import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert, ActivityIndicator, Image } from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import consts from '../../src/consts';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import { EventRegister } from 'react-native-event-listeners';
import * as SecureStore from 'expo-secure-store';


class AboutUs extends Component {

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
                    <View style={styles.containerText}>
                        <Text style={[globalStyle.fontTextRegular, styles.textTitle]}>
                            Stic
                        </Text>
                    </View>
                    <View style={[styles.containerText]}>
                        <Text style={[globalStyle.fontTextRegular, styles.textStyle, { marginBottom: '5%' }]}>
                            Cette application a été développée dans le cadre d'un projet avec l'école Webtech Institute.
                        </Text>
                        <Text style={[globalStyle.fontTextRegular, styles.textStyle]}>
                            L'objectif était de permettre à un utilisateur d'accéder aux différentes pièces et fonctions domotiques de son logement.
                        </Text>
                        {/* <Icon name="unlock-alt" size={24} color={consts.BLACK} /> */}
                    </View>
                    <View style={[styles.containerText]}>
                        <Text style={[globalStyle.fontTextRegular, styles.textStyle, { marginBottom: '5%' }]}>
                            L'équipe qui a développé cette application :
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={[globalStyle.shadowStyle, styles.developperContainer]}>
                                <Image source={require('../../assets/Team/paul.jpeg')} style={[styles.developperImage]} />
                                <Text style={[globalStyle.fontTextRegular, { textAlign: 'center' }]}>Paul</Text>
                            </View>
                            <View style={[globalStyle.shadowStyle, styles.developperContainer]}>
                                {/* <Icon name="user" size={24} color={consts.BLACK} /> */}
                                <Image source={require('../../assets/Team/thomas.jpg')} style={[styles.developperImage]} />
                                <Text style={[globalStyle.fontTextRegular, { textAlign: 'center' }]}>Thomas</Text>
                            </View>
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
    containerText: {
        width: '90%',
        marginBottom: '5%'
    },
    textTitle: {
        fontSize: 40,
        color: consts.BLACK,
        marginBottom: '5%',
        textAlign: 'center'
    },
    textStyle: {
        fontSize: 20,
        color: consts.BLACK,
        textAlign: 'justify'
    },
    developperContainer: {
        backgroundColor: '#FFF',
        padding: '1%',
        borderRadius: 5
    },
    developperImage: {
        width: consts.PHONE_WIDTH / 3,
        height: consts.PHONE_WIDTH / 3,
        borderRadius: 5,
        marginBottom: '2%'
    },
});

export default AboutUs;