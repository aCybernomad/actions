const Koa = require('koa');
const axios = require('axios');
const views = require('koa-views');
const path = require('path');
const Router = require('koa-router');


const app = new Koa();
const router = new Router();

// Set up EJS as the template engine
// app.use(views(path.join(__dirname, 'views'), { extension: 'ejs' }));

// async function updateCoordinates(ctx) {
//   const apiUrl = 'http://api.open-notify.org/iss-now.json';

//   // Make the API call using Axios
//   const response = await axios.get(apiUrl);

//   // Extract latitude and longitude from the response data
//   const { message, iss_position } = response.data;

//   if (message === 'success' && iss_position) {
//     const { latitude, longitude } = iss_position;

//     // Render the index.ejs template with latitude and longitude
//     await ctx.render('index', {
//       latitude,
//       longitude,
//     });
//   } else {
//     // Respond with an error message
//     ctx.status = 500;
//     ctx.body = { error: 'API request failed' };
//   }
// };

// Function to fetch ISS coordinates and log them
async function logIssCoordinates() {
  const apiUrl = 'http://api.open-notify.org/iss-now.json';

  try {
    const response = await axios.get(apiUrl);
    const { message, iss_position } = response.data;

    if (message === 'success' && iss_position) {
      const { latitude, longitude } = iss_position;
      console.log(`ISS Position -> Latitude: ${latitude}, Longitude: ${longitude}`);
    } else {
      console.log('Failed to fetch ISS position');
    }
  } catch (error) {
    console.error('Error fetching ISS position:', error.message);
  }
}

// Define the /health route
router.get('/health', async (ctx, next) => {
  await logIssCoordinates(); // Log the ISS coordinates
  ctx.body = 'All systems go! - Status 200'; // Respond to the request
});

// Use the router
app.use(router.routes()).use(router.allowedMethods());

// app.listen(3000, () => {
//   console.log('.:: Locked on to ISS ::.');
// })

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`.:: Locked on to ISS - Port: ${port} ::.`);
});

  // Log ISS coordinates to the console every second
setInterval(() => {
  logIssCoordinates();
}, 2000);
