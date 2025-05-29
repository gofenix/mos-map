import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "分布预测 - 蚊域经纬",
  description: "蚊子分布预测模型 - 基于机器学习的蚊子分布预测系统，网站建设中",
};

const PredictionPage = () => {
  return (
    <>
      <section className="relative z-10 overflow-hidden bg-gray-50 pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]">
        <div className="container mx-auto px-4">
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="w-full max-w-4xl text-center">
              <div className="mb-8">
                <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-blue-100">
                  <svg 
                    className="h-16 w-16 text-blue-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                  分布预测模型
                </h1>
                <h2 className="mb-6 text-2xl font-semibold text-gray-700">
                  Mosquito Distribution Prediction Model
                </h2>
              </div>

              <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
                <div className="mb-6">
                  <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    网站建设中
                  </h3>
                  <p className="text-lg text-gray-600">
                    Website Under Construction
                  </p>
                </div>
                
                <div className="space-y-4 text-left">
                  <h4 className="text-xl font-semibold text-gray-800">即将上线的功能：</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
                      基于机器学习的蚊子分布预测模型
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
                      气候变化对蚊子分布影响的预测分析
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
                      疾病传播风险评估工具
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
                      交互式预测地图可视化
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
                      自定义环境参数预测功能
                    </li>
                  </ul>
                </div>

                <div className="mt-8 rounded-lg bg-blue-50 p-6">
                  <h4 className="mb-3 text-lg font-semibold text-blue-900">
                    预计发布时间 Expected Launch
                  </h4>
                  <p className="text-blue-700">
                    我们正在努力开发中，预计在 2025 年底推出第一版分布预测功能。
                    敬请期待！
                  </p>
                  <p className="mt-2 text-sm text-blue-600">
                    We are working hard on development and expect to launch the first version 
                    of distribution prediction features by the end of 2024. Stay tuned!
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <a
                  href="/database"
                  className="rounded-md bg-blue-700 px-8 py-4 text-base font-medium text-white transition duration-300 hover:bg-blue-800"
                >
                  浏览现有数据 Browse Current Data
                </a>
                <a
                  href="/map"
                  className="rounded-md border border-blue-700 bg-transparent px-8 py-4 text-base font-medium text-blue-700 transition duration-300 hover:bg-blue-50"
                >
                  查看分布地图 View Distribution Map
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="277"
              cy="63"
              r="225"
              fill="url(#paint0_linear_25:217)"
            />
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="url(#paint1_radial_25:217)"
            />
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="url(#paint2_radial_25:217)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_25:217"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default PredictionPage; 