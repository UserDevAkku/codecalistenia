<template>
    <div @click="googleLogin" ref="googleLoginBtn"></div>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    IsModeApplied: Boolean
})

const api = useNuxtApp().$axios;

let googleLoginBtn = null;

const clientId = "253289529011-81uelo3t2iouvkh8v9l0feco2ids599i.apps.googleusercontent.com";

let tokenClient = null;

onMounted(() => { 
        if (window.google) {
            // Initialize Google One Tap client first!
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: getUserData,
                color_scheme: "light",
                auto_select: false,
            });


            // Render the Google Sign-In button after initialization
            if (googleLoginBtn) {
                window.google.accounts.id.renderButton(
                    googleLoginBtn,
                    {
                        type: "standard",
                        size: "medium",
                    }
                );
            }

            // Initialize OAuth2 token client (optional, if you want to fetch access tokens)
            tokenClient = window.google.accounts.oauth2.initTokenClient({
                client_id: clientId,
                scope: "openid email profile",
                callback: (tokenResponse) => {
                    localStorage.setItem('accessToken', tokenResponse.access_token);
                    console.log(tokenResponse.access_token);
                    getUserData();
                }
            });
        } else {
            console.error("Google API is not loaded");
        }
});

// Trigger login flow (example)
const googleLogin = () => {
        if (tokenClient) {
            window.google.accounts.id.prompt();
            tokenClient.requestAccessToken();
        } else {
            console.log("Google API is not loaded yet");
        }
    };


    const getUserData = async () => {
        try {
            const { data } = await api.get('https://www.googleapis.com/oauth2/v1/userinfo');
            console.log(data);
        } catch (err) {
            console.error('Error fetching user info:', err);
        }
    };
</script>
