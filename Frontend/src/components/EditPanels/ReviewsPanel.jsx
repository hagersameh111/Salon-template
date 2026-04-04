const ReviewsPanel = ({ data, setData, onSave, onReset, onClose }) => {
  const reviews = data?.items || []

  // ✅ UPDATE REVIEW
  const updateReview = (index, key, value) => {
    const updated = [...reviews]
    updated[index] = {
      ...updated[index],
      [key]: value,
    }

    setData({
      ...data,
      items: updated,
    })
  }

  // ✅ ADD REVIEW
  const addReview = () => {
    const newReview = {
      id: Date.now(),
      name: "",
      content: "",
      rating: 5,
    }

    setData({
      ...data,
      items: [...reviews, newReview],
    })
  }

  // ✅ DELETE REVIEW
  const deleteReview = (index) => {
    const updated = reviews.filter((_, i) => i !== index)

    setData({
      ...data,
      items: updated,
    })
  }

  return (
    
    <div className="fixed top-0 right-0 w-[320px] h-full bg-white shadow-xl z-[9999] p-4 overflow-y-auto">

      <h2 className="font-semibold mb-4">Edit Reviews</h2>

    {/* ✅ BACKGROUND IMAGE */}
<img
  src={data.backgroundImage || "/placeholder.jpg"}
  className="w-full h-32 object-cover rounded mb-2"
/>

<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      setData({
        ...data,
        backgroundImage: reader.result, // ✅ save base64
      })
    }

    reader.readAsDataURL(file)
  }}
  className="w-full text-xs mb-4"
/>

      {/* ADD BUTTON */}
      <button
        onClick={addReview}
        className="w-full bg-black text-white py-2 rounded mb-4"
      >
        + Add Review
      </button>

      {/* LIST */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={review.id || index} className="border p-3 rounded">

            {/* NAME */}
            <input
              value={review.name || ""}
              onChange={(e) =>
                updateReview(index, "name", e.target.value)
              }
              className="w-full border p-2 mb-2"
              placeholder="Name"
            />

            {/* TEXT */}
            <textarea
              value={review.content || ""}
              onChange={(e) =>
                updateReview(index, "content", e.target.value)
              }
              className="w-full border p-2 mb-2"
              placeholder="Review text"
            />

            {/* ⭐ RATING */}
            <select
              value={review.rating || 5}
              onChange={(e) =>
                updateReview(index, "rating", Number(e.target.value))
              }
              className="w-full border p-2 mb-2"
            >
              {[1,2,3,4,5].map((num) => (
                <option key={num} value={num}>
                  {num} Stars
                </option>
              ))}
            </select>

            {/* DELETE */}
            <button
              onClick={() => deleteReview(index)}
              className="text-red-500 text-xs mt-2"
            >
              Delete
            </button>

          </div>
        ))}
      </div>

      {/* SAVE */}
      <button
        onClick={onSave}
        className="bg-pink-500 text-white w-full py-2 rounded mt-4 mb-2"
      >
        Save
      </button>

      {/* RESET */}
      <button
        onClick={onReset}
        className="bg-gray-300 w-full py-2 rounded mb-2"
      >
        Reset
      </button>

      {/* CLOSE */}
      <button
        onClick={onClose}
        className="bg-gray-200 w-full py-2 rounded"
      >
        Close
      </button>

    </div>
  )
}

export default ReviewsPanel