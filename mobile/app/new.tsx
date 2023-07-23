import { useState } from 'react'
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import { Link, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { api } from '../src/lib/api'

export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets()

  const router = useRouter()

  const [content, setContent] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  async function openImagePicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      })

      if (result.assets[0]) {
        setPreview(result.assets[0].uri)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function handleCreateMemory() {
    const token = await SecureStore.getItemAsync('token')

    let coverUrl = ''

    if (preview) {
      const uploadFormData = new FormData()

      uploadFormData.append('file', {
        uri: preview,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any)

      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      coverUrl = uploadResponse.data.fileUrl
    }

    await api.post(
      '/memories',
      {
        coverUrl,
        content,
        isPublic,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/memories')
  }

  return (
    <View
      className="mb-5 mt-4 flex-1 space-y-10 px-8"
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
            onPress={openImagePicker}
            className="h-32 flex-row items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-500 bg-black/10"
          >
            {preview ? (
              <Image
                source={{ uri: preview }}
                alt=""
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <>
                <Icon name="image" size={16} color="#9e9ea0" />

                <Text className="font-body text-sm text-gray-200">
                  Adicionar foto ou vídeo de capa
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TextInput
            multiline
            value={content}
            onChangeText={setContent}
            textAlignVertical="top"
            cursorColor="#FFF"
            className="p-0 font-body text-base text-gray-100"
            placeholderTextColor="#727275"
            placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          />
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleCreateMemory}
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
