import { USER_ACTION_TYPE } from "../types/userType";

export const setUser = (user) => {
  return {
    type: USER_ACTION_TYPE.SET_USER,
    payload: user,
  };
};
// export const setUser = (user) => {
//   const option = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(user),
//   };

//   return async (dispatch) => {
//     fetch("http://localhost:5000/users/login", option)
//       .then((response) => response.json())
//       .then((data) => {
//         dispatch({
//           type: USER_ACTION_TYPE.SET_USER,
//           payload: user,
//         });
//       })
//       .catch((err) => console.log(err));
//   };
// };
