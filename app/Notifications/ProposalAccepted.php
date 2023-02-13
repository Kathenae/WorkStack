<?php

namespace App\Notifications;

use App\Models\Proposal;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProposalAccepted extends Notification implements ShouldQueue
{
    use Queueable;

    protected Proposal $proposal;
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
            ->subject('Your proposal has been accepted!')
            ->greeting("Hey $userName")
            ->line("Your proposal for '$jobTitle' on WorkStack has been accepted. Congratulations!")
            ->line('')
            ->line("The hiring party who reviewed your proposal will be in touch with you shortly to discuss next steps. We would like to thank you for choosing WorkStack and for your hard work in submitting your proposal.")
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
