export type Mos = {
  id: number;
  Species: string;
  Year: number;
  "L1-Country": string;
  "L2-Province/state": string;
  "L3-City": string;
  "L4-District": string;
  Location: string;
  Lat: number;
  Long: number;
  SourceType: string;
  Journal: string;
  Title: string;
  PMID: string;
  Note: string;
};

import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
