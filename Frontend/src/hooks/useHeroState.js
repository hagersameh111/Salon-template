import { useState, useEffect } from "react"

const defaultHero = {
  title: "Default Title",
  description: "Default Description",
  button: "Book Now",
}

const useHeroState = () => {
  // MAIN DATA
  const [heroData, setHeroData] = useState(() => {
    const saved = localStorage.getItem("heroData")
    return saved ? JSON.parse(saved) : defaultHero
  })

  // DRAFT
  const [heroDraft, setHeroDraft] = useState(heroData)

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("heroData", JSON.stringify(heroData))
  }, [heroData])

  // START EDIT
  const startEditingHero = () => {
    setHeroDraft(heroData)
  }

  // SAVE
  const saveHero = () => {
    setHeroData(heroDraft)
  }

  return {
    heroData,
    heroDraft,
    setHeroDraft,
    startEditingHero,
    saveHero,
  }
}

export default useHeroState