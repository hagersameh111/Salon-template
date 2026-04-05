import { useState, useEffect } from "react"

const defaultData = {
  name: "SŌRA",
  subName: "AESTHETICS",
  logo: "/logo.png",
  slogan: "Made with ❤️ for your skin",
  copyright: "© 2026 SŌRA Aesthetics. All rights reserved."
}

const useFooterState = () => {

  // ================= DATA =================
  const [footerData, setFooterData] = useState(() => {
    const saved = localStorage.getItem("footerData")
    return saved ? JSON.parse(saved) : defaultData
  })

  // ================= DRAFT =================
  const [footerDraft, setFooterDraft] = useState(footerData)

  // ================= SAVE =================
  const saveFooter = () => {
    setFooterData(footerDraft)
  }

  // ================= RESET =================
  const resetFooter = () => {
    setFooterDraft(JSON.parse(JSON.stringify(footerData)))
  }

  // ================= START EDIT =================
  const startEditingFooter = () => {
    setFooterDraft(JSON.parse(JSON.stringify(footerData)))
  }

  // ================= PERSIST =================
  useEffect(() => {
    localStorage.setItem("footerData", JSON.stringify(footerData))
  }, [footerData])

  return {
    footerData,
    footerDraft,
    setFooterDraft,
    saveFooter,
    resetFooter,
    startEditingFooter,
  }
}

export default useFooterState