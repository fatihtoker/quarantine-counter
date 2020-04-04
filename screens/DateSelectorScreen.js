import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppStyle from "../AppStyle";

import { StyleSheet, Text, View } from "react-native";
import Button from "react-native-button";

import { readFromStorage } from "../utils";

export default function DateSelectorScreen({ navigation, route }) {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    console.log(selectedDate);

    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  useEffect(() => {
    let isCancelled = false;
    async function getQuarantineStartDate() {
      const date = await readFromStorage("quarantineStartDate");
      if (date) {
        navigation.reset({
          index: 0,
          routes: [{ name: "App" }]
        });
      }
      setDate(date ? new Date(date) : new Date());
    }
    if (!isCancelled) {
      getQuarantineStartDate();
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <View style={AppStyle.container}>
      <Text style={AppStyle.header}>Choose Start Date</Text>
      <DateTimePicker
        testID="dateTimePicker"
        timeZoneOffsetInMinutes={0}
        maximumDate={new Date()}
        value={date}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          onPress={async () => {
            navigation.navigate("TimeSelector", {
              selectedStartDate: JSON.stringify(date)
            });
          }}
        >
          Next
        </Button>
      </View>
    </View>
  );
}

DateSelectorScreen.navigationOptions = {
  header: null,
  gesturesEnabled: false
};

const styles = StyleSheet.create({
  button: {
    ...AppStyle.defaultButton
  },
  buttonContainer: {
    ...AppStyle.defaultButtonContainer,
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 120
  }
});
