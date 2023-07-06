import React from "react";
import { Button, Flex } from "@chakra-ui/react";

function MenuFilter({ categories, selectedCategory, handleCategoryFilter }) {
  return (
    <Flex mb={4}>
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => handleCategoryFilter(category)}
          variant={selectedCategory === category ? "solid" : "outline"}
          colorScheme="blue"
          mr={2}
        >
          {category}
        </Button>
      ))}
    </Flex>
  );
}

export default MenuFilter;
