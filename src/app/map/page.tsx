import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { Mos } from "@/types/mos";
import MaterialTable from "@/components/Mos/MaterialMosTable";
import React from "react";
import dynamic from "next/dynamic";
import MosMap from "@/components/Mos/MosMap";
import axios from "axios";

export const metadata: Metadata = {
  title: "Table | Play SaaS Starter Kit and Boilerplate for Next.js",
  description: "This is mos map, you can see it in map",
};

const getMosData = () => {
  const filePath = path.join(process.cwd(), "public/csv", "mos.csv");
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
	loading: () => <div>Loading ... </div>,
});


const MapPage = () => {
  const records = React.useMemo(() => getMosData(), []);

  return (
    <>
      <Breadcrumb pageName={"Map"} description={metadata.description} />

      <Map data={records} />
    </>
  );
};

export default MapPage;
