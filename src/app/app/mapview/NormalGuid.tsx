import React from "react";
import Continent from "./continent";
import Country from "./country";

const NormalGuid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 max-h-[62vh] overflow-auto AtScrollStyle">
  <div className="col-span-1 md:col-span-1 px-5 md:border-r">
    <Continent />
  </div>

  <div className="col-span-1 md:col-span-1 px-5">
    <Country />
  </div>
</div>

  );
};

export default NormalGuid;
