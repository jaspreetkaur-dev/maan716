const no=document.getElementById("no");

no.addEventListener("mouseover",()=>{

no.style.position="absolute";
no.style.left=Math.random()*80+"%";
no.style.top=Math.random()*80+"%";

});

document.getElementById("yes").onclick=()=>{

window.location.href="message.html";

}
setInterval(() => {

    let heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = (3 + Math.random() * 3) + "s";

    document.getElementById("hearts").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);

}, 300);
