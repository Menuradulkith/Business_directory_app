import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import Icon from 'react-native-vector-icons/FontAwesome';



WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {

        useWarmUpBrowser();

        const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

        const onPress = React.useCallback(async () => {
          try {
            const { createdSessionId, signIn, signUp, setActive } =
              await startOAuthFlow();
      
            if (createdSessionId) {
              setActive({ session: createdSessionId });
            } else {
              // Use signIn or signUp for next steps such as MFA
            }
          } catch (err) {
            console.error("OAuth error", err);
          }
        }, []);

        return (
        <View style={{
            backgroundColor: 'rgba(140, 120, 240, 1)',
            height: '100%'
        }}>
            <View style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 100
            }}>
                <Image source={require('./../assets/images/login.png')} 
                    style={{
                        width: 220,
                        height: 450,
                        borderRadius: 20,
                        borderWidth: 6,
                        borderColor: '#000'
                    }}
                />
            </View>

            <View style={{backgroundColor: 'rgba(140, 120, 240, 1)',padding: 20, alignItems: 'center',marginTop:-20}} >  
                <Text style={{color: '#fff', fontSize: 25, fontFamily: 'outfit-bold', textAlign: 'center'}}>Youth Ultimate
                    <Text style={{color: '#000000'}}>Community Business Directory</Text>App
                </Text> 
                <Text style={{fontSize: 16, fontFamily: 'outfit', textAlign: 'center', marginVertical: 20, color: '#000000'}}>Find your favourite business near your and post your own business to your community</Text>

            </View>
            
            <TouchableOpacity style={{backgroundColor:'rgba(185, 80, 235, 1)',padding: 16,borderRadius:99,borderWidth: 1,width:'60%',alignItems:'center',marginLeft:80}} onPress={onPress}> 
                    <Text style={{color:'#fff',fontFamily:'outfit',fontSize:18}} >Get Started  <Icon name='arrow-right' size={15} color='#fff'/></Text>
            </TouchableOpacity>
        </View>
    );
    
}