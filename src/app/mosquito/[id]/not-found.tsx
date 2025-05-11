import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 mx-auto text-center">
      <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
        文章未找到
      </h2>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
        抱歉，您要查找的蚊虫研究文章不存在或已被移除。
      </p>
      <Link href="/mosquito">
        <Button>
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回文章列表
        </Button>
      </Link>
    </div>
  );
}
