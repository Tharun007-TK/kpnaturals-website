"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function WhatsAppButton() {
  const { t } = useLanguage();

  const handleWhatsAppClick = () => {
    const baseMessage =
      "Hi! I'm interested in KP Natural Hairoils. Can you tell me more about your sulfur-free hair oil?";

    const sanitizedMessage = baseMessage.replace(/[<>]/g, "").substring(0, 500); // Remove potential XSS chars and limit length
    const encodedMessage = encodeURIComponent(sanitizedMessage);

    const phoneNumber = "916381248615";
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!phoneRegex.test(phoneNumber)) {
      console.error("[v0] Invalid phone number format");
      return;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    try {
      const url = new URL(whatsappUrl);
      if (url.hostname === "wa.me" && url.protocol === "https:") {
        const newWindow = window.open(whatsappUrl, "_blank");
        if (newWindow) {
          newWindow.opener = null; // Prevent access to parent window
        }
      }
    } catch (error) {
      console.error("[v0] Invalid WhatsApp URL:", error);
    }
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0"
      style={{ backgroundColor: "rgb(22, 163, 74)", opacity: 1 }}
      size="icon"
      type="button"
      aria-label={t("button.whatsapp")}
    >
      <MessageCircle className="h-6 w-6 text-white" />
      <span className="sr-only">{t("button.whatsapp")}</span>
    </Button>
  );
}
