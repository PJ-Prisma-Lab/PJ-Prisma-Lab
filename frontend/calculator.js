async function evaluateExpression(expr) {
  if (expr.trim() === '') {
    return 'Fehler';
  }
  try {
    const response = await fetch('http://localhost:3000/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expression: expr })
    });
    if (!response.ok) {
      return 'Fehler';
    }
    const data = await response.json();
    return data.result.toString();
  } catch (e) {
    return 'Fehler';
  }
}

if (typeof module !== 'undefined') {
  module.exports = { evaluateExpression };
}
