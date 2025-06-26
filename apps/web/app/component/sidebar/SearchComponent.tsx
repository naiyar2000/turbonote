import LoadingPage from '@/app/loading'
import { useRootStore } from '@/app/store/rootStore'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { searchNotes } from '@/lib/api/notes'
import { MY_WORKSPACE } from '@/lib/routeConstants'
import { cn } from '@/lib/utils'
import debounce from 'debounce'
import { FileWarning, Loader2Icon, Search } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

type NoteSnippet = {
    id: string;
    title: string;
    tags: string[];
    snippet: string;
};

const SearchComponent = () => {

    const { user } = useRootStore();

    const [searchResult, setSearchResult] = useState<NoteSnippet[]>([]);
    const [loading, setLoading] = useState(false);

    const debouncedSearch = debounce(async (searchText: string, userId: string) => {
        const res = await searchNotes(searchText, userId);
        setSearchResult(res)
        setLoading(false);
    }, 3000);

    const _searchNote = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value
        setLoading(true);
        if (searchText && user?.id) {
            debouncedSearch(searchText, user.id);
        } else {
            setLoading(false);
            console.log("✅ No search text detected, skipping search.");
        }
    };

    return (
        <Dialog onOpenChange={() => setSearchResult([])}>
            <form>
                <DialogTrigger asChild>
                    <div
                        className={cn(
                            "group flex items-center w-full gap-2 px-2 py-1 rounded-md hover:bg-muted/80 cursor-pointer transition-colors",
                            {
                                // "bg-muted/100": pathNoteId === item.id.toString() || (item.type === "folder" && open),
                            }
                        )}>
                        <Search className="h-5 w-5" />
                        Search
                    </div>
                </DialogTrigger>
                <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
                    <DialogTitle></DialogTitle>
                    <DialogHeader>
                        <div className="relative">
                            <Input onChange={_searchNote} type="text" placeholder='Search for any content...' className="pl-8" />
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </DialogHeader>
                    <div className="border rounded-lg h-72 overflow-auto">
                        {loading ?
                            <div
                                className={cn(
                                    'flex flex-col items-center justify-center h-full w-full m-auto',
                                    'bg-background text-foreground transition-colors'
                                )}
                            >
                                <Loader2Icon className="h-10 w-10 animate-spin text-primary" />
                                <p className="mt-4 text-lg text-muted-foreground">{"Searching..."}</p>
                            </div>
                            :
                            <SearchListItems searchResult={searchResult} />
                        }
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default SearchComponent


const HTMLRenderer = ({ html, className = "" }: { html: string, className?: string }) => (
    <div
        className={`prose ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
    />
);

const SearchListItems = ({ searchResult }: { searchResult: NoteSnippet[] }) => {
    if (searchResult.length === 0) {
        return <div
            className={'flex flex-col items-center justify-center h-full w-full m-auto'}
        >
            <FileWarning className="h-10 w-10 text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">{"No content found"}</p>
        </div>
    }

    return searchResult.map((note) => (
        <Link key={note.id} href={`/${MY_WORKSPACE}/${note.id}`}
            className="flex flex-col w-full border-b-1 items-start hover:bg-muted gap-4 p-2"
        >
            <p className='text-md font-bold'>{note.title}</p>
            <HTMLRenderer html={note.snippet} className='pl-4 text-sm text-start' />
        </Link>
    ))
}