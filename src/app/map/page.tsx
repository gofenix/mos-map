import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { Mos } from "@/types/mos";
import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";

export const metadata: Metadata = {
  title: "Mosquito Distribution Map | MosMap Research Platform",
  description: "Interactive visualization of mosquito species distribution data across global regions",
};

const getMosData = () => {
  const filePath = path.join(process.cwd(), "public/docs", "mos.csv");
  const fileContent = fs.readFileSync(filePath, "utf8");
  let records: Mos[] = parse(fileContent, { columns: true });
  records = records.map((record, index) => ({ ...record, id: index }));

  return records;
};

const getGeoJson = async () => {
  const resp = await axios.get(
    "https://gw.alipayobjects.com/os/bmw-prod/d6da7ac1-8b4f-4a55-93ea-e81aa08f0cf3.json",
  );
  return resp.data;
};

const Map = dynamic(() => import("@/components/Mos/MosMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[600px] bg-slate-100 rounded-lg">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-2 text-gray-600">Loading Map Data...</p>
      </div>
    </div>
  ),
});

const MapPage = () => {
  // const records = React.useMemo(() => getMosData(), []);

  return (
    <>
      <Breadcrumb 
        pageName="蚊媒分布地图" 
        description="Mosquito Distribution Map"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
          <Map />
        </div>
      </div>
    </>
  );
};

export default MapPage;
