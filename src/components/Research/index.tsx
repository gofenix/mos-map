"use client";

import SectionTitle from "../Common/SectionTitle";
import SingleResearch from "./SingleResearch";
import researchData from "./researchData";

const Research = () => {
  return (
    <>
      <section id="research" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="Research Directions"
            paragraph="We are dedicated to mosquito distribution and ecological research, utilizing modern tools such as geographic information systems and big data analysis to address key issues in infectious disease prevention and control"
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {researchData.map((research) => (
              <SingleResearch key={research.id} research={research} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Research;
