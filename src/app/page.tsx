import { Luilka } from "@/components/luilka";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2E6F40] text-white font-sans ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col  gap-4 py-32 px-16  sm:items-start">
        <Luilka className="size-20 "/>
        <Luilka className="size-96 scale-150 text-[#2C2B32] rotate-180 absolute -left-40 z-0 opacity-13 top-50"/>
        Luika
        <div className="flex flex-col items-center gap-6  sm:items-start sm:text-left">
          <h1 className="max-w-2xl text-3xl font-semibold leading-10  uppercase tracking-wider">
            Là où le Design Maîtrisé rencontre l'Ingénierie de l'Échelle.
          </h1>
          <p className="max-w-2xl text-sm leading-6 tracking-wider text-gray-300 uppercase">
            Nous construisons des produits numériques avec une esthétique fonctionnelle irréprochable et une architecture ultra-sécurisée. Notre standard est mondial, notre détermination est africaine.
          </p>
        </div>
      </main>
    </div>
  );
}
