const Koa = require('koa');
const axios = require('axios');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();



// Läs in ISS-positions data mha API
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
