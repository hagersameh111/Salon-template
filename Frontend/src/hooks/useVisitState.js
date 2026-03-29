import { useState, useEffect } from "react"

const defaultData = {
  title: "Visit Us",
  locationLabel: "Location",
  address: "Address...",

  mapUrl: "",
  mapImage: "/map.jpg",

  hoursLabel: "Working Hours",
  hours: [
    { day: "Monday", time: "10:00 - 07:00" }
  ],

  emailLabel: "Email",
  email: "",

  instagram: "",
  whatsapp: "",

  buttonText: "Book Now",
  buttonUrl: "#"
}

export default function useVisitState() {
  const [visitData, setVisitData] = useState(() => {
    const saved = localStorage.getItem("visitData")
    return saved ? JSON.parse(saved) : defaultData
  })

  const [visitDraft, setVisitDraft] = useState(visitData)

  useEffect(() => {
    localStorage.setItem("visitData", JSON.stringify(visitData))
  }, [visitData])

  const startEditingVisit = () => {
    setVisitDraft(JSON.parse(JSON.stringify(visitData)))
  }

  const saveVisit = () => {
    setVisitData(visitDraft)
  }

  const resetVisit = () => {
    setVisitDraft(JSON.parse(JSON.stringify(visitData)))
  }

  return {
    visitData,
    visitDraft,
    setVisitDraft,
    startEditingVisit,
    saveVisit,
    resetVisit
  }
}