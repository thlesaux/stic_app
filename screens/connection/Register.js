import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator, TextInput, Keyboard } from 'react-native';
import { Provider } from 'react-redux';
import globalStyle from '../../assets/styles/globalStyle';
import consts from '../../src/consts';
import * as SecureStore from 'expo-secure-store';


class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            confirmPassword: null,
            loading: false
        };
    }




    async handleRegister() {
        this.setState({ loading: true });

        await fetch(consts.API_URL + '/api/register', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password,
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.response.status == 200) {
                    this.handleLogin();
                }
                else {
                    this.setState({
                        loading: false,
                        errorConnection: true
                    });
                }
            })
            .catch(e => {
                this.setState({ loading: false });
                alert('An error occurred ...');
                console.log(e);
            })
    }


    async handleLogin() {
        await fetch(consts.API_URL + '/api/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                login: this.state.email,
                password: this.state.password,
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.response.status == 200) {
                    this.handleSignIn(data);
                }
                else {
                    this.setState({
                        loading: false,
                        errorConnection: true
                    });
                }
            })
            .catch(e => {
                this.setState({ loading: false });
                alert('An error occurred ...');
                console.log(e);
            })
    }

    handleSignIn = async (data) => {
        await SecureStore.setItemAsync('secure_token', data.response.token);
        Keyboard.dismiss();
        this.props.navigation.navigate('Stackstabs');
        this.setState({
            loading: false,
            errorConnection: false,
            email: null,
            password: null,
            firstName: null,
            lastName: null
        });
    }



    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={consts.BLUE} />
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={styles.containerListInput}>
                        <View style={[styles.inputContainer, { marginBottom: '5%' }]}>
                            <Text style={[globalStyle.fontTextRegular, styles.labelInput]}>Prénom</Text>
                            <TextInput
                                value={this.state.firstName}
                                onChangeText={(firstName) => { this.setState({ firstName }); }}
                                style={[styles.input, globalStyle.fontTextRegular]}
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                        </View>
                        <View style={[styles.inputContainer, { marginBottom: '5%' }]}>
                            <Text style={[globalStyle.fontTextRegular, styles.labelInput]}>Nom</Text>
                            <TextInput
                                value={this.state.lastName}
                                onChangeText={(lastName) => { this.setState({ lastName }); }}
                                style={[styles.input, globalStyle.fontTextRegular]}
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                        </View>
                        <View style={[styles.inputContainer, { marginBottom: '5%' }]}>
                            <Text style={[globalStyle.fontTextRegular, styles.labelInput]}>Email*</Text>
                            <TextInput
                                value={this.state.email}
                                onChangeText={(email) => { this.setState({ email }); }}
                                style={[styles.input, globalStyle.fontTextRegular]}
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                        </View>
                        <View style={[styles.inputContainer]}>
                            <Text style={[globalStyle.fontTextRegular, styles.labelInput]}>Mot de passe*</Text>
                            <TextInput
                                value={this.state.password}
                                onChangeText={(password) => { this.setState({ password }); }}
                                style={[styles.input, globalStyle.fontTextRegular]}
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.handleRegister()} style={styles.buttonConnect}>
                            <Text style={[globalStyle.fontTextRegular, styles.buttonConnectText]}>S'inscrire</Text>
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
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    containerTitle: {
        width: '90%',
        alignItems: 'center',
    },
    textTitle: {
        fontSize: 40,
        color: consts.BLACK
    },
    input: {
        borderWidth: 1,
        height: consts.PHONE_WIDTH / 7,
        borderRadius: 5,
        borderColor: consts.LIGHT_GRAY,
        fontSize: 18,
        fontFamily: 'Raleway-Regular',
        width: '100%',
        paddingLeft: '3%'
    },
    containerListInput: {
        width: '90%',
        alignItems: 'center',
    },
    inputContainer: {
        width: '90%',
    },
    labelInput: {
        fontSize: 16,
        marginBottom: '2%'
    },
    buttonConnect: {
        backgroundColor: consts.BLUE,
        alignItems: 'center',
        paddingTop: '4%',
        paddingBottom: '4%',
        borderRadius: 5,
        width: '70%',
        marginBottom: '3%'
    },
    buttonConnectText: {
        fontSize: 20,
        color: '#FFF'
    }
});

export default Register;
