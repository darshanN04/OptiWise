import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, Modal, Pressable, Clipboard } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const Appointment = () => {
  const [entryDetails, setEntryDetails] = useState({
    e_num: '',
    e_reason: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [searchDetails, setSearchDetails] = useState({
    patientName: '',
    patientPhone: '',
  });
  const [patientResults, setPatientResults] = useState([]);

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

      const response = await fetch(`http://192.168.31.145:7002/v1/patients/search?${queryString}`);
      const data = await response.json();

      if (response.ok) {
        setPatientResults(data);
        setModalVisible(false);
        setResultModalVisible(true);
      } else if (response.status === 404) {
        setResultModalVisible(true);  
        setPatientResults([]);  }
    } catch (error) {
      console.error('Error occurred:', error);
    }
    
  };

  const handleSubmit = () => {};

  const copyToClipboard = (patientId) => {
    Clipboard.setString(patientId.toString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/Logo1.png')} style={styles.logo} />
        <Text style={styles.headerText}>Appointment</Text>
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
    </View>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    backgroundColor: "#FF4545",
    width: width,
    position: "absolute",
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  logo: {
    width: 70,
    height: 60,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 30,
    color: "white",
    textAlign: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 200,
    padding: 20,
  },
  formContainer: {
    flex: 1,
    paddingTop: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputField: {
    flex: 1,
    padding: 0,
    color: 'black',
  },
  patientInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    padding: 2,
  },
  reasonInput: {
    height: 100,
    textAlignVertical: 'top',
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  submitButton: {
    backgroundColor: "#007BFF",
    width: 110,
    height: 43,
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 19,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    padding: 2,
    marginBottom: 15,
  },
  inputIcon: {
    marginHorizontal: 10,
  },
  modalSubmitButton: {
    backgroundColor: "#007BFF",
    borderRadius: 20,
    padding: 10,
    width: 100,
    alignItems: "center",
  },
  modalSubmitButtonText: {
    color: "white",
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 10,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  resultsContainer: {
    maxHeight: 400,
    width: '100%',
    marginVertical: 10,
  },
  patientResult: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 10,
  },
  resultText: {
    fontSize: 16,
  },
  copyButtonText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
