import { View, Text, StyleSheet } from 'react-native';

export default function Signup() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup Page</Text>
      {/* Add your signup form here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});