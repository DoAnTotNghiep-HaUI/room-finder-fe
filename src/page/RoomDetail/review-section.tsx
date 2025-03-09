import React from "react";
import { BiStar } from "react-icons/bi";
export const ReviewSection = () => {
  const reviews = [
    {
      id: 1,
      author: "John Doe",
      rating: 5,
      date: "2 months ago",
      comment:
        "Great location and very clean. The landlord was very responsive and helpful.",
      avatar: "https://placehold.co/100x100?text=JD",
    },
  ];
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Reviews</h3>
        <button className="text-blue-600 hover:text-blue-700">
          Write a Review
        </button>
      </div>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b pb-6"
          >
            <div className="mb-4 flex items-center gap-4">
              <img
                src={review.avatar}
                alt={review.author}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <div className="font-medium">{review.author}</div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <BiStar
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="ml-auto text-sm text-gray-500">{review.date}</div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
