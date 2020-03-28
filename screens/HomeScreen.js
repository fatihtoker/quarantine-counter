import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View } from "react-native";

import { readFromStorage, removeFromStorage } from "../utils/";

export default function HomeScreen({ navigation, route }) {
  const [loading, setIsLoading] = useState(new Date(1598051730000));
  const [date, setDate] = useState(new Date(1598051730000));
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(true);

  useEffect(() => {
    async function getQuarantineStartDate() {
      setIsLoading(true);
      const date = await readFromStorage("quarantineStartDate");
      setIsDateTimePickerVisible(!date);
      setDate(date ? new Date(date) : new Date());
      setIsLoading(false);
    }
    getQuarantineStartDate();
  }, []);

  getEndDateOfQuarantine = () => {
    const now = new Date();
    const calculatedDate = now.setDate(
      now.getDate() + assumingQuarantineDayCount
    );
    return new Date(calculatedDate);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading..</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isDateTimePickerVisible && (
        <View>
          <Text
            style={styles.dummyStyle}
            onPress={async () => {
              await removeFromStorage("quarantineStartDate");
              setIsDateTimePickerVisible(true);
              navigation.navigate("Welcome");
            }}
          >
            Finish My Quarantine !
          </Text>
          <Text style={styles.dummyStyle}>{date && date.toString()}</Text>
        </View>
      )}
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  dummyStyle: { marginTop: 60 }
});
