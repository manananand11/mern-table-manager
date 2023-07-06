import React from "react";
import { Box, Heading } from "@chakra-ui/react";

function Header() {
  return (
    <Box textAlign="center" py={4}>
      <Heading as="h1" size="xl">
        FinvestFx
      </Heading>
    </Box>
  );
}

export default Header;
