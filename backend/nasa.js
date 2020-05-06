const axios = require("axios");

(async () => {
  let metajson = await axios.get("https://epic.gsfc.nasa.gov/api/enhanced");
  let year = metajson.data[0].date.substring(0, 4);
  let month = metajson.data[0].date.substring(5, 7);
  let day = metajson.data[0].date.substring(8, 10);
  let image = `<img
  src="https://epic.gsfc.nasa.gov/archive/enhanced/${year}/${month}/${day}/jpg/${metajson.data[0].image}.jpg"
   alt="${metajson.data[0].caption}">`;

  let htmlsnippet = `<div style="display:flex">
                        ${image}</div>`;
  return htmlsnippet;
})()
  .then((sn) => (module.exports.message = sn))
  .catch((err) => console.log(err.message));
