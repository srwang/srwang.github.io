tic tac toe

first person who plays is assigned player 1
second person is assigned player two

each person is able to alternate setting down "pieces onto a board" using a button
code will calculate and store where each piece has been placed- get a player or computer value for an input, for instance 

maybe store values in an array of objects made using a constructor (that way you can change to five, or four)

win if : 
one array has all the same values
each array has same value for same index
or diagonal (may have to hard-code this)

if three in a row are the same person, then that person wins 

bonus 

once game is over, "reset button" will clear imput values and visually reset board 

computer v player : on click, assign comp to player 2. run through a randomizer for comp's values (comp can only choose from pieces that are not taken)

if two spaces are already taken, computer will always choose the third 

need:

tic tac toe board- create a table, or create via constructor
create a click function for each div - on click, will change the image of that div as well as change the variable to something like "reader"

later: have a field showing player one wins and player two wins, etc... change "player two to comp wins"

css stuff: have some cool images for the tic tac toe, have them hovering when the person is moving their mouse over 

pseudocode:

-create 9 boxes (somehow)
	-maybe make a constructor for columns, then push the objects into an array
	-use a for loop to iterate through each arr[index].key, creating a div (w/ class and id) for each object 
-attach an event listener to each box

-if win = false; 
	-create "toggle"- when player 1 clicks, image changes to x and class changes to "x"
	-when player 2 clicks, image changes to x and class changes to "o"
	-check for win
		-if three "x" classes in a row or three "o" classes in a row (use id to check class)
		-maybe check if every div inside array has the same id, then if index one of each has the same id, then diagonal
		-if someone has won, change win = true, store who won 

-fix message "AI wins"
-refactor code including wins code
-appending wins message 

EXTRA:
-style css (add skeleton, etc)
-animate comp move so there is a time lapse 
-create message boxes for player wins with text on top
-change images for boxes
-refactor code

