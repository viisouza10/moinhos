import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import { useNavigation } from '@react-navigation/native';
import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import {  Dimensions, SafeAreaView, StyleSheet, Text, View,Image } from 'react-native';
import { listTodos } from '../graphql/queries';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Questions } from './Questions';
import hospitalImg from '../assets/hospital.png'
import ambulanceImg from '../assets/ambulance.png'
import { TouchableOpacity } from 'react-native-gesture-handler';

type TodoList ={
    id:string
    cpf:string
    scoreValidate:number
}
export const ListPatients = () =>{
    const navigation = useNavigation();
    const [todos,setTodos] = useState<TodoList[]>()

    const getTodos = async() =>{
        const todoData:any = await API.graphql({
            query:listTodos,
            authMode:GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });

        const items = todoData.data.listTodos.items;
        setTodos(items)
    }

    const handleOpenQuestions = (id:string) =>{
        console.log(id)
        navigation.navigate("Questions",{
            id
        })
    }

    const validateIsAmbulance = (score:number) :any =>{
        if(score >= 10){
            return <Image
                source={ambulanceImg} 
                style={style.image}
                resizeMode="contain"
            />
        }else{
            return <Image
                source={hospitalImg} 
                style={style.image}
                resizeMode="contain"
            /> 
        }
    }

    useEffect(() =>{
        getTodos()
    },[])

    return (
        <SafeAreaView style={style.container}>
            <View style={style.content}>
                <Text style={style.subTitle}>Chamados</Text> 

                {todos?.map((todo:TodoList) =>(
                    <TouchableOpacity onPress={() =>handleOpenQuestions(todo.id)} key={todo.id}>
                        <View style={style.item}>
                            <Text style={style.textItem}>{todo.cpf}</Text>
                            {validateIsAmbulance(todo.scoreValidate)}
                        </View>
                    </TouchableOpacity>
                ))}

            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        width: "100%"
        
    },
    content:{
        flex:1,
        alignItems: 'center',
        width: "100%",
    },
    subTitle:{
        fontSize:25,
        color:colors.primary,
        fontFamily: fonts.heading,
        marginVertical:60,
        textAlign:"center",
        textTransform:"capitalize",
        width:Dimensions.get('window').width * 0.6,
        
    },
    item:{
        width:"100%",
        height:60,
        flexDirection:"row",
        alignItems:"center",
        borderStyle:"dashed",
        borderColor:colors.primary,
        borderWidth:.5,
        paddingHorizontal:20
    },
    textItem:{
        width:"90%",
        fontSize:20,
        color:colors.primary
    },
    image:{
        width:"10%"
    }
})