import { useRootStore } from '@/app/store/rootStore';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Loader2Icon } from 'lucide-react';
import React from 'react'


const PromptDialog = () => {

    const { isOpen, onDialogClose, title, message, onConfirm, actionButtonText, actionButtonVariant, actionLoader } = useRootStore();

    return (
        <Dialog open={isOpen}>
            <DialogContent showCloseButton={false}>
                <DialogTitle className="text-lg font-medium">{title}</DialogTitle>
                <DialogDescription className="mt-2">{message}</DialogDescription>
                <DialogFooter>
                    <Button onClick={onDialogClose} variant="outline">Cancel</Button>
                    <Button className='min-w-[100px]' onClick={onConfirm} variant={actionButtonVariant ?? "destructive"}>
                        {actionLoader ? <Loader2Icon className="animate-spin" /> : actionButtonText ?? "Confirm"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default PromptDialog