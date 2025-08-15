const assert = require('assert');
const { evaluateExpression } = require('../frontend/calculator');
const createServer = require('./server');

const server = createServer().listen(3000);

const tests = [];
function test(description, fn) {
  tests.push({ description, fn });
}

test('addition works', async () => {
  assert.strictEqual(await evaluateExpression('2+3'), '5');
});

test('empty expression returns Fehler', async () => {
  assert.strictEqual(await evaluateExpression(''), 'Fehler');
});

test('invalid expression returns Fehler', async () => {
  assert.strictEqual(await evaluateExpression('2++'), 'Fehler');
});

(async () => {
  for (const t of tests) {
    try {
      await t.fn();
      console.log(`✔️  ${t.description}`);
    } catch (error) {
      console.error(`❌  ${t.description}`);
      console.error(error);
      process.exitCode = 1;
    }
  }
  server.close();
})();
