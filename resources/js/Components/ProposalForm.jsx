import InputError from "./InputError";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function ProposalForm({ form, onSubmit, onCancel }) {
    const { data, setData, processing, errors } = form;

    return (
        <form onSubmit={onSubmit}>
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">Write Your Proposal</h2>
            <div className='my-6'>
                <InputLabel forInput="">Price (USD)</InputLabel>
                <input
                    type='text'
                    value={data.price}
                    onChange={e => setData('price', e.target.value)}
                    placeholder="Set your price"
                    className='block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                />
                <InputError message={errors.price} className="mt-2" />
            </div>

            <div className='my-6'>
                <InputLabel forInput="">Cover Letter</InputLabel>
                <textarea
                    value={data.coverLetter}
                    onChange={e => setData('coverLetter', e.target.value)}
                    placeholder="Write your cover letter"
                    className='block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                    rows="10"
                >
                </textarea>
                <InputError message={errors.coverLetter} className="mt-2" />
            </div>

            <div className="space-x-2">
                <PrimaryButton className='mt-4' processing={processing}>Send</PrimaryButton>
                <SecondaryButton className='mt-4' onClick={onCancel} processing={processing}>Cancel</SecondaryButton>
            </div>
        </form>
    )
}
