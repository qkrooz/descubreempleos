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
    width: 40%;
    background-color: white;
    padding: 3%;
    border-radius: 10px;
    & .button {
      color: black;
      background-color: #f2ab0a;
    }
    & .button:hover {
      background-color: #f2ab0a;
    }
  }
  .textwhite {
    color: white;
  }
`;
