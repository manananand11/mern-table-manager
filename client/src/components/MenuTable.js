import { useEffect, useState } from "react";
import { Table, Box, ChakraProvider, useToast } from "@chakra-ui/react";

import { makeRequest } from "../axios";
import MenuFilter from "./MenuFilter";

import categories from "../constants/categories";
import TableHead from "./TableHead";
import TableFoot from "./TableFoot";
import TableBody from "./TableBody";

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

  return (
    <ChakraProvider>
      <Box py={8}>
        <MenuFilter
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryFilter={handleCategoryFilter}
        />
        <Table variant="striped" borderRadius="md">
          <TableHead
            sortDirection={sortDirection}
            handleSortByPrice={handleSortByPrice}
          />
          <TableBody
            updatedMenuItems={updatedMenuItems}
            selectedCategory={selectedCategory}
            handlePriceChange={handlePriceChange}
          />
          <TableFoot
            handleSaveChanges={handleSaveChanges}
            handleResetChanges={handleResetChanges}
          />
        </Table>
      </Box>
    </ChakraProvider>
  );
}
export default MenuTable;
