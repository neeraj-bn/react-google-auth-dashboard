import { Box, Button, VStack, Text, useToast } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign in with Google',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={6} p={8} bg="white" borderRadius="lg" boxShadow="xl">
        <Text fontSize="2xl" fontWeight="bold">Welcome</Text>
        <Button
          leftIcon={<FcGoogle />}
          onClick={handleGoogleSignIn}
          size="lg"
          variant="outline"
        >
          Sign in with Google
        </Button>
      </VStack>
    </Box>
  );
};

export default Login