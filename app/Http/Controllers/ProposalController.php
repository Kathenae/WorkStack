<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Proposal;
use App\Notifications\NewProposal;
use App\Notifications\ProposalAccepted;
use App\Notifications\ProposalRejected;
use Illuminate\Auth\Middleware\Authorize;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProposalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Job $job)
    {
        $this->authorize('viewAny', [Proposal::class, $job]);

        return Inertia::render('Proposals/Index', [
            'proposals' => $job->proposals->load(['user:id,email,name']),
            'job' => $job->load('skills')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Job $job)
    {
        $this->authorize('create', [Proposal::class, $job]);

        return Inertia::render('Proposals/Create', [
            'job' => $job->load('skills:id,name')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Job $job)
    {
        $this->authorize('create', [Proposal::class, $job]);

        $validatedData = $request->validate([
            'coverLetter' => 'required|string|min:50|max:4000',
            'price' => 'required|numeric|max:5000',
        ]);

        $user = $request->user();
        $proposal = Proposal::create([
            ...$validatedData,
            'job_id' => $job->id,
            'user_id' => $user->id
        ]);

        // Notify the job owner
        $job->user->notify(new NewProposal($proposal));

        return redirect()->route('proposals.show', [
            'proposal' => $proposal->id,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Http\Response
     */
    public function show(Proposal $proposal)
    {
        $this->authorize('view', $proposal);

        return Inertia::render('Proposals/Show', [
            'proposal' => $proposal->load('user'),
            'job' => $proposal->job->load(['skills', 'user'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Http\Response
     */
    public function edit(Proposal $proposal)
    {
        $this->authorize('update', $proposal);

        return Inertia::render('Proposals/Edit', [
            'proposal' => $proposal->load('user'),
            'job' => $proposal->job->load(['skills', 'user'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Proposal $proposal)
    {
        $this->authorize('update', $proposal);

        $validatedData = $request->validate([
            'coverLetter' => 'required|string|min:50|max:4000',
            'price' => 'required|numeric|max:5000',
        ]);

        $proposal->update($validatedData);

        return redirect()->route('proposals.show', ['proposal' => $proposal->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Http\Response
     */
    public function destroy(Proposal $proposal)
    {
        $this->authorize('delete', $proposal);
        $proposal->delete();

        return redirect()->route('jobs.show', $proposal->job->id);
    }

    public function accept(Proposal $proposal)
    {
        $this->decide($proposal, 'accepted');
        return redirect()->route('proposals.show', ['proposal' => $proposal->id]);
    }

    public function decline(Proposal $proposal)
    {
        $this->decide($proposal, 'rejected');
        return redirect()->route('proposals.show', ['proposal' => $proposal->id]);
    }

    private function decide(Proposal $proposal, string $decision)
    {
        $proposal->status = $decision;
        $proposal->save();


        $notification = null;
        if ($decision == 'accepted') {
            $notification = new ProposalAccepted($proposal);
            // TODO: Create job contract?
        } else if ($decision == 'rejected') {
            $notification = new ProposalRejected($proposal);
        }

        if ($notification != null) {
            // Send the notification with a 2 minutes delay
            $deliveryTime = now()->addMinutes(2);
            $notification->delay($deliveryTime);
            $proposal->user->notify($notification);
        }
    }
}
