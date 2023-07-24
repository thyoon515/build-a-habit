// import {  useContext } from 'react';
// import { CurrentUserContext } from '../../context/CurrentUser';

// const Home = ({ userLoggedIn }) => {

//   const [currentUser] = useContext(CurrentUserContext)

//   const currentUserExist = () => {
//     return (
//       <div align='center' >
//         <h1>Welcome, {currentUser.first_name}!</h1>
//       </div>
//     )
//   }

//   const noCurrentUser = () => {
//     return (
//       <div align='center' >
//         <h1>Please, Log In to Start!</h1>
//       </div>
//     )
//   }

//   return (
//     <div>
//       { userLoggedIn ? currentUserExist() : noCurrentUser() }
//     </div>
//   )
// }

// export default Home;