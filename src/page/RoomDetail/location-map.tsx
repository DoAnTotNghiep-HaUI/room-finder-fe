import React from "react";
export const LocationMap = ({
  location,
}: {
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}) => {
  return (
    <div className="space-y-4">
      <p className="text-gray-600">{location.address}</p>
      <div className="h-[300px] overflow-hidden rounded-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4418.452525771838!2d106.27475577421538!3d21.37174985215519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135691e18a5296f%3A0x57dd5c12ffdc425a!2zTmjDoCBWxINuIEhvw6EgVGjDtG4gVGjhu5FuZyBOaOG6pXQsIFjDoyBZw6puIE3hu7ksIEh1eeG7h24gTOG6oW5nIEdpYW5nLCBU4buJbmggQuG6r2MgR2lhbmc!5e0!3m2!1svi!2s!4v1741099536204!5m2!1svi!2s"
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
