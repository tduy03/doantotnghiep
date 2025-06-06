<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderConfirm extends Mailable
{
    use Queueable, SerializesModels;

    public $order;


    public function __construct(Order $order)
    {

        $this->order = $order;
    }


    public function build()
    {
        return $this->subject('Xác nhận đơn hàng')
            ->view('email.mailDonHang')
            ->with('order', $this->order);
    }
}