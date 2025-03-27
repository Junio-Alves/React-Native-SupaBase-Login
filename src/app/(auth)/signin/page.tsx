import colors from "@/constants/colors";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { supabase } from "@/src/lib/supabase";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSignIn() {
        setLoading(true);
        const {data,error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        if(error){
            Alert.alert("Erro",error.message);
            setLoading(false);
            return;
        }
        setLoading(false);
        router.replace("/(panel)/profile/page");

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logoText}>
                    Dev<Text style={{ color: colors.green }}>App</Text>
                </Text>
                <Text style={styles.slogan}>
                    O futuro da programação
                </Text>
            </View>
            <View style={styles.form}>
                <View style={styles.label}>
                    <Text>Email</Text>
                    <TextInput
                        placeholder="Digite seu E-mail..."
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input} />
                </View>
                <View style={styles.label}>
                    <Text>Password</Text>
                    <TextInput
                        placeholder="Digite sua Senha..."
                        style={styles.input}
                        value={password}
                        onChangeText={setpassword}
                        secureTextEntry />
                </View>
                <Pressable style={styles.button} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>
                        {loading ? "Carregando..." : "Acessar"}
                    </Text>
                </Pressable>
                <Link href="/(auth)/signup/page" style={styles.link}>
                    <Text>Ainda não possui conta? Cadastre-se</Text>
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 34,
        backgroundColor: colors.zinc,
    },
    header: {
        paddingLeft: 14,
        paddingRight: 14,
    },
    logoText: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.white,
    },
    slogan: {
        fontSize: 40,
        color: colors.white,
        marginBottom: 34,
    },
    form: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 34,
        paddingLeft: 14,
        paddingRight: 14,
    },
    label: {
        color: colors.zinc,
        marginBottom: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
        paddingTop: 14,
        paddingBottom: 14,
    },
    button: {
        backgroundColor: colors.green,
        paddingTop: 14,
        paddingBottom: 14,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        borderRadius: 8,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",
    },
    link: {
        marginTop: 16,
        textAlign: "center",
    }
});