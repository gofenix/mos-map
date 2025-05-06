"use client";

import Link from "next/link";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const DataSection = () => {
  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Data Resources"
          paragraph="Our mosquito distribution database contains rich global mosquito distribution information, providing reliable data support for research"
          center
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="wow fadeInUp rounded-lg bg-white p-8 shadow-lg dark:bg-gray-dark">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-black dark:text-white">Global Mosquito Distribution Data</h3>
              <Image 
                src="/images/data/database-icon.svg" 
                alt="数据库图标" 
                width={48} 
                height={48}
              />
            </div>
            
            <div className="mb-6">
              <div className="mb-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Over 500 Mosquito Species
                </span>
                <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  150+ Countries & Regions
                </span>
                <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                  10,000+ Geographic Records
                </span>
              </div>
              
              <p className="text-base text-body-color dark:text-body-color-dark">
                Our database collects mosquito distribution records from around the world, including important information such as species identification, geographic coordinates, collection time, and habitat type. All data come from reliable scientific literature, research institutions, and field surveys.
              </p>
            </div>
            
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link
                href="/database"
                className="rounded-md bg-blue-700 px-6 py-3 text-center text-sm font-medium text-white transition duration-300 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Browse Database
              </Link>
              <Link
                href="/docs/data-format.pdf"
                className="rounded-md border border-blue-700 bg-transparent px-6 py-3 text-center text-sm font-medium text-blue-700 transition duration-300 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-gray-800"
              >
                Data Format Guide
              </Link>
            </div>
          </div>
          
          <div className="wow fadeInUp rounded-lg bg-white p-8 shadow-lg dark:bg-gray-dark" data-wow-delay=".2s">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-black dark:text-white">Data Statistics & Analysis</h3>
              <Image 
                src="/images/data/analysis-icon.svg" 
                alt="分析图标" 
                width={48} 
                height={48}
              />
            </div>
            
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
                <h4 className="mb-1 text-lg font-semibold text-black dark:text-white">Species Statistics</h4>
                <div className="mb-1 text-3xl font-bold text-blue-700 dark:text-blue-400">523</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Known Mosquito Species</p>
              </div>
              
              <div className="rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
                <h4 className="mb-1 text-lg font-semibold text-black dark:text-white">Disease Related</h4>
                <div className="mb-1 text-3xl font-bold text-red-600 dark:text-red-400">78</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Vector-Borne Diseases</p>
              </div>
              
              <div className="rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
                <h4 className="mb-1 text-lg font-semibold text-black dark:text-white">Data Records</h4>
                <div className="mb-1 text-3xl font-bold text-green-600 dark:text-green-400">12,864</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Geographic Location Records</p>
              </div>
              
              <div className="rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
                <h4 className="mb-1 text-lg font-semibold text-black dark:text-white">Data Sources</h4>
                <div className="mb-1 text-3xl font-bold text-amber-600 dark:text-amber-400">267</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cited Research Papers</p>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link
                href="/research"
                className="rounded-md bg-blue-700 px-6 py-3 text-center text-sm font-medium text-white transition duration-300 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                View Research Methods
              </Link>
              <Link
                href="/docs/analysis.pdf"
                className="rounded-md border border-blue-700 bg-transparent px-6 py-3 text-center text-sm font-medium text-blue-700 transition duration-300 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-gray-800"
              >
                Download Analysis Report
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataSection;
