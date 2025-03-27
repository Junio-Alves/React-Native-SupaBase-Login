import { useAuth } from "@/src/contexts/AuthContext";
import { supabase } from "@/src/lib/supabase";
import { View,Text,StyleSheet, Button, Alert } from "react-native";

export default function Profile(){
    const {setAuth,user} = useAuth();
    async function handleSignout(){
        const {error} = await supabase.auth.signOut();
        if(error){
            Alert.alert("Erro",error.message);
            return;
        }
        setAuth(null);


    }
    return (
        <View style={styles.container}>
            <Text>Pagina Perfil</Text>
            <Text>{user?.email}</Text>
            <Text>{user?.id}</Text>
            <Button title="Deslogar" onPress={handleSignout}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});