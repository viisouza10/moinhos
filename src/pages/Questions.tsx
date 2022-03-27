import { useNavigation, useRoute } from '@react-navigation/native';
import React, {  useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import { API } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import { createTodo } from '../graphql/mutations';
import { getTodo } from '../graphql/queries';

export type Questions = {
    abdomen: {
        nivel: string,
        option: "sim"| "não",
    },
    backPain: {
        option: "sim"| "não",
    },
    breath: {
        option: "sim"| "não",
    },
    chestPain: {
        description: string,
        nivel: "Baixa" | "Moderada" | "Dor intensa",
        option: "sim"| "não",
    },
    headache: {
        nivel: string,
        option: "sim"| "não",
    },
    pressure: {
        bigger: number,
        minor: number,
    },
    saturation: number,
    temperature: number,
}

type Params  = {
    id: string
}

export const Questions = () =>{
    const navigation = useNavigation();
    const [showPatient,setShowPatient] = useState(false)
    const [valuesPatiente,setValuesPatient] = useState<Questions>({} as Questions)
    const route = useRoute();

    const { id } = route.params as Params

    useEffect(() =>{
        if(id){
            setShowPatient(true)
            getTodoPatient(id)
        }

    },[id])

    const getTodoPatient = async(idPatient:string)=>{
        const todoData:any = await API.graphql({
            query:getTodo,
            authMode:GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            variables:{id:idPatient}
        });
        
        const item = todoData.data.getTodo;

        setValuesPatient({...item.values})

    }

    const setField = (handle:() =>void) =>{
        if(!showPatient){
            handle()
        }
    }


    const saveData = async(values:Questions) => {
        const {scoreValidate , ambulance} = calculate(values)

        const data = {
            values,
            scoreValidate
        }  

        await API.graphql({ query: createTodo, variables: {input: data}, authMode:GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS});

        if(ambulance){
            navigation.navigate("Information",{
                type:"ambulance"
            })
        }else{
            navigation.navigate("Information",{
                type:"hospital"
            }) 
        }
    }

    const calculate = (values:Questions):{scoreValidate:number,ambulance:boolean} =>{
        const {
            pressure,
            saturation,
            temperature,
            headache,
            breath,
            chestPain,
            abdomen
        } = values;

        let scoreValidate = 0;

        // pressao
        if(pressure?.bigger >= 14 && pressure.minor <= 8) scoreValidate += 10

        // saturacao
        if(saturation < 95) scoreValidate += 10
        
        // temperatura
        if(temperature > 38) scoreValidate += 3
        if(temperature > 37.8 && temperature <= 38) scoreValidate += 2
        
        // dor de cabeca
        if(headache?.nivel === "Baixa") scoreValidate += 1
        if(headache?.nivel === "Moderada") scoreValidate += 2
        if(headache?.nivel === "Dor intensa") scoreValidate += 3

        // dificuldade em respirar
        if(breath?.option === "sim")scoreValidate += 2

        // dor no peito
        if(chestPain?.option === "sim")scoreValidate += 2
            
        if(chestPain?.nivel === "Baixa") scoreValidate += 1
        if(chestPain?.nivel === "Moderada") scoreValidate += 2
        if(chestPain?.nivel === "Dor intensa") scoreValidate += 3

        if(chestPain?.description === "Irradiação para o braço esquerdo, mandíbula ou para as costas") scoreValidate += 4
        if(chestPain?.description === "Pressão / aperto por esforço ou estresse emocional") scoreValidate += 3
        if(chestPain?.description === "Dor acompanhada de suores, falta de ar, palidez, vômitos") scoreValidate += 4
        if(chestPain?.description === "Dor de curta duração bem localizada") scoreValidate += 4

        // dor no abdomen
        if(abdomen?.option === "sim") scoreValidate += 2
        if(abdomen?.nivel === "Baixa") scoreValidate += 1
        if(abdomen?.nivel === "Moderada") scoreValidate += 2
        if(abdomen?.nivel === "Dor intensa") scoreValidate += 3
     
        if(abdomen?.option === "sim") scoreValidate += 1

        return {
            scoreValidate,
            ambulance:scoreValidate >= 10
        }
    }

    return (
        <SafeAreaView style={style.container}>
            <Formik
                initialValues={valuesPatiente}
                enableReinitialize
                onSubmit={values => saveData(values)}
            >
            {({ handleChange, handleBlur, handleSubmit,  values,setFieldValue }) => (
                <>
                    <ScrollView style={style.scroll}>
                        <View style={style.content}>
                            <Text style={style.subTitle}>Questionário emergencial</Text> 

                            <View style={style.boxInput}>
                                <Text style={style.textBoxInput}>Caso tenha como medir informe a sua pressão arterial?</Text>
                                <TextInput
                                
                                    keyboardType='number-pad'
                                    placeholder="maior"
                                    onChangeText={handleChange('pressure.bigger')}
                                    onBlur={handleBlur('pressure.bigger')}
                                    value={values?.pressure?.bigger}
                                    editable={!showPatient}
                                    style={style.input}
                                />
                                <TextInput
                                    keyboardType='number-pad'
                                    placeholder="menor"
                                    onChangeText={handleChange('pressure.minor')}
                                    onBlur={handleBlur('pressure.minor')}
                                    style={style.input}
                                    value={values?.pressure?.minor}
                                    editable={!showPatient}
                                />
                            </View>
                            <View style={style.boxInput}>
                                <Text style={style.textBoxInput}>Caso tenha como medir informe a sua saturação</Text>
                                <TextInput
                                    keyboardType='number-pad'
                                    placeholder="saturação %"
                                    onChangeText={handleChange('saturation')}
                                    onBlur={handleBlur('saturation')}
                                    style={style.input}
                                    value={values?.saturation}
                                    editable={!showPatient}
                                />
                            </View>
                            <View style={style.boxInput}>
                                <Text style={style.textBoxInput}>
                                    Caso tenha como medir informe sua temperatura
                                </Text>
                                <TextInput
                                    keyboardType='number-pad'
                                    placeholder="temperatura"
                                    onChangeText={handleChange('temperature')}
                                    onBlur={handleBlur('temperature')}
                                    style={style.input}
                                    value={values?.temperature}
                                    editable={!showPatient}
                                />
                            </View>
                            <View style={style.boxInput}>
                                <Text style={style.textBoxInput}>
                                    Está com dor de cabeça?
                                </Text>
                                <View style={style.yesNoQuestion}>
                                    <TouchableOpacity 
                                        style={style.buttonYesNoQuestion}
                                        onPress={() => setField(() => setFieldValue("headache.option","não"))}
                                        // onPress={() => setField(() =>setFieldValue("headache.option","não"))}
                                    >
                                        <Text style={[style.textYesNoQuestion,values?.headache?.option === "não" && style.active]}>Não</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={style.buttonYesNoQuestion}
                                        onPress={() => setField(() => setFieldValue("headache.option","sim"))}
                                    >
                                        <Text style={[style.textYesNoQuestion,values?.headache?.option === "sim" && style.active]}>Sim</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={style.boxMultOption}>
                                    <TouchableOpacity 
                                        style={style.nivelOption}
                                        onPress={() => setField(() => setFieldValue("headache.nivel","Baixa"))}
                                    >
                                        <Text style={values?.headache?.nivel === "Baixa" && style.active}>Baixa</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={style.nivelOption}
                                        onPress={() => setField(() => setFieldValue("headache.nivel","Moderada"))}
                                    >
                                        <Text  style={values?.headache?.nivel === "Moderada" && style.active}>Moderada</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={style.nivelOption}
                                        onPress={() => setField(() => setFieldValue("headache.nivel","Dor intensa"))}
                                    >
                                        <Text style={values?.headache?.nivel === "Dor intensa" && style.active}>Dor intensa</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={style.boxInput}>
                                <Text style={style.textBoxInput}>
                                    Está com dificuldade de respirar?
                                </Text>
                                <View style={style.yesNoQuestion}>
                                    <TouchableOpacity 
                                        style={style.buttonYesNoQuestion}
                                        onPress={() => setField(() => setFieldValue("breath.option","não"))}
                                    >
                                        <Text style={[style.textYesNoQuestion,values?.breath?.option === "não" && style.active]}>Não</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={style.buttonYesNoQuestion}
                                        onPress={() => setField(() => setFieldValue("breath.option","sim"))}
                                    >
                                        <Text style={[style.textYesNoQuestion,values?.breath?.option === "sim" && style.active]}>Sim</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={style.boxInput}>
                                <Text style={style.textBoxInput}>
                                    Está com dor no peito?
                                </Text>
                                <View style={style.yesNoQuestion}>
                                    <TouchableOpacity 
                                        style={style.buttonYesNoQuestion}
                                        onPress={() => setField(() => setFieldValue("chestPain.option","não"))}
                                    >
                                        <Text style={[style.textYesNoQuestion,values?.chestPain?.option === "não" && style.active]}>Não</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={style.buttonYesNoQuestion}
                                        onPress={() => setField(() => setFieldValue("chestPain.option","sim"))}
                                    >
                                        <Text style={[style.textYesNoQuestion,values?.chestPain?.option === "sim" && style.active]}>Sim</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={style.subtextBoxInput}>
                                    Intensidade?
                                </Text>
                                <View style={style.boxMultOption}>
                                    <TouchableOpacity 
                                        style={style.nivelOption}
                                        onPress={() => setField(() => setFieldValue("chestPain.nivel","Baixa"))}
                                    >
                                        <Text style={values?.chestPain?.nivel === "Baixa" && style.active}>Baixa</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={style.nivelOption}
                                        onPress={() => setField(() => setFieldValue("chestPain.nivel","Moderada"))}
                                    >
                                        <Text  style={values?.chestPain?.nivel === "Moderada" && style.active}>Moderada</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={style.nivelOption}
                                        onPress={() => setField(() => setFieldValue("chestPain.nivel","Dor intensa"))}
                                    >
                                        <Text style={values?.chestPain?.nivel === "Dor intensa" && style.active}>Dor intensa</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={style.subtextBoxInput}>
                                    Característica da dor?
                                </Text>
                                <View style={style.boxMultOption}>
                                    <TouchableOpacity 
                                        style={style.nivelOption}
                                        onPress={() => setField(() => setFieldValue("chestPain.description","Irradiação para o braço esquerdo, mandíbula ou para as costas"))}
                                    >
                                        <Text style={values?.chestPain?.description === "Irradiação para o braço esquerdo, mandíbula ou para as costas" && style.active}>
                                            Irradiação para o braço esquerdo, mandíbula ou para as costas
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={style.nivelOption}
                                        onPress={() => setField(() => setFieldValue("chestPain.description","Pressão / aperto por esforço ou estresse emocional"))}
                                    >
                                        <Text style={values?.chestPain?.description === "Pressão / aperto por esforço ou estresse emocional" && style.active}>
                                            Pressão / aperto por esforço ou estresse emocional
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={style.nivelOption}
                                        onPress={() => setField(() => setFieldValue("chestPain.description","Irradiação para o braço esquerdo, mandíbula ou para as costas Pressão / aperto por esforço ou estresse emocional Dor acompanhada de suores, falta de ar, palidez, vômitos Dor de curta duração bem localizada"))}
                                    >
                                        <Text style={values?.chestPain?.description === "Irradiação para o braço esquerdo, mandíbula ou para as costas Pressão / aperto por esforço ou estresse emocional Dor acompanhada de suores, falta de ar, palidez, vômitos Dor de curta duração bem localizada" && style.active}>
                                            Irradiação para o braço esquerdo, mandíbula ou para as costas
                                            Pressão / aperto por esforço ou estresse emocional
                                            Dor acompanhada de suores, falta de ar, palidez, vômitos
                                            Dor de curta duração bem localizada
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={style.boxInput}>
                                <Text style={style.textBoxInput}>
                                    Está com dor abdominal?
                                </Text>
                                <View style={style.yesNoQuestion}>
                                    <TouchableOpacity 
                                        style={style.buttonYesNoQuestion}
                                        onPress={() => setField(() => setFieldValue("abdomen.option","não"))}
                                    >
                                        <Text style={[style.textYesNoQuestion,values?.abdomen?.option === "não" && style.active]}>Não</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={style.buttonYesNoQuestion}
                                        onPress={() => setField(() => setFieldValue("abdomen.option","sim"))}
                                    >
                                        <Text style={[style.textYesNoQuestion,values?.abdomen?.option === "sim" && style.active]}>Sim</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={style.boxMultOption}>
                                <TouchableOpacity 
                                        style={style.nivelOption}
                                        onPress={() => setField(() => setFieldValue("abdomen.nivel","Baixa"))}
                                    >
                                        <Text style={values?.abdomen?.nivel === "Baixa" && style.active}>Baixa</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={style.nivelOption}
                                        onPress={() => setField(() => setFieldValue("abdomen.nivel","Moderada"))}
                                    >
                                        <Text style={values?.abdomen?.nivel === "Moderada" && style.active}>Moderada</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={style.nivelOption}
                                        onPress={() => setField(() => setFieldValue("abdomen.nivel","Dor intensa"))}
                                    >
                                        <Text style={values?.abdomen?.nivel === "Dor intensa" && style.active}>Dor intensa</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={style.boxInput}>
                                <Text style={style.textBoxInput}>
                                    Está com dor nas costas?
                                </Text>
                                <View style={style.yesNoQuestion}>
                                <TouchableOpacity 
                                        style={style.buttonYesNoQuestion}
                                        onPress={() => setField(() => setFieldValue("backPain.option","não"))}
                                    >
                                        <Text style={[style.textYesNoQuestion,values?.backPain?.option === "não" && style.active]}>Não</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={style.buttonYesNoQuestion}
                                        onPress={() => setField(() => setFieldValue("backPain.option","sim"))}
                                    >
                                        <Text style={[style.textYesNoQuestion,values?.backPain?.option === "sim" && style.active]}>Sim</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    {!showPatient && (
                        <View style={style.footer}>
                            <TouchableOpacity 
                                style={style.button} 
                                activeOpacity={0.7}
                                onPress={() => handleSubmit()}
                                >
                                <Text style={style.textButton}>iniciar atendimento</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            )}
            </Formik>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        width: "100%",
    },
    scroll:{
        flex:1,
        width: "100%",
    },
    content:{
        flex:1,
        alignItems: 'center',
        width: "100%",
        paddingBottom:50
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
    logo:{
        width: "40%",
        height:"20%",
        marginTop:"15%"
    },
    text:{
        color:colors.text_primary_light,
        fontSize:24,
        textAlign:"center",
        marginTop:30,
        width:Dimensions.get('window').width * 0.7,
    },
    infoImage:{
        width: "30%"
    },
    button:{
        fontSize:32,
        backgroundColor:colors.primary,
        width:Dimensions.get('window').width * 0.8,       
        paddingVertical:10,
        marginTop:"15%"
    },
    textButton:{
        color:colors.text_white,
        textAlign: "center",
        fontFamily:fonts.heading,
        fontSize:18,
    },
    footer:{
        position:"absolute",
        bottom:"1%"
    },
    boxInput:{
        borderStyle:"dashed",
        borderColor:colors.primary,
        borderWidth:1,
        padding:10,
        width:"90%",
        alignItems:"center",
        marginBottom:20
    },
    textBoxInput:{
        color:colors.text_primary_light,
        textAlign:"center",
        fontSize:25,
        width:"90%"
    },
    subtextBoxInput:{
        color:colors.text_primary_light,
        textAlign:"center",
        fontSize:18,
        marginVertical:20,
        width:"90%"
    },
    input:{
        borderWidth:2,
        borderColor:colors.primary,
        color:colors.heading,
        width:Dimensions.get('window').width * 0.8,
        fontSize:18,
        marginTop:20,
        padding: 10,
    },
    yesNoQuestion:{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around"
    },
    buttonYesNoQuestion:{
        padding:20,
    },
    textYesNoQuestion:{
        color:colors.text_primary_light,
        fontSize:18
    },
    boxMultOption:{
        width:"100%",
    },
    nivelOption:{
        width:"100%",
        borderStyle:"solid",
        borderColor:colors.gray,
        borderWidth:1,
        color:colors.blue,
        padding:5,
        marginVertical:5,
    },
    active:{
        color:colors.primary,
        fontWeight:"bold"
    }
})