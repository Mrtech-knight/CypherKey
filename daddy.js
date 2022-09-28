function vigenereKeyLength(key, msg) {
    let keyLength = key.length;
    for(let i=0;i < msg.length - keyLength ; i++) {
        key += key[i%keyLength];
    }
    return key;
}

function vigenereEncrypt(msg, key){
    let table = "abcdefghijklmnopqrstuvwxyz";
    let res = "";
    key = vigenereKeyLength(key, msg);
    for(let i=0; i < msg.length; i++) {
        let a = msg.charCodeAt(i);
        let b = key.charCodeAt(i);

        res += table[ ((a-97)+(b-97)) %26]
    }
    return res;
}

function vigenereDecrypt(cypher, key){
    let table = "abcdefghijklmnopqrstuvwxyz";
    let res = "";
    key = vigenereKeyLength(key, cypher);
    for(let i=0; i < cypher.length; i++) {
        let a = cypher.charCodeAt(i);
        let b = key.charCodeAt(i);
        let temp = a-b;
        
        if( temp < 0) {
            temp = 26 + temp;
        }
        res += (table[temp])
    }
    return res;
}


function vigenereEncryptCall() {
    let msg = document.getElementById("inputText").value;
    let keyIn = document.getElementById("key").value;

    console.log(keyIn);

    msg = msg.toLowerCase();
    keyIn = keyIn.toLowerCase();

    let cyphertext = vigenereEncrypt(msg, keyIn);

    document.getElementById("outWindow").innerHTML = cyphertext;
}

function vigenereDecryptCall() {

    let cypherIn = document.getElementById("inputText").value;
    let keyIn = document.getElementById("key").value;

    console.log(keyIn);

    cypherIn = cypherIn.toLowerCase();
    keyIn = keyIn.toLowerCase();

    let ori = vigenereDecrypt(cypherIn, keyIn);

    document.getElementById("outWindow").innerHTML = ori;
}

// function vigenereCall() {

//     // document.getElementById("buttons").innerHTML = '<input id="inputText" placeholder="Enter your text"><input id="key" placeholder="Enter your key"><br><button onclick="vigenereEncryptCall()" >ENCRYPT</button><button onclick="vigenereDecryptCall()" >DECRYPT</button>'

//     let msg = document.getElementById("inputText").value;
//     let keyIn = document.getElementById("key").value;
//     // let cypherIn = document.getElementById("cypher").value;
    
//     msg = msg.toLowerCase();
//     keyIn = keyIn.toLowerCase();
    
//     let cyphertext = vigenereEncrypt(msg, keyIn);
//     let ori = vigenereDecrypt(cypherIn, keyIn);

//     document.getElementById("outWindow").innerHTML = "CYPHER TEXT -> " + cyphertext;
    // document.getElementById("output2").innerHTML = "ORIGINAL MESSAGE -> " + ori;

// }

//--------------------------------------------------------------------------


function hillArrToString(cypher) {
    let s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let res = "";
    for(let i of cypher ){
        res += s[i];
    }
    return res;
}

function hillKeyMatrix(key, n) {
    let res = [];
    let ch = 0;
    for(let i=0; i<n; i++) {
        let temp = [];
        for(let j=0; j<n; j++) {
            temp.push( key.charCodeAt(ch) - 65 );
            ch++;
        }
        // console.log(temp)
        res.push(temp);
    }
    
    return res;
}

function hillPlainArr(plain) {
    let res = [];
    for(let i=0; i<plain.length; i++) {
        res.push( plain.charCodeAt(i) - 65 );
    }
    return res;
}

function hillEncrypt1(key, plain, n) {
    let res = [];
    for(let i=0; i<n; i++) {
        let temp = 0;
        for(let j=0; j<n; j++) {
            temp += plain[j]*key[j][i];
        }
        res.push(temp);
    }
    for(let i=0; i<n; i++) {
        res[i] %= 26;
    }
    let ans = hillArrToString(res);
    return ans;
}

function hillEncrypt2(key, plain, n) {
    let res = [];
    for(let i=0; i<n; i++) {
        let temp = 0;
        for(let j=0; j<n; j++) {
            temp += key[i][j] * plain[j];
        }
        res.push(temp);
    }
    for(let i=0; i<n; i++) {
        res[i] %= 26;
    }
    let ans = hillArrToString(res);
    return ans;
}

function hillEncrypt1Call() {
    let msg = document.getElementById("inputText").value;
    let keyIn = document.getElementById("key").value;

    msg = msg.toUpperCase();
    keyIn = keyIn.toUpperCase();

    let keyMat = hillKeyMatrix(keyIn, msg.length);
    let plainA = hillPlainArr(msg);

    let cyphertext = hillEncrypt1(keyMat, plainA, msg.length );

    document.getElementById("outWindow").innerHTML =cyphertext;
}
function hillEncrypt2Call() {
    let msg = document.getElementById("outWindow").value;
    let keyIn = document.getElementById("key").value;

    msg = msg.toUpperCase();
    keyIn = keyIn.toUpperCase();

    let keyMat = hillKeyMatrix(keyIn, msg.length);
    let plainA = hillPlainArr(msg);

    let cyphertext = hillEncrypt2(keyMat, plainA, msg.length );

    document.getElementById("outWindow").innerHTML =cyphertext;
}

// function hillCall() {

//     let plain = document.getElementById("inputText").value;
//     let keyIn = document.getElementById("key").value;
    
//     plain = plain.toUpperCase();

//     let keyMat = hillKeyMatrix(keyIn, 3);
//     let plainA = hillPlainArr(plain);

//     let cypher1 = hillEncrypt(keyMat, plainA, plain.length );
//     let cypher2 = hillEncrypt2(keyMat, plainA, plain.length)
//     console.log("CYPHER TEXT 1 -> ",cypher1);
//     console.log("CYPHER TEXT 2 -> ",cypher2)

//     document.getElementById("outWindow").innerHTML = "CYPHER TEXT 1 -> " + cypher1;

// }

//-----------------------------------------------------------------------------
function encryptButtonCall() {
    let algorithm = document.getElementById("algo").value;
    if(algorithm == "hill") {
        hillEncrypt1Call();
    }
    else if(algorithm == "vigenere") {
        vigenereEncryptCall();
    }
}

function decryptButtonCall() {
    let algorithm = document.getElementById("algo").value;
    if(algorithm == "hill") {
            hillEncrypt2Call();
    }
    else if(algorithm == "vigenere") {
        vigenereDecryptCall();
    }
}