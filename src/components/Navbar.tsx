import { Box, Flex, Link as ChakraLink, Button } from '@chakra-ui/react';
import { Text } from "@chakra-ui/react";

import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const links = [
    { path: '/counter', label: 'Counter' },
    { path: '/user-form', label: 'User Form' },
    { path: '/rich-text', label: 'Rich Text Editor' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  if (!currentUser) return null;

  return (
    <Box bg="teal.500" px={4} py={3}>
      <Flex maxW="container.lg" mx="auto" align="center" justify="space-between">
        <Flex gap={6}>
          {links.map((link) => (
            <ChakraLink
              as={RouterLink}
              key={link.path}
              to={link.path}
              color="white"
              fontWeight="medium"
              _hover={{ textDecoration: 'none', color: 'teal.100' }}
              borderBottom={location.pathname === link.path ? '2px solid white' : 'none'}
            >
              {link.label}
            </ChakraLink>
          ))}
        </Flex>
        <Flex align="center" gap={4}>
          <Text color="white">{currentUser.email}</Text>
          <Button onClick={handleSignOut} size="sm" colorScheme="whiteAlpha">
            Sign Out
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;