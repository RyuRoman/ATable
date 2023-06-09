<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>A'Table's Api</title>

        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 13px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }
        </style>
    </head>

    <body>
        <div class="flex-center position-ref full-height">
            <div class="top-right links">
                <a href="/backoffice/login">Backoffice</a>
            </div>

            <div class="content">
                <div class="title m-b-md">
                    <?php
                    $sayHello = [
                        "Welcome",
                        "Plop",
                        "Yo !",
                        "Hello",
                        "Hey you !",
                        "Hi !",
                        "Hey !",
                        "Hey there !",
                        "Hello there !",
                        "What's up ?",
                        "Sup ?",
                        "Hello, sunshine !",
                        "Howdy, partner !",
                        "Hey, howdy, hi !",
                        "What’s kickin’, little chicken ?",
                        "Peek-a-boo !",
                        "Howdy-doody !",
                        "Hey there, freshman !",
                        "Hi, mister !",
                        "I come in peace !",
                        "Put that cookie down !",
                        "Ahoy, matey !",
                        "Hiya !",
                        "Yaaaarrrrrrrr !!!",
                        "You know who this is.",
                        "I'm Batman.",
                        "Howdy, howdy, howdy !",
                        "Top of the mornin' to ya !",
                        "Greeting and salutations.",
                        "How you doin'?",
                        "'Ello, mate.",
                        "Heeey, baaaaaby.",
                        "Aloha",
                        "Hola",
                        "Hallo !",
                        "Bonjour",
                        "Konnichiwa !"
                    ];
                    echo $sayHello[rand(0, count($sayHello) - 1)];
                    ?>

                    <!-- Stop watching html code. You're creepy. Really.-->
                </div>

            </div>
        </div>
    </body>
</html>
