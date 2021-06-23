import React from "react";
import apiRoute from "../resources/apiRoute";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#F1F2F4",
  },
  header: {
    backgroundColor: "#C40033",
    display: "flex",
    color: "white",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  userImageContainer: { width: "5em", height: "5em" },
  userPrimaryInfo: {},
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const CVpdf = React.memo(({ userInfo, secondaryInfo }) => {
  console.log(userInfo);
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image src={DescubreLogo} />
            <Text style={{ fontSize: 10, margin: 0, padding: 0 }}>Descubre</Text>
            <Text style={{ fontSize: 10 }}>El curriculum de</Text>
          </View>
          <View style={styles.userImageContainer}></View>
          <View style={styles.userPrimaryInfo}>
            <Text style={{ textTransform: "capitalize" }}>{`${userInfo.NAMES} ${userInfo.LAST_NAME} ${userInfo.MOTHERS_LAST_NAME}`}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
});
export default CVpdf;
