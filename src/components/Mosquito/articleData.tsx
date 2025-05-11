import { Article } from "@/types/article";

const articleData: Article[] = [
  {
    id: 1,
    title: "Global Distribution and Prevalence of Aedes aegypti: A Comprehensive Review",
    abstract: "本研究对伊蚊(Aedes aegypti)的全球分布进行了全面综述，分析了气候变化对其分布范围扩张的影响及对公共卫生的潜在威胁。",
    contentPath: "/articles/article-1.md",
    image: null,
    author: {
      name: "Dr. Sarah Chen",
      affiliation: "Vector Ecology Research Institute"
    },
    tags: ["Aedes aegypti", "分布", "气候变化"],
    publishDate: "2024-02-15",
    doi: "10.1093/jme/tjab123"
  },
  {
    id: 2,
    title: "Novel Molecular Markers for Species Identification in Anopheles Mosquitoes",
    abstract: "本研究开发了一种新的分子标记方法，用于快速准确识别按蚊属(Anopheles)的不同物种，特别是形态上难以区分的姐妹种。",
    contentPath: "/articles/article-2.md",
    image: null,
    author: {
      name: "Prof. James Rodriguez",
      affiliation: "Tropical Disease Research Center"
    },
    tags: ["按蚊", "分子标记", "物种鉴定"],
    publishDate: "2023-11-30",
    doi: "10.1186/s13071-023-05619-3"
  },
  {
    id: 3,
    title: "Insecticide Resistance Mechanisms in Culex pipiens Populations from Urban Environments",
    abstract: "本研究调查了城市环境中库蚊(Culex pipiens)种群对常用杀虫剂的抗性机制，发现了多种分子水平的适应性变化及其对蚊媒控制的潜在影响。",
    contentPath: "/articles/article-3.md",
    image: null,
    author: {
      name: "Dr. Lisa Tanaka",
      affiliation: "Urban Public Health Institute"
    },
    tags: ["库蚊", "杀虫剂抗性", "城市生态"],
    publishDate: "2024-01-20",
    doi: "10.1016/j.ibmb.2023.103842"
  },
];

export default articleData;
