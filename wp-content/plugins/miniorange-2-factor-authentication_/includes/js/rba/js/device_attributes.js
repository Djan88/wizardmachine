var jsReady=!1;function isReady(){return jsReady}function pageInit(){jsReady=!0;var a=setInterval(function(){checkFontsExist&&(clearInterval(a),clearTimeout(b),fetch_client_whorls())},50),b=setTimeout(function(){clearInterval(a);fetch_client_whorls()},1E3)}var fontlist="",checkFontsExist=!1,fingerprint,countryName,countryCode,latitude,longitude,ip,timeZone,region,regionCode,postalCode,city,continent,continentCode,isp;
function populateFontList(a){var b=0,c=0,e;for(e in a){var d=a[e],d=d.replace(/^\s\s*/,"").replace(/\s\s*$/,"");d.match(/[_\-\s]Italic$/)||d.match(/[_\-\s](Demi)?[Bb]old$/)||d.match(/[_\-\s]Medium$/)||d.match(/[_\-\s](Ultra)?[Ll]ight$/)||d.match(/[_\-\s]Condensed$/)||(d=d.replace(/\s*Regular$/,""),c++);fontlist=0==b?d:fontlist+(", "+d);b++}checkFontsExist=!0}
function get_browser_attributes(){var a=new ClientJS,b=a.getUserAgent();updateJSONObject("browser.useragent",b);b=a.getScreenPrint();updateJSONObject("browser.screenprint",b);fingerprint=a.getFingerprint();updateJSONObject("device.fingerprint",fingerprint);b=a.getPlugins();updateJSONObject("browser.plugins",b);b=a.isLocalStorage();updateJSONObject("browser.hasLocalStorage",b);b=a.isSessionStorage();updateJSONObject("browser.hasSessionStorage",b);b=a.getTimeZone();updateJSONObject("browser.timezone",
b);b=a.getLanguage();updateJSONObject("browser.language",b);b=a.getSystemLanguage();updateJSONObject("browser.sytemLanguage",b);b=a.isCookie();updateJSONObject("browser.hasCookie",b);b=a.getCanvasPrint();updateJSONObject("browser.canvasPrint",b);var c=a.isMobile(),b=a.getBrowser();updateJSONObject("browser.type",b);0==c?($("#getDeviceType").text("Laptop"),updateJSONObject("device.type","Laptop")):updateJSONObject("device.type","Mobile");updateJSONObject("time.currentTime",(new Date).toTimeString());
c="";a.isMobile()?(a.isMobileAndroid()?c="Android":a.isMobileOpera()?c="Opera":a.isMobileWindows()?c="Windows":a.isMobileBlackBerry()?c="BlackBerry":a.isMobileIOS()&&(a.isIphone()?c="iPhone":a.isIpad()?c="iPad":a.isIpod()&&(c="iPod")),c=c+" "+a.getOSVersion()+" / "+a.getBrowser()):c=a.getOS()+" "+a.getOSVersion()+" / "+a.getBrowser();updateJSONObject("profile.name",c);$("#title-fingerprint").text(fingerprint);$("#getBrowser").text(b);if($("#morba_loginform").length){$("#miniorange_rba_attribures").val(JSON.stringify(rbaAttributes.attributes));$("#morba_loginform").submit();}}
function hasFlash(){try{if(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))return!0}catch(a){if(navigator.mimeTypes&&void 0!=navigator.mimeTypes["application/x-shockwave-flash"]&&navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)return!0}return!1}
var onSuccess=function(a){countryName=a.country.names.en;countryCode=a.country.iso_code;latitude=a.location.latitude;longitude=a.location.longitude;ip=a.traits.ip_address;timeZone=a.location.time_zone;region=a.subdivisions[0].names.en;regionCode=a.subdivisions[0].iso_code;postalCode=a.postal.code;city=a.city.names.en;continent=a.continent.names.en;continentCode=a.continent.code;isp=a.traits.isp;updateJSONObject("location.countryName",countryName);updateJSONObject("location.countryCode",countryCode);
updateJSONObject("location.latitude",latitude);updateJSONObject("location.longitude",longitude);updateJSONObject("location.ip",ip);updateJSONObject("location.timeZone",timeZone);updateJSONObject("location.region",region);updateJSONObject("location.regionCode",regionCode);updateJSONObject("location.postalCode",postalCode);updateJSONObject("location.city",city);updateJSONObject("location.continent",continent);updateJSONObject("location.continentCode",continentCode);updateJSONObject("location.isp",isp);},
onError=function(a){console.log("Couldn't get the location.");updateJSONObject('location.ip',$('#mo_client_ip').val());};function fetch_client_whorls(){$("#message").hide();hasFlash()&&checkFontsExist&&updateJSONObject("system.fonts",fontlist);get_browser_attributes();/*geoip2.insights(onSuccess,onError);*/set_dom_storage()}function updateJSONObject(a,b){rbaAttributes.attributes.push({attrName:a,attrValue:b})}
function set_dom_storage(){try{localStorage.miniorange="yea",sessionStorage.miniorange="yea"}catch(a){}};