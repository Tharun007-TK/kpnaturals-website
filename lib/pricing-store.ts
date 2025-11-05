interface PricingData {
  currentPrice: string
  currentOffer: string
  isOfferActive: boolean
  lastUpdated: string
}

interface PricingUpdate {
  timestamp: string
  field: string
  oldValue: string
  newValue: string
  updatedBy: string
}

// Shared pricing state (in production, this would be a database)
let pricingData: PricingData = {
  currentPrice: "₹145",
  currentOffer: "20% OFF",
  isOfferActive: true,
  lastUpdated: new Date().toISOString(),
}

let updateHistory: PricingUpdate[] = []

export function getPricingData(): PricingData {
  return { ...pricingData }
}

export function updatePricingData(updates: Partial<PricingData>, updatedBy = "system"): PricingData {
  const timestamp = new Date().toISOString()

  // Track changes
  Object.entries(updates).forEach(([key, newValue]) => {
    if (key in pricingData && newValue !== undefined) {
      const oldValue = pricingData[key as keyof PricingData]
      if (oldValue !== newValue) {
        updateHistory.push({
          timestamp,
          field: key,
          oldValue: String(oldValue),
          newValue: String(newValue),
          updatedBy,
        })
      }
    }
  })

  // Update data
  pricingData = {
    ...pricingData,
    ...updates,
    lastUpdated: timestamp,
  }

  // Keep only last 50 history entries
  if (updateHistory.length > 50) {
    updateHistory = updateHistory.slice(-50)
  }

  return { ...pricingData }
}

export function getPricingHistory(): PricingUpdate[] {
  return [...updateHistory].reverse() // Most recent first
}
