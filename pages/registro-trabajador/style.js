import styled from "styled-components";

export const Employee = styled.div`
  text-align: center;
  .ui.form .field {
    margin: 1em 0em 1em 0em;
  }
  img {
    margin-top: -142px;
    margin-bottom: -203px;
    width: 630px;
  }
  h2 {
    color: white;
    width: 49%;
    margin: 0 auto;
    margin-top: 22px;
  }

  .textwhite1 {
    color: white;
    position: absolute;
    bottom: 35px;
    right: 110px;
    font-size: 18px;
    font-weight: bold;
  }
  .background {
    background-color: #cf0022;
    border-top-right-radius: 300px;
    border-bottom-right-radius: 300px;
    height: 102vh;
    position: absolute;
    width: 70%;
  }
  .containerform {
    display: flex;
    align-items: center;
    height: 100vh;
    form {
      width: 80%;
      margin: 0 auto;
      background-color: white;
      padding: 6%;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0px 0px 27px #88887975;
      & .registerleft {
        text-align: left;
      }
      & ul {
        text-align: left;
        margin-top: 0px;
        padding-inline-start: 0px;
      }
    }
  }
`;
