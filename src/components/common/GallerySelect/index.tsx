"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../index";
import SelectSearch from "../SelectComponent/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  addValue,
  removeValue,
  selectfilters,
  resetFilters,
  updateType,
  upadteSearch,
} from "@/redux/slice/filters";
import { Country as CountryList, City as CityList } from "country-state-city";
import {
  Sleep,
  CusiniesTypes,
  FranceCities,
  Price,
  Nightlife,
  Sightseeing,
  Rating,
  shopTypes,
  wellnessTypes,
} from "./flters";
import { filterTags } from "@/constants";

export type IFilter = {
  label: string;
  value: string;
  type: "city" | "country" | "cusinie" | string;
  isoCode?: string | undefined;
  nocall?: boolean | undefined;
};

const GallerySelect = ({ setFilterNumber }: { setFilterNumber: Function }) => {
  const filters = useSelector(selectfilters);
  const [countries, setCountries] = useState<IFilter[]>([]);
  const [cities, setCities] = useState<IFilter[]>([]);
  const [selected, setSelected] = useState<IFilter[]>([]);
  const [values, setValues] = useState<string | any>("");

  const [sleep, setSleep] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const [nightlife, setNightlife] = useState([]);
  const [shop, setShop] = useState([]);
  const [sightseeing, setSightseeing] = useState([]);
  const [wellness, setWellness] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState<IFilter>({
    label: "Featured",
    value: "Featured",
    type: "type",
    nocall: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (filters.length === 0) {
      setCuisine([]);
      setNightlife([]);
      setSightseeing([]);
      setSleep([]);
    } else {
      for (let i = 0; i < filterTags.length; i++) {
        if (filters.some((x: IFilter) => x.value === filterTags[i].value)) {
          setSelectedTag(filterTags[i]);
        }
      }
      // setSelectedTag(filters[0]);
    }
  }, [filters]);

  const makeFilterObject = (stringOfCities: Array<string>, type: string) => {
    return stringOfCities.map((c) => ({
      label: c,
      value: c,
      type: type,
    }));
  };

  const handleRemove = (optionToRemove: IFilter) => {
    if (cuisine.length > 0) {
      let c = cuisine.filter((x: any) => x.value !== optionToRemove.value);
      setCuisine(c);
    }
    if (nightlife.length > 0) {
      let c = nightlife.filter((x: any) => x.value !== optionToRemove.value);
      setNightlife(c);
    }
    if (shop.length > 0) {
      let c = shop.filter((x: any) => x.value !== optionToRemove.value);
      setShop(c);
    }
    if (sightseeing.length > 0) {
      let c = sightseeing.filter((x: any) => x.value !== optionToRemove.value);
      setSightseeing(c);
    }
    if (sleep.length > 0) {
      let c = sleep.filter((x: any) => x.value !== optionToRemove.value);
      setSleep(c);
    }
    if (wellness.length > 0) {
      let c = wellness.filter((x: any) => x.value !== optionToRemove.value);
      setWellness(c);
    }
    setSelected(
      selected.filter((option) => option.value !== optionToRemove?.value)
    );

    dispatch(removeValue(optionToRemove?.value));
  };

  const setFilter = (val: IFilter) => {
    dispatch(addValue(val));
    const updatedFilters = selected.filter(
      (filter) => filter?.value !== val.value
    );
    updatedFilters.push(val);
    setSelected(updatedFilters);

    if (val.type == "country") {
      if (val.value == "France") {
        setCities(makeFilterObject(FranceCities, "city"));
      } else {
        const cities = val?.isoCode
          ? CityList.getCitiesOfCountry(val.isoCode)
          : [];

        if (cities) {
          let citiesObjs = cities.map((c) => ({
            label: c.name,
            value: c.name,
            type: "city",
          }));
          setCities(citiesObjs);
        }
      }
    }
  };

  const cleanFilters = () => {
    const obj = filters
      .filter(
        (filter: IFilter) =>
          !selected.some(
            (sel) =>
              sel.label === filter.label &&
              sel.value === filter.value &&
              sel.type === filter.type
          )
      )
      .find((x: any) => x.type === "type");

    setSelected([]);
    resetAllSubFilters();
    if (obj) {
      dispatch(updateType(obj));
    }
  };

  useEffect(() => {
    setFilterNumber(selected.length);

    if (
      selected.find((el) => el.type == "city") &&
      !selected.find((el) => el.type == "country")
    ) {
      const alreadyCity = selected.find((option: any) => option.type == "city");
      if (alreadyCity) {
        dispatch(removeValue(alreadyCity?.value));
        setSelected(selected.filter((filter) => filter?.type !== "city"));
      }
    }
  }, [selected]);

  useEffect(() => {
    const allCountries = CountryList.getAllCountries();
    setCountries(
      allCountries.map((c) => ({
        label: c.name,
        value: c.name,
        type: "country",
        isoCode: c.isoCode,
      }))
    );
  }, []);

  const resetAllSubFilters = () => {
    setCuisine([]);
    setNightlife([]);
    setShop([]);
    setSightseeing([]);
    setSleep([]);
    setWellness([]);
  };

  const onClickHandle = (t: IFilter) => {
    cleanFilters();
    setSelectedTag(t);
    dispatch(updateType(t));
    dispatch(upadteSearch({ label: "", value: "", type: "search" }));
    setValues(t.value);
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  const toggleVisibility = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    }
  }, []);
  return (
    <>
      {/* <h2>{JSON.stringify(selectedTag)}</h2> */}
      <div className="mt-2 w-full gap-2 flex overflow-auto pb-3 AtScrollHide">
        {filterTags.map((el: IFilter, index: number) => (
          <Button
            key={`${JSON.stringify(el)}${index}`}
            className={`${
              el.label == selectedTag?.label ? "purple" : "silver"
            } mt-2 !py-[2px] !px-[2px] flex-shrink-0`}
            onClick={() => onClickHandle(el)}
            // style={{
            //   background: el.label == selectedTag?.label ? "purple" : "silver",
            // }}
          >
            <span
              className={`${
                el.label == selectedTag?.label
                  ? "bg-transparent"
                  : "bg-white rounded-full text-black"
              }  py-2 px-5 `}
            >
              {" "}
              {el.label}
            </span>
          </Button>
        ))}
      </div>
      <div className="flex justify-between items-center py-5  xs:py-2">
        {values == "hotel" ||
        values == "Restaurant" ||
        values == "nightlife" ||
        values == "sightseeing" ||
        values === "shop" ||
        values === "wellness" ? (
          <div className="gap-2 flex flex-wrap   ">
            {values == "hotel" ? (
              <SelectSearch
                data={Sleep}
                type="Recommended by"
                setSelected={setSleep}
                selected={sleep}
                returnFn={setFilter}
                handleRemove={handleRemove}
              />
            ) : values == "Restaurant" ? (
              <div className="flex items-center gap-4">
                <SelectSearch
                  data={CusiniesTypes}
                  type="Cuisine"
                  setSelected={setCuisine}
                  returnFn={setFilter}
                  selected={cuisine}
                  handleRemove={handleRemove}
                />
                {/* <SelectSearch
                data={Price}
                type="Price"
                setSelected={setPrice}
                selected={price}
                returnFn={setFilter}
              /> */}
              </div>
            ) : values == "nightlife" ? (
              <SelectSearch
                data={Nightlife}
                type="Venue"
                setSelected={setNightlife}
                selected={nightlife}
                returnFn={setFilter}
                handleRemove={handleRemove}
              />
            ) : values === "shop" ? (
              <SelectSearch
                data={shopTypes}
                type="Shop"
                setSelected={setShop}
                selected={shop}
                returnFn={setFilter}
                handleRemove={handleRemove}
              />
            ) : values == "sightseeing" ? (
              <SelectSearch
                data={Sightseeing}
                type="Places"
                setSelected={setSightseeing}
                selected={sightseeing}
                returnFn={setFilter}
                handleRemove={handleRemove}
              />
            ) : values == "wellness" ? (
              <SelectSearch
                data={wellnessTypes}
                type="Wellness"
                setSelected={setWellness}
                selected={wellness}
                returnFn={setFilter}
                handleRemove={handleRemove}
              />
            ) : (
              ""
            )}

            {/* <SelectSearch
            data={amenities}
            type="Amenities"
            setSelected={setAmenitie}
            selected={amenitie}
            returnFn={setFilter}
          /> */}

            {/* <SelectSearch
            data={cuisines}
            type="Cuisine"
            setSelected={setCuisine}
            returnFn={setFilter}
            selected={cuisine}
          /> */}
            {/* <SelectSearch
            data={Distance}
            type="Distance"
            setSelected={setSelected}
            selected={selected}
          /> */}
            {/* <SelectSearch
            data={countries}
            type="Country"
            setSelected={setCountry}
            selected={country}
            returnFn={setFilter}
          /> */}
            {/* <SelectSearch
            data={cities}
            type="City"
            setSelected={setCity}
            selected={city}
            returnFn={setFilter}
          /> */}
            {/* <SelectSearch
            data={Rating}
            type="Rating"
            setSelected={setRating}
            selected={rating}
            returnFn={setFilter}
          /> */}
          </div>
        ) : (
          ""
        )}
        {selected.length > 0 && (
          <p
            onClick={cleanFilters}
            className=" border-b  border-primary text-primary  cursor-pointer xs:block hidden !whitespace-nowrap text-sm"
          >
            Clear all
          </p>
        )}
      </div>
      <div className=" xs:block flex justify-between items-center w-full ">
        <ul className="flex gap-2  xs:w-[380px] xs1:w-[320px] overflow-x-auto  xs:gap-2 AtScrollHide  flex-wrap xs:flex-nowrap">
          {selected.map((data, index) => (
            <div
              key={index}
              className="flex gap-2 items-center bg-[#FAFAFA] flex-shrink-0 rounded-lg px-4 py-2"
            >
              <li className="text-black/85 text-sm">{data?.label}</li>
              <i
                className="icon-cross text-xs cursor-pointer text-black/45"
                onClick={() => handleRemove(data)}
              ></i>
            </div>
          ))}
        </ul>
        {selected.length > 0 && (
          <Button
            onClick={cleanFilters}
            color="danger"
            className="!py-2 xs:hidden block !whitespace-nowrap"
          >
            Clean ({selected.length})
          </Button>
        )}
      </div>
    </>
  );
};

export default GallerySelect;
