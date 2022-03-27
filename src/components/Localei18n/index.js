import { NativeModules, Platform } from 'react-native'
import { I18n } from '@aws-amplify/core'

let langRegionLocale = 'en_US'

// If we have an Android phone
if (Platform.OS === 'android') {
  langRegionLocale = NativeModules.I18nManager.localeIdentifier || ''
} else if (Platform.OS === 'ios') {
  langRegionLocale = NativeModules.SettingsManager.settings.AppleLocale || ''
}

const authScreenLabels = {
  pt: {
    'Sign Up': 'Cadastrar',
    'Forgot Password': 'Esqueceu a senha?',
    'Sign In Account': 'Cadastrar',
    'Enter your email': 'Digite seu email',
    'Enter your password': 'Digite sua senha',
    'Password': 'Senha',
    'Sign In': 'Entrar',
    'Please Sign In / Sign Up': 'Por favor entrar/cadastrar',
    'Sign in to your account': 'Entrar com sua conta',
    'Create a new account': 'Criar uma nova conta',
    'Confirm a Code': 'Confirmar código',
    'Confirm Sign Up': 'Confirmar cadastro',
    'Resend code': 'Reenviar código',
    'Back to Sign In': 'Voltar para login',
    'Confirm': 'Confirmar',
    'Confirmation Code': 'Confirmar Código',
    'Sign Out': 'Sair',
    'Phone Number':'Telefone',
    'Enter your confirmation code':'Confirmar Código',
    "Enter your username" : "Digite seu CPF",
    "Hello":"Olá",
    "Username":"CPF",
    "Incorrect username or password":"CPF ou senha incorretos"
  }
}

I18n.setLanguage("pt")
I18n.putVocabularies(authScreenLabels)

const Localei18n = () => null

export { Localei18n }