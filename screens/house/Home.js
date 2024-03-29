import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';

import consts from '../../src/consts';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
    }

    /**
    * 
    * @param {string} status 
    * Function with redux who save the current equipment
    * 
   */
    setEquipment(status) {
        const action = {
            type: status
        }
        this.props.dispatch(action);
    }






    render() {
        if (this.state.loading) {
            return (
                <View style={globalStyle.containerLoading}>
                    <ActivityIndicator size="large" color={consts.BLUE} />
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={{ width: '90%', marginTop: '8%' }}>
                        <Text style={[globalStyle.fontTextRegular, { fontSize: 32, color: consts.BLACK }]}>Bienvenue</Text>
                    </View>
                    <View style={{ width: '90%', alignItems: 'center' }}>
                        <Icon name="home" size={200} color={consts.BLACK} />
                    </View>
                    <View style={{ width: '90%', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.button} onPress={() => [this.setEquipment('temperature'), this.props.navigation.navigate('Rooms')]}>
                            <View style={styles.iconButton}>
                                <Icon name="thermometer-three-quarters" size={30} color={consts.BLACK} />
                            </View>
                            <Text style={[globalStyle.fontTextRegular, styles.textButton]}>Température</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => [this.setEquipment('light'), this.props.navigation.navigate('Rooms')]}>
                            <View style={styles.iconButton}>
                                <Ionicon name="ios-bulb" size={30} color={consts.BLACK} />
                            </View>
                            <Text style={[globalStyle.fontTextRegular, styles.textButton]}>Lumières</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Alarm')}>
                            <View style={styles.iconButton}>
                                <Icon name="lock" size={30} color={consts.BLACK} />
                            </View>
                            <Text style={[globalStyle.fontTextRegular, styles.textButton]}>Sécurité</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => [this.setEquipment('others'), this.props.navigation.navigate('Rooms')]}>
                            <View style={styles.iconButton}>
                                <Icon name="ellipsis-h" size={30} color={consts.BLACK} />
                            </View>
                            <Text style={[globalStyle.fontTextRegular, styles.textButton]}>Autres</Text>
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
        justifyContent: 'space-evenly'
    },
    button: {
        flexDirection: "row",
        backgroundColor: consts.BLUE,
        width: '90%',
        alignItems: 'center',
        padding: '5%',
        borderRadius: 5,
        marginBottom: '5%',
        justifyContent: 'center'
    },
    textButton: {
        color: consts.BLACK,
        fontSize: 24,
    },
    iconButton: {
        position: 'absolute',
        left: 0,
        marginLeft: '5%',
        alignItems: 'center',
        width: '5%'
    }
});


const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps)(Home);

