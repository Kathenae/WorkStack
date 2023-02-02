<?php

namespace App\Notifications;

use App\Models\Proposal;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewProposal extends Notification
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
            ->subject("New Proposal - $jobTitle")
            ->greeting("Hey $userName")
            ->line("We would like to inform you that a new proposal has been submitted for your \"$jobTitle\" job. We wanted to bring this to your attention in case you would like to review and consider this candidate for the position.")
            ->line('')
            ->line("To view the proposal, simply click the button below:")
            ->action('View Proposal', $url)
            ->line('Thank you for using WorkStack to find the best candidate for your open position.');
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
