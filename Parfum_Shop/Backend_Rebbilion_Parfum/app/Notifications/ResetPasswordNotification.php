<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public $token;

    // Constructor to accept the token
    public function __construct($token)
    {
        $this->token = $token;
    }

    // Define the notification channels (email in this case)
    public function via($notifiable)
    {
        return ['mail'];
    }

    // Define the email notification
    public function toMail($notifiable)
    {
        $url = 'http://localhost:3000/reset-password?token=' . $this->token . '&email=' . urlencode($notifiable->email);

        return (new MailMessage)
            ->subject('Reset Password Notification')
            ->line('You are receiving this email because we received a password reset request for your account.')
            ->action('Reset Password', $url)
            ->line('If you did not request a password reset, no further action is required.');
    }
}
