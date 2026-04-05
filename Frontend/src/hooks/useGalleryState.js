import { useState, useEffect } from "react"

const defaultGallery = {
  instagramUrl: "https://instagram.com/",
  images: [
    { media_url: "/gallery1.jpg", caption: "" },
    { media_url: "/gallery2.jpg", caption: "" },
  ],
}

const useGalleryState = () => {
  // MAIN DATA
  const [galleryData, setGalleryData] = useState(() => {
    const saved = localStorage.getItem("galleryData")
    return saved ? JSON.parse(saved) : defaultGallery
  })

  // DRAFT (editing)
  const [galleryDraft, setGalleryDraft] = useState(galleryData)

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("galleryData", JSON.stringify(galleryData))
  }, [galleryData])

  // OPEN EDIT
  const startEditingGallery = () => {
    setGalleryDraft(galleryData)
  }

  // SAVE
  const saveGallery = () => {
    setGalleryData(galleryDraft)
  }

  // RESET
  const resetGallery = () => {
    const saved = localStorage.getItem("galleryData")
    if (saved) {
      setGalleryDraft(JSON.parse(saved))
    }
  }

  return {
    galleryData,
    galleryDraft,
    setGalleryDraft,
    startEditingGallery,
    saveGallery,
    resetGallery,
  }
}

export default useGalleryState