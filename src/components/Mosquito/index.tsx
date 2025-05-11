"use client"

import { useState } from "react";
import SingleArticle from "./SingleArticle";
import articleData from "./articleData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const MosquitoArticles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredArticles = articleData.filter((article) => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-white">
            蚊虫研究文献与资源
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
            探索最新蚊虫研究文献、技术报告和资源，了解蚊虫分类、生态学、分布和防控策略。
          </p>
          
          <div className="relative max-w-md mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <Input
                type="text"
                placeholder="搜索文章、标签或关键词..."
                className="pl-10 pr-4 py-2"
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
            <div className="col-span-full text-center py-12">
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
