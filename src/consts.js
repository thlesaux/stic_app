import { Dimensions } from 'react-native';

export default {
    PHONE_HEIGHT: Dimensions.get('window').height,
    PHONE_WIDTH: Dimensions.get('window').width,
    PHONE_DIMENSIONS: Dimensions.get('window').width * Dimensions.get('window').height,

    API_URL: '',
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
            'light': { id: 255 },
            'shutters': { id: 301 },
            'temperature': { id: 21 },
        },
        'salon': {
            'light': { id: 255 },
            'shutters': { id: 301 },
            'temperature': { id: 21 },
        },
        'bedroom': {
            'light': { id: 255 },
            'shutters': { id: 301 },
            'temperature': { id: 21 },
        },
    },
};
