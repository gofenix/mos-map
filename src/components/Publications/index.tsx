"use client";

import SectionTitle from "../Common/SectionTitle";
import SinglePublication from "./SinglePublication";
import publicationsData from "./publicationsData";

const Publications = () => {
  return (
    <section id="publications" className="bg-gray-50 py-16 dark:bg-gray-800/50 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Academic Achievements"
          paragraph="Research outcomes based on the mosquito distribution database, including journal articles, conference presentations, and collaborative research projects"
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {publicationsData.map((publication) => (
            <SinglePublication
              key={publication.id}
              publication={publication}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="/research"
            className="rounded-md bg-blue-700 px-8 py-4 text-base font-medium text-white transition duration-300 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            View More Academic Publications
          </a>
        </div>
      </div>
    </section>
  );
};

export default Publications;
