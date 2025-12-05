import React from "react";

export default function StoreCard({ store, onRate }) {
  return (
    <div className="border rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition">

      <h2 className="text-xl font-semibold text-gray-800">{store.name}</h2>

      <p className="text-gray-600 text-sm mt-1">{store.address}</p>

      <div className="flex justify-between items-center mt-4">

        <div>
          <p className="text-gray-500 text-sm">Overall Rating</p>
          <p className="text-lg font-bold text-blue-600">
            {store.overall_rating ? Number(store.overall_rating).toFixed(1) : "—"}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Your Rating</p>
          <p className="text-lg font-bold text-green-600">
            {store.user_rating ? store.user_rating : "—"}
          </p>
        </div>
      </div>


      <button
        className={`mt-4 w-full py-2 rounded ${
          store.user_rating
            ? "bg-yellow-600 hover:bg-yellow-700"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white font-semibold transition`}
        onClick={() => onRate(store)}
      >
        {store.user_rating ? "Update Rating" : "Rate Now"}
      </button>
    </div>
  );
}
