import { useState, useEffect } from "react"

const useAddonsState = () => {
  const [addonsData, setAddonsData] = useState(() => {
    const saved = localStorage.getItem("addonsData")

    return saved
      ? JSON.parse(saved)
      : {
          backgroundImage: "/spa.jpg",
          items: []
        }
  })

  const [addonsDraft, setAddonsDraft] = useState(addonsData)

  const startEditingAddons = () => {
    setAddonsDraft(addonsData)
  }

  const saveAddons = () => {
    setAddonsData(addonsDraft)
  }

  useEffect(() => {
    localStorage.setItem("addonsData", JSON.stringify(addonsData))
  }, [addonsData])

  return {
    addonsData,
    addonsDraft,
    setAddonsDraft,
    startEditingAddons,
    saveAddons,
  }
}

export default useAddonsState