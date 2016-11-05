$(document).ready(function() {
    setInterval(function() {
        var $game = $('#game');
        if($game.text() !== 'ping'){
            $game.text('ping');
        } else{
            chrome.runtime.sendMessage({action: 'ping'},function(response) {
                $game.text(response);
            });
        }
    }, 1000);

});
