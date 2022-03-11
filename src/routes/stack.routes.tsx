import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import colors from '../styles/colors';
import { Welcome } from '../pages/Welcome';
import { Questions } from '../pages/Questions';
import { Information } from '../pages/Information';


const stackRoutes = createStackNavigator();

const AppRoutes:React.FC = () => (
    <stackRoutes.Navigator headerMode="none" screenOptions={{
        cardStyle:{
            backgroundColor:colors.white
        }
    }}>
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

export default AppRoutes;