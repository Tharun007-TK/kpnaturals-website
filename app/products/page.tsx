"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Shield,
  Heart,
  CheckCircle,
  Users,
  Award,
  ArrowLeft,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";

interface PricingData {
  currentPrice: string;
  currentOffer: string;
  isOfferActive: boolean;
}

export default function ProductsPage() {
  const { t } = useLanguage();
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

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in KP Natural Hairoils at ${pricingData.currentPrice}. Can you tell me more about your sulfur-free hair oil?`
    );
    window.open(`https://wa.me/916381248615?text=${message}`, "_blank");
  };

  const productImages = ["/product1.png"];

  const benefits = [
    {
      icon: Shield,
      title: t("product.benefit.sulfur.title"),
      description: t("product.benefit.sulfur.desc"),
    },
    {
      icon: Heart,
      title: t("product.benefit.nourish.title"),
      description: t("product.benefit.nourish.desc"),
    },
    {
      icon: Leaf,
      title: t("product.benefit.natural.title"),
      description: t("product.benefit.natural.desc"),
    },
    {
      icon: CheckCircle,
      title: t("product.benefit.results.title"),
      description: t("product.benefit.results.desc"),
    },
    {
      icon: Users,
      title: t("product.benefit.types.title"),
      description: t("product.benefit.types.desc"),
    },
    {
      icon: Award,
      title: t("product.benefit.quality.title"),
      description: t("product.benefit.quality.desc"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Global SiteHeader is rendered from app/layout.tsx */}
      <div className="container mx-auto px-3 sm:px-4 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm"
        >
          <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">{t("product.back")}</span>
          <span className="sm:hidden">Back</span>
        </Link>
      </div>

      <section className="py-6 sm:py-12 md:py-20 bg-gradient-to-br from-card to-background">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left">
              <Badge className="bg-accent text-accent-foreground w-fit mx-auto lg:mx-0 text-xs sm:text-sm px-2 sm:px-3 py-1">
                {t("product.badge")}
              </Badge>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif font-black text-foreground leading-tight">
                {t("product.title")}
                <span className="text-primary block sm:inline">
                  {" "}
                  {t("product.subtitle")}
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                {t("product.description")}
              </p>

              <div className="bg-primary/10 p-3 sm:p-4 md:p-6 rounded-lg border border-primary/20">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4 mb-2 justify-center lg:justify-start">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    {pricingData.currentPrice}
                  </span>
                  {pricingData.isOfferActive && (
                    <Badge className="bg-red-600 text-white border-0 text-xs sm:text-sm shadow-sm">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {pricingData.currentOffer}
                    </Badge>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground text-center lg:text-left">
                  {t("product.usage")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={handleWhatsAppClick}
                  className="bg-green-600 hover:bg-green-700 text-white shadow-lg border-0 w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                >
                  {t("product.whatsapp")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                >
                  {t("product.learn")}
                </Button>
              </div>
            </div>

            <div className="relative mt-6 sm:mt-8 lg:mt-0">
              <div className="flex justify-center">
                {productImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`KP Natural Hair Oil Product ${index + 1}`}
                      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto max-h-[40vh] sm:max-h-[50vh] md:max-h-[60vh] object-contain rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-6 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-black text-foreground mb-3 sm:mb-4">
              {t("product.benefits.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2 sm:px-4">
              {t("product.benefits.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-border bg-card hover:shadow-lg transition-shadow"
              >
                <CardHeader className="p-4 sm:p-6">
                  <benefit.icon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-primary mb-3 sm:mb-4" />
                  <CardTitle className="font-serif font-bold text-card-foreground text-base sm:text-lg md:text-xl">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <CardDescription className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-12 md:py-20 bg-card/30">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-6 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-black text-foreground mb-3 sm:mb-4">
              {t("product.ingredients.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2 sm:px-4">
              {t("product.ingredients.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {[
              {
                name: t("product.ingredient.hibiscus"),
                benefit: t("product.ingredient.hibiscus.benefit"),
                image: "/red-hibiscus-ingredient.png",
              },
              {
                name: t("product.ingredient.coconut"),
                benefit: t("product.ingredient.coconut.benefit"),
                image: "/coconut-oil-natural-organic.png",
              },
              {
                name: t("product.ingredient.secret"),
                benefit: t("product.ingredient.secret.benefit"),
                image: "/natural-herbs-blend.png",
              },
              {
                name: t("product.ingredient.rosemary"),
                benefit: t("product.ingredient.rosemary.benefit"),
                image: "/fresh-rosemary.png",
              },
            ].map((ingredient, index) => (
              <Card
                key={index}
                className="border-border bg-card hover:shadow-lg transition-shadow text-center"
              >
                <CardHeader className="p-2 sm:p-3 md:p-4 lg:p-6">
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full object-cover mb-2 sm:mb-3"
                  />
                  <CardTitle className="font-serif font-bold text-card-foreground text-xs sm:text-sm md:text-base lg:text-lg">
                    {ingredient.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-3 md:p-4 lg:p-6 pt-0">
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                    {ingredient.benefit}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-12 md:py-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-12 md:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-black text-foreground mb-3 sm:mb-4">
                How to Use
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                Follow these simple steps for best results
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <Card className="border-border bg-card text-center">
                <CardHeader>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-primary">
                      1
                    </span>
                  </div>
                  <CardTitle className="font-serif font-bold text-card-foreground text-lg sm:text-xl">
                    Apply
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Apply oil to scalp and hair roots. Massage gently for 5-10
                    minutes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card text-center">
                <CardHeader>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-primary">
                      2
                    </span>
                  </div>
                  <CardTitle className="font-serif font-bold text-card-foreground text-lg sm:text-xl">
                    Wait
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Leave oil for 2-3 hours or overnight for deep nourishment.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card text-center sm:col-span-2 lg:col-span-1">
                <CardHeader>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-primary">
                      3
                    </span>
                  </div>
                  <CardTitle className="font-serif font-bold text-card-foreground text-lg sm:text-xl">
                    Wash
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Wash with mild shampoo. Use 2-3 times per week for 3 months.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 sm:mt-12 text-center">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 sm:p-6 rounded-lg border border-amber-200 dark:border-amber-800">
                <h3 className="font-serif font-bold text-foreground mb-2 text-base sm:text-lg">
                  Important Note
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  For best results, use consistently for 3 months. Natural
                  ingredients take time to show their full benefits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-foreground mb-4">
            Ready to Transform Your Hair?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of satisfied customers who have experienced the
            natural benefits of our sulfur-free hair oil.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button
              size="lg"
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg border-0 w-full sm:w-auto"
            >
              Order Now - {pricingData.currentPrice}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent w-full sm:w-auto"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  );
}
