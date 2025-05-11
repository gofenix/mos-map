"use client"

import { Article } from "@/types/article";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const SingleArticle = ({ article }: { article: Article }) => {
  const { id, title, abstract, image, author, tags, publishDate, doi } = article;
  
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md dark:bg-gray-900">
      {image ? (
        <div className="relative aspect-video w-full overflow-hidden">
          <Link href={`/mosquito/${id}`}>
            <Image 
              src={image} 
              alt={title}
              className="object-cover transition-transform hover:scale-105"
              fill
            />
          </Link>
          <div className="absolute right-3 top-3 flex flex-wrap gap-1">
            {tags?.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-600 text-white">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      ) : (
        <div className="pt-5 px-5">
          <div className="flex flex-wrap gap-1 mb-2">
            {tags?.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-600 text-white">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <CardHeader className="px-5 pt-5 pb-0">
        <Link href={`/mosquito/${id}`} className="group">
          <h3 className="text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {title}
          </h3>
        </Link>
      </CardHeader>
      
      <CardContent className="px-5 py-3 flex-grow">
        <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
          {abstract}
        </p>
      </CardContent>
      
      <CardFooter className="px-5 pt-0 pb-5 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{author.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{author.affiliation}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">发布于</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{publishDate}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SingleArticle;
