import { createContext,useContext,useState,useEffect } from "react";

import API from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {
    const[user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);
    const login = async (email, password) => {
        try {
            const {data} = await API.post("/user/login",{
                email, password
            }
          );

          localStorage.setItem("token" , data.token);
          setUser(data.user);

          return{
            success:true
          };
        } 
        catch (error) {
            return{
                success: false,
                message: error.response?.data?.message
            };
            
        }
        
    };

    const register = async (name,email,password) => {
        try {
            const{data} = await API.post("/user/register",{
                name,email,password
            }
          );

            localStorage.setItem("token",data.token);

            setUser(data.user);

            return{
                success: true
            };
        } 
        catch (error) {
            return{
                success: false,
                message: error.response?.data?.message
            }; 
        }  
    };
    const logout = () => {
        localStorage.removeItem("token");

        setUser(null);
    };

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if(!token){
                setLoading(false);
                return;
            }

            const { data } = await API.get("/user/profile", {
             headers: {
             Authorization: `Bearer ${token}`,
            },
     });
            setUser(data.user);
        }
        catch (error) {
            localStorage.removeItem("token");
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    },[]);

    return(
        <AuthContext.Provider
            value = {{
                user,login,register,logout,loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
        
};

export const useAuth = () => useContext(AuthContext);
