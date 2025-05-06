import { ResearchType } from "@/types/research";
import Image from "next/image";

const SingleResearch = ({ research }: { research: ResearchType }) => {
  const { icon, title, paragraph } = research;
  return (
    <div className="w-full">
      <div className="wow fadeInUp rounded-lg bg-white p-8 shadow-md dark:bg-gray-dark lg:px-5 xl:px-8" data-wow-delay=".1s">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900">
          <Image src={icon} alt={title} width={36} height={36} />
        </div>
        <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
          {title}
        </h3>
        <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleResearch;
