import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import colors from '../styles/colors';
import { Welcome } from '../pages/Welcome';
import { Questions } from '../pages/Questions';
import { Information } from '../pages/Information';
import AsyncStorage from '@react-native-async-storage/async-storage';


const stackRoutes = createStackNavigator();

const validateInitialRoute = async ():Promise<string> =>{
    const token = await AsyncStorage.getItem("@moinhos:jwt")
    if(token){
        return "Information"
    }
    return "Information"
}



const AppRoutes:React.FC = () => {

    return (
        <stackRoutes.Navigator headerMode="none" screenOptions={{
            cardStyle:{
                backgroundColor:colors.white
            }
            
        }} initialRouteName="Questions">
            <stackRoutes.Screen 
                name="Welcome"
                component={Welcome}
                />
            <stackRoutes.Screen 
                name="Information"
                component={Information}
                />
        
            <stackRoutes.Screen 
                name="Questions"
                component={Questions}
                />

        </stackRoutes.Navigator>
    )
}

export default AppRoutes;