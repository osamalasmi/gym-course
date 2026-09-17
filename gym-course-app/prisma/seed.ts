import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.course.createMany({
        data:[
            { name: "Yoga" },
            { name: "Hyrox" },
            { name: "Paaldansen" },
        ],
    });
    console.log("Courses created");
}

main()
.catch((err) => {
    console.error(err);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect()
})