import { useState, useEffect } from "react"

const useServicesState = () => {
  const [servicesData, setServicesData] = useState(() => {
    const saved = localStorage.getItem("servicesData")

    return saved
      ? JSON.parse(saved)
      : {
          categories: [
            { id: "skincare", name: "SkinCare" },
            { id: "waxing", name: "Waxing" }
          ],
          services: []
        }
  })

  const [servicesDraft, setServicesDraft] = useState(servicesData)

  const startEditingServices = () => {
    setServicesDraft(servicesData)
  }

  const saveServices = () => {
    setServicesData(servicesDraft)
  }

  useEffect(() => {
    localStorage.setItem("servicesData", JSON.stringify(servicesData))
  }, [servicesData])

  return {
    servicesData,
    servicesDraft,
    setServicesDraft,
    startEditingServices,
    saveServices,
  }
}

export default useServicesState