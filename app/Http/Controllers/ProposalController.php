<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Proposal;
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
            'proposals' => $job->proposals()->with(),
            'job' => $job
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
}
