import Image from "next/image";
import {prisma} from "@/lib/prisma";

export default async function Home() {
  const courseCount = await prisma.course.count();
  return (
      <main>
        <h1>Gym Course App</h1>
        <p>Aantal cursussen in de database: {courseCount}</p>
      </main>
  );
}
