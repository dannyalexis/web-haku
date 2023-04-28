import React from "react";
import LineaChart from "./ChartJs/LineChart";
import BarsChart from "./ChartJs/BarsChart";
const PrincipalPage = () => {
  return (
    <div>
      <h1 className="bg-info text-center font-monospace fw-bold lh-base">
        Graficos
      </h1>
      <div>
        <p className="m-2">
          <b>Ejemplo #1</b> Grafico de lineas basicas
        </p>
        <div
          className="bg-light mx-auto px-2 border border-2 border-primary"
          style={{ width: "750px", height: "330px" }}
        >
          <LineaChart />
        </div>
        <hr className="mt-3 mb-2" />
        <div>
          <p className="m-2">
            <b>Ejemplo #1</b> Grafico de Barras
          </p>
          <div
            className="bg-light mx-auto px-2 border border-2 border-primary"
            style={{ width: "450px", height: "230px" }}
          ></div>
        </div>
        <hr className="mt-3 mb-2" />
        <div>
          <p className="m-2">
            <b>Ejemplo #3</b> Grafico Circular
          </p>
          <div
            className="bg-light mx-auto px-2 border border-2 border-primary"
            style={{ width: "450px", height: "250px" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalPage;
