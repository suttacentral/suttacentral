export default (async function () {
  let geoJSON = await fetch('../files/map-data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Map data fetch response is not ok: status ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Map data fetch error:', error);
    });

  let features = geoJSON.features;

  let layerNames = Array.from(new Set(features.map(feature => feature.properties.layer)));

  return {
    geoJSON,
    features,
    layerNames,
  };
})();
