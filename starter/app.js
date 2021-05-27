/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Round score=Jo current wale box mein displayed hai.Global score=Jo Player 1 ,player 2 ke neeche displayed hai
//DRY Principle don't run the same thing twice in a code
//document.querySelector('#current-'+activeplayer).innerHTML='<em>'+dice+'<em>';//inner html quotes ke andar hi hoga hamesha
//player 0 panel and player 1 panel is the broader div tags surrounding everything
var scores, roundscore, activeplayer, dice,gamePlaying,prev,winningScore;

function init()
{
    //init jab new game krenge tab bhi use hoga
    scores = [0,0];
    roundscore = 0;
    activeplayer = 0;//0=player 1 and 1 =player 2
    gamePlaying=true;
    document.getElementById('dice-1').style.display='none';
    
    document.getElementById('dice-2').style.display='none';
    
    document.getElementById('score-0').textContent=0;//getElement by id is a little bit faster than queryselector for ids

    document.getElementById('score-1').textContent=0;

    document.getElementById('current-0').textContent=0;

    document.getElementById('current-1').textContent=0;

     document.querySelector('#name-0').textContent='Player 1';//When we want a new game we want the player 1 and 2 text to be added that's why and to remove the text Winner
    document.querySelector('#name-1').textContent='Player 2';
    //We will now remove the styling for the winner class so that the new game can start afresh
    document.querySelector('.player-0-panel').classList.remove('winner');
    
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    
    document.querySelector('.player-1-panel').classList.remove('active');
    //Ab humne both sein hata diya hai winner aur active class ie player 1 and player 2 .Now add the active class to player 0 which represents player 1 and remove it again from player 1 which symbolizes player 2.Somebody has to always start we assume it's always player 0
    document.querySelector('.player-0-panel').classList.add('active');
    
    document.querySelector('.player-1-panel').classList.remove('active');
}

init();


document.querySelector('.btn-roll').addEventListener('click',function()//We prefer anonymous function here
{
    if(gamePlaying)//Agar gameplaying=false to yein button sein kuch ni hoga
        {
            var dice1 = Math.floor(Math.random()*6)+1 ;//Random number 
            
            var dice2 = Math.floor(Math.random()*6)+1 ;//Random number 
            
            document.getElementById('dice-1').style.display='block';//We had hidden the dice earlier now we wanna make it visible again
            document.getElementById('dice-2').style.display='block';
            
            document.getElementById('dice-1').src='dice-'+dice1+'.png';//There are 6 images of dice we select them according to dice roll
            document.getElementById('dice-2').src='dice-'+dice2+'.png';//There are 6 images of dice we select them according to dice roll

         /*We have commented out the 2 consecutive 6 condition which holds for 1 dice only
            if(prev==6 && dice==6)
                {//Basically 2 sixes in a row aaya to game over we have coded that challenge.
                    
                    scores[activeplayer]=0;
                    document.getElementById('score-'+activeplayer).textContent='0';//getElement by id is a little bit faster than queryselector for ids

 
                    nextPlayer();
                }
               else if(dice!=1)//!== doesen't perform Type coercion.
                {
                    
                      roundscore+=dice;//For the round of respective player keep on adding the score
                    document.querySelector('#current-'+activeplayer).textContent=roundscore;//With this the current selector will select whichever active player is that.Check out the HTML code usme 2 id hai one with current-0 and one with current-1.Jo current wala box hai usme update ho jaega agar 1 aa gya kisi bhi player ka
                    
                }
            else //When the number is 1 we have to switch it to the other player
                {
                  nextPlayer();
                }
            prev=dice;
            */
        }
            if(dice!=1 && dice2!=1)//!== doesen't perform Type coercion.
                {
                    
                    roundscore+=dice1+dice2;//For the round of respective player keep on adding the score
                    document.querySelector('#current-'+activeplayer).textContent=roundscore;//With this the current selector will select whichever active player is that.Check out the HTML code usme 2 id hai one with current-0 and one with current-1.Jo current wala box hai usme update ho jaega agar 1 aa gya kisi bhi player ka
                    
                }
            else //When the number is 1 we have to switch it to the other player
                {
                  nextPlayer();
                }
    
});

document.querySelector('.btn-hold').addEventListener('click',function()//Hum log hold wali functionality define karre hai.Jo bhi current score hai uss session ka agar user satisfied hai coz baad mein 1 bhi aa sakta hai aur saara score chala jaega.So if he wants to exit we can do the adding wala part
{
    if(gamePlaying)//Agar gameplaying=false to yein button sein kuch ni hoga
        {
            //Add current score to global score
            scores[activeplayer]+=roundscore;
            //Update the UI
            document.querySelector('#score-'+activeplayer).textContent=scores[activeplayer];//Selecting the respective player and printing the score
            var input=document.querySelector('.final-score').value;//Jo box mein value daali hai uski value extract krne ke liye
            //Check if player won the game
            
            if(input)//Checks if we have an input or not
                {
                    winningScore=input;
                }
            else
                {
                    winningScore=100;//default value=20
                }
            if(scores[activeplayer]>=winningScore)
                {
                    document.querySelector('#name-'+activeplayer).textContent='WINNER!!!';
                    document.getElementById('dice-1').style.display='none';//Remove the photo of dice
                    document.getElementById('dice-2').style.display='none';//Remove the photo of dice
                    document.querySelector('.player-'+activeplayer+'-panel').classList.add('winner');//We added the winner style class here
                    document.querySelector('.player-'+activeplayer+'-panel').classList.remove('active');//We remoove the active style class here
                    gamePlaying=false;

                }
            else
                {
                  
                    nextPlayer();//Basically switch to next player
                }
        }

});

function nextPlayer()//We used the dryy run principle to prevent writing same piece of code in 2 places
{
    
    activeplayer===0 ?activeplayer=1:activeplayer=0;//Switches the activeplayer from 0 to 1 and vice versa
    roundscore=0;//for the next active player
    document.getElementById('current-0').textContent=0;//roundscore=0 humare ui mein bhi visible hoga
    document.getElementById('current-1').textContent=0;

    document.querySelector('.player-0-panel').classList.toggle('active');//We are toggling.The shortest method.If it's there then we remove it else we add it.Active class basically is the grey wala part in UI which symbolizes which class is active.
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display='none';//Basically next player sein pehle ham log dice ko invisible kr denge
    document.getElementById('dice-2').style.display='none';
   
}

document.querySelector('.btn-new').addEventListener('click',init);//We don't need to create an anonymous function here coz we already have the anonymous function with us that is init.NO need to add () when we add function as a parameter.init=callback function we won't be calling it query Selector would call it

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/