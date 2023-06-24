import { useState } from 'react'
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import { Link } from 'expo-router'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets()

  const [isPublic, setIsPublic] = useState(false)

  return (
    <View
      className="mb-12 mt-10 flex-1 space-y-10 px-8"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="flex-row items-center justify-between">
        <NLWLogo />

        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#FFF" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="flex-1 justify-between">
        <ScrollView className="space-y-4">
          <View className="flex-row items-center gap-2">
            <Switch
              value={isPublic}
              onValueChange={setIsPublic}
              trackColor={{ false: '#121215', true: '#04d361' }}
              thumbColor="#eaeaea"
            />

            <Text className="font-body text-base text-gray-200">
              Tornar memória pública
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className="h-32 flex-row items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-500 bg-black/10"
          >
            <Icon name="image" size={16} color="#9e9ea0" />

            <Text className="font-body text-sm text-gray-200">
              Adicionar foto ou vídeo de capa
            </Text>
          </TouchableOpacity>

          <TextInput
            multiline
            textAlignVertical="top"
            cursorColor="#FFF"
            className="p-0 font-body text-base text-gray-100"
            placeholderTextColor="#56565a"
            placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          />
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.7}
          className="items-center self-end rounded-full bg-green-500 px-5 py-3"
        >
          <Text className="font-alt text-sm uppercase leading-none text-black">
            Salvar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
