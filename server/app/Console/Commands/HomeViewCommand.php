<?php

namespace App\Console\Commands;

use App\Models\User;
use Hash;
use Http;
use Illuminate\Console\Command;

class HomeViewCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'api:home-view-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $response = Http::get('http://127.0.0.1:8000/api/products');

        if ($response->successful()) {
            $this->info('API called successfully');
        } else {
            $this->error('Failed to call API');
        }
    }
}
