<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    protected $addHttpCookie = true;

    /**
     * Determine if the request has a URI that should pass through CSRF verification.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function shouldPassThrough($request)
    {
        // Add routes or endpoints that should bypass CSRF verification
        return $this->inExceptArray($request) ||
               $this->tokensMatch($request);
    }

    /**
     * Determine if the request has a URI that should pass through CSRF verification.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function tokensMatch($request)
    {
        // Obtener el token CSRF del encabezado personalizado
        $token = $request->header('X-CSRF-TOKEN');
        // Obtener el token CSRF almacenado en la sesión
        $sessionToken = $request->session()->token();

        // Comparar los tokens CSRF
        return hash_equals($sessionToken, $token);
    }
}