import styled from "styled-components";

export const LoginStyle = styled.div`
  background-color: #cf0022;
  text-align: center;
  height: 100vh;
  img {
    width: 500px;
    margin-bottom: -105px;
    margin-top: -123px;
  }

  form {
    margin: 0 auto;
    width: 32%;
    background-color: white;
    padding: 3%;
    border-radius: 10px;
    & button {
      margin-bottom: 6px !important;
    }
    & .buttonsregister {
      display: flex;
      justify-content: space-around;
      & .button {
        color: black;
        background-color: #f2ab0a;
      }
      & .button:hover {
        background-color: #f2ab0a;
      }
    }
  }
  .textwhite {
    color: white;
    margin-top: 31px;
    font-size: 18px;
    font-weight: bold;
  }
`;
