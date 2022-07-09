import React from "react";
import { Box } from "@chakra-ui/core";
import { Button } from "../../Components";
import { Link } from "react-router-dom";

export default function HomeCard({ src, title, description, path }) {
  return (
    <Box width="300px" backgroundColor="#FFFFFF" borderRadius="20px">
      <div className="p-5">
        <img src={src} alt={title} />
      </div>
      <div className="p-5">
        <h1 className="font-bold text-lg">{title}</h1>
        <p className="my-2">{description}</p>
        <Link to={path}>
          <Button bg="white" border="1px solid #0A6C9D" btnSize="md" fontSize="14px">
            SEE DETAIL
          </Button>
        </Link>
      </div>
    </Box>
  );
}
