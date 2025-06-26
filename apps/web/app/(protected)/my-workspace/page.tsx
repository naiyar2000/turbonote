"use client";
import RecentNotes from '@/app/component/RecentNotes';
import LoadingPage from '@/app/loading';
import { useRootStore } from '@/app/store/rootStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getGreeting } from '@/lib/utils';
import { ArrowUp, AtSign, Calendar, ChevronDown, FileText, Globe, Paperclip } from 'lucide-react';
import React from 'react'


const recentPages = [
    "AWS DevOps (full process)",
    "Metaverse 2D",
    "Tasks",
    "Title",
    "Journal",
    "Journal-1",
    "Journal-2",
];

const events = [
    {
        date: "Today",
        day: "Jun 23",
        title: "Team standup",
        time: "9 AM · Office",
        action: "Join and take notes",
    },
    {
        date: "Tue",
        day: "Jun 24",
        title: "Project check-in",
        time: "10 AM · Office",
    },
];

const MyWorkspacePage = () => {

    const { loading, user } = useRootStore();


    if (loading) {
        return (
            <LoadingPage title='Loading Workspace...' />
        )
    }



    return (
        <div className="pt-10 md:p-10 max-w-5xl mx-auto flex flex-col gap-4">

            {/* Header */}
            <div className="hidden md:block">

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <span className="text-black font-semibold text-lg italic">T</span>
                    </div>
                    <h1 className="text-2xl font-medium">{`${getGreeting()}, ${user?.name}`}</h1>
                </div>

                <div className="bg-secondary rounded-lg border">
                    <div className="p-4">
                        <textarea
                            placeholder="Ask or find anything from your workspace..."
                            className="w-full bg-transparent text-gray-400 placeholder-gray-500 resize-none outline-none text-lg leading-relaxed"
                            rows={3}
                        />
                    </div>

                    {/* Bottom Controls */}
                    <div className="flex items-center justify-between px-4 pb-4">
                        {/* Left Side - Mode Buttons */}
                        <div className="flex items-center gap-1">
                            <Button>
                                Ask
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                            <Button variant={"ghost"}>
                                Research
                            </Button>
                            <Button variant={"ghost"}>
                                Build
                            </Button>
                        </div>

                        {/* Right Side - Action Buttons */}
                        <div className="flex items-center gap-2">
                            <Button variant={"ghost"}>
                                <Globe />
                            </Button>
                            <Button variant={"ghost"}>
                                <FileText />
                                All sources
                                <ChevronDown />
                            </Button>
                            <Button variant={"ghost"}>
                                <Paperclip />
                            </Button>
                            <Button variant={"ghost"}>
                                <AtSign />
                            </Button>
                            <Button>
                                <ArrowUp />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>


            <RecentNotes />

            <div className='px-2'>
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <Calendar size={16} /> Upcoming events
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-muted/40 border-muted-foreground/10">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-3">
                                <Calendar size={28} className="mt-1" />
                                <div>
                                    <p className="font-semibold text-base">
                                        Connect AI Meeting Notes with your Calendar events
                                    </p>
                                    <p className="text-muted-foreground text-sm mt-1">
                                        Join calls, transcribe audio, and summarize meetings all in Notion.
                                    </p>
                                    <a
                                        href="#"
                                        className="text-blue-500 text-sm font-medium mt-2 inline-block"
                                    >
                                        Connect Turbonote Calendar
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-muted/40 border-muted-foreground/10">
                        <CardContent className="p-6">
                            {events.map((event, i) => (
                                <div key={i} className="flex justify-between items-start mb-4 last:mb-0">
                                    <div className="text-muted-foreground text-sm w-20">
                                        <p>{event.date}</p>
                                        <p className="text-xs">{event.day}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">{event.title}</p>
                                        <p className="text-sm text-muted-foreground mb-1">{event.time}</p>
                                        {event.action && (
                                            <button className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                                                {event.action}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default MyWorkspacePage