const loading = document.getElementById('loading');
const errorAlert = document.getElementById('errorAlert')
const emojiList = document.getElementById('myemoji') 
const rootUrl = "https://www.gstatic.com/android/keyboard/emojikitchen";
const allemojijsonURL = 'https://cdn.jsdelivr.net/gh/AyeXZilla/cdn/json/all-unicode-v.15-emojis-v3.1.json'
const kitchenjsonURL = 'https://cdn.jsdelivr.net/gh/xsalazar/emoji-kitchen/src/Components/emojiData.json'
const animatedjsonURL = 'https://googlefonts.github.io/noto-emoji-animation/data/api.json'

loading.innerHTML = `<p class='mytxt'>
                        Enter two valid Emojis (eg: "<span class='emojitxt'>😎+😀</span>") to find a related emoji mashups.<br>Enter a valid Emoji (eg: <span class='emojitxt'>😎</span>) to find all related emoji mashups.<br>Enter 'allGoogle' , 'allGooglesvg' , 'allTwitter' , 'allFacebook' , 'allAnimated' , 'allYouTube' to find all related emojis. <br> Enter "Random" to find random emoji combination.
                    </p>`

function adjustStringNew(x) {
   let result = x.replace(/\-/g , '-u');
    return result;
    }

function adjustString(x, type , joinChar) {
    let result;
    if (type === 'lower') {
        result = x.toLowerCase();
    } else if (type === 'upper'){
        result = x.toUpperCase();
    }

    result = result.replace(/ /g , joinChar);
    return result;
    }

function toLowerCase(string) {
       return string.toLowerCase();
    }
    
function toUpperCase(string) {
       return string.toUpperCase();
    }
                
function removePng (x){
     return x.replace(".png" , "")
     }

function removeLastPart(str , y) {
        if (str.slice(-y.length) === y) {
            return str.slice(0, -y.length);
        }
        return str;
        }

function convertEmojiToHex(char, type = 'upper', joinChar = ' ') {
    let result = []
    for (let i of char.normalize()) {
        let codePoint = i.codePointAt(0).toString(16)
        if (type === 'lower') {
            codePoint = codePoint.toLowerCase()
        }if (type === 'upper'){
            codePoint = codePoint.toUpperCase()
        }
        result.push(codePoint)
    }
    return result.join(joinChar)
}

function convertHexToEmoji(hex) {
            return String.fromCodePoint(parseInt(hex, 16));
        }

(async () => {
try {
    const res0 = await fetch(allemojijsonURL);
    if(!res0.ok) throw new Error(res0.statusText);
    const allemojiJSON = await res0.json();

    const res1 = await fetch(kitchenjsonURL);
    if(!res1.ok) throw new Error(res1.statusText);
    const emojiKitchenJSON = await res1.json();

    const res2 = await fetch(animatedjsonURL);
    if(!res2.ok) throw new Error(res2.statusText);
    const emojiAnimatedJSON = await res2.json();

    const qualifiedEmojisArray = allemojiJSON.emojis.filter(e => e.status === "fully-qualified")
    const qualifiedEmojis = qualifiedEmojisArray.map(e => e.preview);
    const qualifiedUnicodes = qualifiedEmojisArray.map(e => e.unicode);

    const fileTypes = ["png", "svg", "gif", "webp", "Apple", "Facebook", "Twitter", "txt", "Unicode", "details"];
    const arrays = fileTypes.map(type => qualifiedEmojis.map(e => e + type));
    const [pngArray, svgArray, gifArray, webpArray, AppleArray, FacebookArray, TwitterArray, txtArray, UniArray, detailsArray] = arrays;

    function findUnicodefromArray (u) {
        const found = qualifiedEmojisArray.find(obj => obj.preview === u);
        const code = found.unicode
        return code;
    }

    function getEmojiDetails (w){

        const found = qualifiedEmojisArray.find(obj => obj.preview === w);
        const name = found.name
        const code = found.unicode
        const preview = found.preview
        const status = found.status
        const v = found.v

        errorAlert.innerHTML = "";
        loading.innerHTML = ''
        emojiList.innerHTML = `<p class='mytxt'>Emoji <span class='emojitxt'>${w}<span> details <br>
                                Name : ${name} <br>
                                Version : ${v} <br>
                                Status : ${status} <br>
                                Unicode : ${code} <br>
                                Preview (Google) : <span class='emojitxt'>${w}</span></p>`
    }

    function getAllEmojiCombinations (para) {
    const x = convertEmojiToHex(para , 'lower' , '-' )

    if (`${x}` in emojiKitchenJSON) {
        const result = emojiKitchenJSON[`${x}`]
        console.log(result);

        const myanchor0 = document.createElement('a')
                    myanchor0.setAttribute('target' , '_blank')             

        const normalemoji= document.createElement("img");
                normalemoji.setAttribute("src", `https://raw.githubusercontent.com/iamcal/emoji-data/master/img-google-136/${x}.png`);
                normalemoji.onerror = function() {
                                this.style.display = "none";
                            }
                normalemoji.setAttribute('width' , '100px')
                normalemoji.setAttribute('heigth' , '100px')
                normalemoji.setAttribute('alt' , `${x}`)

                myanchor0.setAttribute('href', normalemoji.getAttribute('src'));
                emojiList.appendChild(myanchor0);
                myanchor0.appendChild(normalemoji);

        const myanchor1 = document.createElement('a')
                 myanchor1.setAttribute('target' , '_blank')             

        const animatedemoji= document.createElement("img");
                animatedemoji.setAttribute("src", `https://fonts.gstatic.com/s/e/notoemoji/latest/${x}/512.gif`);
                animatedemoji.onerror = function() {
                                this.style.display = "none";
                            }
                animatedemoji.setAttribute('width' , '100px')
                animatedemoji.setAttribute('heigth' , '100px')
                animatedemoji.setAttribute('alt' , `${x}`)

                myanchor1.setAttribute('href', animatedemoji.getAttribute('src'));
                emojiList.appendChild(myanchor1);
                myanchor1.appendChild(animatedemoji);
    
        for (let i = 0; i < result.length ; i++) {
                const potentialDate = result[i].date
                const leftEmoji = adjustStringNew(result[i].leftEmoji)
                const rightEmoji = adjustStringNew(result[i].rightEmoji)
                const myUrl = `${rootUrl}/${potentialDate}/u${leftEmoji}/u${leftEmoji}_u${rightEmoji}.png`

                const myanchor = document.createElement('a')
                                myanchor.setAttribute('target' , '_blank')

                const myemoji = document.createElement("img");
                                myemoji.setAttribute("src", myUrl);
                                myemoji.setAttribute('width' , '100px')
                                myemoji.setAttribute('heigth' , '100px')
                                myemoji.setAttribute('alt' , `u${leftEmoji}_u${rightEmoji}.png`)

                myanchor.setAttribute('href', myemoji.getAttribute('src'));
                emojiList.appendChild(myanchor);         
                myanchor.appendChild(myemoji);
                loading.innerHTML = ''
            }
            }
    else {
            loading.innerHTML = ''
            emojiList.innerHTML = ''
            errorAlert.innerHTML = `There is no combination for <span class='emojitxt'>${para}</span><br> Try <span class='emojitxt'>😎</span> or "<span class='emojitxt'>🥰+💩</span>"`;
        }
    }

    function getEmojiCombination (para1 , para2) {     
        const x = convertEmojiToHex(para1 , 'lower' , '-' )
        const y = convertEmojiToHex(para2 , 'lower' , '-' )
    
        let newArr ;
        let errOne ;
        if (`${x}` in emojiKitchenJSON) {
                newArr = emojiKitchenJSON[`${x}`]
                errOne = `There is no combination for <span class='emojitxt'>${para1}</span> with <span class='emojitxt'>${para2}</span><br>
                            but there are many combinations for <span class='emojitxt'>${para1}</span>. <br> Try this "<span class='emojitxt'>${para1}</span>+<span class='emojitxt'>😎</span>"`
                }
        else if (`${y}` in emojiKitchenJSON) {
                newArr = emojiKitchenJSON[`${y}`]
                errOne = `There is no combination for <span class='emojitxt'>${para2}</span> with <span class='emojitxt'>${para1}</span><br>
                            but there are many combinations for <span class='emojitxt'>${para2}</span>. <br> Try this "<span class='emojitxt'>${para2}</span>+<span class='emojitxt'>😎</span>"`
            }
        else {
                loading.innerHTML = ''
                errorAlert.innerHTML = `No emoji mashups are available for <span class='emojitxt'>${para1}</span> and <span class='emojitxt'>${para2}</span> <br> Try this "<span class='emojitxt'>😀</span>+<span class='emojitxt'>😎</span>"`;
            }
    
        const result = newArr.find(obj => (obj.leftEmoji === x && obj.rightEmoji === y) || (obj.leftEmoji === y && obj.rightEmoji === x));
    
        if (result){
                console.log(result);

                const potentialDate = result.date
                const leftEmoji = adjustStringNew(result.leftEmoji)
                const rightEmoji = adjustStringNew(result.rightEmoji)
                const myUrl = `${rootUrl}/${potentialDate}/u${leftEmoji}/u${leftEmoji}_u${rightEmoji}.png`


                const myanchor = document.createElement('a')
                                myanchor.setAttribute('target' , '_blank')

                const myemoji = document.createElement("img");
                                myemoji.setAttribute("src", myUrl);
                                myemoji.setAttribute('width' , '200px')
                                myemoji.setAttribute('heigth' , '200px')

                myanchor.setAttribute('href', myemoji.getAttribute('src'));
                emojiList.appendChild(myanchor);         
                myanchor.appendChild(myemoji);
                loading.innerHTML = ''

            } 
        else {
                loading.innerHTML = ''
                errorAlert.innerHTML = errOne;
            }
            }
            
    function getRandomCombination () {
        const keys = Object.keys(emojiKitchenJSON)
        const randomIndex = Math.floor(Math.random() * keys.length);
        const randomArr = emojiKitchenJSON[keys[randomIndex]];
        const randomIndex1 = Math.floor(Math.random() * randomArr.length)
        const result= randomArr[randomIndex1]

            const potentialDate = result.date
            const leftEmoji = adjustStringNew(result.leftEmoji)
            const rightEmoji = adjustStringNew(result.rightEmoji)
            const myUrl = `${rootUrl}/${potentialDate}/u${leftEmoji}/u${leftEmoji}_u${rightEmoji}.png`

                const myP = document.createElement('p')
                const myanchor = document.createElement('a')
                                myanchor.setAttribute('target' , '_blank')

                const myemoji = document.createElement("img");
                                myemoji.setAttribute("src", myUrl);
                                myemoji.setAttribute('width' , '200px')
                                myemoji.setAttribute('heigth' , '200px')
                                myemoji.setAttribute('alt' , `u${leftEmoji}_u${rightEmoji}.png`)

                myP.innerHTML = `<p class='googleemojitxt'>${convertHexToEmoji(leftEmoji)}+${convertHexToEmoji(rightEmoji)}</p>`                
                myanchor.setAttribute('href', myemoji.getAttribute('src'));

                loading.innerHTML = ''
                emojiList.appendChild(myP)
                emojiList.appendChild(myanchor);         
                myanchor.appendChild(myemoji);          
    }        

    function getAllGoogleEmojisPngSvg (e) { 

        let output = '';
        for (let i = 0; i < qualifiedEmojisArray.length ; i++) {
    
            const eimg = qualifiedEmojisArray[i].unicode

            let googleemojiURL;
            if (e === 'png'){
                googleemojiURL = `https://raw.githubusercontent.com/iamcal/emoji-data/master/img-google-136/${adjustString(eimg , 'lower' , '-')}.png`
                const googleemojiURL1 = `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u${adjustString(eimg , 'lower' , '_')}.png` }
            

            if (e === 'svg'){
                googleemojiURL = `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/emoji_u${adjustString(eimg , 'lower' , '_')}.svg` 
            }
            
            const myanchor = document.createElement('a')
            const myemoji= document.createElement("img");
                    
                    myemoji.setAttribute("src", `${googleemojiURL}`);
                    myemoji.onerror = function() {
                                this.style.display = "none";
                            }
                    myemoji.setAttribute('width' , '100px')
                    myemoji.setAttribute('heigth' , '100px')                        
                    myemoji.setAttribute('loading' , 'lazy') 
                    myanchor.setAttribute('href', myemoji.getAttribute('src'));
                    myanchor.setAttribute('target' , '_blank')
                emojiList.appendChild(myanchor);                               
                myanchor.appendChild(myemoji);  
                loading.innerHTML = `` ;  
            }  
            }

    function getAllGoogleEmojistxt () {
        let output = '';
        for (let i = 0; i < qualifiedEmojis.length; i++) {
        const emojitxt = qualifiedEmojis[i];
                    output += `${emojitxt}`
                    loading.innerHTML = `` ;
                    emojiList.innerHTML = `<p class='googleemojitxt'>${output}</p>` ;
                    }
    }

    function getAllEmojis (x) {

    let output = '';
    for (let i = 0; i < allemojiJSON.emojis.length ; i++) {

        const eimg = allemojiJSON.emojis[i].unicode
        const appleemojiURL = `https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-160/${adjustString(eimg , 'lower' , '-')}.png`
        const twitteremojiURL = `https://raw.githubusercontent.com/iamcal/emoji-data/master/img-twitter-72/${adjustString(eimg , 'lower' , '-')}.png`
        const facebookemojiURL = `https://raw.githubusercontent.com/iamcal/emoji-data/master/img-facebook-96/${adjustString(eimg , 'lower' , '-')}.png`

        const myanchor = document.createElement('a')
        const myemoji= document.createElement("img");
                if (x === 'apple'){             
                            myemoji.setAttribute("src", `${appleemojiURL}`);                    
                } if (x === 'twitter'){
                            myemoji.setAttribute("src", `${twitteremojiURL}`);
                } if (x === 'facebook'){
                            myemoji.setAttribute("src", `${facebookemojiURL}`);
                }
                myemoji.onerror = function() {
                            this.style.display = "none";
                        }
                myemoji.setAttribute('width' , '100px')
                myemoji.setAttribute('heigth' , '100px')                        
                myemoji.setAttribute('loading' , 'lazy') 
                myanchor.setAttribute('href', myemoji.getAttribute('src'));
                myanchor.setAttribute('target' , '_blank')
            emojiList.appendChild(myanchor);                               
            myanchor.appendChild(myemoji);  
            loading.innerHTML = `` ;  }
        
        }

    function getAllYouTubeEmojis () {
    fetch('https://cdn.jsdelivr.net/gh/AyeXZilla/yt-emojis/emojis-svg-9.json')
    .then(response => response.json())
    .then(data => {          
    let output = '';
        for (let i = 0; i < data.length; i++) {              
        const emojiId = data[i].emojiId
        const emojiURL = data[i].image.thumbnails[0].url                            
        const myemoji= document.createElement("img");
                        myemoji.setAttribute("src", `${emojiURL}`);
                        myemoji.setAttribute('width' , '100px')
                        myemoji.setAttribute('heigth' , '100px')
                        myemoji.setAttribute('alt' , `${emojiId}`)
                        myemoji.setAttribute('title' , `${emojiId}`)
                        myemoji.setAttribute('loading' , 'lazy')                                
                emojiList.appendChild(myemoji); 
                loading.innerHTML = `` ;
            }
        });
    }

    function getSingleEmoji (para , y) {

        let slice1 = removeLastPart(para , y);
        let x = convertEmojiToHex(slice1 , 'lower' , '-')
    
        let q = findUnicodefromArray(slice1);            
        const p = adjustString(q , 'lower' , '_')

        const svgemojiURL = `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/emoji_u${p}.svg`
        const pngemojiURL = `https://raw.githubusercontent.com/iamcal/emoji-data/master/img-google-136/${x}.png`
        const appleemojiURL = `https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-160/${x}.png`
        const twitteremojiURL = `https://raw.githubusercontent.com/iamcal/emoji-data/master/img-twitter-72/${x}.png`
        const facebookemojiURL = `https://raw.githubusercontent.com/iamcal/emoji-data/master/img-facebook-96/${x}.png`

        const myanchor = document.createElement('a')
        const fullemoji= document.createElement("img");
            if (y === 'png'){
                        fullemoji.setAttribute("src", `${pngemojiURL}`);
            } if (y === 'svg'){
                        fullemoji.setAttribute("src", `${svgemojiURL}`);
            } if (y === 'Apple'){             
                        fullemoji.setAttribute("src", `${appleemojiURL}`);                    
            } if (y === 'Twitter'){
                        fullemoji.setAttribute("src", `${twitteremojiURL}`);
            } if (y === 'Facebook'){
                        fullemoji.setAttribute("src", `${facebookemojiURL}`);
            }
            
                fullemoji.setAttribute('width' , '200px')
                fullemoji.setAttribute('heigth' , '200px')
                fullemoji.setAttribute('alt' , `animated ${x}`)
                myanchor.setAttribute('href', fullemoji.getAttribute('src'));
                myanchor.setAttribute('target' , '_blank')
            emojiList.appendChild(myanchor); 
            myanchor.appendChild(fullemoji); 
            loading.innerHTML = `` ;               
    }

    function getAnimatedEmoji(para , y){

        let w = removeLastPart(para , y);
        let x = convertEmojiToHex(w , 'lower' , '_')
        const found = emojiAnimatedJSON.icons.find(obj => obj.codepoint === x);
       
        let gifemojiURL ;
        let webpemojiURL ;
        if (found) {
            gifemojiURL = `https://fonts.gstatic.com/s/e/notoemoji/latest/${x}/512.gif`
            webpemojiURL = `https://fonts.gstatic.com/s/e/notoemoji/latest/${x}/512.webp`

        const myanchor = document.createElement('a')
        const fullemoji= document.createElement("img");
            if (y === 'gif'){
                        fullemoji.setAttribute("src", `${gifemojiURL}`);
            } if (y === 'webp'){
                        fullemoji.setAttribute("src", `${webpemojiURL}`);
            }
            
                fullemoji.setAttribute('width' , '200px')
                fullemoji.setAttribute('heigth' , '200px')
                fullemoji.setAttribute('alt' , `animated ${x}`)
                myanchor.setAttribute('href', fullemoji.getAttribute('src'));
                myanchor.setAttribute('target' , '_blank')
            emojiList.appendChild(myanchor); 
            myanchor.appendChild(fullemoji); 
            loading.innerHTML = `` ; 
        } else {
            emojiList.innerHTML = ''
            loading.innerHTML = ''
            errorAlert.innerHTML = `No animated emojis (${y}) are available for ${w}`
        } 
    }

    function getAllAnimatedEmojis () {
            let output = '';
            for (let i = 0; i < emojiAnimatedJSON.icons.length ; i++) {
                const code = emojiAnimatedJSON.icons[i].codepoint
                const staticemojiURL = `https://fonts.gstatic.com/s/e/notoemoji/latest/${code}/512.png`
                const animatedemojiURL = `https://fonts.gstatic.com/s/e/notoemoji/latest/${code}/512.webp`
                const myanchor = document.createElement('a')
                const myemoji= document.createElement("img");
                    myemoji.setAttribute("src", staticemojiURL);
                    myemoji.setAttribute("data-animated", animatedemojiURL);
                    myemoji.setAttribute("data-static", staticemojiURL);                                              
                    myemoji.setAttribute('width' , '100px')
                    myemoji.setAttribute('heigth' , '100px')                        
                    myemoji.setAttribute('loading' , 'lazy')                            
                    myemoji.addEventListener("mouseover", function() {
                        this.setAttribute("src", this.getAttribute("data-animated"));
                    });
                    myemoji.addEventListener("mouseout", function() {
                        this.setAttribute("src", this.getAttribute("data-static"));
                    });
                    
                    myanchor.setAttribute('href', `https://fonts.gstatic.com/s/e/notoemoji/latest/${code}/512.webp`);
                    myanchor.setAttribute('target' , '_blank')
                    
                emojiList.appendChild(myanchor);                               
                myanchor.appendChild(myemoji);  
                loading.innerHTML = `` ;  }
        }    

    function getinputData() {
    
        emojiList.innerHTML = ''
        errorAlert.innerHTML = ''
        loading.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse h1-title"></i>`
            let x = document.getElementById('inputURL').value;        
            const isValidEmoji = qualifiedEmojis.includes(x);                
            const validEmojiPart = qualifiedEmojis.filter(emoji => x.includes(emoji));                    
            const separated = x.split('+')
            const a = separated[0]
            const b = separated[1]          
            const valida = qualifiedEmojis.includes(separated[0])
            const validb = qualifiedEmojis.includes(separated[1])  

            if (x === '') {
                loading.innerHTML = ''
                errorAlert.innerHTML = `Enter some emoji something...`
                emojiList.innerHTML = ''
              }   
            else if (isValidEmoji) {
                    getAllEmojiCombinations(x)
                }   
            else if (valida && validb) {
                    getEmojiCombination(a , b);
             }
            else if (x === 'random') { 
                    errorAlert.innerHTML = "";
                    getRandomCombination()
            }
            else if (x === 'allGooglepng') { 
                    errorAlert.innerHTML = "";
                    getAllGoogleEmojisPngSvg('png')
            }
            else if (x === 'allGooglesvg') {
                    errorAlert.innerHTML = "";
                    getAllGoogleEmojisPngSvg('svg')
            }
            else if (x === 'allGoogle') {  
                    errorAlert.innerHTML = "";
                    getAllGoogleEmojistxt()
            }
            else if (x === 'allTxt') {  
                    errorAlert.innerHTML = "";
                    getAllGoogleEmojistxt()
            }
            else if (x === 'allApple') {
                    errorAlert.innerHTML = "";
                    getAllEmojis('apple')
            }
            else if (x === 'allTwitter') {
                    errorAlert.innerHTML = "";
                    getAllEmojis('twitter')
            }
            else if (x === 'allFacebook') {
                    errorAlert.innerHTML = "";
                    getAllEmojis('facebook')
            }
            else if (x === 'allYouTube') {
                    errorAlert.innerHTML = "";
                    getAllYouTubeEmojis()
            }
            else if (x === 'allAnimated'){     
                    errorAlert.innerHTML = "";
                    getAllAnimatedEmojis()
            }
            else if (svgArray.includes(x)) {
                getSingleEmoji(x , 'svg')
            } 
            else if (pngArray.includes(x)) {
                getSingleEmoji(x , 'png')
            } 
            else if (gifArray.includes(x)) {
                getAnimatedEmoji(x , 'gif')
            } 
            else if (webpArray.includes(x)) {
                getAnimatedEmoji(x , 'webp')
            } 
            else if (AppleArray.includes(x)) {
                getSingleEmoji(x , 'Apple')
            } 
            else if (TwitterArray.includes(x)) {
                getSingleEmoji(x , 'Twitter')
            } 
            else if (FacebookArray.includes(x)) {
                getSingleEmoji(x , 'Facebook')
            } 
            else if (detailsArray.includes(x)) {
                const w =  removeLastPart(x , 'details')
                getEmojiDetails(w)
            }
            else if (UniArray.includes(x)) {
                const w =  removeLastPart(x , 'Unicode')
                loading.innerHTML = ''
                errorAlert.innerHTML = ''
                emojiList.innerHTML = `<p class='mytxt'>Unicode for <span class='emojitxt'>${w}</span> emoji is ${convertEmojiToHex(w)}</p>`
            } 
            else if (txtArray.includes(x)) {
                const w =  removeLastPart(x , 'txt')
                loading.innerHTML = ''
                errorAlert.innerHTML = ''
                emojiList.innerHTML = `<p class='bigtxt'>${w}</p>`
            } 
            else {
                loading.innerHTML = ''
                errorAlert.innerHTML = `Invalid Input`
                emojiList.innerHTML = ''
                 }
        }          

// Event Listners URL btn
    URLsubmitbtn.addEventListener("click",getinputData),inputURL.addEventListener("keypress",(function(t){"Enter"===t.key&&(t.preventDefault(),URLsubmitbtn.click())}));    
} 
catch (error) {
console.error(error);
loading.innerHTML = ''
errorAlert.innerHTML = `Error on fetching`
}})(); 
//v2.5 ok apple bug fixed
