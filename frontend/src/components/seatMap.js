// import "./seatMap.css";
// import React, { useState } from "react";
// import { Table, ToggleButton } from "react-bootstrap";

// const SeatMap = () => {
//   const [bookedSeats, setBookedSeats] = useState("");
//   const [bookedSeatcnt, setBookedSeatcnt] = useState(0);

//   const selectedSeat = (selSeat, status) => {
//     if ("N" === status) {
//       let result = bookedSeats.indexOf(selSeat);
//       if (result >= 0) {
//         document.getElementById(selSeat).style.backgroundColor =
//           "rgb(43, 255, 0)";
//         if (result > 0) {
//           setBookedSeats(bookedSeats.replace("," + selSeat, ""));
//         } else {
//           setBookedSeats(bookedSeats.replace(selSeat + ",", ""));
//         }
//         if (parseInt(bookedSeatcnt) - 1 <= 0) {
//           setBookedSeats("");
//         }

//         setBookedSeatcnt(bookedSeatcnt - 1);
//       } else {
//         document.getElementById(selSeat).style.backgroundColor =
//           "rgb(184, 134, 11)";

//         if (bookedSeatcnt > 0) {
//           setBookedSeats(bookedSeats + "," + selSeat);
//         } else {
//           setBookedSeats(selSeat);
//         }

//         setBookedSeatcnt(bookedSeatcnt + 1);
//       }
//     }
//   };

//   function content() {
//     let content = [];
//     var cnt = 0;
//     var total_seats = 8;
//     var seat_names = [
//       "A1|Y",
//       "A2|N",
//       "A3|N",
//       "A4|N",
//       "A5|Y",
//       "A6|N",
//       "A7|N",
//       "A8|N",
//     ];
//     var rows = total_seats / 10;
//     for (var j = 0; j < rows; j++) {
//       for (var i = 0; i < 10; i++) {
//         cnt++;
//         if (cnt > total_seats) {
//           break;
//         }
//         var text = seat_names[cnt - 1];
//         const valArray = text.split("|");
//         let sn = valArray[0];
//         let status = valArray[1];
//         let clr = "rgb(43, 255, 0)";
//         if ("Y" === status) {
//           clr = "red";
//           // console.log(text);
//           // console.log(clr);
//         }
//         content.push(
//           <td>
//             <div
//               class="seat"
//               id={sn}
//               key={sn}
//               style={{ background: clr, width: "30px", height: "40px" }}
//               onClick={() => selectedSeat(sn, status)}
//             >
//               {sn}
//             </div>
//           </td>
//         );
//       }
//       content.push(<tr />);
//     }
//     return content;
//   }
//   return (
//     <div>
//       {/* <Table borderless> */}
//       <Table striped bordered hover size="sm">
//         {/* <Table borderless size="sm"> */}
//         <thead>
//           <tr>
//             <th colSpan={10}>
//               <center>Available Seats</center>
//             </th>
//           </tr>
//         </thead>

//         {content()}
//       </Table>
//       Selected booking slots are: {bookedSeats} | Total Seats : {bookedSeatcnt}
//     </div>
//   );
// };

// export default SeatMap;
