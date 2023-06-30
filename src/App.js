import React from "react";
import catalogdata from './catalogdata'
import Catalog from "./components/Catalog";


function App() {
  return (
  <>
  <Catalog catalogdata={catalogdata}></Catalog>
  </>
  );
}

export default App;
