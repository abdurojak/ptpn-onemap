// prisma/seed.ts (CommonJS style)
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            email: 'admin@example.com',
            name: 'Admin',
        },
    })

    const folder = await prisma.folder.create({
        data: {
            name: 'Folder Utama',
            userId: user.id,
        },
    })

    console.log('Seed berhasil:', { user, folder })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => {
        prisma.$disconnect()
    })