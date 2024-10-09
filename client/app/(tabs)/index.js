import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, Modal, Pressable, Clipboard } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link } from "expo-router";
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';


const { width } = Dimensions.get('window');

const Appointment = () => {
  const [entryDetails, setEntryDetails] = useState({
    e_num: '',
    e_reason: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [tokenModalVisible, setTokenModalVisible] = useState(false); // New state for token modal
  const [searchDetails, setSearchDetails] = useState({
    patientName: '',
    patientPhone: '',
  });
  const [patientResults, setPatientResults] = useState([]);
  const [token, setToken] = useState(''); // State to hold the token

  const handleSearchSubmit = async () => {
    try {
      const { patientName, patientPhone } = searchDetails;

      if (!patientName && !patientPhone) {
        return;
      }

      let query = [];
      if (patientName) {
        query.push(`name=${patientName}`);
      }
      if (patientPhone) {
        query.push(`phone_no=${patientPhone}`);
      }

      const queryString = query.join('&');

      const response = await fetch(`http://192.168.165.145:7002/v1/patients/search?${queryString}`);
      const data = await response.json();

      if (response.ok) {
        setPatientResults(data);
        setModalVisible(false);
        setResultModalVisible(true);
      } else if (response.status === 404) {
        setResultModalVisible(true);  
        setPatientResults([]);  
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleSubmit = async () => {
    const { e_num, e_reason } = entryDetails;

    if (!e_num || !e_reason) {
      setToken('Please enter both Patient ID and Reason for Visit.'); // Show message in token modal
      setTokenModalVisible(true);
      return;
    }

    try {
      const response = await fetch('http://192.168.165.145:7002/v1/appointments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient_id: parseInt(e_num), // Ensure patient_id is an integer
          reason: e_reason,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token); // Set the token state
        setEntryDetails({ e_num: '', e_reason: '' });
        setTokenModalVisible(true); // Show the token modal
      } else {
        setToken(data.message || 'Unknown error occurred');
        setTokenModalVisible(true); // Show error message in the token modal
      }
    } catch (error) {
      console.error('Error occurred while creating appointment:', error);
    }
  };

  const copyToClipboard = (patientId) => {
    Clipboard.setString(patientId.toString());
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#0ACDD6']}
      locations={[0.10, 1]}
      style={styles.container}
    >
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BlurView intensity={100} blurAmount={130} tint="light"style={styles.blurContainer}>
          <Link href="../(profile)/profile" style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/Logo1.png")}
              style={styles.logo}
            />
          </Link>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Appointment</Text>
          </View>
        </BlurView>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Patient No.</Text>
            <View style={styles.patientInputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Enter Patient Number"
                value={entryDetails.e_num}
                onChangeText={(e) => setEntryDetails({ ...entryDetails, e_num: e })}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.searchButton} onPress={() => setModalVisible(true)}>
                <Icon name="search" size={20} color="white" style={styles.searchIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Reason for Visit:</Text>
            <TextInput
              style={[styles.inputField, styles.reasonInput]}
              placeholder="Enter Reason for Visit"
              value={entryDetails.e_reason}
              onChangeText={(e) => setEntryDetails({ ...entryDetails, e_reason: e })}
              multiline
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Search Patient</Text>
            <View style={styles.inputContainer}>
              <Icon name="user" size={20} color="black" style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                placeholder="Patient Name"
                value={searchDetails.patientName}
                onChangeText={(text) => setSearchDetails({ ...searchDetails, patientName: text })}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="phone" size={20} color="black" style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                placeholder="Patient Phone No."
                value={searchDetails.patientPhone}
                onChangeText={(text) => setSearchDetails({ ...searchDetails, patientPhone: text })}
                keyboardType="phone-pad"
              />
            </View>
            <TouchableOpacity style={styles.modalSubmitButton} onPress={handleSearchSubmit}>
              <Text style={styles.modalSubmitButtonText}>Search</Text>
            </TouchableOpacity>
            <Pressable style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={resultModalVisible}
        onRequestClose={() => setResultModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Patient Search Results</Text>
            <ScrollView style={styles.resultsContainer}>
              {patientResults.length > 0 ? (
                patientResults.map((patient) => (
                  <View key={patient.patient_id} style={styles.patientResult}>
                    <Text style={styles.resultText}>Patient ID: {patient.patient_id}</Text>
                    <TouchableOpacity onPress={() => copyToClipboard(patient.patient_id)}>
                      <Text style={styles.copyButtonText}>Copy Patient ID</Text>
                    </TouchableOpacity>
                    <Text style={styles.resultText}>Name: {patient.name}</Text>
                    <Text style={styles.resultText}>DOB: {patient.dob}</Text>
                    <Text style={styles.resultText}>Gender: {patient.gender}</Text>
                    <Text style={styles.resultText}>Father's Name: {patient.father_name}</Text>
                    <Text style={styles.resultText}>Phone No: {patient.phone_no}</Text>
                    <Text style={styles.resultText}>Occupation: {patient.occupation}</Text>
                    <Text style={styles.resultText}>Address: {patient.address}</Text>
                  </View>
                ))
              ) : (
                <Text>No patients found</Text>
              )}
            </ScrollView>
            <Pressable style={styles.modalCloseButton} onPress={() => setResultModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* New Modal for displaying token */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={tokenModalVisible}
        onRequestClose={() => setTokenModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Token Information</Text>
            <Text style={styles.resultText}>{token}</Text>
            <Pressable style={styles.modalCloseButton} onPress={() => setTokenModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    </LinearGradient>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 150,
    backgroundColor: "white",
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
  scrollViewContent: {
    paddingTop: 150,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    marginTop:90,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  patientInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#FF4545',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    alignSelf: 'center',
  },
  reasonInput: {
    height: 100,
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  inputIcon: {
    padding: 10,
  },
  modalSubmitButton: {
    backgroundColor: '#FF4545',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalSubmitButtonText: {
    color: 'white',
  },
  modalCloseButton: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'black',
  },
  resultsContainer: {
    maxHeight: 300,
  },
  patientResult: {
    marginBottom: 15,
  },
  resultText: {
    fontSize: 16,
  },
  copyButtonText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
