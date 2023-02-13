<?php

namespace App\Notifications;

use App\Models\Proposal;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProposalRejected extends Notification implements ShouldQueue
{
    use Queueable;

    private Proposal $proposal;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Proposal $proposal)
    {
        $this->proposal = $proposal;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $jobTitle = $this->proposal->job->title;
        $userName = $this->proposal->user->name;
        $url = route('proposals.show', $this->proposal->id);

        return (new MailMessage)
            ->subject("Proposal Rejected - $jobTitle")
            ->greeting("Hey $userName")
            ->line("We regret to inform you that your proposal for '$jobTitle' on WorkStack has not been accepted. Thank you for using our platform and for your interest in this opportunity!")
            ->line('')
            ->line("While this outcome is not what you were hoping for, we encourage you to keep using WorkStack to find other job opportunities that match your skills and experience.")
            ->action('View Proposal', $url)
            ->line('')
            ->line('If you have any questions, please feel free to reach out to our support team.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
