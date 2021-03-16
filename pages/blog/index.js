import React, { useEffect, useContext } from "react";
import { MainContext } from "../_api/resources/MainContext";
import { useRouter } from "next/router";
const Blog = React.memo(() => {
  const router = useRouter();
  const { userInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      router.push("/login");
    }
  }, [userInfo]);
  return <>Blog</>;
});
export default Blog;
