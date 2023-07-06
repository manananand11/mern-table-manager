import React, { useEffect, useState } from "react";
import { makeRequest } from "../axios";
import MenuTable from "../components/MenuTable";

function Home() {
  return (
    <div>
      <MenuTable />
    </div>
  );
}

export default Home;
