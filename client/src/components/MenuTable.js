import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Box,
  Image,
  chakra,
  ChakraProvider,
  Button,
  Flex,
  Spacer,
  Input,
  useToast,
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { makeRequest } from "../axios";

function MenuTable() {
  const [menuItems, setMenuItems] = useState([]);
  const [updatedMenuItems, setUpdatedMenuItems] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const storedMenuItems = localStorage.getItem("menuItems");
        const response = await makeRequest.get();

        if (storedMenuItems) {
          setUpdatedMenuItems(JSON.parse(storedMenuItems));
          setMenuItems(response.data);
        } else {
          setMenuItems(response.data);
          setUpdatedMenuItems(response.data);
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleSaveChanges = () => {
    localStorage.setItem("menuItems", JSON.stringify(updatedMenuItems));

    toast({
      title: "Data Saved",
      description: "Changes have been saved.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleResetChanges = () => {
    setUpdatedMenuItems(menuItems);
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
    toast({
      title: "Data Reset",
      description: "Changes have been reset to the original state.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePriceChange = (itemId, newPrice) => {
    setUpdatedMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, price: newPrice } : item
      )
    );
  };
  const handleSortByPrice = () => {
    const sortedItems = [...updatedMenuItems].sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
    });

    setUpdatedMenuItems(sortedItems);
    setSortDirection((prevSortDirection) =>
      prevSortDirection === "asc" ? "desc" : "asc"
    );
  };
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };
  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  const categories = ["All", "Appetizer", "Mains", "Dessert", "Weird", "Clone"];

  return (
    <ChakraProvider>
      <Box py={8}>
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
        <Table variant="striped" borderRadius="md">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Label</Th>
              <Th>
                <Flex
                  align="center"
                  onClick={handleSortByPrice}
                  cursor="pointer"
                >
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
                      onChange={(e) =>
                        handlePriceChange(item.id, e.target.value)
                      }
                      borderRadius="md"
                    />
                  </Td>
                  <Td>{item.description}</Td>
                </Tr>
              ))}
          </Tbody>
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
        </Table>
        
      </Box>
    </ChakraProvider>
  );
}
export default MenuTable;
