import {
  Box,
  Grid,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [userCount, setUserCount] = useState(0);

  const counterValue = parseInt(
    localStorage.getItem("counterValue") || "0",
    10
  );

  const getTotalUsers = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.length;
  };

  useEffect(() => {
    setUserCount(getTotalUsers());

    // Set up interval to check for new users
    const interval = setInterval(() => {
      setUserCount(getTotalUsers());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Prepare user activity data for the chart
  const userActivity = [{ time: new Date().toISOString(), users: userCount }];

  return (
    <Box p={4}>
      <Heading mb={6}>Dashboard</Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
        <Stat p={6} bg="white" borderRadius="lg" boxShadow="md">
          <StatLabel>Current Count</StatLabel>
          <StatNumber fontSize="2xl">{counterValue}</StatNumber>
        </Stat>

        <Stat p={6} bg="white" borderRadius="lg" boxShadow="md">
          <StatLabel>Total Users Added</StatLabel>
          <StatNumber fontSize="2xl">{userCount}</StatNumber>
        </Stat>
      </SimpleGrid>

      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
        <Box p={6} bg="white" borderRadius="lg" boxShadow="md" height="400px">
          <Text fontSize="xl" mb={4}>
            User Growth
          </Text>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleString()}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#319795"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard;
