import { useEffect, useState } from "react";
import { getStores } from "../../api/store";
import { submitRatingAPI, updateRatingAPI } from "../../api/rating";

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [ratingValue, setRatingValue] = useState("");
  const [showModal, setShowModal] = useState(false);


  const loadStores = async () => {
    const res = await getStores();
    setStores(res.data);
  };

  useEffect(() => {
    loadStores();
  }, []);

  const openRating = (store) => {
    setSelectedStore(store);
    setRatingValue(store.user_rating ? Number(store.user_rating) : "");
    setShowModal(true);
  };


  const handleRatingSubmit = async () => {
    if (!ratingValue) {
      alert("Please select a rating");
      return;
    }

    try {
      if (!selectedStore.user_rating) {
        await submitRatingAPI(selectedStore.id, ratingValue);
      } else {
        await updateRatingAPI(selectedStore.id, ratingValue);
      }

      alert("Rating saved!");
      setShowModal(false);
      loadStores();
    } catch (err) {
      alert("Error saving rating");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Stores</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div
            key={store.id}
            className="p-5 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >

            <h3 className="text-xl font-semibold text-gray-800">
              {store.name}
            </h3>


            <p className="text-gray-600 text-sm mt-2">{store.address}</p>

            <div className="flex justify-between mt-4">
              <div>
                <p className="text-gray-500 text-xs">Overall Rating</p>
                <p className="font-bold text-blue-600 text-lg">
                  {store.overall_rating
                    ? Number(store.overall_rating).toFixed(1)
                    : "—"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">Your Rating</p>
                <p className="font-bold text-green-600 text-lg">
                  {store.user_rating ? store.user_rating : "—"}
                </p>
              </div>
            </div>


            <button
              className={`mt-5 w-full py-2 rounded text-white font-semibold transition ${
                store.user_rating
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={() => openRating(store)}
            >
              {store.user_rating ? "Update Rating" : "Rate Now"}
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-80 shadow-md">
            <h3 className="text-xl font-bold mb-4">
              {selectedStore?.user_rating ? "Update Rating" : "Submit Rating"}
            </h3>

            <select
              className="border p-2 rounded w-full mb-4"
              value={ratingValue}
              onChange={(e) => setRatingValue(Number(e.target.value))}
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                className="px-3 py-1 bg-gray-400 text-white rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-3 py-1 bg-blue-600 text-white rounded"
                onClick={handleRatingSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
