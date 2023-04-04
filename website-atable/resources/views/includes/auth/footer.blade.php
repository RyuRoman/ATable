<div class="card-footer">
  @if (request()->is('/') || request()->is('login'))
    <!-- NOUS SOMMES SUR LA ROUTE LOGIN -->
    <div class="d-flex justify-content-center links">
      Vous n'avez pas de compte?<a href="/register">S'enregistrer</a>
    </div>
    <div class="d-flex justify-content-center links">
      <a href="/recover">Mot de passe oublié?</a>
    </div>
  @elseif (request()->is('register'))
    <!-- NOUS SOMMES SUR LA ROUTE REGISTER -->
    <div class="d-flex justify-content-center links">
      Vous avez déjà un compte?<a href="/login">Se connecter</a>
    </div>
  @elseif (request()->is('recover'))
    <!-- NOUS SOMMES SUR LA ROUTE RECOVER -->
      <div class="d-flex justify-content-center links">
        <a href="/">Retour</a>
      </div>
  @elseif (request()->is('choice'))
    <!-- NOUS SOMMES SUR LA ROUTE RECOVER -->
        <style>
            .test {
              color: #82ae46;
              margin-top: 50px;
            }
            .test:hover {
              color: #82ae46;
            }
        </style>
        <div class="test">
            <center>
                <a href="/" class="test">Retour</a>
            </center>
        </div>

  @elseif (!strcmp(request()->route()->getName(), "reset"))
          <div class="d-flex justify-content-center links">
              Réinitialisation valide
          </div>
          <div class="d-flex justify-content-center links">
              1 semaine après envoi du mail
          </div>
  @endif
</div>
