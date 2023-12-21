

/*proteMail = (prompt("Dime una direccion de email: "));

//diegogarcia@ieslasenia.org
function proteMail (mail){
    let mail_seg = mail.split("@")[0];
    let nombre = mail_seg[0];
    let nombre_med = nombre.substring(0,nombre.length/2);
    alert(`${nombre_med}...@${mail_seg[1]}`);
}*/
proteMail2(prompt("Dime una dirección email: "));
function proteMail2(mail){
    let mailDos = mail.split("@")[1];
    let dominio = mailDos[0];
    let dominioDos = dominio.substring(0,dominio.length/2);
    alert(`${dominioDos}@...${mailDos[1]}`);
}