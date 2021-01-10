import styled from "styled-components";

export const GeneralLayout = styled.div`
  @font-face {
    font-family: "HelveticaNeue";
    src: local("HelveticaNeue"),
      url(/fonts/HelveticaNeue.ttf) format("truetype");
  }
  @font-face {
    font-family: "MyriadPro-Bold";
    src: local("MyriadPro-Bold"),
      url(/fonts/MyriadPro-Bold.otf) format("truetype");
  }
  @font-face {
    font-family: "MyriadPro-Regular";
    src: local("MyriadPro-Regular"),
      url(/fonts/MyriadPro-Regular.otf) format("truetype");
  }
  font-family: MyriadPro-Regular;
  input {
    border-radius: 50px !important;
    border: 1px solid black !important;
  }
  select {
    border-radius: 50px !important;
    border: 1px solid black !important;
  }
  button {
    border-radius: 12px !important;
  }
  h3 {
    font-family: MyriadPro-Bold;
    margin-bottom: auto;
  }
  h2 {
    font-family: MyriadPro-Bold;
    margin-bottom: auto;
  }
  max-height: 102vh;
`;
