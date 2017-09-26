var puzzMoves;
var puzzBest;
var puzzPlayed=false;

$(document).ready(function()
{
    var done;
    randomizePuzzle();
    $(".puzzletile").click(function()
    {
        if(!done)
        {
            switchPuzzle($(this).attr("posx"), $(this).attr("posy"));
            puzzMoves++;
            updatepuzzMoves();
            done = checkComplete();
            if(done)
            {
                endGame();
            }
        }
    });
    $("#reset").click(function(){
        done = false;
        randomizePuzzle();
        updatepuzzMoves();
    });
});

function randomizePuzzle()
{
    var x, y;
    for(var i = 0; i <= 30; i++)
    {
        x = Math.trunc(Math.random() * 6 + 1);
        y = Math.trunc(Math.random() * 6 + 1);
        switchPuzzle(x, y);
    }
    puzzMoves = 0;
}
function switchPuzzle(x, y)
{
    
    for(i = x - 1; i <= x + 1; i++)
    {
        x = Number(x);
        y = Number(y);
        if($(".puzzletile[posx='" + i + "'][posy='" + y + "']").attr("state") == "a")
        {
            $(".puzzletile[posx='" + i + "'][posy='" + y + "']").attr("state", "b");
        }
        else
        {
            $(".puzzletile[posx='" + i + "'][posy='" + y + "']").attr("state", "a");
        }
    }
    for(i = y - 1; i <= y + 1; i++)
    {
        if(i != y)
        {
            if($(".puzzletile[posx='" + x + "'][posy='" + i + "']").attr("state") == "a")
            {
                $(".puzzletile[posx='" + x + "'][posy='" + i + "']").attr("state", "b");
            }
            else
            {
                $(".puzzletile[posx='" + x + "'][posy='" + i + "']").attr("state", "a");
            }
        }
    }
}

function updatepuzzMoves(mode)
{
    switch(mode)
    {
        case 1:
            if(puzzMoves < puzzBest || !puzzPlayed)
            {
                puzzBest = puzzMoves;
            }
            $("#bestcounter").text(puzzBest);
        default:
            $("#movecounter").text("" + puzzMoves);
    }
}

function  checkComplete()
{
    var testred = true;
    var testblue = true;
    $(".puzzletile").each(function(){
        if($(this).attr("state") == "b")
        {
            testblue = false;
        }
        else
        {
            testred = false;
        }
    });
    return testred || testblue;
}

function endGame()
{
    alert("Congratulations!");
    updatepuzzMoves(1);
    puzzPlayed = true;
}