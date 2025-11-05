import { NextResponse } from "next/server"

// Import shared pricing data (in production, this would come from a database)
// For now, we'll create a simple data store that both APIs can access
let pricingData = {
  currentPrice: "₹145",
  currentOffer: "20% OFF",
  isOfferActive: true,
  lastUpdated: new Date().toISOString(),
}

// Function to get current pricing data (would be a database query in production)
function getCurrentPricing() {
  return pricingData
}

// Function to update pricing data (would be a database update in production)
function updatePricing(newData: Partial<typeof pricingData>) {
  pricingData = { ...pricingData, ...newData, lastUpdated: new Date().toISOString() }
}

export async function GET() {
  try {
    const data = getCurrentPricing()
    return NextResponse.json({
      currentPrice: data.currentPrice,
      currentOffer: data.currentOffer,
      isOfferActive: data.isOfferActive,
    })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { price, offer, offerActive } = await request.json()

    const updates: any = {}
    if (price !== undefined) updates.currentPrice = price
    if (offer !== undefined) updates.currentOffer = offer
    if (offerActive !== undefined) updates.isOfferActive = offerActive

    updatePricing(updates)
    const updatedData = getCurrentPricing()

    return NextResponse.json({
      success: true,
      currentPrice: updatedData.currentPrice,
      currentOffer: updatedData.currentOffer,
      isOfferActive: updatedData.isOfferActive,
    })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
