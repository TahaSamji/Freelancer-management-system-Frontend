// import { useAppSelector } from "@/app/Redux/store";
// import axios from "axios";

// export function DeleteAdmin() {
//     const token = useAppSelector((state) => state.reducers.userReducer.token);

//     const deleteAdmin = () => {
//         try {
//             const res = await axios({
//                 url:"http://localhost:5600/user/deleteAdmin",
//                 method:"post",
//                 headers: {Authorization: `Bearer ${token}`}
//             })

//         } catch (error) {
//             console.error(error);
//         }
//     }
//     return (

//     );
// }