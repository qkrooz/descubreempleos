import React from "react";
import Link from "next/link";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
// components
import Header from "./_api/components/Header";
import Footer from "./_api/components/Footer";
// screens
const Index = React.memo(() => {
  return (
    <Router>
      <Header />
      <span>Esto es Index</span>
      <Link href="/login">Ir a iniciar sesion</Link>
      <Link href="/blog">Ir al Blog</Link>
      <Link href="/descubre">Ir al portal descubre</Link>
      <Switch></Switch>
      <Footer />
    </Router>
  );
});
export default Index;
