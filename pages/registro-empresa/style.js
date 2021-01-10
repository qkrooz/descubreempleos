import styled from "styled-components";

export const CompanyStyle = styled.div`
  text-align: center;
  .background {
    position: absolute;
    width: 100%;
    background-color: #cf0022;
    border-top-right-radius: 270px;
    border-top-left-radius: 270px;
    z-index: -1;
    height: 102vh;
  }
  form {
    width: 70%;
    margin: 0 auto;
    background-color: white;
    padding: 2%;
    border-radius: 20px;
    & p {
      text-align: left;
    }
    & .textleft {
      text-align: left;
      margin-bottom: 15px;
    }
    & .textleft1 {
      text-align: left;
      margin-top: 15px;
      margin-bottom: auto;
    }
    & .process {
      color: red;
    }
    & .photo {
      width: 163px;
      background: #bfc1c8;
      margin: 0 auto;
      text-align: center;
      padding: 10px;
      & input {
        display: none;
      }
      & .img {
        width: 50px;
        height: 50px;
        margin-bottom: auto;
        margin-top: auto;
        cursor: pointer;
      }
    }

    & .textcenter {
      text-align: center;
      width: 72%;
      margin: 0 auto;
      margin-top: 11px;
      margin-bottom: 9px;
    }
  }
  img {
    margin-bottom: -130px;
    margin-top: -135px;
    width: 500px;
  }
  .textwhite {
    color: white;
    margin-top: 21px;
    font-size: 18px;
    font-weight: bold;
  }
  ul {
    text-align: left;
  }

  @media screen and (max-width: 600px) {
    img {
      width: 274px !important;
      margin-bottom: -48px;
      margin-top: auto;
    }
    .form {
      padding: 7%;
      & .img {
        width: 50px !important;
        height: 50px !important;
        margin-bottom: auto !important;
        margin-top: auto !important;
        cursor: pointer !important;
      }
    }
  }
`;
