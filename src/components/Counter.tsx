import { useState, useEffect } from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import { useSpring, animated } from "@react-spring/web";

const Counter = () => {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("counterValue");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  const animationProps = useSpring({
    from: { height: "0%" },
    to: { height: `${Math.min(count * 2, 100)}%` },
    config: {
      tension: 170,
      friction: 26,
    },
  });

  const backgroundColor = useSpring({
    backgroundColor: `rgba(49, 151, 149, ${Math.min(count / 50, 1)})`,
  });

  useEffect(() => {
    localStorage.setItem("counterValue", count.toString());
  }, [count]);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => Math.max(0, prev - 1));
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <Box position="relative" h="80vh" overflow="hidden">
      <animated.div
        style={{
          ...backgroundColor,
          position: "absolute",
          bottom: 0,
          width: "100%",
          ...animationProps,
        }}
      />

      <VStack
        spacing={6}
        position="relative"
        zIndex={1}
        p={8}
        borderRadius="lg"
        bg="white"
        boxShadow="xl"
        maxW="400px"
        mx="auto"
        mt={8}
      >
        <Text fontSize="6xl" fontWeight="bold">
          {count}
        </Text>
        <Box>
          <Button colorScheme="teal" onClick={increment} mr={2}>
            Increment
          </Button>
          <Button colorScheme="red" onClick={decrement} mr={2}>
            Decrement
          </Button>
          <Button colorScheme="gray" onClick={reset}>
            Reset
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default Counter;
