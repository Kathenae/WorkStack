<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', Job::class);

        return Inertia::render('Jobs/Index', [
            'jobs' => Job::with(['skills', 'user:id,name,email'])->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('create', Job::class);

        return Inertia::render('Jobs/Create', [
            'skills' => Skill::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', Job::class);

        $validatedJob = $request->validate([
            'title' => 'required|string|min:5|max:255',
            'description' => 'required|string|min:5|max:5000',
            'min_price' => 'required|numeric|min:0',
            'max_price' => 'required|numeric|min:0|gt:min_price',
            'type' => 'required|in:hourly,fixed_price',
            'skills' => 'required|array|exists:skills,id',
        ]);

        $skills = $request->input('skills');

        $validatedJob['status'] = 'open';
        $job = $request->user()->jobs()->make($validatedJob);
        $job->save();
        $job->skills()->sync($skills);
        return redirect(route('jobs.index'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function show(Job $job)
    {
        $this->authorize('view', $job);

        return Inertia::render('Jobs/Show', [
            'job' => $job->load(['skills', 'user:id,name,email']),
            'userProposal' => request()->user()->getProposal($job)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function edit(Job $job)
    {
        $this->authorize('update', $job);

        return Inertia::render('Jobs/Edit', [
            'job' => $job->load('skills'),
            'skills' => Skill::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Job $job)
    {
        $this->authorize('update', $job);

        $validatedData = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string|max:5000',
            'min_price' => 'numeric|min:0',
            'max_price' => 'numeric|min:0|gt:min_price',
            'type' => 'in:hourly,fixed_price',
            'skills' => 'array|exists:skills,id',
        ]);

        $skills = $request->input('skills');

        $job->update($validatedData);
        $job->skills()->sync($skills);
        return redirect(route('jobs.index'), 303);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function destroy(Job $job)
    {
        $this->authorize('delete', $job);

        $job->delete();
        return redirect(route('jobs.index'), 303);
    }
}
