"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface PricingData {
  currentPrice: string;
  currentOffer: string;
  isOfferActive: boolean;
}

export function DynamicPricing() {
  const [pricingData, setPricingData] = useState<PricingData>({
    currentPrice: "₹145",
    currentOffer: "20% OFF",
    isOfferActive: true,
  });

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await fetch("/api/public/pricing");
        if (response.ok) {
          const data = await response.json();
          setPricingData(data);
        }
      } catch (error) {
        console.error("Failed to fetch pricing data:", error);
      }
    };

    fetchPricingData();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchPricingData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 mb-4">
      <span className="text-3xl sm:text-4xl font-black text-primary">
        {pricingData.currentPrice}
      </span>
      {pricingData.isOfferActive && (
        <Badge className="bg-red-600 hover:bg-red-700 text-white shadow-md border-0 text-xs sm:text-sm px-2 py-1 sm:px-3 transition-colors">
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
          {pricingData.currentOffer}
        </Badge>
      )}
    </div>
  );
}
