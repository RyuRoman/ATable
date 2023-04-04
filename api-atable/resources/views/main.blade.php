<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Dashboard - SB Admin</title>
        <link href="/css/styles.css" rel="stylesheet" />
        <link href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css" rel="stylesheet" crossorigin="anonymous" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js" crossorigin="anonymous"></script>
    </head>
    <body class="sb-nav-fixed">
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark text-center">
            <a class="navbar-brand" href="/backoffice/main">Backoffice A'Table</a>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">Onglets</div>
                            <a class="nav-link" href="/backoffice/main">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Dashboard A'Table
                            </a>
                            <a class="nav-link" href="/backoffice/users">
                                <div class="sb-nav-link-icon"><i class="fas fa-users"></i></div>
                                Liste des utilisateurs
                            </a>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">Logged in as:</div>
                        Nico Tortue
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid">
                        <h1 class="mt-4">Dashboard A'Table</h1>
                        <div class="row mb-4">
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-light text-dark">
                                    <div class="card-body">Nombre total d'<span class="text-success font-weight-bold">utilisateurs</span></div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <div class="font-weight-bold text-success">{{ $nb_users }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-2 col-md-6">
                                <div class="card bg-light text-dark">
                                    <div class="card-body">Nombre de <span class="text-primary font-weight-bold">clients</span></div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <div class="font-weight-bold text-primary">{{ $nb_customers }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-2 col-md-6">
                                <div class="card bg-light text-dark">
                                    <div class="card-body">Nombre de <span class="text-info font-weight-bold">cuisiniers</span></div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <div class="font-weight-bold text-info">{{ $nb_cookers }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-2 col-md-6">
                                <div class="card bg-light text-dark">
                                    <div class="card-body">Nombre de <span class="text-warning font-weight-bold">commandes</span></div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <div class="font-weight-bold text-warning">{{ $nb_commands }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-light text-dark">
                                    <div class="card-body">Prix moyen de chaque <span class="text-success font-weight-bold">panier</span></div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <div class="font-weight-bold text-success">{{ $avg_price_commands }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xl-6">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <div class="mt-1">
                                            <i class="fas fa-chart-area mr-1"></i>
                                            Commandes de plats groupées par périodes
                                            <a class="btn btn-sm btn-outline-primary mt-n1 float-right dropdown-toggle" id="commandsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Par heure</a>
                                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="commandsDropdown">
                                                <a class="dropdown-item commandPerItem" id="commandPerHour">Par heure</a>
                                                <a class="dropdown-item commandPerItem" id="commandPerDay">Par jour</a>
                                                <a class="dropdown-item commandPerItem" id="commandPerMonth">Par mois</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body" id="perHourChartAreaBody">
                                        <canvas id="perHourChartArea" width="100%" height="40"></canvas>
                                    </div>
                                    <div class="card-body" id="perDayChartAreaBody" hidden>
                                        <canvas id="perDayChartArea" width="100%" height="40"></canvas>
                                    </div>
                                    <div class="card-body" id="perMonthChartAreaBody" hidden>
                                        <canvas id="perMonthChartArea" width="100%" height="40"></canvas>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-6">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <div class="mt-1 mb-1">
                                            <i class="fas fa-chart-bar mr-1"></i>
                                            Nouveaux utilisateurs d'A'Table
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <canvas id="myBarChart" width="100%" height="40"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="/js/scripts.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
        <script src="/js/chart-area-demo.js"></script>
        <script src="/js/chart-bar-demo.js"></script>
        <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js" crossorigin="anonymous"></script>
        <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js" crossorigin="anonymous"></script>
        <script src="/js/datatables-demo.js"></script>
    </body>
</html>
