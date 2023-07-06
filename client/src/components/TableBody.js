import { Tbody } from "@chakra-ui/react";
import React from "react";
import MenuItem from "./MenuItem";

function TableBody({ updatedMenuItems, selectedCategory, handlePriceChange }) {
  return (
    <Tbody>
      {updatedMenuItems
        .filter((item) => {
          if (
            selectedCategory &&
            selectedCategory.toLowerCase().trim() !== "all" &&
            item.category.toLowerCase().trim() !==
              selectedCategory.toLowerCase().trim()
          ) {
            return false;
          }
          return true;
        })
        .map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            handlePriceChange={handlePriceChange}
          />
        ))}
    </Tbody>
  );
}

export default TableBody;
