
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
    isAuthenticated: boolean;
    user: string | null;
    isLoading: boolean;
    team: any[];
    addToTeam: (pokemon: any) => boolean;
    signIn: (username: string) => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [team, setTeam] = useState<any[]>([]);

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@Auth:user')

            if(storageUser) {
                setUser(storageUser);
                setIsAuthenticated(true);
            }
            setIsLoading(false);
        }
        loadStorageData();
    }, []);
    
    async function signIn(username: string) {
        setUser(username);
        setIsAuthenticated(true);
        await AsyncStorage.setItem('@Auth:user', username);
    }

    async function signOut() {
        setUser(null);
        setIsAuthenticated(false);
        await AsyncStorage.removeItem('@Auth:user');
    }

    function addToTeam(pokemon: any) {
        if (team.length >= 6) {
            return false;
        }

        setTeam((prevTeam) => [...prevTeam, pokemon]);
        return true;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut, isLoading, team, addToTeam }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);