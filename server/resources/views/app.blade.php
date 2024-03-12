
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <!-- Otros encabezados -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    Blade
    <!-- Contenido del cuerpo -->
    <script>
        window.csrfToken = "{{ csrf_token() }}"; // Se asigna el token CSRF a una variable global en JavaScript
    </script>
</body>
