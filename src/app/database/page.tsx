import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { Mos } from "@/types/mos";
import MaterialTable from "@/components/Mos/MaterialMosTable";
import React from "react";

export const metadata: Metadata = {
  title: "Table | Play SaaS Starter Kit and Boilerplate for Next.js",
  description: "This is mos database, you can search and export data",
};

const getMosData = () => {
  const filePath = path.join(process.cwd(), "public/csv", "mos.csv");
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
