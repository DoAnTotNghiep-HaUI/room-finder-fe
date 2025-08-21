import React from "react";
export const LocationMap = ({ location }) => {
  console.log("location", location);

  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        {location?.specific_address}, {location?.ward}, {location?.district},{" "}
        {location?.city}
      </p>
      <div className="h-[300px] overflow-hidden rounded-lg">
        <div dangerouslySetInnerHTML={{ __html: location?.google_map_link }} />
      </div>
    </div>
  );
};
