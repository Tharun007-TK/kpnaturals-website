"use client";

import type React from "react";

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
import { Star } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export function ReviewsSection() {
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
    <section id="reviews" className="py-14 md:py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-serif font-black text-foreground mb-4">
            {t("reviews.title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("reviews.subtitle")}
          </p>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {t("reviews.leave")}
          </Button>
        </div>

        {showForm && (
          <Card className="max-w-2xl mx-auto mb-12">
            <CardHeader>
              <CardTitle>{t("reviews.leave")}</CardTitle>
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
                />
                <div className="flex flex-wrap items-center gap-2">
                  <span>Rating:</span>
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
                        className={`h-5 w-5 ${
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
                />
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
                  <Button
                    type="button"
                    onClick={handleDiscardReview}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Discard
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {t("reviews.submit")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-serif font-bold text-card-foreground">
                    {review.name}
                  </CardTitle>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                </div>
                <CardDescription className="text-sm text-muted-foreground">
                  {new Date(review.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  "{review.comment}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
