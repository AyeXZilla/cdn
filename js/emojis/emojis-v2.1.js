const loading = document.getElementById('loading')
const errorAlert = document.getElementById('errorAlert')
const emojiList = document.getElementById('myemoji') 
const allemojijsonURL = 'https://cdn.jsdelivr.net/gh/AyeXZilla/cdn/json/all-unicode-v.15-emojis-v3.1.json'
const kitchenjsonURL = 'https://cdn.jsdelivr.net/gh/xsalazar/emoji-kitchen/src/Components/emojiData.json'
const animatedjsonURL = 'https://googlefonts.github.io/noto-emoji-animation/data/api.json'
const gboardRootURL = 'https://www.gstatic.com/android/keyboard/emojikitchen'
const iamcalRootURL = 'https://raw.githubusercontent.com/iamcal/emoji-data/master'
const notoanimatedRootURL = 'https://fonts.gstatic.com/s/e/notoemoji/latest'

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

        const fileTypes = ["png", "svg", "gif", "webp", "Apple", "Facebook", "Twitter", "preview" , "txt", "unicode", "details"];
        const arrays = fileTypes.map(type => qualifiedEmojis.map(e => e + type));
        const [pngArray, svgArray, gifArray, webpArray, AppleArray, FacebookArray, TwitterArray, localRenderArray , txtArray, uniArray, detailsArray] = arrays;

        loading.innerHTML = `<p class='mytxt'>
                        Enter two valid Emojis (eg: "<span class='emojitxt'>😎+😀</span>") to find a related emoji mashups.<br>Enter a valid Emoji (eg: <span class='emojitxt'>😎</span>) to find all related emoji mashups.<br> Enter "Random" to find random emoji combination. <br> Type "Help" for more details. <br>Enter 'allGoogle' , 'allGooglesvg' , 'allTwitter' , 'allFacebook' , 'allAnimated' , 'allYouTube' to find all related emojis.
                    </p>`

        function getHELP() {
            errorAlert.innerHTML = ''
            emojiList.innerHTML = ''
            loading.innerHTML = `<p class='mytxt'>
                        Enter two valid Emojis (eg: "<span class='emojitxt'>😎+😀</span>") to find a related emoji mashups.<br>
                        Enter a valid Emoji (eg: <span class='emojitxt'>😎</span>) to find all related emoji mashups.<br>
                        Enter "Random" to find random emoji combination. <br> Type "Help" for more details.<br>
                        Enter a Emoji with these keywords to get download emoji in specific format <br>
                        All available keywords <br>
                        "<span class='emojitxt'>😎</span>svg" to find Google svg emoji file<br>
                        "<span class='emojitxt'>😎</span>png" to find Google png emoji file <br>
                        "<span class='emojitxt'>😎</span>gif" to find Google gif emoji file <br>
                        "<span class='emojitxt'>😎</span>webp" to find Google webp emoji file <br>
                        "<span class='emojitxt'>😎</span>Apple" to find Apple png emoji file <br>
                        "<span class='emojitxt'>😎</span>Twitter" to find TWitter png emoji file <br>
                        "<span class='emojitxt'>😎</span>Facebook" to find Facebook png emoji file <br>
                        "<span class='emojitxt'>😎</span>txt" to find your device's emoji version as text <br>
                        "<span class='emojitxt'>😎</span>preview" to find Google emoji as text <br>
                        "<span class='emojitxt'>😎</span>unicode" to find Unicode of your emoji<br>
                        "<span class='emojitxt'>😎</span>details" to find details of emoji<br>
                        'allGoogle' to find Google svg emoji file <br>
                        'allGooglesvg' to find all available SVG files for Google Noto Emojis <br>
                         'allApple' to find all available PNG files for Apple Emojis <br>
                         'allTwitter' to find all available PNG files for Twitter Emojis <br>
                         'allFacebook' to find all available PNG files for Facebook Emojis <br>
                         'allAnimated' to find all available WEBP files for Google Noto Animated Emojis <br>
                         'allYouTube' to find all available SVG files for YouTube Comment Emojis <br>
                         'Help' to load this details.
                    </p>`
        }

        function findUnicodefromArray (u) {
            const found = qualifiedEmojisArray.find(obj => obj.preview === u);
            const code = found.unicode
            return code;
        }

        function findEmojiforUnicode (u) {
            const found = qualifiedEmojisArray.find(obj => obj.unicode === u);
            const x = found.preview
            loading.innerHTML = ''
            emojiList.innerHTML = `<p class='mytxt'>Emoji for your unicode (${u}) is <br><span class='bigtxt'>${(x)}</span></p>`
        }

        function getEmojiDetails (w){

            const found = qualifiedEmojisArray.find(obj => obj.preview === w);
            const name = found.name
            const code = found.unicode
            const status = found.status
            const v = found.v

            errorAlert.innerHTML = "";
            loading.innerHTML = ''
            emojiList.innerHTML = `<p class='mytxt'>Emoji deatails for "<span class='emojitxt'>${w}</span>"<br>
                                    Name : ${name} <br>
                                    Version : ${v} <br>
                                    Status : ${status} <br>
                                    Unicode : ${code} <br>
                                    Preview (Google) : <span class='emojitxt'>${w}</span><br>
                                    Previe (Your Device) : ${w}</p>`
        }

        function getAllEmojiCombinations (para) {
        const x = convertEmojiToHex(para , 'lower' , '-' )

        if (`${x}` in emojiKitchenJSON) {
            const result = emojiKitchenJSON[`${x}`]
            console.log(result);

            const myanchor0 = document.createElement('a')
                        myanchor0.setAttribute('target' , '_blank')             

            const normalemoji= document.createElement("img");
                    normalemoji.setAttribute("src", `${iamcalRootURL}/img-google-136/${x}.png`);
                    normalemoji.onerror = function() {
                                    this.style.display = "none";
                                }
                    normalemoji.setAttribute('class' , 'multipleEmoji')
                    normalemoji.setAttribute('alt' , `${x}.png`)

                    myanchor0.setAttribute('href', normalemoji.getAttribute('src'));
                    emojiList.appendChild(myanchor0);
                    myanchor0.appendChild(normalemoji);

            const myanchor1 = document.createElement('a')
                    myanchor1.setAttribute('target' , '_blank')             

            const animatedemoji= document.createElement("img");
                    animatedemoji.setAttribute("src", `${notoanimatedRootURL}/${x}/512.gif`);
                    animatedemoji.onerror = function() {
                                    this.style.display = "none";
                                }
                    animatedemoji.setAttribute('class' , 'multipleEmoji')
                    animatedemoji.setAttribute('alt' , `${x}-512.gif`)

                    myanchor1.setAttribute('href', animatedemoji.getAttribute('src'));
                    emojiList.appendChild(myanchor1);
                    myanchor1.appendChild(animatedemoji);
        
            for (let i = 0; i < result.length ; i++) {
                    const potentialDate = result[i].date
                    const leftEmoji = adjustStringNew(result[i].leftEmoji)
                    const rightEmoji = adjustStringNew(result[i].rightEmoji)
                    const myUrl = `${gboardRootURL}/${potentialDate}/u${leftEmoji}/u${leftEmoji}_u${rightEmoji}.png`

                    const myanchor = document.createElement('a')
                                    myanchor.setAttribute('target' , '_blank')

                    const myemoji = document.createElement("img");
                                    myemoji.setAttribute("src", myUrl);
                                    myemoji.setAttribute('class' , 'multipleEmoji')
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
                    const myUrl = `${gboardRootURL}/${potentialDate}/u${leftEmoji}/u${leftEmoji}_u${rightEmoji}.png`

                    const myanchor = document.createElement('a')
                                    myanchor.setAttribute('target' , '_blank')

                    const myemoji = document.createElement("img");
                                    myemoji.setAttribute("src", myUrl);
                                    myemoji.setAttribute('class' , 'singleEmoji')
                                    myemoji.setAttribute('alt' , `u${leftEmoji}_u${rightEmoji}.png`)

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
                const myUrl = `${gboardRootURL}/${potentialDate}/u${leftEmoji}/u${leftEmoji}_u${rightEmoji}.png`

                    const myP = document.createElement('p')
                    const myanchor = document.createElement('a')
                                    myanchor.setAttribute('target' , '_blank')

                    const myemoji = document.createElement("img");
                                    myemoji.setAttribute("src", myUrl);
                                    myemoji.setAttribute('class' , 'singleEmoji')
                                    myemoji.setAttribute('alt' , `u${leftEmoji}_u${rightEmoji}.png`)

                    myP.innerHTML = `<p class='googleemojitxt'>${convertHexToEmoji(leftEmoji)}<span class='mytxt'>+</span>${convertHexToEmoji(rightEmoji)}</p>`                
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

                const myanchor = document.createElement('a')
                const myemoji= document.createElement("img");
                    if (e === 'png'){
                        myemoji.setAttribute("src", `${iamcalRootURL}/img-google-136/${adjustString(eimg , 'lower' , '-')}.png`)
                    }
                    if (e === 'svg'){
                        myemoji.setAttribute("src", `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/emoji_u${adjustString(eimg , 'lower' , '_')}.svg`)
                    }
                    myemoji.onerror = function() {
                                    this.style.display = "none";
                                }
                    myemoji.setAttribute('class' , 'multipleEmoji')                        
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

        function getAllLocalEmojistxt () {
            let output = '';
            for (let i = 0; i < qualifiedEmojis.length; i++) {
            const emojitxt = qualifiedEmojis[i];
                        output += `${emojitxt}`
                        loading.innerHTML = `` ;
                        emojiList.innerHTML = `<p style='font-size: 5em;'>${output}</p>` ;
            }
        }

        function getAllEmojis (x) {
            let output = '';
            for (let i = 0; i < allemojiJSON.emojis.length ; i++) {

                const eimg = allemojiJSON.emojis[i].unicode
                const p = adjustString(eimg , 'lower' , '-')
                const appleemojiURL = `${iamcalRootURL}/img-apple-160/${p}.png`
                const twitteremojiURL = `${iamcalRootURL}/img-twitter-72/${p}.png`
                const facebookemojiURL = `${iamcalRootURL}/img-facebook-96/${p}.png`

                const myanchor = document.createElement('a')
                const myemoji= document.createElement("img");
                        if (x === 'apple'){             
                                myemoji.setAttribute("src", `${appleemojiURL}`)                   
                                myemoji.setAttribute('alt', `Apple-${p}.png`)               
                        }
                        if (x === 'twitter'){
                                myemoji.setAttribute("src", `${twitteremojiURL}`)
                                myemoji.setAttribute('alt', `Twitter-${p}.png`)    
                        }
                        if (x === 'facebook'){
                                myemoji.setAttribute("src", `${facebookemojiURL}`)
                                myemoji.setAttribute('alt', `Facebook-${p}.png`)
                        }
                        myemoji.onerror = function() {
                                    this.style.display = "none";
                                }
                        myemoji.setAttribute('class' , 'multipleEmoji')                       
                        myemoji.setAttribute('loading' , 'lazy') 
                        myanchor.setAttribute('href', myemoji.getAttribute('src'));
                        myanchor.setAttribute('target' , '_blank')
                    emojiList.appendChild(myanchor);                               
                    myanchor.appendChild(myemoji);  
                    loading.innerHTML = `` ;
            }        
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
                                myemoji.setAttribute('class' , 'multipleEmoji')
                                myemoji.setAttribute('alt' , `${emojiId}.svg`)
                                myemoji.setAttribute('title' , `${emojiId}`)
                                myemoji.setAttribute('loading' , 'lazy')                                
                        emojiList.appendChild(myemoji); 
                        loading.innerHTML = `` ;
                    }
                }
                )
        }

        function getSingleEmoji (para , y) {

            let slice1 = removeLastPart(para , y);
            let x = convertEmojiToHex(slice1 , 'lower' , '-')
        
            let q = findUnicodefromArray(slice1);            
            const p = adjustString(q , 'lower' , '_')

            const svgemojiURL = `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/emoji_u${p}.svg`
            const pngemojiURL = `${iamcalRootURL}/img-google-136/${x}.png`
            const appleemojiURL = `${iamcalRootURL}/img-apple-160/${x}.png`
            const twitteremojiURL = `${iamcalRootURL}/img-twitter-72/${x}.png`
            const facebookemojiURL = `${iamcalRootURL}/img-facebook-96/${x}.png`

            const myanchor = document.createElement('a')
            const fullemoji= document.createElement("img");
                if (y === 'png'){
                            fullemoji.setAttribute('src', `${pngemojiURL}`);
                            fullemoji.setAttribute('alt' , `${x}.png`)
                } if (y === 'svg'){
                            fullemoji.setAttribute('src', `${svgemojiURL}`);
                            fullemoji.setAttribute('alt' , `${p}.svg`)
                } if (y === 'Apple'){             
                            fullemoji.setAttribute('src', `${appleemojiURL}`);
                            fullemoji.setAttribute('alt' , `Apple-${x}.png`)                    
                } if (y === 'Twitter'){
                            fullemoji.setAttribute('src', `${twitteremojiURL}`);
                            fullemoji.setAttribute('alt' , `Twitter-${x}.png`)
                } if (y === 'Facebook'){
                            fullemoji.setAttribute('src', `${facebookemojiURL}`);
                            fullemoji.setAttribute('alt' , `Facebook-${x}.png`)
                }
                    fullemoji.setAttribute('class' , 'singleEmoji')
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

            if (found) {
            const myanchor = document.createElement('a')
            const fullemoji= document.createElement("img");
                if (y === 'gif'){
                            fullemoji.setAttribute("src", `${notoanimatedRootURL}/${x}/512.gif`);
                } if (y === 'webp'){
                            fullemoji.setAttribute("src", `${notoanimatedRootURL}/${x}/512.webp`);
                }
                
                    fullemoji.setAttribute('class' , 'singleEmoji')
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

        function getAllNotoAnimatedEmojis () {
                let output = '';
                for (let i = 0; i < emojiAnimatedJSON.icons.length ; i++) {
                    const code = emojiAnimatedJSON.icons[i].codepoint
                    const staticemojiURL = `${notoanimatedRootURL}/${code}/512.png`
                    const animatedemojiURL = `${notoanimatedRootURL}/${code}/512.webp`
                    const myanchor = document.createElement('a')
                    const myemoji= document.createElement("img");
                        myemoji.setAttribute("src", staticemojiURL);
                        myemoji.setAttribute("data-animated", animatedemojiURL);
                        myemoji.setAttribute("data-static", staticemojiURL);                                              
                        myemoji.setAttribute('class' , 'multipleEmoji')                      
                        myemoji.setAttribute('loading' , 'lazy')                            
                        myemoji.setAttribute('alt' , `${code}-512.webp`)                            
                        myemoji.addEventListener("mouseover", function() {
                            this.setAttribute("src", this.getAttribute("data-animated"));
                        });
                        myemoji.addEventListener("mouseout", function() {
                            this.setAttribute("src", this.getAttribute("data-static"));
                        });
                        
                        myanchor.setAttribute('href', `${notoanimatedRootURL}/${code}/512.webp`);
                        myanchor.setAttribute('target' , '_blank')
                        
                    emojiList.appendChild(myanchor);                               
                    myanchor.appendChild(myemoji);  
                    loading.innerHTML = `` ;  }
        }    

        function getinputData() {
        
            emojiList.innerHTML = ''
            errorAlert.innerHTML = ''
            loading.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse h1-title"></i>`
                const x = document.getElementById('inputURL').value;                 
                const separated = x.split('+')
                const a = separated[0]
                const b = separated[1]          
                const valida = qualifiedEmojis.includes(a)
                const validb = qualifiedEmojis.includes(b)  
                // validA && validB = check if both emojis have emoji kitchen 

                if (x === '') {
                    loading.innerHTML = ''
                    errorAlert.innerHTML = `Enter something to search <br>Try this "<span class='emojitxt'>😀</span>+<span class='emojitxt'>😎</span>"`
                }   
                else if (qualifiedEmojis.includes(x)) {
                        getAllEmojiCombinations(x)
                    }
                else if (qualifiedUnicodes.includes(x)) {
                        findEmojiforUnicode(x)
                    }   
                else if (valida && validb) {
                        getEmojiCombination(a , b);
                }
                else if (x === 'Random') { 
                        getRandomCombination()
                }
                else if (x === 'Help') { 
                        getHELP()
                }
                else if (x === 'allGooglepng') {
                        getAllGoogleEmojisPngSvg('png')
                }
                else if (x === 'allGooglesvg') {
                        getAllGoogleEmojisPngSvg('svg')
                }
                else if (x === 'allGoogle') {  
                        getAllGoogleEmojistxt()
                }
                else if (x === 'allTxt') {  
                        getAllLocalEmojistxt()
                }
                else if (x === 'allApple') {
                        getAllEmojis('apple')
                }
                else if (x === 'allTwitter') {
                        getAllEmojis('twitter')
                }
                else if (x === 'allFacebook') {
                        getAllEmojis('facebook')
                }
                else if (x === 'allYouTube') {
                        getAllYouTubeEmojis()
                }
                else if (x === 'allAnimated'){   
                        getAllNotoAnimatedEmojis()
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
                else if (uniArray.includes(x)) {
                    const w =  removeLastPart(x , 'unicode')
                    loading.innerHTML = ''
                    emojiList.innerHTML = `<p class='mytxt'>Unicode for <span class='emojitxt'>${w}</span> emoji is ${convertEmojiToHex(w)}</p>`
                }
                else if (localRenderArray.includes(x)) {
                    const w =  removeLastPart(x , 'preview')
                    loading.innerHTML = ''
                    emojiList.innerHTML = `<p class='bigtxt'>${w}</p>`
                } 
                else if (txtArray.includes(x)) {
                    const w =  removeLastPart(x , 'txt')
                    loading.innerHTML = ''
                    emojiList.innerHTML = `<p style='font-size: 10em;'>${w}</p>`
                } 
                else {
                    loading.innerHTML = ''
                    errorAlert.innerHTML = `Invalid Input`
                    }
            }          

        // Event Listners URL btn
        URLsubmitbtn.addEventListener("click",getinputData),inputURL.addEventListener("keypress",(function(t){"Enter"===t.key&&(t.preventDefault(),URLsubmitbtn.click())}));    
    } 
    catch (error) {
        console.error(error.name + " : " + error.message);
        loading.innerHTML = ''
        emojiList.innerHTML = ''
        errorAlert.innerHTML = `Something Went Wrong! <br>(${error.name} : ${error.message})`
    }})(); 
//separated v2.1 on gh
// added local previews 