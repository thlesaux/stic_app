import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert, ActivityIndicator, Image } from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import consts from '../../src/consts';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Constants from 'expo-constants';
import { EventRegister } from 'react-native-event-listeners';
import * as SecureStore from 'expo-secure-store';

class Temperature extends Component {

    constructor(props) {
        super(props);
        this.state = {
            temperature: [23],
        };
    }

    async componentDidMount() {
        this.setState({loading: true})
        await this.getTempState()
        this.setState({loading: false})
    }

    getColorTemperature() {
        let color;

        switch (true) {
            case (this.state.temperature[0] >= 27):
                color = '#F11A1A'
                break;
            case (this.state.temperature[0] >= 24 && this.state.temperature[0] < 27):
                color = '#EA3217'
                break;
            case (this.state.temperature[0] >= 21 && this.state.temperature[0] < 24):
                color = '#E34A15'
                break;
            case (this.state.temperature[0] >= 18 && this.state.temperature[0] < 21):
                color = '#DC6212'
                break;
            case (this.state.temperature[0] >= 15 && this.state.temperature[0] < 18):
                color = '#D57A0F'
                break;
            case (this.state.temperature[0] >= 12 && this.state.temperature[0] < 15):
                color = '#CE920D'
                break;
            case (this.state.temperature[0] >= 9 && this.state.temperature[0] < 12):
                color = '#C7AA0A'
                break;
            case (this.state.temperature[0] >= 6 && this.state.temperature[0] < 9):
                color = '#9D8044'
                break;
            case (this.state.temperature[0] >= 3 && this.state.temperature[0] < 6):
                color = '#73567E'
                break;
            case (this.state.temperature[0] >= 0 && this.state.temperature[0] < 3):
                color = '#482CB8'
                break;

            default:
                break;
        }

        return color;
    }


    renderCustomMarker() {
        return (
            <View style={{ backgroundColor: this.getColorTemperature(), borderRadius: 100, width: 30, height: 30 }}>
            </View>
        )
    }
    renderCustomLabel(value) {
        return (
            <View style={{ marginBottom: '20%', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[globalStyle.fontTextMedium, { fontSize: 30 }]}>
                    Température : {value.oneMarkerValue}°C
                </Text>
            </View>
        )
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
                    {/* <View style={{}}>
                        <Icon name="home" size={100} color={consts.BLACK} />
                    </View> */}

                    <View>
                        <MultiSlider
                            values={this.state.temperature}
                            onValuesChange={(temperature) => this.setState({ temperature: temperature })}
                            max={30}
                            selectedStyle={{ backgroundColor: consts.BLACK, alignSelf: 'center' }}
                            enableLabel={true}
                            sliderLength={consts.PHONE_WIDTH / 1.2}
                            customMarker={() => this.renderCustomMarker()}
                            customLabel={this.renderCustomLabel}
                            onValuesChangeFinish={() => this.switchTemperature()}
                        />
                        {/* <View style={{ flexDirection: 'row', width: consts.PHONE_WIDTH / 1.2, justifyContent: 'space-between' }}>
                            <Text style={[globalStyle.fontTextRegular, { fontSize: 18, color: '#482CB8' }]}>0°C</Text>
                            <Text style={[globalStyle.fontTextRegular, { fontSize: 18, color: consts.RED }]}>30°C</Text>
                        </View> */}
                        <View style={{ flexDirection: 'row', width: consts.PHONE_WIDTH / 1.2, justifyContent: 'space-between' }}>
                            <Icon name="thermometer-empty" size={25} color={'#1184e8'} />
                            <Icon name="thermometer-full" size={25} color={consts.RED} />
                        </View>
                    </View>
                </View>
            );
        }
    };

    async getTempState() {
        await fetch(consts.API_URL + '150', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        }).then(res => res.json())
            .then(async data => {
                this.setState({temperature: [data]})
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    async switchTemperature() {
        await fetch(consts.API_URL + '151&slider=' + this.state.temperature[0], {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        }).then(res => res.json())
            .catch(error => {
            console.log('error', error);
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: consts.BACKGROUND_COLOR,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
});

export default Temperature;