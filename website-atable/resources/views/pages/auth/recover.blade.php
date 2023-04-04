@extends('layouts.auth')
@section('content')
  <div class="card-body">
    <form>
        <div class="input-group form-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input id="recover-email" type="text" class="form-control" placeholder="Adresse mail">
        </div>
        <div id="recover-btn-box" class="form-group text-center">
            <input id="recover-btn" value="Envoyer l'email" class="btn login_btn">
        </div>
        <div id="recover-sended-txt" class="text-center links" hidden>
            Un mail de réinitialisation vous a été envoyé ! :)
        </div>
    </form>
  </div>
@stop
