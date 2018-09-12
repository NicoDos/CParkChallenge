const geoLocalisationOptions = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000,
};

const getCurrentPosition = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(resolve, reject, geoLocalisationOptions);
});

export default getCurrentPosition;
