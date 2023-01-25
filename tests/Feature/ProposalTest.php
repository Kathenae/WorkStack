<?php

namespace Tests\Feature;

use App\Models\Job;
use App\Models\Proposal;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProposalTest extends TestCase
{

    use RefreshDatabase;

    /**
     * @group ProposalFeatures
     */
    public function test_can_display_proposals_list_page()
    {
        $user = User::factory()->create();
        $job = Job::factory()->create(['user_id' => $user->id]);
        $response = $this->actingAs($user)->get(route('jobs.proposals.index', $job->id));
        $response->assertOk();
    }

    /**
     * @group ProposalFeatures
     */
    public function test_can_display_proposal_detail_page()
    {
        $user = User::factory()->create();
        $job = Job::factory()->create(['user_id' => $user->id]);

        $user = User::factory()->create();
        $proposal = Proposal::create([
            'coverLetter' => 'This is a new proposal',
            'price' => 30,
            'status' => 'accepted',
            'user_id' => $user->id,
            'job_id' => $job->id,
        ]);

        $response = $this->actingAs($user)->get(route('proposals.show', $proposal->id));
        $response->assertOk();
    }

    /**
     * @group ProposalFeatures
     */
    public function test_can_display_proposal_create_page()
    {
        // User creates a job
        $user = User::factory()->create();
        $job = Job::factory()->create(['user_id' => $user->id]);

        // Another tries to view the form for applying to that job
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get(route('jobs.proposals.create', $job->id));

        // Check if they were able to do so
        $response->assertOk();
    }

    /**
     * @group ProposalFeatures
     */
    public function test_can_create_a_proposal()
    {
        // A user creates a job
        $user = User::factory()->create();
        $job = Job::factory()->create(['user_id' => $user->id]);

        // Another user tries to submit a form for applying to that job
        $user = User::factory()->create();
        $proposalData = [
            'coverLetter' => 'This is a new proposal detailed enoguh to pass the 50 character limit required for the coverLetter',
            'price' => 50,
        ];
        $response = $this->actingAs($user)->post(route('jobs.proposals.store', $job->id), $proposalData);

        // Check if a proposal was created successfully and there was a redirect response
        $this->assertDatabaseCount('proposals', 1);
        $this->assertContains($response->status(), [301, 302, 303]);
    }

    /**
     * @group ProposalFeatures
     */
    public function test_can_display_proposal_edit_page()
    {
        // A user creates a job
        $user = User::factory()->create();
        $job = Job::factory()->create(['user_id' => $user->id]);

        // A user tries to view their proposals edit page
        $user = User::factory()->create();
        $proposal = Proposal::create([
            'coverLetter' => 'This is a new proposal',
            'price' => 30,
            'status' => 'accepted',
            'user_id' => $user->id,
            'job_id' => $job->id,
        ]);
        $response = $this->actingAs($user)->get(route('proposals.edit', $proposal->id));
        $response->assertOk();
    }

    /**
     * @group ProposalFeatures
     */
    public function test_can_update_a_proposal()
    {
        // A user creates a job
        $user = User::factory()->create();
        $job = Job::factory()->create(['user_id' => $user->id]);

        // Another user creates a proposal on that job
        $user = User::factory()->create();
        $proposal = Proposal::create([
            'coverLetter' => 'This is a new proposal',
            'price' => 30,
            'status' => 'accepted',
            'user_id' => $user->id,
            'job_id' => $job->id,
        ]);

        // And then tries to update it
        $proposalData = [
            'coverLetter' => 'This is a the updated proposal letter detailed enough to pass the 50 character limit on the cover letter',
            'price' => 500
        ];
        $response = $this->actingAs($user)->patch(route('proposals.update', $job->id), $proposalData);

        // Check if it was updated and that the user was redirected to the proposal detail page after that
        $this->assertDatabaseHas('proposals', ['id' => $proposal->id, ...$proposalData]);
        $response->assertRedirect(route('proposals.show', ['proposal' => $proposal->id]));
    }

    /**
     * @group ProposalFeatures
     */
    public function test_can_delete_proposal()
    {
        // A user creates a job
        $user = User::factory()->create();
        $job = Job::factory()->create(['user_id' => $user->id]);

        // Another user creates a proposal on that job
        $user = User::factory()->create();
        $proposal = Proposal::create([
            'coverLetter' => 'This is a new proposal with',
            'price' => 30,
            'status' => 'accepted',
            'user_id' => $user->id,
            'job_id' => $job->id,
        ]);

        // And then decides to delete that proposal
        $response = $this->actingAs($user)->delete(route('proposals.destroy', $proposal->id));

        // Check if the proposal was in fact deleted
        $this->assertDatabaseEmpty('proposals');
    }
}
