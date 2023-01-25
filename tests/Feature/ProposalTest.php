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
    public function test_cannot_view_another_users_job_proposals_list_page()
    {
        // A user creates a job
        $user = User::factory()->create();
        $job = Job::factory()->create(['user_id' => $user->id]);

        // Another one tries to view that jobs proposals page
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get(route('jobs.proposals.index', $job->id));
        $response->assertForbidden();
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
    public function test_cannot_view_another_users_proposal()
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

        // And another one tries to view that proposal
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get(route('proposals.show', $proposal->id));
        $response->assertForbidden();
    }

    /**
     * @group ProposalFeatures
     */
    public function test_cannot_display_non_existent_proposal_detail_page()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get(route('proposals.show', 99999));
        $response->assertNotFound();
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
    public function test_cannot_access_proposal_creation_form_for_own_jobs()
    {
        // User creates a job
        $user = User::factory()->create();
        $job = Job::factory()->create(['user_id' => $user->id]);

        // Then tries to view the form for applying to their own job
        $response = $this->actingAs($user)->get(route('jobs.proposals.create', $job->id));

        // Check if they were able to do so
        $response->assertForbidden();
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
    public function test_cannot_create_proposal_with_invalid_data()
    {
        // A user creates a job
        $user = User::factory()->create();
        $job = Job::factory()->create(['user_id' => $user->id]);

        // Another user tries to submit a form for applying to that job with invalid data
        $user = User::factory()->create();
        $proposalData = [
            'coverLetter' => '', // invalid data, cover letter is empty
            'price' => 'very expensive' // price is a string,
        ];
        $response = $this->actingAs($user)->post(route('jobs.proposals.store', $job->id), $proposalData);

        // Check if a proposal was created successfully and there was a redirect response
        $this->assertDatabaseMissing('proposals', ['user_id' => $user->id, 'job_id' => $job->id]);
        $response->assertSessionHasErrors(['coverLetter', 'price']);
    }

    /**
     * @group ProposalFeatures
     */
    public function test_cannot_create_proposal_for_own_job()
    {
        // A user creates a job
        $user = User::factory()->create();
        $job = Job::factory()->create(['user_id' => $user->id]);

        // Then the same user user tries to submit a form for applying to their own job
        $response = $this->actingAs($user)->post(route('jobs.proposals.store', $job->id), [
            'coverLetter' => 'This is a new proposal detailed enough to pass the 50 character limit required for the coverLetter',
            'price' => 50,
        ]);

        // Check if not allowed
        $response->assertForbidden();
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
    public function test_cannot_edit_other_users_proposal()
    {
        // A user creates a job
        $user = User::factory()->create();
        $job = Job::factory()->create(['user_id' => $user->id]);

        // A user creates a proposal
        $proposal = Proposal::create([
            'coverLetter' => 'This is a new proposal',
            'price' => 30,
            'status' => 'accepted',
            'user_id' => $user->id,
            'job_id' => $job->id,
        ]);

        // Another user tries to edit the proposal
        $otherUser = User::factory()->create();
        $response = $this->actingAs($otherUser)->get(route('proposals.edit', $proposal->id));

        // Check if the user was denied access
        $response->assertForbidden();
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
    public function test_cannot_update_another_users_proposal()
    {
        // A user creates a job
        $user = User::factory()->create();
        $job = Job::factory()->create(['user_id' => $user->id]);

        // A user creates a proposal
        $proposal = Proposal::create([
            'coverLetter' => 'This is a new proposal',
            'price' => 30,
            'status' => 'accepted',
            'user_id' => $user->id,
            'job_id' => $job->id,
        ]);

        // And another then tries to update it
        $user = User::factory()->create();
        $response = $this->actingAs($user)->patch(route('proposals.update', $job->id), [
            'coverLetter' => 'This is a the updated proposal letter detailed enough to pass the 50 character limit on the cover letter',
            'price' => 500
        ]);

        // Check if the user was denied access
        $response->assertForbidden();
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

    /**
     * @group ProposalFeatures
     */
    public function test_cannot_delete_another_users_proposal()
    {
        // A user creates a job
        $user = User::factory()->create();
        $job = Job::factory()->create(['user_id' => $user->id]);

        // User creates a proposal on that job
        $proposal = Proposal::create([
            'coverLetter' => 'This is a new proposal with',
            'price' => 30,
            'status' => 'accepted',
            'user_id' => $user->id,
            'job_id' => $job->id,
        ]);

        // Another user tries to delete that proposal
        $user = User::factory()->create();
        $response = $this->actingAs($user)->delete(route('proposals.destroy', $proposal->id));

        // Check if the proposal was in fact deleted
        $response->assertForbidden();
    }
}
