import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Link2 } from "lucide-react";
import articleData from "@/components/Mosquito/articleData";
import ReactMarkdown from "react-markdown";
import fs from 'fs/promises';
import path from 'path';

// Define page props type
type ArticlePageProps = {
  params: {
    id: string;
  };
};

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const id = parseInt(params.id);
  const article = articleData.find((article) => article.id === id);
  
  if (!article) {
    return {
      title: "文章未找到 | MosMap",
    };
  }
  
  return {
    title: `${article.title} | MosMap 蚊虫研究`,
    description: article.abstract,
    keywords: article.tags.join(", "),
  };
}

// 获取文章内容函数
async function getArticleContent(contentPath: string) {
  try {
    // 构建完整的文件路径
    const filePath = path.join(process.cwd(), 'public', contentPath);
    // 读取markdown文件内容
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return '文章内容加载失败';
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const id = parseInt(params.id);
  const article = articleData.find((article) => article.id === id);
  
  if (!article) {
    notFound();
  }
  
  // 获取文章内容
  const content = await getArticleContent(article.contentPath);
  
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-24 lg:pt-40 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="">

          {/* Article header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                发布于 {article.publishDate}
              </div>
              {article.doi && (
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  DOI: {article.doi}
                </div>
              )}
              {article.url && (
                <div className="flex items-center">
                  <Link2 className="mr-2 h-4 w-4" />
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                    原文链接
                  </a>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Author info */}
            <div className="flex items-center p-4 bg-blue-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{article.author.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{article.author.affiliation}</p>
              </div>
            </div>
          </div>
          
          {/* Featured image - only show if available */}
          {article.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {/* Abstract */}
          <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">摘要</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {article.abstract}
            </p>
          </div>
          
          {/* Article content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
}
