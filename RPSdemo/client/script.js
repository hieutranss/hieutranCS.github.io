const npcOptions = ["Rock", "Paper", "Scissors"];
const options = document.querySelectorAll("#user_choice button");
const restart = document.querySelectorAll("#restart");
var userPoints =0;
var npcPoints =0;

options.forEach(op => {
 op.addEventListener("click", () => {
   const rand =  Math.floor(Math.random() * 3);
   const npcChoice = npcOptions[rand];
document.querySelector("#npc-img").innerHTML = `<img src=\"${npcChoice}.png\">`;
document.querySelector("#user-img").innerHTML = `<img src=\"${op.innerHTML}.png\">`;
compare(npcChoice,op.innerHTML);
 })
})


function compare(npc,user){
console.log(npc + "---" + user)

if(user === npc){
  console.log("tie");
}

if(user === "Rock"){
  if(npc === "Paper"){
    npcPoints++;
  }
  else if (npc === "Scissors"){
    userPoints++;
  }
}

if(user === "Paper"){
  if(npc === "Scissors"){
    npcPoints++;
  }
  else if (npc === "Rock"){
    userPoints++;
  }
}

if(user === "Scissors"){
  if(npc === "Rock"){
    npcPoints++;
  }
  else if (npc === "Paper"){
    userPoints++;
  }
}

document.querySelector(".score").innerHTML = `${userPoints} : ${npcPoints}`;

restart.forEach(op => {
 op.addEventListener("click", () => {
 userPoints =0;
 npcPoints =0; 
 document.querySelector("#npc-img").innerHTML = `<img src=\"Rock.png\">`;
document.querySelector("#user-img").innerHTML = `<img src=\"Rock.png\">`;
document.querySelector(".score").innerHTML = `${userPoints} : ${npcPoints}`;
 })
})


}


