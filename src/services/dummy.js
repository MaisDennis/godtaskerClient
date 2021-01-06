// { index // View goes to last message
//   ? (
//     <div className={`message-line-div ${m.sender}`} >
//       <span
//         className={`message-span ${m.sender}`}
//         ref={lastMessageRef}
//       >{m.message}</span>
//       <RiArrowDownSLine
//         onClick={() => handleMessageDropMenu(index)}
//         style={{cursor:'pointer'}}
//       />
//     </div>
//   ) : (
//     <div className={`message-line-div ${m.sender}`}>
//       <span
//         className={`message-span ${m.sender}`}
//       >{m.message}</span>
//       <RiArrowDownSLine/>
//     </div>
//   )
// }
