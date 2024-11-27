import React from 'react';

interface StaticMapProps {
  origin: { lat: number; lng: number };
  destiny: { lat: number; lng: number };
  googleApiKey: string;
}

const StaticMap: React.FC<StaticMapProps> = ({ origin, destiny, googleApiKey }) => {
  const getGoogleStaticMapUrl = (origin: { lat: number; lng: number }, destiny: { lat: number; lng: number }) => {
    return `https://maps.googleapis.com/maps/api/staticmap?size=600x300&markers=color:blue|${origin.lat},${origin.lng}&markers=color:red|${destiny.lat},${destiny.lng}&path=color:0xff0000ff|weight:2|${origin.lat},${origin.lng}|${destiny.lat},${destiny.lng}&key=${googleApiKey}`;
  };

  const mapUrl = getGoogleStaticMapUrl(origin, destiny);

  return (
    <div>
      <img src={mapUrl} alt="Static map between points" />
    </div>
  );
};

export default StaticMap;