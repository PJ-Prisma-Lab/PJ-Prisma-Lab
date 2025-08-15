import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { evaluateExpression } from './calculator';

export default function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleCalculate = async () => {
    const res = await evaluateExpression(expression);
    setResult(res);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={expression}
        onChangeText={setExpression}
        placeholder="Expression"
      />
      <Button title="Calculate" onPress={handleCalculate} />
      <Text style={styles.result}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10
  },
  result: {
    marginTop: 10,
    fontSize: 24,
    textAlign: 'center'
  }
});
