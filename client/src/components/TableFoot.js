import React from "react";
import { Tfoot, Tr, Th, Button, Icon } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

function TableFoot({ handleSaveChanges, handleResetChanges }) {
  return (
    <Tfoot>
      <Tr>
        <Th colSpan={7}>
          <Button
            onClick={handleSaveChanges}
            loadingText="Saving..."
            leftIcon={<CheckIcon />}
            variant="solid"
            colorScheme="green"
            mr={2}
          >
            Save
          </Button>
          <Button
            onClick={handleResetChanges}
            loadingText="Resetting..."
            leftIcon={<CloseIcon />}
            variant="solid"
            colorScheme="red"
          >
            Reset
          </Button>
        </Th>
      </Tr>
    </Tfoot>
  );
}

export default TableFoot;
