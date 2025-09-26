<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="{{ asset('logo.png') }}" />
    <title>{{ config('app.name') }}</title>
    @viteReactRefresh
    @vite('resources/js/main.jsx')
</head>
<body>
    <div id="app"></div>
</body>
</html>
