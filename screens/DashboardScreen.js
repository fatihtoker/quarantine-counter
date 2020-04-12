import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import { getFromCollectApi } from "../utils";
import AppStyle from "../AppStyle";
import Colors from "../constants/Colors";
import DashboardItem from "../components/DashboardItem";

export default function DashboardScreen() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [covidData, setCovidData] = useState([]);

  useEffect(() => {
    let _isMounted = true;
    async function getCovidData() {
      try {
        // possible endpoints:
        // /countriesData
        // /totalData
        // /coronaNews
        const data = await getFromCollectApi("corona/totalData");
        setCovidData(data.result);
        console.log(data.result);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    _isMounted && getCovidData();
    return () => {
      _isMounted = false;
    };
  }, []);
  if (!isLoadingComplete) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <DashboardItem
        titleId="labelTotalCases"
        data={covidData.totalCases}
        headerStyle={styles.totalCasesHeader}
        containerStyle={styles.totalCasesContainer}
      />
      <DashboardItem
        titleId="labelTotalDeaths"
        data={covidData.totalDeaths}
        containerStyle={styles.totalDeathsContainer}
      />
      <DashboardItem
        titleId="labelTotalRecovered"
        data={covidData.totalRecovered}
        containerStyle={styles.totalRecoveredContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...AppStyle.container,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  totalCasesHeader: {},
  totalCasesContainer: {
    backgroundColor: Colors.red600,
    borderColor: Colors.red600,
  },
  totalDeathsContainer: {
    backgroundColor: Colors.grey800,
    borderColor: Colors.grey800
  },
  totalRecoveredContainer: {
    backgroundColor: Colors.green600,
    borderColor: Colors.green600
  }
});
