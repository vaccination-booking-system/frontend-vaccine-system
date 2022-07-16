import React, { useEffect, useState } from "react";
import Card from "../Card";

import { useNavigate } from "react-router-dom";

import StringHelper from "../../utils/StringHelper";

const Breadcrumb = ({ anchorPath, pathArr, selectedPath, selectedUser }) => {
  const { splitStringByDash } = StringHelper;

  const navigate = useNavigate();

  console.log({ selectedUser });

  return (
    <Card>
      <p>
        {pathArr.map((path, idx) => {
          const tempPathArr = [];
          for (let i = 0; i < pathArr.length; i++) {
            tempPathArr.push(pathArr[i]);
            if (pathArr[i] === path) {
              break;
            }
          }
          console.log(tempPathArr);
          return (
            <React.Fragment key={idx}>
              {/**
               * This is for path SK
               *
               */}
              {path.length <= 2 ? (
                <>
                  <span
                    onClick={() => navigate(`/${tempPathArr.join("/")}`)}
                    className={`${path === selectedPath ? "text-[#0A6C9D]" : "text-slate-400"} cursor-pointer`}
                  >
                    {path.toUpperCase()}
                  </span>
                  {idx < pathArr.length - 1 && <span className="text-slate-400"> / </span>}
                </>
              ) : (
                <>
                  <span
                    {...(anchorPath === "booking-vaccine"
                      ? path !== "booking-vaccine" && {
                          onClick: () =>
                            navigate(
                              `/${tempPathArr.join("/")}`,
                              (path === "status" || path === "kategori" || path === "jadwal") && { state: { selectedUser } }
                            ),
                        }
                      : anchorPath === "ticket-vaccine"
                      ? path === "ticket-vaccine" && { onClick: () => navigate("/ticket-vaccine") }
                      : anchorPath === "family-member"
                      ? path === "family-member" && { onClick: () => navigate("/family-member") }
                      : "")}
                    className={`${path === selectedPath ? "text-[#0A6C9D]" : "text-slate-400"} cursor-pointer`}
                  >
                    {splitStringByDash(path)}
                  </span>
                  {idx < pathArr.length - 1 && <span className="text-slate-400"> / </span>}
                </>
              )}
            </React.Fragment>
          );
        })}
      </p>
      <h1 className="font-bold text-[20px]">{anchorPath && splitStringByDash(anchorPath)}</h1>
    </Card>
  );
};

export default Breadcrumb;
