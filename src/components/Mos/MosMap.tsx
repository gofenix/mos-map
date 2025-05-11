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
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import MapFilter, { FilterOptions, FilterValues } from "./MapFilter";

// Extended interface to properly type state with size property
interface ExtendedPointLayerProps extends Omit<PointLayerProps, 'state'> {
  state?: {
    active?: {
      color?: string;
      size?: number;
    };
    select?: {
      color?: string;
      size?: number;
    };
  };
}

interface MosMapProps {
  // data: any;
}

export default function MosMap({}: MosMapProps) {
  const mapRef = useRef<any>(null);
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    species: [],
    countries: [],
    years: [],
    journals: [],
  });
  
  const [data, setData] = useState({
    data: [],
    parser: {
      type: "json",
      x: "Long",
      y: "Lat",
    },
  });

  // Configure popup items with specific layer ID to ensure proper binding
  const items: LayerPopupProps["items"] = [
    {
      layer: "PolygonLayer", // This must match the ID of your PointLayer
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

  const pointLayerProps: Omit<ExtendedPointLayerProps, "source"> = {
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
        setOriginalData(dataArr);
        setFilteredData(dataArr);
        setData((prevData) => ({ ...prevData, data: dataArr }));
        
        // Extract filter options from data
        const species = Array.from(new Set(dataArr.map((item: any) => item.Species))).filter((s): s is string => Boolean(s)).sort() as string[];
        const countries = Array.from(new Set(dataArr.map((item: any) => item["L1-Country"]))).filter((c): c is string => Boolean(c)).sort() as string[];
        const validYears: number[] = [];
        dataArr.forEach((item: any) => {
          if (item.Year) {
            const parsedYear = parseInt(String(item.Year));
            if (!isNaN(parsedYear)) {
              validYears.push(parsedYear);
            }
          }
        });
        const years = Array.from(new Set(validYears)).sort((a, b) => a - b);
        const journals = Array.from(new Set(dataArr.map((item: any) => item.Journal))).filter((j): j is string => Boolean(j)).sort() as string[];
        
        setFilterOptions({
          species,
          countries,
          years,
          journals,
        });
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Initialize components after mount to ensure proper hydration
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Mark map as ready after component mounts on client
    setMapReady(true);
    
    // Force rerender when in production to ensure proper hydration
    if (process.env.NODE_ENV === 'production') {
      const timer = setTimeout(() => {
        setData(prevData => ({ ...prevData }));
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Apply filters function
  const applyFilters = useCallback((filterValues: FilterValues) => {
    // If no filters are applied, show all data
    if (
      filterValues.species.length === 0 &&
      filterValues.countries.length === 0 &&
      filterValues.startYear === null &&
      filterValues.endYear === null &&
      filterValues.journals.length === 0
    ) {
      setFilteredData(originalData);
      setData(prevData => ({ ...prevData, data: originalData }));
      return;
    }

    // Apply filters
    const filtered = originalData.filter(item => {
      // Filter by species
      if (filterValues.species.length > 0 && !filterValues.species.includes(item.Species)) {
        return false;
      }
      
      // Filter by country
      if (filterValues.countries.length > 0 && !filterValues.countries.includes(item["L1-Country"])) {
        return false;
      }
      
      // Filter by year range
      const itemYear = parseInt(item.Year);
      if (
        (filterValues.startYear !== null && itemYear < filterValues.startYear) ||
        (filterValues.endYear !== null && itemYear > filterValues.endYear)
      ) {
        return false;
      }
      
      // Filter by journal
      if (filterValues.journals.length > 0 && !filterValues.journals.includes(item.Journal)) {
        return false;
      }
      
      return true;
    });
    
    setFilteredData(filtered);
    setData(prevData => ({ ...prevData, data: filtered }));
  }, [originalData]);

  return (
    <div className="-mt-16 p-16">
      <MapFilter 
        data={originalData}
        filterOptions={filterOptions}
        onFilter={applyFilters}
      />
      <LarkMap 
        {...config} 
        className="min-h-[600px] w-full"
        ref={mapRef}
        onLoaded={() => console.log('Map loaded successfully')}
      >
        {mapReady && (
          <>
            <LayerPopup
              closeButton={false}
              closeOnClick={false}
              anchor="bottom-left"
              trigger="hover"
              items={items}
              // TypeScript doesn't recognize this prop but it's supported in the library
              // @ts-ignore
              getContent={(content) => {
                return `<div class="custom-popup">${content}</div>`;
              }}
            />
            <PointLayer 
              {...pointLayerProps as any} 
              source={data} 
              id="PolygonLayer" 
              onClick={(e) => {
                console.log('Point clicked:', e);
              }}
              // Add explicit interaction states to ensure they work in production
              state={{
                active: {
                  color: '#FFA500',
                  size: 12
                },
                select: {
                  color: '#FF4500',
                  size: 14
                }
              }}
              enabledEvents={['click', 'mousemove', 'mouseout', 'mouseover']}
            />
            <ScaleControl />
            <ZoomControl />
          </>
        )}
      </LarkMap>
    </div>
  );
}
