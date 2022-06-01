const https = require('https');

/**
 * Do a request with options provided.
 *
 * @param {Object} options
 * @param {Object} data
 * @return {Promise} a promise of request
 */
export function doRequest(options, data = "") {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += String.fromCharCode(...chunk);
      });

      res.on('end', () => {
        const response = JSON.parse(responseBody);
        resolve(response);
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(data);
    req.end();
  });
}
