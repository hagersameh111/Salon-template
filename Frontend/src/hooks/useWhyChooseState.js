import { useState, useEffect } from "react"

const defaultWhyChoose = {
  title: "Why Choose SŌRA?",
  subtitle: "A personalized skincare experience focused on real, lasting results.",
  image: "/why-full.jpg",
  features: [
    {
      id: "hijabFriendly",
      title: "Hijab-Friendly",
      desc: "Only female staff and no CCTV for your privacy",
    },
    {
      id: "customized",
      title: "Customized Treatments",
      desc: "Every facial is tailored to your unique skin needs and goals.",
    },
  ],
}

const useWhyChooseState = () => {
  // MAIN DATA
  const [whyChooseData, setWhyChooseData] = useState(() => {
    const saved = localStorage.getItem("whyChooseData")
    return saved ? JSON.parse(saved) : defaultWhyChoose
  })

  // DRAFT
  const [whyChooseDraft, setWhyChooseDraft] = useState(whyChooseData)

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("whyChooseData", JSON.stringify(whyChooseData))
  }, [whyChooseData])

  // START EDIT
  const startEditingWhyChoose = () => {
    setWhyChooseDraft(whyChooseData)
  }

  // SAVE
  const saveWhyChoose = () => {
    setWhyChooseData(whyChooseDraft)
  }

  // RESET
  const resetWhyChoose = () => {
    setWhyChooseDraft(JSON.parse(JSON.stringify(whyChooseData)))
  }

  return {
    whyChooseData,
    whyChooseDraft,
    setWhyChooseDraft,
    startEditingWhyChoose,
    saveWhyChoose,
    resetWhyChoose,
  }
}

export default useWhyChooseState