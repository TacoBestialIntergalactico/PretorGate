import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

function ActSkiAlpineHeightsScreen() {
    return (
        <View style={styles.container}>
            <Text>Activitie Ski - Alpine Heights Screen !</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ActSkiAlpineHeightsScreen;