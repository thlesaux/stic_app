import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import consts from '../../src/consts';
import { connect } from 'react-redux';
import {MaterialCommunityIcons} from "@expo/vector-icons";


class Lighting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            lightingState: false,
        };
    }

    async componentDidMount() {
        this.setState({ loading: true });
        await this.getLightState();
        this.setState({ loading: false });

        this.props.navigation.setOptions({ title:  consts.ROOMS_TRADUCTION[this.props.currentRoom] + ' - Éclairage' });
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={globalStyle.containerLoading}>
                    <ActivityIndicator size="large" color={consts.BLUE} />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.marginView}>
                        <Text style={[globalStyle.fontTextRegular, styles.textTitle]}>Éclairage</Text>
                    </View>
                    <MaterialCommunityIcons
                        name={this.state.lightingState === true ? "lightbulb" : "lightbulb-off"} size={consts.ICON_SIZE}
                        color={this.state.lightingState === true ? consts.YELLOW : consts.BLACK}
                        style={styles.marginView}
                    />
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            style={[styles.buttonGlobalStyle, styles.buttonOnStyle, globalStyle.shadowStyle]}
                            onPress={() => this.switchOn()}
                        >
                            <Text style={styles.textButtonOn}>ON</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttonGlobalStyle, styles.buttonOffStyle, globalStyle.shadowStyle]}
                            onPress={() => this.switchOff()}
                        >
                            <Text style={styles.textButtonOff}>OFF</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    async getLightState() {
        const id_get = consts.ROOMS_AMENITIES[this.props.currentRoom][this.props.equipment].id_get;
        
        await fetch(consts.API_URL_JEEDOM + id_get, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        }).then(res => res.json())
            .then(async data => {
                data === 1 ? this.setState({ lightingState: true }) : this.setState({ lightingState: false })
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    async switchOn() {
        const id_on = consts.ROOMS_AMENITIES[this.props.currentRoom][this.props.equipment].id_on;
        console.log(id_on);

        await fetch(consts.API_URL_JEEDOM + id_on, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        }).then(res => res.json())
            .then(this.setState({ lightingState: true }))
            .catch(error => {
                console.log('error', error);
            });
    }

    async switchOff() {
        const id_off = consts.ROOMS_AMENITIES[this.props.currentRoom][this.props.equipment].id_off;

        await fetch(consts.API_URL_JEEDOM + id_off, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        }).then(res => res.json())
            .then(async data => {
                this.setState({ lightingState: false })
            })
            .catch(error => {
                console.log('error', error);
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: consts.BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    marginView: {
        marginBottom: 40
    },
    textTitle: {
        fontSize: consts.FONT_SIZE_TITLE,
        color: consts.BLACK
    },
    textButtonOn: {
        fontSize: consts.FONT_SIZE_BUTTON,
        color: consts.BLACK
    },
    textButtonOff: {
        fontSize: consts.FONT_SIZE_BUTTON,
        color: consts.WHITE
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 250
    },
    buttonGlobalStyle: {
        padding: 16,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5,
    },
    buttonOnStyle: {
        backgroundColor: consts.BLUE,
    },
    buttonOffStyle: {
        backgroundColor: consts.LIGHT_GRAY,
    },
});


const mapStateToProps = (state) => {
    return {
        equipment: state.houseEquipment.name,
        currentRoom: state.rooms.name
    };
}

export default connect(mapStateToProps)(Lighting);