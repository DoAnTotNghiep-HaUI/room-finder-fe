import React from "react";
export const LocationMap = ({ location }) => {
  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        {location?.specific_address}, {location?.ward}, {location?.district},{" "}
        {location?.city}
      </p>
      <div className="h-[300px] overflow-hidden rounded-lg">
        <iframe
          src="https://maps.app.goo.gl/J5ME7yBQiCEmaWjg6"
          width="600"
          height="450"
          style={{ border: 0 }}
          //   allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};
