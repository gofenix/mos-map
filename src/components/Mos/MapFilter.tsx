// 这个组件不作为客户端入口文件，所以可以使用函数作为props

import React, { useEffect, useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

// Define filter options interface
export interface FilterOptions {
  species: string[];
  countries: string[];
  years: number[];
  journals: string[];
}

// Define filter values interface
export interface FilterValues {
  species: string[];
  countries: string[];
  startYear: number | null;
  endYear: number | null;
  journals: string[];
}

interface MapFilterProps {
  data: any[];
  filterOptions: FilterOptions;
  onFilter: (filteredValues: FilterValues) => void;
}

export default function MapFilter({ data, filterOptions, onFilter }: MapFilterProps) {
  // Default filter values
  const [filterValues, setFilterValues] = useState<FilterValues>({
    species: [],
    countries: [],
    startYear: null,
    endYear: null,
    journals: [],
  });

  // Dialog open states
  const [speciesDialogOpen, setSpeciesDialogOpen] = useState(false);
  const [countriesDialogOpen, setCountriesDialogOpen] = useState(false);
  const [journalsDialogOpen, setJournalsDialogOpen] = useState(false);

  // Apply filters
  const applyFilters = () => {
    onFilter(filterValues);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({
      species: [],
      countries: [],
      startYear: null,
      endYear: null,
      journals: [],
    });
    onFilter({
      species: [],
      countries: [],
      startYear: null,
      endYear: null,
      journals: [],
    });
  };

  // Get min and max years from the options for slider
  const minYear = filterOptions.years.length > 0 ? Math.min(...filterOptions.years) : 1970;
  const maxYear = filterOptions.years.length > 0 ? Math.max(...filterOptions.years) : new Date().getFullYear();
  
  // Initialize year range with min and max if not set
  useEffect(() => {
    if (filterOptions.years.length > 0 && !filterValues.startYear && !filterValues.endYear) {
      setFilterValues(prev => ({
        ...prev,
        startYear: minYear,
        endYear: maxYear
      }));
    }
  }, [filterOptions.years, filterValues.startYear, filterValues.endYear, minYear, maxYear]);

  // Handle year range slider change
  const handleYearRangeChange = (values: number[]) => {
    if (values.length === 2) {
      setFilterValues(prev => ({
        ...prev,
        startYear: values[0],
        endYear: values[1]
      }));
    }
  };

  // Handle checkbox change for multi-select options
  const handleCheckboxChange = (category: keyof Pick<FilterValues, 'species' | 'countries' | 'journals'>, value: string, checked: boolean) => {
    if (checked) {
      setFilterValues(prev => ({
        ...prev,
        [category]: [...prev[category], value],
      }));
    } else {
      setFilterValues(prev => ({
        ...prev,
        [category]: prev[category].filter(item => item !== value),
      }));
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg mb-6 overflow-hidden border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
        <h3 className="font-medium text-base">地图数据筛选</h3>
        <div className="flex space-x-2">
          <Button onClick={resetFilters} variant="ghost" size="sm" className="h-8 px-3 text-xs">
            重置
          </Button>
          <Button onClick={applyFilters} size="sm" className="h-8 px-3 text-xs bg-blue-500 hover:bg-blue-600 text-white">
            应用筛选
          </Button>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Year Range Filter - 放在第一个位置，占据整行 */}
        <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-4 mb-2">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium">年份范围</span>
            <div className="text-xs py-1 px-2 bg-gray-100 rounded-md dark:bg-gray-700">
              {filterValues.startYear || minYear} - {filterValues.endYear || maxYear}
            </div>
          </div>
          
          {filterOptions.years.length > 0 && (
            <Slider
              defaultValue={[filterValues.startYear || minYear, filterValues.endYear || maxYear]}
              value={[filterValues.startYear || minYear, filterValues.endYear || maxYear]}
              min={minYear}
              max={maxYear}
              step={1}
              onValueChange={handleYearRangeChange}
              className="mt-2"
            />
          )}
        </div>
        {/* Species Filter */}
        <div>
          <label className="text-sm font-medium block mb-2">物种</label>
          <Dialog open={speciesDialogOpen} onOpenChange={setSpeciesDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-between px-3 h-9 border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <span className="text-sm truncate max-w-[85%] text-left">
                  {filterValues.species.length > 0 ? (
                    <>
                      已选择 <span className="inline-flex items-center justify-center h-5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 px-1.5 ml-1 dark:bg-blue-800 dark:text-blue-100">{filterValues.species.length}</span>
                    </>
                  ) : (
                    "选择物种"
                  )}
                </span>
                <svg className="h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>选择物种</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto">
              {filterOptions.species.map(species => (
                <div key={species} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`species-${species}`} 
                    checked={filterValues.species.includes(species)}
                    onCheckedChange={(checked) => handleCheckboxChange('species', species, checked === true)}
                  />
                  <label htmlFor={`species-${species}`} className="text-sm">{species}</label>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setSpeciesDialogOpen(false)}>确定</Button>
            </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Countries Filter */}
        <div>
          <label className="text-sm font-medium block mb-2">国家/地区</label>
          <Dialog open={countriesDialogOpen} onOpenChange={setCountriesDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-between px-3 h-9 border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <span className="text-sm truncate max-w-[85%] text-left">
                  {filterValues.countries.length > 0 ? (
                    <>
                      已选择 <span className="inline-flex items-center justify-center h-5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 px-1.5 ml-1 dark:bg-blue-800 dark:text-blue-100">{filterValues.countries.length}</span>
                    </>
                  ) : (
                    "选择国家/地区"
                  )}
                </span>
                <svg className="h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>选择国家/地区</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto">
              {filterOptions.countries.map(country => (
                <div key={country} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`country-${country}`} 
                    checked={filterValues.countries.includes(country)}
                    onCheckedChange={(checked) => handleCheckboxChange('countries', country, checked === true)}
                  />
                  <label htmlFor={`country-${country}`} className="text-sm">{country}</label>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setCountriesDialogOpen(false)}>确定</Button>
            </div>
            </DialogContent>
          </Dialog>
        </div>



        {/* Journals Filter */}
        <div>
          <label className="text-sm font-medium block mb-2">期刊来源</label>
          <Dialog open={journalsDialogOpen} onOpenChange={setJournalsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-between px-3 h-9 border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <span className="text-sm truncate max-w-[85%] text-left">
                  {filterValues.journals.length > 0 ? (
                    <>
                      已选择 <span className="inline-flex items-center justify-center h-5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 px-1.5 ml-1 dark:bg-blue-800 dark:text-blue-100">{filterValues.journals.length}</span>
                    </>
                  ) : (
                    "选择期刊来源"
                  )}
                </span>
                <svg className="h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>选择期刊来源</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto">
              {filterOptions.journals.map(journal => (
                <div key={journal} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`journal-${journal}`} 
                    checked={filterValues.journals.includes(journal)}
                    onCheckedChange={(checked) => handleCheckboxChange('journals', journal, checked === true)}
                  />
                  <label htmlFor={`journal-${journal}`} className="text-sm">{journal}</label>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setJournalsDialogOpen(false)}>确定</Button>
            </div>
            </DialogContent>
          </Dialog>
        </div>


      </div>
    </div>
  );
}
