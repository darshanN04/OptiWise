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
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get("window");

const PatientDetails = () => {
  const [searchDetails, setSearchDetails] = useState({
    patientName: "",
    patientPhone: "",
  });
  const [patientResults, setPatientResults] = useState([]);
  const [resultModalVisible, setResultModalVisible] = useState(false);

  const handleSearchSubmit = async () => {
    try {
      const { patientName, patientPhone } = searchDetails;

      if (!patientName && !patientPhone) {
        return;
      }

      const query = [];
      if (patientName) {
        query.push(`name=${encodeURIComponent(patientName)}`);
      }
      if (patientPhone) {
        query.push(`phone_no=${encodeURIComponent(patientPhone)}`);
      }

      const queryString = query.join("&");
      const response = await fetch(
        `http://192.168.165.145:7002/v1/patients/search?${queryString}`
      );
      const data = await response.json();

      if (response.ok) {
        setPatientResults(data.length > 0 ? data : []);
      } else {
        setPatientResults([]);
      }
      setResultModalVisible(true);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handlePatientSelect = async (patientId) => {
    handleClearSearch();
  };

  const handleClearSearch = () => {
    setSearchDetails({ patientName: "", patientPhone: "" });
    setPatientResults([]); // Clear patient results
    setResultModalVisible(false); // Close the modal
  };

  const renderPatient = ({ item }) => (
    
    <View key={item.patient_id} style={styles.patientResult}>
      <Link
        href={`../(patientdetails)/patientform?patientId=${item.patient_id}`}
        style={styles.linkText} // Added styling for the link
        onPress={() => handlePatientSelect(item.patient_id)}
      >
        <Text style={styles.resultText}>Patient ID: {item.patient_id}</Text>
      </Link>
      <Text style={styles.resultText}>Name: {item.name}</Text>
      <Text style={styles.resultText}>DOB: {item.dob}</Text>
      <Text style={styles.resultText}>Gender: {item.gender}</Text>
      <Text style={styles.resultText}>Father's Name: {item.father_name}</Text>
      <Text style={styles.resultText}>Phone No: {item.phone_no}</Text>
      <Text style={styles.resultText}>Occupation: {item.occupation}</Text>
      <Text style={styles.resultText}>Address: {item.address}</Text>
    </View>
  );
  
  return (
    <LinearGradient
      colors={['#FFFFFF', '#0ACDD6']}
      locations={[0.10, 1]}
      style={styles.container}
    >
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <BlurView intensity={100} blurAmount={130} tint="light"style={styles.blurContainer}>
          <Link href="../(profile)/profile" style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/Logo1.png")}
              style={styles.logo}
            />
          </Link>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Patient Details</Text>
          </View>
        </BlurView>
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
              placeholderTextColor='black'
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
              placeholderTextColor='black'
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
            style={styles.resetButton}
            onPress={handleClearSearch}
          >
            <Text style={styles.searchButtonText}>Reset</Text>
          </TouchableOpacity>

          {/* Result Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={resultModalVisible}
            onRequestClose={handleClearSearch}
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
    </LinearGradient>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 150,
    backgroundColor: "transparent",
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
    width: 70,
    height: 60,
    position: 'absolute',
    top: 50,
    left: 20,
  },
  headerText: {
    fontSize: 25,
    color: "#450F81",
    alignSelf: "center",
    fontWeight: 'bold',
    marginTop: 0,
    paddingBottom: 20

  },
  searchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: '80%',
    backgroundColor: '#FFFFFFAA',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'purple',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 25,
    paddingVertical: 5, // Reduced margin to close gap between input and error
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
    width: 150,
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    elevation: 8,
  },
  resetButton: {
    backgroundColor: '#FF3333',
    padding: 10,
    width: 150,
    borderRadius: 10,
    marginTop: 30,
    elevation: 8,
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
    marginTop: 20,
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});
