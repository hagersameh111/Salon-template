import { useState, useEffect } from "react"

const defaultAbout = {
  title: "About SŌRA Aesthetics",
  image: "/about.jpg",
  position: -100,
  content: "paragraph1\n\nparagraph2\n\nparagraph3",
}

const useAboutState = () => {
  const [aboutData, setAboutData] = useState(() => {
    const saved = localStorage.getItem("aboutData")
    return saved ? JSON.parse(saved) : defaultAbout
  })

  const [aboutDraft, setAboutDraft] = useState(aboutData)

  useEffect(() => {
    localStorage.setItem("aboutData", JSON.stringify(aboutData))
  }, [aboutData])

  const startEditingAbout = () => {
    setAboutDraft(aboutData)
  }

  const saveAbout = () => {
    setAboutData(aboutDraft)
  }

  const resetAbout = () => {
    setAboutDraft(JSON.parse(JSON.stringify(aboutData)))
  }

  return {
    aboutData,
    aboutDraft,
    setAboutDraft,
    startEditingAbout,
    saveAbout,
    resetAbout,
  }
}

export default useAboutState