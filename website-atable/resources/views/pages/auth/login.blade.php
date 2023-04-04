@extends('layouts.auth')
@section('content')
<div class="card-body">
  <form>
    <div class="input-group form-group">
      <div class="input-group-prepend">
        <span class="input-group-text"><i class="fas fa-user"></i></span>
      </div>
      <input type="text" id="auth-mail" class="form-control" placeholder="Adresse mail">
    </div>

    <div class="input-group form-group">
      <div class="input-group-prepend">
        <span class="input-group-text"><i class="fas fa-key"></i></span>
      </div>
      <input type="password" id="auth-password" class="form-control" placeholder="Mot de Passe">
    </div>

      <div class="form-group text-center">
          <input type="button" id="login-btn" value="Se connecter" class="btn login_btn">
      </div>
  </form>
</div>
@stop
