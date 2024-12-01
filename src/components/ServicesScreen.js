import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';


function ServicesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Services Screen!</Text>
      <StatusBar style="auto" />

      <Button
        onPress={() => navigation.navigate('Room Services')}
        title="Go to Room Services"
      />

      <Button
        onPress={() => navigation.navigate('Restaurant')}
        title="Go to Restaurant"
      />

      <Button
        onPress={() => navigation.navigate('Spa')}
        title="Go to Spa"
      />

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

export default ServicesScreen;