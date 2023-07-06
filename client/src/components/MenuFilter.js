import React from "react";
import { Button, Flex } from "@chakra-ui/react";

function MenuFilter({ categories, selectedCategory, handleCategoryFilter }) {
  return (
    <Flex justifyContent="center" mb={4}>
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => handleCategoryFilter(category)}
          variant={selectedCategory === category ? "solid" : "outline"}
          colorScheme="blue"
          mr={3}
        >
          {category}
        </Button>
      ))}
    </Flex>
  );
}

export default MenuFilter;
