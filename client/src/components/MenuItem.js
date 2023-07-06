import React from "react";
import {
  Td,
  chakra,
  Image,
  Input,
  Tr,
} from "@chakra-ui/react";

function MenuItem({ item, handlePriceChange }) {
  return (
    <Tr key={item.id}>
      <Td>{item.id}</Td>
      <Td>
        <chakra.div w="80px" mx="auto">
          <Image
            src={item.image}
            alt={item.name}
            borderRadius="md"
            boxSize="80px"
            objectFit="cover"
          />
        </chakra.div>
      </Td>
      <Td>{item.name}</Td>
      <Td>{item.category}</Td>
      <Td>{item.label}</Td>
      <Td>
        <Input
          type="number"
          value={item.price}
          onChange={(e) => handlePriceChange(item.id, e.target.value)}
          borderRadius="md"
        />
      </Td>
      <Td>{item.description}</Td>
    </Tr>
  );
}

export default MenuItem;
