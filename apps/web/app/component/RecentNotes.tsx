import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Clock3, FileText } from 'lucide-react'
import React from 'react'
import { useRootStore } from '../store/rootStore'
import Link from 'next/link'
import { MY_WORKSPACE } from '@/lib/routeConstants'

const RecentNotes = () => {
    const { notes } = useRootStore();

    return (<div className="w-screen md:w-full">
        <h2 className="text-md pl-2 md:pl-0 font-semibold flex items-center gap-2 mb-2">
            <Clock3 size={16} /> Recently visited
        </h2>
        <Carousel className="w-[95%] md:w-full">
            <CarouselContent className="-ml-1">
                {notes.map((note) => (
                    <CarouselItem key={note.id} className="hover:scale-105 cursor-pointer pl-2 h-36 basis-1/2 md:basis-1/4 lg:basis-1/6">
                        <Link href={`/${MY_WORKSPACE}/${note.id}`}>
                            <Card className='h-full'>
                                <CardContent>
                                    <FileText className="mb-2" size={20} />
                                    <p className="text-sm font-medium leading-snug line-clamp-3">{note.title}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious className='hidden md:block' />
            <CarouselNext className='hidden md:block' />
        </Carousel>
    </div>)
}

export default RecentNotes