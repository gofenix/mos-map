import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { Mos } from "@/types/mos";
import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import PDFViewer from "@/components/Mos/PdfViewer";

export const metadata: Metadata = {
  title: "Research | Play SaaS Starter Kit and Boilerplate for Next.js",
  description: "This is research map, you can see it in map",
};

const MapPage = () => {
  return (
    <>
      <Breadcrumb pageName={"Research"} description={metadata.description} />
      <PDFViewer />
    </>
  );
};

export default MapPage;
