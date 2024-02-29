const Koa = require('koa');
const axios = require('axios');
const Router = require('koa-router');
const fs = require('fs').promises; // Use fs.promises for async file operations
const app = new Koa();
const router = new Router();

// Läs in ISS-positions data mha API
async function logIssCoordinates() {
  const apiUrl = 'http://api.open-notify.org/iss-now.json';

  try {
    const response = await axios.get(apiUrl);
    const { message, iss_position } = response.data;

    if (message === 'success' && iss_position) {
      const { latitude, longitude } = iss_position;
      const timestamp = new Date().toISOString();
      const logEntry = `${timestamp}, ${latitude}, ${longitude}\n`;

      // Append the log entry to the CSV file
      await fs.appendFile('issCoordinates.csv', logEntry);
      console.log(logEntry);
    } else {
      console.log('Failed to fetch ISS position');
    }
  } catch (error) {
    console.error('Error fetching ISS position:', error.message);
  }
}

// Define /health route
router.get('/health', async (ctx, next) => {
  await logIssCoordinates(); // Log the ISS coordinates
  ctx.body = 'All systems go! - Status 200'; // Respond to the request
});

// Use the router
app.use(router.routes()).use(router.allowedMethods());

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`.:: Locked on to ISS - Port: ${port} ::.`);
});

// Log the positions to the console and write to the CSV file every x seconds
setInterval(() => {
  logIssCoordinates();
}, 2000);
