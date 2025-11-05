"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ReviewsPage() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment:
        "Amazing results! My hair feels so much healthier after using KP Natural Hairoils for 2 months.",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      rating: 5,
      comment:
        "No more hair fall! The natural ingredients really work. Highly recommended.",
      date: "2024-01-10",
    },
    {
      id: 3,
      name: "Meera Patel",
      rating: 4,
      comment:
        "Good quality oil. My hair is shinier and softer now. Will continue using it.",
      date: "2024-01-05",
    },
    {
      id: 4,
      name: "Anita Singh",
      rating: 5,
      comment:
        "Excellent product! My hair has become so much stronger and healthier. Love the natural ingredients.",
      date: "2024-01-20",
    },
    {
      id: 5,
      name: "Vikram Reddy",
      rating: 5,
      comment:
        "Best hair oil I've ever used. My hair fall has reduced significantly. Highly recommend to everyone!",
      date: "2024-01-18",
    },
    {
      id: 6,
      name: "Sunita Agarwal",
      rating: 4,
      comment:
        "Good quality and natural. My hair feels softer and looks shinier. Will definitely buy again.",
      date: "2024-01-12",
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      const review: Review = {
        id: reviews.length + 1,
        ...newReview,
        date: new Date().toISOString().split("T")[0],
      };
      setReviews([review, ...reviews]);
      setNewReview({ name: "", rating: 5, comment: "" });
      setShowForm(false);
    }
  };

  const handleDiscardReview = () => {
    setNewReview({ name: "", rating: 5, comment: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global SiteHeader is rendered via app/layout.tsx */}

      {/* Main Content */}
      <main className="py-6 sm:py-12 md:py-20">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-black text-foreground mb-4">
              {t("reviews.title")}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
              {t("reviews.subtitle")}
            </p>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
            >
              {t("reviews.leave")}
            </Button>
          </div>

          {/* Review Form */}
          {showForm && (
            <Card className="max-w-2xl mx-auto mb-8 sm:mb-12">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  {t("reviews.leave")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={newReview.name}
                    onChange={(e) =>
                      setNewReview({ ...newReview, name: e.target.value })
                    }
                    required
                    className="text-sm sm:text-base"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base">Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setNewReview({ ...newReview, rating: star })
                        }
                        className="p-1"
                      >
                        <Star
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${
                            star <= newReview.rating
                              ? "fill-accent text-accent"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <Textarea
                    placeholder={t("reviews.placeholder")}
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    required
                    className="text-sm sm:text-base"
                  />
                  <div className="flex gap-3 justify-end">
                    <Button
                      type="button"
                      onClick={handleDiscardReview}
                      className="bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base px-3 sm:px-4 py-2"
                    >
                      Discard
                    </Button>
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base px-3 sm:px-4 py-2"
                    >
                      {t("reviews.submit")}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="border-border bg-card hover:shadow-lg transition-shadow"
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base sm:text-lg font-serif font-bold text-card-foreground">
                      {review.name}
                    </CardTitle>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 sm:h-4 sm:w-4 fill-accent text-accent"
                        />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    "{review.comment}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
