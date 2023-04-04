@extends('layouts.auth')
@section('content')
  <div class="card-body">
    <form>
        <div class="input-group form-group" hidden>
            <input type="password" id="reset-token" class="form-control" value="{{$reset_token}}">
        </div>

        <div class="input-group form-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input type="password" id="reset-password" class="form-control" placeholder="Nouveau mot de passe">
        </div>

        <div class="input-group form-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input type="password" id="reset-password-confirmation" class="form-control" placeholder="Confirmation mot de passe">
        </div>

        <div class="form-group text-center">
            <input type="button" id="reset-btn" value="Confirmer" class="btn login_btn">
        </div>
    </form>
  </div>
@stop
