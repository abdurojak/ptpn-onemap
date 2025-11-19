'use client'

import { useRef } from 'react'
import { Button } from "@/components/ui/button"

interface UploadFolderButtonProps {
    onFolderSelected: (files: FileList) => void
}

export default function UploadFolderButton({
    onFolderSelected,
}: UploadFolderButtonProps) {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleClick = () => {
        inputRef.current?.click()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFolderSelected(e.target.files)
        }
    }

    return (
        <>
            <div className="flex justify-end">
                <Button onClick={handleClick}>Upload</Button>
            </div>
            <input
                type="file"
                ref={inputRef}
                onChange={handleChange}
                className="hidden"
                // @ts-ignore
                webkitdirectory="true"
                directory=""
            />
        </>
    )
}