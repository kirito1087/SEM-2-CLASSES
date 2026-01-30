let abcd = document.querySelector("#input");
let btn = document.querySelector("#butto");
btn.addEventListener("click",()=>{
    let c = abcd.value;
    if(c!==""){
        console.log(c);
        abcd.value = "";
    }
});