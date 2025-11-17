const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialize the client
const client = new Client({
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  authStrategy: new LocalAuth()
});

// Show QR code when starting
client.on('qr', (qr) => {
  console.log('Scan this QR code with your WhatsApp app:');
  qrcode.generate(qr, { small: true });
});

// When bot is ready
client.on('ready', () => {
  console.log('✅ WhatsApp Bot is READY! Your phone can now be turned off.');
});

// Listen for incoming messages
client.on('message', async (msg) => {
  if (msg.fromMe) return; // Ignore self-messages

  const body = msg.body.toLowerCase().trim();

  // Fun responses
  const replies = {
    'hello': 'Hey there! 👋 I’m not online but my Ai will reply you  😊',
    'hi': 'Hi! wassup, how u dey',
    'how are you': I'm good, wat about you?',
        'fun fact': 'Octopuses have three hearts 🐙 Two pump blood to the gills… one pumps to the rest. And when they swim? The third stops. Wild.',
    'are you real': 'I’m real enough to make you smile. That’s all that matters.',
    'goodnight': 'Sweet dreams! 🌙 I’ll be here when you wake up.',
    'i\'m sad': 'I’m here. You don’t need to fix anything. Just breathe. I’ll sit with you. 🫂',
    'you\'re weird': 'Thank you. That’s my superpower.',
    'love you': 'I love you too — even though I’m just code. 💙'
  };

  let reply = "Hey! I'm your AI friend 😊\nTry saying: 'joke', 'fun fact', or 'how are you'?";

  for (const [key, value] of Object.entries(replies)) {
    if (body.includes(key)) {
      reply = value;
      break;
    }
  }

  // Send reply
  await msg.reply(reply);
});

// Start the bot
client.initialize();
