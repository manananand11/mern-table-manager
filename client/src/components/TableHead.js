import React from "react";
import { Thead, Tr, Th, Flex, Icon } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

function TableHead({ sortDirection, handleSortByPrice }) {
  return (
    <Thead>
      <Tr>
        <Th>Id</Th>
        <Th>Image</Th>
        <Th>Name</Th>
        <Th>Category</Th>
        <Th>Label</Th>
        <Th>
          <Flex align="center" onClick={handleSortByPrice} cursor="pointer">
            Price
            {sortDirection === "asc" ? (
              <Icon as={ChevronUpIcon} boxSize={4} ml={1} />
            ) : (
              <Icon as={ChevronDownIcon} boxSize={4} ml={1} />
            )}
          </Flex>
        </Th>
        <Th>Description</Th>
      </Tr>
    </Thead>
  );
}

export default TableHead;
