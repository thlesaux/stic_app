import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert, ActivityIndicator, Image } from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import consts from '../../src/consts';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

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
        this.setState({loading: false});

        this.props.navigation.setOptions({ title:  consts.ROOMS_TRADUCTION[this.props.currentRoom] + ' - Température' });
    }

    getColorTemperature() {
        let color;

        switch (true) {
            case (this.state.temperature[0] >= 26.5):
                color = '#F11A1A'
                break;
            case (this.state.temperature[0] >= 25.5 && this.state.temperature[0] < 26.5):
                color = '#EA3217'
                break;
            case (this.state.temperature[0] >= 23.5 && this.state.temperature[0] < 25.5):
                color = '#E34A15'
                break;
            case (this.state.temperature[0] >= 22.5 && this.state.temperature[0] < 23.5):
                color = '#DC6212'
                break;
            case (this.state.temperature[0] >= 21.5 && this.state.temperature[0] < 22.5):
                color = '#D57A0F'
                break;
            case (this.state.temperature[0] >= 19.5 && this.state.temperature[0] < 21.5):
                color = '#CE920D'
                break;
            case (this.state.temperature[0] >= 18.5 && this.state.temperature[0] < 19.5):
                color = '#C7AA0A'
                break;
            case (this.state.temperature[0] >= 17.5 && this.state.temperature[0] < 18.5):
                color = '#9D8044'
                break;
            case (this.state.temperature[0] >= 16.5 && this.state.temperature[0] < 17.5):
                color = '#73567E'
                break;
            case (this.state.temperature[0] >= 15 && this.state.temperature[0] < 16.5):
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
                    <View>
                        <MultiSlider
                            values={this.state.temperature}
                            onValuesChange={(temperature) => this.setState({ temperature: temperature })}
                            selectedStyle={{ backgroundColor: consts.BLACK, alignSelf: 'center' }}
                            enableLabel={true}
                            sliderLength={consts.PHONE_WIDTH / 1.2}
                            customMarker={() => this.renderCustomMarker()}
                            customLabel={this.renderCustomLabel}
                            onValuesChangeFinish={() => this.switchTemperature()}
                            max={28}
                            min={15}
                            step={0.5}
                        />
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
        const idGetTemerature = consts.ROOMS_AMENITIES[this.props.currentRoom][this.props.equipment].id_get;


        await fetch(consts.API_URL + idGetTemerature, {
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
        const idSetTemerature = consts.ROOMS_AMENITIES[this.props.currentRoom][this.props.equipment].id_set;

        await fetch(consts.API_URL + `${idSetTemerature}&slider=` + this.state.temperature[0], {
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


const mapStateToProps = (state) => {
    return {
        equipment: state.houseEquipment.name,
        currentRoom: state.rooms.name
    };
}

export default connect(mapStateToProps)(Temperature);