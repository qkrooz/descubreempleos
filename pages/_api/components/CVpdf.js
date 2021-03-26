import React from "react";
import apiRoute from "../resources/apiRoute";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
Font.register({
  family: "MyriadPro-Regular",
  src: "./fonts/MyriadPro-Regular.otf",
});

const styles = StyleSheet.create({
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
  userImageContainer: {},
  page: {
    flexDirection: "column",
    backgroundColor: "#F1F2F4",
    fontFamily: "MyriadPro-Regular",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
const CVpdf = React.memo(({ userInfo, secondaryInfo }) => {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={{ fontSize: 10, margin: 0, padding: 0 }}>
              Descubre
            </Text>
            <Text style={{ fontSize: 10 }}>El curriculum de</Text>
          </View>
          <View style={styles.userImageContainer}>
            {/* <Image
                src={`${apiRoute}/img/userprofile/${userInfo.IMAGE_URL}`}
              /> */}
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
