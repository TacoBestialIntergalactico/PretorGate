import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

function ActSkyDivingAlpineHeightsScreen() {
    return (
        <View style={styles.container}>
            <Text>Activitie Sky Diving - Alpine Heights Screen !</Text>
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

export default ActSkyDivingAlpineHeightsScreen;