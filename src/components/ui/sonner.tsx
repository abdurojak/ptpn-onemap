"use client"

import { Toaster as SonnerToaster, ToasterProps } from "sonner"
import { useTheme } from "next-themes"

export function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme()

  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      position="top-center"   // ⬅️ tambahkan atau ubah jadi ini
      richColors
      closeButton
      {...props}
    />
  )
}
