import React, { useEffect } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'

import { api } from '../src/lib/api'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/c3e872f7fdc2778caf71',
}

export default function App() {
  const router = useRouter()

  const [request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: 'c3e872f7fdc2778caf71',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )

  async function handleGithubOAuthCode(code: string) {
    try {
      const response = await api.post('/register', {
        code,
      })

      const { token } = response.data

      await SecureStore.setItemAsync('token', token)

      router.push('/memories')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // console.log(
    //   makeRedirectUri({
    //     scheme: 'nlwspacetime',
    //   }),
    // )

    if (response?.type === 'success') {
      const { code } = response.params

      handleGithubOAuthCode(code)
    }
    // eslint-disable-next-line
  }, [response])

  return (
    <View className="relative flex-1 items-center justify-center px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-zinc-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-3"
          onPress={() => signInWithGithub()}
          disabled={!request}
        >
          <Text className="font-alt text-sm uppercase leading-none text-black">
            Começar a cadastrar
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>

      <StatusBar style="light" translucent />
    </View>
  )
}
