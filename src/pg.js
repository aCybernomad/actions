const pgp = require('pg-promise')();
const axios = require('axios');

// Replace the following connection details with your Docker container information
const dbConfig = {
  host: '127.0.0.1',
  port: 5432,
  database: 'iss-db',
  user: 'awesome',
  password: 'pass',
};

const db = pgp(dbConfig);

// Skapa tanell om den ej finnes, annars hoppa över
const ensureSchema = async () => {
  console.log(await db.func('version'))
  try {
    await db.none(`
      create table if not exists iss_locate (
        log_id BIGINT PRIMARY KEY generated always as identity,
        longitude VARCHAR(50),
        latitude VARCHAR(50)
      );
    `);
    console.log('Table created successfully');

    // Läs in ISS-positions data mha API
    async function logIssCoordinates() {
      const apiUrl = 'http://api.open-notify.org/iss-now.json';
    
      try {
        const response = await axios.get(apiUrl);
        const { message, iss_position } = response.data;
    
        if (message === 'success' && iss_position) {
          const { latitude, longitude } = iss_position;
          console.log(`ISS Position -> Latitude: ${latitude}, Longitude: ${longitude}`);
          // Write data to the table
          await db.query('INSERT INTO iss_locate(longitude, latitude) VALUES($1, $2)', [longitude, latitude]);
          //console.log('Data written to iss_locate table successfully');
        } else {
          console.log('Failed to fetch ISS position');
        }
      } catch (error) {
        console.error('Error fetching ISS position:', error.message);
      }
    }
    
    // Fetch and write data every 5 seconds
    setInterval(async () => {
      await logIssCoordinates();
    }, 5 * 1000); // 5 seconds in milliseconds
  } catch (error) {
    console.error('Error creating table or writing data:', error);
  } finally {
    // Close the database connection
    //pgp.end();
  }
};

ensureSchema();


