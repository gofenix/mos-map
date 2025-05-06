import { PublicationType } from "@/types/publication";
import Image from "next/image";

const SinglePublication = ({ publication }: { publication: PublicationType }) => {
  const { title, image, authors, journal, year, doi, abstract } = publication;
  
  return (
    <div className="wow fadeInUp group relative overflow-hidden rounded-lg bg-white shadow-one dark:bg-gray-dark">
      <div className="relative block aspect-[3/2] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-6 sm:p-8">
        <h3 className="mb-3 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary">
          {title}
        </h3>
        
        <p className="mb-4 text-sm font-medium italic text-gray-600 dark:text-gray-400">
          {authors}
        </p>
        
        <div className="mb-6 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
          <div className="flex items-center">
            <div className="mr-2 h-6 w-6 text-blue-700 dark:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-black dark:text-white">
              {journal}
            </p>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-6 w-6 text-blue-700 dark:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm font-medium text-black dark:text-white">
              {year}
            </p>
          </div>
        </div>
        
        <p className="mb-5 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
          {abstract.length > 150 ? abstract.substring(0, 150) + "..." : abstract}
        </p>
        
        {doi && (
          <a
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            查看论文
            <span className="ml-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.172 7L6.808 1.636L8.222 0.222L16 8L8.222 15.778L6.808 14.364L12.172 9H0V7H12.172Z" fill="currentColor" />
              </svg>
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

export default SinglePublication;
