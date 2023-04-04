<?php

namespace App\Http\Controllers;

use App\Models\Command;
use App\Models\Cooker;
use App\Models\Customer;
use App\Models\User;

class BackoController extends Controller
{

    public function login() {
        return view('login');
    }

    public function main() {
        $returned_data = [
            "nb_users" => User::count(),
            "nb_cookers" => Cooker::count(),
            "nb_customers" => Customer::count(),
            "nb_commands" => Command::count(),
            "avg_price_commands" => round(floatval(Command::count() ? Command::avg("price") : 0), 2) . "€"
        ];
        return view('main', $returned_data);
    }
    public function users() {
        $returned_data = [
            "users" => User::get()
        ];
        return view('users', $returned_data);
    }
}
