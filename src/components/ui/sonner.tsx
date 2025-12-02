"use client"

import { Toaster as SonnerToaster, ToasterProps } from "sonner"
import { useTheme } from "next-themes"

/**
 * Komponen ini membungkus Toaster dari sonner
 * agar otomatis mengikuti tema (light/dark)
 */
export function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme()

  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      richColors
      closeButton
      {...props}
    />
  )
}
