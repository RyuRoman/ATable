<?php

namespace App\Http\Middleware;


use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class AuthKey
{
    /**
     * @param $request
     * @param Closure $next
     * @return mixed|void
     */
    public function handle(Request $request, Closure $next)
    {
        $token = request()->bearerToken();
        if (!$token)
            return response()->json(['message' => "Unknown user"], 401);
        $user = User::where('remember_token', $token)->first();
        return $user != null ? $next($request) : response()->json(['message' => "Unknown user"], 401);
    }
}
