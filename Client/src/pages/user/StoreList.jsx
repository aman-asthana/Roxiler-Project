import { useEffect, useState } from "react";
import { getStores } from "../../api/store";
import { submitRatingAPI, updateRatingAPI } from "../../api/rating";

const StoreList = ()=> {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [ratingValue, setRatingValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    address: "",
  });

  const loadStores = async () => {
    try {
      const res = await getStores(filters);
      setStores(res.data);
    } catch (err) {
      console.error("Failed to load stores:", err);
      alert("Failed to load stores. Please try again.");
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    loadStores();
  };

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
      alert("Error saving rating", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Stores</h2>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Search by Name"
          value={filters.name}
          onChange={handleFilterChange}
          className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="text"
          name="address"
          placeholder="Search by Address"
          value={filters.address}
          onChange={handleFilterChange}
          className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
        >
          Search
        </button>
      </div>

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
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all animate-fade-in">
            

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>


            <div className="text-center mb-6">
              <div className="text-5xl mb-3">⭐</div>
              <h3 className="text-2xl font-bold text-gray-800">
                {selectedStore?.user_rating ? "Update Your Rating" : "Rate This Store"}
              </h3>
              <p className="text-gray-500 mt-1 text-sm">
                {selectedStore?.name}
              </p>
            </div>


            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setRatingValue(num)}
                  className={`text-4xl transition-all duration-200 transform hover:scale-125 ${
                    ratingValue >= num 
                      ? "text-yellow-400 drop-shadow-lg" 
                      : "text-gray-300 hover:text-yellow-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>


            <div className="text-center mb-6">
              <span className={`text-lg font-semibold px-4 py-2 rounded-full ${
                ratingValue === 5 ? "bg-green-100 text-green-700" :
                ratingValue === 4 ? "bg-blue-100 text-blue-700" :
                ratingValue === 3 ? "bg-yellow-100 text-yellow-700" :
                ratingValue === 2 ? "bg-orange-100 text-orange-700" :
                ratingValue === 1 ? "bg-red-100 text-red-700" :
                "bg-gray-100 text-gray-500"
              }`}>
                {ratingValue === 5 ? "⭐ Excellent!" :
                 ratingValue === 4 ? "👍 Very Good" :
                 ratingValue === 3 ? "😊 Good" :
                 ratingValue === 2 ? "😐 Fair" :
                 ratingValue === 1 ? "👎 Poor" :
                 "Select a rating"}
              </span>
            </div>


            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                  ratingValue 
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleRatingSubmit}
                disabled={!ratingValue}
              >
                {selectedStore?.user_rating ? "Update" : "Submit"} Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoreList