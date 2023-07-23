import { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import { Link, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { api } from '../src/lib/api'

dayjs.locale(ptBr)

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()

  const router = useRouter()

  const [memories, setMemories] = useState<Memory[]>([])

  async function handleSignOut() {
    await SecureStore.deleteItemAsync('token')

    router.push('/')
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync('token')

    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemories(response.data)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className="mb-5 mt-4 flex-1 space-y-6"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="flex-row items-center justify-between px-8">
        <NLWLogo />

        <View className="flex-row items-center gap-3">
          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            onPress={handleSignOut}
            className="h-10 flex-row items-center justify-center rounded-full bg-zinc-600 px-4"
          >
            <Icon name="log-out" size={16} color="#FFF" />

            <Text className="ml-1 text-center font-body text-base leading-relaxed text-white">
              Sair
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="space-y-10">
        {memories &&
          memories.map((memory) => {
            return (
              <View key={memory.id} className="space-y-2">
                <View className="flex-row items-center gap-2">
                  <View className="h-px w-5 bg-gray-50" />
                  <Text className="font-body text-xs leading-relaxed text-gray-100">
                    {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
                  </Text>
                </View>

                <View className="space-y-4 px-6">
                  <Image
                    source={{ uri: memory.coverUrl }}
                    alt=""
                    className="h-40 w-full rounded-lg object-cover"
                  />

                  <Text className="font-body text-base leading-relaxed text-gray-100">
                    {memory.excerpt}
                  </Text>

                  <Link href="/memories/id" asChild>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      className="flex-row items-center gap-2"
                    >
                      <Text className="font-body text-sm leading-relaxed text-gray-200">
                        Ler mais
                      </Text>
                      <Icon name="arrow-right" size={16} color="#9e9ea0" />
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
            )
          })}
      </View>
    </ScrollView>
  )
}
