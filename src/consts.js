import { Dimensions } from 'react-native';

export default {
    PHONE_HEIGHT: Dimensions.get('window').height,
    PHONE_WIDTH: Dimensions.get('window').width,
    PHONE_DIMENSIONS: Dimensions.get('window').width * Dimensions.get('window').height,

    API_URL: 'https://a39e2300.eu.jeedom.link/core/api/jeeApi.php?apikey=NlXywxyKUKHRxTxmy5ms6gxver67am1b&type=cmd&id=',
    API_URL_LOCAL: '',

    BLUE: '#A1E3E3',
    DARK_BLUE: '#00CED1',
    BACKGROUND_COLOR: '#F8F8F8',
    LIGHT_GRAY: '#9D9D9D',
    GREEN: '#26C397',
    BLACK: '#4E4D53',
    RED: '#cc0000',
    WHITE: '#FFF',
    YELLOW: '#F4D03F',

    FONT_SIZE_TITLE: 32,
    FONT_SIZE_BUTTON: 30,
    ICON_SIZE: 50,

    ROOMS_AMENITIES: {
        'kitchen': {
            'light': { id_on: 222, id_off: 223, id_get : 221 },
            'others': { id_on: 358, id_off: 360, id_get : 357},
            'temperature': { id_get: 279, id_set: 280 },
        },
        'salon': {
            'light': { id_on: 241, id_off: 243, id_get : 240 },
            'others': { id_on: 354, id_off: 355, id_get : 353 },
            'temperature': { id_get: 297, id_set: 298 },
        },
        'bedroom': {
            'light': { id_on: 232, id_off: 233, id_get : 231 },
            'others': { id_on: 368, id_off: 370, id_get : 367 },
            'temperature': { id_get: 315, id_set: 316 },
        },
        'bathroom': {
            'light': { id_on: 236, id_off: 238, id_get : 235 },
            'others': { id_on: 363, id_off: 365, id_get : 362},
            'temperature': { id_get: 333, id_set: 334 },
        },
    },
};
