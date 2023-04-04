@extends('layouts.auth')
@section('content')
<div class="card-body">
  <form>
    <div class="row align-items-center">
      <div class="col-6 align-self-center">
        <div class="input-group form-group">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-user"></i></span>
          </div>
          <input id="auth-last-name" type="text" class="form-control" placeholder="Nom">
        </div>
      </div>

      <div class="col-6 align-self-center">
        <div class="input-group form-group">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-user"></i></span>
          </div>
          <input id="auth-first-name" type="text" class="form-control" placeholder="Prénom">
        </div>
      </div>
    </div>

    <div class="input-group form-group">
      <div class="input-group-prepend">
        <span class="input-group-text"><i class="fas fa-envelope"></i></span>
      </div>
      <input id="auth-mail" type="text" class="form-control" placeholder="Adresse mail">
    </div>

    <div class="input-group form-group">
      <div class="input-group-prepend">
        <span class="input-group-text"><i class="fas fa-key"></i></span>
      </div>
      <input  id="auth-password" type="password" class="form-control" placeholder="Mot de passe">
    </div>

    <div class="input-group form-group">
      <div class="input-group-prepend">
        <span class="input-group-text"><i class="fas fa-key"></i></span>
      </div>
      <input id="auth-password-confirmation" type="password" class="form-control" placeholder="Confirmer le mot de passe">
    </div>

    <div class="form-group text-center">
      <input id="register-btn" value="S'enregistrer" class="btn login_btn">
    </div>
</form>
</div>
@stop
