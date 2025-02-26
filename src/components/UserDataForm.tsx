import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  List,
  ListItem,
  Text,
  Divider,
  HStack,
} from "@chakra-ui/react";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const UserDataForm = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [formData, setFormData] = useState<Omit<UserData, "id">>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const toast = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        setUsers([]); // Fallback in case of JSON parsing errors
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      toast({
        title: "Error",
        description: "All fields are required!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newUser: UserData = { id: crypto.randomUUID(), ...formData };
    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setFormData({ name: "", email: "", phone: "", address: "" });

    toast({
      title: "User Added",
      description: "User data saved successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = (id: string) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    toast({
      title: "User Deleted",
      description: "User has been removed",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="500px" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Save User Data
          </Button>
        </VStack>
      </form>

      <Box mt={6} p={4} borderWidth={1} borderRadius="lg">
        <Text fontSize="xl" fontWeight="bold">
          Stored User Data:
        </Text>
        <List spacing={3} mt={3}>
          {users.length > 0 ? (
            users.map((user) => (
              <ListItem key={user.id} p={2} borderWidth={1} borderRadius="md">
                <HStack justifyContent="space-between">
                  <Box>
                    <Text>
                      <strong>Name:</strong> {user.name}
                    </Text>
                    <Text>
                      <strong>Email:</strong> {user.email}
                    </Text>
                    <Text>
                      <strong>Phone:</strong> {user.phone}
                    </Text>
                    <Text>
                      <strong>Address:</strong> {user.address}
                    </Text>
                  </Box>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </HStack>
                <Divider mt={2} />
              </ListItem>
            ))
          ) : (
            <Text>No users found.</Text>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default UserDataForm;
