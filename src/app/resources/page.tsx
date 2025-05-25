import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
  BookOpen,
  Database,
  Video,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "蚊虫研究资源 | MosMap",
  description:
    "蚊虫研究相关资源、数据集、工具和文献，包括分类学指南、参考资料和专业软件",
  keywords: "蚊虫研究, 资源, 数据集, 分类学工具, 参考资料, 软件",
};

// 资源数据
const resources = [
  {
    id: 1,
    title: "WRBU",
    description: "The Walter Reed Biosystematics Unit (WRBU) is a world-renowned center of taxonomic excellence, undertaking cutting-edge research to provide actionable entomological intelligence tools and products that best assess global vector-borne disease risk.",
    type: "database",
    url: "https://wrbu.si.edu/",
    downloadable: false,
  },
  {
    id: 2,
    title: "VectorBase",
    description: "VectorBase is a National Institute of Allergy and Infectious Diseases (NIAID) Bioinformatics Resource Center (BRC) providing genomic, phenotypic and population-centric data to the scientific community for invertebrate vectors of human pathogens.",
    type: "database",
    url: "https://vectorbase.org/",
    downloadable: false,
  },
  {
    id: 3,
    title: "GBIF",
    description: "GBIF—the Global Biodiversity Information Facility—is an international network and data infrastructure funded by the world's governments and aimed at providing anyone, anywhere, open access to data about all types of life on Earth.",
    type: "dataset",
    url: "https://www.gbif.org/",
    downloadable: false,
  },
  {
    id: 4,
    title: "Global Mosquito Observations Dashboard",
    description: "This dashboard was created to support real-time monitoring worldwide, and to reuse images to train machine learning algorithms to predict the species of a mosquito based on a photo.",
    type: "dashboard",
    url: "http://www.mosquitodashboard.org/",
    downloadable: false,
  },
  {
    id: 5,
    title: "EYWA",
    description: "EYWA (EarlY WArning System for Mosquito borne diseases) is a prototype system addressing the critical public health need for prevention and protection against the Mosquito-Borne Diseases (MBDs).",
    type: "software",
    url: "http://epidemics.space.noa.gr:8081/",
    downloadable: false,
  },
  {
    id: 6,
    title: "VectorSurv",
    description: "VectorSurv helps public health agencies manage surveillance data, visualize trends, and make real-time decisions to prevent the spread of vector-borne diseases and protect public health.",
    type: "software",
    url: "https://vectorsurv.org/",
    downloadable: false,
  },
  {
    id: 7,
    title: "NEON",
    description: "NEON monitors ecosystems across the United States. Freshwater ecosystems include streams, rivers, and lakes while terrestrial ecosystems span from deserts to tropical forests.",
    type: "dataset",
    url: "https://www.neonscience.org/",
    downloadable: false,
  },
];

// 获取资源类型图标
const getResourceIcon = (type: string) => {
  switch (type) {
    case "guide":
      return <BookOpen className="h-5 w-5" />;
    case "dataset":
      return <Database className="h-5 w-5" />;
    case "database":
      return <Database className="h-5 w-5" />;
    case "software":
      return <FileText className="h-5 w-5" />;
    case "publication":
      return <FileText className="h-5 w-5" />;
    case "video":
      return <Video className="h-5 w-5" />;
    case "dashboard":
      return <Database className="h-5 w-5" />;
    default:
      return <LinkIcon className="h-5 w-5" />;
  }
};

export default function ResourcesPage() {
  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 max-w-4xl text-left py-4">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
            蚊媒研究资源相关网站
          </h1>
          <p className=" max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            International resources and databases to enhance mosquito research.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card
              key={resource.id}
              className="overflow-hidden transition-all hover:shadow-md dark:bg-gray-800"
            >
              <CardHeader className="bg-blue-50 pb-3 dark:bg-gray-700">
                <div className="flex items-center justify-between">
                  <div className="rounded-md bg-white p-2 text-blue-600 dark:bg-gray-800 dark:text-blue-400">
                    {getResourceIcon(resource.type)}
                  </div>
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold uppercase text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    {resource.type}
                  </span>
                </div>
                <CardTitle className="mt-4 text-xl">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="text-base">
                  {resource.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-end gap-3">
                <Link
                  href={resource.url}
                  target={resource.url.startsWith("http") ? "_blank" : "_self"}
                >
                  <Button variant="outline" size="sm">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    查看资源
                  </Button>
                </Link>
                {resource.downloadable && (
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    下载
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-4xl rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            资源贡献
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            我们欢迎蚊虫研究领域的专家和学者贡献高质量的研究资源。如果您有相关资源希望分享，请与我们联系。
          </p>
          <Link href="/contact">
            <Button className="mt-2">联系我们</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
