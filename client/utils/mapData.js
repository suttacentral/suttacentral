import { API_ROOT } from '../constants';

export default (async function () {
  const geoJSON = await fetch(`${API_ROOT}/map_data`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Map data fetch response is not ok: status ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Map data fetch error:', error);
    });

  const { features } = geoJSON[0];

  const layerNames = Array.from(new Set(features.map(feature => feature.properties.layer)));

  return {
    geoJSON,
    features,
    layerNames,
  };
})();
