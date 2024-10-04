import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, Button, Platform, TouchableOpacity } from 'react-native';
import "../../assets/images/Logo.png";
import { useState, React } from 'react';
import { Link } from 'expo-router';


const { width } = Dimensions.get('window'); // Get the screen width

const work = () => {
  const [entryDetails, setEntryDetails] = useState({
    e_num: 0,
    e_reason: "",
  });

  return (
    <View style={{ flex: 1 }}>

      <View style={{ height: 200, backgroundColor: "#FF4545", width: width, position: "absolute", zIndex: 10 }}>
        <Link href="../(profile)/profile" style={{height: 100, left: width*0.05, top: 25}}>
          <Image 
            source={require('../../assets/images/Logo.png')} 
            style={{ width: 60, height: 50 }} 
          />
        </Link>
        <View style={{ flex: 1}}>
          <Text style={{ fontSize: 30, color: "white", alignSelf: "center" }}>Appointments</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{padding: 20}}>
        {/* Patient No. */}
            <View style={{paddingTop: 200}}>
                <Text style={{ fontSize: 16 }}>Patient No. </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder=""
                    value={entryDetails.e_num}
                    onChangeText={(e) => setEntryDetails({ ...entryDetails, e_num: e })}
                  />
                </View>
              </View>

        {/* Reason */}

              <View style={{marginBottom: 30}}>
                <Text style={{ fontSize: 16 }}>Reason for visit: </Text>
                <View style={{width: 300,height: 120,borderRadius: 5,borderColor: 'black',borderWidth: 2,flexDirection: "row",alignItems: "center",padding: 10,marginBottom: 15}}>
                  <TextInput
                    style={styles.inputField}
                    placeholder=""
                    value={entryDetails.e_reason}
                    onChangeText={(e) => setEntryDetails({ ...entryDetails, e_reason: e })}
                  />
                </View>
              </View>
        {/* Submit Button */}

              <TouchableOpacity style={{backgroundColor: "#FF4545",width: 100,height: 40,borderRadius: 5,alignSelf: "center",justifyContent: "center",alignItems: "center"}}>
                <Text style={{color: "white",fontSize: 18}}>Submit</Text>
              </TouchableOpacity>

        {/* End */}
        </View>

      </ScrollView>
    </View>
  )
}

export default work

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
    maxHeight: 50,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 15
  },
  inputField: {
    fontSize: 18,
    flex: 1,
    flexDirection: "row",
  },
})