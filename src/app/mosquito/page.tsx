import MosquitoArticles from "@/components/Mosquito";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "蚊虫研究文献与资源 | MosMap",
  description: "最新蚊虫研究文献、技术报告和资源，提供蚊虫分类、生态学、分布和防控策略的科学资料库",
  keywords: "蚊虫研究, 文献资料, 技术报告, 蚊媒疾病, 生态学, 分类学"
};

export default function MosquitoPage() {
  return (
    <>
      <MosquitoArticles />
    </>
  );
}
