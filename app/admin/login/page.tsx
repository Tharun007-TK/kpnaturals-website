"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Eye, EyeOff, Lock, Mail, Loader2, LogIn } from "lucide-react";
import { signInAdmin, sendPasswordReset } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Auto-seed default admin account (only in dev mode)
  useEffect(() => {
    fetch("/api/admin/ensure-default").catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signInAdmin(email, password);
    if (res.ok) router.push("/admin/dashboard");
    else setError(res.error || "Invalid credentials.");

    setIsLoading(false);
  };

  const handleForgotPassword = async () => {
    setError("");
    if (!email) {
      setError("Enter your email first, then click 'Forgot password'.");
      return;
    }
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/admin/reset-password`
        : "";
    const res = await sendPasswordReset(email, redirectTo);
    if (res.ok) alert("Password reset link sent to your email.");
    else setError(res.error || "Failed to send password reset email.");
  };

  const fillDefaultAdmin = () => {
    setEmail("sarathykalpana17@gmail.com");
    setPassword("test");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Subtle background overlay */}
      <div className="absolute inset-0 bg-[url('/tropical-leaves.jpg')] bg-cover bg-center opacity-[0.08] dark:opacity-[0.04]" />

      <Card className="w-full max-w-md relative z-10 rounded-2xl border border-emerald-200/60 dark:border-emerald-800/40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-extrabold text-emerald-800 dark:text-emerald-100 tracking-tight">
              Admin Login
            </CardTitle>
            <CardDescription className="text-emerald-700/70 dark:text-emerald-300/80 font-medium">
              KP Natural Hairoils — Management Console
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-emerald-700 dark:text-emerald-100 font-medium flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your admin email"
                required
                className="border-emerald-200 focus-visible:ring-emerald-400/30 dark:border-emerald-800"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-emerald-700 dark:text-emerald-100 font-medium flex items-center gap-2"
              >
                <Lock className="w-4 h-4" /> Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="border-emerald-200 focus-visible:ring-emerald-400/30 dark:border-emerald-800 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
                  ) : (
                    <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
                  )}
                </Button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <Alert className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
                <AlertDescription className="text-red-700 dark:text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] py-5 text-base font-semibold"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2 justify-center">
                  <LogIn className="w-4 h-4" /> Sign In
                </span>
              )}
            </Button>

            <div className="flex justify-between items-center text-sm">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-emerald-700 dark:text-emerald-300 hover:underline font-medium"
              >
                Forgot password?
              </button>
              <button
                type="button"
                onClick={fillDefaultAdmin}
                className="text-emerald-600 dark:text-emerald-300 hover:underline font-medium"
              >
                Use Default Admin
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
