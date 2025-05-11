import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MosMap: a unique resource for collection records and distribution data relating to mosquito",
  description: "A mosquito ecological research database and geographic distribution visualization platform for mosquito species distribution, prediction, and ecological research",
  keywords: "mosquito research, biogeography, species distribution, ecology, entomology, epidemiology"
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
    </>
  );
}
