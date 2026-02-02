import * as React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SignupForm() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
  const password = watch("password", "")

  const onSubmit = async (data) => {
    // TODO: replace with real API call
    console.log("Signup payload:", data)
    alert("Signup submitted (demo).")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col gap-3">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="John Doe" {...register("name", { required: "Full name is required" })} />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
          })}
        />
        <p className="text-xs text-gray-500 mt-2">We'll use this to contact you. We will not share your email with anyone else.</p>
        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password", { required: "Password is required", minLength: { value: 8, message: "Min 8 chars" } })}
        />
        {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (v) => v === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Account"}
      </Button>

      <Separator />

      <p className="text-center text-sm text-gray-500">Or continue with</p>
      <div className="flex gap-2 mt-2">
        <Button variant="outline" className="w-full">Google</Button>
      </div>
    </form>
  )
}
