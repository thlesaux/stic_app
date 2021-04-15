import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import consts from '../../src/consts';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';


class Shutter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            shutterState: false,
        };
    }

    async componentDidMount() {
        this.setState({loading: true})
        await this.getShutterState()
        this.setState({loading: false})
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={globalStyle.containerLoading}>
                    <ActivityIndicator size="large" color={consts.BLUE}/>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={[styles.rectangle, styles.marginView, globalStyle.shadowStyle]}>
                        <View style={styles.marginView}>
                            <Text style={[globalStyle.fontTextRegular, styles.textTitle]}>Volets</Text>
                        </View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity
                                style={[styles.buttonGlobalStyle, styles.buttonDownStyle, globalStyle.shadowStyle]}
                                onPress={() => this.switchOff()}
                            >
                                <Icon name="arrow-circle-down" size={consts.ICON_SIZE} color={consts.BLACK}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.buttonGlobalStyle, styles.buttonUpStyle, globalStyle.shadowStyle]}
                                onPress={() => this.switchOn()}
                            >
                                <Icon name="arrow-circle-up" size={consts.ICON_SIZE} color={consts.WHITE}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.buttonGlobalStyle, styles.buttonStopStyle, globalStyle.shadowStyle]}
                            >
                                <Text style={styles.textButtonStop}>STOP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }
    };

    async getShutterState() {
        console.log(this.props.currentRoom);
        console.log(this.props.equipment);

        const id_get = consts.ROOMS_AMENITIES[this.props.currentRoom][this.props.equipment].id_get;
        
        await fetch(consts.API_URL + id_get, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        }).then(res => res.json())
            .then(async data => {
                data === 1 ? this.setState({shutterState: true}) : this.setState({shutterState: false})
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    async switchOn() {
        const id_on = consts.ROOMS_AMENITIES[this.props.currentRoom][this.props.equipment].id_on;

        await fetch(consts.API_URL + id_on, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        }).then(res => res.json())
            .then(this.setState({shutterState: true}))
            .catch(error => {
                console.log('error', error);
            });
    }

    async switchOff() {
        const id_off = consts.ROOMS_AMENITIES[this.props.currentRoom][this.props.equipment].id_off;

        await fetch(consts.API_URL + id_off, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        }).then(res => res.json())
            .then(this.setState({shutterState: false}))
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
        marginBottom: 45
    },
    textTitle: {
        fontSize: consts.FONT_SIZE_TITLE,
        color: consts.BLACK
    },
    textButtonStop: {
        fontSize: consts.FONT_SIZE_BUTTON,
        color: consts.WHITE,
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280
    },
    buttonGlobalStyle: {
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
    },
    buttonDownStyle: {
        backgroundColor: consts.BLUE,
    },
    buttonUpStyle: {
        backgroundColor: consts.LIGHT_GRAY,
    },
    buttonStopStyle: {
        backgroundColor: consts.RED,
    },
    rectangle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 250,
        backgroundColor: consts.WHITE,
    },
});


const mapStateToProps = (state) => {
    return {
        equipment: state.houseEquipment.name,
        currentRoom: state.rooms.name
    };
}

export default connect(mapStateToProps)(Shutter);