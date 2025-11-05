import { type NextRequest, NextResponse } from "next/server"

// Enhanced in-memory storage with audit trail (in production, use a database)
let currentPrice = "₹145"
let currentOffer = "20% OFF"
let isOfferActive = true
let lastUpdated = new Date().toISOString()
let updateHistory: Array<{
  timestamp: string
  field: string
  oldValue: string
  newValue: string
  updatedBy: string
}> = []

export async function GET() {
  try {
    return NextResponse.json({
      currentPrice,
      currentOffer,
      isOfferActive,
      lastUpdated,
      updateHistory: updateHistory.slice(-10), // Return last 10 updates
    })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { currentPrice: newPrice, currentOffer: newOffer, isOfferActive: newOfferActive } = body

    // Validate input
    if (newPrice && (typeof newPrice !== "string" || !newPrice.startsWith("₹"))) {
      return NextResponse.json({ error: "Invalid price format. Must start with ₹" }, { status: 400 })
    }

    if (newOffer && typeof newOffer !== "string") {
      return NextResponse.json({ error: "Invalid offer format" }, { status: 400 })
    }

    if (newOfferActive !== undefined && typeof newOfferActive !== "boolean") {
      return NextResponse.json({ error: "Invalid offer status" }, { status: 400 })
    }

    const timestamp = new Date().toISOString()
    const updatedBy = "admin" // In production, get from authenticated user

    // Track changes and update values
    if (newPrice && newPrice !== currentPrice) {
      updateHistory.push({
        timestamp,
        field: "price",
        oldValue: currentPrice,
        newValue: newPrice,
        updatedBy,
      })
      currentPrice = newPrice
    }

    if (newOffer && newOffer !== currentOffer) {
      updateHistory.push({
        timestamp,
        field: "offer",
        oldValue: currentOffer,
        newValue: newOffer,
        updatedBy,
      })
      currentOffer = newOffer
    }

    if (newOfferActive !== undefined && newOfferActive !== isOfferActive) {
      updateHistory.push({
        timestamp,
        field: "offerStatus",
        oldValue: isOfferActive.toString(),
        newValue: newOfferActive.toString(),
        updatedBy,
      })
      isOfferActive = newOfferActive
    }

    lastUpdated = timestamp

    // Keep only last 50 history entries
    if (updateHistory.length > 50) {
      updateHistory = updateHistory.slice(-50)
    }

    return NextResponse.json({
      success: true,
      currentPrice,
      currentOffer,
      isOfferActive,
      lastUpdated,
      message: "Pricing updated successfully",
    })
  } catch (error) {
    console.error("Admin pricing update error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
