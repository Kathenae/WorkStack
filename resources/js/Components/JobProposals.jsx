import { Link } from "@inertiajs/react"
import { useState } from "react"
import Card from "./Card"
import Conditional from "./Conditional"
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

const ProposalList = ({ proposals, title = "Proposals", isExpanded = false, className = 'my-0 mb-4 py-0' }) => {
    const [isOpen, setIsOpen] = useState(isExpanded)

    return (
        <Card className={className}>
            <Card.Content>
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>
                    <button onClick={e => setIsOpen(!isOpen)}><i className={"fi fi-rs-angle-" + (isOpen ? "down" : "right")}></i></button>
                </div>
                <Conditional showIf={isOpen}>
                    <div className="mt-8">
                        {proposals.map(proposal => (
                            <div key={proposal.id} className="flex justify-between py-4 border-t">
                                <h4 className='font-semibold text-indigo-500'><Link className='hover:underline' href={route('proposals.show', proposal.id)} >{proposal.user.name} - {proposal.user.email}</Link></h4>
                                <small>{dayjs(proposal.created_at).fromNow()}</small>
                            </div>
                        ))}
                    </div>
                </Conditional>
            </Card.Content>
        </Card>
    )
}

export default function JobProposals({ proposals }) {

    function getProposals(status) {
        return proposals.filter(p => p.status == status);
    }

    return <>
        <Conditional showIf={getProposals('accepted').length != 0}>
            <ProposalList
                title={`Accepted Proposals (${getProposals('accepted').length}/${proposals.length})`}
                proposals={getProposals('accepted')}
                isExpanded={true}
            />
        </Conditional>

        <Conditional showIf={getProposals('pending').length != 0}>
            <ProposalList
                title={`Pending Proposals (${getProposals('pending').length}/${proposals.length})`}
                proposals={getProposals('pending')}
            />
        </Conditional>

        <Conditional showIf={getProposals('rejected').length != 0}>
            <ProposalList
                title={`Rejected Proposals (${getProposals('rejected').length}/${proposals.length})`}
                proposals={getProposals('rejected')}
            />
        </Conditional>
    </>
}
