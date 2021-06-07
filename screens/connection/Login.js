import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator, TextInput, Keyboard } from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import consts from '../../src/consts';
import * as SecureStore from 'expo-secure-store';



class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: null,
            password: null,
            loading: false,
            errorConnection: false
        };
    }

    async componentDidMount() {

    }

    async handleLogin() {
        this.setState({ loading: true });

        await fetch(consts.API_URL + '/api/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                login: this.state.login,
                password: this.state.password,
            })
        })
            .then(res => res.json())
            .then(data => {
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
            login: null,
            password: null
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text style={[globalStyle.fontTextRegular, styles.textTitle]}>Stic</Text>
                </View>
                <View style={styles.containerListInput}>
                    <View style={[styles.inputContainer, { marginBottom: '5%' }]}>
                        <Text style={[globalStyle.fontTextRegular, styles.labelInput]}>Nom d'utilisateur</Text>
                        <TextInput
                            value={this.state.login}
                            onChangeText={(login) => { this.setState({ login }); }}
                            style={[styles.input, globalStyle.fontTextRegular]}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </View>
                    <View style={[styles.inputContainer]}>
                        <Text style={[globalStyle.fontTextRegular, styles.labelInput]}>Mot de passe</Text>
                        <TextInput
                            value={this.state.password}
                            onChangeText={(password) => { this.setState({ password }); }}
                            style={[styles.input, globalStyle.fontTextRegular]}
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                        />
                    </View>
                    {
                        this.state.errorConnection &&
                        <Text style={[globalStyle.fontTextMedium, styles.textError]}>
                            Nom d'utilisateur ou mot de passe incorrect ...
                        </Text>
                    }
                </View>

                <View style={{ width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.handleLogin()} style={styles.buttonConnect}>
                        <Text style={[globalStyle.fontTextRegular, styles.buttonConnectText]}>Se connecter</Text>
                        {
                            this.state.loading &&
                            <ActivityIndicator size="small" color={consts.BLACK} style={{ marginLeft: '5%' }} />
                        }

                    </TouchableOpacity>

                    <View>
                        <Text style={globalStyle.fontTextRegular}>Pas encore de compte ?
                            <Text style={{ color: consts.BLUE }} onPress={() => this.props.navigation.navigate('Register')}>
                                {' '}S'inscrire
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        );
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
        marginBottom: '2%'
    },
    labelInput: {
        fontSize: 16,
        marginBottom: '2%'
    },
    buttonConnect: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: consts.BLUE,
        // paddingBottom: '4%',
        borderRadius: 5,
        padding: '5%',
        width: '70%',
        marginBottom: '3%'
    },
    buttonConnectText: {
        fontSize: 20,
        color: '#FFF'
    },
    textError: {
        color: consts.RED,
        width: '90%'
    }
});

export default Login;
