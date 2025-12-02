"use client"

import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/profile")
        if (!res.ok) {
          toast.error("Gagal memuat profil")
          return
        }
        const data = await res.json()
        setUser(data.user)
      } catch (e) {
        toast.error("Terjadi kesalahan")
      }
    }

    fetchUser()
  }, [])

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Toaster position="top-center" />

      <h1 className="text-2xl font-semibold mb-6">Profil</h1>

      {!user ? (
        <p className="text-gray-500">Memuat...</p>
      ) : (
        <div className="bg-white p-5 rounded-lg shadow border">
          <p className="mb-3">
            <strong>Nama:</strong> {user.name}
          </p>
          <p className="mb-3">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-3">
            <strong>Dibuat pada:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString("id-ID")}
          </p>
        </div>
      )}
    </div>
  )
}
