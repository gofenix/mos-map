"use client";
import {
  LarkMap,
  LarkMapProps,
  LayerPopup,
  LayerPopupProps,
  PointLayer,
  PointLayerProps,
  ScaleControl,
  ZoomControl,
} from "@antv/larkmap";
import { useCallback, useEffect, useState } from "react";

interface MosMapProps {
  // data: any;
}

export default function MosMap({}: MosMapProps) {
  const [data, setData] = useState({
    data: [],
    parser: {
      type: "json",
      x: "Long",
      y: "Lat",
    },
  });

  const items: LayerPopupProps["items"] = [
    {
      layer: "PolygonLayer",
      fields: [
        {
          field: "Species",
          formatField: "Species",
        },
        {
          field: "Year",
          formatField: "Year",
        },
        {
          field: "L1-Country",
          formatField: "L1-Country",
        },
        {
          field: "L2-Province/state",
          formatField: "L2-Province/state",
        },
        {
          field: "L3-City",
          formatField: "L3-City",
        },
        {
          field: "L4-District",
          formatField: "L4-District",
        },
        {
          field: "Location",
          formatField: "Location",
        },
        {
          field: "Lat",
          formatField: "Lat",
        },
        {
          field: "Long",
          formatField: "Long",
        },
        {
          field: "SourceType",
          formatField: "SourceType",
        },
        {
          field: "Journal",
          formatField: "Journal",
        },
        {
          field: "Title",
          formatField: "Title",
        },
        {
          field: "PMID",
          formatField: "PMID",
        },
        {
          field: "Note",
          formatField: "Note",
        },
      ],
    },
  ];

  const config: LarkMapProps = {
    mapType: "Baidu",
    mapOptions: {
      style: "dark",
      zoom: 5,
    },
    logoPosition: "bottomleft",
  };

  const pointLayerProps: Omit<PointLayerProps, "source"> = {
    id: "myPointLayer",
    shape: "circle",
    size: 7,
    color: {
      field: "Journal",
      value: [
        "#FF6B6B", // 鲜红色
        "#4ECDC4", // 青绿色
        "#FFA500", // 橙色
        "#45B7D1", // 天蓝色
        "#98D8C8", // 薄荷绿
        "#F7DC6F", // 金黄色
        "#9B59B6", // 紫色
        "#E74C3C", // 深红色
        "#3498DB", // 蓝色
        "#2ECC71", // 翠绿色
      ],
    },
    state: {
      active: {
        color: "pink", // 设置鼠标划过点的颜色
      },
    },
    autoFit: true,
    style: {
      opacity: 0.7,
    },
    blend: "normal", // 图层元素混合效果 https://antv-l7.gitee.io/zh/docs/api/base#blend
  };

  const fetchData = useCallback(() => {
    fetch("/api/geo")
      .then((res) => res.json())
      .then((dataArr) => {
        setData((prevData) => ({ ...prevData, data: dataArr }));
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="-mt-16 p-16 ">
      <LarkMap {...config} className="min-h-[600px] w-full">
        <LayerPopup
          closeButton={false}
          closeOnClick={false}
          anchor="bottom-left"
          // @ts-ignore
          title={<div>图层数据</div>}
          trigger="hover"
          items={items}
        />
        ,
        <PointLayer {...pointLayerProps} source={data} id="PolygonLayer" />
        <ScaleControl />
        <ZoomControl />
      </LarkMap>
    </div>
  );
}
