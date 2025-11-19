// "use client"

// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useEffect, useState } from "react"
// import { InboxOutlined } from "@ant-design/icons"
// import { message, Upload } from "antd"
// import type { UploadProps } from "antd"
// import '@ant-design/v5-patch-for-react-19'

// const { Dragger } = Upload

// export default function FileListPage() {
//     const [files, setFiles] = useState<any[]>([])

//     useEffect(() => {
//         fetch("/api/files")
//             .then((res) => res.json())
//             .then((data) => setFiles(data))
//     }, [])

//     const [newFile, setNewFile] = useState({ name: "", size: 0, folderId: 1 })

//     async function handleCreate() {
//         await fetch("/api/files", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(newFile),
//         })
//         window.location.reload()
//     }

//     const uploadProps: UploadProps = {
//         name: 'file',
//         multiple: true,
//         action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
//         onChange(info) {
//             const { status } = info.file;
//             if (status !== 'uploading') {
//                 console.log(info.file, info.fileList);
//             }
//             if (status === 'done') {
//                 message.success(`${info.file.name} file uploaded successfully.`);
//             } else if (status === 'error') {
//                 message.error(`${info.file.name} file upload failed.`);
//             }
//         },
//         onDrop(e) {
//             console.log('Dropped files', e.dataTransfer.files);
//         },
//     }

//     return (
//         <div>
//             <h1 className="text-xl font-semibold mb-4">Selamat Datang di CMS One Map</h1>
//             <div className="min-h-full flex items-center justify-center p-4">
//                 <div className="w-full max-w-md">
//                     <Dragger {...uploadProps} className="rounded-md">
//                         <p className="ant-upload-drag-icon">
//                             <InboxOutlined />
//                         </p>
//                         <p className="ant-upload-text">Data masih kosong</p>
//                         <p className="ant-upload-hint text-sm text-gray-500">
//                             Klik disini atau seret file pada area ini.
//                         </p>
//                     </Dragger>
//                 </div>
//             </div>
//         </div>
//     )
// }