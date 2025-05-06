import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { Mos } from "@/types/mos";
import MaterialTable from "@/components/Mos/MaterialMosTable";
import React from "react";

export const metadata: Metadata = {
  title: "Mosquito Distribution Database | MosMap Research Platform",
  description: "Comprehensive database of mosquito species distribution records with search and export capabilities",
};

const getMosData = () => {
  const filePath = path.join(process.cwd(), "public/docs", "mos.csv");
  const fileContent = fs.readFileSync(filePath, "utf8");
  let records: Mos[] = parse(fileContent, { columns: true });
  records = records.map((record, index) => ({ ...record, id: index }));

  return records;
};

const TablePage = () => {
  const records = React.useMemo(() => getMosData(), []);

  return (
    <>
      <Breadcrumb pageName={"Database"} description={metadata.description} />

      {/* <MosTable users={records} /> */}
      <MaterialTable data={records} />
    </>
  );
};

export default TablePage;
