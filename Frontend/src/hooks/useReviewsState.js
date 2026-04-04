import { useState, useEffect } from "react"

const useReviewsState = () => {
  const [reviewsData, setReviewsData] = useState(() => {
    const saved = localStorage.getItem("reviewsData")

    return saved
      ? JSON.parse(saved)
      : {
          backgroundImage: "/spa.jpg",
          items: []
        }
  })

  const [reviewsDraft, setReviewsDraft] = useState(reviewsData)

  const startEditingReviews = () => {
    setReviewsDraft(reviewsData)
  }

  const saveReviews = () => {
    setReviewsData(reviewsDraft)
  }

  useEffect(() => {
    localStorage.setItem("reviewsData", JSON.stringify(reviewsData))
  }, [reviewsData])

  return {
    reviewsData,
    reviewsDraft,
    setReviewsDraft,
    startEditingReviews,
    saveReviews,
  }
}

export default useReviewsState