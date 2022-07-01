import React, { useEffect, useState } from "react";
import Card from "../Card";

import StringHelper from "../../utils/StringHelper";

const Breadcumb = ({ anchorPath, pathArr, selectedPath }) => {
  const { splitStringByDash } = StringHelper;
  console.log({ anchorPath, pathArr, selectedPath });
  return (
    <Card>
      <p>
        {pathArr.map((path, idx) => (
          <React.Fragment key={idx}>
            {path.length <= 2 ? (
              <>
                <span className={`${path === selectedPath ? "text-[#0A6C9D]" : "text-slate-400"}`}>{path.toUpperCase()}</span>
                {idx < pathArr.length - 1 && <span className="text-slate-400"> / </span>}
              </>
            ) : (
              <>
                <span className={`${path === selectedPath ? "text-[#0A6C9D]" : "text-slate-400"}`}>{splitStringByDash(path)}</span>
                {idx < pathArr.length - 1 && <span className="text-slate-400"> / </span>}
              </>
            )}
          </React.Fragment>
        ))}
      </p>
      <h1 className="font-bold text-[20px]">{anchorPath && splitStringByDash(anchorPath)}</h1>
    </Card>
  );
};

export default Breadcumb;
