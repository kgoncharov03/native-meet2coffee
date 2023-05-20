import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        paddingHorizontal: 8,
    },
    input: {
        fontSize: 20,
        height: 40,
        borderTopColor: '#a9a9a9',
        borderTopWidth: 2,
        borderBottomColor: '#a9a9a9',
        borderBottomWidth: 2,
        backgroundColor: 'white',
        padding: 10,
    },
    error: {
        marginTop: 5,
        color: 'red',
    },
});
