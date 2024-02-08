import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ROSLIB from "roslib";
import { Bar, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
const DashHome = () => {
  const barChartData = {
    labels: ["Morning", "Afternoon", "Evening"],
    datasets: [
      {
        label: "Workforce",
        data: [5, 12, 8],
        backgroundColor: [
          `rgba(255, 99, 132, 0.6)`,
          `rgba(75, 192, 192, 0.6)`,
          `rgba(255, 205, 86, 0.6)`,
        ],
      },
    ],
  };
  const [connected, setConnected] = useState(false);
  const [ros, setRos] = useState(null);
  const [gasMessages, setGasMessages] = useState("");
  const [tempMessages, setTempMessages] = useState("");
  const [gasValue, setGasValue] = useState("");
  const bodyParts = ["Active", "Rest", "Not Working"];
  const totalSessionTime = 10;
  const sessionTimes = [9, 3, 5];
  useEffect(() => {
    const initConnection = () => {
      const rosInstance = new ROSLIB.Ros({
        url: "ws://localhost:9090",
      });

      rosInstance.on("connection", () => {
        console.log("Connection established!");
        setConnected(true);
        setRos(rosInstance);
        subscribeToGasTopic(rosInstance);
        subscribeToTempTopic(rosInstance);
        // subscribeToCountTopic(rosInstance);
      });
      rosInstance.on("close", () => {
        console.log("Connection is closed!");
        setConnected(false);

        // Try to reconnect every 3 seconds
        setTimeout(() => {
          try {
            rosInstance.connect("ws://localhost:9090");
          } catch (error) {
            console.log("Connection problem");
          }
        }, 3000);
      });
    };
    const subscribeToGasTopic = (rosInstance) => {
      if (rosInstance) {
        try {
          const gasListener = new ROSLIB.Topic({
            ros: rosInstance,
            name: "/gas",
            messageType: "std_msgs/Float32",
          });

          gasListener.subscribe((message) => {
            console.log("Received message from /gas topic:", message);
            setGasMessages([message.data]);
          });

          console.log("Subscription to /elbow topic successful.");
        } catch (error) {
          console.error("Error during subscription to /elbow topic:", error);
        }
      } else {
        console.error("ROS connection not initialized.");
      }
    };
    const subscribeToTempTopic = (rosInstance) => {
      if (rosInstance) {
        try {
          const tempListener = new ROSLIB.Topic({
            ros: rosInstance,
            name: "/temp",
            messageType: "std_msgs/Float32",
          });

          tempListener.subscribe((message) => {
            console.log("Received message from /temp topic:", message);
            setTempMessages([message.data]);
          });

          console.log("Subscription to /temp topic successful.");
        } catch (error) {
          console.error("Error during subscription to /temp topic:", error);
        }
      } else {
        console.error("ROS connection not initialized.");
      }
    };

    initConnection();
    return () => {
      if (ros) {
        ros.close();
      }
    };
  }, []);
  Chart.register(CategoryScale);
  const pieChartData = {
    labels: bodyParts,
    datasets: [
      {
        data: sessionTimes,
        backgroundColor: [
          `rgba(255, 99, 132, 0.6)`,
          `rgba(75, 192, 192, 0.6)`,
          `rgba(255, 205, 86, 0.6)`,
        ],
      },
    ],
  };
  const options = {
    scales: {
      x: {
        type: "category",
        position: "bottom",
      },
      y: {
        beginAtZero: true,
        max: totalSessionTime,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Session Time (min)",
        },
      },
    },
  };
  return (
    <>
      <Box display={"flex"} gap={"20px"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          padding={"20px"}
          borderRadius={"8px"}
          sx={{
            backgroundColor: "#D9F4FF",
          }}
        >
          <Typography
            fontSize={"25px"}
            padding={"20px 20px 5px 20px"}
            fontWeight={600}
          >
            Worker
          </Typography>
          <Typography
            fontSize={"50px"}
            color="green"
            marginX={"20px"}
            fontWeight={600}
          >
            1000
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          borderRadius={"8px"}
          padding={"20px"}
          sx={{
            backgroundColor: "#D9F4FF",
          }}
        >
          <Typography
            fontSize={"25px"}
            padding={"20px 20px 5px 20px"}
            fontWeight={600}
          >
            Machines
          </Typography>
          <Typography
            fontSize={"50px"}
            color="green"
            marginX={"20px"}
            fontWeight={600}
          >
            1000
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          borderRadius={"8px"}
          padding={"20px"}
          sx={{
            backgroundColor: "#D9F4FF",
          }}
        >
          <Typography
            fontSize={"25px"}
            padding={"20px 20px 5px 20px"}
            fontWeight={600}
          >
            Machine Health
          </Typography>
          <Typography
            fontSize={"45px"}
            color="green"
            marginX={"20px"}
            fontWeight={600}
          >
            {100 - tempMessages}% avg. health
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          borderRadius={"8px"}
          padding={"20px"}
          sx={{
            backgroundColor: "#D9F4FF",
          }}
        >
          <Typography
            fontSize={"25px"}
            padding={"20px 20px 5px 20px"}
            fontWeight={600}
          >
            Worker Status
          </Typography>
          <Typography
            fontSize={"45px"}
            color="green"
            marginX={"20px"}
            fontWeight={600}
          >
            20% workforce
          </Typography>
        </Box>
      </Box>
      <Box display={"flex"} gap={"30px"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          borderRadius={"8px"}
          padding={"20px"}
          width={"25%"}
          height={"10%"}
          marginTop={"30px"}
          sx={{
            backgroundColor: "#D9F4FF",
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Worker status
          </Typography>
          <Pie
            type="pie"
            data={pieChartData}

            // options={{ maintainAspectRatio: false }}
          />
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          borderRadius={"8px"}
          padding={"20px"}
          width={"65%"} // Adjust the width as needed
          marginTop={"30px"}
          sx={{
            backgroundColor: "#D9F4FF",
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Workforce vs Time of the Day
          </Typography>
          <Bar data={barChartData} options={options} />
        </Box>
      </Box>
    </>
  );
};

export default DashHome;
