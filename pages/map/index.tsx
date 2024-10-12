import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Scene } from "@antv/l7";
import { GaodeMap } from "@antv/l7-maps";
import { useEffect, useState } from "react";
import { Script } from "vm";

export default function DocsPage() {
  const loadMap = async () => {
    if (typeof window !== "undefined") {
      const { Scene, PointLayer, RasterLayer, PolygonLayer, Source } =
        await import("@antv/l7");
      const { GaodeMap, Map, BaiduMap } = await import("@antv/l7-maps");

      const scene = new Scene({
        id: "map",

        map: new BaiduMap({
          center: [107.054293, 35.246265],
          // zoom: 6.45,
          // 百度地图的logo是否可见，默认true
          logoVisible: false,
        }),
      });

      scene.on("loaded", () => {
        fetch(
          "https://gw.alipayobjects.com/os/bmw-prod/87e40417-a5da-4fdb-8313-c796ea15f982.csv"
        )
          .then((res) => res.text())
          .then((data) => {
            const dataSource = new Source(data, {
              parser: {
                type: "csv",
                x: "lng",
                y: "lat",
              },
              cluster: true,
            });
            const pointLayer = new PointLayer({
              autoFit: true,
            })
              .source(dataSource)
              .shape("circle")
              .scale("point_count", {
                type: "quantile",
              })
              .size("point_count", [5, 10, 15, 20, 25])
              .active(true)
              .color("rgb(73,167,86)")
              .style({
                strokeWidth: 1,
                stroke: "#fff",
              });

            // 聚合图标注
            const pointLayerText = new PointLayer({
              autoFit: false,
            })
              .source(dataSource)
              .shape("point_count", "text")
              .size(15)
              .active(true)
              .color("#fff")
              .style({
                strokeWidth: 0,
                stroke: "#fff",
              });

            scene.addLayer(pointLayer);
            scene.addLayer(pointLayerText);
          });
      });
    }
  };

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full w-full">
        <div
          id="map"
          className="relative justify-center items-center  bg-blue-200 h-full w-[1024px]"
        ></div>
      </section>
    </DefaultLayout>
  );
}
