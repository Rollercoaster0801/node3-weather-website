const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=79d67ed4f7b158242a0facc81e2bfee8&query=${latitude},${longitude}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search", undefined);
    } else if (!body.location.name) {
      callback("No data for that location.", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. There is ${body.current.precip}% chance of rain. The wind direction is ${body.current.wind_dir}.`
      );
    }
  });
};

module.exports = forecast;
