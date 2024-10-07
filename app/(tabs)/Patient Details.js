import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
  Clipboard,
} from "react-native";
import React, { useState } from "react";
import { Link, useNavigation } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const PatientDetails = () => {
  const navigation = useNavigation();
  const [searchDetails, setSearchDetails] = useState({
    patientName: "",
    patientPhone: "",
  });
  const [patientResults, setPatientResults] = useState([]);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [enteredPatientId, setEnteredPatientId] = useState("");

  const handleSearchSubmit = async () => {
    try {
      const { patientName, patientPhone } = searchDetails;
  
      if (!patientName && !patientPhone) {
        return; // Ensure at least one field is filled
      }
  
      const query = [];
      if (patientName) {
        query.push(`name=${encodeURIComponent(patientName)}`); // Encoding for URL safety
      }
      if (patientPhone) {
        query.push(`phone_no=${encodeURIComponent(patientPhone)}`);
      }
  
      const queryString = query.join("&");
      const response = await fetch(
        `http://192.168.31.145:7002/v1/patients/search?${queryString}`
      );
      const data = await response.json();
  
      if (response.ok) {
        setPatientResults(data.length > 0 ? data : []);
        navigation.navigate("../(patientdetails)/patientform", {
          searchResults: data, // Pass search results or relevant data
        });
      } else {
        setPatientResults([]);
      }
      setResultModalVisible(true);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handlePatientSelect = async (patientId) => {
    // Copy the patient ID to the clipboard
    await Clipboard.setString(patientId.toString());

    // Navigate to the Prescription page with patientId
    navigation.navigate("prescription", { patientId });
    
  };

  const handleClearSearch = () => {
    setSearchDetails({ patientName: "", patientPhone: "" });
    setEnteredPatientId(""); // Reset the entered patient ID
    setPatientResults([]); // Clear patient results
    setResultModalVisible(false); // Close the modal
  };

  const renderPatient = ({ item }) => (
    <TouchableOpacity
      key={item.patient_id}
      style={styles.patientResult}
      onPress={() => handlePatientSelect(item.patient_id)}
    >
      <Text style={styles.resultText}>Patient ID: {item.patient_id}</Text>
      <Text style={styles.resultText}>Name: {item.name}</Text>
      <Text style={styles.resultText}>DOB: {item.dob}</Text>
      <Text style={styles.resultText}>Gender: {item.gender}</Text>
      <Text style={styles.resultText}>Father's Name: {item.father_name}</Text>
      <Text style={styles.resultText}>Phone No: {item.phone_no}</Text>
      <Text style={styles.resultText}>Occupation: {item.occupation}</Text>
      <Text style={styles.resultText}>Address: {item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Link href="../(profile)/profile" style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/Logo.png")}
            style={styles.logo}
          />
        </Link>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Patient Details</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.searchContainer}>
          <Text style={styles.label}>Search Patient</Text>

          <View style={styles.inputContainer}>
            <Icon
              name="user"
              size={20}
              color="black"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Patient Name"
              value={searchDetails.patientName}
              onChangeText={(text) =>
                setSearchDetails({ ...searchDetails, patientName: text })
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name="phone"
              size={20}
              color="black"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Patient Phone No."
              value={searchDetails.patientPhone}
              onChangeText={(text) =>
                setSearchDetails({ ...searchDetails, patientPhone: text })
              }
              keyboardType="phone-pad"
            />
          </View>
              
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchSubmit}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleClearSearch} // Use handleClearSearch for Reset button
          >
            <Text style={styles.searchButtonText}>Reset</Text>
          </TouchableOpacity>

          {/* Result Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={resultModalVisible}
            onRequestClose={handleClearSearch} // Clear search on modal close
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Patient Search Results</Text>

                {patientResults.length === 0 ? (
                  <View>
                    <Text style={styles.noPatientText}>No patient found</Text>
                  </View>
                ) : (
                  <FlatList
                    data={patientResults}
                    renderItem={renderPatient}
                    keyExtractor={(item) => item.patient_id.toString()}
                    style={styles.resultsContainer}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                  />
                )}

                <Pressable
                  style={styles.modalCloseButton}
                  onPress={handleClearSearch}
                >
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({
  headerContainer: {
    height: 200,
    backgroundColor: "#FF4545",
    width: width,
    position: "absolute",
    zIndex: 10,
  },
  logoContainer: {
    height: 100,
    left: width * 0.05,
    top: 25,
  },
  logo: {
    width: 60,
    height: 50,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 30,
    color: "white",
    alignSelf: "center",
  },
  searchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 220,
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "80%",
  },
  inputIcon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
  },
  searchButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  searchButtonText: {
    color: "white",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  resultsContainer: {
    maxHeight: 300,
  },
  patientResult: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  resultText: {
    fontSize: 16,
  },
  modalCloseButton: {
    backgroundColor: "#FF4545",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: "white",
    textAlign: "center",
  },
  noPatientText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});