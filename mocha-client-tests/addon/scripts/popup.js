    setInterval(function() {
        var $game = document.querySelector('#game');
        if($game.innerText !== 'ping'){
            $game.innerText = 'ping';
        } else{
            browser.runtime.sendMessage({action: 'ping'}).then((response) => {
                $game.innerText = response;
            });
        }
    }, 1000);
