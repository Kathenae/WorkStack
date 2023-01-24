<?php

namespace App\Policies;

use App\Models\Job;
use App\Models\Proposal;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProposalPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any proposal on the given job.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user, Job $proposal)
    {
        $isJobOwner = $user->id  == $proposal->job->user->id;
        return $isJobOwner;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Proposal $proposal)
    {
        $isProposalOwner = $user->id == $proposal->user->id;
        $isJobOwner = $user->id  == $proposal->job->user->id;
        return $isProposalOwner || $isJobOwner;
    }

    /**
     * Determine whether the user can create proposal on the given job.
     *
     * @param  \App\Models\User  $user
     * @param \App\Models\Job $job
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user, Job $job)
    {
        $hasNotAlreadyProposed = $job->proposals()->where('user_id', '=', $user->id)->first() == null;
        $isNotJobOwner = $job->user->id != $user->id;
        return $isNotJobOwner && $hasNotAlreadyProposed;
    }

    /**
     * Determine whether the user can update the proposal.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Proposal $proposal)
    {
        $isProposalOwner = $proposal->user->id == $user->id;
        return $isProposalOwner;
    }

    /**
     * Determine whether the user can delete the proposal.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Proposal $proposal)
    {
        $isProposalOwner = $proposal->user->id == $user->id;
        return $isProposalOwner;
    }

    /**
     * Determine whether the user can restore the proposal.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Proposal $proposal)
    {
        $isProposalOwner = $proposal->user->id == $user->id;
        return $isProposalOwner;
    }

    /**
     * Determine whether the user can permanently delete the proposal.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Proposal $proposal)
    {
        $isProposalOwner = $proposal->user->id == $user->id;
        return $isProposalOwner;
    }
}
