// components/ui/badge.tsx
import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case "secondary":
        return "bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground"
      case "destructive":
        return "bg-destructive hover:bg-destructive/80 border-transparent text-destructive-foreground"
      case "outline":
        return "text-foreground"
      default:
        return "bg-primary hover:bg-primary/80 border-transparent text-primary-foreground"
    }
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getVariantClasses(variant)} ${className || ''}`}
      {...props}
    />
  )
}

export { Badge }