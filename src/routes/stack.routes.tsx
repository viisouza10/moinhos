import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import colors from '../styles/colors';
import { Questions } from '../pages/Questions';
import { Information } from '../pages/Information';
import { Authentication } from '../pages/Auth';
import { ListPatients } from '../pages/ListPatients';
import AsyncStorage from '@react-native-async-storage/async-storage';


const stackRoutes = createStackNavigator();

const AppRoutes:React.FC = () => {

    return (
        <stackRoutes.Navigator headerMode="none" screenOptions={{
            cardStyle:{
                backgroundColor:colors.white
            }
            
        }} initialRouteName="Auth">
            <stackRoutes.Screen 
                name="Auth"
                component={Authentication}
            />

            <stackRoutes.Screen 
                name="Information"
                component={Information}
            />

            <stackRoutes.Screen 
                name="ListPatients"
                component={ListPatients}
            />
        
            <stackRoutes.Screen 
                name="Questions"
                component={Questions}
            />

        </stackRoutes.Navigator>
    )
}

export default AppRoutes;