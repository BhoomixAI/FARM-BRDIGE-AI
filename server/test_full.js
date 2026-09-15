const { spawn } = require('child_process');
const http = require('http');

const server = spawn('node', ['server.js'], { cwd: '.', stdio: 'ignore' });

function safeParse(data) {
  try { return JSON.parse(data); } catch (e) { return { _raw: data }; }
}

function get(path) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:5000' + path, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: safeParse(data) }));
    }).on('error', reject);
  });
}

function post(path, body) {
  return new Promise((resolve, reject) => {
    const d = JSON.stringify(body);
    const req = http.request({ hostname: 'localhost', port: 5000, path, method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(d) } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: safeParse(data) }));
    });
    req.on('error', reject);
    req.write(d);
    req.end();
  });
}

async function run() {
  await new Promise(r => setTimeout(r, 2000));

  let errors = [];

  // TEST 1: GET /
  try {
    const r = await get('/');
    console.log('TEST 1 GET /:', r.body.message);
  } catch (e) { errors.push('TEST 1: ' + e.message); }

  // TEST 2: GET /api/produce
  try {
    const r = await get('/api/produce');
    console.log('TEST 2 GET /api/produce:', r.body.length, 'listings');
    console.log('  Initial Potato present:', r.body.some(l => l.produce === 'Potato'));
  } catch (e) { errors.push('TEST 2: ' + e.message); }

  // TEST 3: POST /api/produce with missing fields
  try {
    const r = await post('/api/produce', {});
    console.log('TEST 3 POST /api/produce missing fields:', r.status, r.body.error);
  } catch (e) { errors.push('TEST 3: ' + e.message); }

  // TEST 4: POST /api/produce with invalid quantity
  try {
    const r = await post('/api/produce', { produce: 'Apple', quantity: -5 });
    console.log('TEST 4 POST /api/produce invalid qty:', r.status, r.body.error);
  } catch (e) { errors.push('TEST 4: ' + e.message); }

  // TEST 5: POST /api/voice/process with "I have 10 kg potatoes" (simulated since AI needs key)
  // We simulate the intent directly since we can't call the AI API reliably
  try {
    const r = await post('/api/voice/process', { text: 'I have 10 kg potatoes', sessionId: 'test1' });
    console.log('TEST 5 POST /api/voice/process (potatoes):', r.status, 'intent:', r.body.intent?.intent);
    if (r.body.intent?.intent === 'SELLER') {
      console.log('  Response:', r.body.response);
    }
  } catch (e) { errors.push('TEST 5: ' + e.message); }

  // TEST 6: GET /api/produce verify new listing
  try {
    const r = await get('/api/produce');
    const newPotato = r.body.filter(l => l.produce === 'Potato' && l.quantity === 10);
    console.log('TEST 6 GET /api/produce after voice:');
    console.log('  Total listings:', r.body.length);
    console.log('  Voice-created Potato (qty=10):', newPotato.length === 1);
    if (newPotato.length > 0) {
      const lp = newPotato[0];
      console.log('  Has unique id (>=100):', lp.id >= 100);
      console.log('  Has image:', !!lp.image);
      console.log('  Price is 25:', lp.price === 25);
      console.log('  Farmer is F001:', lp.farmerId === 'F001');
      console.log('  Unit is kg:', lp.unit === 'kg');
    }
  } catch (e) { errors.push('TEST 6: ' + e.message); }

  // TEST 7: GET /api/matches/:buyerId
  try {
    const r = await get('/api/matches/B001');
    console.log('TEST 7 GET /api/matches/B001:', r.body.matches ? r.body.matches.length + ' matches' : 'no matches');
  } catch (e) { errors.push('TEST 7: ' + e.message); }

  // TEST 8: GET /api/logistics/F001/B001
  try {
    const r = await get('/api/logistics/F001/B001');
    console.log('TEST 8 GET /api/logistics/F001/B001: distance=' + r.body.distanceKm + 'km');
  } catch (e) { errors.push('TEST 8: ' + e.message); }

  // TEST 9: POST /api/buyer-requirements
  try {
    const r = await post('/api/buyer-requirements', { buyerId: 'B002', produce: 'Potato', quantity: 30 });
    console.log('TEST 9 POST /api/buyer-requirements:', r.status);
  } catch (e) { errors.push('TEST 9: ' + e.message); }

  // TEST 10: GET /api/buyer-requirements
  try {
    const r = await get('/api/buyer-requirements');
    console.log('TEST 10 GET /api/buyer-requirements:', r.body.length, 'requirements');
  } catch (e) { errors.push('TEST 10: ' + e.message); }

  // TEST 11: POST /api/voice/process with UNKNOWN intent simulation
  try {
    const r = await post('/api/voice/process', { text: 'asdfghjkl', sessionId: 'test2' });
    console.log('TEST 11 UNKNOWN intent:', r.status, r.body.error);
  } catch (e) { errors.push('TEST 11: ' + e.message); }

  // TEST 12: POST /api/produce valid
  try {
    const r = await post('/api/produce', { farmerId: 'F001', produce: 'Mango', quantity: 100, unit: 'kg', price: 80 });
    console.log('TEST 12 POST /api/produce valid:', r.status, 'produce:', r.body.produce?.produce);
  } catch (e) { errors.push('TEST 12: ' + e.message); }

  // TEST 13: POST /api/voice/process buyer flow
  try {
    const r = await post('/api/voice/process', { text: 'I need 50 kg tomatoes in Delhi', sessionId: 'test3' });
    console.log('TEST 13 Buyer intent:', r.body.intent?.intent, 'product:', r.body.intent?.product);
    console.log('  Context matches:', r.body.context?.matches?.length || 0, 'matches');
  } catch (e) { errors.push('TEST 13: ' + e.message); }

  console.log('\n=== SUMMARY ===');
  console.log('Errors:', errors.length > 0 ? errors : 'None');
  server.kill();
  process.exit(0);
}

run();
