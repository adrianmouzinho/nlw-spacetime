import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'

dayjs.locale(ptBr)

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-16">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="-ml-16 flex items-center gap-2 text-sm leading-relaxed before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>

            <Image
              src={memory.coverUrl}
              alt=""
              width={592}
              height={280}
              className="h-[280px] w-[592px] rounded-lg object-cover"
            />

            <p className="text-lg leading-relaxed">{memory.excerpt}</p>

            <Link
              href={`memories/${memory.id}`}
              className="flex w-fit items-center gap-1.5 text-sm leading-relaxed text-gray-200 hover:text-gray-100"
            >
              Ver mais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
