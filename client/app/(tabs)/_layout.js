import { useEffect, useState } from "react";
import { View, Image, Alert } from "react-native";
import { Tabs } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { icons } from "../../constants";

const TabIcon = ({ icon, color, focused }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", gap: 2 }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: focused ? 35 : 25,
          height: focused ? 35 : 25,
          marginTop: 0,
        }}
      />
    </View>
  );
};

export default function WorkLayout() {
  const [userRole, setUserRole] = useState(null);
  const [allowedTabs, setAllowedTabs] = useState([]);

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await AsyncStorage.getItem("doctorRole");
      setUserRole(role);
      setAllowedTabs(getAllowedTabs(role));
    };

    fetchUserRole();
  }, []);

  const getAllowedTabs = (role) => {
    switch (role) {
      case "Receptionist":
        return ["Registration", "index"];
      case "Optometrist":
        return ["Registration", "index", "AppointmentDashboard"];
      case "Junior Doctor":
      case "Senior Doctor":
        return [
          "Registration",
          "index",
          "AppointmentDashboard",
          "PatientDetails",
        ];
      case "Counsellor":
        return ["PatientDetails"];
      default:
        return [];
    }
  };

  const handleTabPress = (tabName, e) => {
    if (!allowedTabs.includes(tabName)) {
      e.preventDefault(); // Prevent navigation
      Alert.alert(
        "Access Denied",
        "You do not have permission to access this page."
      );
    }
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "red",
          tabBarStyle: {
            backgroundColor: "#58008E",
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="Registration"
          options={{
            title: "name",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name=""
                icon={icons.registration}
                color={color}
                focused={focused}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => handleTabPress("Registration", e),
          }}
        />

        <Tabs.Screen
          name="index"
          options={{
            title: "index",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name=""
                icon={icons.appointment}
                color={color}
                focused={focused}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => handleTabPress("index", e),
          }}
        />

        <Tabs.Screen
          name="AppointmentDashboard"
          options={{
            title: "Appointment Dashboard",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name=""
                icon={icons.prescription}
                color={color}
                focused={focused}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => handleTabPress("AppointmentDashboard", e),
          }}
        />

        <Tabs.Screen
          name="PatientDetails"
          options={{
            title: "Patient Details",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name=""
                icon={icons.patient}
                color={color}
                focused={focused}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => handleTabPress("PatientDetails", e),
          }}
        />
      </Tabs>
    </>
  );
}
