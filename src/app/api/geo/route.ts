import { NextRequest, NextResponse } from "next/server";

import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { Mos } from "@/types/mos";
import _ from "lodash";

const getMosData = () => {
  const filePath = path.join(process.cwd(), "public/docs", "mos.csv");
  const fileContent = fs.readFileSync(filePath, "utf8");
  let records: Mos[] = parse(fileContent, { columns: true });
  records = records.map((record, index) => ({ ...record, id: index }));

  return records;
};

export async function GET(request: NextRequest) {
  const data = getMosData();

  // const sp = data.map((item) => item.Species);
  // const data2 = _.uniq(sp);
  // console.log(data2)
  // console.log(data2.length)

  return NextResponse.json(data);
}
