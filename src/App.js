import React from "react";
import ReportForm from "./components/ReportForm";
import { motion } from "framer-motion";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <ReportForm />
      </motion.div>
    </div>
  );
}
