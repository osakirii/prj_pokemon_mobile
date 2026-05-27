import { Colors } from '@/constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 52,
        backgroundColor: Colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',   
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})