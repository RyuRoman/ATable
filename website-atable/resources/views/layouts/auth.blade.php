<!DOCTYPE html>
<html>
<head>
    <title>A'Table - Authentification</title>

    @include('includes.globals_head')

    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
	<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

	<!------ Hmmmm faut changer ça ------>
	<?php
//	header('Access-Control-Allow-Origin: http://api-local.atable.io');
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
		header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	?>

	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
  <script src="sweetalert2.all.min.js"></script>
<!-- Optional: include a polyfill for ES6 Promises for IE11 -->
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill"></script>

	<!-- <script src="/js/auth.js"></script> -->
  <script src="/js/register.js"></script>
  <script src="/js/login.js"></script>

	<!----------------------------------->
	@include('includes.auth.head')
</head>
<body>
<div class="container">
	<div class="d-flex justify-content-center h-100">

		@if (request()->is('/') || request()->is('login'))
			<div class="card">
		@elseif (request()->is('register'))
			<div class="card_register">
		@elseif (request()->is('recover'))
			<div class="card_recover">
        @elseif (request()->is('choice'))
            <div class="card_choice">
        @elseif (!strcmp(request()->route()->getName(), "reset"))
            <div class="card_reset">
		@endif


			@include('includes.auth.header')
			@yield('content')
			@include('includes.auth.footer')
		</div>

	</div>
</div>
</body>
</html>
