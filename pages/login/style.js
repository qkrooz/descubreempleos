import styled from "styled-components";

export const LoginStyle = styled.div`
  background-color: #cf0022;
  text-align: center;
  height: 100vh;
  width: 100%;
  img {
    width: 500px;
    margin-bottom: -105px;
    margin-top: -123px;
  }

  form {
    margin: 0 auto;
    width: 422px;
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
  @media screen and (max-width: 600px) {
    & form {
      width: 300px;
    }
    & img {
      width: 317px;
      margin-top: -54px;
      margin-bottom: -63px;
    }
    & .textwhite {
      margin-top: 122px;
      font-size: 13px;
    }
  }
`;
