//
// import React from "react";
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import "./switch.css";
//
// // import switchButton from '../../img/switch.png';
//
// const OnOff = ({ isOn, ...rest }) => {
//
//     // initialize the customClassName according to the
//     // state of the "isOn" using ternary operator
//     const customClassName =
//         `toggleSwitch ${isOn ? "on" : "off"}`;
//
//     // initialize the src according to the
//     // state of the "isOn" using ternary operator
//     const src = isOn
//         ?
//         "Toggle 1st Image link"
//         :
//         "Toggle 2nd Image link";
//
//     return (
//         <motion.div animate className=
//             {customClassName} {...rest}>
//             <motion.div animate>
//                 {/*<img src={switchButton}  alt="switch"/>*/}
//             </motion.div>
//         </motion.div>
//     );
// };
//
// export default OnOff;
//
// const App = () => {
//     // useState hook is used to manage the state of
//     // "isOn" that is used to change the className,
//     // background-color and img src accordingly
//     const [isOn, setIsOn] = useState(false);
//
//     useEffect(() => {
//         // background-color changes every time "isOn"
//         // changes using JavaScript DOM methods
//         document.body.style.backgroundColor =
//             isOn ? "#1c1c1c" : "#ffffff";
//     }, [isOn]);
//
//     return <OnOff isOn={isOn} onClick={() =>
//         setIsOn(!isOn)} />;
// };
//
//
