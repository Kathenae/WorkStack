import { Link } from "@inertiajs/react"
import { useState } from "react"
import Card from "./Card"
import Conditional from "./Conditional"
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

export default function JobProposals({ proposals }) {

    const [isPendingListOpen, setIsPendingListOpen] = useState(true)
    const [isDeclinedListOpen, setIsDeclinedListOpen] = useState(false)

    return <>
        <Card className='mb-4 py-0'>
            <Card.Content>
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Pending Proposals ({proposals.filter(p => p.status == 'pending').length}/{proposals.length})</h2>
                    <button onClick={e => setIsPendingListOpen(!isPendingListOpen)}><i className={"fi fi-rs-angle-" + (isPendingListOpen ? "down" : "right")}></i></button>
                </div>
                <Conditional showIf={isPendingListOpen}>
                    <div className="mt-8">
                        {proposals.filter(p => p.status == 'pending').map(proposal => (
                            <div key={proposal.id} className="flex justify-between py-4 border-t">
                                <h4 className='font-semibold text-indigo-500'><Link className='hover:underline' href={route('proposals.show', proposal.id)} >{proposal.user.name} - {proposal.user.email}</Link></h4>
                                <small>{dayjs(proposal.created_at).fromNow()}</small>
                            </div>
                        ))}
                    </div>
                </Conditional>
            </Card.Content>
        </Card>
        <Card className='mb-0 py-0'>
            <Card.Content>
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Declined Proposals ({proposals.filter(p => p.status == 'declined').length}/{proposals.length})</h2>
                    <button onClick={e => setIsDeclinedListOpen(!isDeclinedListOpen)}><i className={"fi fi-rs-angle-" + (isDeclinedListOpen ? "down" : "right")}></i></button>
                </div>
                <Conditional showIf={isDeclinedListOpen}>
                    <div className="mt-8">
                        {proposals.filter(p => p.status == 'declined').map(proposal => (
                            <div key={proposal.id} className="flex justify-between py-4 border-t">
                                <h4 className='font-semibold text-indigo-500'><Link className='hover:underline' href={route('proposals.show', proposal.id)} >{proposal.user.name} - {proposal.user.email}</Link></h4>
                                <small>{dayjs(proposal.created_at).fromNow()}</small>
                            </div>
                        ))}
                    </div>
                </Conditional>
            </Card.Content>
        </Card>
    </>
}
