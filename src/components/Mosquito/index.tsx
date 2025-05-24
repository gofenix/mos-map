"use client";

import { useState } from "react";
import SingleArticle from "./SingleArticle";
import articleData from "./articleData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const MosquitoArticles = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = articleData.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-20 lg:py-28">
      <div className="container">
        <div className="mb-16 max-w-4xl text-left">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
            蚊相关报告
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
            Report to enhance mosquito research.
          </p>

          <div className="relative mt-8 w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <Input
                type="text"
                placeholder="搜索文章、标签或关键词..."
                className="py-2 pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div key={article.id} className="h-full">
                <SingleArticle article={article} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                未找到符合条件的文章，请尝试其他关键词。
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MosquitoArticles;
