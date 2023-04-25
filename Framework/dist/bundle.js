/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/azureai.ts":
/*!************************!*\
  !*** ./src/azureai.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AzureAi = void 0;
var lapppal_1 = __webpack_require__(/*! ./lapppal */ "./src/lapppal.ts");
var webm_to_wav_converter_1 = __webpack_require__(/*! webm-to-wav-converter */ "./node_modules/webm-to-wav-converter/index.js");
var languagetovoicemapping_1 = __webpack_require__(/*! ./languagetovoicemapping */ "./src/languagetovoicemapping.ts");
var AzureAi = (function () {
    function AzureAi() {
        var config = document.getElementById("config").value;
        if (config !== "") {
            var json = JSON.parse(config);
            this._openaiurl = json.openaiurl;
            this._openaipikey = json.openaipikey;
            this._ttsregion = json.ttsregion;
            this._ttsapikey = json.ttsapikey;
        }
        this._inProgress = false;
    }
    AzureAi.prototype.getOpenAiAnswer = function (prompt) {
        return __awaiter(this, void 0, void 0, function () {
            var conversations, conversation, m, repsonse, json, answer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._openaiurl === undefined || this._inProgress || prompt === "")
                            return [2, ""];
                        this._inProgress = true;
                        conversations = document.getElementById("conversations").value;
                        lapppal_1.LAppPal.printMessage(prompt);
                        conversation = conversations + "\n\n## " + prompt;
                        m = {
                            "prompt": "##".concat(conversation, "\n\n"),
                            "max_tokens": 300,
                            "temperature": 0,
                            "frequency_penalty": 0,
                            "presence_penalty": 0,
                            "top_p": 1,
                            "stop": ["#", ";"]
                        };
                        return [4, fetch(this._openaiurl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'api-key': this._openaipikey,
                                },
                                body: JSON.stringify(m)
                            })];
                    case 1:
                        repsonse = _a.sent();
                        return [4, repsonse.json()];
                    case 2:
                        json = _a.sent();
                        answer = json.choices[0].text;
                        lapppal_1.LAppPal.printMessage(answer);
                        document.getElementById("reply").value = answer;
                        document.getElementById("conversations").value = conversations + "\n\n" + answer;
                        return [2, answer];
                }
            });
        });
    };
    AzureAi.prototype.getSpeechUrl = function (language, text) {
        return __awaiter(this, void 0, void 0, function () {
            var requestHeaders, voice, ssml, response, blob, url, audio;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._ttsregion === undefined)
                            return [2];
                        requestHeaders = new Headers();
                        requestHeaders.set('Content-Type', 'application/ssml+xml');
                        requestHeaders.set('X-Microsoft-OutputFormat', 'riff-8khz-16bit-mono-pcm');
                        requestHeaders.set('Ocp-Apim-Subscription-Key', this._ttsapikey);
                        voice = languagetovoicemapping_1.LANGUAGE_TO_VOICE_MAPPING_LIST.find(function (c) { return c.voice.startsWith(language) && c.IsMale === false; }).voice;
                        ssml = "\n<speak version='1.0' xml:lang='".concat(language, "'>\n  <voice xml:lang='").concat(language, "' xml:gender='Female' name='").concat(voice, "'>\n    ").concat(text, "\n  </voice>\n</speak>");
                        return [4, fetch("https://".concat(this._ttsregion, ".tts.speech.microsoft.com/cognitiveservices/v1"), {
                                method: 'POST',
                                headers: requestHeaders,
                                body: ssml
                            })];
                    case 1:
                        response = _a.sent();
                        return [4, response.blob()];
                    case 2:
                        blob = _a.sent();
                        url = window.URL.createObjectURL(blob);
                        audio = document.getElementById('voice');
                        audio.src = url;
                        lapppal_1.LAppPal.printMessage("Load Text to Speech url");
                        this._inProgress = false;
                        return [2, url];
                }
            });
        });
    };
    AzureAi.prototype.getTextFromSpeech = function (language, data) {
        return __awaiter(this, void 0, void 0, function () {
            var requestHeaders, wav, response, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._ttsregion === undefined)
                            return [2, ""];
                        lapppal_1.LAppPal.printMessage(language);
                        requestHeaders = new Headers();
                        requestHeaders.set('Accept', 'application/json;text/xml');
                        requestHeaders.set('Content-Type', 'audio/wav; codecs=audio/pcm; samplerate=16000');
                        requestHeaders.set('Ocp-Apim-Subscription-Key', this._ttsapikey);
                        return [4, (0, webm_to_wav_converter_1.getWaveBlob)(data, false)];
                    case 1:
                        wav = _a.sent();
                        return [4, fetch("https://".concat(this._ttsregion, ".stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=").concat(language), {
                                method: 'POST',
                                headers: requestHeaders,
                                body: wav
                            })];
                    case 2:
                        response = _a.sent();
                        return [4, response.json()];
                    case 3:
                        json = _a.sent();
                        return [2, json.DisplayText];
                }
            });
        });
    };
    return AzureAi;
}());
exports.AzureAi = AzureAi;


/***/ }),

/***/ "./src/languagetovoicemapping.ts":
/*!***************************************!*\
  !*** ./src/languagetovoicemapping.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LANGUAGE_TO_VOICE_MAPPING_LIST = void 0;
exports.LANGUAGE_TO_VOICE_MAPPING_LIST = [
    { 'voice': 'af-ZA-AdriNeural', 'IsMale': false },
    { 'voice': 'af-ZA-WillemNeural', 'IsMale': true },
    { 'voice': 'am-ET-AmehaNeural', 'IsMale': true },
    { 'voice': 'am-ET-MekdesNeural', 'IsMale': false },
    { 'voice': 'ar-AE-FatimaNeural', 'IsMale': false },
    { 'voice': 'ar-AE-HamdanNeural', 'IsMale': true },
    { 'voice': 'ar-BH-AliNeural', 'IsMale': true },
    { 'voice': 'ar-BH-LailaNeural', 'IsMale': false },
    { 'voice': 'ar-DZ-AminaNeural', 'IsMale': false },
    { 'voice': 'ar-DZ-IsmaelNeural', 'IsMale': true },
    { 'voice': 'ar-EG-SalmaNeural', 'IsMale': false },
    { 'voice': 'ar-EG-ShakirNeural', 'IsMale': true },
    { 'voice': 'ar-IQ-BasselNeural', 'IsMale': true },
    { 'voice': 'ar-IQ-RanaNeural', 'IsMale': false },
    { 'voice': 'ar-JO-SanaNeural', 'IsMale': false },
    { 'voice': 'ar-JO-TaimNeural', 'IsMale': true },
    { 'voice': 'ar-KW-FahedNeural', 'IsMale': true },
    { 'voice': 'ar-KW-NouraNeural', 'IsMale': false },
    { 'voice': 'ar-LB-LaylaNeural', 'IsMale': false },
    { 'voice': 'ar-LB-RamiNeural', 'IsMale': true },
    { 'voice': 'ar-LY-ImanNeural', 'IsMale': false },
    { 'voice': 'ar-LY-OmarNeural', 'IsMale': true },
    { 'voice': 'ar-MA-JamalNeural', 'IsMale': true },
    { 'voice': 'ar-MA-MounaNeural', 'IsMale': false },
    { 'voice': 'ar-OM-AbdullahNeural', 'IsMale': true },
    { 'voice': 'ar-OM-AyshaNeural', 'IsMale': false },
    { 'voice': 'ar-QA-AmalNeural', 'IsMale': false },
    { 'voice': 'ar-QA-MoazNeural', 'IsMale': true },
    { 'voice': 'ar-SA-HamedNeural', 'IsMale': true },
    { 'voice': 'ar-SA-ZariyahNeural', 'IsMale': false },
    { 'voice': 'ar-SY-AmanyNeural', 'IsMale': false },
    { 'voice': 'ar-SY-LaithNeural', 'IsMale': true },
    { 'voice': 'ar-TN-HediNeural', 'IsMale': true },
    { 'voice': 'ar-TN-ReemNeural', 'IsMale': false },
    { 'voice': 'ar-YE-MaryamNeural', 'IsMale': false },
    { 'voice': 'ar-YE-SalehNeural', 'IsMale': true },
    { 'voice': 'az-AZ-BabekNeural', 'IsMale': true },
    { 'voice': 'az-AZ-BanuNeural', 'IsMale': false },
    { 'voice': 'bg-BG-BorislavNeural', 'IsMale': true },
    { 'voice': 'bg-BG-KalinaNeural', 'IsMale': false },
    { 'voice': 'bn-BD-NabanitaNeural', 'IsMale': false },
    { 'voice': 'bn-BD-PradeepNeural', 'IsMale': true },
    { 'voice': 'bn-IN-BashkarNeural', 'IsMale': true },
    { 'voice': 'bn-IN-TanishaaNeural', 'IsMale': false },
    { 'voice': 'bs-BA-GoranNeural', 'IsMale': true },
    { 'voice': 'bs-BA-VesnaNeural', 'IsMale': false },
    { 'voice': 'ca-ES-AlbaNeural', 'IsMale': false },
    { 'voice': 'ca-ES-EnricNeural', 'IsMale': true },
    { 'voice': 'ca-ES-JoanaNeural', 'IsMale': false },
    { 'voice': 'cs-CZ-AntoninNeural', 'IsMale': true },
    { 'voice': 'cs-CZ-VlastaNeural', 'IsMale': false },
    { 'voice': 'cy-GB-AledNeural', 'IsMale': true },
    { 'voice': 'cy-GB-NiaNeural', 'IsMale': false },
    { 'voice': 'da-DK-ChristelNeural', 'IsMale': false },
    { 'voice': 'da-DK-JeppeNeural', 'IsMale': true },
    { 'voice': 'de-AT-IngridNeural', 'IsMale': false },
    { 'voice': 'de-AT-JonasNeural', 'IsMale': true },
    { 'voice': 'de-CH-JanNeural', 'IsMale': true },
    { 'voice': 'de-CH-LeniNeural', 'IsMale': false },
    { 'voice': 'de-DE-AmalaNeural', 'IsMale': false },
    { 'voice': 'de-DE-BerndNeural', 'IsMale': true },
    { 'voice': 'de-DE-ChristophNeural', 'IsMale': true },
    { 'voice': 'de-DE-ConradNeural', 'IsMale': true },
    { 'voice': 'de-DE-ElkeNeural', 'IsMale': false },
    { 'voice': 'de-DE-GiselaNeural', 'IsMale': false },
    { 'voice': 'de-DE-KasperNeural', 'IsMale': true },
    { 'voice': 'de-DE-KatjaNeural', 'IsMale': false },
    { 'voice': 'de-DE-KillianNeural', 'IsMale': true },
    { 'voice': 'de-DE-KlarissaNeural', 'IsMale': false },
    { 'voice': 'de-DE-KlausNeural', 'IsMale': true },
    { 'voice': 'de-DE-LouisaNeural', 'IsMale': false },
    { 'voice': 'de-DE-MajaNeural', 'IsMale': false },
    { 'voice': 'de-DE-RalfNeural', 'IsMale': true },
    { 'voice': 'de-DE-TanjaNeural', 'IsMale': false },
    { 'voice': 'el-GR-AthinaNeural', 'IsMale': false },
    { 'voice': 'el-GR-NestorasNeural', 'IsMale': true },
    { 'voice': 'en-AU-AnnetteNeural', 'IsMale': false },
    { 'voice': 'en-AU-CarlyNeural', 'IsMale': false },
    { 'voice': 'en-AU-DarrenNeural', 'IsMale': true },
    { 'voice': 'en-AU-DuncanNeural', 'IsMale': true },
    { 'voice': 'en-AU-ElsieNeural', 'IsMale': false },
    { 'voice': 'en-AU-FreyaNeural', 'IsMale': false },
    { 'voice': 'en-AU-JoanneNeural', 'IsMale': false },
    { 'voice': 'en-AU-KenNeural', 'IsMale': true },
    { 'voice': 'en-AU-KimNeural', 'IsMale': false },
    { 'voice': 'en-AU-NatashaNeural', 'IsMale': false },
    { 'voice': 'en-AU-NeilNeural', 'IsMale': true },
    { 'voice': 'en-AU-TimNeural', 'IsMale': true },
    { 'voice': 'en-AU-TinaNeural', 'IsMale': false },
    { 'voice': 'en-AU-WilliamNeural', 'IsMale': true },
    { 'voice': 'en-CA-ClaraNeural', 'IsMale': false },
    { 'voice': 'en-CA-LiamNeural', 'IsMale': true },
    { 'voice': 'en-GB-AbbiNeural', 'IsMale': false },
    { 'voice': 'en-GB-AlfieNeural', 'IsMale': true },
    { 'voice': 'en-GB-BellaNeural', 'IsMale': false },
    { 'voice': 'en-GB-ElliotNeural', 'IsMale': true },
    { 'voice': 'en-GB-EthanNeural', 'IsMale': true },
    { 'voice': 'en-GB-HollieNeural', 'IsMale': false },
    { 'voice': 'en-GB-LibbyNeural', 'IsMale': false },
    { 'voice': 'en-GB-MaisieNeural', 'IsMale': false },
    { 'voice': 'en-GB-NoahNeural', 'IsMale': true },
    { 'voice': 'en-GB-OliverNeural', 'IsMale': true },
    { 'voice': 'en-GB-OliviaNeural', 'IsMale': false },
    { 'voice': 'en-GB-RyanNeural', 'IsMale': true },
    { 'voice': 'en-GB-SoniaNeural', 'IsMale': false },
    { 'voice': 'en-GB-ThomasNeural', 'IsMale': true },
    { 'voice': 'en-HK-SamNeural', 'IsMale': true },
    { 'voice': 'en-HK-YanNeural', 'IsMale': false },
    { 'voice': 'en-IE-ConnorNeural', 'IsMale': true },
    { 'voice': 'en-IE-EmilyNeural', 'IsMale': false },
    { 'voice': 'en-IN-NeerjaNeural', 'IsMale': false },
    { 'voice': 'en-IN-PrabhatNeural', 'IsMale': true },
    { 'voice': 'en-KE-AsiliaNeural', 'IsMale': false },
    { 'voice': 'en-KE-ChilembaNeural', 'IsMale': true },
    { 'voice': 'en-NG-AbeoNeural', 'IsMale': true },
    { 'voice': 'en-NG-EzinneNeural', 'IsMale': false },
    { 'voice': 'en-NZ-MitchellNeural', 'IsMale': true },
    { 'voice': 'en-NZ-MollyNeural', 'IsMale': false },
    { 'voice': 'en-PH-JamesNeural', 'IsMale': true },
    { 'voice': 'en-PH-RosaNeural', 'IsMale': false },
    { 'voice': 'en-SG-LunaNeural', 'IsMale': false },
    { 'voice': 'en-SG-WayneNeural', 'IsMale': true },
    { 'voice': 'en-TZ-ElimuNeural', 'IsMale': true },
    { 'voice': 'en-TZ-ImaniNeural', 'IsMale': false },
    { 'voice': 'en-US-AmberNeural', 'IsMale': false },
    { 'voice': 'en-US-AnaNeural', 'IsMale': false },
    { 'voice': 'en-US-AriaNeural', 'IsMale': false },
    { 'voice': 'en-US-AshleyNeural', 'IsMale': false },
    { 'voice': 'en-US-BrandonNeural', 'IsMale': true },
    { 'voice': 'en-US-ChristopherNeural', 'IsMale': true },
    { 'voice': 'en-US-CoraNeural', 'IsMale': false },
    { 'voice': 'en-US-DavisNeural', 'IsMale': true },
    { 'voice': 'en-US-ElizabethNeural', 'IsMale': false },
    { 'voice': 'en-US-EricNeural', 'IsMale': true },
    { 'voice': 'en-US-GuyNeural', 'IsMale': true },
    { 'voice': 'en-US-JacobNeural', 'IsMale': true },
    { 'voice': 'en-US-JaneNeural', 'IsMale': false },
    { 'voice': 'en-US-JasonNeural', 'IsMale': true },
    { 'voice': 'en-US-JennyMultilingualNeural', 'IsMale': false },
    { 'voice': 'en-US-JennyNeural', 'IsMale': false },
    { 'voice': 'en-US-MichelleNeural', 'IsMale': false },
    { 'voice': 'en-US-MonicaNeural', 'IsMale': false },
    { 'voice': 'en-US-NancyNeural', 'IsMale': false },
    { 'voice': 'en-US-RogerNeural', 'IsMale': true },
    { 'voice': 'en-US-SaraNeural', 'IsMale': false },
    { 'voice': 'en-US-SteffanNeural', 'IsMale': true },
    { 'voice': 'en-US-TonyNeural', 'IsMale': true },
    { 'voice': 'en-ZA-LeahNeural', 'IsMale': false },
    { 'voice': 'en-ZA-LukeNeural', 'IsMale': true },
    { 'voice': 'es-AR-ElenaNeural', 'IsMale': false },
    { 'voice': 'es-AR-TomasNeural', 'IsMale': true },
    { 'voice': 'es-BO-MarceloNeural', 'IsMale': true },
    { 'voice': 'es-BO-SofiaNeural', 'IsMale': false },
    { 'voice': 'es-CL-CatalinaNeural', 'IsMale': false },
    { 'voice': 'es-CL-LorenzoNeural', 'IsMale': true },
    { 'voice': 'es-CO-GonzaloNeural', 'IsMale': true },
    { 'voice': 'es-CO-SalomeNeural', 'IsMale': false },
    { 'voice': 'es-CR-JuanNeural', 'IsMale': true },
    { 'voice': 'es-CR-MariaNeural', 'IsMale': false },
    { 'voice': 'es-CU-BelkysNeural', 'IsMale': false },
    { 'voice': 'es-CU-ManuelNeural', 'IsMale': true },
    { 'voice': 'es-DO-EmilioNeural', 'IsMale': true },
    { 'voice': 'es-DO-RamonaNeural', 'IsMale': false },
    { 'voice': 'es-EC-AndreaNeural', 'IsMale': false },
    { 'voice': 'es-EC-LuisNeural', 'IsMale': true },
    { 'voice': 'es-ES-AbrilNeural', 'IsMale': false },
    { 'voice': 'es-ES-AlvaroNeural', 'IsMale': true },
    { 'voice': 'es-ES-ArnauNeural', 'IsMale': true },
    { 'voice': 'es-ES-DarioNeural', 'IsMale': true },
    { 'voice': 'es-ES-EliasNeural', 'IsMale': true },
    { 'voice': 'es-ES-ElviraNeural', 'IsMale': false },
    { 'voice': 'es-ES-EstrellaNeural', 'IsMale': false },
    { 'voice': 'es-ES-IreneNeural', 'IsMale': false },
    { 'voice': 'es-ES-LaiaNeural', 'IsMale': false },
    { 'voice': 'es-ES-LiaNeural', 'IsMale': false },
    { 'voice': 'es-ES-NilNeural', 'IsMale': true },
    { 'voice': 'es-ES-SaulNeural', 'IsMale': true },
    { 'voice': 'es-ES-TeoNeural', 'IsMale': true },
    { 'voice': 'es-ES-TrianaNeural', 'IsMale': false },
    { 'voice': 'es-ES-VeraNeural', 'IsMale': false },
    { 'voice': 'es-GQ-JavierNeural', 'IsMale': true },
    { 'voice': 'es-GQ-TeresaNeural', 'IsMale': false },
    { 'voice': 'es-GT-AndresNeural', 'IsMale': true },
    { 'voice': 'es-GT-MartaNeural', 'IsMale': false },
    { 'voice': 'es-HN-CarlosNeural', 'IsMale': true },
    { 'voice': 'es-HN-KarlaNeural', 'IsMale': false },
    { 'voice': 'es-MX-BeatrizNeural', 'IsMale': false },
    { 'voice': 'es-MX-CandelaNeural', 'IsMale': false },
    { 'voice': 'es-MX-CarlotaNeural', 'IsMale': false },
    { 'voice': 'es-MX-CecilioNeural', 'IsMale': true },
    { 'voice': 'es-MX-DaliaNeural', 'IsMale': false },
    { 'voice': 'es-MX-GerardoNeural', 'IsMale': true },
    { 'voice': 'es-MX-JorgeNeural', 'IsMale': true },
    { 'voice': 'es-MX-LarissaNeural', 'IsMale': false },
    { 'voice': 'es-MX-LibertoNeural', 'IsMale': true },
    { 'voice': 'es-MX-LucianoNeural', 'IsMale': true },
    { 'voice': 'es-MX-MarinaNeural', 'IsMale': false },
    { 'voice': 'es-MX-NuriaNeural', 'IsMale': false },
    { 'voice': 'es-MX-PelayoNeural', 'IsMale': true },
    { 'voice': 'es-MX-RenataNeural', 'IsMale': false },
    { 'voice': 'es-MX-YagoNeural', 'IsMale': true },
    { 'voice': 'es-NI-FedericoNeural', 'IsMale': true },
    { 'voice': 'es-NI-YolandaNeural', 'IsMale': false },
    { 'voice': 'es-PA-MargaritaNeural', 'IsMale': false },
    { 'voice': 'es-PA-RobertoNeural', 'IsMale': true },
    { 'voice': 'es-PE-AlexNeural', 'IsMale': true },
    { 'voice': 'es-PE-CamilaNeural', 'IsMale': false },
    { 'voice': 'es-PR-KarinaNeural', 'IsMale': false },
    { 'voice': 'es-PR-VictorNeural', 'IsMale': true },
    { 'voice': 'es-PY-MarioNeural', 'IsMale': true },
    { 'voice': 'es-PY-TaniaNeural', 'IsMale': false },
    { 'voice': 'es-SV-LorenaNeural', 'IsMale': false },
    { 'voice': 'es-SV-RodrigoNeural', 'IsMale': true },
    { 'voice': 'es-US-AlonsoNeural', 'IsMale': true },
    { 'voice': 'es-US-PalomaNeural', 'IsMale': false },
    { 'voice': 'es-UY-MateoNeural', 'IsMale': true },
    { 'voice': 'es-UY-ValentinaNeural', 'IsMale': false },
    { 'voice': 'es-VE-PaolaNeural', 'IsMale': false },
    { 'voice': 'es-VE-SebastianNeural', 'IsMale': true },
    { 'voice': 'et-EE-AnuNeural', 'IsMale': false },
    { 'voice': 'et-EE-KertNeural', 'IsMale': true },
    { 'voice': 'eu-ES-AinhoaNeural', 'IsMale': false },
    { 'voice': 'eu-ES-AnderNeural', 'IsMale': true },
    { 'voice': 'fa-IR-DilaraNeural', 'IsMale': false },
    { 'voice': 'fa-IR-FaridNeural', 'IsMale': true },
    { 'voice': 'fi-FI-HarriNeural', 'IsMale': true },
    { 'voice': 'fi-FI-NooraNeural', 'IsMale': false },
    { 'voice': 'fi-FI-SelmaNeural', 'IsMale': false },
    { 'voice': 'fil-PH-AngeloNeural', 'IsMale': true },
    { 'voice': 'fil-PH-BlessicaNeural', 'IsMale': false },
    { 'voice': 'fr-BE-CharlineNeural', 'IsMale': false },
    { 'voice': 'fr-BE-GerardNeural', 'IsMale': true },
    { 'voice': 'fr-CA-AntoineNeural', 'IsMale': true },
    { 'voice': 'fr-CA-JeanNeural', 'IsMale': true },
    { 'voice': 'fr-CA-SylvieNeural', 'IsMale': false },
    { 'voice': 'fr-CH-ArianeNeural', 'IsMale': false },
    { 'voice': 'fr-CH-FabriceNeural', 'IsMale': true },
    { 'voice': 'fr-FR-AlainNeural', 'IsMale': true },
    { 'voice': 'fr-FR-BrigitteNeural', 'IsMale': false },
    { 'voice': 'fr-FR-CelesteNeural', 'IsMale': false },
    { 'voice': 'fr-FR-ClaudeNeural', 'IsMale': true },
    { 'voice': 'fr-FR-CoralieNeural', 'IsMale': false },
    { 'voice': 'fr-FR-DeniseNeural', 'IsMale': false },
    { 'voice': 'fr-FR-EloiseNeural', 'IsMale': false },
    { 'voice': 'fr-FR-HenriNeural', 'IsMale': true },
    { 'voice': 'fr-FR-JacquelineNeural', 'IsMale': false },
    { 'voice': 'fr-FR-JeromeNeural', 'IsMale': true },
    { 'voice': 'fr-FR-JosephineNeural', 'IsMale': false },
    { 'voice': 'fr-FR-MauriceNeural', 'IsMale': true },
    { 'voice': 'fr-FR-YvesNeural', 'IsMale': true },
    { 'voice': 'fr-FR-YvetteNeural', 'IsMale': false },
    { 'voice': 'ga-IE-ColmNeural', 'IsMale': true },
    { 'voice': 'ga-IE-OrlaNeural', 'IsMale': false },
    { 'voice': 'gl-ES-RoiNeural', 'IsMale': true },
    { 'voice': 'gl-ES-SabelaNeural', 'IsMale': false },
    { 'voice': 'gu-IN-DhwaniNeural', 'IsMale': false },
    { 'voice': 'gu-IN-NiranjanNeural', 'IsMale': true },
    { 'voice': 'he-IL-AvriNeural', 'IsMale': true },
    { 'voice': 'he-IL-HilaNeural', 'IsMale': false },
    { 'voice': 'hi-IN-MadhurNeural', 'IsMale': true },
    { 'voice': 'hi-IN-SwaraNeural', 'IsMale': false },
    { 'voice': 'hr-HR-GabrijelaNeural', 'IsMale': false },
    { 'voice': 'hr-HR-SreckoNeural', 'IsMale': true },
    { 'voice': 'hu-HU-NoemiNeural', 'IsMale': false },
    { 'voice': 'hu-HU-TamasNeural', 'IsMale': true },
    { 'voice': 'hy-AM-AnahitNeural', 'IsMale': false },
    { 'voice': 'hy-AM-HaykNeural', 'IsMale': true },
    { 'voice': 'id-ID-ArdiNeural', 'IsMale': true },
    { 'voice': 'id-ID-GadisNeural', 'IsMale': false },
    { 'voice': 'is-IS-GudrunNeural', 'IsMale': false },
    { 'voice': 'is-IS-GunnarNeural', 'IsMale': true },
    { 'voice': 'it-IT-BenignoNeural', 'IsMale': true },
    { 'voice': 'it-IT-CalimeroNeural', 'IsMale': true },
    { 'voice': 'it-IT-CataldoNeural', 'IsMale': true },
    { 'voice': 'it-IT-DiegoNeural', 'IsMale': true },
    { 'voice': 'it-IT-ElsaNeural', 'IsMale': false },
    { 'voice': 'it-IT-FabiolaNeural', 'IsMale': false },
    { 'voice': 'it-IT-FiammaNeural', 'IsMale': false },
    { 'voice': 'it-IT-GianniNeural', 'IsMale': true },
    { 'voice': 'it-IT-ImeldaNeural', 'IsMale': false },
    { 'voice': 'it-IT-IrmaNeural', 'IsMale': false },
    { 'voice': 'it-IT-IsabellaNeural', 'IsMale': false },
    { 'voice': 'it-IT-LisandroNeural', 'IsMale': true },
    { 'voice': 'it-IT-PalmiraNeural', 'IsMale': false },
    { 'voice': 'it-IT-PierinaNeural', 'IsMale': false },
    { 'voice': 'it-IT-RinaldoNeural', 'IsMale': true },
    { 'voice': 'ja-JP-AoiNeural', 'IsMale': false },
    { 'voice': 'ja-JP-DaichiNeural', 'IsMale': true },
    { 'voice': 'ja-JP-KeitaNeural', 'IsMale': true },
    { 'voice': 'ja-JP-MayuNeural', 'IsMale': false },
    { 'voice': 'ja-JP-NanamiNeural', 'IsMale': false },
    { 'voice': 'ja-JP-NaokiNeural', 'IsMale': true },
    { 'voice': 'ja-JP-ShioriNeural', 'IsMale': false },
    { 'voice': 'jv-ID-DimasNeural', 'IsMale': true },
    { 'voice': 'jv-ID-SitiNeural', 'IsMale': false },
    { 'voice': 'ka-GE-EkaNeural', 'IsMale': false },
    { 'voice': 'ka-GE-GiorgiNeural', 'IsMale': true },
    { 'voice': 'kk-KZ-AigulNeural', 'IsMale': false },
    { 'voice': 'kk-KZ-DauletNeural', 'IsMale': true },
    { 'voice': 'km-KH-PisethNeural', 'IsMale': true },
    { 'voice': 'km-KH-SreymomNeural', 'IsMale': false },
    { 'voice': 'kn-IN-GaganNeural', 'IsMale': true },
    { 'voice': 'kn-IN-SapnaNeural', 'IsMale': false },
    { 'voice': 'ko-KR-BongJinNeural', 'IsMale': true },
    { 'voice': 'ko-KR-GookMinNeural', 'IsMale': true },
    { 'voice': 'ko-KR-InJoonNeural', 'IsMale': true },
    { 'voice': 'ko-KR-JiMinNeural', 'IsMale': false },
    { 'voice': 'ko-KR-SeoHyeonNeural', 'IsMale': false },
    { 'voice': 'ko-KR-SoonBokNeural', 'IsMale': false },
    { 'voice': 'ko-KR-SunHiNeural', 'IsMale': false },
    { 'voice': 'ko-KR-YuJinNeural', 'IsMale': false },
    { 'voice': 'lo-LA-ChanthavongNeural', 'IsMale': true },
    { 'voice': 'lo-LA-KeomanyNeural', 'IsMale': false },
    { 'voice': 'lt-LT-LeonasNeural', 'IsMale': true },
    { 'voice': 'lt-LT-OnaNeural', 'IsMale': false },
    { 'voice': 'lv-LV-EveritaNeural', 'IsMale': false },
    { 'voice': 'lv-LV-NilsNeural', 'IsMale': true },
    { 'voice': 'mk-MK-AleksandarNeural', 'IsMale': true },
    { 'voice': 'mk-MK-MarijaNeural', 'IsMale': false },
    { 'voice': 'ml-IN-MidhunNeural', 'IsMale': true },
    { 'voice': 'ml-IN-SobhanaNeural', 'IsMale': false },
    { 'voice': 'mn-MN-BataaNeural', 'IsMale': true },
    { 'voice': 'mn-MN-YesuiNeural', 'IsMale': false },
    { 'voice': 'mr-IN-AarohiNeural', 'IsMale': false },
    { 'voice': 'mr-IN-ManoharNeural', 'IsMale': true },
    { 'voice': 'ms-MY-OsmanNeural', 'IsMale': true },
    { 'voice': 'ms-MY-YasminNeural', 'IsMale': false },
    { 'voice': 'mt-MT-GraceNeural', 'IsMale': false },
    { 'voice': 'mt-MT-JosephNeural', 'IsMale': true },
    { 'voice': 'my-MM-NilarNeural', 'IsMale': false },
    { 'voice': 'my-MM-ThihaNeural', 'IsMale': true },
    { 'voice': 'nb-NO-FinnNeural', 'IsMale': true },
    { 'voice': 'nb-NO-IselinNeural', 'IsMale': false },
    { 'voice': 'nb-NO-PernilleNeural', 'IsMale': false },
    { 'voice': 'ne-NP-HemkalaNeural', 'IsMale': false },
    { 'voice': 'ne-NP-SagarNeural', 'IsMale': true },
    { 'voice': 'nl-BE-ArnaudNeural', 'IsMale': true },
    { 'voice': 'nl-BE-DenaNeural', 'IsMale': false },
    { 'voice': 'nl-NL-ColetteNeural', 'IsMale': false },
    { 'voice': 'nl-NL-FennaNeural', 'IsMale': false },
    { 'voice': 'nl-NL-MaartenNeural', 'IsMale': true },
    { 'voice': 'pl-PL-AgnieszkaNeural', 'IsMale': false },
    { 'voice': 'pl-PL-MarekNeural', 'IsMale': true },
    { 'voice': 'pl-PL-ZofiaNeural', 'IsMale': false },
    { 'voice': 'ps-AF-GulNawazNeural', 'IsMale': true },
    { 'voice': 'ps-AF-LatifaNeural', 'IsMale': false },
    { 'voice': 'pt-BR-AntonioNeural', 'IsMale': true },
    { 'voice': 'pt-BR-BrendaNeural', 'IsMale': false },
    { 'voice': 'pt-BR-DonatoNeural', 'IsMale': true },
    { 'voice': 'pt-BR-ElzaNeural', 'IsMale': false },
    { 'voice': 'pt-BR-FabioNeural', 'IsMale': true },
    { 'voice': 'pt-BR-FranciscaNeural', 'IsMale': false },
    { 'voice': 'pt-BR-GiovannaNeural', 'IsMale': false },
    { 'voice': 'pt-BR-HumbertoNeural', 'IsMale': true },
    { 'voice': 'pt-BR-JulioNeural', 'IsMale': true },
    { 'voice': 'pt-BR-LeilaNeural', 'IsMale': false },
    { 'voice': 'pt-BR-LeticiaNeural', 'IsMale': false },
    { 'voice': 'pt-BR-ManuelaNeural', 'IsMale': false },
    { 'voice': 'pt-BR-NicolauNeural', 'IsMale': true },
    { 'voice': 'pt-BR-ValerioNeural', 'IsMale': true },
    { 'voice': 'pt-BR-YaraNeural', 'IsMale': false },
    { 'voice': 'pt-PT-DuarteNeural', 'IsMale': true },
    { 'voice': 'pt-PT-FernandaNeural', 'IsMale': false },
    { 'voice': 'pt-PT-RaquelNeural', 'IsMale': false },
    { 'voice': 'ro-RO-AlinaNeural', 'IsMale': false },
    { 'voice': 'ro-RO-EmilNeural', 'IsMale': true },
    { 'voice': 'ru-RU-DariyaNeural', 'IsMale': false },
    { 'voice': 'ru-RU-DmitryNeural', 'IsMale': true },
    { 'voice': 'ru-RU-SvetlanaNeural', 'IsMale': false },
    { 'voice': 'si-LK-SameeraNeural', 'IsMale': true },
    { 'voice': 'si-LK-ThiliniNeural', 'IsMale': false },
    { 'voice': 'sk-SK-LukasNeural', 'IsMale': true },
    { 'voice': 'sk-SK-ViktoriaNeural', 'IsMale': false },
    { 'voice': 'sl-SI-PetraNeural', 'IsMale': false },
    { 'voice': 'sl-SI-RokNeural', 'IsMale': true },
    { 'voice': 'so-SO-MuuseNeural', 'IsMale': true },
    { 'voice': 'so-SO-UbaxNeural', 'IsMale': false },
    { 'voice': 'sq-AL-AnilaNeural', 'IsMale': false },
    { 'voice': 'sq-AL-IlirNeural', 'IsMale': true },
    { 'voice': 'sr-RS-NicholasNeural', 'IsMale': true },
    { 'voice': 'sr-RS-SophieNeural', 'IsMale': false },
    { 'voice': 'su-ID-JajangNeural', 'IsMale': true },
    { 'voice': 'su-ID-TutiNeural', 'IsMale': false },
    { 'voice': 'sv-SE-HilleviNeural', 'IsMale': false },
    { 'voice': 'sv-SE-MattiasNeural', 'IsMale': true },
    { 'voice': 'sv-SE-SofieNeural', 'IsMale': false },
    { 'voice': 'sw-KE-RafikiNeural', 'IsMale': true },
    { 'voice': 'sw-KE-ZuriNeural', 'IsMale': false },
    { 'voice': 'sw-TZ-DaudiNeural', 'IsMale': true },
    { 'voice': 'sw-TZ-RehemaNeural', 'IsMale': false },
    { 'voice': 'ta-IN-PallaviNeural', 'IsMale': false },
    { 'voice': 'ta-IN-ValluvarNeural', 'IsMale': true },
    { 'voice': 'ta-LK-KumarNeural', 'IsMale': true },
    { 'voice': 'ta-LK-SaranyaNeural', 'IsMale': false },
    { 'voice': 'ta-MY-KaniNeural', 'IsMale': false },
    { 'voice': 'ta-MY-SuryaNeural', 'IsMale': true },
    { 'voice': 'ta-SG-AnbuNeural', 'IsMale': true },
    { 'voice': 'ta-SG-VenbaNeural', 'IsMale': false },
    { 'voice': 'te-IN-MohanNeural', 'IsMale': true },
    { 'voice': 'te-IN-ShrutiNeural', 'IsMale': false },
    { 'voice': 'th-TH-AcharaNeural', 'IsMale': false },
    { 'voice': 'th-TH-NiwatNeural', 'IsMale': true },
    { 'voice': 'th-TH-PremwadeeNeural', 'IsMale': false },
    { 'voice': 'tr-TR-AhmetNeural', 'IsMale': true },
    { 'voice': 'tr-TR-EmelNeural', 'IsMale': false },
    { 'voice': 'uk-UA-OstapNeural', 'IsMale': true },
    { 'voice': 'uk-UA-PolinaNeural', 'IsMale': false },
    { 'voice': 'ur-IN-GulNeural', 'IsMale': false },
    { 'voice': 'ur-IN-SalmanNeural', 'IsMale': true },
    { 'voice': 'ur-PK-AsadNeural', 'IsMale': true },
    { 'voice': 'ur-PK-UzmaNeural', 'IsMale': false },
    { 'voice': 'uz-UZ-MadinaNeural', 'IsMale': false },
    { 'voice': 'uz-UZ-SardorNeural', 'IsMale': true },
    { 'voice': 'vi-VN-HoaiMyNeural', 'IsMale': false },
    { 'voice': 'vi-VN-NamMinhNeural', 'IsMale': true },
    { 'voice': 'wuu-CN-XiaotongNeural', 'IsMale': false },
    { 'voice': 'wuu-CN-YunzheNeural', 'IsMale': true },
    { 'voice': 'yue-CN-XiaoMinNeural', 'IsMale': false },
    { 'voice': 'yue-CN-YunSongNeural', 'IsMale': true },
    { 'voice': 'zh-CN-XiaochenNeural', 'IsMale': false },
    { 'voice': 'zh-CN-XiaohanNeural', 'IsMale': false },
    { 'voice': 'zh-CN-XiaomengNeural', 'IsMale': false },
    { 'voice': 'zh-CN-XiaomoNeural', 'IsMale': false },
    { 'voice': 'zh-CN-XiaoqiuNeural', 'IsMale': false },
    { 'voice': 'zh-CN-XiaoruiNeural', 'IsMale': false },
    { 'voice': 'zh-CN-XiaoshuangNeural', 'IsMale': false },
    { 'voice': 'zh-CN-XiaoxiaoNeural', 'IsMale': false },
    { 'voice': 'zh-CN-XiaoxuanNeural', 'IsMale': false },
    { 'voice': 'zh-CN-XiaoyanNeural', 'IsMale': false },
    { 'voice': 'zh-CN-XiaoyiNeural', 'IsMale': false },
    { 'voice': 'zh-CN-XiaoyouNeural', 'IsMale': false },
    { 'voice': 'zh-CN-XiaozhenNeural', 'IsMale': false },
    { 'voice': 'zh-CN-YunfengNeural', 'IsMale': true },
    { 'voice': 'zh-CN-YunhaoNeural', 'IsMale': true },
    { 'voice': 'zh-CN-YunjianNeural', 'IsMale': true },
    { 'voice': 'zh-CN-YunxiaNeural', 'IsMale': true },
    { 'voice': 'zh-CN-YunxiNeural', 'IsMale': true },
    { 'voice': 'zh-CN-YunyangNeural', 'IsMale': true },
    { 'voice': 'zh-CN-YunyeNeural', 'IsMale': true },
    { 'voice': 'zh-CN-YunzeNeural', 'IsMale': true },
    { 'voice': 'zh-CN-henan-YundengNeural', 'IsMale': true },
    { 'voice': 'zh-CN-liaoning-XiaobeiNeural', 'IsMale': false },
    { 'voice': 'zh-CN-shaanxi-XiaoniNeural', 'IsMale': false },
    { 'voice': 'zh-CN-shandong-YunxiangNeural', 'IsMale': true },
    { 'voice': 'zh-CN-sichuan-YunxiNeural', 'IsMale': true },
    { 'voice': 'zh-HK-HiuGaaiNeural', 'IsMale': false },
    { 'voice': 'zh-HK-HiuMaanNeural', 'IsMale': false },
    { 'voice': 'zh-HK-WanLungNeural', 'IsMale': true },
    { 'voice': 'zh-TW-HsiaoChenNeural', 'IsMale': false },
    { 'voice': 'zh-TW-HsiaoYuNeural', 'IsMale': false },
    { 'voice': 'zh-TW-YunJheNeural', 'IsMale': true },
    { 'voice': 'zu-ZA-ThandoNeural', 'IsMale': false },
    { 'voice': 'zu-ZA-ThembaNeural', 'IsMale': true },
];


/***/ }),

/***/ "./src/lappdefine.ts":
/*!***************************!*\
  !*** ./src/lappdefine.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RenderTargetHeight = exports.RenderTargetWidth = exports.CubismLoggingLevel = exports.DebugTouchLogEnable = exports.DebugLogEnable = exports.PriorityForce = exports.PriorityNormal = exports.PriorityIdle = exports.PriorityNone = exports.HitAreaNameBody = exports.HitAreaNameHead = exports.MotionGroupTapBody = exports.MotionGroupIdle = exports.ModelDirSize = exports.ModelDir = exports.PowerImageName = exports.GearImageName = exports.BackImageName = exports.ResourcesPath = exports.ViewLogicalMaxTop = exports.ViewLogicalMaxBottom = exports.ViewLogicalMaxRight = exports.ViewLogicalMaxLeft = exports.ViewLogicalTop = exports.ViewLogicalBottom = exports.ViewLogicalRight = exports.ViewLogicalLeft = exports.ViewMinScale = exports.ViewMaxScale = exports.ViewScale = exports.CanvasSize = void 0;
var live2dcubismframework_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/live2dcubismframework'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
exports.CanvasSize = 'auto';
exports.ViewScale = 1.0;
exports.ViewMaxScale = 2.0;
exports.ViewMinScale = 0.8;
exports.ViewLogicalLeft = -1.0;
exports.ViewLogicalRight = 1.0;
exports.ViewLogicalBottom = -1.0;
exports.ViewLogicalTop = 1.0;
exports.ViewLogicalMaxLeft = -2.0;
exports.ViewLogicalMaxRight = 2.0;
exports.ViewLogicalMaxBottom = -2.0;
exports.ViewLogicalMaxTop = 2.0;
exports.ResourcesPath = './Resources/';
exports.BackImageName = 'back_class_normal.png';
exports.GearImageName = 'icon_gear.png';
exports.PowerImageName = 'CloseNormal.png';
exports.ModelDir = [
    'Haru',
    'Hiyori',
    'Mark',
    'Natori',
    'Rice',
    'Mao'
];
exports.ModelDirSize = exports.ModelDir.length;
exports.MotionGroupIdle = 'Idle';
exports.MotionGroupTapBody = 'TapBody';
exports.HitAreaNameHead = 'Head';
exports.HitAreaNameBody = 'Body';
exports.PriorityNone = 0;
exports.PriorityIdle = 1;
exports.PriorityNormal = 2;
exports.PriorityForce = 3;
exports.DebugLogEnable = true;
exports.DebugTouchLogEnable = false;
exports.CubismLoggingLevel = live2dcubismframework_1.LogLevel.LogLevel_Verbose;
exports.RenderTargetWidth = 1900;
exports.RenderTargetHeight = 1000;


/***/ }),

/***/ "./src/lappdelegate.ts":
/*!*****************************!*\
  !*** ./src/lappdelegate.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LAppDelegate = exports.frameBuffer = exports.gl = exports.s_instance = exports.canvas = void 0;
var live2dcubismframework_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/live2dcubismframework'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var LAppDefine = __importStar(__webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts"));
var lapplive2dmanager_1 = __webpack_require__(/*! ./lapplive2dmanager */ "./src/lapplive2dmanager.ts");
var lapppal_1 = __webpack_require__(/*! ./lapppal */ "./src/lapppal.ts");
var lapptexturemanager_1 = __webpack_require__(/*! ./lapptexturemanager */ "./src/lapptexturemanager.ts");
var lappview_1 = __webpack_require__(/*! ./lappview */ "./src/lappview.ts");
exports.canvas = null;
exports.s_instance = null;
exports.gl = null;
exports.frameBuffer = null;
var LAppDelegate = (function () {
    function LAppDelegate() {
        this._captured = false;
        this._mouseX = 0.0;
        this._mouseY = 0.0;
        this._isEnd = false;
        this._cubismOption = new live2dcubismframework_1.Option();
        this._view = new lappview_1.LAppView();
        this._textureManager = new lapptexturemanager_1.LAppTextureManager();
    }
    LAppDelegate.getInstance = function () {
        if (exports.s_instance == null) {
            exports.s_instance = new LAppDelegate();
        }
        return exports.s_instance;
    };
    LAppDelegate.releaseInstance = function () {
        if (exports.s_instance != null) {
            exports.s_instance.release();
        }
        exports.s_instance = null;
    };
    LAppDelegate.prototype.initialize = function () {
        exports.canvas = document.createElement('canvas');
        if (LAppDefine.CanvasSize === 'auto') {
            this._resizeCanvas();
        }
        else {
            exports.canvas.width = LAppDefine.CanvasSize.width;
            exports.canvas.height = LAppDefine.CanvasSize.height;
        }
        exports.gl = exports.canvas.getContext('webgl') || exports.canvas.getContext('experimental-webgl');
        if (!exports.gl) {
            alert('Cannot initialize WebGL. This browser does not support.');
            exports.gl = null;
            document.body.innerHTML =
                'This browser does not support the <code>&lt;canvas&gt;</code> element.';
            return false;
        }
        document.body.appendChild(exports.canvas);
        if (!exports.frameBuffer) {
            exports.frameBuffer = exports.gl.getParameter(exports.gl.FRAMEBUFFER_BINDING);
        }
        exports.gl.enable(exports.gl.BLEND);
        exports.gl.blendFunc(exports.gl.SRC_ALPHA, exports.gl.ONE_MINUS_SRC_ALPHA);
        var supportTouch = 'ontouchend' in exports.canvas;
        if (supportTouch) {
            exports.canvas.ontouchstart = onTouchBegan;
            exports.canvas.ontouchmove = onTouchMoved;
            exports.canvas.ontouchend = onTouchEnded;
            exports.canvas.ontouchcancel = onTouchCancel;
        }
        else {
            exports.canvas.onmousedown = onClickBegan;
            exports.canvas.onmousemove = onMouseMoved;
            exports.canvas.onmouseup = onClickEnded;
        }
        this._view.initialize();
        this.initializeCubism();
        return true;
    };
    LAppDelegate.prototype.onResize = function () {
        this._resizeCanvas();
        this._view.initialize();
        this._view.initializeSprite();
        var viewport = [0, 0, exports.canvas.width, exports.canvas.height];
        exports.gl.viewport(viewport[0], viewport[1], viewport[2], viewport[3]);
    };
    LAppDelegate.prototype.release = function () {
        this._textureManager.release();
        this._textureManager = null;
        this._view.release();
        this._view = null;
        lapplive2dmanager_1.LAppLive2DManager.releaseInstance();
        live2dcubismframework_1.CubismFramework.dispose();
    };
    LAppDelegate.prototype.run = function () {
        var _this = this;
        var loop = function () {
            if (exports.s_instance == null) {
                return;
            }
            lapppal_1.LAppPal.updateTime();
            exports.gl.clearColor(0.0, 0.0, 0.0, 1.0);
            exports.gl.enable(exports.gl.DEPTH_TEST);
            exports.gl.depthFunc(exports.gl.LEQUAL);
            exports.gl.clear(exports.gl.COLOR_BUFFER_BIT | exports.gl.DEPTH_BUFFER_BIT);
            exports.gl.clearDepth(1.0);
            exports.gl.enable(exports.gl.BLEND);
            exports.gl.blendFunc(exports.gl.SRC_ALPHA, exports.gl.ONE_MINUS_SRC_ALPHA);
            _this._view.render();
            requestAnimationFrame(loop);
        };
        loop();
    };
    LAppDelegate.prototype.createShader = function () {
        var vertexShaderId = exports.gl.createShader(exports.gl.VERTEX_SHADER);
        if (vertexShaderId == null) {
            lapppal_1.LAppPal.printMessage('failed to create vertexShader');
            return null;
        }
        var vertexShader = 'precision mediump float;' +
            'attribute vec3 position;' +
            'attribute vec2 uv;' +
            'varying vec2 vuv;' +
            'void main(void)' +
            '{' +
            '   gl_Position = vec4(position, 1.0);' +
            '   vuv = uv;' +
            '}';
        exports.gl.shaderSource(vertexShaderId, vertexShader);
        exports.gl.compileShader(vertexShaderId);
        var fragmentShaderId = exports.gl.createShader(exports.gl.FRAGMENT_SHADER);
        if (fragmentShaderId == null) {
            lapppal_1.LAppPal.printMessage('failed to create fragmentShader');
            return null;
        }
        var fragmentShader = 'precision mediump float;' +
            'varying vec2 vuv;' +
            'uniform sampler2D texture;' +
            'void main(void)' +
            '{' +
            '   gl_FragColor = texture2D(texture, vuv);' +
            '}';
        exports.gl.shaderSource(fragmentShaderId, fragmentShader);
        exports.gl.compileShader(fragmentShaderId);
        var programId = exports.gl.createProgram();
        exports.gl.attachShader(programId, vertexShaderId);
        exports.gl.attachShader(programId, fragmentShaderId);
        exports.gl.deleteShader(vertexShaderId);
        exports.gl.deleteShader(fragmentShaderId);
        exports.gl.linkProgram(programId);
        exports.gl.useProgram(programId);
        return programId;
    };
    LAppDelegate.prototype.getView = function () {
        return this._view;
    };
    LAppDelegate.prototype.getTextureManager = function () {
        return this._textureManager;
    };
    LAppDelegate.prototype.startVoiceConversation = function (language, data) {
        lapplive2dmanager_1.LAppLive2DManager.getInstance().startVoiceConversation(language, data);
    };
    LAppDelegate.prototype.initializeCubism = function () {
        this._cubismOption.logFunction = lapppal_1.LAppPal.printMessage;
        this._cubismOption.loggingLevel = LAppDefine.CubismLoggingLevel;
        live2dcubismframework_1.CubismFramework.startUp(this._cubismOption);
        live2dcubismframework_1.CubismFramework.initialize();
        lapplive2dmanager_1.LAppLive2DManager.getInstance();
        lapppal_1.LAppPal.updateTime();
        this._view.initializeSprite();
    };
    LAppDelegate.prototype._resizeCanvas = function () {
        exports.canvas.width = window.innerWidth;
        exports.canvas.height = window.innerHeight;
    };
    return LAppDelegate;
}());
exports.LAppDelegate = LAppDelegate;
function onClickBegan(e) {
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    LAppDelegate.getInstance()._captured = true;
    var posX = e.pageX;
    var posY = e.pageY;
    LAppDelegate.getInstance()._view.onTouchesBegan(posX, posY);
}
function onMouseMoved(e) {
    if (!LAppDelegate.getInstance()._captured) {
        return;
    }
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.clientX - rect.left;
    var posY = e.clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
}
function onClickEnded(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.clientX - rect.left;
    var posY = e.clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}
function onTouchBegan(e) {
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    LAppDelegate.getInstance()._captured = true;
    var posX = e.changedTouches[0].pageX;
    var posY = e.changedTouches[0].pageY;
    LAppDelegate.getInstance()._view.onTouchesBegan(posX, posY);
}
function onTouchMoved(e) {
    if (!LAppDelegate.getInstance()._captured) {
        return;
    }
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.changedTouches[0].clientX - rect.left;
    var posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
}
function onTouchEnded(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.changedTouches[0].clientX - rect.left;
    var posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}
function onTouchCancel(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.changedTouches[0].clientX - rect.left;
    var posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}


/***/ }),

/***/ "./src/lapplive2dmanager.ts":
/*!**********************************!*\
  !*** ./src/lapplive2dmanager.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LAppLive2DManager = exports.s_instance = void 0;
var cubismmatrix44_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/math/cubismmatrix44'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var csmvector_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/type/csmvector'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var azureai_1 = __webpack_require__(/*! ./azureai */ "./src/azureai.ts");
var LAppDefine = __importStar(__webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts"));
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var lappmodel_1 = __webpack_require__(/*! ./lappmodel */ "./src/lappmodel.ts");
var lapppal_1 = __webpack_require__(/*! ./lapppal */ "./src/lapppal.ts");
exports.s_instance = null;
var LAppLive2DManager = (function () {
    function LAppLive2DManager() {
        this._finishedMotion = function (self) {
            lapppal_1.LAppPal.printMessage('Motion Finished:');
            console.log(self);
        };
        this._viewMatrix = new cubismmatrix44_1.CubismMatrix44();
        this._models = new csmvector_1.csmVector();
        this._sceneIndex = 0;
        this.changeScene(this._sceneIndex);
    }
    LAppLive2DManager.getInstance = function () {
        if (exports.s_instance == null) {
            exports.s_instance = new LAppLive2DManager();
        }
        return exports.s_instance;
    };
    LAppLive2DManager.releaseInstance = function () {
        if (exports.s_instance != null) {
            exports.s_instance = void 0;
        }
        exports.s_instance = null;
    };
    LAppLive2DManager.prototype.getModel = function (no) {
        if (no < this._models.getSize()) {
            return this._models.at(no);
        }
        return null;
    };
    LAppLive2DManager.prototype.releaseAllModel = function () {
        for (var i = 0; i < this._models.getSize(); i++) {
            this._models.at(i).release();
            this._models.set(i, null);
        }
        this._models.clear();
    };
    LAppLive2DManager.prototype.onDrag = function (x, y) {
        for (var i = 0; i < this._models.getSize(); i++) {
            var model = this.getModel(i);
            if (model) {
                model.setDragging(x, y);
            }
        }
    };
    LAppLive2DManager.prototype.onTap = function (x, y) {
        var _this = this;
        if (LAppDefine.DebugLogEnable) {
            lapppal_1.LAppPal.printMessage("[APP]tap point: {x: ".concat(x.toFixed(2), " y: ").concat(y.toFixed(2), "}"));
        }
        var _loop_1 = function (i) {
            if (this_1._models.at(i).hitTest(LAppDefine.HitAreaNameHead, x, y)) {
                if (LAppDefine.DebugLogEnable) {
                    lapppal_1.LAppPal.printMessage("[APP]hit area: [".concat(LAppDefine.HitAreaNameHead, "]"));
                }
                this_1._models.at(i).setRandomExpression();
            }
            else if (this_1._models.at(i).hitTest(LAppDefine.HitAreaNameBody, x, y)) {
                if (LAppDefine.DebugLogEnable) {
                    lapppal_1.LAppPal.printMessage("[APP]hit area: [".concat(LAppDefine.HitAreaNameBody, "]"));
                }
                var prompt_1 = document.getElementById("prompt").value;
                var language_1 = document.getElementById("language").value;
                var azureAi_1 = new azureai_1.AzureAi();
                azureAi_1.getOpenAiAnswer(prompt_1)
                    .then(function (ans) { return azureAi_1.getSpeechUrl(language_1, ans); })
                    .then(function (url) {
                    _this._models.at(i)._wavFileHandler.loadWavFile(url);
                    _this._models
                        .at(i)
                        .startRandomMotion(LAppDefine.MotionGroupTapBody, LAppDefine.PriorityNormal, _this._finishedMotion);
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < this._models.getSize(); i++) {
            _loop_1(i);
        }
    };
    LAppLive2DManager.prototype.startVoiceConversation = function (language, data) {
        var _this = this;
        var _loop_2 = function (i) {
            if (LAppDefine.DebugLogEnable) {
                lapppal_1.LAppPal.printMessage("startConversation");
                var azureAi_2 = new azureai_1.AzureAi();
                azureAi_2.getTextFromSpeech(language, data)
                    .then(function (text) {
                    document.getElementById("prompt").value = text;
                    return azureAi_2.getOpenAiAnswer(text);
                }).then(function (ans) { return azureAi_2.getSpeechUrl(language, ans); })
                    .then(function (url) {
                    _this._models.at(i)._wavFileHandler.loadWavFile(url);
                    _this._models
                        .at(i)
                        .startRandomMotion(LAppDefine.MotionGroupTapBody, LAppDefine.PriorityNormal, _this._finishedMotion);
                });
            }
        };
        for (var i = 0; i < this._models.getSize(); i++) {
            _loop_2(i);
        }
    };
    LAppLive2DManager.prototype.onUpdate = function () {
        var width = lappdelegate_1.canvas.width, height = lappdelegate_1.canvas.height;
        var modelCount = this._models.getSize();
        for (var i = 0; i < modelCount; ++i) {
            var projection = new cubismmatrix44_1.CubismMatrix44();
            var model = this.getModel(i);
            if (model.getModel()) {
                if (model.getModel().getCanvasWidth() > 1.0 && width < height) {
                    model.getModelMatrix().setWidth(2.0);
                    projection.scale(1.0, width / height);
                }
                else {
                    projection.scale(height / width, 1.0);
                }
                if (this._viewMatrix != null) {
                    projection.multiplyByMatrix(this._viewMatrix);
                }
            }
            model.update();
            model.draw(projection);
        }
    };
    LAppLive2DManager.prototype.nextScene = function () {
        var no = (this._sceneIndex + 1) % LAppDefine.ModelDirSize;
        this.changeScene(no);
    };
    LAppLive2DManager.prototype.changeScene = function (index) {
        this._sceneIndex = index;
        if (LAppDefine.DebugLogEnable) {
            lapppal_1.LAppPal.printMessage("[APP]model index: ".concat(this._sceneIndex));
        }
        var model = LAppDefine.ModelDir[index];
        var modelPath = LAppDefine.ResourcesPath + model + '/';
        var modelJsonName = LAppDefine.ModelDir[index];
        modelJsonName += '.model3.json';
        this.releaseAllModel();
        this._models.pushBack(new lappmodel_1.LAppModel());
        this._models.at(0).loadAssets(modelPath, modelJsonName);
    };
    LAppLive2DManager.prototype.setViewMatrix = function (m) {
        for (var i = 0; i < 16; i++) {
            this._viewMatrix.getArray()[i] = m.getArray()[i];
        }
    };
    return LAppLive2DManager;
}());
exports.LAppLive2DManager = LAppLive2DManager;


/***/ }),

/***/ "./src/lappmodel.ts":
/*!**************************!*\
  !*** ./src/lappmodel.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LAppModel = void 0;
__webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
var cubismdefaultparameterid_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/cubismdefaultparameterid'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var cubismmodelsettingjson_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/cubismmodelsettingjson'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var cubismbreath_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/effect/cubismbreath'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var cubismeyeblink_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/effect/cubismeyeblink'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var live2dcubismframework_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/live2dcubismframework'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var cubismusermodel_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/model/cubismusermodel'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var acubismmotion_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/motion/acubismmotion'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var cubismmotionqueuemanager_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/motion/cubismmotionqueuemanager'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var csmmap_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/type/csmmap'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var csmvector_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/type/csmvector'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var cubismdebug_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/utils/cubismdebug'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var LAppDefine = __importStar(__webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts"));
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var lapppal_1 = __webpack_require__(/*! ./lapppal */ "./src/lapppal.ts");
var lappwavfilehandler_1 = __webpack_require__(/*! ./lappwavfilehandler */ "./src/lappwavfilehandler.ts");
var LoadStep;
(function (LoadStep) {
    LoadStep[LoadStep["LoadAssets"] = 0] = "LoadAssets";
    LoadStep[LoadStep["LoadModel"] = 1] = "LoadModel";
    LoadStep[LoadStep["WaitLoadModel"] = 2] = "WaitLoadModel";
    LoadStep[LoadStep["LoadExpression"] = 3] = "LoadExpression";
    LoadStep[LoadStep["WaitLoadExpression"] = 4] = "WaitLoadExpression";
    LoadStep[LoadStep["LoadPhysics"] = 5] = "LoadPhysics";
    LoadStep[LoadStep["WaitLoadPhysics"] = 6] = "WaitLoadPhysics";
    LoadStep[LoadStep["LoadPose"] = 7] = "LoadPose";
    LoadStep[LoadStep["WaitLoadPose"] = 8] = "WaitLoadPose";
    LoadStep[LoadStep["SetupEyeBlink"] = 9] = "SetupEyeBlink";
    LoadStep[LoadStep["SetupBreath"] = 10] = "SetupBreath";
    LoadStep[LoadStep["LoadUserData"] = 11] = "LoadUserData";
    LoadStep[LoadStep["WaitLoadUserData"] = 12] = "WaitLoadUserData";
    LoadStep[LoadStep["SetupEyeBlinkIds"] = 13] = "SetupEyeBlinkIds";
    LoadStep[LoadStep["SetupLipSyncIds"] = 14] = "SetupLipSyncIds";
    LoadStep[LoadStep["SetupLayout"] = 15] = "SetupLayout";
    LoadStep[LoadStep["LoadMotion"] = 16] = "LoadMotion";
    LoadStep[LoadStep["WaitLoadMotion"] = 17] = "WaitLoadMotion";
    LoadStep[LoadStep["CompleteInitialize"] = 18] = "CompleteInitialize";
    LoadStep[LoadStep["CompleteSetupModel"] = 19] = "CompleteSetupModel";
    LoadStep[LoadStep["LoadTexture"] = 20] = "LoadTexture";
    LoadStep[LoadStep["WaitLoadTexture"] = 21] = "WaitLoadTexture";
    LoadStep[LoadStep["CompleteSetup"] = 22] = "CompleteSetup";
})(LoadStep || (LoadStep = {}));
var LAppModel = (function (_super) {
    __extends(LAppModel, _super);
    function LAppModel() {
        var _this = _super.call(this) || this;
        _this._modelSetting = null;
        _this._modelHomeDir = null;
        _this._userTimeSeconds = 0.0;
        _this._eyeBlinkIds = new csmvector_1.csmVector();
        _this._lipSyncIds = new csmvector_1.csmVector();
        _this._motions = new csmmap_1.csmMap();
        _this._expressions = new csmmap_1.csmMap();
        _this._hitArea = new csmvector_1.csmVector();
        _this._userArea = new csmvector_1.csmVector();
        _this._idParamAngleX = live2dcubismframework_1.CubismFramework.getIdManager().getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamAngleX);
        _this._idParamAngleY = live2dcubismframework_1.CubismFramework.getIdManager().getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamAngleY);
        _this._idParamAngleZ = live2dcubismframework_1.CubismFramework.getIdManager().getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamAngleZ);
        _this._idParamEyeBallX = live2dcubismframework_1.CubismFramework.getIdManager().getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamEyeBallX);
        _this._idParamEyeBallY = live2dcubismframework_1.CubismFramework.getIdManager().getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamEyeBallY);
        _this._idParamBodyAngleX = live2dcubismframework_1.CubismFramework.getIdManager().getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamBodyAngleX);
        _this._state = LoadStep.LoadAssets;
        _this._expressionCount = 0;
        _this._textureCount = 0;
        _this._motionCount = 0;
        _this._allMotionCount = 0;
        _this._wavFileHandler = new lappwavfilehandler_1.LAppWavFileHandler();
        return _this;
    }
    LAppModel.prototype.loadAssets = function (dir, fileName) {
        var _this = this;
        this._modelHomeDir = dir;
        fetch("".concat(this._modelHomeDir).concat(fileName))
            .then(function (response) { return response.arrayBuffer(); })
            .then(function (arrayBuffer) {
            var setting = new cubismmodelsettingjson_1.CubismModelSettingJson(arrayBuffer, arrayBuffer.byteLength);
            _this._state = LoadStep.LoadModel;
            _this.setupModel(setting);
        });
    };
    LAppModel.prototype.setupModel = function (setting) {
        var _this = this;
        this._updating = true;
        this._initialized = false;
        this._modelSetting = setting;
        if (this._modelSetting.getModelFileName() != '') {
            var modelFileName = this._modelSetting.getModelFileName();
            fetch("".concat(this._modelHomeDir).concat(modelFileName))
                .then(function (response) { return response.arrayBuffer(); })
                .then(function (arrayBuffer) {
                _this.loadModel(arrayBuffer);
                _this._state = LoadStep.LoadExpression;
                loadCubismExpression();
            });
            this._state = LoadStep.WaitLoadModel;
        }
        else {
            lapppal_1.LAppPal.printMessage('Model data does not exist.');
        }
        var loadCubismExpression = function () {
            if (_this._modelSetting.getExpressionCount() > 0) {
                var count_1 = _this._modelSetting.getExpressionCount();
                var _loop_1 = function (i) {
                    var expressionName = _this._modelSetting.getExpressionName(i);
                    var expressionFileName = _this._modelSetting.getExpressionFileName(i);
                    fetch("".concat(_this._modelHomeDir).concat(expressionFileName))
                        .then(function (response) { return response.arrayBuffer(); })
                        .then(function (arrayBuffer) {
                        var motion = _this.loadExpression(arrayBuffer, arrayBuffer.byteLength, expressionName);
                        if (_this._expressions.getValue(expressionName) != null) {
                            acubismmotion_1.ACubismMotion.delete(_this._expressions.getValue(expressionName));
                            _this._expressions.setValue(expressionName, null);
                        }
                        _this._expressions.setValue(expressionName, motion);
                        _this._expressionCount++;
                        if (_this._expressionCount >= count_1) {
                            _this._state = LoadStep.LoadPhysics;
                            loadCubismPhysics();
                        }
                    });
                };
                for (var i = 0; i < count_1; i++) {
                    _loop_1(i);
                }
                _this._state = LoadStep.WaitLoadExpression;
            }
            else {
                _this._state = LoadStep.LoadPhysics;
                loadCubismPhysics();
            }
        };
        var loadCubismPhysics = function () {
            if (_this._modelSetting.getPhysicsFileName() != '') {
                var physicsFileName = _this._modelSetting.getPhysicsFileName();
                fetch("".concat(_this._modelHomeDir).concat(physicsFileName))
                    .then(function (response) { return response.arrayBuffer(); })
                    .then(function (arrayBuffer) {
                    _this.loadPhysics(arrayBuffer, arrayBuffer.byteLength);
                    _this._state = LoadStep.LoadPose;
                    loadCubismPose();
                });
                _this._state = LoadStep.WaitLoadPhysics;
            }
            else {
                _this._state = LoadStep.LoadPose;
                loadCubismPose();
            }
        };
        var loadCubismPose = function () {
            if (_this._modelSetting.getPoseFileName() != '') {
                var poseFileName = _this._modelSetting.getPoseFileName();
                fetch("".concat(_this._modelHomeDir).concat(poseFileName))
                    .then(function (response) { return response.arrayBuffer(); })
                    .then(function (arrayBuffer) {
                    _this.loadPose(arrayBuffer, arrayBuffer.byteLength);
                    _this._state = LoadStep.SetupEyeBlink;
                    setupEyeBlink();
                });
                _this._state = LoadStep.WaitLoadPose;
            }
            else {
                _this._state = LoadStep.SetupEyeBlink;
                setupEyeBlink();
            }
        };
        var setupEyeBlink = function () {
            if (_this._modelSetting.getEyeBlinkParameterCount() > 0) {
                _this._eyeBlink = cubismeyeblink_1.CubismEyeBlink.create(_this._modelSetting);
                _this._state = LoadStep.SetupBreath;
            }
            setupBreath();
        };
        var setupBreath = function () {
            _this._breath = cubismbreath_1.CubismBreath.create();
            var breathParameters = new csmvector_1.csmVector();
            breathParameters.pushBack(new cubismbreath_1.BreathParameterData(_this._idParamAngleX, 0.0, 15.0, 6.5345, 0.5));
            breathParameters.pushBack(new cubismbreath_1.BreathParameterData(_this._idParamAngleY, 0.0, 8.0, 3.5345, 0.5));
            breathParameters.pushBack(new cubismbreath_1.BreathParameterData(_this._idParamAngleZ, 0.0, 10.0, 5.5345, 0.5));
            breathParameters.pushBack(new cubismbreath_1.BreathParameterData(_this._idParamBodyAngleX, 0.0, 4.0, 15.5345, 0.5));
            breathParameters.pushBack(new cubismbreath_1.BreathParameterData(live2dcubismframework_1.CubismFramework.getIdManager().getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamBreath), 0.5, 0.5, 3.2345, 1));
            _this._breath.setParameters(breathParameters);
            _this._state = LoadStep.LoadUserData;
            loadUserData();
        };
        var loadUserData = function () {
            if (_this._modelSetting.getUserDataFile() != '') {
                var userDataFile = _this._modelSetting.getUserDataFile();
                fetch("".concat(_this._modelHomeDir).concat(userDataFile))
                    .then(function (response) { return response.arrayBuffer(); })
                    .then(function (arrayBuffer) {
                    _this.loadUserData(arrayBuffer, arrayBuffer.byteLength);
                    _this._state = LoadStep.SetupEyeBlinkIds;
                    setupEyeBlinkIds();
                });
                _this._state = LoadStep.WaitLoadUserData;
            }
            else {
                _this._state = LoadStep.SetupEyeBlinkIds;
                setupEyeBlinkIds();
            }
        };
        var setupEyeBlinkIds = function () {
            var eyeBlinkIdCount = _this._modelSetting.getEyeBlinkParameterCount();
            for (var i = 0; i < eyeBlinkIdCount; ++i) {
                _this._eyeBlinkIds.pushBack(_this._modelSetting.getEyeBlinkParameterId(i));
            }
            _this._state = LoadStep.SetupLipSyncIds;
            setupLipSyncIds();
        };
        var setupLipSyncIds = function () {
            var lipSyncIdCount = _this._modelSetting.getLipSyncParameterCount();
            for (var i = 0; i < lipSyncIdCount; ++i) {
                _this._lipSyncIds.pushBack(_this._modelSetting.getLipSyncParameterId(i));
            }
            _this._state = LoadStep.SetupLayout;
            setupLayout();
        };
        var setupLayout = function () {
            var layout = new csmmap_1.csmMap();
            if (_this._modelSetting == null || _this._modelMatrix == null) {
                (0, cubismdebug_1.CubismLogError)('Failed to setupLayout().');
                return;
            }
            _this._modelSetting.getLayoutMap(layout);
            _this._modelMatrix.setupFromLayout(layout);
            _this._state = LoadStep.LoadMotion;
            loadCubismMotion();
        };
        var loadCubismMotion = function () {
            _this._state = LoadStep.WaitLoadMotion;
            _this._model.saveParameters();
            _this._allMotionCount = 0;
            _this._motionCount = 0;
            var group = [];
            var motionGroupCount = _this._modelSetting.getMotionGroupCount();
            for (var i = 0; i < motionGroupCount; i++) {
                group[i] = _this._modelSetting.getMotionGroupName(i);
                _this._allMotionCount += _this._modelSetting.getMotionCount(group[i]);
            }
            for (var i = 0; i < motionGroupCount; i++) {
                _this.preLoadMotionGroup(group[i]);
            }
            if (motionGroupCount == 0) {
                _this._state = LoadStep.LoadTexture;
                _this._motionManager.stopAllMotions();
                _this._updating = false;
                _this._initialized = true;
                _this.createRenderer();
                _this.setupTextures();
                _this.getRenderer().startUp(lappdelegate_1.gl);
            }
        };
    };
    LAppModel.prototype.setupTextures = function () {
        var _this = this;
        var usePremultiply = true;
        if (this._state == LoadStep.LoadTexture) {
            var textureCount_1 = this._modelSetting.getTextureCount();
            var _loop_2 = function (modelTextureNumber) {
                if (this_1._modelSetting.getTextureFileName(modelTextureNumber) == '') {
                    console.log('getTextureFileName null');
                    return "continue";
                }
                var texturePath = this_1._modelSetting.getTextureFileName(modelTextureNumber);
                texturePath = this_1._modelHomeDir + texturePath;
                var onLoad = function (textureInfo) {
                    _this.getRenderer().bindTexture(modelTextureNumber, textureInfo.id);
                    _this._textureCount++;
                    if (_this._textureCount >= textureCount_1) {
                        _this._state = LoadStep.CompleteSetup;
                    }
                };
                lappdelegate_1.LAppDelegate.getInstance()
                    .getTextureManager()
                    .createTextureFromPngFile(texturePath, usePremultiply, onLoad);
                this_1.getRenderer().setIsPremultipliedAlpha(usePremultiply);
            };
            var this_1 = this;
            for (var modelTextureNumber = 0; modelTextureNumber < textureCount_1; modelTextureNumber++) {
                _loop_2(modelTextureNumber);
            }
            this._state = LoadStep.WaitLoadTexture;
        }
    };
    LAppModel.prototype.reloadRenderer = function () {
        this.deleteRenderer();
        this.createRenderer();
        this.setupTextures();
    };
    LAppModel.prototype.update = function () {
        if (this._state != LoadStep.CompleteSetup)
            return;
        var deltaTimeSeconds = lapppal_1.LAppPal.getDeltaTime();
        this._userTimeSeconds += deltaTimeSeconds;
        this._dragManager.update(deltaTimeSeconds);
        this._dragX = this._dragManager.getX();
        this._dragY = this._dragManager.getY();
        var motionUpdated = false;
        this._model.loadParameters();
        if (this._motionManager.isFinished()) {
            this.startRandomMotion(LAppDefine.MotionGroupIdle, LAppDefine.PriorityIdle);
        }
        else {
            motionUpdated = this._motionManager.updateMotion(this._model, deltaTimeSeconds);
        }
        this._model.saveParameters();
        if (!motionUpdated) {
            if (this._eyeBlink != null) {
                this._eyeBlink.updateParameters(this._model, deltaTimeSeconds);
            }
        }
        if (this._expressionManager != null) {
            this._expressionManager.updateMotion(this._model, deltaTimeSeconds);
        }
        this._model.addParameterValueById(this._idParamAngleX, this._dragX * 30);
        this._model.addParameterValueById(this._idParamAngleY, this._dragY * 30);
        this._model.addParameterValueById(this._idParamAngleZ, this._dragX * this._dragY * -30);
        this._model.addParameterValueById(this._idParamBodyAngleX, this._dragX * 10);
        this._model.addParameterValueById(this._idParamEyeBallX, this._dragX);
        this._model.addParameterValueById(this._idParamEyeBallY, this._dragY);
        if (this._breath != null) {
            this._breath.updateParameters(this._model, deltaTimeSeconds);
        }
        if (this._physics != null) {
            this._physics.evaluate(this._model, deltaTimeSeconds);
        }
        if (this._lipsync) {
            var value = 0.0;
            this._wavFileHandler.update(deltaTimeSeconds);
            value = this._wavFileHandler.getRms();
            for (var i = 0; i < this._lipSyncIds.getSize(); ++i) {
                this._model.addParameterValueById(this._lipSyncIds.at(i), value, 0.8);
            }
        }
        if (this._pose != null) {
            this._pose.updateParameters(this._model, deltaTimeSeconds);
        }
        var audio = document.getElementById('voice');
        if (audio.src !== this._audioSrc) {
            this._audioSrc = audio.src;
            audio.play();
        }
        this._model.update();
    };
    LAppModel.prototype.startMotion = function (group, no, priority, onFinishedMotionHandler) {
        var _this = this;
        if (priority == LAppDefine.PriorityForce) {
            this._motionManager.setReservePriority(priority);
        }
        else if (!this._motionManager.reserveMotion(priority)) {
            if (this._debugMode) {
                lapppal_1.LAppPal.printMessage("[APP]can't start motion.");
            }
            return cubismmotionqueuemanager_1.InvalidMotionQueueEntryHandleValue;
        }
        var motionFileName = this._modelSetting.getMotionFileName(group, no);
        var name = "".concat(group, "_").concat(no);
        var motion = this._motions.getValue(name);
        var autoDelete = false;
        if (motion == null) {
            fetch("".concat(this._modelHomeDir).concat(motionFileName))
                .then(function (response) { return response.arrayBuffer(); })
                .then(function (arrayBuffer) {
                motion = _this.loadMotion(arrayBuffer, arrayBuffer.byteLength, null, onFinishedMotionHandler);
                var fadeTime = _this._modelSetting.getMotionFadeInTimeValue(group, no);
                if (fadeTime >= 0.0) {
                    motion.setFadeInTime(fadeTime);
                }
                fadeTime = _this._modelSetting.getMotionFadeOutTimeValue(group, no);
                if (fadeTime >= 0.0) {
                    motion.setFadeOutTime(fadeTime);
                }
                motion.setEffectIds(_this._eyeBlinkIds, _this._lipSyncIds);
                autoDelete = true;
            });
        }
        else {
            motion.setFinishedMotionHandler(onFinishedMotionHandler);
        }
        var voice = this._modelSetting.getMotionSoundFileName(group, no);
        if (voice.localeCompare('') != 0) {
            var path = voice;
            path = this._modelHomeDir + path;
            this._wavFileHandler.start(path);
        }
        if (this._debugMode) {
            lapppal_1.LAppPal.printMessage("[APP]start motion: [".concat(group, "_").concat(no));
        }
        return this._motionManager.startMotionPriority(motion, autoDelete, priority);
    };
    LAppModel.prototype.startRandomMotion = function (group, priority, onFinishedMotionHandler) {
        if (this._modelSetting.getMotionCount(group) == 0) {
            return cubismmotionqueuemanager_1.InvalidMotionQueueEntryHandleValue;
        }
        var no = Math.floor(Math.random() * this._modelSetting.getMotionCount(group));
        return this.startMotion(group, no, priority, onFinishedMotionHandler);
    };
    LAppModel.prototype.setExpression = function (expressionId) {
        var motion = this._expressions.getValue(expressionId);
        if (this._debugMode) {
            lapppal_1.LAppPal.printMessage("[APP]expression: [".concat(expressionId, "]"));
        }
        if (motion != null) {
            this._expressionManager.startMotionPriority(motion, false, LAppDefine.PriorityForce);
        }
        else {
            if (this._debugMode) {
                lapppal_1.LAppPal.printMessage("[APP]expression[".concat(expressionId, "] is null"));
            }
        }
    };
    LAppModel.prototype.setRandomExpression = function () {
        if (this._expressions.getSize() == 0) {
            return;
        }
        var no = Math.floor(Math.random() * this._expressions.getSize());
        for (var i = 0; i < this._expressions.getSize(); i++) {
            if (i == no) {
                var name_1 = this._expressions._keyValues[i].first;
                this.setExpression(name_1);
                return;
            }
        }
    };
    LAppModel.prototype.motionEventFired = function (eventValue) {
        (0, cubismdebug_1.CubismLogInfo)('{0} is fired on LAppModel!!', eventValue.s);
    };
    LAppModel.prototype.hitTest = function (hitArenaName, x, y) {
        if (this._opacity < 1) {
            return false;
        }
        var count = this._modelSetting.getHitAreasCount();
        for (var i = 0; i < count; i++) {
            if (this._modelSetting.getHitAreaName(i) == hitArenaName) {
                var drawId = this._modelSetting.getHitAreaId(i);
                return this.isHit(drawId, x, y);
            }
        }
        return false;
    };
    LAppModel.prototype.preLoadMotionGroup = function (group) {
        var _this = this;
        var _loop_3 = function (i) {
            var motionFileName = this_2._modelSetting.getMotionFileName(group, i);
            var name_2 = "".concat(group, "_").concat(i);
            if (this_2._debugMode) {
                lapppal_1.LAppPal.printMessage("[APP]load motion: ".concat(motionFileName, " => [").concat(name_2, "]"));
            }
            fetch("".concat(this_2._modelHomeDir).concat(motionFileName))
                .then(function (response) { return response.arrayBuffer(); })
                .then(function (arrayBuffer) {
                var tmpMotion = _this.loadMotion(arrayBuffer, arrayBuffer.byteLength, name_2);
                var fadeTime = _this._modelSetting.getMotionFadeInTimeValue(group, i);
                if (fadeTime >= 0.0) {
                    tmpMotion.setFadeInTime(fadeTime);
                }
                fadeTime = _this._modelSetting.getMotionFadeOutTimeValue(group, i);
                if (fadeTime >= 0.0) {
                    tmpMotion.setFadeOutTime(fadeTime);
                }
                tmpMotion.setEffectIds(_this._eyeBlinkIds, _this._lipSyncIds);
                if (_this._motions.getValue(name_2) != null) {
                    acubismmotion_1.ACubismMotion.delete(_this._motions.getValue(name_2));
                }
                _this._motions.setValue(name_2, tmpMotion);
                _this._motionCount++;
                if (_this._motionCount >= _this._allMotionCount) {
                    _this._state = LoadStep.LoadTexture;
                    _this._motionManager.stopAllMotions();
                    _this._updating = false;
                    _this._initialized = true;
                    _this.createRenderer();
                    _this.setupTextures();
                    _this.getRenderer().startUp(lappdelegate_1.gl);
                }
            });
        };
        var this_2 = this;
        for (var i = 0; i < this._modelSetting.getMotionCount(group); i++) {
            _loop_3(i);
        }
    };
    LAppModel.prototype.releaseMotions = function () {
        this._motions.clear();
    };
    LAppModel.prototype.releaseExpressions = function () {
        this._expressions.clear();
    };
    LAppModel.prototype.doDraw = function () {
        if (this._model == null)
            return;
        var viewport = [0, 0, lappdelegate_1.canvas.width, lappdelegate_1.canvas.height];
        this.getRenderer().setRenderState(lappdelegate_1.frameBuffer, viewport);
        this.getRenderer().drawModel();
    };
    LAppModel.prototype.draw = function (matrix) {
        if (this._model == null) {
            return;
        }
        if (this._state == LoadStep.CompleteSetup) {
            matrix.multiplyByMatrix(this._modelMatrix);
            this.getRenderer().setMvpMatrix(matrix);
            this.doDraw();
        }
    };
    return LAppModel;
}(cubismusermodel_1.CubismUserModel));
exports.LAppModel = LAppModel;


/***/ }),

/***/ "./src/lapppal.ts":
/*!************************!*\
  !*** ./src/lapppal.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LAppPal = void 0;
var LAppPal = (function () {
    function LAppPal() {
    }
    LAppPal.loadFileAsBytes = function (filePath, callback) {
        fetch(filePath)
            .then(function (response) { return response.arrayBuffer(); })
            .then(function (arrayBuffer) { return callback(arrayBuffer, arrayBuffer.byteLength); });
    };
    LAppPal.getDeltaTime = function () {
        return this.s_deltaTime;
    };
    LAppPal.updateTime = function () {
        this.s_currentFrame = Date.now();
        this.s_deltaTime = (this.s_currentFrame - this.s_lastFrame) / 1000;
        this.s_lastFrame = this.s_currentFrame;
    };
    LAppPal.printMessage = function (message) {
        console.log(message);
    };
    LAppPal.lastUpdate = Date.now();
    LAppPal.s_currentFrame = 0.0;
    LAppPal.s_lastFrame = 0.0;
    LAppPal.s_deltaTime = 0.0;
    return LAppPal;
}());
exports.LAppPal = LAppPal;


/***/ }),

/***/ "./src/lappsprite.ts":
/*!***************************!*\
  !*** ./src/lappsprite.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rect = exports.LAppSprite = void 0;
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var LAppSprite = (function () {
    function LAppSprite(x, y, width, height, textureId) {
        this._rect = new Rect();
        this._rect.left = x - width * 0.5;
        this._rect.right = x + width * 0.5;
        this._rect.up = y + height * 0.5;
        this._rect.down = y - height * 0.5;
        this._texture = textureId;
        this._vertexBuffer = null;
        this._uvBuffer = null;
        this._indexBuffer = null;
        this._positionLocation = null;
        this._uvLocation = null;
        this._textureLocation = null;
        this._positionArray = null;
        this._uvArray = null;
        this._indexArray = null;
        this._firstDraw = true;
    }
    LAppSprite.prototype.release = function () {
        this._rect = null;
        lappdelegate_1.gl.deleteTexture(this._texture);
        this._texture = null;
        lappdelegate_1.gl.deleteBuffer(this._uvBuffer);
        this._uvBuffer = null;
        lappdelegate_1.gl.deleteBuffer(this._vertexBuffer);
        this._vertexBuffer = null;
        lappdelegate_1.gl.deleteBuffer(this._indexBuffer);
        this._indexBuffer = null;
    };
    LAppSprite.prototype.getTexture = function () {
        return this._texture;
    };
    LAppSprite.prototype.render = function (programId) {
        if (this._texture == null) {
            return;
        }
        if (this._firstDraw) {
            this._positionLocation = lappdelegate_1.gl.getAttribLocation(programId, 'position');
            lappdelegate_1.gl.enableVertexAttribArray(this._positionLocation);
            this._uvLocation = lappdelegate_1.gl.getAttribLocation(programId, 'uv');
            lappdelegate_1.gl.enableVertexAttribArray(this._uvLocation);
            this._textureLocation = lappdelegate_1.gl.getUniformLocation(programId, 'texture');
            lappdelegate_1.gl.uniform1i(this._textureLocation, 0);
            {
                this._uvArray = new Float32Array([
                    1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0
                ]);
                this._uvBuffer = lappdelegate_1.gl.createBuffer();
            }
            {
                var maxWidth = lappdelegate_1.canvas.width;
                var maxHeight = lappdelegate_1.canvas.height;
                this._positionArray = new Float32Array([
                    (this._rect.right - maxWidth * 0.5) / (maxWidth * 0.5),
                    (this._rect.up - maxHeight * 0.5) / (maxHeight * 0.5),
                    (this._rect.left - maxWidth * 0.5) / (maxWidth * 0.5),
                    (this._rect.up - maxHeight * 0.5) / (maxHeight * 0.5),
                    (this._rect.left - maxWidth * 0.5) / (maxWidth * 0.5),
                    (this._rect.down - maxHeight * 0.5) / (maxHeight * 0.5),
                    (this._rect.right - maxWidth * 0.5) / (maxWidth * 0.5),
                    (this._rect.down - maxHeight * 0.5) / (maxHeight * 0.5)
                ]);
                this._vertexBuffer = lappdelegate_1.gl.createBuffer();
            }
            {
                this._indexArray = new Uint16Array([0, 1, 2, 3, 2, 0]);
                this._indexBuffer = lappdelegate_1.gl.createBuffer();
            }
            this._firstDraw = false;
        }
        lappdelegate_1.gl.bindBuffer(lappdelegate_1.gl.ARRAY_BUFFER, this._uvBuffer);
        lappdelegate_1.gl.bufferData(lappdelegate_1.gl.ARRAY_BUFFER, this._uvArray, lappdelegate_1.gl.STATIC_DRAW);
        lappdelegate_1.gl.vertexAttribPointer(this._uvLocation, 2, lappdelegate_1.gl.FLOAT, false, 0, 0);
        lappdelegate_1.gl.bindBuffer(lappdelegate_1.gl.ARRAY_BUFFER, this._vertexBuffer);
        lappdelegate_1.gl.bufferData(lappdelegate_1.gl.ARRAY_BUFFER, this._positionArray, lappdelegate_1.gl.STATIC_DRAW);
        lappdelegate_1.gl.vertexAttribPointer(this._positionLocation, 2, lappdelegate_1.gl.FLOAT, false, 0, 0);
        lappdelegate_1.gl.bindBuffer(lappdelegate_1.gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        lappdelegate_1.gl.bufferData(lappdelegate_1.gl.ELEMENT_ARRAY_BUFFER, this._indexArray, lappdelegate_1.gl.DYNAMIC_DRAW);
        lappdelegate_1.gl.bindTexture(lappdelegate_1.gl.TEXTURE_2D, this._texture);
        lappdelegate_1.gl.drawElements(lappdelegate_1.gl.TRIANGLES, this._indexArray.length, lappdelegate_1.gl.UNSIGNED_SHORT, 0);
    };
    LAppSprite.prototype.isHit = function (pointX, pointY) {
        var height = lappdelegate_1.canvas.height;
        var y = height - pointY;
        return (pointX >= this._rect.left &&
            pointX <= this._rect.right &&
            y <= this._rect.up &&
            y >= this._rect.down);
    };
    return LAppSprite;
}());
exports.LAppSprite = LAppSprite;
var Rect = (function () {
    function Rect() {
    }
    return Rect;
}());
exports.Rect = Rect;


/***/ }),

/***/ "./src/lapptexturemanager.ts":
/*!***********************************!*\
  !*** ./src/lapptexturemanager.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TextureInfo = exports.LAppTextureManager = void 0;
var csmvector_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/type/csmvector'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var LAppTextureManager = (function () {
    function LAppTextureManager() {
        this._textures = new csmvector_1.csmVector();
    }
    LAppTextureManager.prototype.release = function () {
        for (var ite = this._textures.begin(); ite.notEqual(this._textures.end()); ite.preIncrement()) {
            lappdelegate_1.gl.deleteTexture(ite.ptr().id);
        }
        this._textures = null;
    };
    LAppTextureManager.prototype.createTextureFromPngFile = function (fileName, usePremultiply, callback) {
        var _this = this;
        var _loop_1 = function (ite) {
            if (ite.ptr().fileName == fileName &&
                ite.ptr().usePremultply == usePremultiply) {
                ite.ptr().img = new Image();
                ite.ptr().img.onload = function () { return callback(ite.ptr()); };
                ite.ptr().img.src = fileName;
                return { value: void 0 };
            }
        };
        for (var ite = this._textures.begin(); ite.notEqual(this._textures.end()); ite.preIncrement()) {
            var state_1 = _loop_1(ite);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        var img = new Image();
        img.onload = function () {
            var tex = lappdelegate_1.gl.createTexture();
            lappdelegate_1.gl.bindTexture(lappdelegate_1.gl.TEXTURE_2D, tex);
            lappdelegate_1.gl.texParameteri(lappdelegate_1.gl.TEXTURE_2D, lappdelegate_1.gl.TEXTURE_MIN_FILTER, lappdelegate_1.gl.LINEAR_MIPMAP_LINEAR);
            lappdelegate_1.gl.texParameteri(lappdelegate_1.gl.TEXTURE_2D, lappdelegate_1.gl.TEXTURE_MAG_FILTER, lappdelegate_1.gl.LINEAR);
            if (usePremultiply) {
                lappdelegate_1.gl.pixelStorei(lappdelegate_1.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
            }
            lappdelegate_1.gl.texImage2D(lappdelegate_1.gl.TEXTURE_2D, 0, lappdelegate_1.gl.RGBA, lappdelegate_1.gl.RGBA, lappdelegate_1.gl.UNSIGNED_BYTE, img);
            lappdelegate_1.gl.generateMipmap(lappdelegate_1.gl.TEXTURE_2D);
            lappdelegate_1.gl.bindTexture(lappdelegate_1.gl.TEXTURE_2D, null);
            var textureInfo = new TextureInfo();
            if (textureInfo != null) {
                textureInfo.fileName = fileName;
                textureInfo.width = img.width;
                textureInfo.height = img.height;
                textureInfo.id = tex;
                textureInfo.img = img;
                textureInfo.usePremultply = usePremultiply;
                _this._textures.pushBack(textureInfo);
            }
            callback(textureInfo);
        };
        img.src = fileName;
    };
    LAppTextureManager.prototype.releaseTextures = function () {
        for (var i = 0; i < this._textures.getSize(); i++) {
            this._textures.set(i, null);
        }
        this._textures.clear();
    };
    LAppTextureManager.prototype.releaseTextureByTexture = function (texture) {
        for (var i = 0; i < this._textures.getSize(); i++) {
            if (this._textures.at(i).id != texture) {
                continue;
            }
            this._textures.set(i, null);
            this._textures.remove(i);
            break;
        }
    };
    LAppTextureManager.prototype.releaseTextureByFilePath = function (fileName) {
        for (var i = 0; i < this._textures.getSize(); i++) {
            if (this._textures.at(i).fileName == fileName) {
                this._textures.set(i, null);
                this._textures.remove(i);
                break;
            }
        }
    };
    return LAppTextureManager;
}());
exports.LAppTextureManager = LAppTextureManager;
var TextureInfo = (function () {
    function TextureInfo() {
        this.id = null;
        this.width = 0;
        this.height = 0;
    }
    return TextureInfo;
}());
exports.TextureInfo = TextureInfo;


/***/ }),

/***/ "./src/lappview.ts":
/*!*************************!*\
  !*** ./src/lappview.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LAppView = void 0;
var cubismmatrix44_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/math/cubismmatrix44'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var cubismviewmatrix_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@framework/math/cubismviewmatrix'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var LAppDefine = __importStar(__webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts"));
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var lapplive2dmanager_1 = __webpack_require__(/*! ./lapplive2dmanager */ "./src/lapplive2dmanager.ts");
var lapppal_1 = __webpack_require__(/*! ./lapppal */ "./src/lapppal.ts");
var lappsprite_1 = __webpack_require__(/*! ./lappsprite */ "./src/lappsprite.ts");
var touchmanager_1 = __webpack_require__(/*! ./touchmanager */ "./src/touchmanager.ts");
var LAppView = (function () {
    function LAppView() {
        this._programId = null;
        this._back = null;
        this._gear = null;
        this._touchManager = new touchmanager_1.TouchManager();
        this._deviceToScreen = new cubismmatrix44_1.CubismMatrix44();
        this._viewMatrix = new cubismviewmatrix_1.CubismViewMatrix();
    }
    LAppView.prototype.initialize = function () {
        var width = lappdelegate_1.canvas.width, height = lappdelegate_1.canvas.height;
        var ratio = width / height;
        var left = -ratio;
        var right = ratio;
        var bottom = LAppDefine.ViewLogicalLeft;
        var top = LAppDefine.ViewLogicalRight;
        this._viewMatrix.setScreenRect(left, right, bottom, top);
        this._viewMatrix.scale(LAppDefine.ViewScale, LAppDefine.ViewScale);
        this._deviceToScreen.loadIdentity();
        if (width > height) {
            var screenW = Math.abs(right - left);
            this._deviceToScreen.scaleRelative(screenW / width, -screenW / width);
        }
        else {
            var screenH = Math.abs(top - bottom);
            this._deviceToScreen.scaleRelative(screenH / height, -screenH / height);
        }
        this._deviceToScreen.translateRelative(-width * 0.5, -height * 0.5);
        this._viewMatrix.setMaxScale(LAppDefine.ViewMaxScale);
        this._viewMatrix.setMinScale(LAppDefine.ViewMinScale);
        this._viewMatrix.setMaxScreenRect(LAppDefine.ViewLogicalMaxLeft, LAppDefine.ViewLogicalMaxRight, LAppDefine.ViewLogicalMaxBottom, LAppDefine.ViewLogicalMaxTop);
    };
    LAppView.prototype.release = function () {
        this._viewMatrix = null;
        this._touchManager = null;
        this._deviceToScreen = null;
        this._gear.release();
        this._gear = null;
        this._back.release();
        this._back = null;
        lappdelegate_1.gl.deleteProgram(this._programId);
        this._programId = null;
    };
    LAppView.prototype.render = function () {
        lappdelegate_1.gl.useProgram(this._programId);
        if (this._back) {
            this._back.render(this._programId);
        }
        if (this._gear) {
            this._gear.render(this._programId);
        }
        lappdelegate_1.gl.flush();
        var live2DManager = lapplive2dmanager_1.LAppLive2DManager.getInstance();
        live2DManager.setViewMatrix(this._viewMatrix);
        live2DManager.onUpdate();
    };
    LAppView.prototype.initializeSprite = function () {
        var _this = this;
        var width = lappdelegate_1.canvas.width;
        var height = lappdelegate_1.canvas.height;
        var textureManager = lappdelegate_1.LAppDelegate.getInstance().getTextureManager();
        var resourcesPath = LAppDefine.ResourcesPath;
        var imageName = '';
        imageName = LAppDefine.BackImageName;
        var initBackGroundTexture = function (textureInfo) {
            var x = width * 0.5;
            var y = height * 0.5;
            var fwidth = textureInfo.width * 2.0;
            var fheight = height * 0.95;
            _this._back = new lappsprite_1.LAppSprite(x, y, fwidth, fheight, textureInfo.id);
        };
        textureManager.createTextureFromPngFile(resourcesPath + imageName, false, initBackGroundTexture);
        imageName = LAppDefine.GearImageName;
        var initGearTexture = function (textureInfo) {
            var x = width - textureInfo.width * 0.5;
            var y = height - textureInfo.height * 0.5;
            var fwidth = textureInfo.width;
            var fheight = textureInfo.height;
            _this._gear = new lappsprite_1.LAppSprite(x, y, fwidth, fheight, textureInfo.id);
        };
        textureManager.createTextureFromPngFile(resourcesPath + imageName, false, initGearTexture);
        if (this._programId == null) {
            this._programId = lappdelegate_1.LAppDelegate.getInstance().createShader();
        }
    };
    LAppView.prototype.onTouchesBegan = function (pointX, pointY) {
        this._touchManager.touchesBegan(pointX, pointY);
    };
    LAppView.prototype.onTouchesMoved = function (pointX, pointY) {
        var viewX = this.transformViewX(this._touchManager.getX());
        var viewY = this.transformViewY(this._touchManager.getY());
        this._touchManager.touchesMoved(pointX, pointY);
        var live2DManager = lapplive2dmanager_1.LAppLive2DManager.getInstance();
        live2DManager.onDrag(viewX, viewY);
    };
    LAppView.prototype.onTouchesEnded = function (pointX, pointY) {
        var live2DManager = lapplive2dmanager_1.LAppLive2DManager.getInstance();
        live2DManager.onDrag(0.0, 0.0);
        {
            var x = this._deviceToScreen.transformX(this._touchManager.getX());
            var y = this._deviceToScreen.transformY(this._touchManager.getY());
            if (LAppDefine.DebugTouchLogEnable) {
                lapppal_1.LAppPal.printMessage("[APP]touchesEnded x: ".concat(x, " y: ").concat(y));
            }
            live2DManager.onTap(x, y);
        }
    };
    LAppView.prototype.transformViewX = function (deviceX) {
        var screenX = this._deviceToScreen.transformX(deviceX);
        return this._viewMatrix.invertTransformX(screenX);
    };
    LAppView.prototype.transformViewY = function (deviceY) {
        var screenY = this._deviceToScreen.transformY(deviceY);
        return this._viewMatrix.invertTransformY(screenY);
    };
    LAppView.prototype.transformScreenX = function (deviceX) {
        return this._deviceToScreen.transformX(deviceX);
    };
    LAppView.prototype.transformScreenY = function (deviceY) {
        return this._deviceToScreen.transformY(deviceY);
    };
    return LAppView;
}());
exports.LAppView = LAppView;


/***/ }),

/***/ "./src/lappwavfilehandler.ts":
/*!***********************************!*\
  !*** ./src/lappwavfilehandler.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ByteReader = exports.WavFileInfo = exports.LAppWavFileHandler = exports.s_instance = void 0;
exports.s_instance = null;
var LAppWavFileHandler = (function () {
    function LAppWavFileHandler() {
        var _this = this;
        this._loadFiletoBytes = function (arrayBuffer, length) {
            _this._byteReader._fileByte = arrayBuffer;
            _this._byteReader._fileDataView = new DataView(_this._byteReader._fileByte);
            _this._byteReader._fileSize = length;
        };
        this._pcmData = null;
        this._userTimeSeconds = 0.0;
        this._lastRms = 0.0;
        this._sampleOffset = 0.0;
        this._wavFileInfo = new WavFileInfo();
        this._byteReader = new ByteReader();
    }
    LAppWavFileHandler.getInstance = function () {
        if (exports.s_instance == null) {
            exports.s_instance = new LAppWavFileHandler();
        }
        return exports.s_instance;
    };
    LAppWavFileHandler.releaseInstance = function () {
        if (exports.s_instance != null) {
            exports.s_instance = void 0;
        }
        exports.s_instance = null;
    };
    LAppWavFileHandler.prototype.update = function (deltaTimeSeconds) {
        var goalOffset;
        var rms;
        if (this._pcmData == null ||
            this._sampleOffset >= this._wavFileInfo._samplesPerChannel) {
            this._lastRms = 0.0;
            return false;
        }
        this._userTimeSeconds += deltaTimeSeconds;
        goalOffset = Math.floor(this._userTimeSeconds * this._wavFileInfo._samplingRate);
        if (goalOffset > this._wavFileInfo._samplesPerChannel) {
            goalOffset = this._wavFileInfo._samplesPerChannel;
        }
        rms = 0.0;
        for (var channelCount = 0; channelCount < this._wavFileInfo._numberOfChannels; channelCount++) {
            for (var sampleCount = this._sampleOffset; sampleCount < goalOffset; sampleCount++) {
                var pcm = this._pcmData[channelCount][sampleCount];
                rms += pcm * pcm;
            }
        }
        rms = Math.sqrt(rms /
            (this._wavFileInfo._numberOfChannels *
                (goalOffset - this._sampleOffset)));
        this._lastRms = rms;
        this._sampleOffset = goalOffset;
        return true;
    };
    LAppWavFileHandler.prototype.start = function (filePath) {
        this._sampleOffset = 0;
        this._userTimeSeconds = 0.0;
        this._lastRms = 0.0;
    };
    LAppWavFileHandler.prototype.getRms = function () {
        return this._lastRms;
    };
    LAppWavFileHandler.prototype.loadWavFile = function (filePath) {
        var _this = this;
        var ret = false;
        if (this._pcmData != null) {
            this.releasePcmData();
        }
        var asyncFileLoad = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, fetch(filePath).then(function (responce) {
                        return responce.arrayBuffer();
                    })];
            });
        }); };
        var asyncWavFileManager = (function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, fmtChunkSize, dataChunkSize, channelCount, sampleCount, channelCount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._byteReader;
                        return [4, asyncFileLoad()];
                    case 1:
                        _a._fileByte = _b.sent();
                        this._byteReader._fileDataView = new DataView(this._byteReader._fileByte);
                        this._byteReader._fileSize = this._byteReader._fileByte.byteLength;
                        this._byteReader._readOffset = 0;
                        if (this._byteReader._fileByte == null ||
                            this._byteReader._fileSize < 4) {
                            return [2, false];
                        }
                        this._wavFileInfo._fileName = filePath;
                        try {
                            if (!this._byteReader.getCheckSignature('RIFF')) {
                                ret = false;
                                throw new Error('Cannot find Signeture "RIFF".');
                            }
                            this._byteReader.get32LittleEndian();
                            if (!this._byteReader.getCheckSignature('WAVE')) {
                                ret = false;
                                throw new Error('Cannot find Signeture "WAVE".');
                            }
                            if (!this._byteReader.getCheckSignature('fmt ')) {
                                ret = false;
                                throw new Error('Cannot find Signeture "fmt".');
                            }
                            fmtChunkSize = this._byteReader.get32LittleEndian();
                            if (this._byteReader.get16LittleEndian() != 1) {
                                ret = false;
                                throw new Error('File is not linear PCM.');
                            }
                            this._wavFileInfo._numberOfChannels =
                                this._byteReader.get16LittleEndian();
                            this._wavFileInfo._samplingRate = this._byteReader.get32LittleEndian();
                            this._byteReader.get32LittleEndian();
                            this._byteReader.get16LittleEndian();
                            this._wavFileInfo._bitsPerSample = this._byteReader.get16LittleEndian();
                            if (fmtChunkSize > 16) {
                                this._byteReader._readOffset += fmtChunkSize - 16;
                            }
                            while (!this._byteReader.getCheckSignature('data') &&
                                this._byteReader._readOffset < this._byteReader._fileSize) {
                                this._byteReader._readOffset +=
                                    this._byteReader.get32LittleEndian() + 4;
                            }
                            if (this._byteReader._readOffset >= this._byteReader._fileSize) {
                                ret = false;
                                throw new Error('Cannot find "data" Chunk.');
                            }
                            {
                                dataChunkSize = this._byteReader.get32LittleEndian();
                                this._wavFileInfo._samplesPerChannel =
                                    (dataChunkSize * 8) /
                                        (this._wavFileInfo._bitsPerSample *
                                            this._wavFileInfo._numberOfChannels);
                            }
                            this._pcmData = new Array(this._wavFileInfo._numberOfChannels);
                            for (channelCount = 0; channelCount < this._wavFileInfo._numberOfChannels; channelCount++) {
                                this._pcmData[channelCount] = new Float32Array(this._wavFileInfo._samplesPerChannel);
                            }
                            for (sampleCount = 0; sampleCount < this._wavFileInfo._samplesPerChannel; sampleCount++) {
                                for (channelCount = 0; channelCount < this._wavFileInfo._numberOfChannels; channelCount++) {
                                    this._pcmData[channelCount][sampleCount] = this.getPcmSample();
                                }
                            }
                            ret = true;
                        }
                        catch (e) {
                            console.log(e);
                        }
                        return [2];
                }
            });
        }); })();
        return ret;
    };
    LAppWavFileHandler.prototype.getPcmSample = function () {
        var pcm32;
        switch (this._wavFileInfo._bitsPerSample) {
            case 8:
                pcm32 = this._byteReader.get8() - 128;
                pcm32 <<= 24;
                break;
            case 16:
                pcm32 = this._byteReader.get16LittleEndian() << 16;
                break;
            case 24:
                pcm32 = this._byteReader.get24LittleEndian() << 8;
                break;
            default:
                pcm32 = 0;
                break;
        }
        return pcm32 / 2147483647;
    };
    LAppWavFileHandler.prototype.releasePcmData = function () {
        for (var channelCount = 0; channelCount < this._wavFileInfo._numberOfChannels; channelCount++) {
            delete this._pcmData[channelCount];
        }
        delete this._pcmData;
        this._pcmData = null;
    };
    return LAppWavFileHandler;
}());
exports.LAppWavFileHandler = LAppWavFileHandler;
var WavFileInfo = (function () {
    function WavFileInfo() {
        this._fileName = '';
        this._numberOfChannels = 0;
        this._bitsPerSample = 0;
        this._samplingRate = 0;
        this._samplesPerChannel = 0;
    }
    return WavFileInfo;
}());
exports.WavFileInfo = WavFileInfo;
var ByteReader = (function () {
    function ByteReader() {
        this._fileByte = null;
        this._fileDataView = null;
        this._fileSize = 0;
        this._readOffset = 0;
    }
    ByteReader.prototype.get8 = function () {
        var ret = this._fileDataView.getUint8(this._readOffset);
        this._readOffset++;
        return ret;
    };
    ByteReader.prototype.get16LittleEndian = function () {
        var ret = (this._fileDataView.getUint8(this._readOffset + 1) << 8) |
            this._fileDataView.getUint8(this._readOffset);
        this._readOffset += 2;
        return ret;
    };
    ByteReader.prototype.get24LittleEndian = function () {
        var ret = (this._fileDataView.getUint8(this._readOffset + 2) << 16) |
            (this._fileDataView.getUint8(this._readOffset + 1) << 8) |
            this._fileDataView.getUint8(this._readOffset);
        this._readOffset += 3;
        return ret;
    };
    ByteReader.prototype.get32LittleEndian = function () {
        var ret = (this._fileDataView.getUint8(this._readOffset + 3) << 24) |
            (this._fileDataView.getUint8(this._readOffset + 2) << 16) |
            (this._fileDataView.getUint8(this._readOffset + 1) << 8) |
            this._fileDataView.getUint8(this._readOffset);
        this._readOffset += 4;
        return ret;
    };
    ByteReader.prototype.getCheckSignature = function (reference) {
        var getSignature = new Uint8Array(4);
        var referenceString = new TextEncoder().encode(reference);
        if (reference.length != 4) {
            return false;
        }
        for (var signatureOffset = 0; signatureOffset < 4; signatureOffset++) {
            getSignature[signatureOffset] = this.get8();
        }
        return (getSignature[0] == referenceString[0] &&
            getSignature[1] == referenceString[1] &&
            getSignature[2] == referenceString[2] &&
            getSignature[3] == referenceString[3]);
    };
    return ByteReader;
}());
exports.ByteReader = ByteReader;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var LAppDefine = __importStar(__webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts"));
window.onload = function () {
    if (lappdelegate_1.LAppDelegate.getInstance().initialize() == false) {
        return;
    }
    lappdelegate_1.LAppDelegate.getInstance().run();
};
window.onbeforeunload = function () { return lappdelegate_1.LAppDelegate.releaseInstance(); };
window.onresize = function () {
    if (LAppDefine.CanvasSize === 'auto') {
        lappdelegate_1.LAppDelegate.getInstance().onResize();
    }
};
window.startVoiceConversation = function (language, data) {
    lappdelegate_1.LAppDelegate.getInstance().startVoiceConversation(language, data);
};


/***/ }),

/***/ "./src/touchmanager.ts":
/*!*****************************!*\
  !*** ./src/touchmanager.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TouchManager = void 0;
var TouchManager = (function () {
    function TouchManager() {
        this._startX = 0.0;
        this._startY = 0.0;
        this._lastX = 0.0;
        this._lastY = 0.0;
        this._lastX1 = 0.0;
        this._lastY1 = 0.0;
        this._lastX2 = 0.0;
        this._lastY2 = 0.0;
        this._lastTouchDistance = 0.0;
        this._deltaX = 0.0;
        this._deltaY = 0.0;
        this._scale = 1.0;
        this._touchSingle = false;
        this._flipAvailable = false;
    }
    TouchManager.prototype.getCenterX = function () {
        return this._lastX;
    };
    TouchManager.prototype.getCenterY = function () {
        return this._lastY;
    };
    TouchManager.prototype.getDeltaX = function () {
        return this._deltaX;
    };
    TouchManager.prototype.getDeltaY = function () {
        return this._deltaY;
    };
    TouchManager.prototype.getStartX = function () {
        return this._startX;
    };
    TouchManager.prototype.getStartY = function () {
        return this._startY;
    };
    TouchManager.prototype.getScale = function () {
        return this._scale;
    };
    TouchManager.prototype.getX = function () {
        return this._lastX;
    };
    TouchManager.prototype.getY = function () {
        return this._lastY;
    };
    TouchManager.prototype.getX1 = function () {
        return this._lastX1;
    };
    TouchManager.prototype.getY1 = function () {
        return this._lastY1;
    };
    TouchManager.prototype.getX2 = function () {
        return this._lastX2;
    };
    TouchManager.prototype.getY2 = function () {
        return this._lastY2;
    };
    TouchManager.prototype.isSingleTouch = function () {
        return this._touchSingle;
    };
    TouchManager.prototype.isFlickAvailable = function () {
        return this._flipAvailable;
    };
    TouchManager.prototype.disableFlick = function () {
        this._flipAvailable = false;
    };
    TouchManager.prototype.touchesBegan = function (deviceX, deviceY) {
        this._lastX = deviceX;
        this._lastY = deviceY;
        this._startX = deviceX;
        this._startY = deviceY;
        this._lastTouchDistance = -1.0;
        this._flipAvailable = true;
        this._touchSingle = true;
    };
    TouchManager.prototype.touchesMoved = function (deviceX, deviceY) {
        this._lastX = deviceX;
        this._lastY = deviceY;
        this._lastTouchDistance = -1.0;
        this._touchSingle = true;
    };
    TouchManager.prototype.getFlickDistance = function () {
        return this.calculateDistance(this._startX, this._startY, this._lastX, this._lastY);
    };
    TouchManager.prototype.calculateDistance = function (x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    };
    TouchManager.prototype.calculateMovingAmount = function (v1, v2) {
        if (v1 > 0.0 != v2 > 0.0) {
            return 0.0;
        }
        var sign = v1 > 0.0 ? 1.0 : -1.0;
        var absoluteValue1 = Math.abs(v1);
        var absoluteValue2 = Math.abs(v2);
        return (sign * (absoluteValue1 < absoluteValue2 ? absoluteValue1 : absoluteValue2));
    };
    return TouchManager;
}());
exports.TouchManager = TouchManager;


/***/ }),

/***/ "./node_modules/webm-to-wav-converter/WavRecorder.js":
/*!***********************************************************!*\
  !*** ./node_modules/webm-to-wav-converter/WavRecorder.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const getWaveBlob = __webpack_require__(/*! ./wavBlobUtil */ "./node_modules/webm-to-wav-converter/wavBlobUtil.js");
const downloadWav = __webpack_require__(/*! ./downloadUtil */ "./node_modules/webm-to-wav-converter/downloadUtil.js");

/** Class Representing a WavRecorder */
class WavRecorder {
    /**
     * @property {MediaRecorder} mediaRecorder - MediaRecorder instance
     */
    mediaRecorder;

    /**
     * @property {MediaStream} - stream User's MediaStream
     */
    stream;

    /**
     * @property {Blob} __data - Recorded WEBM data
     */
    __data;

    /**
     * Access user media from the audio input, will be asking audio permission if not available already
     * @param {MediaTrackConstraints} constraints - MediaTrackConstraints to be applied, if any defaults = { audio: true, video: false }
     * @return - Got User MediaStream or not
     */
    async start(constraints = { audio: true, video: false }) {
        if (this.mediaRecorder?.state === "recording") return true;

        const mediaTrackConstraints = constraints || { audio: true, video: false };

        try {
            this.stream = await navigator.mediaDevices.getUserMedia(mediaTrackConstraints);

            this.mediaRecorder = new MediaRecorder(this.stream);

            this.mediaRecorder.ondataavailable = (e) => this.__data = e.data;
        } catch (err) {
            console.error(err);
            return false;
        }

        this.mediaRecorder?.start();
        return true;
    }

    /**
     * Stop recording the audio
     * @returns {void}
     */
    stop() {
        if (this.mediaRecorder?.state !== "recording") return true;

        this.mediaRecorder.stop();
        this.mediaRecorder.onstop = () => {
            this.stream.getTracks().forEach(track => track.stop());
            this.mediaRecorder = undefined;
            this.stream = undefined;
        }
    }

    /**
     * Download the wav audio file
     * @param {string} filename - Optional name of the file to be downloaded, without extension 
     * @param {boolean} as32Bit - Audio required in 32-bit, default is 16-bit.
     * @param {AudioContextOptions} contextOptions - optiosn needs to be used for encoding
     * @returns {void}
     */
    async download(
        filename = null, as32Bit = false, contextOptions = undefined
    ) {
        if (this.__data) return await downloadWav(this.__data, as32Bit, filename, contextOptions);
    }

    /**
     * Get the recorded wav audio Blob
     * @param {boolean} as32Bit - Get 32-bit audio, default is 16-bit
     * @param {AudioContextOptions} contextOptions - optiosn needs to be used for encoding
     * @returns {void}
     */
    async getBlob(as32Bit = false, contextOptions = undefined) {
        if (this.__data) return await getWaveBlob(this.__data, as32Bit, contextOptions);
    }
}

module.exports = WavRecorder;

/***/ }),

/***/ "./node_modules/webm-to-wav-converter/downloadUtil.js":
/*!************************************************************!*\
  !*** ./node_modules/webm-to-wav-converter/downloadUtil.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const getWaveBlob = __webpack_require__(/*! ./wavBlobUtil */ "./node_modules/webm-to-wav-converter/wavBlobUtil.js");

/**
 * @param {Blob | Blob[]} blobData - Blob or Blob[] to be converted to audio/wave Blob
 * @param {boolean} as32BitFloat - Convert to 16-bit or 32-bit file
 * @param {string} filename - Name of the file
 * @param {AudioContextOptions} contextOptions - audio context options for encoding
 * @returns
 */
async function downloadWav(
    blobData, as32BitFloat, filename = null, contextOptions = undefined
) {
    const blob = await getWaveBlob(blobData, as32BitFloat, contextOptions);

    const anchorElement = document.createElement('a');
    anchorElement.href = window.URL.createObjectURL(blob);
    anchorElement.download = filename || `recording('${as32BitFloat ? '32bit' : '16bit'}).wav`;
    anchorElement.style.display = 'none';
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
}

module.exports = downloadWav;

/***/ }),

/***/ "./node_modules/webm-to-wav-converter/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/webm-to-wav-converter/index.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports.WavRecorder = __webpack_require__(/*! ./WavRecorder */ "./node_modules/webm-to-wav-converter/WavRecorder.js");
module.exports.getWaveBlob = __webpack_require__(/*! ./wavBlobUtil */ "./node_modules/webm-to-wav-converter/wavBlobUtil.js");
module.exports.downloadWav = __webpack_require__(/*! ./downloadUtil */ "./node_modules/webm-to-wav-converter/downloadUtil.js");

/***/ }),

/***/ "./node_modules/webm-to-wav-converter/wavBlobUtil.js":
/*!***********************************************************!*\
  !*** ./node_modules/webm-to-wav-converter/wavBlobUtil.js ***!
  \***********************************************************/
/***/ (function(module) {

function _writeStringToArray(aString, targetArray, offset) {
    for (let i = 0; i < aString.length; ++i)
        targetArray[offset + i] = aString.charCodeAt(i);
}

function _writeInt16ToArray(aNumber, targetArray, offset) {
    aNumber = Math.floor(aNumber);
    targetArray[offset + 0] = aNumber & 255;          // byte 1
    targetArray[offset + 1] = (aNumber >> 8) & 255;   // byte 2
}

function _writeInt32ToArray(aNumber, targetArray, offset) {
    aNumber = Math.floor(aNumber);
    targetArray[offset + 0] = aNumber & 255;          // byte 1
    targetArray[offset + 1] = (aNumber >> 8) & 255;   // byte 2
    targetArray[offset + 2] = (aNumber >> 16) & 255;  // byte 3
    targetArray[offset + 3] = (aNumber >> 24) & 255;  // byte 4
}

// Return the bits of the float as a 32-bit integer value.  This
// produces the raw bits; no intepretation of the value is done.
function _floatBits(f) {
    const buf = new ArrayBuffer(4);
    (new Float32Array(buf))[0] = f;
    const bits = (new Uint32Array(buf))[0];
    // Return as a signed integer.
    return bits | 0;
}

function _writeAudioBufferToArray(
    audioBuffer,
    targetArray,
    offset,
    bitDepth
) {
    let index = 0, channel = 0;
    const length = audioBuffer.length;
    const channels = audioBuffer.numberOfChannels;
    let channelData, sample;

    // Clamping samples onto the 16-bit resolution.
    for (index = 0; index < length; ++index) {
        for (channel = 0; channel < channels; ++channel) {
            channelData = audioBuffer.getChannelData(channel);

            // Branches upon the requested bit depth
            if (bitDepth === 16) {
                sample = channelData[index] * 32768.0;
                if (sample < -32768)
                    sample = -32768;
                else if (sample > 32767)
                    sample = 32767;
                _writeInt16ToArray(sample, targetArray, offset);
                offset += 2;
            } else if (bitDepth === 32) {
                // This assumes we're going to out 32-float, not 32-bit linear.
                sample = _floatBits(channelData[index]);
                _writeInt32ToArray(sample, targetArray, offset);
                offset += 4;
            } else {
                console.log('Invalid bit depth for PCM encoding.');
                return;
            }

        }
    }
}

// Converts the Blob data to AudioBuffer
async function _getAudioBuffer(blobData, contextOptions = undefined) {
    let blob = blobData;

    if (!(blob instanceof Blob)) blob = new Blob([blobData]);

    const url = URL.createObjectURL(blob);

    const response = await fetch(url);

    const arrayBuffer = await response.arrayBuffer();

    const audioContext = new AudioContext(contextOptions);

    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

    return audioBuffer;
}

/**
 * 
 * @param {Blob | Blob[]} blobData - Blob or Blob[] to be converted to audio/wave Blob
 * @param {boolean} as32BitFloat - Convert to 16-bit or 32-bit file, default 16-bit
 * @param {AudioContextOptions} contextOptions - optiosn needs to be used for encoding
 * @returns 
 */
async function getWaveBlob(
    blobData, as32BitFloat, contextOptions = undefined
) {
    const audioBuffer = await _getAudioBuffer(blobData, contextOptions);

    // Encoding setup.
    const frameLength = audioBuffer.length;
    const numberOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const bitsPerSample = as32BitFloat ? 32 : 16;
    const bytesPerSample = bitsPerSample / 8;
    const byteRate = sampleRate * numberOfChannels * bitsPerSample / 8;
    const blockAlign = numberOfChannels * bitsPerSample / 8;
    const wavDataByteLength = frameLength * numberOfChannels * bytesPerSample;
    const headerByteLength = 44;
    const totalLength = headerByteLength + wavDataByteLength;
    const waveFileData = new Uint8Array(totalLength);
    const subChunk1Size = 16;
    const subChunk2Size = wavDataByteLength;
    const chunkSize = 4 + (8 + subChunk1Size) + (8 + subChunk2Size);

    _writeStringToArray('RIFF', waveFileData, 0);
    _writeInt32ToArray(chunkSize, waveFileData, 4);
    _writeStringToArray('WAVE', waveFileData, 8);
    _writeStringToArray('fmt ', waveFileData, 12);

    // SubChunk1Size (4)
    _writeInt32ToArray(subChunk1Size, waveFileData, 16);
    // AudioFormat (2): 3 means 32-bit float, 1 means integer PCM.
    _writeInt16ToArray(as32BitFloat ? 3 : 1, waveFileData, 20);
    // NumChannels (2)
    _writeInt16ToArray(numberOfChannels, waveFileData, 22);
    // SampleRate (4)
    _writeInt32ToArray(sampleRate, waveFileData, 24);
    // ByteRate (4)
    _writeInt32ToArray(byteRate, waveFileData, 28);
    // BlockAlign (2)
    _writeInt16ToArray(blockAlign, waveFileData, 32);
    // BitsPerSample (4)
    _writeInt32ToArray(bitsPerSample, waveFileData, 34);
    _writeStringToArray('data', waveFileData, 36);
    // SubChunk2Size (4)
    _writeInt32ToArray(subChunk2Size, waveFileData, 40);

    // Write actual audio data starting at offset 44.
    _writeAudioBufferToArray(audioBuffer, waveFileData, 44, bitsPerSample);

    return new Blob([waveFileData], {
        type: 'audio/wave'
    });
}

module.exports = getWaveBlob;


/***/ }),

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOMException": function() { return /* binding */ DOMException; },
/* harmony export */   "Headers": function() { return /* binding */ Headers; },
/* harmony export */   "Request": function() { return /* binding */ Request; },
/* harmony export */   "Response": function() { return /* binding */ Response; },
/* harmony export */   "fetch": function() { return /* binding */ fetch; }
/* harmony export */ });
var global =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  (typeof global !== 'undefined' && global)

var support = {
  searchParams: 'URLSearchParams' in global,
  iterable: 'Symbol' in global && 'iterator' in Symbol,
  blob:
    'FileReader' in global &&
    'Blob' in global &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in global,
  arrayBuffer: 'ArrayBuffer' in global
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
    throw new TypeError('Invalid character in header field name: "' + name + '"')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    /*
      fetch-mock wraps the Response object in an ES6 Proxy to
      provide useful test harness features such as flush. However, on
      ES5 browsers without fetch or Proxy support pollyfills must be used;
      the proxy-pollyfill is unable to proxy an attribute unless it exists
      on the object before the Proxy is created. This change ensures
      Response.bodyUsed exists on the instance, while maintaining the
      semantic of setting Request.bodyUsed in the constructor before
      _initBody is called.
    */
    this.bodyUsed = this.bodyUsed
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        var isConsumed = consumed(this)
        if (isConsumed) {
          return isConsumed
        }
        if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
          return Promise.resolve(
            this._bodyArrayBuffer.buffer.slice(
              this._bodyArrayBuffer.byteOffset,
              this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
            )
          )
        } else {
          return Promise.resolve(this._bodyArrayBuffer)
        }
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  if (!(this instanceof Request)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }

  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)

  if (this.method === 'GET' || this.method === 'HEAD') {
    if (options.cache === 'no-store' || options.cache === 'no-cache') {
      // Search for a '_' parameter in the query string
      var reParamSearch = /([?&])_=[^&]*/
      if (reParamSearch.test(this.url)) {
        // If it already exists then set the value with the current time
        this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime())
      } else {
        // Otherwise add a new '_' parameter to the end with the current time
        var reQueryString = /\?/
        this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime()
      }
    }
  }
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
  // https://github.com/github/fetch/issues/748
  // https://github.com/zloirock/core-js/issues/751
  preProcessedHeaders
    .split('\r')
    .map(function(header) {
      return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
    })
    .forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!(this instanceof Response)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = options.statusText === undefined ? '' : '' + options.statusText
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = global.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      setTimeout(function() {
        resolve(new Response(body, options))
      }, 0)
    }

    xhr.onerror = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.ontimeout = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.onabort = function() {
      setTimeout(function() {
        reject(new DOMException('Aborted', 'AbortError'))
      }, 0)
    }

    function fixUrl(url) {
      try {
        return url === '' && global.location.href ? global.location.href : url
      } catch (e) {
        return url
      }
    }

    xhr.open(request.method, fixUrl(request.url), true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr) {
      if (support.blob) {
        xhr.responseType = 'blob'
      } else if (
        support.arrayBuffer &&
        request.headers.get('Content-Type') &&
        request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1
      ) {
        xhr.responseType = 'arraybuffer'
      }
    }

    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
      Object.getOwnPropertyNames(init.headers).forEach(function(name) {
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]))
      })
    } else {
      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })
    }

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!global.fetch) {
  global.fetch = fetch
  global.Headers = Headers
  global.Request = Request
  global.Response = Response
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZUFBZTtBQUMxQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxxQkFBcUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsSkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEIscUJBQXFCO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EscUNBQXFDLDBCQUEwQjtBQUMvRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkJBQTZCLDBCQUEwQixlQUFlO0FBQ3RFOztBQUVPO0FBQ1A7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzVsQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9henVyZWFpLnRzIiwid2VicGFjazovLy8uL3NyYy9sYW5ndWFnZXRvdm9pY2VtYXBwaW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9sYXBwZGVmaW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9sYXBwZGVsZWdhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xhcHBsaXZlMmRtYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9sYXBwbW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xhcHBwYWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xhcHBzcHJpdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xhcHB0ZXh0dXJlbWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFwcHZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xhcHB3YXZmaWxlaGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdG91Y2htYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWJtLXRvLXdhdi1jb252ZXJ0ZXIvV2F2UmVjb3JkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYm0tdG8td2F2LWNvbnZlcnRlci9kb3dubG9hZFV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYm0tdG8td2F2LWNvbnZlcnRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2VibS10by13YXYtY29udmVydGVyL3dhdkJsb2JVdGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aGF0d2ctZmV0Y2gvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExBcHBQYWwgfSBmcm9tIFwiLi9sYXBwcGFsXCI7XG5pbXBvcnQgeyBnZXRXYXZlQmxvYiB9IGZyb20gXCJ3ZWJtLXRvLXdhdi1jb252ZXJ0ZXJcIjtcbmltcG9ydCB7IExBTkdVQUdFX1RPX1ZPSUNFX01BUFBJTkdfTElTVCB9IGZyb20gXCIuL2xhbmd1YWdldG92b2ljZW1hcHBpbmdcIjtcblxuXG5leHBvcnQgY2xhc3MgQXp1cmVBaSB7XG4gIHByaXZhdGUgX29wZW5haXVybDogc3RyaW5nO1xuICBwcml2YXRlIF9vcGVuYWlwaWtleTogc3RyaW5nO1xuICBwcml2YXRlIF90dHNhcGlrZXk6IHN0cmluZztcbiAgcHJpdmF0ZSBfdHRzcmVnaW9uOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfaW5Qcm9ncmVzczogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBjb25maWcgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25maWdcIikgYXMgYW55KS52YWx1ZTtcblxuICAgIGlmIChjb25maWcgIT09IFwiXCIpIHtcbiAgICAgIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKGNvbmZpZyk7XG4gICAgICB0aGlzLl9vcGVuYWl1cmwgPSBqc29uLm9wZW5haXVybDtcbiAgICAgIHRoaXMuX29wZW5haXBpa2V5ID0ganNvbi5vcGVuYWlwaWtleTtcbiAgICAgIHRoaXMuX3R0c3JlZ2lvbiA9IGpzb24udHRzcmVnaW9uO1xuICAgICAgdGhpcy5fdHRzYXBpa2V5ID0ganNvbi50dHNhcGlrZXk7XG4gICAgfVxuXG4gICAgdGhpcy5faW5Qcm9ncmVzcyA9IGZhbHNlO1xuICB9XG5cbiAgYXN5bmMgZ2V0T3BlbkFpQW5zd2VyKHByb21wdDogc3RyaW5nKSB7XG5cbiAgICBpZiAodGhpcy5fb3BlbmFpdXJsID09PSB1bmRlZmluZWQgfHwgdGhpcy5faW5Qcm9ncmVzcyB8fCBwcm9tcHQgPT09IFwiXCIpIHJldHVybiBcIlwiO1xuXG4gICAgdGhpcy5faW5Qcm9ncmVzcyA9IHRydWU7XG5cbiAgICBjb25zdCBjb252ZXJzYXRpb25zID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udmVyc2F0aW9uc1wiKSBhcyBhbnkpLnZhbHVlO1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKHByb21wdCk7XG5cbiAgICBjb25zdCBjb252ZXJzYXRpb24gPSBjb252ZXJzYXRpb25zICsgXCJcXG5cXG4jIyBcIiArIHByb21wdFxuICAgIGNvbnN0IG0gPSB7XG4gICAgICBcInByb21wdFwiOiBgIyMke2NvbnZlcnNhdGlvbn1cXG5cXG5gLFxuICAgICAgXCJtYXhfdG9rZW5zXCI6IDMwMCxcbiAgICAgIFwidGVtcGVyYXR1cmVcIjogMCxcbiAgICAgIFwiZnJlcXVlbmN5X3BlbmFsdHlcIjogMCxcbiAgICAgIFwicHJlc2VuY2VfcGVuYWx0eVwiOiAwLFxuICAgICAgXCJ0b3BfcFwiOiAxLFxuICAgICAgXCJzdG9wXCI6IFtcIiNcIiwgXCI7XCJdXG4gICAgfVxuXG4gICAgY29uc3QgcmVwc29uc2UgPSBhd2FpdCBmZXRjaCh0aGlzLl9vcGVuYWl1cmwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnYXBpLWtleSc6IHRoaXMuX29wZW5haXBpa2V5LFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG0pXG4gICAgfSk7XG4gICAgY29uc3QganNvbiA9IGF3YWl0IHJlcHNvbnNlLmpzb24oKTtcbiAgICBjb25zdCBhbnN3ZXI6IHN0cmluZyA9IGpzb24uY2hvaWNlc1swXS50ZXh0XG4gICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoYW5zd2VyKTtcbiAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXBseVwiKSBhcyBhbnkpLnZhbHVlID0gYW5zd2VyO1xuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnZlcnNhdGlvbnNcIikgYXMgYW55KS52YWx1ZSA9IGNvbnZlcnNhdGlvbnMgKyBcIlxcblxcblwiICsgYW5zd2VyO1xuXG4gICAgcmV0dXJuIGFuc3dlcjtcbiAgfVxuXG4gIGFzeW5jIGdldFNwZWVjaFVybChsYW5ndWFnZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcblxuICAgIGlmICh0aGlzLl90dHNyZWdpb24gPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnM6IEhlYWRlcnNJbml0ID0gbmV3IEhlYWRlcnMoKTtcbiAgICByZXF1ZXN0SGVhZGVycy5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9zc21sK3htbCcpO1xuICAgIHJlcXVlc3RIZWFkZXJzLnNldCgnWC1NaWNyb3NvZnQtT3V0cHV0Rm9ybWF0JywgJ3JpZmYtOGtoei0xNmJpdC1tb25vLXBjbScpO1xuICAgIHJlcXVlc3RIZWFkZXJzLnNldCgnT2NwLUFwaW0tU3Vic2NyaXB0aW9uLUtleScsIHRoaXMuX3R0c2FwaWtleSk7XG5cbiAgICBjb25zdCB2b2ljZSA9IExBTkdVQUdFX1RPX1ZPSUNFX01BUFBJTkdfTElTVC5maW5kKGMgPT4gYy52b2ljZS5zdGFydHNXaXRoKGxhbmd1YWdlKSAmJiBjLklzTWFsZSA9PT0gZmFsc2UpLnZvaWNlO1xuXG4gICAgY29uc3Qgc3NtbCA9IGBcbjxzcGVhayB2ZXJzaW9uPVxcJzEuMFxcJyB4bWw6bGFuZz1cXCcke2xhbmd1YWdlfVxcJz5cbiAgPHZvaWNlIHhtbDpsYW5nPVxcJyR7bGFuZ3VhZ2V9XFwnIHhtbDpnZW5kZXI9XFwnRmVtYWxlXFwnIG5hbWU9XFwnJHt2b2ljZX1cXCc+XG4gICAgJHt0ZXh0fVxuICA8L3ZvaWNlPlxuPC9zcGVhaz5gO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly8ke3RoaXMuX3R0c3JlZ2lvbn0udHRzLnNwZWVjaC5taWNyb3NvZnQuY29tL2NvZ25pdGl2ZXNlcnZpY2VzL3YxYCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcbiAgICAgIGJvZHk6IHNzbWxcbiAgICB9KTtcblxuICAgIGNvbnN0IGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKCk7XG5cbiAgICB2YXIgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgICBjb25zdCBhdWRpbzogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZvaWNlJyk7XG4gICAgYXVkaW8uc3JjID0gdXJsO1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKGBMb2FkIFRleHQgdG8gU3BlZWNoIHVybGApO1xuICAgIHRoaXMuX2luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgYXN5bmMgZ2V0VGV4dEZyb21TcGVlY2gobGFuZ3VhZ2U6IHN0cmluZywgZGF0YTogQmxvYikge1xuICAgIGlmICh0aGlzLl90dHNyZWdpb24gPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XG5cbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZShsYW5ndWFnZSk7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnM6IEhlYWRlcnNJbml0ID0gbmV3IEhlYWRlcnMoKTtcbiAgICByZXF1ZXN0SGVhZGVycy5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uO3RleHQveG1sJyk7XG4gICAgcmVxdWVzdEhlYWRlcnMuc2V0KCdDb250ZW50LVR5cGUnLCAnYXVkaW8vd2F2OyBjb2RlY3M9YXVkaW8vcGNtOyBzYW1wbGVyYXRlPTE2MDAwJyk7XG4gICAgcmVxdWVzdEhlYWRlcnMuc2V0KCdPY3AtQXBpbS1TdWJzY3JpcHRpb24tS2V5JywgdGhpcy5fdHRzYXBpa2V5KTtcblxuICAgIGNvbnN0IHdhdiA9IGF3YWl0IGdldFdhdmVCbG9iKGRhdGEsIGZhbHNlKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vJHt0aGlzLl90dHNyZWdpb259LnN0dC5zcGVlY2gubWljcm9zb2Z0LmNvbS9zcGVlY2gvcmVjb2duaXRpb24vY29udmVyc2F0aW9uL2NvZ25pdGl2ZXNlcnZpY2VzL3YxP2xhbmd1YWdlPSR7bGFuZ3VhZ2V9YCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcbiAgICAgIGJvZHk6IHdhdlxuICAgIH0pO1xuICAgIGNvbnN0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIGpzb24uRGlzcGxheVRleHQ7XG4gIH1cbn1cbiIsIi8vaHR0cHM6Ly9sZWFybi5taWNyb3NvZnQuY29tL2VuLXVzL2F6dXJlL2NvZ25pdGl2ZS1zZXJ2aWNlcy9zcGVlY2gtc2VydmljZS9sYW5ndWFnZS1zdXBwb3J0P3RhYnM9dHRzXG5leHBvcnQgY29uc3QgTEFOR1VBR0VfVE9fVk9JQ0VfTUFQUElOR19MSVNUID0gW1xuICB7ICd2b2ljZSc6ICdhZi1aQS1BZHJpTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2FmLVpBLVdpbGxlbU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2FtLUVULUFtZWhhTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnYW0tRVQtTWVrZGVzTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2FyLUFFLUZhdGltYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdhci1BRS1IYW1kYW5OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdhci1CSC1BbGlOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdhci1CSC1MYWlsYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdhci1EWi1BbWluYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdhci1EWi1Jc21hZWxOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdhci1FRy1TYWxtYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdhci1FRy1TaGFraXJOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdhci1JUS1CYXNzZWxOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdhci1JUS1SYW5hTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2FyLUpPLVNhbmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnYXItSk8tVGFpbU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2FyLUtXLUZhaGVkTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnYXItS1ctTm91cmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnYXItTEItTGF5bGFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnYXItTEItUmFtaU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2FyLUxZLUltYW5OZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnYXItTFktT21hck5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2FyLU1BLUphbWFsTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnYXItTUEtTW91bmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnYXItT00tQWJkdWxsYWhOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdhci1PTS1BeXNoYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdhci1RQS1BbWFsTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2FyLVFBLU1vYXpOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdhci1TQS1IYW1lZE5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2FyLVNBLVphcml5YWhOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnYXItU1ktQW1hbnlOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnYXItU1ktTGFpdGhOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdhci1UTi1IZWRpTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnYXItVE4tUmVlbU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdhci1ZRS1NYXJ5YW1OZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnYXItWUUtU2FsZWhOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdhei1BWi1CYWJla05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2F6LUFaLUJhbnVOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnYmctQkctQm9yaXNsYXZOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdiZy1CRy1LYWxpbmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnYm4tQkQtTmFiYW5pdGFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnYm4tQkQtUHJhZGVlcE5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2JuLUlOLUJhc2hrYXJOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdibi1JTi1UYW5pc2hhYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdicy1CQS1Hb3Jhbk5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2JzLUJBLVZlc25hTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2NhLUVTLUFsYmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnY2EtRVMtRW5yaWNOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdjYS1FUy1Kb2FuYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdjcy1DWi1BbnRvbmluTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnY3MtQ1otVmxhc3RhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2N5LUdCLUFsZWROZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdjeS1HQi1OaWFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZGEtREstQ2hyaXN0ZWxOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZGEtREstSmVwcGVOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdkZS1BVC1JbmdyaWROZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZGUtQVQtSm9uYXNOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdkZS1DSC1KYW5OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdkZS1DSC1MZW5pTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2RlLURFLUFtYWxhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2RlLURFLUJlcm5kTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZGUtREUtQ2hyaXN0b3BoTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZGUtREUtQ29ucmFkTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZGUtREUtRWxrZU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdkZS1ERS1HaXNlbGFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZGUtREUtS2FzcGVyTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZGUtREUtS2F0amFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZGUtREUtS2lsbGlhbk5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2RlLURFLUtsYXJpc3NhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2RlLURFLUtsYXVzTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZGUtREUtTG91aXNhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2RlLURFLU1hamFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZGUtREUtUmFsZk5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2RlLURFLVRhbmphTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VsLUdSLUF0aGluYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlbC1HUi1OZXN0b3Jhc05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLUFVLUFubmV0dGVOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZW4tQVUtQ2FybHlOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZW4tQVUtRGFycmVuTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZW4tQVUtRHVuY2FuTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZW4tQVUtRWxzaWVOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZW4tQVUtRnJleWFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZW4tQVUtSm9hbm5lTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLUFVLUtlbk5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLUFVLUtpbU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1BVS1OYXRhc2hhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLUFVLU5laWxOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1BVS1UaW1OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1BVS1UaW5hTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLUFVLVdpbGxpYW1OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1DQS1DbGFyYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1DQS1MaWFtTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZW4tR0ItQWJiaU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1HQi1BbGZpZU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLUdCLUJlbGxhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLUdCLUVsbGlvdE5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLUdCLUV0aGFuTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZW4tR0ItSG9sbGllTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLUdCLUxpYmJ5TmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLUdCLU1haXNpZU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1HQi1Ob2FoTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZW4tR0ItT2xpdmVyTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZW4tR0ItT2xpdmlhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLUdCLVJ5YW5OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1HQi1Tb25pYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1HQi1UaG9tYXNOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1ISy1TYW1OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1ISy1ZYW5OZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZW4tSUUtQ29ubm9yTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZW4tSUUtRW1pbHlOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZW4tSU4tTmVlcmphTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLUlOLVByYWJoYXROZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1LRS1Bc2lsaWFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZW4tS0UtQ2hpbGVtYmFOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1ORy1BYmVvTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZW4tTkctRXppbm5lTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLU5aLU1pdGNoZWxsTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZW4tTlotTW9sbHlOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZW4tUEgtSmFtZXNOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1QSC1Sb3NhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLVNHLUx1bmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZW4tU0ctV2F5bmVOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1UWi1FbGltdU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLVRaLUltYW5pTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLVVTLUFtYmVyTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLVVTLUFuYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1VUy1BcmlhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLVVTLUFzaGxleU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1VUy1CcmFuZG9uTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZW4tVVMtQ2hyaXN0b3BoZXJOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1VUy1Db3JhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLVVTLURhdmlzTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZW4tVVMtRWxpemFiZXRoTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLVVTLUVyaWNOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1VUy1HdXlOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1VUy1KYWNvYk5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLVVTLUphbmVOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZW4tVVMtSmFzb25OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1VUy1KZW5ueU11bHRpbGluZ3VhbE5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1VUy1KZW5ueU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1VUy1NaWNoZWxsZU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1VUy1Nb25pY2FOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZW4tVVMtTmFuY3lOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZW4tVVMtUm9nZXJOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1VUy1TYXJhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VuLVVTLVN0ZWZmYW5OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1VUy1Ub255TmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZW4tWkEtTGVhaE5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlbi1aQS1MdWtlTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZXMtQVItRWxlbmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtQVItVG9tYXNOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1CTy1NYXJjZWxvTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZXMtQk8tU29maWFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtQ0wtQ2F0YWxpbmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtQ0wtTG9yZW56b05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLUNPLUdvbnphbG9OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1DTy1TYWxvbWVOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtQ1ItSnVhbk5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLUNSLU1hcmlhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLUNVLUJlbGt5c05ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1DVS1NYW51ZWxOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1ETy1FbWlsaW9OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1ETy1SYW1vbmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtRUMtQW5kcmVhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLUVDLUx1aXNOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1FUy1BYnJpbE5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1FUy1BbHZhcm9OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1FUy1Bcm5hdU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLUVTLURhcmlvTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZXMtRVMtRWxpYXNOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1FUy1FbHZpcmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtRVMtRXN0cmVsbGFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtRVMtSXJlbmVOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtRVMtTGFpYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1FUy1MaWFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtRVMtTmlsTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZXMtRVMtU2F1bE5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLUVTLVRlb05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLUVTLVRyaWFuYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1FUy1WZXJhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLUdRLUphdmllck5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLUdRLVRlcmVzYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1HVC1BbmRyZXNOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1HVC1NYXJ0YU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1ITi1DYXJsb3NOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1ITi1LYXJsYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1NWC1CZWF0cml6TmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLU1YLUNhbmRlbGFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtTVgtQ2FybG90YU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1NWC1DZWNpbGlvTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZXMtTVgtRGFsaWFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtTVgtR2VyYXJkb05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLU1YLUpvcmdlTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZXMtTVgtTGFyaXNzYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1NWC1MaWJlcnRvTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZXMtTVgtTHVjaWFub05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLU1YLU1hcmluYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1NWC1OdXJpYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1NWC1QZWxheW9OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1NWC1SZW5hdGFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtTVgtWWFnb05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLU5JLUZlZGVyaWNvTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZXMtTkktWW9sYW5kYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1QQS1NYXJnYXJpdGFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtUEEtUm9iZXJ0b05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLVBFLUFsZXhOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1QRS1DYW1pbGFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtUFItS2FyaW5hTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLVBSLVZpY3Rvck5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLVBZLU1hcmlvTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZXMtUFktVGFuaWFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtU1YtTG9yZW5hTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2VzLVNWLVJvZHJpZ29OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1VUy1BbG9uc29OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1VUy1QYWxvbWFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtVVktTWF0ZW9OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdlcy1VWS1WYWxlbnRpbmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtVkUtUGFvbGFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXMtVkUtU2ViYXN0aWFuTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZXQtRUUtQW51TmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2V0LUVFLUtlcnROZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdldS1FUy1BaW5ob2FOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZXUtRVMtQW5kZXJOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdmYS1JUi1EaWxhcmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZmEtSVItRmFyaWROZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdmaS1GSS1IYXJyaU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2ZpLUZJLU5vb3JhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2ZpLUZJLVNlbG1hTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2ZpbC1QSC1BbmdlbG9OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdmaWwtUEgtQmxlc3NpY2FOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZnItQkUtQ2hhcmxpbmVOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZnItQkUtR2VyYXJkTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZnItQ0EtQW50b2luZU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2ZyLUNBLUplYW5OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdmci1DQS1TeWx2aWVOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZnItQ0gtQXJpYW5lTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2ZyLUNILUZhYnJpY2VOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdmci1GUi1BbGFpbk5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2ZyLUZSLUJyaWdpdHRlTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2ZyLUZSLUNlbGVzdGVOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZnItRlItQ2xhdWRlTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZnItRlItQ29yYWxpZU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdmci1GUi1EZW5pc2VOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZnItRlItRWxvaXNlTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2ZyLUZSLUhlbnJpTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZnItRlItSmFjcXVlbGluZU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdmci1GUi1KZXJvbWVOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdmci1GUi1Kb3NlcGhpbmVOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZnItRlItTWF1cmljZU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2ZyLUZSLVl2ZXNOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdmci1GUi1ZdmV0dGVOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZ2EtSUUtQ29sbU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2dhLUlFLU9ybGFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnZ2wtRVMtUm9pTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnZ2wtRVMtU2FiZWxhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2d1LUlOLURod2FuaU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdndS1JTi1OaXJhbmphbk5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2hlLUlMLUF2cmlOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdoZS1JTC1IaWxhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2hpLUlOLU1hZGh1ck5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2hpLUlOLVN3YXJhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2hyLUhSLUdhYnJpamVsYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdoci1IUi1TcmVja29OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdodS1IVS1Ob2VtaU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdodS1IVS1UYW1hc05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2h5LUFNLUFuYWhpdE5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdoeS1BTS1IYXlrTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnaWQtSUQtQXJkaU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2lkLUlELUdhZGlzTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2lzLUlTLUd1ZHJ1bk5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdpcy1JUy1HdW5uYXJOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdpdC1JVC1CZW5pZ25vTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnaXQtSVQtQ2FsaW1lcm9OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdpdC1JVC1DYXRhbGRvTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnaXQtSVQtRGllZ29OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdpdC1JVC1FbHNhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2l0LUlULUZhYmlvbGFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnaXQtSVQtRmlhbW1hTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2l0LUlULUdpYW5uaU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2l0LUlULUltZWxkYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdpdC1JVC1Jcm1hTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2l0LUlULUlzYWJlbGxhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2l0LUlULUxpc2FuZHJvTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnaXQtSVQtUGFsbWlyYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdpdC1JVC1QaWVyaW5hTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2l0LUlULVJpbmFsZG9OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdqYS1KUC1Bb2lOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnamEtSlAtRGFpY2hpTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnamEtSlAtS2VpdGFOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdqYS1KUC1NYXl1TmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2phLUpQLU5hbmFtaU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdqYS1KUC1OYW9raU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2phLUpQLVNoaW9yaU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdqdi1JRC1EaW1hc05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2p2LUlELVNpdGlOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAna2EtR0UtRWthTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2thLUdFLUdpb3JnaU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2trLUtaLUFpZ3VsTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2trLUtaLURhdWxldE5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2ttLUtILVBpc2V0aE5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2ttLUtILVNyZXltb21OZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAna24tSU4tR2FnYW5OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdrbi1JTi1TYXBuYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdrby1LUi1Cb25nSmluTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAna28tS1ItR29va01pbk5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2tvLUtSLUluSm9vbk5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2tvLUtSLUppTWluTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2tvLUtSLVNlb0h5ZW9uTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2tvLUtSLVNvb25Cb2tOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAna28tS1ItU3VuSGlOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAna28tS1ItWXVKaW5OZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnbG8tTEEtQ2hhbnRoYXZvbmdOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdsby1MQS1LZW9tYW55TmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2x0LUxULUxlb25hc05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ2x0LUxULU9uYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdsdi1MVi1FdmVyaXRhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ2x2LUxWLU5pbHNOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdtay1NSy1BbGVrc2FuZGFyTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnbWstTUstTWFyaWphTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ21sLUlOLU1pZGh1bk5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ21sLUlOLVNvYmhhbmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnbW4tTU4tQmF0YWFOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdtbi1NTi1ZZXN1aU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdtci1JTi1BYXJvaGlOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnbXItSU4tTWFub2hhck5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ21zLU1ZLU9zbWFuTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnbXMtTVktWWFzbWluTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ210LU1ULUdyYWNlTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ210LU1ULUpvc2VwaE5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ215LU1NLU5pbGFyTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ215LU1NLVRoaWhhTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnbmItTk8tRmlubk5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ25iLU5PLUlzZWxpbk5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICduYi1OTy1QZXJuaWxsZU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICduZS1OUC1IZW1rYWxhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ25lLU5QLVNhZ2FyTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnbmwtQkUtQXJuYXVkTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnbmwtQkUtRGVuYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdubC1OTC1Db2xldHRlTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ25sLU5MLUZlbm5hTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ25sLU5MLU1hYXJ0ZW5OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdwbC1QTC1BZ25pZXN6a2FOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAncGwtUEwtTWFyZWtOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdwbC1QTC1ab2ZpYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdwcy1BRi1HdWxOYXdhek5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3BzLUFGLUxhdGlmYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdwdC1CUi1BbnRvbmlvTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAncHQtQlItQnJlbmRhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3B0LUJSLURvbmF0b05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3B0LUJSLUVsemFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAncHQtQlItRmFiaW9OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdwdC1CUi1GcmFuY2lzY2FOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAncHQtQlItR2lvdmFubmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAncHQtQlItSHVtYmVydG9OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdwdC1CUi1KdWxpb05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3B0LUJSLUxlaWxhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3B0LUJSLUxldGljaWFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAncHQtQlItTWFudWVsYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdwdC1CUi1OaWNvbGF1TmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAncHQtQlItVmFsZXJpb05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3B0LUJSLVlhcmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAncHQtUFQtRHVhcnRlTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAncHQtUFQtRmVybmFuZGFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAncHQtUFQtUmFxdWVsTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3JvLVJPLUFsaW5hTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3JvLVJPLUVtaWxOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdydS1SVS1EYXJpeWFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAncnUtUlUtRG1pdHJ5TmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAncnUtUlUtU3ZldGxhbmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnc2ktTEstU2FtZWVyYU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3NpLUxLLVRoaWxpbmlOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnc2stU0stTHVrYXNOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdzay1TSy1WaWt0b3JpYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdzbC1TSS1QZXRyYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdzbC1TSS1Sb2tOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICdzby1TTy1NdXVzZU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3NvLVNPLVViYXhOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnc3EtQUwtQW5pbGFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnc3EtQUwtSWxpck5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3NyLVJTLU5pY2hvbGFzTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnc3ItUlMtU29waGllTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3N1LUlELUphamFuZ05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3N1LUlELVR1dGlOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnc3YtU0UtSGlsbGV2aU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdzdi1TRS1NYXR0aWFzTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnc3YtU0UtU29maWVOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnc3ctS0UtUmFmaWtpTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnc3ctS0UtWnVyaU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICdzdy1UWi1EYXVkaU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3N3LVRaLVJlaGVtYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICd0YS1JTi1QYWxsYXZpTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3RhLUlOLVZhbGx1dmFyTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAndGEtTEstS3VtYXJOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICd0YS1MSy1TYXJhbnlhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3RhLU1ZLUthbmlOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAndGEtTVktU3VyeWFOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICd0YS1TRy1BbmJ1TmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAndGEtU0ctVmVuYmFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAndGUtSU4tTW9oYW5OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICd0ZS1JTi1TaHJ1dGlOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAndGgtVEgtQWNoYXJhTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3RoLVRILU5pd2F0TmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAndGgtVEgtUHJlbXdhZGVlTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3RyLVRSLUFobWV0TmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAndHItVFItRW1lbE5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICd1ay1VQS1Pc3RhcE5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3VrLVVBLVBvbGluYU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICd1ci1JTi1HdWxOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAndXItSU4tU2FsbWFuTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAndXItUEstQXNhZE5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3VyLVBLLVV6bWFOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAndXotVVotTWFkaW5hTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3V6LVVaLVNhcmRvck5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3ZpLVZOLUhvYWlNeU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICd2aS1WTi1OYW1NaW5oTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnd3V1LUNOLVhpYW90b25nTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3d1dS1DTi1ZdW56aGVOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICd5dWUtQ04tWGlhb01pbk5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICd5dWUtQ04tWXVuU29uZ05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3poLUNOLVhpYW9jaGVuTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3poLUNOLVhpYW9oYW5OZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnemgtQ04tWGlhb21lbmdOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnemgtQ04tWGlhb21vTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3poLUNOLVhpYW9xaXVOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnemgtQ04tWGlhb3J1aU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICd6aC1DTi1YaWFvc2h1YW5nTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3poLUNOLVhpYW94aWFvTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3poLUNOLVhpYW94dWFuTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3poLUNOLVhpYW95YW5OZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnemgtQ04tWGlhb3lpTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3poLUNOLVhpYW95b3VOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnemgtQ04tWGlhb3poZW5OZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnemgtQ04tWXVuZmVuZ05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3poLUNOLVl1bmhhb05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3poLUNOLVl1bmppYW5OZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICd6aC1DTi1ZdW54aWFOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICd6aC1DTi1ZdW54aU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3poLUNOLVl1bnlhbmdOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICd6aC1DTi1ZdW55ZU5ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3poLUNOLVl1bnplTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnemgtQ04taGVuYW4tWXVuZGVuZ05ldXJhbCcsICdJc01hbGUnOiB0cnVlIH0sXG4gIHsgJ3ZvaWNlJzogJ3poLUNOLWxpYW9uaW5nLVhpYW9iZWlOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnemgtQ04tc2hhYW54aS1YaWFvbmlOZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnemgtQ04tc2hhbmRvbmctWXVueGlhbmdOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICd6aC1DTi1zaWNodWFuLVl1bnhpTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcbiAgeyAndm9pY2UnOiAnemgtSEstSGl1R2FhaU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICd6aC1ISy1IaXVNYWFuTmV1cmFsJywgJ0lzTWFsZSc6IGZhbHNlIH0sXG4gIHsgJ3ZvaWNlJzogJ3poLUhLLVdhbkx1bmdOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICd6aC1UVy1Ic2lhb0NoZW5OZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnemgtVFctSHNpYW9ZdU5ldXJhbCcsICdJc01hbGUnOiBmYWxzZSB9LFxuICB7ICd2b2ljZSc6ICd6aC1UVy1ZdW5KaGVOZXVyYWwnLCAnSXNNYWxlJzogdHJ1ZSB9LFxuICB7ICd2b2ljZSc6ICd6dS1aQS1UaGFuZG9OZXVyYWwnLCAnSXNNYWxlJzogZmFsc2UgfSxcbiAgeyAndm9pY2UnOiAnenUtWkEtVGhlbWJhTmV1cmFsJywgJ0lzTWFsZSc6IHRydWUgfSxcblxuXG5dO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tICdAZnJhbWV3b3JrL2xpdmUyZGN1YmlzbWZyYW1ld29yayc7XG5cbi8qKlxuICogU2FtcGxlIEFwcOOBp+S9v+eUqOOBmeOCi+WumuaVsFxuICovXG5cbi8vIENhbnZhcyB3aWR0aCBhbmQgaGVpZ2h0IHBpeGVsIHZhbHVlcywgb3IgZHluYW1pYyBzY3JlZW4gc2l6ZSAoJ2F1dG8nKS5cbmV4cG9ydCBjb25zdCBDYW52YXNTaXplOiB7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyIH0gfCAnYXV0bycgPSAnYXV0byc7XG5cbi8vIOeUu+mdolxuZXhwb3J0IGNvbnN0IFZpZXdTY2FsZSA9IDEuMDtcbmV4cG9ydCBjb25zdCBWaWV3TWF4U2NhbGUgPSAyLjA7XG5leHBvcnQgY29uc3QgVmlld01pblNjYWxlID0gMC44O1xuXG5leHBvcnQgY29uc3QgVmlld0xvZ2ljYWxMZWZ0ID0gLTEuMDtcbmV4cG9ydCBjb25zdCBWaWV3TG9naWNhbFJpZ2h0ID0gMS4wO1xuZXhwb3J0IGNvbnN0IFZpZXdMb2dpY2FsQm90dG9tID0gLTEuMDtcbmV4cG9ydCBjb25zdCBWaWV3TG9naWNhbFRvcCA9IDEuMDtcblxuZXhwb3J0IGNvbnN0IFZpZXdMb2dpY2FsTWF4TGVmdCA9IC0yLjA7XG5leHBvcnQgY29uc3QgVmlld0xvZ2ljYWxNYXhSaWdodCA9IDIuMDtcbmV4cG9ydCBjb25zdCBWaWV3TG9naWNhbE1heEJvdHRvbSA9IC0yLjA7XG5leHBvcnQgY29uc3QgVmlld0xvZ2ljYWxNYXhUb3AgPSAyLjA7XG5cbi8vIOebuOWvvuODkeOCuVxuZXhwb3J0IGNvbnN0IFJlc291cmNlc1BhdGggPSAnLi9SZXNvdXJjZXMvJztcblxuLy8g44Oi44OH44Or44Gu5b6M44KN44Gr44GC44KL6IOM5pmv44Gu55S75YOP44OV44Kh44Kk44OrXG5leHBvcnQgY29uc3QgQmFja0ltYWdlTmFtZSA9ICdiYWNrX2NsYXNzX25vcm1hbC5wbmcnO1xuXG4vLyDmra/ou4pcbmV4cG9ydCBjb25zdCBHZWFySW1hZ2VOYW1lID0gJ2ljb25fZ2Vhci5wbmcnO1xuXG4vLyDntYLkuobjg5zjgr/jg7NcbmV4cG9ydCBjb25zdCBQb3dlckltYWdlTmFtZSA9ICdDbG9zZU5vcm1hbC5wbmcnO1xuXG4vLyDjg6Ljg4fjg6vlrprnvqktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIOODouODh+ODq+OCkumFjee9ruOBl+OBn+ODh+OCo+ODrOOCr+ODiOODquWQjeOBrumFjeWIl1xuLy8g44OH44Kj44Os44Kv44OI44Oq5ZCN44GobW9kZWwzLmpzb27jga7lkI3liY3jgpLkuIDoh7TjgZXjgZvjgabjgYrjgY/jgZPjgahcbmV4cG9ydCBjb25zdCBNb2RlbERpcjogc3RyaW5nW10gPSBbXG4gICdIYXJ1JyxcbiAgJ0hpeW9yaScsXG4gICdNYXJrJyxcbiAgJ05hdG9yaScsXG4gICdSaWNlJyxcbiAgJ01hbydcbl07XG5leHBvcnQgY29uc3QgTW9kZWxEaXJTaXplOiBudW1iZXIgPSBNb2RlbERpci5sZW5ndGg7XG5cbi8vIOWklumDqOWumue+qeODleOCoeOCpOODq++8iGpzb27vvInjgajlkIjjgo/jgZvjgotcbmV4cG9ydCBjb25zdCBNb3Rpb25Hcm91cElkbGUgPSAnSWRsZSc7IC8vIOOCouOCpOODieODquODs+OCsFxuZXhwb3J0IGNvbnN0IE1vdGlvbkdyb3VwVGFwQm9keSA9ICdUYXBCb2R5JzsgLy8g5L2T44KS44K/44OD44OX44GX44Gf44Go44GNXG5cbi8vIOWklumDqOWumue+qeODleOCoeOCpOODq++8iGpzb27vvInjgajlkIjjgo/jgZvjgotcbmV4cG9ydCBjb25zdCBIaXRBcmVhTmFtZUhlYWQgPSAnSGVhZCc7XG5leHBvcnQgY29uc3QgSGl0QXJlYU5hbWVCb2R5ID0gJ0JvZHknO1xuXG4vLyDjg6Ljg7zjgrfjg6fjg7Pjga7lhKrlhYjluqblrprmlbBcbmV4cG9ydCBjb25zdCBQcmlvcml0eU5vbmUgPSAwO1xuZXhwb3J0IGNvbnN0IFByaW9yaXR5SWRsZSA9IDE7XG5leHBvcnQgY29uc3QgUHJpb3JpdHlOb3JtYWwgPSAyO1xuZXhwb3J0IGNvbnN0IFByaW9yaXR5Rm9yY2UgPSAzO1xuXG4vLyDjg4fjg5Djg4PjgrDnlKjjg63jgrDjga7ooajnpLrjgqrjg5fjgrfjg6fjg7NcbmV4cG9ydCBjb25zdCBEZWJ1Z0xvZ0VuYWJsZSA9IHRydWU7XG5leHBvcnQgY29uc3QgRGVidWdUb3VjaExvZ0VuYWJsZSA9IGZhbHNlO1xuXG4vLyBGcmFtZXdvcmvjgYvjgonlh7rlipvjgZnjgovjg63jgrDjga7jg6zjg5njg6voqK3lrppcbmV4cG9ydCBjb25zdCBDdWJpc21Mb2dnaW5nTGV2ZWw6IExvZ0xldmVsID0gTG9nTGV2ZWwuTG9nTGV2ZWxfVmVyYm9zZTtcblxuLy8g44OH44OV44Kp44Or44OI44Gu44Os44Oz44OA44O844K/44O844Ky44OD44OI44K144Kk44K6XG5leHBvcnQgY29uc3QgUmVuZGVyVGFyZ2V0V2lkdGggPSAxOTAwO1xuZXhwb3J0IGNvbnN0IFJlbmRlclRhcmdldEhlaWdodCA9IDEwMDA7XG4iLCIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBDdWJpc21GcmFtZXdvcmssIE9wdGlvbiB9IGZyb20gJ0BmcmFtZXdvcmsvbGl2ZTJkY3ViaXNtZnJhbWV3b3JrJztcblxuaW1wb3J0ICogYXMgTEFwcERlZmluZSBmcm9tICcuL2xhcHBkZWZpbmUnO1xuaW1wb3J0IHsgTEFwcExpdmUyRE1hbmFnZXIgfSBmcm9tICcuL2xhcHBsaXZlMmRtYW5hZ2VyJztcbmltcG9ydCB7IExBcHBQYWwgfSBmcm9tICcuL2xhcHBwYWwnO1xuaW1wb3J0IHsgTEFwcFRleHR1cmVNYW5hZ2VyIH0gZnJvbSAnLi9sYXBwdGV4dHVyZW1hbmFnZXInO1xuaW1wb3J0IHsgTEFwcFZpZXcgfSBmcm9tICcuL2xhcHB2aWV3JztcblxuZXhwb3J0IGxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gbnVsbDtcbmV4cG9ydCBsZXQgc19pbnN0YW5jZTogTEFwcERlbGVnYXRlID0gbnVsbDtcbmV4cG9ydCBsZXQgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCA9IG51bGw7XG5leHBvcnQgbGV0IGZyYW1lQnVmZmVyOiBXZWJHTEZyYW1lYnVmZmVyID0gbnVsbDtcblxuLyoqXG4gKiDjgqLjg5fjg6rjgrHjg7zjgrfjg6fjg7Pjgq/jg6njgrnjgIJcbiAqIEN1YmlzbSBTREvjga7nrqHnkIbjgpLooYzjgYbjgIJcbiAqL1xuZXhwb3J0IGNsYXNzIExBcHBEZWxlZ2F0ZSB7XG4gIC8qKlxuICAgKiDjgq/jg6njgrnjga7jgqTjg7Pjgrnjgr/jg7PjgrnvvIjjgrfjg7PjgrDjg6vjg4jjg7PvvInjgpLov5TjgZnjgIJcbiAgICog44Kk44Oz44K544K/44Oz44K544GM55Sf5oiQ44GV44KM44Gm44GE44Gq44GE5aC05ZCI44Gv5YaF6YOo44Gn44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GZ44KL44CCXG4gICAqXG4gICAqIEByZXR1cm4g44Kv44Op44K544Gu44Kk44Oz44K544K/44Oz44K5XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IExBcHBEZWxlZ2F0ZSB7XG4gICAgaWYgKHNfaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgc19pbnN0YW5jZSA9IG5ldyBMQXBwRGVsZWdhdGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc19pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgq/jg6njgrnjga7jgqTjg7Pjgrnjgr/jg7PjgrnvvIjjgrfjg7PjgrDjg6vjg4jjg7PvvInjgpLop6PmlL7jgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVsZWFzZUluc3RhbmNlKCk6IHZvaWQge1xuICAgIGlmIChzX2luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgIHNfaW5zdGFuY2UucmVsZWFzZSgpO1xuICAgIH1cblxuICAgIHNfaW5zdGFuY2UgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEFQUOOBq+W/heimgeOBqueJqeOCkuWIneacn+WMluOBmeOCi+OAglxuICAgKi9cbiAgcHVibGljIGluaXRpYWxpemUoKTogYm9vbGVhbiB7XG4gICAgLy8g44Kt44Oj44Oz44OQ44K544Gu5L2c5oiQXG4gICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgaWYgKExBcHBEZWZpbmUuQ2FudmFzU2l6ZSA9PT0gJ2F1dG8nKSB7XG4gICAgICB0aGlzLl9yZXNpemVDYW52YXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FudmFzLndpZHRoID0gTEFwcERlZmluZS5DYW52YXNTaXplLndpZHRoO1xuICAgICAgY2FudmFzLmhlaWdodCA9IExBcHBEZWZpbmUuQ2FudmFzU2l6ZS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgLy8gZ2zjgrPjg7Pjg4bjgq3jgrnjg4jjgpLliJ3mnJ/ljJZcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKSB8fCBjYW52YXMuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJyk7XG5cbiAgICBpZiAoIWdsKSB7XG4gICAgICBhbGVydCgnQ2Fubm90IGluaXRpYWxpemUgV2ViR0wuIFRoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0LicpO1xuICAgICAgZ2wgPSBudWxsO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9XG4gICAgICAgICdUaGlzIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgPGNvZGU+Jmx0O2NhbnZhcyZndDs8L2NvZGU+IGVsZW1lbnQuJztcblxuICAgICAgLy8gZ2zliJ3mnJ/ljJblpLHmlZdcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyDjgq3jg6Pjg7Pjg5DjgrnjgpIgRE9NIOOBq+i/veWKoFxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuICAgIGlmICghZnJhbWVCdWZmZXIpIHtcbiAgICAgIGZyYW1lQnVmZmVyID0gZ2wuZ2V0UGFyYW1ldGVyKGdsLkZSQU1FQlVGRkVSX0JJTkRJTkcpO1xuICAgIH1cblxuICAgIC8vIOmAj+mBjuioreWumlxuICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgZ2wuYmxlbmRGdW5jKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG5cbiAgICBjb25zdCBzdXBwb3J0VG91Y2g6IGJvb2xlYW4gPSAnb250b3VjaGVuZCcgaW4gY2FudmFzO1xuXG4gICAgaWYgKHN1cHBvcnRUb3VjaCkge1xuICAgICAgLy8g44K/44OD44OB6Zai6YCj44Kz44O844Or44OQ44OD44Kv6Zai5pWw55m76YyyXG4gICAgICBjYW52YXMub250b3VjaHN0YXJ0ID0gb25Ub3VjaEJlZ2FuO1xuICAgICAgY2FudmFzLm9udG91Y2htb3ZlID0gb25Ub3VjaE1vdmVkO1xuICAgICAgY2FudmFzLm9udG91Y2hlbmQgPSBvblRvdWNoRW5kZWQ7XG4gICAgICBjYW52YXMub250b3VjaGNhbmNlbCA9IG9uVG91Y2hDYW5jZWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOODnuOCpuOCuemWoumAo+OCs+ODvOODq+ODkOODg+OCr+mWouaVsOeZu+mMslxuICAgICAgY2FudmFzLm9ubW91c2Vkb3duID0gb25DbGlja0JlZ2FuO1xuICAgICAgY2FudmFzLm9ubW91c2Vtb3ZlID0gb25Nb3VzZU1vdmVkO1xuICAgICAgY2FudmFzLm9ubW91c2V1cCA9IG9uQ2xpY2tFbmRlZDtcbiAgICB9XG5cbiAgICAvLyBBcHBWaWV344Gu5Yid5pyf5YyWXG4gICAgdGhpcy5fdmlldy5pbml0aWFsaXplKCk7XG5cbiAgICAvLyBDdWJpc20gU0RL44Gu5Yid5pyf5YyWXG4gICAgdGhpcy5pbml0aWFsaXplQ3ViaXNtKCk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNpemUgY2FudmFzIGFuZCByZS1pbml0aWFsaXplIHZpZXcuXG4gICAqL1xuICBwdWJsaWMgb25SZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzaXplQ2FudmFzKCk7XG4gICAgdGhpcy5fdmlldy5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5fdmlldy5pbml0aWFsaXplU3ByaXRlKCk7XG5cbiAgICAvLyDjgq3jg6Pjg7Pjg5DjgrnjgrXjgqTjgrrjgpLmuKHjgZlcbiAgICBjb25zdCB2aWV3cG9ydDogbnVtYmVyW10gPSBbMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0XTtcblxuICAgIGdsLnZpZXdwb3J0KHZpZXdwb3J0WzBdLCB2aWV3cG9ydFsxXSwgdmlld3BvcnRbMl0sIHZpZXdwb3J0WzNdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDop6PmlL7jgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyByZWxlYXNlKCk6IHZvaWQge1xuICAgIHRoaXMuX3RleHR1cmVNYW5hZ2VyLnJlbGVhc2UoKTtcbiAgICB0aGlzLl90ZXh0dXJlTWFuYWdlciA9IG51bGw7XG5cbiAgICB0aGlzLl92aWV3LnJlbGVhc2UoKTtcbiAgICB0aGlzLl92aWV3ID0gbnVsbDtcblxuICAgIC8vIOODquOCveODvOOCueOCkuino+aUvlxuICAgIExBcHBMaXZlMkRNYW5hZ2VyLnJlbGVhc2VJbnN0YW5jZSgpO1xuXG4gICAgLy8gQ3ViaXNtIFNES+OBruino+aUvlxuICAgIEN1YmlzbUZyYW1ld29yay5kaXNwb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICog5a6f6KGM5Yem55CG44CCXG4gICAqL1xuICBwdWJsaWMgcnVuKCk6IHZvaWQge1xuICAgIC8vIOODoeOCpOODs+ODq+ODvOODl1xuICAgIGNvbnN0IGxvb3AgPSAoKTogdm9pZCA9PiB7XG4gICAgICAvLyDjgqTjg7Pjgrnjgr/jg7Pjgrnjga7mnInnhKHjga7norroqo1cbiAgICAgIGlmIChzX2luc3RhbmNlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyDmmYLplpPmm7TmlrBcbiAgICAgIExBcHBQYWwudXBkYXRlVGltZSgpO1xuXG4gICAgICAvLyDnlLvpnaLjga7liJ3mnJ/ljJZcbiAgICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKTtcblxuICAgICAgLy8g5rex5bqm44OG44K544OI44KS5pyJ5Yq55YyWXG4gICAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG5cbiAgICAgIC8vIOi/keOBj+OBq+OBguOCi+eJqeS9k+OBr+OAgemBoOOBj+OBq+OBguOCi+eJqeS9k+OCkuimhuOBhOmaoOOBmVxuICAgICAgZ2wuZGVwdGhGdW5jKGdsLkxFUVVBTCk7XG5cbiAgICAgIC8vIOOCq+ODqeODvOODkOODg+ODleOCoeOChOa3seW6puODkOODg+ODleOCoeOCkuOCr+ODquOCouOBmeOCi1xuICAgICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQpO1xuXG4gICAgICBnbC5jbGVhckRlcHRoKDEuMCk7XG5cbiAgICAgIC8vIOmAj+mBjuioreWumlxuICAgICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcbiAgICAgIGdsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuXG4gICAgICAvLyDmj4/nlLvmm7TmlrBcbiAgICAgIHRoaXMuX3ZpZXcucmVuZGVyKCk7XG5cbiAgICAgIC8vIOODq+ODvOODl+OBruOBn+OCgeOBq+WGjeW4sOWRvOOBs+WHuuOBl1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgIH07XG4gICAgbG9vcCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCt+OCp+ODvOODgOODvOOCkueZu+mMsuOBmeOCi+OAglxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVNoYWRlcigpOiBXZWJHTFByb2dyYW0ge1xuICAgIC8vIOODkOODvOODhuODg+OCr+OCueOCt+OCp+ODvOODgOODvOOBruOCs+ODs+ODkeOCpOODq1xuICAgIGNvbnN0IHZlcnRleFNoYWRlcklkID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xuXG4gICAgaWYgKHZlcnRleFNoYWRlcklkID09IG51bGwpIHtcbiAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCdmYWlsZWQgdG8gY3JlYXRlIHZlcnRleFNoYWRlcicpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgdmVydGV4U2hhZGVyOiBzdHJpbmcgPVxuICAgICAgJ3ByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OycgK1xuICAgICAgJ2F0dHJpYnV0ZSB2ZWMzIHBvc2l0aW9uOycgK1xuICAgICAgJ2F0dHJpYnV0ZSB2ZWMyIHV2OycgK1xuICAgICAgJ3ZhcnlpbmcgdmVjMiB2dXY7JyArXG4gICAgICAndm9pZCBtYWluKHZvaWQpJyArXG4gICAgICAneycgK1xuICAgICAgJyAgIGdsX1Bvc2l0aW9uID0gdmVjNChwb3NpdGlvbiwgMS4wKTsnICtcbiAgICAgICcgICB2dXYgPSB1djsnICtcbiAgICAgICd9JztcblxuICAgIGdsLnNoYWRlclNvdXJjZSh2ZXJ0ZXhTaGFkZXJJZCwgdmVydGV4U2hhZGVyKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHZlcnRleFNoYWRlcklkKTtcblxuICAgIC8vIOODleODqeOCsOODoeODs+ODiOOCt+OCp+ODvOODgOOBruOCs+ODs+ODkeOCpOODq1xuICAgIGNvbnN0IGZyYWdtZW50U2hhZGVySWQgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcblxuICAgIGlmIChmcmFnbWVudFNoYWRlcklkID09IG51bGwpIHtcbiAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCdmYWlsZWQgdG8gY3JlYXRlIGZyYWdtZW50U2hhZGVyJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBmcmFnbWVudFNoYWRlcjogc3RyaW5nID1cbiAgICAgICdwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDsnICtcbiAgICAgICd2YXJ5aW5nIHZlYzIgdnV2OycgK1xuICAgICAgJ3VuaWZvcm0gc2FtcGxlcjJEIHRleHR1cmU7JyArXG4gICAgICAndm9pZCBtYWluKHZvaWQpJyArXG4gICAgICAneycgK1xuICAgICAgJyAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh0ZXh0dXJlLCB2dXYpOycgK1xuICAgICAgJ30nO1xuXG4gICAgZ2wuc2hhZGVyU291cmNlKGZyYWdtZW50U2hhZGVySWQsIGZyYWdtZW50U2hhZGVyKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKGZyYWdtZW50U2hhZGVySWQpO1xuXG4gICAgLy8g44OX44Ot44Kw44Op44Og44Kq44OW44K444Kn44Kv44OI44Gu5L2c5oiQXG4gICAgY29uc3QgcHJvZ3JhbUlkID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtSWQsIHZlcnRleFNoYWRlcklkKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbUlkLCBmcmFnbWVudFNoYWRlcklkKTtcblxuICAgIGdsLmRlbGV0ZVNoYWRlcih2ZXJ0ZXhTaGFkZXJJZCk7XG4gICAgZ2wuZGVsZXRlU2hhZGVyKGZyYWdtZW50U2hhZGVySWQpO1xuXG4gICAgLy8g44Oq44Oz44KvXG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbUlkKTtcblxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbUlkKTtcblxuICAgIHJldHVybiBwcm9ncmFtSWQ7XG4gIH1cblxuICAvKipcbiAgICogVmlld+aDheWgseOCkuWPluW+l+OBmeOCi+OAglxuICAgKi9cbiAgcHVibGljIGdldFZpZXcoKTogTEFwcFZpZXcge1xuICAgIHJldHVybiB0aGlzLl92aWV3O1xuICB9XG5cbiAgcHVibGljIGdldFRleHR1cmVNYW5hZ2VyKCk6IExBcHBUZXh0dXJlTWFuYWdlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RleHR1cmVNYW5hZ2VyO1xuICB9XG5cbiAgcHVibGljIHN0YXJ0Vm9pY2VDb252ZXJzYXRpb24obGFuZ3VhZ2U6IHN0cmluZywgZGF0YTogQmxvYikge1xuICAgIExBcHBMaXZlMkRNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRWb2ljZUNvbnZlcnNhdGlvbihsYW5ndWFnZSwgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9jYXB0dXJlZCA9IGZhbHNlO1xuICAgIHRoaXMuX21vdXNlWCA9IDAuMDtcbiAgICB0aGlzLl9tb3VzZVkgPSAwLjA7XG4gICAgdGhpcy5faXNFbmQgPSBmYWxzZTtcblxuICAgIHRoaXMuX2N1YmlzbU9wdGlvbiA9IG5ldyBPcHRpb24oKTtcbiAgICB0aGlzLl92aWV3ID0gbmV3IExBcHBWaWV3KCk7XG4gICAgdGhpcy5fdGV4dHVyZU1hbmFnZXIgPSBuZXcgTEFwcFRleHR1cmVNYW5hZ2VyKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3ViaXNtIFNES+OBruWIneacn+WMllxuICAgKi9cbiAgcHVibGljIGluaXRpYWxpemVDdWJpc20oKTogdm9pZCB7XG4gICAgLy8gc2V0dXAgY3ViaXNtXG4gICAgdGhpcy5fY3ViaXNtT3B0aW9uLmxvZ0Z1bmN0aW9uID0gTEFwcFBhbC5wcmludE1lc3NhZ2U7XG4gICAgdGhpcy5fY3ViaXNtT3B0aW9uLmxvZ2dpbmdMZXZlbCA9IExBcHBEZWZpbmUuQ3ViaXNtTG9nZ2luZ0xldmVsO1xuICAgIEN1YmlzbUZyYW1ld29yay5zdGFydFVwKHRoaXMuX2N1YmlzbU9wdGlvbik7XG5cbiAgICAvLyBpbml0aWFsaXplIGN1YmlzbVxuICAgIEN1YmlzbUZyYW1ld29yay5pbml0aWFsaXplKCk7XG5cbiAgICAvLyBsb2FkIG1vZGVsXG4gICAgTEFwcExpdmUyRE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcblxuICAgIExBcHBQYWwudXBkYXRlVGltZSgpO1xuXG4gICAgdGhpcy5fdmlldy5pbml0aWFsaXplU3ByaXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzaXplIHRoZSBjYW52YXMgdG8gZmlsbCB0aGUgc2NyZWVuLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVzaXplQ2FudmFzKCk6IHZvaWQge1xuICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIH1cblxuICBfY3ViaXNtT3B0aW9uOiBPcHRpb247IC8vIEN1YmlzbSBTREsgT3B0aW9uXG4gIF92aWV3OiBMQXBwVmlldzsgLy8gVmlld+aDheWgsVxuICBfY2FwdHVyZWQ6IGJvb2xlYW47IC8vIOOCr+ODquODg+OCr+OBl+OBpuOBhOOCi+OBi1xuICBfbW91c2VYOiBudW1iZXI7IC8vIOODnuOCpuOCuVjluqfmqJlcbiAgX21vdXNlWTogbnVtYmVyOyAvLyDjg57jgqbjgrlZ5bqn5qiZXG4gIF9pc0VuZDogYm9vbGVhbjsgLy8gQVBQ57WC5LqG44GX44Gm44GE44KL44GLXG4gIF90ZXh0dXJlTWFuYWdlcjogTEFwcFRleHR1cmVNYW5hZ2VyOyAvLyDjg4bjgq/jgrnjg4Hjg6Pjg57jg43jg7zjgrjjg6Pjg7xcbn1cblxuLyoqXG4gKiDjgq/jg6rjg4Pjgq/jgZfjgZ/jgajjgY3jgavlkbzjgbDjgozjgovjgIJcbiAqL1xuZnVuY3Rpb24gb25DbGlja0JlZ2FuKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCA9IHRydWU7XG5cbiAgY29uc3QgcG9zWDogbnVtYmVyID0gZS5wYWdlWDtcbiAgY29uc3QgcG9zWTogbnVtYmVyID0gZS5wYWdlWTtcblxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNCZWdhbihwb3NYLCBwb3NZKTtcbn1cblxuLyoqXG4gKiDjg57jgqbjgrnjg53jgqTjg7Pjgr/jgYzli5XjgYTjgZ/jgonlkbzjgbDjgozjgovjgIJcbiAqL1xuZnVuY3Rpb24gb25Nb3VzZU1vdmVkKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fY2FwdHVyZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3KSB7XG4gICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ3ZpZXcgbm90Zm91bmQnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZWN0ID0gKGUudGFyZ2V0IGFzIEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBwb3NYOiBudW1iZXIgPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XG4gIGNvbnN0IHBvc1k6IG51bWJlciA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xuXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3Lm9uVG91Y2hlc01vdmVkKHBvc1gsIHBvc1kpO1xufVxuXG4vKipcbiAqIOOCr+ODquODg+OCr+OBjOe1guS6huOBl+OBn+OCieWRvOOBsOOCjOOCi+OAglxuICovXG5mdW5jdGlvbiBvbkNsaWNrRW5kZWQoZTogTW91c2VFdmVudCk6IHZvaWQge1xuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fY2FwdHVyZWQgPSBmYWxzZTtcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVjdCA9IChlLnRhcmdldCBhcyBFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgcG9zWDogbnVtYmVyID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICBjb25zdCBwb3NZOiBudW1iZXIgPSBlLmNsaWVudFkgLSByZWN0LnRvcDtcblxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNFbmRlZChwb3NYLCBwb3NZKTtcbn1cblxuLyoqXG4gKiDjgr/jg4Pjg4HjgZfjgZ/jgajjgY3jgavlkbzjgbDjgozjgovjgIJcbiAqL1xuZnVuY3Rpb24gb25Ub3VjaEJlZ2FuKGU6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkID0gdHJ1ZTtcblxuICBjb25zdCBwb3NYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcbiAgY29uc3QgcG9zWSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVk7XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzQmVnYW4ocG9zWCwgcG9zWSk7XG59XG5cbi8qKlxuICog44K544Ov44Kk44OX44GZ44KL44Go5ZG844Gw44KM44KL44CCXG4gKi9cbmZ1bmN0aW9uIG9uVG91Y2hNb3ZlZChlOiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVjdCA9IChlLnRhcmdldCBhcyBFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICBjb25zdCBwb3NYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICBjb25zdCBwb3NZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZIC0gcmVjdC50b3A7XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzTW92ZWQocG9zWCwgcG9zWSk7XG59XG5cbi8qKlxuICog44K/44OD44OB44GM57WC5LqG44GX44Gf44KJ5ZG844Gw44KM44KL44CCXG4gKi9cbmZ1bmN0aW9uIG9uVG91Y2hFbmRlZChlOiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCA9IGZhbHNlO1xuXG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcpIHtcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgndmlldyBub3Rmb3VuZCcpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlY3QgPSAoZS50YXJnZXQgYXMgRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgY29uc3QgcG9zWCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgY29uc3QgcG9zWSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSAtIHJlY3QudG9wO1xuXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3Lm9uVG91Y2hlc0VuZGVkKHBvc1gsIHBvc1kpO1xufVxuXG4vKipcbiAqIOOCv+ODg+ODgeOBjOOCreODo+ODs+OCu+ODq+OBleOCjOOCi+OBqOWRvOOBsOOCjOOCi+OAglxuICovXG5mdW5jdGlvbiBvblRvdWNoQ2FuY2VsKGU6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkID0gZmFsc2U7XG5cbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVjdCA9IChlLnRhcmdldCBhcyBFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICBjb25zdCBwb3NYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICBjb25zdCBwb3NZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZIC0gcmVjdC50b3A7XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzRW5kZWQocG9zWCwgcG9zWSk7XG59XG5cbiIsIi8qKlxuICogQ29weXJpZ2h0KGMpIExpdmUyRCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgdGhlIExpdmUyRCBPcGVuIFNvZnR3YXJlIGxpY2Vuc2VcbiAqIHRoYXQgY2FuIGJlIGZvdW5kIGF0IGh0dHBzOi8vd3d3LmxpdmUyZC5jb20vZXVsYS9saXZlMmQtb3Blbi1zb2Z0d2FyZS1saWNlbnNlLWFncmVlbWVudF9lbi5odG1sLlxuICovXG5cbmltcG9ydCB7IEN1YmlzbU1hdHJpeDQ0IH0gZnJvbSAnQGZyYW1ld29yay9tYXRoL2N1YmlzbW1hdHJpeDQ0JztcbmltcG9ydCB7IEFDdWJpc21Nb3Rpb24gfSBmcm9tICdAZnJhbWV3b3JrL21vdGlvbi9hY3ViaXNtbW90aW9uJztcbmltcG9ydCB7IGNzbVZlY3RvciB9IGZyb20gJ0BmcmFtZXdvcmsvdHlwZS9jc212ZWN0b3InO1xuaW1wb3J0IHsgQXp1cmVBaSB9IGZyb20gJy4vYXp1cmVhaSc7XG5cbmltcG9ydCAqIGFzIExBcHBEZWZpbmUgZnJvbSAnLi9sYXBwZGVmaW5lJztcbmltcG9ydCB7IGNhbnZhcyB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcbmltcG9ydCB7IExBcHBNb2RlbCB9IGZyb20gJy4vbGFwcG1vZGVsJztcbmltcG9ydCB7IExBcHBQYWwgfSBmcm9tICcuL2xhcHBwYWwnO1xuXG5leHBvcnQgbGV0IHNfaW5zdGFuY2U6IExBcHBMaXZlMkRNYW5hZ2VyID0gbnVsbDtcblxuLyoqXG4gKiDjgrXjg7Pjg5fjg6vjgqLjg5fjg6rjgrHjg7zjgrfjg6fjg7PjgavjgYrjgYTjgaZDdWJpc21Nb2RlbOOCkueuoeeQhuOBmeOCi+OCr+ODqeOCuVxuICog44Oi44OH44Or55Sf5oiQ44Go56C05qOE44CB44K/44OD44OX44Kk44OZ44Oz44OI44Gu5Yem55CG44CB44Oi44OH44Or5YiH44KK5pu/44GI44KS6KGM44GG44CCXG4gKi9cbmV4cG9ydCBjbGFzcyBMQXBwTGl2ZTJETWFuYWdlciB7XG4gIC8qKlxuICAgKiDjgq/jg6njgrnjga7jgqTjg7Pjgrnjgr/jg7PjgrnvvIjjgrfjg7PjgrDjg6vjg4jjg7PvvInjgpLov5TjgZnjgIJcbiAgICog44Kk44Oz44K544K/44Oz44K544GM55Sf5oiQ44GV44KM44Gm44GE44Gq44GE5aC05ZCI44Gv5YaF6YOo44Gn44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GZ44KL44CCXG4gICAqXG4gICAqIEByZXR1cm4g44Kv44Op44K544Gu44Kk44Oz44K544K/44Oz44K5XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IExBcHBMaXZlMkRNYW5hZ2VyIHtcbiAgICBpZiAoc19pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICBzX2luc3RhbmNlID0gbmV3IExBcHBMaXZlMkRNYW5hZ2VyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNfaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICog44Kv44Op44K544Gu44Kk44Oz44K544K/44Oz44K577yI44K344Oz44Kw44Or44OI44Oz77yJ44KS6Kej5pS+44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlbGVhc2VJbnN0YW5jZSgpOiB2b2lkIHtcbiAgICBpZiAoc19pbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICBzX2luc3RhbmNlID0gdm9pZCAwO1xuICAgIH1cblxuICAgIHNfaW5zdGFuY2UgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIOePvuWcqOOBruOCt+ODvOODs+OBp+S/neaMgeOBl+OBpuOBhOOCi+ODouODh+ODq+OCkui/lOOBmeOAglxuICAgKlxuICAgKiBAcGFyYW0gbm8g44Oi44OH44Or44Oq44K544OI44Gu44Kk44Oz44OH44OD44Kv44K55YCkXG4gICAqIEByZXR1cm4g44Oi44OH44Or44Gu44Kk44Oz44K544K/44Oz44K544KS6L+U44GZ44CC44Kk44Oz44OH44OD44Kv44K55YCk44GM56+E5Zuy5aSW44Gu5aC05ZCI44GvTlVMTOOCkui/lOOBmeOAglxuICAgKi9cbiAgcHVibGljIGdldE1vZGVsKG5vOiBudW1iZXIpOiBMQXBwTW9kZWwge1xuICAgIGlmIChubyA8IHRoaXMuX21vZGVscy5nZXRTaXplKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9tb2RlbHMuYXQobm8pO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIOePvuWcqOOBruOCt+ODvOODs+OBp+S/neaMgeOBl+OBpuOBhOOCi+OBmeOBueOBpuOBruODouODh+ODq+OCkuino+aUvuOBmeOCi1xuICAgKi9cbiAgcHVibGljIHJlbGVhc2VBbGxNb2RlbCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vZGVscy5nZXRTaXplKCk7IGkrKykge1xuICAgICAgdGhpcy5fbW9kZWxzLmF0KGkpLnJlbGVhc2UoKTtcbiAgICAgIHRoaXMuX21vZGVscy5zZXQoaSwgbnVsbCk7XG4gICAgfVxuXG4gICAgdGhpcy5fbW9kZWxzLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICog55S76Z2i44KS44OJ44Op44OD44Kw44GX44Gf5pmC44Gu5Yem55CGXG4gICAqXG4gICAqIEBwYXJhbSB4IOeUu+mdouOBrljluqfmqJlcbiAgICogQHBhcmFtIHkg55S76Z2i44GuWeW6p+aomVxuICAgKi9cbiAgcHVibGljIG9uRHJhZyh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbW9kZWxzLmdldFNpemUoKTsgaSsrKSB7XG4gICAgICBjb25zdCBtb2RlbDogTEFwcE1vZGVsID0gdGhpcy5nZXRNb2RlbChpKTtcblxuICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgIG1vZGVsLnNldERyYWdnaW5nKHgsIHkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDnlLvpnaLjgpLjgr/jg4Pjg5fjgZfjgZ/mmYLjga7lh6bnkIZcbiAgICpcbiAgICogQHBhcmFtIHgg55S76Z2i44GuWOW6p+aomVxuICAgKiBAcGFyYW0geSDnlLvpnaLjga5Z5bqn5qiZXG4gICAqL1xuICBwdWJsaWMgb25UYXAoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoTEFwcERlZmluZS5EZWJ1Z0xvZ0VuYWJsZSkge1xuICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoXG4gICAgICAgIGBbQVBQXXRhcCBwb2ludDoge3g6ICR7eC50b0ZpeGVkKDIpfSB5OiAke3kudG9GaXhlZCgyKX19YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vZGVscy5nZXRTaXplKCk7IGkrKykge1xuICAgICAgaWYgKHRoaXMuX21vZGVscy5hdChpKS5oaXRUZXN0KExBcHBEZWZpbmUuSGl0QXJlYU5hbWVIZWFkLCB4LCB5KSkge1xuICAgICAgICBpZiAoTEFwcERlZmluZS5EZWJ1Z0xvZ0VuYWJsZSkge1xuICAgICAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKFxuICAgICAgICAgICAgYFtBUFBdaGl0IGFyZWE6IFske0xBcHBEZWZpbmUuSGl0QXJlYU5hbWVIZWFkfV1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tb2RlbHMuYXQoaSkuc2V0UmFuZG9tRXhwcmVzc2lvbigpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9tb2RlbHMuYXQoaSkuaGl0VGVzdChMQXBwRGVmaW5lLkhpdEFyZWFOYW1lQm9keSwgeCwgeSkpIHtcbiAgICAgICAgaWYgKExBcHBEZWZpbmUuRGVidWdMb2dFbmFibGUpIHtcbiAgICAgICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShcbiAgICAgICAgICAgIGBbQVBQXWhpdCBhcmVhOiBbJHtMQXBwRGVmaW5lLkhpdEFyZWFOYW1lQm9keX1dYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9tcHQ6IHN0cmluZyA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb21wdFwiKSBhcyBhbnkpLnZhbHVlO1xuICAgICAgICBjb25zdCBsYW5ndWFnZTogc3RyaW5nID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZ3VhZ2VcIikgYXMgYW55KS52YWx1ZTtcbiAgICAgICAgY29uc3QgYXp1cmVBaSA9IG5ldyBBenVyZUFpKCk7XG4gICAgICAgIGF6dXJlQWkuZ2V0T3BlbkFpQW5zd2VyKHByb21wdClcbiAgICAgICAgICAudGhlbihhbnMgPT4gYXp1cmVBaS5nZXRTcGVlY2hVcmwobGFuZ3VhZ2UsIGFucykpXG4gICAgICAgICAgLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgIHRoaXMuX21vZGVscy5hdChpKS5fd2F2RmlsZUhhbmRsZXIubG9hZFdhdkZpbGUodXJsKTtcbiAgICAgICAgICAgIHRoaXMuX21vZGVsc1xuICAgICAgICAgICAgICAuYXQoaSlcbiAgICAgICAgICAgICAgLnN0YXJ0UmFuZG9tTW90aW9uKFxuICAgICAgICAgICAgICAgIExBcHBEZWZpbmUuTW90aW9uR3JvdXBUYXBCb2R5LFxuICAgICAgICAgICAgICAgIExBcHBEZWZpbmUuUHJpb3JpdHlOb3JtYWwsXG4gICAgICAgICAgICAgICAgdGhpcy5fZmluaXNoZWRNb3Rpb25cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGFydFZvaWNlQ29udmVyc2F0aW9uKGxhbmd1YWdlOiBzdHJpbmcsIGRhdGE6IEJsb2IpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vZGVscy5nZXRTaXplKCk7IGkrKykge1xuICAgICAgaWYgKExBcHBEZWZpbmUuRGVidWdMb2dFbmFibGUpIHtcbiAgICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoXG4gICAgICAgICAgYHN0YXJ0Q29udmVyc2F0aW9uYFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBhenVyZUFpID0gbmV3IEF6dXJlQWkoKTtcblxuICAgICAgICBhenVyZUFpLmdldFRleHRGcm9tU3BlZWNoKGxhbmd1YWdlLCBkYXRhKVxuICAgICAgICAgIC50aGVuKHRleHQgPT4ge1xuICAgICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvbXB0XCIpIGFzIGFueSkudmFsdWUgPSB0ZXh0O1xuICAgICAgICAgICAgcmV0dXJuIGF6dXJlQWkuZ2V0T3BlbkFpQW5zd2VyKHRleHQpO1xuICAgICAgICAgIH0pLnRoZW4oYW5zID0+IGF6dXJlQWkuZ2V0U3BlZWNoVXJsKGxhbmd1YWdlLCBhbnMpKVxuICAgICAgICAgIC50aGVuKHVybCA9PiB7XG4gICAgICAgICAgICB0aGlzLl9tb2RlbHMuYXQoaSkuX3dhdkZpbGVIYW5kbGVyLmxvYWRXYXZGaWxlKHVybCk7XG4gICAgICAgICAgICB0aGlzLl9tb2RlbHNcbiAgICAgICAgICAgICAgLmF0KGkpXG4gICAgICAgICAgICAgIC5zdGFydFJhbmRvbU1vdGlvbihcbiAgICAgICAgICAgICAgICBMQXBwRGVmaW5lLk1vdGlvbkdyb3VwVGFwQm9keSxcbiAgICAgICAgICAgICAgICBMQXBwRGVmaW5lLlByaW9yaXR5Tm9ybWFsLFxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmlzaGVkTW90aW9uXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOeUu+mdouOCkuabtOaWsOOBmeOCi+OBqOOBjeOBruWHpueQhlxuICAgKiDjg6Ljg4fjg6vjga7mm7TmlrDlh6bnkIblj4rjgbPmj4/nlLvlh6bnkIbjgpLooYzjgYZcbiAgICovXG4gIHB1YmxpYyBvblVwZGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGNhbnZhcztcblxuICAgIGNvbnN0IG1vZGVsQ291bnQ6IG51bWJlciA9IHRoaXMuX21vZGVscy5nZXRTaXplKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGVsQ291bnQ7ICsraSkge1xuICAgICAgY29uc3QgcHJvamVjdGlvbjogQ3ViaXNtTWF0cml4NDQgPSBuZXcgQ3ViaXNtTWF0cml4NDQoKTtcbiAgICAgIGNvbnN0IG1vZGVsOiBMQXBwTW9kZWwgPSB0aGlzLmdldE1vZGVsKGkpO1xuXG4gICAgICBpZiAobW9kZWwuZ2V0TW9kZWwoKSkge1xuICAgICAgICBpZiAobW9kZWwuZ2V0TW9kZWwoKS5nZXRDYW52YXNXaWR0aCgpID4gMS4wICYmIHdpZHRoIDwgaGVpZ2h0KSB7XG4gICAgICAgICAgLy8g5qiq44Gr6ZW344GE44Oi44OH44Or44KS57im6ZW344Km44Kj44Oz44OJ44Km44Gr6KGo56S644GZ44KL6Zqb44Oi44OH44Or44Gu5qiq44K144Kk44K644Gnc2NhbGXjgpLnrpflh7rjgZnjgotcbiAgICAgICAgICBtb2RlbC5nZXRNb2RlbE1hdHJpeCgpLnNldFdpZHRoKDIuMCk7XG4gICAgICAgICAgcHJvamVjdGlvbi5zY2FsZSgxLjAsIHdpZHRoIC8gaGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9qZWN0aW9uLnNjYWxlKGhlaWdodCAvIHdpZHRoLCAxLjApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5b+F6KaB44GM44GC44KM44Gw44GT44GT44Gn5LmX566XXG4gICAgICAgIGlmICh0aGlzLl92aWV3TWF0cml4ICE9IG51bGwpIHtcbiAgICAgICAgICBwcm9qZWN0aW9uLm11bHRpcGx5QnlNYXRyaXgodGhpcy5fdmlld01hdHJpeCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbW9kZWwudXBkYXRlKCk7XG4gICAgICBtb2RlbC5kcmF3KHByb2plY3Rpb24pOyAvLyDlj4LnhafmuKHjgZfjgarjga7jgadwcm9qZWN0aW9u44Gv5aSJ6LOq44GZ44KL44CCXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOasoeOBruOCt+ODvOODs+OBq+WIh+OCiuOBi+OBiOOCi1xuICAgKiDjgrXjg7Pjg5fjg6vjgqLjg5fjg6rjgrHjg7zjgrfjg6fjg7Pjgafjga/jg6Ljg4fjg6vjgrvjg4Pjg4jjga7liIfjgormm7/jgYjjgpLooYzjgYbjgIJcbiAgICovXG4gIHB1YmxpYyBuZXh0U2NlbmUoKTogdm9pZCB7XG4gICAgY29uc3Qgbm86IG51bWJlciA9ICh0aGlzLl9zY2VuZUluZGV4ICsgMSkgJSBMQXBwRGVmaW5lLk1vZGVsRGlyU2l6ZTtcbiAgICB0aGlzLmNoYW5nZVNjZW5lKG5vKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgrfjg7zjg7PjgpLliIfjgormm7/jgYjjgotcbiAgICog44K144Oz44OX44Or44Ki44OX44Oq44Kx44O844K344On44Oz44Gn44Gv44Oi44OH44Or44K744OD44OI44Gu5YiH44KK5pu/44GI44KS6KGM44GG44CCXG4gICAqL1xuICBwdWJsaWMgY2hhbmdlU2NlbmUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3NjZW5lSW5kZXggPSBpbmRleDtcbiAgICBpZiAoTEFwcERlZmluZS5EZWJ1Z0xvZ0VuYWJsZSkge1xuICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoYFtBUFBdbW9kZWwgaW5kZXg6ICR7dGhpcy5fc2NlbmVJbmRleH1gKTtcbiAgICB9XG5cbiAgICAvLyBNb2RlbERpcltd44Gr5L+d5oyB44GX44Gf44OH44Kj44Os44Kv44OI44Oq5ZCN44GL44KJXG4gICAgLy8gbW9kZWwzLmpzb27jga7jg5HjgrnjgpLmsbrlrprjgZnjgovjgIJcbiAgICAvLyDjg4fjgqPjg6zjgq/jg4jjg6rlkI3jgahtb2RlbDMuanNvbuOBruWQjeWJjeOCkuS4gOiHtOOBleOBm+OBpuOBiuOBj+OBk+OBqOOAglxuICAgIGNvbnN0IG1vZGVsOiBzdHJpbmcgPSBMQXBwRGVmaW5lLk1vZGVsRGlyW2luZGV4XTtcbiAgICBjb25zdCBtb2RlbFBhdGg6IHN0cmluZyA9IExBcHBEZWZpbmUuUmVzb3VyY2VzUGF0aCArIG1vZGVsICsgJy8nO1xuICAgIGxldCBtb2RlbEpzb25OYW1lOiBzdHJpbmcgPSBMQXBwRGVmaW5lLk1vZGVsRGlyW2luZGV4XTtcbiAgICBtb2RlbEpzb25OYW1lICs9ICcubW9kZWwzLmpzb24nO1xuXG4gICAgdGhpcy5yZWxlYXNlQWxsTW9kZWwoKTtcbiAgICB0aGlzLl9tb2RlbHMucHVzaEJhY2sobmV3IExBcHBNb2RlbCgpKTtcbiAgICB0aGlzLl9tb2RlbHMuYXQoMCkubG9hZEFzc2V0cyhtb2RlbFBhdGgsIG1vZGVsSnNvbk5hbWUpO1xuICB9XG5cbiAgcHVibGljIHNldFZpZXdNYXRyaXgobTogQ3ViaXNtTWF0cml4NDQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgIHRoaXMuX3ZpZXdNYXRyaXguZ2V0QXJyYXkoKVtpXSA9IG0uZ2V0QXJyYXkoKVtpXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl92aWV3TWF0cml4ID0gbmV3IEN1YmlzbU1hdHJpeDQ0KCk7XG4gICAgdGhpcy5fbW9kZWxzID0gbmV3IGNzbVZlY3RvcjxMQXBwTW9kZWw+KCk7XG4gICAgdGhpcy5fc2NlbmVJbmRleCA9IDA7XG4gICAgdGhpcy5jaGFuZ2VTY2VuZSh0aGlzLl9zY2VuZUluZGV4KTtcbiAgfVxuXG4gIF92aWV3TWF0cml4OiBDdWJpc21NYXRyaXg0NDsgLy8g44Oi44OH44Or5o+P55S744Gr55So44GE44KLdmlld+ihjOWIl1xuICBfbW9kZWxzOiBjc21WZWN0b3I8TEFwcE1vZGVsPjsgLy8g44Oi44OH44Or44Kk44Oz44K544K/44Oz44K544Gu44Kz44Oz44OG44OKXG4gIF9zY2VuZUluZGV4OiBudW1iZXI7IC8vIOihqOekuuOBmeOCi+OCt+ODvOODs+OBruOCpOODs+ODh+ODg+OCr+OCueWApFxuICAvLyDjg6Ljg7zjgrfjg6fjg7Plho3nlJ/ntYLkuobjga7jgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgX2ZpbmlzaGVkTW90aW9uID0gKHNlbGY6IEFDdWJpc21Nb3Rpb24pOiB2b2lkID0+IHtcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgnTW90aW9uIEZpbmlzaGVkOicpO1xuICAgIGNvbnNvbGUubG9nKHNlbGYpO1xuICB9O1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0ICd3aGF0d2ctZmV0Y2gnO1xuXG5pbXBvcnQgeyBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQgfSBmcm9tICdAZnJhbWV3b3JrL2N1YmlzbWRlZmF1bHRwYXJhbWV0ZXJpZCc7XG5pbXBvcnQgeyBDdWJpc21Nb2RlbFNldHRpbmdKc29uIH0gZnJvbSAnQGZyYW1ld29yay9jdWJpc21tb2RlbHNldHRpbmdqc29uJztcbmltcG9ydCB7XG4gIEJyZWF0aFBhcmFtZXRlckRhdGEsXG4gIEN1YmlzbUJyZWF0aFxufSBmcm9tICdAZnJhbWV3b3JrL2VmZmVjdC9jdWJpc21icmVhdGgnO1xuaW1wb3J0IHsgQ3ViaXNtRXllQmxpbmsgfSBmcm9tICdAZnJhbWV3b3JrL2VmZmVjdC9jdWJpc21leWVibGluayc7XG5pbXBvcnQgeyBJQ3ViaXNtTW9kZWxTZXR0aW5nIH0gZnJvbSAnQGZyYW1ld29yay9pY3ViaXNtbW9kZWxzZXR0aW5nJztcbmltcG9ydCB7IEN1YmlzbUlkSGFuZGxlIH0gZnJvbSAnQGZyYW1ld29yay9pZC9jdWJpc21pZCc7XG5pbXBvcnQgeyBDdWJpc21GcmFtZXdvcmsgfSBmcm9tICdAZnJhbWV3b3JrL2xpdmUyZGN1YmlzbWZyYW1ld29yayc7XG5pbXBvcnQgeyBDdWJpc21NYXRyaXg0NCB9IGZyb20gJ0BmcmFtZXdvcmsvbWF0aC9jdWJpc21tYXRyaXg0NCc7XG5pbXBvcnQgeyBDdWJpc21Vc2VyTW9kZWwgfSBmcm9tICdAZnJhbWV3b3JrL21vZGVsL2N1YmlzbXVzZXJtb2RlbCc7XG5pbXBvcnQge1xuICBBQ3ViaXNtTW90aW9uLFxuICBGaW5pc2hlZE1vdGlvbkNhbGxiYWNrXG59IGZyb20gJ0BmcmFtZXdvcmsvbW90aW9uL2FjdWJpc21tb3Rpb24nO1xuaW1wb3J0IHsgQ3ViaXNtTW90aW9uIH0gZnJvbSAnQGZyYW1ld29yay9tb3Rpb24vY3ViaXNtbW90aW9uJztcbmltcG9ydCB7XG4gIEN1YmlzbU1vdGlvblF1ZXVlRW50cnlIYW5kbGUsXG4gIEludmFsaWRNb3Rpb25RdWV1ZUVudHJ5SGFuZGxlVmFsdWVcbn0gZnJvbSAnQGZyYW1ld29yay9tb3Rpb24vY3ViaXNtbW90aW9ucXVldWVtYW5hZ2VyJztcbmltcG9ydCB7IGNzbU1hcCB9IGZyb20gJ0BmcmFtZXdvcmsvdHlwZS9jc21tYXAnO1xuaW1wb3J0IHsgY3NtUmVjdCB9IGZyb20gJ0BmcmFtZXdvcmsvdHlwZS9jc21yZWN0Zic7XG5pbXBvcnQgeyBjc21TdHJpbmcgfSBmcm9tICdAZnJhbWV3b3JrL3R5cGUvY3Ntc3RyaW5nJztcbmltcG9ydCB7IGNzbVZlY3RvciB9IGZyb20gJ0BmcmFtZXdvcmsvdHlwZS9jc212ZWN0b3InO1xuaW1wb3J0IHsgQ3ViaXNtTG9nRXJyb3IsIEN1YmlzbUxvZ0luZm8gfSBmcm9tICdAZnJhbWV3b3JrL3V0aWxzL2N1YmlzbWRlYnVnJztcblxuaW1wb3J0ICogYXMgTEFwcERlZmluZSBmcm9tICcuL2xhcHBkZWZpbmUnO1xuaW1wb3J0IHsgY2FudmFzLCBmcmFtZUJ1ZmZlciwgZ2wsIExBcHBEZWxlZ2F0ZSB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcbmltcG9ydCB7IExBcHBQYWwgfSBmcm9tICcuL2xhcHBwYWwnO1xuaW1wb3J0IHsgVGV4dHVyZUluZm8gfSBmcm9tICcuL2xhcHB0ZXh0dXJlbWFuYWdlcic7XG5pbXBvcnQgeyBMQXBwV2F2RmlsZUhhbmRsZXIgfSBmcm9tICcuL2xhcHB3YXZmaWxlaGFuZGxlcic7XG5cbmVudW0gTG9hZFN0ZXAge1xuICBMb2FkQXNzZXRzLFxuICBMb2FkTW9kZWwsXG4gIFdhaXRMb2FkTW9kZWwsXG4gIExvYWRFeHByZXNzaW9uLFxuICBXYWl0TG9hZEV4cHJlc3Npb24sXG4gIExvYWRQaHlzaWNzLFxuICBXYWl0TG9hZFBoeXNpY3MsXG4gIExvYWRQb3NlLFxuICBXYWl0TG9hZFBvc2UsXG4gIFNldHVwRXllQmxpbmssXG4gIFNldHVwQnJlYXRoLFxuICBMb2FkVXNlckRhdGEsXG4gIFdhaXRMb2FkVXNlckRhdGEsXG4gIFNldHVwRXllQmxpbmtJZHMsXG4gIFNldHVwTGlwU3luY0lkcyxcbiAgU2V0dXBMYXlvdXQsXG4gIExvYWRNb3Rpb24sXG4gIFdhaXRMb2FkTW90aW9uLFxuICBDb21wbGV0ZUluaXRpYWxpemUsXG4gIENvbXBsZXRlU2V0dXBNb2RlbCxcbiAgTG9hZFRleHR1cmUsXG4gIFdhaXRMb2FkVGV4dHVyZSxcbiAgQ29tcGxldGVTZXR1cFxufVxuXG4vKipcbiAqIOODpuODvOOCtuODvOOBjOWun+mam+OBq+S9v+eUqOOBmeOCi+ODouODh+ODq+OBruWun+ijheOCr+ODqeOCuTxicj5cbiAqIOODouODh+ODq+eUn+aIkOOAgeapn+iDveOCs+ODs+ODneODvOODjeODs+ODiOeUn+aIkOOAgeabtOaWsOWHpueQhuOBqOODrOODs+ODgOODquODs+OCsOOBruWRvOOBs+WHuuOBl+OCkuihjOOBhuOAglxuICovXG5leHBvcnQgY2xhc3MgTEFwcE1vZGVsIGV4dGVuZHMgQ3ViaXNtVXNlck1vZGVsIHtcbiAgcHJpdmF0ZSBfYXVkaW9TcmM6IGFueTtcbiAgLyoqXG4gICAqIG1vZGVsMy5qc29u44GM572u44GL44KM44Gf44OH44Kj44Os44Kv44OI44Oq44Go44OV44Kh44Kk44Or44OR44K544GL44KJ44Oi44OH44Or44KS55Sf5oiQ44GZ44KLXG4gICAqIEBwYXJhbSBkaXJcbiAgICogQHBhcmFtIGZpbGVOYW1lXG4gICAqL1xuICBwdWJsaWMgbG9hZEFzc2V0cyhkaXI6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX21vZGVsSG9tZURpciA9IGRpcjtcblxuICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0ke2ZpbGVOYW1lfWApXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICBjb25zdCBzZXR0aW5nOiBJQ3ViaXNtTW9kZWxTZXR0aW5nID0gbmV3IEN1YmlzbU1vZGVsU2V0dGluZ0pzb24oXG4gICAgICAgICAgYXJyYXlCdWZmZXIsXG4gICAgICAgICAgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIOOCueODhuODvOODiOOCkuabtOaWsFxuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRNb2RlbDtcblxuICAgICAgICAvLyDntZDmnpzjgpLkv53lrZhcbiAgICAgICAgdGhpcy5zZXR1cE1vZGVsKHNldHRpbmcpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogbW9kZWwzLmpzb27jgYvjgonjg6Ljg4fjg6vjgpLnlJ/miJDjgZnjgovjgIJcbiAgICogbW9kZWwzLmpzb27jga7oqJjov7DjgavlvpPjgaPjgabjg6Ljg4fjg6vnlJ/miJDjgIHjg6Ljg7zjgrfjg6fjg7PjgIHniannkIbmvJTnrpfjgarjganjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jnlJ/miJDjgpLooYzjgYbjgIJcbiAgICpcbiAgICogQHBhcmFtIHNldHRpbmcgSUN1YmlzbU1vZGVsU2V0dGluZ+OBruOCpOODs+OCueOCv+ODs+OCuVxuICAgKi9cbiAgcHJpdmF0ZSBzZXR1cE1vZGVsKHNldHRpbmc6IElDdWJpc21Nb2RlbFNldHRpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGluZyA9IHRydWU7XG4gICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuX21vZGVsU2V0dGluZyA9IHNldHRpbmc7XG5cbiAgICAvLyBDdWJpc21Nb2RlbFxuICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW9kZWxGaWxlTmFtZSgpICE9ICcnKSB7XG4gICAgICBjb25zdCBtb2RlbEZpbGVOYW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vZGVsRmlsZU5hbWUoKTtcblxuICAgICAgZmV0Y2goYCR7dGhpcy5fbW9kZWxIb21lRGlyfSR7bW9kZWxGaWxlTmFtZX1gKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAudGhlbihhcnJheUJ1ZmZlciA9PiB7XG4gICAgICAgICAgdGhpcy5sb2FkTW9kZWwoYXJyYXlCdWZmZXIpO1xuICAgICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZEV4cHJlc3Npb247XG5cbiAgICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICAgIGxvYWRDdWJpc21FeHByZXNzaW9uKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLldhaXRMb2FkTW9kZWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCdNb2RlbCBkYXRhIGRvZXMgbm90IGV4aXN0LicpO1xuICAgIH1cblxuICAgIC8vIEV4cHJlc3Npb25cbiAgICBjb25zdCBsb2FkQ3ViaXNtRXhwcmVzc2lvbiA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0RXhwcmVzc2lvbkNvdW50KCkgPiAwKSB7XG4gICAgICAgIGNvbnN0IGNvdW50OiBudW1iZXIgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0RXhwcmVzc2lvbkNvdW50KCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgZXhwcmVzc2lvbk5hbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0RXhwcmVzc2lvbk5hbWUoaSk7XG4gICAgICAgICAgY29uc3QgZXhwcmVzc2lvbkZpbGVOYW1lID1cbiAgICAgICAgICAgIHRoaXMuX21vZGVsU2V0dGluZy5nZXRFeHByZXNzaW9uRmlsZU5hbWUoaSk7XG5cbiAgICAgICAgICBmZXRjaChgJHt0aGlzLl9tb2RlbEhvbWVEaXJ9JHtleHByZXNzaW9uRmlsZU5hbWV9YClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpXG4gICAgICAgICAgICAudGhlbihhcnJheUJ1ZmZlciA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vdGlvbjogQUN1YmlzbU1vdGlvbiA9IHRoaXMubG9hZEV4cHJlc3Npb24oXG4gICAgICAgICAgICAgICAgYXJyYXlCdWZmZXIsXG4gICAgICAgICAgICAgICAgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCxcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uTmFtZVxuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIGlmICh0aGlzLl9leHByZXNzaW9ucy5nZXRWYWx1ZShleHByZXNzaW9uTmFtZSkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIEFDdWJpc21Nb3Rpb24uZGVsZXRlKFxuICAgICAgICAgICAgICAgICAgdGhpcy5fZXhwcmVzc2lvbnMuZ2V0VmFsdWUoZXhwcmVzc2lvbk5hbWUpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leHByZXNzaW9ucy5zZXRWYWx1ZShleHByZXNzaW9uTmFtZSwgbnVsbCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLl9leHByZXNzaW9ucy5zZXRWYWx1ZShleHByZXNzaW9uTmFtZSwgbW90aW9uKTtcblxuICAgICAgICAgICAgICB0aGlzLl9leHByZXNzaW9uQ291bnQrKztcblxuICAgICAgICAgICAgICBpZiAodGhpcy5fZXhwcmVzc2lvbkNvdW50ID49IGNvdW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkUGh5c2ljcztcblxuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgbG9hZEN1YmlzbVBoeXNpY3MoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZEV4cHJlc3Npb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRQaHlzaWNzO1xuXG4gICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgIGxvYWRDdWJpc21QaHlzaWNzKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICBjb25zdCBsb2FkQ3ViaXNtUGh5c2ljcyA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0UGh5c2ljc0ZpbGVOYW1lKCkgIT0gJycpIHtcbiAgICAgICAgY29uc3QgcGh5c2ljc0ZpbGVOYW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldFBoeXNpY3NGaWxlTmFtZSgpO1xuXG4gICAgICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0ke3BoeXNpY3NGaWxlTmFtZX1gKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpXG4gICAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkUGh5c2ljcyhhcnJheUJ1ZmZlciwgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZFBvc2U7XG5cbiAgICAgICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgICAgICBsb2FkQ3ViaXNtUG9zZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLldhaXRMb2FkUGh5c2ljcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZFBvc2U7XG5cbiAgICAgICAgLy8gY2FsbGJhY2tcbiAgICAgICAgbG9hZEN1YmlzbVBvc2UoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gUG9zZVxuICAgIGNvbnN0IGxvYWRDdWJpc21Qb3NlID0gKCk6IHZvaWQgPT4ge1xuICAgICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZy5nZXRQb3NlRmlsZU5hbWUoKSAhPSAnJykge1xuICAgICAgICBjb25zdCBwb3NlRmlsZU5hbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0UG9zZUZpbGVOYW1lKCk7XG5cbiAgICAgICAgZmV0Y2goYCR7dGhpcy5fbW9kZWxIb21lRGlyfSR7cG9zZUZpbGVOYW1lfWApXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgICAgICAudGhlbihhcnJheUJ1ZmZlciA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRQb3NlKGFycmF5QnVmZmVyLCBhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcblxuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5TZXR1cEV5ZUJsaW5rO1xuXG4gICAgICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICAgICAgc2V0dXBFeWVCbGluaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLldhaXRMb2FkUG9zZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuU2V0dXBFeWVCbGluaztcblxuICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICBzZXR1cEV5ZUJsaW5rKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIEV5ZUJsaW5rXG4gICAgY29uc3Qgc2V0dXBFeWVCbGluayA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0RXllQmxpbmtQYXJhbWV0ZXJDb3VudCgpID4gMCkge1xuICAgICAgICB0aGlzLl9leWVCbGluayA9IEN1YmlzbUV5ZUJsaW5rLmNyZWF0ZSh0aGlzLl9tb2RlbFNldHRpbmcpO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLlNldHVwQnJlYXRoO1xuICAgICAgfVxuXG4gICAgICAvLyBjYWxsYmFja1xuICAgICAgc2V0dXBCcmVhdGgoKTtcbiAgICB9O1xuXG4gICAgLy8gQnJlYXRoXG4gICAgY29uc3Qgc2V0dXBCcmVhdGggPSAoKTogdm9pZCA9PiB7XG4gICAgICB0aGlzLl9icmVhdGggPSBDdWJpc21CcmVhdGguY3JlYXRlKCk7XG5cbiAgICAgIGNvbnN0IGJyZWF0aFBhcmFtZXRlcnM6IGNzbVZlY3RvcjxCcmVhdGhQYXJhbWV0ZXJEYXRhPiA9IG5ldyBjc21WZWN0b3IoKTtcbiAgICAgIGJyZWF0aFBhcmFtZXRlcnMucHVzaEJhY2soXG4gICAgICAgIG5ldyBCcmVhdGhQYXJhbWV0ZXJEYXRhKHRoaXMuX2lkUGFyYW1BbmdsZVgsIDAuMCwgMTUuMCwgNi41MzQ1LCAwLjUpXG4gICAgICApO1xuICAgICAgYnJlYXRoUGFyYW1ldGVycy5wdXNoQmFjayhcbiAgICAgICAgbmV3IEJyZWF0aFBhcmFtZXRlckRhdGEodGhpcy5faWRQYXJhbUFuZ2xlWSwgMC4wLCA4LjAsIDMuNTM0NSwgMC41KVxuICAgICAgKTtcbiAgICAgIGJyZWF0aFBhcmFtZXRlcnMucHVzaEJhY2soXG4gICAgICAgIG5ldyBCcmVhdGhQYXJhbWV0ZXJEYXRhKHRoaXMuX2lkUGFyYW1BbmdsZVosIDAuMCwgMTAuMCwgNS41MzQ1LCAwLjUpXG4gICAgICApO1xuICAgICAgYnJlYXRoUGFyYW1ldGVycy5wdXNoQmFjayhcbiAgICAgICAgbmV3IEJyZWF0aFBhcmFtZXRlckRhdGEodGhpcy5faWRQYXJhbUJvZHlBbmdsZVgsIDAuMCwgNC4wLCAxNS41MzQ1LCAwLjUpXG4gICAgICApO1xuICAgICAgYnJlYXRoUGFyYW1ldGVycy5wdXNoQmFjayhcbiAgICAgICAgbmV3IEJyZWF0aFBhcmFtZXRlckRhdGEoXG4gICAgICAgICAgQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtQnJlYXRoXG4gICAgICAgICAgKSxcbiAgICAgICAgICAwLjUsXG4gICAgICAgICAgMC41LFxuICAgICAgICAgIDMuMjM0NSxcbiAgICAgICAgICAxXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuX2JyZWF0aC5zZXRQYXJhbWV0ZXJzKGJyZWF0aFBhcmFtZXRlcnMpO1xuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkVXNlckRhdGE7XG5cbiAgICAgIC8vIGNhbGxiYWNrXG4gICAgICBsb2FkVXNlckRhdGEoKTtcbiAgICB9O1xuXG4gICAgLy8gVXNlckRhdGFcbiAgICBjb25zdCBsb2FkVXNlckRhdGEgPSAoKTogdm9pZCA9PiB7XG4gICAgICBpZiAodGhpcy5fbW9kZWxTZXR0aW5nLmdldFVzZXJEYXRhRmlsZSgpICE9ICcnKSB7XG4gICAgICAgIGNvbnN0IHVzZXJEYXRhRmlsZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRVc2VyRGF0YUZpbGUoKTtcblxuICAgICAgICBmZXRjaChgJHt0aGlzLl9tb2RlbEhvbWVEaXJ9JHt1c2VyRGF0YUZpbGV9YClcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAgIC50aGVuKGFycmF5QnVmZmVyID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZFVzZXJEYXRhKGFycmF5QnVmZmVyLCBhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcblxuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5TZXR1cEV5ZUJsaW5rSWRzO1xuXG4gICAgICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICAgICAgc2V0dXBFeWVCbGlua0lkcygpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuV2FpdExvYWRVc2VyRGF0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuU2V0dXBFeWVCbGlua0lkcztcblxuICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICBzZXR1cEV5ZUJsaW5rSWRzKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIEV5ZUJsaW5rSWRzXG4gICAgY29uc3Qgc2V0dXBFeWVCbGlua0lkcyA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IGV5ZUJsaW5rSWRDb3VudDogbnVtYmVyID1cbiAgICAgICAgdGhpcy5fbW9kZWxTZXR0aW5nLmdldEV5ZUJsaW5rUGFyYW1ldGVyQ291bnQoKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleWVCbGlua0lkQ291bnQ7ICsraSkge1xuICAgICAgICB0aGlzLl9leWVCbGlua0lkcy5wdXNoQmFjayhcbiAgICAgICAgICB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0RXllQmxpbmtQYXJhbWV0ZXJJZChpKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLlNldHVwTGlwU3luY0lkcztcblxuICAgICAgLy8gY2FsbGJhY2tcbiAgICAgIHNldHVwTGlwU3luY0lkcygpO1xuICAgIH07XG5cbiAgICAvLyBMaXBTeW5jSWRzXG4gICAgY29uc3Qgc2V0dXBMaXBTeW5jSWRzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgbGlwU3luY0lkQ291bnQgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TGlwU3luY1BhcmFtZXRlckNvdW50KCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlwU3luY0lkQ291bnQ7ICsraSkge1xuICAgICAgICB0aGlzLl9saXBTeW5jSWRzLnB1c2hCYWNrKHRoaXMuX21vZGVsU2V0dGluZy5nZXRMaXBTeW5jUGFyYW1ldGVySWQoaSkpO1xuICAgICAgfVxuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5TZXR1cExheW91dDtcblxuICAgICAgLy8gY2FsbGJhY2tcbiAgICAgIHNldHVwTGF5b3V0KCk7XG4gICAgfTtcblxuICAgIC8vIExheW91dFxuICAgIGNvbnN0IHNldHVwTGF5b3V0ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgbGF5b3V0OiBjc21NYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IGNzbU1hcDxzdHJpbmcsIG51bWJlcj4oKTtcblxuICAgICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZyA9PSBudWxsIHx8IHRoaXMuX21vZGVsTWF0cml4ID09IG51bGwpIHtcbiAgICAgICAgQ3ViaXNtTG9nRXJyb3IoJ0ZhaWxlZCB0byBzZXR1cExheW91dCgpLicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX21vZGVsU2V0dGluZy5nZXRMYXlvdXRNYXAobGF5b3V0KTtcbiAgICAgIHRoaXMuX21vZGVsTWF0cml4LnNldHVwRnJvbUxheW91dChsYXlvdXQpO1xuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkTW90aW9uO1xuXG4gICAgICAvLyBjYWxsYmFja1xuICAgICAgbG9hZEN1YmlzbU1vdGlvbigpO1xuICAgIH07XG5cbiAgICAvLyBNb3Rpb25cbiAgICBjb25zdCBsb2FkQ3ViaXNtTW90aW9uID0gKCk6IHZvaWQgPT4ge1xuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZE1vdGlvbjtcbiAgICAgIHRoaXMuX21vZGVsLnNhdmVQYXJhbWV0ZXJzKCk7XG4gICAgICB0aGlzLl9hbGxNb3Rpb25Db3VudCA9IDA7XG4gICAgICB0aGlzLl9tb3Rpb25Db3VudCA9IDA7XG4gICAgICBjb25zdCBncm91cDogc3RyaW5nW10gPSBbXTtcblxuICAgICAgY29uc3QgbW90aW9uR3JvdXBDb3VudDogbnVtYmVyID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkdyb3VwQ291bnQoKTtcblxuICAgICAgLy8g44Oi44O844K344On44Oz44Gu57eP5pWw44KS5rGC44KB44KLXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdGlvbkdyb3VwQ291bnQ7IGkrKykge1xuICAgICAgICBncm91cFtpXSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Hcm91cE5hbWUoaSk7XG4gICAgICAgIHRoaXMuX2FsbE1vdGlvbkNvdW50ICs9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Db3VudChncm91cFtpXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIOODouODvOOCt+ODp+ODs+OBruiqreOBv+i+vOOBv1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb3Rpb25Hcm91cENvdW50OyBpKyspIHtcbiAgICAgICAgdGhpcy5wcmVMb2FkTW90aW9uR3JvdXAoZ3JvdXBbaV0pO1xuICAgICAgfVxuXG4gICAgICAvLyDjg6Ljg7zjgrfjg6fjg7PjgYzjgarjgYTloLTlkIhcbiAgICAgIGlmIChtb3Rpb25Hcm91cENvdW50ID09IDApIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkVGV4dHVyZTtcblxuICAgICAgICAvLyDlhajjgabjga7jg6Ljg7zjgrfjg6fjg7PjgpLlgZzmraLjgZnjgotcbiAgICAgICAgdGhpcy5fbW90aW9uTWFuYWdlci5zdG9wQWxsTW90aW9ucygpO1xuXG4gICAgICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVJlbmRlcmVyKCk7XG4gICAgICAgIHRoaXMuc2V0dXBUZXh0dXJlcygpO1xuICAgICAgICB0aGlzLmdldFJlbmRlcmVyKCkuc3RhcnRVcChnbCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg4bjgq/jgrnjg4Hjg6Pjg6bjg4vjg4Pjg4jjgavjg4bjgq/jgrnjg4Hjg6PjgpLjg63jg7zjg4njgZnjgotcbiAgICovXG4gIHByaXZhdGUgc2V0dXBUZXh0dXJlcygpOiB2b2lkIHtcbiAgICAvLyBpUGhvbmXjgafjga7jgqLjg6vjg5XjgqHlk4Hos6rlkJHkuIrjga7jgZ/jgoFUeXBlc2NyaXB044Gn44GvcHJlbXVsdGlwbGllZEFscGhh44KS5o6h55SoXG4gICAgY29uc3QgdXNlUHJlbXVsdGlwbHkgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuX3N0YXRlID09IExvYWRTdGVwLkxvYWRUZXh0dXJlKSB7XG4gICAgICAvLyDjg4bjgq/jgrnjg4Hjg6Poqq3jgb/ovrzjgb/nlKhcbiAgICAgIGNvbnN0IHRleHR1cmVDb3VudDogbnVtYmVyID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldFRleHR1cmVDb3VudCgpO1xuXG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgbW9kZWxUZXh0dXJlTnVtYmVyID0gMDtcbiAgICAgICAgbW9kZWxUZXh0dXJlTnVtYmVyIDwgdGV4dHVyZUNvdW50O1xuICAgICAgICBtb2RlbFRleHR1cmVOdW1iZXIrK1xuICAgICAgKSB7XG4gICAgICAgIC8vIOODhuOCr+OCueODgeODo+WQjeOBjOepuuaWh+Wtl+OBoOOBo+OBn+WgtOWQiOOBr+ODreODvOODieODu+ODkOOCpOODs+ODieWHpueQhuOCkuOCueOCreODg+ODl1xuICAgICAgICBpZiAodGhpcy5fbW9kZWxTZXR0aW5nLmdldFRleHR1cmVGaWxlTmFtZShtb2RlbFRleHR1cmVOdW1iZXIpID09ICcnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2dldFRleHR1cmVGaWxlTmFtZSBudWxsJyk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZWJHTOOBruODhuOCr+OCueODgeODo+ODpuODi+ODg+ODiOOBq+ODhuOCr+OCueODgeODo+OCkuODreODvOODieOBmeOCi1xuICAgICAgICBsZXQgdGV4dHVyZVBhdGggPVxuICAgICAgICAgIHRoaXMuX21vZGVsU2V0dGluZy5nZXRUZXh0dXJlRmlsZU5hbWUobW9kZWxUZXh0dXJlTnVtYmVyKTtcbiAgICAgICAgdGV4dHVyZVBhdGggPSB0aGlzLl9tb2RlbEhvbWVEaXIgKyB0ZXh0dXJlUGF0aDtcblxuICAgICAgICAvLyDjg63jg7zjg4nlrozkuobmmYLjgavlkbzjgbPlh7rjgZnjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICAgICAgY29uc3Qgb25Mb2FkID0gKHRleHR1cmVJbmZvOiBUZXh0dXJlSW5mbyk6IHZvaWQgPT4ge1xuICAgICAgICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5iaW5kVGV4dHVyZShtb2RlbFRleHR1cmVOdW1iZXIsIHRleHR1cmVJbmZvLmlkKTtcblxuICAgICAgICAgIHRoaXMuX3RleHR1cmVDb3VudCsrO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX3RleHR1cmVDb3VudCA+PSB0ZXh0dXJlQ291bnQpIHtcbiAgICAgICAgICAgIC8vIOODreODvOODieWujOS6hlxuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Db21wbGV0ZVNldHVwO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyDoqq3jgb/ovrzjgb9cbiAgICAgICAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKClcbiAgICAgICAgICAuZ2V0VGV4dHVyZU1hbmFnZXIoKVxuICAgICAgICAgIC5jcmVhdGVUZXh0dXJlRnJvbVBuZ0ZpbGUodGV4dHVyZVBhdGgsIHVzZVByZW11bHRpcGx5LCBvbkxvYWQpO1xuICAgICAgICB0aGlzLmdldFJlbmRlcmVyKCkuc2V0SXNQcmVtdWx0aXBsaWVkQWxwaGEodXNlUHJlbXVsdGlwbHkpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLldhaXRMb2FkVGV4dHVyZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44Os44Oz44OA44Op44KS5YaN5qeL56+J44GZ44KLXG4gICAqL1xuICBwdWJsaWMgcmVsb2FkUmVuZGVyZXIoKTogdm9pZCB7XG4gICAgdGhpcy5kZWxldGVSZW5kZXJlcigpO1xuICAgIHRoaXMuY3JlYXRlUmVuZGVyZXIoKTtcbiAgICB0aGlzLnNldHVwVGV4dHVyZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmm7TmlrBcbiAgICovXG5cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zdGF0ZSAhPSBMb2FkU3RlcC5Db21wbGV0ZVNldHVwKSByZXR1cm47XG5cbiAgICBjb25zdCBkZWx0YVRpbWVTZWNvbmRzOiBudW1iZXIgPSBMQXBwUGFsLmdldERlbHRhVGltZSgpO1xuICAgIHRoaXMuX3VzZXJUaW1lU2Vjb25kcyArPSBkZWx0YVRpbWVTZWNvbmRzO1xuXG4gICAgdGhpcy5fZHJhZ01hbmFnZXIudXBkYXRlKGRlbHRhVGltZVNlY29uZHMpO1xuICAgIHRoaXMuX2RyYWdYID0gdGhpcy5fZHJhZ01hbmFnZXIuZ2V0WCgpO1xuICAgIHRoaXMuX2RyYWdZID0gdGhpcy5fZHJhZ01hbmFnZXIuZ2V0WSgpO1xuXG4gICAgLy8g44Oi44O844K344On44Oz44Gr44KI44KL44OR44Op44Oh44O844K/5pu05paw44Gu5pyJ54ShXG4gICAgbGV0IG1vdGlvblVwZGF0ZWQgPSBmYWxzZTtcblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB0aGlzLl9tb2RlbC5sb2FkUGFyYW1ldGVycygpOyAvLyDliY3lm57jgrvjg7zjg5bjgZXjgozjgZ/nirbmhYvjgpLjg63jg7zjg4lcbiAgICBpZiAodGhpcy5fbW90aW9uTWFuYWdlci5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgIC8vIOODouODvOOCt+ODp+ODs+OBruWGjeeUn+OBjOOBquOBhOWgtOWQiOOAgeW+heapn+ODouODvOOCt+ODp+ODs+OBruS4reOBi+OCieODqeODs+ODgOODoOOBp+WGjeeUn+OBmeOCi1xuICAgICAgdGhpcy5zdGFydFJhbmRvbU1vdGlvbihcbiAgICAgICAgTEFwcERlZmluZS5Nb3Rpb25Hcm91cElkbGUsXG4gICAgICAgIExBcHBEZWZpbmUuUHJpb3JpdHlJZGxlXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb3Rpb25VcGRhdGVkID0gdGhpcy5fbW90aW9uTWFuYWdlci51cGRhdGVNb3Rpb24oXG4gICAgICAgIHRoaXMuX21vZGVsLFxuICAgICAgICBkZWx0YVRpbWVTZWNvbmRzXG4gICAgICApOyAvLyDjg6Ljg7zjgrfjg6fjg7PjgpLmm7TmlrBcbiAgICB9XG4gICAgdGhpcy5fbW9kZWwuc2F2ZVBhcmFtZXRlcnMoKTsgLy8g54q25oWL44KS5L+d5a2YXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8g44G+44Gw44Gf44GNXG4gICAgaWYgKCFtb3Rpb25VcGRhdGVkKSB7XG4gICAgICBpZiAodGhpcy5fZXllQmxpbmsgIT0gbnVsbCkge1xuICAgICAgICAvLyDjg6HjgqTjg7Pjg6Ljg7zjgrfjg6fjg7Pjga7mm7TmlrDjgYzjgarjgYTjgajjgY1cbiAgICAgICAgdGhpcy5fZXllQmxpbmsudXBkYXRlUGFyYW1ldGVycyh0aGlzLl9tb2RlbCwgZGVsdGFUaW1lU2Vjb25kcyk7IC8vIOebruODkeODgVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9leHByZXNzaW9uTWFuYWdlciAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9leHByZXNzaW9uTWFuYWdlci51cGRhdGVNb3Rpb24odGhpcy5fbW9kZWwsIGRlbHRhVGltZVNlY29uZHMpOyAvLyDooajmg4Xjgafjg5Hjg6njg6Hjg7zjgr/mm7TmlrDvvIjnm7jlr77lpInljJbvvIlcbiAgICB9XG5cbiAgICAvLyDjg4njg6njg4PjgrDjgavjgojjgovlpInljJZcbiAgICAvLyDjg4njg6njg4PjgrDjgavjgojjgovpoZTjga7lkJHjgY3jga7oqr/mlbRcbiAgICB0aGlzLl9tb2RlbC5hZGRQYXJhbWV0ZXJWYWx1ZUJ5SWQodGhpcy5faWRQYXJhbUFuZ2xlWCwgdGhpcy5fZHJhZ1ggKiAzMCk7IC8vIC0zMOOBi+OCiTMw44Gu5YCk44KS5Yqg44GI44KLXG4gICAgdGhpcy5fbW9kZWwuYWRkUGFyYW1ldGVyVmFsdWVCeUlkKHRoaXMuX2lkUGFyYW1BbmdsZVksIHRoaXMuX2RyYWdZICogMzApO1xuICAgIHRoaXMuX21vZGVsLmFkZFBhcmFtZXRlclZhbHVlQnlJZChcbiAgICAgIHRoaXMuX2lkUGFyYW1BbmdsZVosXG4gICAgICB0aGlzLl9kcmFnWCAqIHRoaXMuX2RyYWdZICogLTMwXG4gICAgKTtcblxuICAgIC8vIOODieODqeODg+OCsOOBq+OCiOOCi+S9k+OBruWQkeOBjeOBruiqv+aVtFxuICAgIHRoaXMuX21vZGVsLmFkZFBhcmFtZXRlclZhbHVlQnlJZChcbiAgICAgIHRoaXMuX2lkUGFyYW1Cb2R5QW5nbGVYLFxuICAgICAgdGhpcy5fZHJhZ1ggKiAxMFxuICAgICk7IC8vIC0xMOOBi+OCiTEw44Gu5YCk44KS5Yqg44GI44KLXG5cbiAgICAvLyDjg4njg6njg4PjgrDjgavjgojjgovnm67jga7lkJHjgY3jga7oqr/mlbRcbiAgICB0aGlzLl9tb2RlbC5hZGRQYXJhbWV0ZXJWYWx1ZUJ5SWQodGhpcy5faWRQYXJhbUV5ZUJhbGxYLCB0aGlzLl9kcmFnWCk7IC8vIC0x44GL44KJMeOBruWApOOCkuWKoOOBiOOCi1xuICAgIHRoaXMuX21vZGVsLmFkZFBhcmFtZXRlclZhbHVlQnlJZCh0aGlzLl9pZFBhcmFtRXllQmFsbFksIHRoaXMuX2RyYWdZKTtcblxuICAgIC8vIOWRvOWQuOOBquOBqVxuICAgIGlmICh0aGlzLl9icmVhdGggIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYnJlYXRoLnVwZGF0ZVBhcmFtZXRlcnModGhpcy5fbW9kZWwsIGRlbHRhVGltZVNlY29uZHMpO1xuICAgIH1cblxuICAgIC8vIOeJqeeQhua8lOeul+OBruioreWumlxuICAgIGlmICh0aGlzLl9waHlzaWNzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3BoeXNpY3MuZXZhbHVhdGUodGhpcy5fbW9kZWwsIGRlbHRhVGltZVNlY29uZHMpO1xuICAgIH1cblxuICAgIC8vIOODquODg+ODl+OCt+ODs+OCr+OBruioreWumlxuICAgIGlmICh0aGlzLl9saXBzeW5jKSB7XG4gICAgICBsZXQgdmFsdWUgPSAwLjA7IC8vIOODquOCouODq+OCv+OCpOODoOOBp+ODquODg+ODl+OCt+ODs+OCr+OCkuihjOOBhuWgtOWQiOOAgeOCt+OCueODhuODoOOBi+OCiemfs+mHj+OCkuWPluW+l+OBl+OBpuOAgTB+MeOBruevhOWbsuOBp+WApOOCkuWFpeWKm+OBl+OBvuOBmeOAglxuXG4gICAgICB0aGlzLl93YXZGaWxlSGFuZGxlci51cGRhdGUoZGVsdGFUaW1lU2Vjb25kcyk7XG4gICAgICB2YWx1ZSA9IHRoaXMuX3dhdkZpbGVIYW5kbGVyLmdldFJtcygpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2xpcFN5bmNJZHMuZ2V0U2l6ZSgpOyArK2kpIHtcbiAgICAgICAgdGhpcy5fbW9kZWwuYWRkUGFyYW1ldGVyVmFsdWVCeUlkKHRoaXMuX2xpcFN5bmNJZHMuYXQoaSksIHZhbHVlLCAwLjgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIOODneODvOOCuuOBruioreWumlxuICAgIGlmICh0aGlzLl9wb3NlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3Bvc2UudXBkYXRlUGFyYW1ldGVycyh0aGlzLl9tb2RlbCwgZGVsdGFUaW1lU2Vjb25kcyk7XG4gICAgfVxuXG4gICAgY29uc3QgYXVkaW86IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2b2ljZScpO1xuICAgIGlmIChhdWRpby5zcmMgIT09IHRoaXMuX2F1ZGlvU3JjKSB7XG4gICAgICB0aGlzLl9hdWRpb1NyYyA9IGF1ZGlvLnNyYztcbiAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICB9XG4gICAgdGhpcy5fbW9kZWwudXBkYXRlKCk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiDlvJXmlbDjgafmjIflrprjgZfjgZ/jg6Ljg7zjgrfjg6fjg7Pjga7lho3nlJ/jgpLplovlp4vjgZnjgotcbiAgICogQHBhcmFtIGdyb3VwIOODouODvOOCt+ODp+ODs+OCsOODq+ODvOODl+WQjVxuICAgKiBAcGFyYW0gbm8g44Kw44Or44O844OX5YaF44Gu55Wq5Y+3XG4gICAqIEBwYXJhbSBwcmlvcml0eSDlhKrlhYjluqZcbiAgICogQHBhcmFtIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyIOODouODvOOCt+ODp+ODs+WGjeeUn+e1guS6huaZguOBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+mWouaVsFxuICAgKiBAcmV0dXJuIOmWi+Wni+OBl+OBn+ODouODvOOCt+ODp+ODs+OBruitmOWIpeeVquWPt+OCkui/lOOBmeOAguWAi+WIpeOBruODouODvOOCt+ODp+ODs+OBjOe1guS6huOBl+OBn+OBi+WQpuOBi+OCkuWIpOWumuOBmeOCi2lzRmluaXNoZWQoKeOBruW8leaVsOOBp+S9v+eUqOOBmeOCi+OAgumWi+Wni+OBp+OBjeOBquOBhOaZguOBr1stMV1cbiAgICovXG4gIHB1YmxpYyBzdGFydE1vdGlvbihcbiAgICBncm91cDogc3RyaW5nLFxuICAgIG5vOiBudW1iZXIsXG4gICAgcHJpb3JpdHk6IG51bWJlcixcbiAgICBvbkZpbmlzaGVkTW90aW9uSGFuZGxlcj86IEZpbmlzaGVkTW90aW9uQ2FsbGJhY2tcbiAgKTogQ3ViaXNtTW90aW9uUXVldWVFbnRyeUhhbmRsZSB7XG5cbiAgICBpZiAocHJpb3JpdHkgPT0gTEFwcERlZmluZS5Qcmlvcml0eUZvcmNlKSB7XG4gICAgICB0aGlzLl9tb3Rpb25NYW5hZ2VyLnNldFJlc2VydmVQcmlvcml0eShwcmlvcml0eSk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5fbW90aW9uTWFuYWdlci5yZXNlcnZlTW90aW9uKHByaW9yaXR5KSkge1xuICAgICAgaWYgKHRoaXMuX2RlYnVnTW9kZSkge1xuICAgICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShcIltBUFBdY2FuJ3Qgc3RhcnQgbW90aW9uLlwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBJbnZhbGlkTW90aW9uUXVldWVFbnRyeUhhbmRsZVZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IG1vdGlvbkZpbGVOYW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkZpbGVOYW1lKGdyb3VwLCBubyk7XG5cbiAgICAvLyBleCkgaWRsZV8wXG4gICAgY29uc3QgbmFtZSA9IGAke2dyb3VwfV8ke25vfWA7XG4gICAgbGV0IG1vdGlvbjogQ3ViaXNtTW90aW9uID0gdGhpcy5fbW90aW9ucy5nZXRWYWx1ZShuYW1lKSBhcyBDdWJpc21Nb3Rpb247XG4gICAgbGV0IGF1dG9EZWxldGUgPSBmYWxzZTtcblxuICAgIGlmIChtb3Rpb24gPT0gbnVsbCkge1xuICAgICAgZmV0Y2goYCR7dGhpcy5fbW9kZWxIb21lRGlyfSR7bW90aW9uRmlsZU5hbWV9YClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICAgIG1vdGlvbiA9IHRoaXMubG9hZE1vdGlvbihcbiAgICAgICAgICAgIGFycmF5QnVmZmVyLFxuICAgICAgICAgICAgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBvbkZpbmlzaGVkTW90aW9uSGFuZGxlclxuICAgICAgICAgICk7XG4gICAgICAgICAgbGV0IGZhZGVUaW1lOiBudW1iZXIgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmFkZUluVGltZVZhbHVlKFxuICAgICAgICAgICAgZ3JvdXAsXG4gICAgICAgICAgICBub1xuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoZmFkZVRpbWUgPj0gMC4wKSB7XG4gICAgICAgICAgICBtb3Rpb24uc2V0RmFkZUluVGltZShmYWRlVGltZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmFkZVRpbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmFkZU91dFRpbWVWYWx1ZShncm91cCwgbm8pO1xuICAgICAgICAgIGlmIChmYWRlVGltZSA+PSAwLjApIHtcbiAgICAgICAgICAgIG1vdGlvbi5zZXRGYWRlT3V0VGltZShmYWRlVGltZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbW90aW9uLnNldEVmZmVjdElkcyh0aGlzLl9leWVCbGlua0lkcywgdGhpcy5fbGlwU3luY0lkcyk7XG4gICAgICAgICAgYXV0b0RlbGV0ZSA9IHRydWU7IC8vIOe1guS6huaZguOBq+ODoeODouODquOBi+OCieWJiumZpFxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbW90aW9uLnNldEZpbmlzaGVkTW90aW9uSGFuZGxlcihvbkZpbmlzaGVkTW90aW9uSGFuZGxlcik7XG4gICAgfVxuXG4gICAgLy92b2ljZVxuICAgIGNvbnN0IHZvaWNlID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvblNvdW5kRmlsZU5hbWUoZ3JvdXAsIG5vKTtcbiAgICBpZiAodm9pY2UubG9jYWxlQ29tcGFyZSgnJykgIT0gMCkge1xuICAgICAgbGV0IHBhdGggPSB2b2ljZTtcbiAgICAgIHBhdGggPSB0aGlzLl9tb2RlbEhvbWVEaXIgKyBwYXRoO1xuICAgICAgdGhpcy5fd2F2RmlsZUhhbmRsZXIuc3RhcnQocGF0aCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RlYnVnTW9kZSkge1xuICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoYFtBUFBdc3RhcnQgbW90aW9uOiBbJHtncm91cH1fJHtub31gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX21vdGlvbk1hbmFnZXIuc3RhcnRNb3Rpb25Qcmlvcml0eShcbiAgICAgIG1vdGlvbixcbiAgICAgIGF1dG9EZWxldGUsXG4gICAgICBwcmlvcml0eVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICog44Op44Oz44OA44Og44Gr6YG444Gw44KM44Gf44Oi44O844K344On44Oz44Gu5YaN55Sf44KS6ZaL5aeL44GZ44KL44CCXG4gICAqIEBwYXJhbSBncm91cCDjg6Ljg7zjgrfjg6fjg7PjgrDjg6vjg7zjg5flkI1cbiAgICogQHBhcmFtIHByaW9yaXR5IOWEquWFiOW6plxuICAgKiBAcGFyYW0gb25GaW5pc2hlZE1vdGlvbkhhbmRsZXIg44Oi44O844K344On44Oz5YaN55Sf57WC5LqG5pmC44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv6Zai5pWwXG4gICAqIEByZXR1cm4g6ZaL5aeL44GX44Gf44Oi44O844K344On44Oz44Gu6K2Y5Yil55Wq5Y+344KS6L+U44GZ44CC5YCL5Yil44Gu44Oi44O844K344On44Oz44GM57WC5LqG44GX44Gf44GL5ZCm44GL44KS5Yik5a6a44GZ44KLaXNGaW5pc2hlZCgp44Gu5byV5pWw44Gn5L2/55So44GZ44KL44CC6ZaL5aeL44Gn44GN44Gq44GE5pmC44GvWy0xXVxuICAgKi9cbiAgcHVibGljIHN0YXJ0UmFuZG9tTW90aW9uKFxuICAgIGdyb3VwOiBzdHJpbmcsXG4gICAgcHJpb3JpdHk6IG51bWJlcixcbiAgICBvbkZpbmlzaGVkTW90aW9uSGFuZGxlcj86IEZpbmlzaGVkTW90aW9uQ2FsbGJhY2tcbiAgKTogQ3ViaXNtTW90aW9uUXVldWVFbnRyeUhhbmRsZSB7XG4gICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Db3VudChncm91cCkgPT0gMCkge1xuICAgICAgcmV0dXJuIEludmFsaWRNb3Rpb25RdWV1ZUVudHJ5SGFuZGxlVmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3Qgbm86IG51bWJlciA9IE1hdGguZmxvb3IoXG4gICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkNvdW50KGdyb3VwKVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5zdGFydE1vdGlvbihncm91cCwgbm8sIHByaW9yaXR5LCBvbkZpbmlzaGVkTW90aW9uSGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICog5byV5pWw44Gn5oyH5a6a44GX44Gf6KGo5oOF44Oi44O844K344On44Oz44KS44K744OD44OI44GZ44KLXG4gICAqXG4gICAqIEBwYXJhbSBleHByZXNzaW9uSWQg6KGo5oOF44Oi44O844K344On44Oz44GuSURcbiAgICovXG4gIHB1YmxpYyBzZXRFeHByZXNzaW9uKGV4cHJlc3Npb25JZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbW90aW9uOiBBQ3ViaXNtTW90aW9uID0gdGhpcy5fZXhwcmVzc2lvbnMuZ2V0VmFsdWUoZXhwcmVzc2lvbklkKTtcblxuICAgIGlmICh0aGlzLl9kZWJ1Z01vZGUpIHtcbiAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKGBbQVBQXWV4cHJlc3Npb246IFske2V4cHJlc3Npb25JZH1dYCk7XG4gICAgfVxuXG4gICAgaWYgKG1vdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9leHByZXNzaW9uTWFuYWdlci5zdGFydE1vdGlvblByaW9yaXR5KFxuICAgICAgICBtb3Rpb24sXG4gICAgICAgIGZhbHNlLFxuICAgICAgICBMQXBwRGVmaW5lLlByaW9yaXR5Rm9yY2VcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9kZWJ1Z01vZGUpIHtcbiAgICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoYFtBUFBdZXhwcmVzc2lvblske2V4cHJlc3Npb25JZH1dIGlzIG51bGxgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44Op44Oz44OA44Og44Gr6YG444Gw44KM44Gf6KGo5oOF44Oi44O844K344On44Oz44KS44K744OD44OI44GZ44KLXG4gICAqL1xuICBwdWJsaWMgc2V0UmFuZG9tRXhwcmVzc2lvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZXhwcmVzc2lvbnMuZ2V0U2l6ZSgpID09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBubzogbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5fZXhwcmVzc2lvbnMuZ2V0U2l6ZSgpKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZXhwcmVzc2lvbnMuZ2V0U2l6ZSgpOyBpKyspIHtcbiAgICAgIGlmIChpID09IG5vKSB7XG4gICAgICAgIGNvbnN0IG5hbWU6IHN0cmluZyA9IHRoaXMuX2V4cHJlc3Npb25zLl9rZXlWYWx1ZXNbaV0uZmlyc3Q7XG4gICAgICAgIHRoaXMuc2V0RXhwcmVzc2lvbihuYW1lKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjgqTjg5njg7Pjg4jjga7nmbrngavjgpLlj5fjgZHlj5bjgotcbiAgICovXG4gIHB1YmxpYyBtb3Rpb25FdmVudEZpcmVkKGV2ZW50VmFsdWU6IGNzbVN0cmluZyk6IHZvaWQge1xuICAgIEN1YmlzbUxvZ0luZm8oJ3swfSBpcyBmaXJlZCBvbiBMQXBwTW9kZWwhIScsIGV2ZW50VmFsdWUucyk7XG4gIH1cblxuICAvKipcbiAgICog5b2T44Gf44KK5Yik5a6a44OG44K544OIXG4gICAqIOaMh+Wumu+8qe+8pOOBrumggueCueODquOCueODiOOBi+OCieefqeW9ouOCkuioiOeul+OBl+OAgeW6p+aomeOCkuOBjOefqeW9ouevhOWbsuWGheOBi+WIpOWumuOBmeOCi+OAglxuICAgKlxuICAgKiBAcGFyYW0gaGl0QXJlbmFOYW1lICDlvZPjgZ/jgorliKTlrprjgpLjg4bjgrnjg4jjgZnjgovlr77osaHjga5JRFxuICAgKiBAcGFyYW0geCAgICAgICAgICAgICDliKTlrprjgpLooYzjgYZY5bqn5qiZXG4gICAqIEBwYXJhbSB5ICAgICAgICAgICAgIOWIpOWumuOCkuihjOOBhlnluqfmqJlcbiAgICovXG4gIHB1YmxpYyBoaXRUZXN0KGhpdEFyZW5hTmFtZTogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIC8vIOmAj+aYjuaZguOBr+W9k+OBn+OCiuWIpOWumueEoeOBl+OAglxuICAgIGlmICh0aGlzLl9vcGFjaXR5IDwgMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGNvdW50OiBudW1iZXIgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0SGl0QXJlYXNDb3VudCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5fbW9kZWxTZXR0aW5nLmdldEhpdEFyZWFOYW1lKGkpID09IGhpdEFyZW5hTmFtZSkge1xuICAgICAgICBjb25zdCBkcmF3SWQ6IEN1YmlzbUlkSGFuZGxlID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldEhpdEFyZWFJZChpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNIaXQoZHJhd0lkLCB4LCB5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44OH44O844K/44KS44Kw44Or44O844OX5ZCN44GL44KJ5LiA5ous44Gn44Ot44O844OJ44GZ44KL44CCXG4gICAqIOODouODvOOCt+ODp+ODs+ODh+ODvOOCv+OBruWQjeWJjeOBr+WGhemDqOOBp01vZGVsU2V0dGluZ+OBi+OCieWPluW+l+OBmeOCi+OAglxuICAgKlxuICAgKiBAcGFyYW0gZ3JvdXAg44Oi44O844K344On44Oz44OH44O844K/44Gu44Kw44Or44O844OX5ZCNXG4gICAqL1xuICBwdWJsaWMgcHJlTG9hZE1vdGlvbkdyb3VwKGdyb3VwOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Db3VudChncm91cCk7IGkrKykge1xuICAgICAgY29uc3QgbW90aW9uRmlsZU5hbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmlsZU5hbWUoZ3JvdXAsIGkpO1xuXG4gICAgICAvLyBleCkgaWRsZV8wXG4gICAgICBjb25zdCBuYW1lID0gYCR7Z3JvdXB9XyR7aX1gO1xuICAgICAgaWYgKHRoaXMuX2RlYnVnTW9kZSkge1xuICAgICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShcbiAgICAgICAgICBgW0FQUF1sb2FkIG1vdGlvbjogJHttb3Rpb25GaWxlTmFtZX0gPT4gWyR7bmFtZX1dYFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBmZXRjaChgJHt0aGlzLl9tb2RlbEhvbWVEaXJ9JHttb3Rpb25GaWxlTmFtZX1gKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAudGhlbihhcnJheUJ1ZmZlciA9PiB7XG4gICAgICAgICAgY29uc3QgdG1wTW90aW9uOiBDdWJpc21Nb3Rpb24gPSB0aGlzLmxvYWRNb3Rpb24oXG4gICAgICAgICAgICBhcnJheUJ1ZmZlcixcbiAgICAgICAgICAgIGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgsXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGxldCBmYWRlVGltZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25GYWRlSW5UaW1lVmFsdWUoZ3JvdXAsIGkpO1xuICAgICAgICAgIGlmIChmYWRlVGltZSA+PSAwLjApIHtcbiAgICAgICAgICAgIHRtcE1vdGlvbi5zZXRGYWRlSW5UaW1lKGZhZGVUaW1lKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmYWRlVGltZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25GYWRlT3V0VGltZVZhbHVlKGdyb3VwLCBpKTtcbiAgICAgICAgICBpZiAoZmFkZVRpbWUgPj0gMC4wKSB7XG4gICAgICAgICAgICB0bXBNb3Rpb24uc2V0RmFkZU91dFRpbWUoZmFkZVRpbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0bXBNb3Rpb24uc2V0RWZmZWN0SWRzKHRoaXMuX2V5ZUJsaW5rSWRzLCB0aGlzLl9saXBTeW5jSWRzKTtcblxuICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25zLmdldFZhbHVlKG5hbWUpICE9IG51bGwpIHtcbiAgICAgICAgICAgIEFDdWJpc21Nb3Rpb24uZGVsZXRlKHRoaXMuX21vdGlvbnMuZ2V0VmFsdWUobmFtZSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX21vdGlvbnMuc2V0VmFsdWUobmFtZSwgdG1wTW90aW9uKTtcblxuICAgICAgICAgIHRoaXMuX21vdGlvbkNvdW50Kys7XG4gICAgICAgICAgaWYgKHRoaXMuX21vdGlvbkNvdW50ID49IHRoaXMuX2FsbE1vdGlvbkNvdW50KSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRUZXh0dXJlO1xuXG4gICAgICAgICAgICAvLyDlhajjgabjga7jg6Ljg7zjgrfjg6fjg7PjgpLlgZzmraLjgZnjgotcbiAgICAgICAgICAgIHRoaXMuX21vdGlvbk1hbmFnZXIuc3RvcEFsbE1vdGlvbnMoKTtcblxuICAgICAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5jcmVhdGVSZW5kZXJlcigpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cFRleHR1cmVzKCk7XG4gICAgICAgICAgICB0aGlzLmdldFJlbmRlcmVyKCkuc3RhcnRVcChnbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44GZ44G544Gm44Gu44Oi44O844K344On44Oz44OH44O844K/44KS6Kej5pS+44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgcmVsZWFzZU1vdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5fbW90aW9ucy5jbGVhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIOWFqOOBpuOBruihqOaDheODh+ODvOOCv+OCkuino+aUvuOBmeOCi+OAglxuICAgKi9cbiAgcHVibGljIHJlbGVhc2VFeHByZXNzaW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLl9leHByZXNzaW9ucy5jbGVhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODh+ODq+OCkuaPj+eUu+OBmeOCi+WHpueQhuOAguODouODh+ODq+OCkuaPj+eUu+OBmeOCi+epuumWk+OBrlZpZXctUHJvamVjdGlvbuihjOWIl+OCkua4oeOBmeOAglxuICAgKi9cbiAgcHVibGljIGRvRHJhdygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbW9kZWwgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgLy8g44Kt44Oj44Oz44OQ44K544K144Kk44K644KS5rih44GZXG4gICAgY29uc3Qgdmlld3BvcnQ6IG51bWJlcltdID0gWzAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodF07XG5cbiAgICB0aGlzLmdldFJlbmRlcmVyKCkuc2V0UmVuZGVyU3RhdGUoZnJhbWVCdWZmZXIsIHZpZXdwb3J0KTtcbiAgICB0aGlzLmdldFJlbmRlcmVyKCkuZHJhd01vZGVsKCk7XG4gIH1cblxuICAvKipcbiAgICog44Oi44OH44Or44KS5o+P55S744GZ44KL5Yem55CG44CC44Oi44OH44Or44KS5o+P55S744GZ44KL56m66ZaT44GuVmlldy1Qcm9qZWN0aW9u6KGM5YiX44KS5rih44GZ44CCXG4gICAqL1xuICBwdWJsaWMgZHJhdyhtYXRyaXg6IEN1YmlzbU1hdHJpeDQ0KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21vZGVsID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyDlkIToqq3jgb/ovrzjgb/ntYLkuoblvoxcbiAgICBpZiAodGhpcy5fc3RhdGUgPT0gTG9hZFN0ZXAuQ29tcGxldGVTZXR1cCkge1xuICAgICAgbWF0cml4Lm11bHRpcGx5QnlNYXRyaXgodGhpcy5fbW9kZWxNYXRyaXgpO1xuXG4gICAgICB0aGlzLmdldFJlbmRlcmVyKCkuc2V0TXZwTWF0cml4KG1hdHJpeCk7XG5cbiAgICAgIHRoaXMuZG9EcmF3KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9tb2RlbFNldHRpbmcgPSBudWxsO1xuICAgIHRoaXMuX21vZGVsSG9tZURpciA9IG51bGw7XG4gICAgdGhpcy5fdXNlclRpbWVTZWNvbmRzID0gMC4wO1xuXG4gICAgdGhpcy5fZXllQmxpbmtJZHMgPSBuZXcgY3NtVmVjdG9yPEN1YmlzbUlkSGFuZGxlPigpO1xuICAgIHRoaXMuX2xpcFN5bmNJZHMgPSBuZXcgY3NtVmVjdG9yPEN1YmlzbUlkSGFuZGxlPigpO1xuXG4gICAgdGhpcy5fbW90aW9ucyA9IG5ldyBjc21NYXA8c3RyaW5nLCBBQ3ViaXNtTW90aW9uPigpO1xuICAgIHRoaXMuX2V4cHJlc3Npb25zID0gbmV3IGNzbU1hcDxzdHJpbmcsIEFDdWJpc21Nb3Rpb24+KCk7XG5cbiAgICB0aGlzLl9oaXRBcmVhID0gbmV3IGNzbVZlY3Rvcjxjc21SZWN0PigpO1xuICAgIHRoaXMuX3VzZXJBcmVhID0gbmV3IGNzbVZlY3Rvcjxjc21SZWN0PigpO1xuXG4gICAgdGhpcy5faWRQYXJhbUFuZ2xlWCA9IEN1YmlzbUZyYW1ld29yay5nZXRJZE1hbmFnZXIoKS5nZXRJZChcbiAgICAgIEN1YmlzbURlZmF1bHRQYXJhbWV0ZXJJZC5QYXJhbUFuZ2xlWFxuICAgICk7XG4gICAgdGhpcy5faWRQYXJhbUFuZ2xlWSA9IEN1YmlzbUZyYW1ld29yay5nZXRJZE1hbmFnZXIoKS5nZXRJZChcbiAgICAgIEN1YmlzbURlZmF1bHRQYXJhbWV0ZXJJZC5QYXJhbUFuZ2xlWVxuICAgICk7XG4gICAgdGhpcy5faWRQYXJhbUFuZ2xlWiA9IEN1YmlzbUZyYW1ld29yay5nZXRJZE1hbmFnZXIoKS5nZXRJZChcbiAgICAgIEN1YmlzbURlZmF1bHRQYXJhbWV0ZXJJZC5QYXJhbUFuZ2xlWlxuICAgICk7XG4gICAgdGhpcy5faWRQYXJhbUV5ZUJhbGxYID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtRXllQmFsbFhcbiAgICApO1xuICAgIHRoaXMuX2lkUGFyYW1FeWVCYWxsWSA9IEN1YmlzbUZyYW1ld29yay5nZXRJZE1hbmFnZXIoKS5nZXRJZChcbiAgICAgIEN1YmlzbURlZmF1bHRQYXJhbWV0ZXJJZC5QYXJhbUV5ZUJhbGxZXG4gICAgKTtcbiAgICB0aGlzLl9pZFBhcmFtQm9keUFuZ2xlWCA9IEN1YmlzbUZyYW1ld29yay5nZXRJZE1hbmFnZXIoKS5nZXRJZChcbiAgICAgIEN1YmlzbURlZmF1bHRQYXJhbWV0ZXJJZC5QYXJhbUJvZHlBbmdsZVhcbiAgICApO1xuXG4gICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkQXNzZXRzO1xuICAgIHRoaXMuX2V4cHJlc3Npb25Db3VudCA9IDA7XG4gICAgdGhpcy5fdGV4dHVyZUNvdW50ID0gMDtcbiAgICB0aGlzLl9tb3Rpb25Db3VudCA9IDA7XG4gICAgdGhpcy5fYWxsTW90aW9uQ291bnQgPSAwO1xuICAgIHRoaXMuX3dhdkZpbGVIYW5kbGVyID0gbmV3IExBcHBXYXZGaWxlSGFuZGxlcigpO1xuICB9XG5cbiAgX21vZGVsU2V0dGluZzogSUN1YmlzbU1vZGVsU2V0dGluZzsgLy8g44Oi44OH44Or44K744OD44OG44Kj44Oz44Kw5oOF5aCxXG4gIF9tb2RlbEhvbWVEaXI6IHN0cmluZzsgLy8g44Oi44OH44Or44K744OD44OG44Kj44Oz44Kw44GM572u44GL44KM44Gf44OH44Kj44Os44Kv44OI44OqXG4gIF91c2VyVGltZVNlY29uZHM6IG51bWJlcjsgLy8g44OH44Or44K/5pmC6ZaT44Gu56mN566X5YCkW+enkl1cblxuICBfZXllQmxpbmtJZHM6IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT47IC8vIOODouODh+ODq+OBq+ioreWumuOBleOCjOOBn+eerOOBjeapn+iDveeUqOODkeODqeODoeODvOOCv0lEXG4gIF9saXBTeW5jSWRzOiBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+OyAvLyDjg6Ljg4fjg6vjgavoqK3lrprjgZXjgozjgZ/jg6rjg4Pjg5fjgrfjg7Pjgq/mqZ/og73nlKjjg5Hjg6njg6Hjg7zjgr9JRFxuXG4gIF9tb3Rpb25zOiBjc21NYXA8c3RyaW5nLCBBQ3ViaXNtTW90aW9uPjsgLy8g6Kqt44G/6L6844G+44KM44Gm44GE44KL44Oi44O844K344On44Oz44Gu44Oq44K544OIXG4gIF9leHByZXNzaW9uczogY3NtTWFwPHN0cmluZywgQUN1YmlzbU1vdGlvbj47IC8vIOiqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ihqOaDheOBruODquOCueODiFxuXG4gIF9oaXRBcmVhOiBjc21WZWN0b3I8Y3NtUmVjdD47XG4gIF91c2VyQXJlYTogY3NtVmVjdG9yPGNzbVJlY3Q+O1xuXG4gIF9pZFBhcmFtQW5nbGVYOiBDdWJpc21JZEhhbmRsZTsgLy8g44OR44Op44Oh44O844K/SUQ6IFBhcmFtQW5nbGVYXG4gIF9pZFBhcmFtQW5nbGVZOiBDdWJpc21JZEhhbmRsZTsgLy8g44OR44Op44Oh44O844K/SUQ6IFBhcmFtQW5nbGVZXG4gIF9pZFBhcmFtQW5nbGVaOiBDdWJpc21JZEhhbmRsZTsgLy8g44OR44Op44Oh44O844K/SUQ6IFBhcmFtQW5nbGVaXG4gIF9pZFBhcmFtRXllQmFsbFg6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg5Hjg6njg6Hjg7zjgr9JRDogUGFyYW1FeWVCYWxsWFxuICBfaWRQYXJhbUV5ZUJhbGxZOiBDdWJpc21JZEhhbmRsZTsgLy8g44OR44Op44Oh44O844K/SUQ6IFBhcmFtRXllQkFsbFlcbiAgX2lkUGFyYW1Cb2R5QW5nbGVYOiBDdWJpc21JZEhhbmRsZTsgLy8g44OR44Op44Oh44O844K/SUQ6IFBhcmFtQm9keUFuZ2xlWFxuXG4gIF9zdGF0ZTogbnVtYmVyOyAvLyDnj77lnKjjga7jgrnjg4bjg7zjgr/jgrnnrqHnkIbnlKhcbiAgX2V4cHJlc3Npb25Db3VudDogbnVtYmVyOyAvLyDooajmg4Xjg4fjg7zjgr/jgqvjgqbjg7Pjg4hcbiAgX3RleHR1cmVDb3VudDogbnVtYmVyOyAvLyDjg4bjgq/jgrnjg4Hjg6Pjgqvjgqbjg7Pjg4hcbiAgX21vdGlvbkNvdW50OiBudW1iZXI7IC8vIOODouODvOOCt+ODp+ODs+ODh+ODvOOCv+OCq+OCpuODs+ODiFxuICBfYWxsTW90aW9uQ291bnQ6IG51bWJlcjsgLy8g44Oi44O844K344On44Oz57eP5pWwXG4gIF93YXZGaWxlSGFuZGxlcjogTEFwcFdhdkZpbGVIYW5kbGVyOyAvL3dhduODleOCoeOCpOODq+ODj+ODs+ODieODqVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuLyoqXG4gKiDjg5fjg6njg4Pjg4jjg5Xjgqnjg7zjg6Dkvp3lrZjmqZ/og73jgpLmir3osaHljJbjgZnjgosgQ3ViaXNtIFBsYXRmb3JtIEFic3RyYWN0aW9uIExheWVyLlxuICpcbiAqIOODleOCoeOCpOODq+iqreOBv+i+vOOBv+OChOaZguWIu+WPluW+l+etieOBruODl+ODqeODg+ODiOODleOCqeODvOODoOOBq+S+neWtmOOBmeOCi+mWouaVsOOCkuOBvuOBqOOCgeOCi+OAglxuICovXG5leHBvcnQgY2xhc3MgTEFwcFBhbCB7XG4gIC8qKlxuICAgKiDjg5XjgqHjgqTjg6vjgpLjg5DjgqTjg4jjg4fjg7zjgr/jgajjgZfjgaboqq3jgb/jgZPjgoBcbiAgICpcbiAgICogQHBhcmFtIGZpbGVQYXRoIOiqreOBv+i+vOOBv+WvvuixoeODleOCoeOCpOODq+OBruODkeOCuVxuICAgKiBAcmV0dXJuXG4gICAqIHtcbiAgICogICAgICBidWZmZXIsICAg6Kqt44G/6L6844KT44Gg44OQ44Kk44OI44OH44O844K/XG4gICAqICAgICAgc2l6ZSAgICAgICAg44OV44Kh44Kk44Or44K144Kk44K6XG4gICAqIH1cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgbG9hZEZpbGVBc0J5dGVzKFxuICAgIGZpbGVQYXRoOiBzdHJpbmcsXG4gICAgY2FsbGJhY2s6IChhcnJheUJ1ZmZlcjogQXJyYXlCdWZmZXIsIHNpemU6IG51bWJlcikgPT4gdm9pZFxuICApOiB2b2lkIHtcbiAgICBmZXRjaChmaWxlUGF0aClcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpXG4gICAgICAudGhlbihhcnJheUJ1ZmZlciA9PiBjYWxsYmFjayhhcnJheUJ1ZmZlciwgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIOODh+ODq+OCv+aZgumWk++8iOWJjeWbnuODleODrOODvOODoOOBqOOBruW3ruWIhu+8ieOCkuWPluW+l+OBmeOCi1xuICAgKiBAcmV0dXJuIOODh+ODq+OCv+aZgumWk1ttc11cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RGVsdGFUaW1lKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc19kZWx0YVRpbWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHVwZGF0ZVRpbWUoKTogdm9pZCB7XG4gICAgdGhpcy5zX2N1cnJlbnRGcmFtZSA9IERhdGUubm93KCk7XG4gICAgdGhpcy5zX2RlbHRhVGltZSA9ICh0aGlzLnNfY3VycmVudEZyYW1lIC0gdGhpcy5zX2xhc3RGcmFtZSkgLyAxMDAwO1xuICAgIHRoaXMuc19sYXN0RnJhbWUgPSB0aGlzLnNfY3VycmVudEZyYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIOODoeODg+OCu+ODvOOCuOOCkuWHuuWKm+OBmeOCi1xuICAgKiBAcGFyYW0gbWVzc2FnZSDmloflrZfliJdcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcHJpbnRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICB9XG5cbiAgc3RhdGljIGxhc3RVcGRhdGUgPSBEYXRlLm5vdygpO1xuXG4gIHN0YXRpYyBzX2N1cnJlbnRGcmFtZSA9IDAuMDtcbiAgc3RhdGljIHNfbGFzdEZyYW1lID0gMC4wO1xuICBzdGF0aWMgc19kZWx0YVRpbWUgPSAwLjA7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBjYW52YXMsIGdsIH0gZnJvbSAnLi9sYXBwZGVsZWdhdGUnO1xuXG4vKipcbiAqIOOCueODl+ODqeOCpOODiOOCkuWun+ijheOBmeOCi+OCr+ODqeOCuVxuICpcbiAqIOODhuOCr+OCueODgeODo++8qe+8pOOAgVJlY3Tjga7nrqHnkIZcbiAqL1xuZXhwb3J0IGNsYXNzIExBcHBTcHJpdGUge1xuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAqIEBwYXJhbSB4ICAgICAgICAgICAgeOW6p+aomVxuICAgKiBAcGFyYW0geSAgICAgICAgICAgIHnluqfmqJlcbiAgICogQHBhcmFtIHdpZHRoICAgICAgICDmqKrluYVcbiAgICogQHBhcmFtIGhlaWdodCAgICAgICDpq5jjgZVcbiAgICogQHBhcmFtIHRleHR1cmVJZCAgICDjg4bjgq/jgrnjg4Hjg6NcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB0ZXh0dXJlSWQ6IFdlYkdMVGV4dHVyZVxuICApIHtcbiAgICB0aGlzLl9yZWN0ID0gbmV3IFJlY3QoKTtcbiAgICB0aGlzLl9yZWN0LmxlZnQgPSB4IC0gd2lkdGggKiAwLjU7XG4gICAgdGhpcy5fcmVjdC5yaWdodCA9IHggKyB3aWR0aCAqIDAuNTtcbiAgICB0aGlzLl9yZWN0LnVwID0geSArIGhlaWdodCAqIDAuNTtcbiAgICB0aGlzLl9yZWN0LmRvd24gPSB5IC0gaGVpZ2h0ICogMC41O1xuICAgIHRoaXMuX3RleHR1cmUgPSB0ZXh0dXJlSWQ7XG4gICAgdGhpcy5fdmVydGV4QnVmZmVyID0gbnVsbDtcbiAgICB0aGlzLl91dkJ1ZmZlciA9IG51bGw7XG4gICAgdGhpcy5faW5kZXhCdWZmZXIgPSBudWxsO1xuXG4gICAgdGhpcy5fcG9zaXRpb25Mb2NhdGlvbiA9IG51bGw7XG4gICAgdGhpcy5fdXZMb2NhdGlvbiA9IG51bGw7XG4gICAgdGhpcy5fdGV4dHVyZUxvY2F0aW9uID0gbnVsbDtcblxuICAgIHRoaXMuX3Bvc2l0aW9uQXJyYXkgPSBudWxsO1xuICAgIHRoaXMuX3V2QXJyYXkgPSBudWxsO1xuICAgIHRoaXMuX2luZGV4QXJyYXkgPSBudWxsO1xuXG4gICAgdGhpcy5fZmlyc3REcmF3ID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiDop6PmlL7jgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyByZWxlYXNlKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlY3QgPSBudWxsO1xuXG4gICAgZ2wuZGVsZXRlVGV4dHVyZSh0aGlzLl90ZXh0dXJlKTtcbiAgICB0aGlzLl90ZXh0dXJlID0gbnVsbDtcblxuICAgIGdsLmRlbGV0ZUJ1ZmZlcih0aGlzLl91dkJ1ZmZlcik7XG4gICAgdGhpcy5fdXZCdWZmZXIgPSBudWxsO1xuXG4gICAgZ2wuZGVsZXRlQnVmZmVyKHRoaXMuX3ZlcnRleEJ1ZmZlcik7XG4gICAgdGhpcy5fdmVydGV4QnVmZmVyID0gbnVsbDtcblxuICAgIGdsLmRlbGV0ZUJ1ZmZlcih0aGlzLl9pbmRleEJ1ZmZlcik7XG4gICAgdGhpcy5faW5kZXhCdWZmZXIgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIOODhuOCr+OCueODgeODo+OCkui/lOOBmVxuICAgKi9cbiAgcHVibGljIGdldFRleHR1cmUoKTogV2ViR0xUZXh0dXJlIHtcbiAgICByZXR1cm4gdGhpcy5fdGV4dHVyZTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmj4/nlLvjgZnjgovjgIJcbiAgICogQHBhcmFtIHByb2dyYW1JZCDjgrfjgqfjg7zjg4Djg7zjg5fjg63jgrDjg6njg6BcbiAgICogQHBhcmFtIGNhbnZhcyDmj4/nlLvjgZnjgovjgq3jg6Pjg7Pjg5Hjgrnmg4XloLFcbiAgICovXG4gIHB1YmxpYyByZW5kZXIocHJvZ3JhbUlkOiBXZWJHTFByb2dyYW0pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdGV4dHVyZSA9PSBudWxsKSB7XG4gICAgICAvLyDjg63jg7zjg4njgYzlrozkuobjgZfjgabjgYTjgarjgYRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyDliJ3lm57mj4/nlLvmmYJcbiAgICBpZiAodGhpcy5fZmlyc3REcmF3KSB7XG4gICAgICAvLyDkvZXnlarnm67jga5hdHRyaWJ1dGXlpInmlbDjgYvlj5blvpdcbiAgICAgIHRoaXMuX3Bvc2l0aW9uTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtSWQsICdwb3NpdGlvbicpO1xuICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5fcG9zaXRpb25Mb2NhdGlvbik7XG5cbiAgICAgIHRoaXMuX3V2TG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtSWQsICd1dicpO1xuICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5fdXZMb2NhdGlvbik7XG5cbiAgICAgIC8vIOS9leeVquebruOBrnVuaWZvcm3lpInmlbDjgYvlj5blvpdcbiAgICAgIHRoaXMuX3RleHR1cmVMb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtSWQsICd0ZXh0dXJlJyk7XG5cbiAgICAgIC8vIHVuaWZvcm3lsZ7mgKfjga7nmbvpjLJcbiAgICAgIGdsLnVuaWZvcm0xaSh0aGlzLl90ZXh0dXJlTG9jYXRpb24sIDApO1xuXG4gICAgICAvLyB1duODkOODg+ODleOCoeOAgeW6p+aomeWIneacn+WMllxuICAgICAge1xuICAgICAgICB0aGlzLl91dkFycmF5ID0gbmV3IEZsb2F0MzJBcnJheShbXG4gICAgICAgICAgMS4wLCAwLjAsIDAuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAxLjBcbiAgICAgICAgXSk7XG5cbiAgICAgICAgLy8gdXbjg5Djg4Pjg5XjgqHjgpLkvZzmiJBcbiAgICAgICAgdGhpcy5fdXZCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICAgIH1cblxuICAgICAgLy8g6aCC54K544OQ44OD44OV44Kh44CB5bqn5qiZ5Yid5pyf5YyWXG4gICAgICB7XG4gICAgICAgIGNvbnN0IG1heFdpZHRoID0gY2FudmFzLndpZHRoO1xuICAgICAgICBjb25zdCBtYXhIZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuXG4gICAgICAgIC8vIOmggueCueODh+ODvOOCv1xuICAgICAgICB0aGlzLl9wb3NpdGlvbkFycmF5ID0gbmV3IEZsb2F0MzJBcnJheShbXG4gICAgICAgICAgKHRoaXMuX3JlY3QucmlnaHQgLSBtYXhXaWR0aCAqIDAuNSkgLyAobWF4V2lkdGggKiAwLjUpLFxuICAgICAgICAgICh0aGlzLl9yZWN0LnVwIC0gbWF4SGVpZ2h0ICogMC41KSAvIChtYXhIZWlnaHQgKiAwLjUpLFxuICAgICAgICAgICh0aGlzLl9yZWN0LmxlZnQgLSBtYXhXaWR0aCAqIDAuNSkgLyAobWF4V2lkdGggKiAwLjUpLFxuICAgICAgICAgICh0aGlzLl9yZWN0LnVwIC0gbWF4SGVpZ2h0ICogMC41KSAvIChtYXhIZWlnaHQgKiAwLjUpLFxuICAgICAgICAgICh0aGlzLl9yZWN0LmxlZnQgLSBtYXhXaWR0aCAqIDAuNSkgLyAobWF4V2lkdGggKiAwLjUpLFxuICAgICAgICAgICh0aGlzLl9yZWN0LmRvd24gLSBtYXhIZWlnaHQgKiAwLjUpIC8gKG1heEhlaWdodCAqIDAuNSksXG4gICAgICAgICAgKHRoaXMuX3JlY3QucmlnaHQgLSBtYXhXaWR0aCAqIDAuNSkgLyAobWF4V2lkdGggKiAwLjUpLFxuICAgICAgICAgICh0aGlzLl9yZWN0LmRvd24gLSBtYXhIZWlnaHQgKiAwLjUpIC8gKG1heEhlaWdodCAqIDAuNSlcbiAgICAgICAgXSk7XG5cbiAgICAgICAgLy8g6aCC54K544OQ44OD44OV44Kh44KS5L2c5oiQXG4gICAgICAgIHRoaXMuX3ZlcnRleEJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgfVxuXG4gICAgICAvLyDpoILngrnjgqTjg7Pjg4fjg4Pjgq/jgrnjg5Djg4Pjg5XjgqHjgIHliJ3mnJ/ljJZcbiAgICAgIHtcbiAgICAgICAgLy8g44Kk44Oz44OH44OD44Kv44K544OH44O844K/XG4gICAgICAgIHRoaXMuX2luZGV4QXJyYXkgPSBuZXcgVWludDE2QXJyYXkoWzAsIDEsIDIsIDMsIDIsIDBdKTtcblxuICAgICAgICAvLyDjgqTjg7Pjg4fjg4Pjgq/jgrnjg5Djg4Pjg5XjgqHjgpLkvZzmiJBcbiAgICAgICAgdGhpcy5faW5kZXhCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZmlyc3REcmF3ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gVVbluqfmqJnnmbvpjLJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5fdXZCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLl91dkFycmF5LCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICAvLyBhdHRyaWJ1dGXlsZ7mgKfjgpLnmbvpjLJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuX3V2TG9jYXRpb24sIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cbiAgICAvLyDpoILngrnluqfmqJnjgpLnmbvpjLJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5fdmVydGV4QnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5fcG9zaXRpb25BcnJheSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgLy8gYXR0cmlidXRl5bGe5oCn44KS55m76YyyXG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLl9wb3NpdGlvbkxvY2F0aW9uLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgLy8g6aCC54K544Kk44Oz44OH44OD44Kv44K544KS5L2c5oiQXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5faW5kZXhCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuX2luZGV4QXJyYXksIGdsLkRZTkFNSUNfRFJBVyk7XG5cbiAgICAvLyDjg6Ljg4fjg6vjga7mj4/nlLtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl90ZXh0dXJlKTtcbiAgICBnbC5kcmF3RWxlbWVudHMoXG4gICAgICBnbC5UUklBTkdMRVMsXG4gICAgICB0aGlzLl9pbmRleEFycmF5Lmxlbmd0aCxcbiAgICAgIGdsLlVOU0lHTkVEX1NIT1JULFxuICAgICAgMFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICog5b2T44Gf44KK5Yik5a6aXG4gICAqIEBwYXJhbSBwb2ludFggeOW6p+aomVxuICAgKiBAcGFyYW0gcG9pbnRZIHnluqfmqJlcbiAgICovXG4gIHB1YmxpYyBpc0hpdChwb2ludFg6IG51bWJlciwgcG9pbnRZOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAvLyDnlLvpnaLjgrXjgqTjgrrjgpLlj5blvpfjgZnjgovjgIJcbiAgICBjb25zdCB7IGhlaWdodCB9ID0gY2FudmFzO1xuXG4gICAgLy8gWeW6p+aomeOBr+WkieaPm+OBmeOCi+W/heimgeOBguOCilxuICAgIGNvbnN0IHkgPSBoZWlnaHQgLSBwb2ludFk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgcG9pbnRYID49IHRoaXMuX3JlY3QubGVmdCAmJlxuICAgICAgcG9pbnRYIDw9IHRoaXMuX3JlY3QucmlnaHQgJiZcbiAgICAgIHkgPD0gdGhpcy5fcmVjdC51cCAmJlxuICAgICAgeSA+PSB0aGlzLl9yZWN0LmRvd25cbiAgICApO1xuICB9XG5cbiAgX3RleHR1cmU6IFdlYkdMVGV4dHVyZTsgLy8g44OG44Kv44K544OB44OjXG4gIF92ZXJ0ZXhCdWZmZXI6IFdlYkdMQnVmZmVyOyAvLyDpoILngrnjg5Djg4Pjg5XjgqFcbiAgX3V2QnVmZmVyOiBXZWJHTEJ1ZmZlcjsgLy8gdXbpoILngrnjg5Djg4Pjg5XjgqFcbiAgX2luZGV4QnVmZmVyOiBXZWJHTEJ1ZmZlcjsgLy8g6aCC54K544Kk44Oz44OH44OD44Kv44K544OQ44OD44OV44KhXG4gIF9yZWN0OiBSZWN0OyAvLyDnn6nlvaJcblxuICBfcG9zaXRpb25Mb2NhdGlvbjogbnVtYmVyO1xuICBfdXZMb2NhdGlvbjogbnVtYmVyO1xuICBfdGV4dHVyZUxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbjtcblxuICBfcG9zaXRpb25BcnJheTogRmxvYXQzMkFycmF5O1xuICBfdXZBcnJheTogRmxvYXQzMkFycmF5O1xuICBfaW5kZXhBcnJheTogVWludDE2QXJyYXk7XG5cbiAgX2ZpcnN0RHJhdzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFJlY3Qge1xuICBwdWJsaWMgbGVmdDogbnVtYmVyOyAvLyDlt6bovrpcbiAgcHVibGljIHJpZ2h0OiBudW1iZXI7IC8vIOWPs+i+ulxuICBwdWJsaWMgdXA6IG51bWJlcjsgLy8g5LiK6L66XG4gIHB1YmxpYyBkb3duOiBudW1iZXI7IC8vIOS4i+i+ulxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgY3NtVmVjdG9yLCBpdGVyYXRvciB9IGZyb20gJ0BmcmFtZXdvcmsvdHlwZS9jc212ZWN0b3InO1xuXG5pbXBvcnQgeyBnbCB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcblxuLyoqXG4gKiDjg4bjgq/jgrnjg4Hjg6PnrqHnkIbjgq/jg6njgrlcbiAqIOeUu+WDj+iqreOBv+i+vOOBv+OAgeeuoeeQhuOCkuihjOOBhuOCr+ODqeOCueOAglxuICovXG5leHBvcnQgY2xhc3MgTEFwcFRleHR1cmVNYW5hZ2VyIHtcbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fdGV4dHVyZXMgPSBuZXcgY3NtVmVjdG9yPFRleHR1cmVJbmZvPigpO1xuICB9XG5cbiAgLyoqXG4gICAqIOino+aUvuOBmeOCi+OAglxuICAgKi9cbiAgcHVibGljIHJlbGVhc2UoKTogdm9pZCB7XG4gICAgZm9yIChcbiAgICAgIGxldCBpdGU6IGl0ZXJhdG9yPFRleHR1cmVJbmZvPiA9IHRoaXMuX3RleHR1cmVzLmJlZ2luKCk7XG4gICAgICBpdGUubm90RXF1YWwodGhpcy5fdGV4dHVyZXMuZW5kKCkpO1xuICAgICAgaXRlLnByZUluY3JlbWVudCgpXG4gICAgKSB7XG4gICAgICBnbC5kZWxldGVUZXh0dXJlKGl0ZS5wdHIoKS5pZCk7XG4gICAgfVxuICAgIHRoaXMuX3RleHR1cmVzID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiDnlLvlg4/oqq3jgb/ovrzjgb9cbiAgICpcbiAgICogQHBhcmFtIGZpbGVOYW1lIOiqreOBv+i+vOOCgOeUu+WDj+ODleOCoeOCpOODq+ODkeOCueWQjVxuICAgKiBAcGFyYW0gdXNlUHJlbXVsdGlwbHkgUHJlbXVsdOWHpueQhuOCkuacieWKueOBq+OBmeOCi+OBi1xuICAgKiBAcmV0dXJuIOeUu+WDj+aDheWgseOAgeiqreOBv+i+vOOBv+WkseaVl+aZguOBr251bGzjgpLov5TjgZlcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVUZXh0dXJlRnJvbVBuZ0ZpbGUoXG4gICAgZmlsZU5hbWU6IHN0cmluZyxcbiAgICB1c2VQcmVtdWx0aXBseTogYm9vbGVhbixcbiAgICBjYWxsYmFjazogKHRleHR1cmVJbmZvOiBUZXh0dXJlSW5mbykgPT4gdm9pZFxuICApOiB2b2lkIHtcbiAgICAvLyBzZWFyY2ggbG9hZGVkIHRleHR1cmUgYWxyZWFkeVxuICAgIGZvciAoXG4gICAgICBsZXQgaXRlOiBpdGVyYXRvcjxUZXh0dXJlSW5mbz4gPSB0aGlzLl90ZXh0dXJlcy5iZWdpbigpO1xuICAgICAgaXRlLm5vdEVxdWFsKHRoaXMuX3RleHR1cmVzLmVuZCgpKTtcbiAgICAgIGl0ZS5wcmVJbmNyZW1lbnQoKVxuICAgICkge1xuICAgICAgaWYgKFxuICAgICAgICBpdGUucHRyKCkuZmlsZU5hbWUgPT0gZmlsZU5hbWUgJiZcbiAgICAgICAgaXRlLnB0cigpLnVzZVByZW11bHRwbHkgPT0gdXNlUHJlbXVsdGlwbHlcbiAgICAgICkge1xuICAgICAgICAvLyAy5Zue55uu5Lul6ZmN44Gv44Kt44Oj44OD44K344Ol44GM5L2/55So44GV44KM44KLKOW+heOBoeaZgumWk+OBquOBlylcbiAgICAgICAgLy8gV2ViS2l044Gn44Gv5ZCM44GYSW1hZ2Xjga5vbmxvYWTjgpLlho3luqblkbzjgbbjgavjga/lho3jgqTjg7Pjgrnjgr/jg7PjgrnjgYzlv4XopoFcbiAgICAgICAgLy8g6Kmz57Sw77yaaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzUwMjQxODFcbiAgICAgICAgaXRlLnB0cigpLmltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpdGUucHRyKCkuaW1nLm9ubG9hZCA9ICgpOiB2b2lkID0+IGNhbGxiYWNrKGl0ZS5wdHIoKSk7XG4gICAgICAgIGl0ZS5wdHIoKS5pbWcuc3JjID0gZmlsZU5hbWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDjg4fjg7zjgr/jga7jgqrjg7Pjg63jg7zjg4njgpLjg4jjg6rjgqzjg7zjgavjgZnjgotcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcub25sb2FkID0gKCk6IHZvaWQgPT4ge1xuICAgICAgLy8g44OG44Kv44K544OB44Oj44Kq44OW44K444Kn44Kv44OI44Gu5L2c5oiQXG4gICAgICBjb25zdCB0ZXg6IFdlYkdMVGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcblxuICAgICAgLy8g44OG44Kv44K544OB44Oj44KS6YG45oqeXG4gICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXgpO1xuXG4gICAgICAvLyDjg4bjgq/jgrnjg4Hjg6Pjgavjg5Tjgq/jgrvjg6vjgpLmm7jjgY3ovrzjgoBcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoXG4gICAgICAgIGdsLlRFWFRVUkVfMkQsXG4gICAgICAgIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUixcbiAgICAgICAgZ2wuTElORUFSX01JUE1BUF9MSU5FQVJcbiAgICAgICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKTtcblxuICAgICAgLy8gUHJlbXVsdOWHpueQhuOCkuihjOOCj+OBm+OCi1xuICAgICAgaWYgKHVzZVByZW11bHRpcGx5KSB7XG4gICAgICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCwgMSk7XG4gICAgICB9XG5cbiAgICAgIC8vIOODhuOCr+OCueODgeODo+OBq+ODlOOCr+OCu+ODq+OCkuabuOOBjei+vOOCgFxuICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBpbWcpO1xuXG4gICAgICAvLyDjg5/jg4Pjg5fjg57jg4Pjg5fjgpLnlJ/miJBcbiAgICAgIGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfMkQpO1xuXG4gICAgICAvLyDjg4bjgq/jgrnjg4Hjg6PjgpLjg5DjgqTjg7Pjg4lcbiAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xuXG4gICAgICBjb25zdCB0ZXh0dXJlSW5mbzogVGV4dHVyZUluZm8gPSBuZXcgVGV4dHVyZUluZm8oKTtcbiAgICAgIGlmICh0ZXh0dXJlSW5mbyAhPSBudWxsKSB7XG4gICAgICAgIHRleHR1cmVJbmZvLmZpbGVOYW1lID0gZmlsZU5hbWU7XG4gICAgICAgIHRleHR1cmVJbmZvLndpZHRoID0gaW1nLndpZHRoO1xuICAgICAgICB0ZXh0dXJlSW5mby5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgICB0ZXh0dXJlSW5mby5pZCA9IHRleDtcbiAgICAgICAgdGV4dHVyZUluZm8uaW1nID0gaW1nO1xuICAgICAgICB0ZXh0dXJlSW5mby51c2VQcmVtdWx0cGx5ID0gdXNlUHJlbXVsdGlwbHk7XG4gICAgICAgIHRoaXMuX3RleHR1cmVzLnB1c2hCYWNrKHRleHR1cmVJbmZvKTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2sodGV4dHVyZUluZm8pO1xuICAgIH07XG4gICAgaW1nLnNyYyA9IGZpbGVOYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIOeUu+WDj+OBruino+aUvlxuICAgKlxuICAgKiDphY3liJfjgavlrZjlnKjjgZnjgovnlLvlg4/lhajjgabjgpLop6PmlL7jgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyByZWxlYXNlVGV4dHVyZXMoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl90ZXh0dXJlcy5nZXRTaXplKCk7IGkrKykge1xuICAgICAgdGhpcy5fdGV4dHVyZXMuc2V0KGksIG51bGwpO1xuICAgIH1cblxuICAgIHRoaXMuX3RleHR1cmVzLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICog55S75YOP44Gu6Kej5pS+XG4gICAqXG4gICAqIOaMh+WumuOBl+OBn+ODhuOCr+OCueODgeODo+OBrueUu+WDj+OCkuino+aUvuOBmeOCi+OAglxuICAgKiBAcGFyYW0gdGV4dHVyZSDop6PmlL7jgZnjgovjg4bjgq/jgrnjg4Hjg6NcbiAgICovXG4gIHB1YmxpYyByZWxlYXNlVGV4dHVyZUJ5VGV4dHVyZSh0ZXh0dXJlOiBXZWJHTFRleHR1cmUpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3RleHR1cmVzLmdldFNpemUoKTsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5fdGV4dHVyZXMuYXQoaSkuaWQgIT0gdGV4dHVyZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fdGV4dHVyZXMuc2V0KGksIG51bGwpO1xuICAgICAgdGhpcy5fdGV4dHVyZXMucmVtb3ZlKGkpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOeUu+WDj+OBruino+aUvlxuICAgKlxuICAgKiDmjIflrprjgZfjgZ/lkI3liY3jga7nlLvlg4/jgpLop6PmlL7jgZnjgovjgIJcbiAgICogQHBhcmFtIGZpbGVOYW1lIOino+aUvuOBmeOCi+eUu+WDj+ODleOCoeOCpOODq+ODkeOCueWQjVxuICAgKi9cbiAgcHVibGljIHJlbGVhc2VUZXh0dXJlQnlGaWxlUGF0aChmaWxlTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl90ZXh0dXJlcy5nZXRTaXplKCk7IGkrKykge1xuICAgICAgaWYgKHRoaXMuX3RleHR1cmVzLmF0KGkpLmZpbGVOYW1lID09IGZpbGVOYW1lKSB7XG4gICAgICAgIHRoaXMuX3RleHR1cmVzLnNldChpLCBudWxsKTtcbiAgICAgICAgdGhpcy5fdGV4dHVyZXMucmVtb3ZlKGkpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfdGV4dHVyZXM6IGNzbVZlY3RvcjxUZXh0dXJlSW5mbz47XG59XG5cbi8qKlxuICog55S75YOP5oOF5aCx5qeL6YCg5L2TXG4gKi9cbmV4cG9ydCBjbGFzcyBUZXh0dXJlSW5mbyB7XG4gIGltZzogSFRNTEltYWdlRWxlbWVudDsgLy8g55S75YOPXG4gIGlkOiBXZWJHTFRleHR1cmUgPSBudWxsOyAvLyDjg4bjgq/jgrnjg4Hjg6NcbiAgd2lkdGggPSAwOyAvLyDmqKrluYVcbiAgaGVpZ2h0ID0gMDsgLy8g6auY44GVXG4gIHVzZVByZW11bHRwbHk6IGJvb2xlYW47IC8vIFByZW11bHTlh6bnkIbjgpLmnInlirnjgavjgZnjgovjgYtcbiAgZmlsZU5hbWU6IHN0cmluZzsgLy8g44OV44Kh44Kk44Or5ZCNXG59XG4iLCIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBDdWJpc21NYXRyaXg0NCB9IGZyb20gJ0BmcmFtZXdvcmsvbWF0aC9jdWJpc21tYXRyaXg0NCc7XG5pbXBvcnQgeyBDdWJpc21WaWV3TWF0cml4IH0gZnJvbSAnQGZyYW1ld29yay9tYXRoL2N1YmlzbXZpZXdtYXRyaXgnO1xuXG5pbXBvcnQgKiBhcyBMQXBwRGVmaW5lIGZyb20gJy4vbGFwcGRlZmluZSc7XG5pbXBvcnQgeyBjYW52YXMsIGdsLCBMQXBwRGVsZWdhdGUgfSBmcm9tICcuL2xhcHBkZWxlZ2F0ZSc7XG5pbXBvcnQgeyBMQXBwTGl2ZTJETWFuYWdlciB9IGZyb20gJy4vbGFwcGxpdmUyZG1hbmFnZXInO1xuaW1wb3J0IHsgTEFwcFBhbCB9IGZyb20gJy4vbGFwcHBhbCc7XG5pbXBvcnQgeyBMQXBwU3ByaXRlIH0gZnJvbSAnLi9sYXBwc3ByaXRlJztcbmltcG9ydCB7IFRleHR1cmVJbmZvIH0gZnJvbSAnLi9sYXBwdGV4dHVyZW1hbmFnZXInO1xuaW1wb3J0IHsgVG91Y2hNYW5hZ2VyIH0gZnJvbSAnLi90b3VjaG1hbmFnZXInO1xuXG4vKipcbiAqIOaPj+eUu+OCr+ODqeOCueOAglxuICovXG5leHBvcnQgY2xhc3MgTEFwcFZpZXcge1xuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9wcm9ncmFtSWQgPSBudWxsO1xuICAgIHRoaXMuX2JhY2sgPSBudWxsO1xuICAgIHRoaXMuX2dlYXIgPSBudWxsO1xuXG4gICAgLy8g44K/44OD44OB6Zai5L+C44Gu44Kk44OZ44Oz44OI566h55CGXG4gICAgdGhpcy5fdG91Y2hNYW5hZ2VyID0gbmV3IFRvdWNoTWFuYWdlcigpO1xuXG4gICAgLy8g44OH44OQ44Kk44K55bqn5qiZ44GL44KJ44K544Kv44Oq44O844Oz5bqn5qiZ44Gr5aSJ5o+b44GZ44KL44Gf44KB44GuXG4gICAgdGhpcy5fZGV2aWNlVG9TY3JlZW4gPSBuZXcgQ3ViaXNtTWF0cml4NDQoKTtcblxuICAgIC8vIOeUu+mdouOBruihqOekuuOBruaLoeWkp+e4ruWwj+OChOenu+WLleOBruWkieaPm+OCkuihjOOBhuihjOWIl1xuICAgIHRoaXMuX3ZpZXdNYXRyaXggPSBuZXcgQ3ViaXNtVmlld01hdHJpeCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOWIneacn+WMluOBmeOCi+OAglxuICAgKi9cbiAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBjYW52YXM7XG5cbiAgICBjb25zdCByYXRpbzogbnVtYmVyID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgY29uc3QgbGVmdDogbnVtYmVyID0gLXJhdGlvO1xuICAgIGNvbnN0IHJpZ2h0OiBudW1iZXIgPSByYXRpbztcbiAgICBjb25zdCBib3R0b206IG51bWJlciA9IExBcHBEZWZpbmUuVmlld0xvZ2ljYWxMZWZ0O1xuICAgIGNvbnN0IHRvcDogbnVtYmVyID0gTEFwcERlZmluZS5WaWV3TG9naWNhbFJpZ2h0O1xuXG4gICAgdGhpcy5fdmlld01hdHJpeC5zZXRTY3JlZW5SZWN0KGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCk7IC8vIOODh+ODkOOCpOOCueOBq+WvvuW/nOOBmeOCi+eUu+mdouOBruevhOWbsuOAgiBY44Gu5bem56uv44CBWOOBruWPs+err+OAgVnjga7kuIvnq6/jgIFZ44Gu5LiK56uvXG4gICAgdGhpcy5fdmlld01hdHJpeC5zY2FsZShMQXBwRGVmaW5lLlZpZXdTY2FsZSwgTEFwcERlZmluZS5WaWV3U2NhbGUpO1xuXG4gICAgdGhpcy5fZGV2aWNlVG9TY3JlZW4ubG9hZElkZW50aXR5KCk7XG4gICAgaWYgKHdpZHRoID4gaGVpZ2h0KSB7XG4gICAgICBjb25zdCBzY3JlZW5XOiBudW1iZXIgPSBNYXRoLmFicyhyaWdodCAtIGxlZnQpO1xuICAgICAgdGhpcy5fZGV2aWNlVG9TY3JlZW4uc2NhbGVSZWxhdGl2ZShzY3JlZW5XIC8gd2lkdGgsIC1zY3JlZW5XIC8gd2lkdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzY3JlZW5IOiBudW1iZXIgPSBNYXRoLmFicyh0b3AgLSBib3R0b20pO1xuICAgICAgdGhpcy5fZGV2aWNlVG9TY3JlZW4uc2NhbGVSZWxhdGl2ZShzY3JlZW5IIC8gaGVpZ2h0LCAtc2NyZWVuSCAvIGhlaWdodCk7XG4gICAgfVxuICAgIHRoaXMuX2RldmljZVRvU2NyZWVuLnRyYW5zbGF0ZVJlbGF0aXZlKC13aWR0aCAqIDAuNSwgLWhlaWdodCAqIDAuNSk7XG5cbiAgICAvLyDooajnpLrnr4Tlm7Ljga7oqK3lrppcbiAgICB0aGlzLl92aWV3TWF0cml4LnNldE1heFNjYWxlKExBcHBEZWZpbmUuVmlld01heFNjYWxlKTsgLy8g6ZmQ55WM5ouh5by1546HXG4gICAgdGhpcy5fdmlld01hdHJpeC5zZXRNaW5TY2FsZShMQXBwRGVmaW5lLlZpZXdNaW5TY2FsZSk7IC8vIOmZkOeVjOe4ruWwj+eOh1xuXG4gICAgLy8g6KGo56S644Gn44GN44KL5pyA5aSn56+E5ZuyXG4gICAgdGhpcy5fdmlld01hdHJpeC5zZXRNYXhTY3JlZW5SZWN0KFxuICAgICAgTEFwcERlZmluZS5WaWV3TG9naWNhbE1heExlZnQsXG4gICAgICBMQXBwRGVmaW5lLlZpZXdMb2dpY2FsTWF4UmlnaHQsXG4gICAgICBMQXBwRGVmaW5lLlZpZXdMb2dpY2FsTWF4Qm90dG9tLFxuICAgICAgTEFwcERlZmluZS5WaWV3TG9naWNhbE1heFRvcFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICog6Kej5pS+44GZ44KLXG4gICAqL1xuICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcbiAgICB0aGlzLl92aWV3TWF0cml4ID0gbnVsbDtcbiAgICB0aGlzLl90b3VjaE1hbmFnZXIgPSBudWxsO1xuICAgIHRoaXMuX2RldmljZVRvU2NyZWVuID0gbnVsbDtcblxuICAgIHRoaXMuX2dlYXIucmVsZWFzZSgpO1xuICAgIHRoaXMuX2dlYXIgPSBudWxsO1xuXG4gICAgdGhpcy5fYmFjay5yZWxlYXNlKCk7XG4gICAgdGhpcy5fYmFjayA9IG51bGw7XG5cbiAgICBnbC5kZWxldGVQcm9ncmFtKHRoaXMuX3Byb2dyYW1JZCk7XG4gICAgdGhpcy5fcHJvZ3JhbUlkID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiDmj4/nlLvjgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyByZW5kZXIoKTogdm9pZCB7XG4gICAgZ2wudXNlUHJvZ3JhbSh0aGlzLl9wcm9ncmFtSWQpO1xuXG4gICAgaWYgKHRoaXMuX2JhY2spIHtcbiAgICAgIHRoaXMuX2JhY2sucmVuZGVyKHRoaXMuX3Byb2dyYW1JZCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9nZWFyKSB7XG4gICAgICB0aGlzLl9nZWFyLnJlbmRlcih0aGlzLl9wcm9ncmFtSWQpO1xuICAgIH1cblxuICAgIGdsLmZsdXNoKCk7XG5cbiAgICBjb25zdCBsaXZlMkRNYW5hZ2VyOiBMQXBwTGl2ZTJETWFuYWdlciA9IExBcHBMaXZlMkRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG5cbiAgICBsaXZlMkRNYW5hZ2VyLnNldFZpZXdNYXRyaXgodGhpcy5fdmlld01hdHJpeCk7XG5cbiAgICBsaXZlMkRNYW5hZ2VyLm9uVXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICog55S75YOP44Gu5Yid5pyf5YyW44KS6KGM44GG44CCXG4gICAqL1xuICBwdWJsaWMgaW5pdGlhbGl6ZVNwcml0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCB3aWR0aDogbnVtYmVyID0gY2FudmFzLndpZHRoO1xuICAgIGNvbnN0IGhlaWdodDogbnVtYmVyID0gY2FudmFzLmhlaWdodDtcblxuICAgIGNvbnN0IHRleHR1cmVNYW5hZ2VyID0gTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuZ2V0VGV4dHVyZU1hbmFnZXIoKTtcbiAgICBjb25zdCByZXNvdXJjZXNQYXRoID0gTEFwcERlZmluZS5SZXNvdXJjZXNQYXRoO1xuXG4gICAgbGV0IGltYWdlTmFtZSA9ICcnO1xuXG4gICAgLy8g6IOM5pmv55S75YOP5Yid5pyf5YyWXG4gICAgaW1hZ2VOYW1lID0gTEFwcERlZmluZS5CYWNrSW1hZ2VOYW1lO1xuXG4gICAgLy8g6Z2e5ZCM5pyf44Gq44Gu44Gn44Kz44O844Or44OQ44OD44Kv6Zai5pWw44KS5L2c5oiQXG4gICAgY29uc3QgaW5pdEJhY2tHcm91bmRUZXh0dXJlID0gKHRleHR1cmVJbmZvOiBUZXh0dXJlSW5mbyk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgeDogbnVtYmVyID0gd2lkdGggKiAwLjU7XG4gICAgICBjb25zdCB5OiBudW1iZXIgPSBoZWlnaHQgKiAwLjU7XG5cbiAgICAgIGNvbnN0IGZ3aWR0aCA9IHRleHR1cmVJbmZvLndpZHRoICogMi4wO1xuICAgICAgY29uc3QgZmhlaWdodCA9IGhlaWdodCAqIDAuOTU7XG4gICAgICB0aGlzLl9iYWNrID0gbmV3IExBcHBTcHJpdGUoeCwgeSwgZndpZHRoLCBmaGVpZ2h0LCB0ZXh0dXJlSW5mby5pZCk7XG4gICAgfTtcblxuICAgIHRleHR1cmVNYW5hZ2VyLmNyZWF0ZVRleHR1cmVGcm9tUG5nRmlsZShcbiAgICAgIHJlc291cmNlc1BhdGggKyBpbWFnZU5hbWUsXG4gICAgICBmYWxzZSxcbiAgICAgIGluaXRCYWNrR3JvdW5kVGV4dHVyZVxuICAgICk7XG5cbiAgICAvLyDmra/ou4rnlLvlg4/liJ3mnJ/ljJZcbiAgICBpbWFnZU5hbWUgPSBMQXBwRGVmaW5lLkdlYXJJbWFnZU5hbWU7XG4gICAgY29uc3QgaW5pdEdlYXJUZXh0dXJlID0gKHRleHR1cmVJbmZvOiBUZXh0dXJlSW5mbyk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgeCA9IHdpZHRoIC0gdGV4dHVyZUluZm8ud2lkdGggKiAwLjU7XG4gICAgICBjb25zdCB5ID0gaGVpZ2h0IC0gdGV4dHVyZUluZm8uaGVpZ2h0ICogMC41O1xuICAgICAgY29uc3QgZndpZHRoID0gdGV4dHVyZUluZm8ud2lkdGg7XG4gICAgICBjb25zdCBmaGVpZ2h0ID0gdGV4dHVyZUluZm8uaGVpZ2h0O1xuICAgICAgdGhpcy5fZ2VhciA9IG5ldyBMQXBwU3ByaXRlKHgsIHksIGZ3aWR0aCwgZmhlaWdodCwgdGV4dHVyZUluZm8uaWQpO1xuICAgIH07XG5cbiAgICB0ZXh0dXJlTWFuYWdlci5jcmVhdGVUZXh0dXJlRnJvbVBuZ0ZpbGUoXG4gICAgICByZXNvdXJjZXNQYXRoICsgaW1hZ2VOYW1lLFxuICAgICAgZmFsc2UsXG4gICAgICBpbml0R2VhclRleHR1cmVcbiAgICApO1xuXG4gICAgLy8g44K344Kn44O844OA44O844KS5L2c5oiQXG4gICAgaWYgKHRoaXMuX3Byb2dyYW1JZCA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9wcm9ncmFtSWQgPSBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5jcmVhdGVTaGFkZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44K/44OD44OB44GV44KM44Gf5pmC44Gr5ZG844Gw44KM44KL44CCXG4gICAqXG4gICAqIEBwYXJhbSBwb2ludFgg44K544Kv44Oq44O844OzWOW6p+aomVxuICAgKiBAcGFyYW0gcG9pbnRZIOOCueOCr+ODquODvOODs1nluqfmqJlcbiAgICovXG4gIHB1YmxpYyBvblRvdWNoZXNCZWdhbihwb2ludFg6IG51bWJlciwgcG9pbnRZOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl90b3VjaE1hbmFnZXIudG91Y2hlc0JlZ2FuKHBvaW50WCwgcG9pbnRZKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgr/jg4Pjg4HjgZfjgabjgYTjgovjgajjgY3jgavjg53jgqTjg7Pjgr/jgYzli5XjgYTjgZ/jgonlkbzjgbDjgozjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIHBvaW50WCDjgrnjgq/jg6rjg7zjg7NY5bqn5qiZXG4gICAqIEBwYXJhbSBwb2ludFkg44K544Kv44Oq44O844OzWeW6p+aomVxuICAgKi9cbiAgcHVibGljIG9uVG91Y2hlc01vdmVkKHBvaW50WDogbnVtYmVyLCBwb2ludFk6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHZpZXdYOiBudW1iZXIgPSB0aGlzLnRyYW5zZm9ybVZpZXdYKHRoaXMuX3RvdWNoTWFuYWdlci5nZXRYKCkpO1xuICAgIGNvbnN0IHZpZXdZOiBudW1iZXIgPSB0aGlzLnRyYW5zZm9ybVZpZXdZKHRoaXMuX3RvdWNoTWFuYWdlci5nZXRZKCkpO1xuXG4gICAgdGhpcy5fdG91Y2hNYW5hZ2VyLnRvdWNoZXNNb3ZlZChwb2ludFgsIHBvaW50WSk7XG5cbiAgICBjb25zdCBsaXZlMkRNYW5hZ2VyOiBMQXBwTGl2ZTJETWFuYWdlciA9IExBcHBMaXZlMkRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4gICAgbGl2ZTJETWFuYWdlci5vbkRyYWcodmlld1gsIHZpZXdZKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgr/jg4Pjg4HjgYzntYLkuobjgZfjgZ/jgonlkbzjgbDjgozjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIHBvaW50WCDjgrnjgq/jg6rjg7zjg7NY5bqn5qiZXG4gICAqIEBwYXJhbSBwb2ludFkg44K544Kv44Oq44O844OzWeW6p+aomVxuICAgKi9cbiAgcHVibGljIG9uVG91Y2hlc0VuZGVkKHBvaW50WDogbnVtYmVyLCBwb2ludFk6IG51bWJlcik6IHZvaWQge1xuICAgIC8vIOOCv+ODg+ODgee1guS6hlxuICAgIGNvbnN0IGxpdmUyRE1hbmFnZXI6IExBcHBMaXZlMkRNYW5hZ2VyID0gTEFwcExpdmUyRE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICBsaXZlMkRNYW5hZ2VyLm9uRHJhZygwLjAsIDAuMCk7XG5cbiAgICB7XG4gICAgICAvLyDjgrfjg7PjgrDjg6vjgr/jg4Pjg5dcbiAgICAgIGNvbnN0IHg6IG51bWJlciA9IHRoaXMuX2RldmljZVRvU2NyZWVuLnRyYW5zZm9ybVgoXG4gICAgICAgIHRoaXMuX3RvdWNoTWFuYWdlci5nZXRYKClcbiAgICAgICk7IC8vIOirlueQhuW6p+aomeWkieaPm+OBl+OBn+W6p+aomeOCkuWPluW+l+OAglxuICAgICAgY29uc3QgeTogbnVtYmVyID0gdGhpcy5fZGV2aWNlVG9TY3JlZW4udHJhbnNmb3JtWShcbiAgICAgICAgdGhpcy5fdG91Y2hNYW5hZ2VyLmdldFkoKVxuICAgICAgKTsgLy8g6KuW55CG5bqn5qiZ5aSJ5YyW44GX44Gf5bqn5qiZ44KS5Y+W5b6X44CCXG5cbiAgICAgIGlmIChMQXBwRGVmaW5lLkRlYnVnVG91Y2hMb2dFbmFibGUpIHtcbiAgICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoYFtBUFBddG91Y2hlc0VuZGVkIHg6ICR7eH0geTogJHt5fWApO1xuICAgICAgfVxuICAgICAgbGl2ZTJETWFuYWdlci5vblRhcCh4LCB5KTtcblxuICAgICAgLy8g5q2v6LuK44Gr44K/44OD44OX44GX44Gf44GLXG4gICAgICAvLyBpZiAodGhpcy5fZ2Vhci5pc0hpdChwb2ludFgsIHBvaW50WSkpIHtcbiAgICAgIC8vICAgbGl2ZTJETWFuYWdlci5uZXh0U2NlbmUoKTtcbiAgICAgIC8vIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogWOW6p+aomeOCklZpZXfluqfmqJnjgavlpInmj5vjgZnjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIGRldmljZVgg44OH44OQ44Kk44K5WOW6p+aomVxuICAgKi9cbiAgcHVibGljIHRyYW5zZm9ybVZpZXdYKGRldmljZVg6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qgc2NyZWVuWDogbnVtYmVyID0gdGhpcy5fZGV2aWNlVG9TY3JlZW4udHJhbnNmb3JtWChkZXZpY2VYKTsgLy8g6KuW55CG5bqn5qiZ5aSJ5o+b44GX44Gf5bqn5qiZ44KS5Y+W5b6X44CCXG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdNYXRyaXguaW52ZXJ0VHJhbnNmb3JtWChzY3JlZW5YKTsgLy8g5ouh5aSn44CB57iu5bCP44CB56e75YuV5b6M44Gu5YCk44CCXG4gIH1cblxuICAvKipcbiAgICogWeW6p+aomeOCklZpZXfluqfmqJnjgavlpInmj5vjgZnjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIGRldmljZVkg44OH44OQ44Kk44K5WeW6p+aomVxuICAgKi9cbiAgcHVibGljIHRyYW5zZm9ybVZpZXdZKGRldmljZVk6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qgc2NyZWVuWTogbnVtYmVyID0gdGhpcy5fZGV2aWNlVG9TY3JlZW4udHJhbnNmb3JtWShkZXZpY2VZKTsgLy8g6KuW55CG5bqn5qiZ5aSJ5o+b44GX44Gf5bqn5qiZ44KS5Y+W5b6X44CCXG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdNYXRyaXguaW52ZXJ0VHJhbnNmb3JtWShzY3JlZW5ZKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBY5bqn5qiZ44KSU2NyZWVu5bqn5qiZ44Gr5aSJ5o+b44GZ44KL44CCXG4gICAqIEBwYXJhbSBkZXZpY2VYIOODh+ODkOOCpOOCuVjluqfmqJlcbiAgICovXG4gIHB1YmxpYyB0cmFuc2Zvcm1TY3JlZW5YKGRldmljZVg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RldmljZVRvU2NyZWVuLnRyYW5zZm9ybVgoZGV2aWNlWCk7XG4gIH1cblxuICAvKipcbiAgICogWeW6p+aomeOCklNjcmVlbuW6p+aomeOBq+WkieaPm+OBmeOCi+OAglxuICAgKlxuICAgKiBAcGFyYW0gZGV2aWNlWSDjg4fjg5DjgqTjgrlZ5bqn5qiZXG4gICAqL1xuICBwdWJsaWMgdHJhbnNmb3JtU2NyZWVuWShkZXZpY2VZOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kZXZpY2VUb1NjcmVlbi50cmFuc2Zvcm1ZKGRldmljZVkpO1xuICB9XG5cbiAgX3RvdWNoTWFuYWdlcjogVG91Y2hNYW5hZ2VyOyAvLyDjgr/jg4Pjg4Hjg57jg43jg7zjgrjjg6Pjg7xcbiAgX2RldmljZVRvU2NyZWVuOiBDdWJpc21NYXRyaXg0NDsgLy8g44OH44OQ44Kk44K544GL44KJ44K544Kv44Oq44O844Oz44G444Gu6KGM5YiXXG4gIF92aWV3TWF0cml4OiBDdWJpc21WaWV3TWF0cml4OyAvLyB2aWV3TWF0cml4XG4gIF9wcm9ncmFtSWQ6IFdlYkdMUHJvZ3JhbTsgLy8g44K344Kn44O844OASURcbiAgX2JhY2s6IExBcHBTcHJpdGU7IC8vIOiDjOaZr+eUu+WDj1xuICBfZ2VhcjogTEFwcFNwcml0ZTsgLy8g44Ku44Ki55S75YOPXG4gIF9jaGFuZ2VNb2RlbDogYm9vbGVhbjsgLy8g44Oi44OH44Or5YiH44KK5pu/44GI44OV44Op44KwXG4gIF9pc0NsaWNrOiBib29sZWFuOyAvLyDjgq/jg6rjg4Pjgq/kuK1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0KGMpIExpdmUyRCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgdGhlIExpdmUyRCBPcGVuIFNvZnR3YXJlIGxpY2Vuc2VcbiAqIHRoYXQgY2FuIGJlIGZvdW5kIGF0IGh0dHBzOi8vd3d3LmxpdmUyZC5jb20vZXVsYS9saXZlMmQtb3Blbi1zb2Z0d2FyZS1saWNlbnNlLWFncmVlbWVudF9lbi5odG1sLlxuICovXG5cblxuXG5leHBvcnQgbGV0IHNfaW5zdGFuY2U6IExBcHBXYXZGaWxlSGFuZGxlciA9IG51bGw7XG5cbmV4cG9ydCBjbGFzcyBMQXBwV2F2RmlsZUhhbmRsZXIge1xuICAvKipcbiAgICog44Kv44Op44K544Gu44Kk44Oz44K544K/44Oz44K577yI44K344Oz44Kw44Or44OI44Oz77yJ44KS6L+U44GZ44CCXG4gICAqIOOCpOODs+OCueOCv+ODs+OCueOBjOeUn+aIkOOBleOCjOOBpuOBhOOBquOBhOWgtOWQiOOBr+WGhemDqOOBp+OCpOODs+OCueOCv+ODs+OCueOCkueUn+aIkOOBmeOCi+OAglxuICAgKlxuICAgKiBAcmV0dXJuIOOCr+ODqeOCueOBruOCpOODs+OCueOCv+ODs+OCuVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBMQXBwV2F2RmlsZUhhbmRsZXIge1xuICAgIGlmIChzX2luc3RhbmNlID09IG51bGwpIHtcbiAgICAgIHNfaW5zdGFuY2UgPSBuZXcgTEFwcFdhdkZpbGVIYW5kbGVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNfaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICog44Kv44Op44K544Gu44Kk44Oz44K544K/44Oz44K577yI44K344Oz44Kw44Or44OI44Oz77yJ44KS6Kej5pS+44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlbGVhc2VJbnN0YW5jZSgpOiB2b2lkIHtcbiAgICBpZiAoc19pbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICBzX2luc3RhbmNlID0gdm9pZCAwO1xuICAgIH1cblxuICAgIHNfaW5zdGFuY2UgPSBudWxsO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkZWx0YVRpbWVTZWNvbmRzOiBudW1iZXIpIHtcbiAgICBsZXQgZ29hbE9mZnNldDogbnVtYmVyO1xuICAgIGxldCBybXM6IG51bWJlcjtcblxuICAgIC8vIOODh+ODvOOCv+ODreODvOODieWJjS/jg5XjgqHjgqTjg6vmnKvlsL7jgavpgZTjgZfjgZ/loLTlkIjjga/mm7TmlrDjgZfjgarjgYRcbiAgICBpZiAoXG4gICAgICB0aGlzLl9wY21EYXRhID09IG51bGwgfHxcbiAgICAgIHRoaXMuX3NhbXBsZU9mZnNldCA+PSB0aGlzLl93YXZGaWxlSW5mby5fc2FtcGxlc1BlckNoYW5uZWxcbiAgICApIHtcbiAgICAgIHRoaXMuX2xhc3RSbXMgPSAwLjA7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8g57WM6YGO5pmC6ZaT5b6M44Gu54q25oWL44KS5L+d5oyBXG4gICAgdGhpcy5fdXNlclRpbWVTZWNvbmRzICs9IGRlbHRhVGltZVNlY29uZHM7XG4gICAgZ29hbE9mZnNldCA9IE1hdGguZmxvb3IoXG4gICAgICB0aGlzLl91c2VyVGltZVNlY29uZHMgKiB0aGlzLl93YXZGaWxlSW5mby5fc2FtcGxpbmdSYXRlXG4gICAgKTtcbiAgICBpZiAoZ29hbE9mZnNldCA+IHRoaXMuX3dhdkZpbGVJbmZvLl9zYW1wbGVzUGVyQ2hhbm5lbCkge1xuICAgICAgZ29hbE9mZnNldCA9IHRoaXMuX3dhdkZpbGVJbmZvLl9zYW1wbGVzUGVyQ2hhbm5lbDtcbiAgICB9XG5cbiAgICAvLyBSTVPoqIjmuKxcbiAgICBybXMgPSAwLjA7XG4gICAgZm9yIChcbiAgICAgIGxldCBjaGFubmVsQ291bnQgPSAwO1xuICAgICAgY2hhbm5lbENvdW50IDwgdGhpcy5fd2F2RmlsZUluZm8uX251bWJlck9mQ2hhbm5lbHM7XG4gICAgICBjaGFubmVsQ291bnQrK1xuICAgICkge1xuICAgICAgZm9yIChcbiAgICAgICAgbGV0IHNhbXBsZUNvdW50ID0gdGhpcy5fc2FtcGxlT2Zmc2V0O1xuICAgICAgICBzYW1wbGVDb3VudCA8IGdvYWxPZmZzZXQ7XG4gICAgICAgIHNhbXBsZUNvdW50KytcbiAgICAgICkge1xuICAgICAgICBjb25zdCBwY20gPSB0aGlzLl9wY21EYXRhW2NoYW5uZWxDb3VudF1bc2FtcGxlQ291bnRdO1xuICAgICAgICBybXMgKz0gcGNtICogcGNtO1xuICAgICAgfVxuICAgIH1cbiAgICBybXMgPSBNYXRoLnNxcnQoXG4gICAgICBybXMgL1xuICAgICAgKHRoaXMuX3dhdkZpbGVJbmZvLl9udW1iZXJPZkNoYW5uZWxzICpcbiAgICAgICAgKGdvYWxPZmZzZXQgLSB0aGlzLl9zYW1wbGVPZmZzZXQpKVxuICAgICk7XG5cbiAgICB0aGlzLl9sYXN0Um1zID0gcm1zO1xuICAgIHRoaXMuX3NhbXBsZU9mZnNldCA9IGdvYWxPZmZzZXQ7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuXG4gIHB1YmxpYyBzdGFydChmaWxlUGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8g44K144Oz44OX44Or5L2N5Y+C54Wn5L2N572u44KS5Yid5pyf5YyWXG4gICAgdGhpcy5fc2FtcGxlT2Zmc2V0ID0gMDtcbiAgICB0aGlzLl91c2VyVGltZVNlY29uZHMgPSAwLjA7XG5cbiAgICAvLyBSTVPlgKTjgpLjg6rjgrvjg4Pjg4hcbiAgICB0aGlzLl9sYXN0Um1zID0gMC4wO1xuXG4gIH1cblxuICBwdWJsaWMgZ2V0Um1zKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xhc3RSbXM7XG4gIH1cblxuICBwdWJsaWMgbG9hZFdhdkZpbGUoZmlsZVBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGxldCByZXQgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9wY21EYXRhICE9IG51bGwpIHtcbiAgICAgIHRoaXMucmVsZWFzZVBjbURhdGEoKTtcbiAgICB9XG5cbiAgICAvLyDjg5XjgqHjgqTjg6vjg63jg7zjg4lcbiAgICBjb25zdCBhc3luY0ZpbGVMb2FkID0gYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIGZldGNoKGZpbGVQYXRoKS50aGVuKHJlc3BvbmNlID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbmNlLmFycmF5QnVmZmVyKCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgYXN5bmNXYXZGaWxlTWFuYWdlciA9IChhc3luYyAoKSA9PiB7XG4gICAgICB0aGlzLl9ieXRlUmVhZGVyLl9maWxlQnl0ZSA9IGF3YWl0IGFzeW5jRmlsZUxvYWQoKTtcbiAgICAgIHRoaXMuX2J5dGVSZWFkZXIuX2ZpbGVEYXRhVmlldyA9IG5ldyBEYXRhVmlldyh0aGlzLl9ieXRlUmVhZGVyLl9maWxlQnl0ZSk7XG4gICAgICB0aGlzLl9ieXRlUmVhZGVyLl9maWxlU2l6ZSA9IHRoaXMuX2J5dGVSZWFkZXIuX2ZpbGVCeXRlLmJ5dGVMZW5ndGg7XG4gICAgICB0aGlzLl9ieXRlUmVhZGVyLl9yZWFkT2Zmc2V0ID0gMDtcblxuICAgICAgLy8g44OV44Kh44Kk44Or44Ot44O844OJ44Gr5aSx5pWX44GX44Gm44GE44KL44GL44CB5YWI6aCt44Gu44K344Kw44ON44OB44OjXCJSSUZGXCLjgpLlhaXjgozjgovjgrXjgqTjgrrjgoLjgarjgYTloLTlkIjjga/lpLHmlZdcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5fYnl0ZVJlYWRlci5fZmlsZUJ5dGUgPT0gbnVsbCB8fFxuICAgICAgICB0aGlzLl9ieXRlUmVhZGVyLl9maWxlU2l6ZSA8IDRcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIOODleOCoeOCpOODq+WQjVxuICAgICAgdGhpcy5fd2F2RmlsZUluZm8uX2ZpbGVOYW1lID0gZmlsZVBhdGg7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIOOCt+OCsOODjeODgeODoyBcIlJJRkZcIlxuICAgICAgICBpZiAoIXRoaXMuX2J5dGVSZWFkZXIuZ2V0Q2hlY2tTaWduYXR1cmUoJ1JJRkYnKSkge1xuICAgICAgICAgIHJldCA9IGZhbHNlO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgU2lnbmV0dXJlIFwiUklGRlwiLicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOODleOCoeOCpOODq+OCteOCpOOCui0477yI6Kqt44G/6aOb44Gw44GX77yJXG4gICAgICAgIHRoaXMuX2J5dGVSZWFkZXIuZ2V0MzJMaXR0bGVFbmRpYW4oKTtcbiAgICAgICAgLy8g44K344Kw44ON44OB44OjIFwiV0FWRVwiXG4gICAgICAgIGlmICghdGhpcy5fYnl0ZVJlYWRlci5nZXRDaGVja1NpZ25hdHVyZSgnV0FWRScpKSB7XG4gICAgICAgICAgcmV0ID0gZmFsc2U7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBTaWduZXR1cmUgXCJXQVZFXCIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g44K344Kw44ON44OB44OjIFwiZm10IFwiXG4gICAgICAgIGlmICghdGhpcy5fYnl0ZVJlYWRlci5nZXRDaGVja1NpZ25hdHVyZSgnZm10ICcpKSB7XG4gICAgICAgICAgcmV0ID0gZmFsc2U7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBTaWduZXR1cmUgXCJmbXRcIi4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBmbXTjg4Hjg6Pjg7Pjgq/jgrXjgqTjgrpcbiAgICAgICAgY29uc3QgZm10Q2h1bmtTaXplID0gdGhpcy5fYnl0ZVJlYWRlci5nZXQzMkxpdHRsZUVuZGlhbigpO1xuICAgICAgICAvLyDjg5Xjgqnjg7zjg57jg4Pjg4hJROOBrzHvvIjjg6rjg4vjgqJQQ03vvInku6XlpJblj5fjgZHku5jjgZHjgarjgYRcbiAgICAgICAgaWYgKHRoaXMuX2J5dGVSZWFkZXIuZ2V0MTZMaXR0bGVFbmRpYW4oKSAhPSAxKSB7XG4gICAgICAgICAgcmV0ID0gZmFsc2U7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaWxlIGlzIG5vdCBsaW5lYXIgUENNLicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOODgeODo+ODs+ODjeODq+aVsFxuICAgICAgICB0aGlzLl93YXZGaWxlSW5mby5fbnVtYmVyT2ZDaGFubmVscyA9XG4gICAgICAgICAgdGhpcy5fYnl0ZVJlYWRlci5nZXQxNkxpdHRsZUVuZGlhbigpO1xuICAgICAgICAvLyDjgrXjg7Pjg5fjg6rjg7PjgrDjg6zjg7zjg4hcbiAgICAgICAgdGhpcy5fd2F2RmlsZUluZm8uX3NhbXBsaW5nUmF0ZSA9IHRoaXMuX2J5dGVSZWFkZXIuZ2V0MzJMaXR0bGVFbmRpYW4oKTtcbiAgICAgICAgLy8g44OH44O844K/6YCf5bqmW2J5dGUvc2VjXe+8iOiqreOBv+mjm+OBsOOBl++8iVxuICAgICAgICB0aGlzLl9ieXRlUmVhZGVyLmdldDMyTGl0dGxlRW5kaWFuKCk7XG4gICAgICAgIC8vIOODluODreODg+OCr+OCteOCpOOCuu+8iOiqreOBv+mjm+OBsOOBl++8iVxuICAgICAgICB0aGlzLl9ieXRlUmVhZGVyLmdldDE2TGl0dGxlRW5kaWFuKCk7XG4gICAgICAgIC8vIOmHj+WtkOWMluODk+ODg+ODiOaVsFxuICAgICAgICB0aGlzLl93YXZGaWxlSW5mby5fYml0c1BlclNhbXBsZSA9IHRoaXMuX2J5dGVSZWFkZXIuZ2V0MTZMaXR0bGVFbmRpYW4oKTtcbiAgICAgICAgLy8gZm1044OB44Oj44Oz44Kv44Gu5ouh5by16YOo5YiG44Gu6Kqt44G/6aOb44Gw44GXXG4gICAgICAgIGlmIChmbXRDaHVua1NpemUgPiAxNikge1xuICAgICAgICAgIHRoaXMuX2J5dGVSZWFkZXIuX3JlYWRPZmZzZXQgKz0gZm10Q2h1bmtTaXplIC0gMTY7XG4gICAgICAgIH1cbiAgICAgICAgLy8gXCJkYXRhXCLjg4Hjg6Pjg7Pjgq/jgYzlh7rnj77jgZnjgovjgb7jgafoqq3jgb/po5vjgbDjgZdcbiAgICAgICAgd2hpbGUgKFxuICAgICAgICAgICF0aGlzLl9ieXRlUmVhZGVyLmdldENoZWNrU2lnbmF0dXJlKCdkYXRhJykgJiZcbiAgICAgICAgICB0aGlzLl9ieXRlUmVhZGVyLl9yZWFkT2Zmc2V0IDwgdGhpcy5fYnl0ZVJlYWRlci5fZmlsZVNpemVcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5fYnl0ZVJlYWRlci5fcmVhZE9mZnNldCArPVxuICAgICAgICAgICAgdGhpcy5fYnl0ZVJlYWRlci5nZXQzMkxpdHRsZUVuZGlhbigpICsgNDtcbiAgICAgICAgfVxuICAgICAgICAvLyDjg5XjgqHjgqTjg6vlhoXjgatcImRhdGFcIuODgeODo+ODs+OCr+OBjOWHuuePvuOBl+OBquOBi+OBo+OBn1xuICAgICAgICBpZiAodGhpcy5fYnl0ZVJlYWRlci5fcmVhZE9mZnNldCA+PSB0aGlzLl9ieXRlUmVhZGVyLl9maWxlU2l6ZSkge1xuICAgICAgICAgIHJldCA9IGZhbHNlO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgXCJkYXRhXCIgQ2h1bmsuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g44K144Oz44OX44Or5pWwXG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBkYXRhQ2h1bmtTaXplID0gdGhpcy5fYnl0ZVJlYWRlci5nZXQzMkxpdHRsZUVuZGlhbigpO1xuICAgICAgICAgIHRoaXMuX3dhdkZpbGVJbmZvLl9zYW1wbGVzUGVyQ2hhbm5lbCA9XG4gICAgICAgICAgICAoZGF0YUNodW5rU2l6ZSAqIDgpIC9cbiAgICAgICAgICAgICh0aGlzLl93YXZGaWxlSW5mby5fYml0c1BlclNhbXBsZSAqXG4gICAgICAgICAgICAgIHRoaXMuX3dhdkZpbGVJbmZvLl9udW1iZXJPZkNoYW5uZWxzKTtcbiAgICAgICAgfVxuICAgICAgICAvLyDpoJjln5/norrkv51cbiAgICAgICAgdGhpcy5fcGNtRGF0YSA9IG5ldyBBcnJheSh0aGlzLl93YXZGaWxlSW5mby5fbnVtYmVyT2ZDaGFubmVscyk7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGNoYW5uZWxDb3VudCA9IDA7XG4gICAgICAgICAgY2hhbm5lbENvdW50IDwgdGhpcy5fd2F2RmlsZUluZm8uX251bWJlck9mQ2hhbm5lbHM7XG4gICAgICAgICAgY2hhbm5lbENvdW50KytcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5fcGNtRGF0YVtjaGFubmVsQ291bnRdID0gbmV3IEZsb2F0MzJBcnJheShcbiAgICAgICAgICAgIHRoaXMuX3dhdkZpbGVJbmZvLl9zYW1wbGVzUGVyQ2hhbm5lbFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5rOi5b2i44OH44O844K/5Y+W5b6XXG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IHNhbXBsZUNvdW50ID0gMDtcbiAgICAgICAgICBzYW1wbGVDb3VudCA8IHRoaXMuX3dhdkZpbGVJbmZvLl9zYW1wbGVzUGVyQ2hhbm5lbDtcbiAgICAgICAgICBzYW1wbGVDb3VudCsrXG4gICAgICAgICkge1xuICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgY2hhbm5lbENvdW50ID0gMDtcbiAgICAgICAgICAgIGNoYW5uZWxDb3VudCA8IHRoaXMuX3dhdkZpbGVJbmZvLl9udW1iZXJPZkNoYW5uZWxzO1xuICAgICAgICAgICAgY2hhbm5lbENvdW50KytcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuX3BjbURhdGFbY2hhbm5lbENvdW50XVtzYW1wbGVDb3VudF0gPSB0aGlzLmdldFBjbVNhbXBsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldCA9IHRydWU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgcHVibGljIGdldFBjbVNhbXBsZSgpOiBudW1iZXIge1xuICAgIGxldCBwY20zMjtcblxuICAgIC8vIDMy44OT44OD44OI5bmF44Gr5ouh5by144GX44Gm44GL44KJLTHvvZ4x44Gu56+E5Zuy44Gr5Li444KB44KLXG4gICAgc3dpdGNoICh0aGlzLl93YXZGaWxlSW5mby5fYml0c1BlclNhbXBsZSkge1xuICAgICAgY2FzZSA4OlxuICAgICAgICBwY20zMiA9IHRoaXMuX2J5dGVSZWFkZXIuZ2V0OCgpIC0gMTI4O1xuICAgICAgICBwY20zMiA8PD0gMjQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxNjpcbiAgICAgICAgcGNtMzIgPSB0aGlzLl9ieXRlUmVhZGVyLmdldDE2TGl0dGxlRW5kaWFuKCkgPDwgMTY7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyNDpcbiAgICAgICAgcGNtMzIgPSB0aGlzLl9ieXRlUmVhZGVyLmdldDI0TGl0dGxlRW5kaWFuKCkgPDwgODtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyDlr77lv5zjgZfjgabjgYTjgarjgYTjg5Pjg4Pjg4jluYVcbiAgICAgICAgcGNtMzIgPSAwO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gcGNtMzIgLyAyMTQ3NDgzNjQ3OyAvL051bWJlci5NQVhfVkFMVUU7XG4gIH1cblxuICBwdWJsaWMgcmVsZWFzZVBjbURhdGEoKTogdm9pZCB7XG4gICAgZm9yIChcbiAgICAgIGxldCBjaGFubmVsQ291bnQgPSAwO1xuICAgICAgY2hhbm5lbENvdW50IDwgdGhpcy5fd2F2RmlsZUluZm8uX251bWJlck9mQ2hhbm5lbHM7XG4gICAgICBjaGFubmVsQ291bnQrK1xuICAgICkge1xuICAgICAgZGVsZXRlIHRoaXMuX3BjbURhdGFbY2hhbm5lbENvdW50XTtcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMuX3BjbURhdGE7XG4gICAgdGhpcy5fcGNtRGF0YSA9IG51bGw7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9wY21EYXRhID0gbnVsbDtcbiAgICB0aGlzLl91c2VyVGltZVNlY29uZHMgPSAwLjA7XG4gICAgdGhpcy5fbGFzdFJtcyA9IDAuMDtcbiAgICB0aGlzLl9zYW1wbGVPZmZzZXQgPSAwLjA7XG4gICAgdGhpcy5fd2F2RmlsZUluZm8gPSBuZXcgV2F2RmlsZUluZm8oKTtcbiAgICB0aGlzLl9ieXRlUmVhZGVyID0gbmV3IEJ5dGVSZWFkZXIoKTtcbiAgfVxuXG4gIF9wY21EYXRhOiBBcnJheTxGbG9hdDMyQXJyYXk+O1xuICBfdXNlclRpbWVTZWNvbmRzOiBudW1iZXI7XG4gIF9sYXN0Um1zOiBudW1iZXI7XG4gIF9zYW1wbGVPZmZzZXQ6IG51bWJlcjtcbiAgX3dhdkZpbGVJbmZvOiBXYXZGaWxlSW5mbztcbiAgX2J5dGVSZWFkZXI6IEJ5dGVSZWFkZXI7XG4gIF9sb2FkRmlsZXRvQnl0ZXMgPSAoYXJyYXlCdWZmZXI6IEFycmF5QnVmZmVyLCBsZW5ndGg6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2J5dGVSZWFkZXIuX2ZpbGVCeXRlID0gYXJyYXlCdWZmZXI7XG4gICAgdGhpcy5fYnl0ZVJlYWRlci5fZmlsZURhdGFWaWV3ID0gbmV3IERhdGFWaWV3KHRoaXMuX2J5dGVSZWFkZXIuX2ZpbGVCeXRlKTtcbiAgICB0aGlzLl9ieXRlUmVhZGVyLl9maWxlU2l6ZSA9IGxlbmd0aDtcbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFdhdkZpbGVJbmZvIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fZmlsZU5hbWUgPSAnJztcbiAgICB0aGlzLl9udW1iZXJPZkNoYW5uZWxzID0gMDtcbiAgICB0aGlzLl9iaXRzUGVyU2FtcGxlID0gMDtcbiAgICB0aGlzLl9zYW1wbGluZ1JhdGUgPSAwO1xuICAgIHRoaXMuX3NhbXBsZXNQZXJDaGFubmVsID0gMDtcbiAgfVxuXG4gIF9maWxlTmFtZTogc3RyaW5nOyAvLy88IOODleOCoeOCpOODq+WQjVxuICBfbnVtYmVyT2ZDaGFubmVsczogbnVtYmVyOyAvLy88IOODgeODo+ODs+ODjeODq+aVsFxuICBfYml0c1BlclNhbXBsZTogbnVtYmVyOyAvLy88IOOCteODs+ODl+ODq+OBguOBn+OCiuODk+ODg+ODiOaVsFxuICBfc2FtcGxpbmdSYXRlOiBudW1iZXI7IC8vLzwg44K144Oz44OX44Oq44Oz44Kw44Os44O844OIXG4gIF9zYW1wbGVzUGVyQ2hhbm5lbDogbnVtYmVyOyAvLy88IDHjg4Hjg6Pjg7Pjg43jg6vjgYLjgZ/jgornt4/jgrXjg7Pjg5fjg6vmlbBcbn1cblxuZXhwb3J0IGNsYXNzIEJ5dGVSZWFkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9maWxlQnl0ZSA9IG51bGw7XG4gICAgdGhpcy5fZmlsZURhdGFWaWV3ID0gbnVsbDtcbiAgICB0aGlzLl9maWxlU2l6ZSA9IDA7XG4gICAgdGhpcy5fcmVhZE9mZnNldCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogQGJyaWVmIDjjg5Pjg4Pjg4joqq3jgb/ovrzjgb9cbiAgICogQHJldHVybiBDc206OmNzbVVpbnQ4IOiqreOBv+WPluOBo+OBnzjjg5Pjg4Pjg4jlgKRcbiAgICovXG4gIHB1YmxpYyBnZXQ4KCk6IG51bWJlciB7XG4gICAgY29uc3QgcmV0ID0gdGhpcy5fZmlsZURhdGFWaWV3LmdldFVpbnQ4KHRoaXMuX3JlYWRPZmZzZXQpO1xuICAgIHRoaXMuX3JlYWRPZmZzZXQrKztcbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBicmllZiAxNuODk+ODg+ODiOiqreOBv+i+vOOBv++8iOODquODiOODq+OCqOODs+ODh+OCo+OCouODs++8iVxuICAgKiBAcmV0dXJuIENzbTo6Y3NtVWludDE2IOiqreOBv+WPluOBo+OBnzE244OT44OD44OI5YCkXG4gICAqL1xuICBwdWJsaWMgZ2V0MTZMaXR0bGVFbmRpYW4oKTogbnVtYmVyIHtcbiAgICBjb25zdCByZXQgPVxuICAgICAgKHRoaXMuX2ZpbGVEYXRhVmlldy5nZXRVaW50OCh0aGlzLl9yZWFkT2Zmc2V0ICsgMSkgPDwgOCkgfFxuICAgICAgdGhpcy5fZmlsZURhdGFWaWV3LmdldFVpbnQ4KHRoaXMuX3JlYWRPZmZzZXQpO1xuICAgIHRoaXMuX3JlYWRPZmZzZXQgKz0gMjtcbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBicmllZiAyNOODk+ODg+ODiOiqreOBv+i+vOOBv++8iOODquODiOODq+OCqOODs+ODh+OCo+OCouODs++8iVxuICAgKiBAcmV0dXJuIENzbTo6Y3NtVWludDMyIOiqreOBv+WPluOBo+OBnzI044OT44OD44OI5YCk77yI5LiL5L2NMjTjg5Pjg4Pjg4jjgavoqK3lrprvvIlcbiAgICovXG4gIHB1YmxpYyBnZXQyNExpdHRsZUVuZGlhbigpOiBudW1iZXIge1xuICAgIGNvbnN0IHJldCA9XG4gICAgICAodGhpcy5fZmlsZURhdGFWaWV3LmdldFVpbnQ4KHRoaXMuX3JlYWRPZmZzZXQgKyAyKSA8PCAxNikgfFxuICAgICAgKHRoaXMuX2ZpbGVEYXRhVmlldy5nZXRVaW50OCh0aGlzLl9yZWFkT2Zmc2V0ICsgMSkgPDwgOCkgfFxuICAgICAgdGhpcy5fZmlsZURhdGFWaWV3LmdldFVpbnQ4KHRoaXMuX3JlYWRPZmZzZXQpO1xuICAgIHRoaXMuX3JlYWRPZmZzZXQgKz0gMztcbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBicmllZiAzMuODk+ODg+ODiOiqreOBv+i+vOOBv++8iOODquODiOODq+OCqOODs+ODh+OCo+OCouODs++8iVxuICAgKiBAcmV0dXJuIENzbTo6Y3NtVWludDMyIOiqreOBv+WPluOBo+OBnzMy44OT44OD44OI5YCkXG4gICAqL1xuICBwdWJsaWMgZ2V0MzJMaXR0bGVFbmRpYW4oKTogbnVtYmVyIHtcbiAgICBjb25zdCByZXQgPVxuICAgICAgKHRoaXMuX2ZpbGVEYXRhVmlldy5nZXRVaW50OCh0aGlzLl9yZWFkT2Zmc2V0ICsgMykgPDwgMjQpIHxcbiAgICAgICh0aGlzLl9maWxlRGF0YVZpZXcuZ2V0VWludDgodGhpcy5fcmVhZE9mZnNldCArIDIpIDw8IDE2KSB8XG4gICAgICAodGhpcy5fZmlsZURhdGFWaWV3LmdldFVpbnQ4KHRoaXMuX3JlYWRPZmZzZXQgKyAxKSA8PCA4KSB8XG4gICAgICB0aGlzLl9maWxlRGF0YVZpZXcuZ2V0VWludDgodGhpcy5fcmVhZE9mZnNldCk7XG4gICAgdGhpcy5fcmVhZE9mZnNldCArPSA0O1xuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvKipcbiAgICogQGJyaWVmIOOCt+OCsOODjeODgeODo+OBruWPluW+l+OBqOWPgueFp+aWh+Wtl+WIl+OBqOOBruS4gOiHtOODgeOCp+ODg+OCr1xuICAgKiBAcGFyYW1baW5dIHJlZmVyZW5jZSDmpJzmn7vlr77osaHjga7jgrfjgrDjg43jg4Hjg6PmloflrZfliJdcbiAgICogQHJldHZhbCAgdHJ1ZSAgICDkuIDoh7TjgZfjgabjgYTjgotcbiAgICogQHJldHZhbCAgZmFsc2UgICDkuIDoh7TjgZfjgabjgYTjgarjgYRcbiAgICovXG4gIHB1YmxpYyBnZXRDaGVja1NpZ25hdHVyZShyZWZlcmVuY2U6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGdldFNpZ25hdHVyZTogVWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KDQpO1xuICAgIGNvbnN0IHJlZmVyZW5jZVN0cmluZzogVWludDhBcnJheSA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShyZWZlcmVuY2UpO1xuICAgIGlmIChyZWZlcmVuY2UubGVuZ3RoICE9IDQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChsZXQgc2lnbmF0dXJlT2Zmc2V0ID0gMDsgc2lnbmF0dXJlT2Zmc2V0IDwgNDsgc2lnbmF0dXJlT2Zmc2V0KyspIHtcbiAgICAgIGdldFNpZ25hdHVyZVtzaWduYXR1cmVPZmZzZXRdID0gdGhpcy5nZXQ4KCk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICBnZXRTaWduYXR1cmVbMF0gPT0gcmVmZXJlbmNlU3RyaW5nWzBdICYmXG4gICAgICBnZXRTaWduYXR1cmVbMV0gPT0gcmVmZXJlbmNlU3RyaW5nWzFdICYmXG4gICAgICBnZXRTaWduYXR1cmVbMl0gPT0gcmVmZXJlbmNlU3RyaW5nWzJdICYmXG4gICAgICBnZXRTaWduYXR1cmVbM10gPT0gcmVmZXJlbmNlU3RyaW5nWzNdXG4gICAgKTtcbiAgfVxuXG4gIF9maWxlQnl0ZTogQXJyYXlCdWZmZXI7IC8vLzwg44Ot44O844OJ44GX44Gf44OV44Kh44Kk44Or44Gu44OQ44Kk44OI5YiXXG4gIF9maWxlRGF0YVZpZXc6IERhdGFWaWV3O1xuICBfZmlsZVNpemU6IG51bWJlcjsgLy8vPCDjg5XjgqHjgqTjg6vjgrXjgqTjgrpcbiAgX3JlYWRPZmZzZXQ6IG51bWJlcjsgLy8vPCDjg5XjgqHjgqTjg6vlj4LnhafkvY3nva5cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0KGMpIExpdmUyRCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgdGhlIExpdmUyRCBPcGVuIFNvZnR3YXJlIGxpY2Vuc2VcbiAqIHRoYXQgY2FuIGJlIGZvdW5kIGF0IGh0dHBzOi8vd3d3LmxpdmUyZC5jb20vZXVsYS9saXZlMmQtb3Blbi1zb2Z0d2FyZS1saWNlbnNlLWFncmVlbWVudF9lbi5odG1sLlxuICovXG5cbmltcG9ydCB7IExBcHBEZWxlZ2F0ZSB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcbmltcG9ydCAqIGFzIExBcHBEZWZpbmUgZnJvbSAnLi9sYXBwZGVmaW5lJztcblxuLyoqXG4gKiDjg5bjg6njgqbjgrbjg63jg7zjg4nlvozjga7lh6bnkIZcbiAqL1xud2luZG93Lm9ubG9hZCA9ICgpOiB2b2lkID0+IHtcbiAgLy8gY3JlYXRlIHRoZSBhcHBsaWNhdGlvbiBpbnN0YW5jZVxuICBpZiAoTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuaW5pdGlhbGl6ZSgpID09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkucnVuKCk7XG59O1xuXG4vKipcbiAqIOe1guS6huaZguOBruWHpueQhlxuICovXG53aW5kb3cub25iZWZvcmV1bmxvYWQgPSAoKTogdm9pZCA9PiBMQXBwRGVsZWdhdGUucmVsZWFzZUluc3RhbmNlKCk7XG5cbi8qKlxuICogUHJvY2VzcyB3aGVuIGNoYW5naW5nIHNjcmVlbiBzaXplLlxuICovXG53aW5kb3cub25yZXNpemUgPSAoKSA9PiB7XG4gIGlmIChMQXBwRGVmaW5lLkNhbnZhc1NpemUgPT09ICdhdXRvJykge1xuICAgIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLm9uUmVzaXplKCk7XG4gIH1cbn07XG5cbih3aW5kb3cgYXMgYW55KS5zdGFydFZvaWNlQ29udmVyc2F0aW9uID0gKGxhbmd1YWdlOiBzdHJpbmcsIGRhdGE6IEJsb2IpID0+IHtcbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuc3RhcnRWb2ljZUNvbnZlcnNhdGlvbihsYW5ndWFnZSwgZGF0YSk7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuZXhwb3J0IGNsYXNzIFRvdWNoTWFuYWdlciB7XG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3N0YXJ0WCA9IDAuMDtcbiAgICB0aGlzLl9zdGFydFkgPSAwLjA7XG4gICAgdGhpcy5fbGFzdFggPSAwLjA7XG4gICAgdGhpcy5fbGFzdFkgPSAwLjA7XG4gICAgdGhpcy5fbGFzdFgxID0gMC4wO1xuICAgIHRoaXMuX2xhc3RZMSA9IDAuMDtcbiAgICB0aGlzLl9sYXN0WDIgPSAwLjA7XG4gICAgdGhpcy5fbGFzdFkyID0gMC4wO1xuICAgIHRoaXMuX2xhc3RUb3VjaERpc3RhbmNlID0gMC4wO1xuICAgIHRoaXMuX2RlbHRhWCA9IDAuMDtcbiAgICB0aGlzLl9kZWx0YVkgPSAwLjA7XG4gICAgdGhpcy5fc2NhbGUgPSAxLjA7XG4gICAgdGhpcy5fdG91Y2hTaW5nbGUgPSBmYWxzZTtcbiAgICB0aGlzLl9mbGlwQXZhaWxhYmxlID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2VudGVyWCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9sYXN0WDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDZW50ZXJZKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xhc3RZO1xuICB9XG5cbiAgcHVibGljIGdldERlbHRhWCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kZWx0YVg7XG4gIH1cblxuICBwdWJsaWMgZ2V0RGVsdGFZKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbHRhWTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTdGFydFgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhcnRYO1xuICB9XG5cbiAgcHVibGljIGdldFN0YXJ0WSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zdGFydFk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U2NhbGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2NhbGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0WCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9sYXN0WDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRZKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xhc3RZO1xuICB9XG5cbiAgcHVibGljIGdldFgxKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xhc3RYMTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRZMSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9sYXN0WTE7XG4gIH1cblxuICBwdWJsaWMgZ2V0WDIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbGFzdFgyO1xuICB9XG5cbiAgcHVibGljIGdldFkyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xhc3RZMjtcbiAgfVxuXG4gIHB1YmxpYyBpc1NpbmdsZVRvdWNoKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl90b3VjaFNpbmdsZTtcbiAgfVxuXG4gIHB1YmxpYyBpc0ZsaWNrQXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9mbGlwQXZhaWxhYmxlO1xuICB9XG5cbiAgcHVibGljIGRpc2FibGVGbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLl9mbGlwQXZhaWxhYmxlID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICog44K/44OD44OB6ZaL5aeL5pmC44Kk44OZ44Oz44OIXG4gICAqIEBwYXJhbSBkZXZpY2VYIOOCv+ODg+ODgeOBl+OBn+eUu+mdouOBrnjjga7lgKRcbiAgICogQHBhcmFtIGRldmljZVkg44K/44OD44OB44GX44Gf55S76Z2i44GueeOBruWApFxuICAgKi9cbiAgcHVibGljIHRvdWNoZXNCZWdhbihkZXZpY2VYOiBudW1iZXIsIGRldmljZVk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2xhc3RYID0gZGV2aWNlWDtcbiAgICB0aGlzLl9sYXN0WSA9IGRldmljZVk7XG4gICAgdGhpcy5fc3RhcnRYID0gZGV2aWNlWDtcbiAgICB0aGlzLl9zdGFydFkgPSBkZXZpY2VZO1xuICAgIHRoaXMuX2xhc3RUb3VjaERpc3RhbmNlID0gLTEuMDtcbiAgICB0aGlzLl9mbGlwQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICB0aGlzLl90b3VjaFNpbmdsZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICog44OJ44Op44OD44Kw5pmC44Gu44Kk44OZ44Oz44OIXG4gICAqIEBwYXJhbSBkZXZpY2VYIOOCv+ODg+ODgeOBl+OBn+eUu+mdouOBrnjjga7lgKRcbiAgICogQHBhcmFtIGRldmljZVkg44K/44OD44OB44GX44Gf55S76Z2i44GueeOBruWApFxuICAgKi9cbiAgcHVibGljIHRvdWNoZXNNb3ZlZChkZXZpY2VYOiBudW1iZXIsIGRldmljZVk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2xhc3RYID0gZGV2aWNlWDtcbiAgICB0aGlzLl9sYXN0WSA9IGRldmljZVk7XG4gICAgdGhpcy5fbGFzdFRvdWNoRGlzdGFuY2UgPSAtMS4wO1xuICAgIHRoaXMuX3RvdWNoU2luZ2xlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg5Xjg6rjg4Pjgq/jga7ot53pm6LmuKzlrppcbiAgICogQHJldHVybiDjg5Xjg6rjg4Pjgq/ot53pm6JcbiAgICovXG4gIHB1YmxpYyBnZXRGbGlja0Rpc3RhbmNlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRlRGlzdGFuY2UoXG4gICAgICB0aGlzLl9zdGFydFgsXG4gICAgICB0aGlzLl9zdGFydFksXG4gICAgICB0aGlzLl9sYXN0WCxcbiAgICAgIHRoaXMuX2xhc3RZXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDngrnvvJHjgYvjgonngrnvvJLjgbjjga7ot53pm6LjgpLmsYLjgoHjgotcbiAgICpcbiAgICogQHBhcmFtIHgxIO+8keOBpOebruOBruOCv+ODg+ODgeOBl+OBn+eUu+mdouOBrnjjga7lgKRcbiAgICogQHBhcmFtIHkxIO+8keOBpOebruOBruOCv+ODg+ODgeOBl+OBn+eUu+mdouOBrnnjga7lgKRcbiAgICogQHBhcmFtIHgyIO+8kuOBpOebruOBruOCv+ODg+ODgeOBl+OBn+eUu+mdouOBrnjjga7lgKRcbiAgICogQHBhcmFtIHkyIO+8kuOBpOebruOBruOCv+ODg+ODgeOBl+OBn+eUu+mdouOBrnnjga7lgKRcbiAgICovXG4gIHB1YmxpYyBjYWxjdWxhdGVEaXN0YW5jZShcbiAgICB4MTogbnVtYmVyLFxuICAgIHkxOiBudW1iZXIsXG4gICAgeDI6IG51bWJlcixcbiAgICB5MjogbnVtYmVyXG4gICk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguc3FydCgoeDEgLSB4MikgKiAoeDEgLSB4MikgKyAoeTEgLSB5MikgKiAoeTEgLSB5MikpO1xuICB9XG5cbiAgLyoqXG4gICAqIO+8kuOBpOebruOBruWApOOBi+OCieOAgeenu+WLlemHj+OCkuaxguOCgeOCi+OAglxuICAgKiDpgZXjgYbmlrnlkJHjga7loLTlkIjjga/np7vli5Xph4/vvJDjgILlkIzjgZjmlrnlkJHjga7loLTlkIjjga/jgIHntbblr77lgKTjgYzlsI/jgZXjgYTmlrnjga7lgKTjgpLlj4LnhafjgZnjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIHYxIO+8keOBpOebruOBruenu+WLlemHj1xuICAgKiBAcGFyYW0gdjIg77yS44Gk55uu44Gu56e75YuV6YePXG4gICAqXG4gICAqIEByZXR1cm4g5bCP44GV44GE5pa544Gu56e75YuV6YePXG4gICAqL1xuICBwdWJsaWMgY2FsY3VsYXRlTW92aW5nQW1vdW50KHYxOiBudW1iZXIsIHYyOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh2MSA+IDAuMCAhPSB2MiA+IDAuMCkge1xuICAgICAgcmV0dXJuIDAuMDtcbiAgICB9XG5cbiAgICBjb25zdCBzaWduOiBudW1iZXIgPSB2MSA+IDAuMCA/IDEuMCA6IC0xLjA7XG4gICAgY29uc3QgYWJzb2x1dGVWYWx1ZTEgPSBNYXRoLmFicyh2MSk7XG4gICAgY29uc3QgYWJzb2x1dGVWYWx1ZTIgPSBNYXRoLmFicyh2Mik7XG4gICAgcmV0dXJuIChcbiAgICAgIHNpZ24gKiAoYWJzb2x1dGVWYWx1ZTEgPCBhYnNvbHV0ZVZhbHVlMiA/IGFic29sdXRlVmFsdWUxIDogYWJzb2x1dGVWYWx1ZTIpXG4gICAgKTtcbiAgfVxuXG4gIF9zdGFydFk6IG51bWJlcjsgLy8g44K/44OD44OB44KS6ZaL5aeL44GX44Gf5pmC44GueOOBruWApFxuICBfc3RhcnRYOiBudW1iZXI7IC8vIOOCv+ODg+ODgeOCkumWi+Wni+OBl+OBn+aZguOBrnnjga7lgKRcbiAgX2xhc3RYOiBudW1iZXI7IC8vIOOCt+ODs+OCsOODq+OCv+ODg+ODgeaZguOBrnjjga7lgKRcbiAgX2xhc3RZOiBudW1iZXI7IC8vIOOCt+ODs+OCsOODq+OCv+ODg+ODgeaZguOBrnnjga7lgKRcbiAgX2xhc3RYMTogbnVtYmVyOyAvLyDjg4Djg5bjg6vjgr/jg4Pjg4HmmYLjga7kuIDjgaTnm67jga5444Gu5YCkXG4gIF9sYXN0WTE6IG51bWJlcjsgLy8g44OA44OW44Or44K/44OD44OB5pmC44Gu5LiA44Gk55uu44GueeOBruWApFxuICBfbGFzdFgyOiBudW1iZXI7IC8vIOODgOODluODq+OCv+ODg+ODgeaZguOBruS6jOOBpOebruOBrnjjga7lgKRcbiAgX2xhc3RZMjogbnVtYmVyOyAvLyDjg4Djg5bjg6vjgr/jg4Pjg4HmmYLjga7kuozjgaTnm67jga5544Gu5YCkXG4gIF9sYXN0VG91Y2hEaXN0YW5jZTogbnVtYmVyOyAvLyAy5pys5Lul5LiK44Gn44K/44OD44OB44GX44Gf44Go44GN44Gu5oyH44Gu6Led6ZuiXG4gIF9kZWx0YVg6IG51bWJlcjsgLy8g5YmN5Zue44Gu5YCk44GL44KJ5LuK5Zue44Gu5YCk44G444GueOOBruenu+WLlei3nembouOAglxuICBfZGVsdGFZOiBudW1iZXI7IC8vIOWJjeWbnuOBruWApOOBi+OCieS7iuWbnuOBruWApOOBuOOBrnnjga7np7vli5Xot53pm6LjgIJcbiAgX3NjYWxlOiBudW1iZXI7IC8vIOOBk+OBruODleODrOODvOODoOOBp+aOm+OBkeWQiOOCj+OBm+OCi+aLoeWkp+eOh+OAguaLoeWkp+aTjeS9nOS4reS7peWkluOBrzHjgIJcbiAgX3RvdWNoU2luZ2xlOiBib29sZWFuOyAvLyDjgrfjg7PjgrDjg6vjgr/jg4Pjg4HmmYLjga90cnVlXG4gIF9mbGlwQXZhaWxhYmxlOiBib29sZWFuOyAvLyDjg5Xjg6rjg4Pjg5fjgYzmnInlirnjgYvjganjgYbjgYtcbn1cbiIsImNvbnN0IGdldFdhdmVCbG9iID0gcmVxdWlyZShcIi4vd2F2QmxvYlV0aWxcIik7XHJcbmNvbnN0IGRvd25sb2FkV2F2ID0gcmVxdWlyZShcIi4vZG93bmxvYWRVdGlsXCIpO1xyXG5cclxuLyoqIENsYXNzIFJlcHJlc2VudGluZyBhIFdhdlJlY29yZGVyICovXHJcbmNsYXNzIFdhdlJlY29yZGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtNZWRpYVJlY29yZGVyfSBtZWRpYVJlY29yZGVyIC0gTWVkaWFSZWNvcmRlciBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBtZWRpYVJlY29yZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtNZWRpYVN0cmVhbX0gLSBzdHJlYW0gVXNlcidzIE1lZGlhU3RyZWFtXHJcbiAgICAgKi9cclxuICAgIHN0cmVhbTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7QmxvYn0gX19kYXRhIC0gUmVjb3JkZWQgV0VCTSBkYXRhXHJcbiAgICAgKi9cclxuICAgIF9fZGF0YTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjY2VzcyB1c2VyIG1lZGlhIGZyb20gdGhlIGF1ZGlvIGlucHV0LCB3aWxsIGJlIGFza2luZyBhdWRpbyBwZXJtaXNzaW9uIGlmIG5vdCBhdmFpbGFibGUgYWxyZWFkeVxyXG4gICAgICogQHBhcmFtIHtNZWRpYVRyYWNrQ29uc3RyYWludHN9IGNvbnN0cmFpbnRzIC0gTWVkaWFUcmFja0NvbnN0cmFpbnRzIHRvIGJlIGFwcGxpZWQsIGlmIGFueSBkZWZhdWx0cyA9IHsgYXVkaW86IHRydWUsIHZpZGVvOiBmYWxzZSB9XHJcbiAgICAgKiBAcmV0dXJuIC0gR290IFVzZXIgTWVkaWFTdHJlYW0gb3Igbm90XHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHN0YXJ0KGNvbnN0cmFpbnRzID0geyBhdWRpbzogdHJ1ZSwgdmlkZW86IGZhbHNlIH0pIHtcclxuICAgICAgICBpZiAodGhpcy5tZWRpYVJlY29yZGVyPy5zdGF0ZSA9PT0gXCJyZWNvcmRpbmdcIikgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIGNvbnN0IG1lZGlhVHJhY2tDb25zdHJhaW50cyA9IGNvbnN0cmFpbnRzIHx8IHsgYXVkaW86IHRydWUsIHZpZGVvOiBmYWxzZSB9O1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLnN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKG1lZGlhVHJhY2tDb25zdHJhaW50cyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIgPSBuZXcgTWVkaWFSZWNvcmRlcih0aGlzLnN0cmVhbSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIub25kYXRhYXZhaWxhYmxlID0gKGUpID0+IHRoaXMuX19kYXRhID0gZS5kYXRhO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWVkaWFSZWNvcmRlcj8uc3RhcnQoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3AgcmVjb3JkaW5nIHRoZSBhdWRpb1xyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHN0b3AoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWVkaWFSZWNvcmRlcj8uc3RhdGUgIT09IFwicmVjb3JkaW5nXCIpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIuc3RvcCgpO1xyXG4gICAgICAgIHRoaXMubWVkaWFSZWNvcmRlci5vbnN0b3AgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2godHJhY2sgPT4gdHJhY2suc3RvcCgpKTtcclxuICAgICAgICAgICAgdGhpcy5tZWRpYVJlY29yZGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLnN0cmVhbSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEb3dubG9hZCB0aGUgd2F2IGF1ZGlvIGZpbGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlbmFtZSAtIE9wdGlvbmFsIG5hbWUgb2YgdGhlIGZpbGUgdG8gYmUgZG93bmxvYWRlZCwgd2l0aG91dCBleHRlbnNpb24gXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGFzMzJCaXQgLSBBdWRpbyByZXF1aXJlZCBpbiAzMi1iaXQsIGRlZmF1bHQgaXMgMTYtYml0LlxyXG4gICAgICogQHBhcmFtIHtBdWRpb0NvbnRleHRPcHRpb25zfSBjb250ZXh0T3B0aW9ucyAtIG9wdGlvc24gbmVlZHMgdG8gYmUgdXNlZCBmb3IgZW5jb2RpbmdcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBhc3luYyBkb3dubG9hZChcclxuICAgICAgICBmaWxlbmFtZSA9IG51bGwsIGFzMzJCaXQgPSBmYWxzZSwgY29udGV4dE9wdGlvbnMgPSB1bmRlZmluZWRcclxuICAgICkge1xyXG4gICAgICAgIGlmICh0aGlzLl9fZGF0YSkgcmV0dXJuIGF3YWl0IGRvd25sb2FkV2F2KHRoaXMuX19kYXRhLCBhczMyQml0LCBmaWxlbmFtZSwgY29udGV4dE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSByZWNvcmRlZCB3YXYgYXVkaW8gQmxvYlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhczMyQml0IC0gR2V0IDMyLWJpdCBhdWRpbywgZGVmYXVsdCBpcyAxNi1iaXRcclxuICAgICAqIEBwYXJhbSB7QXVkaW9Db250ZXh0T3B0aW9uc30gY29udGV4dE9wdGlvbnMgLSBvcHRpb3NuIG5lZWRzIHRvIGJlIHVzZWQgZm9yIGVuY29kaW5nXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgYXN5bmMgZ2V0QmxvYihhczMyQml0ID0gZmFsc2UsIGNvbnRleHRPcHRpb25zID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX19kYXRhKSByZXR1cm4gYXdhaXQgZ2V0V2F2ZUJsb2IodGhpcy5fX2RhdGEsIGFzMzJCaXQsIGNvbnRleHRPcHRpb25zKTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBXYXZSZWNvcmRlcjsiLCJjb25zdCBnZXRXYXZlQmxvYiA9IHJlcXVpcmUoXCIuL3dhdkJsb2JVdGlsXCIpO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7QmxvYiB8IEJsb2JbXX0gYmxvYkRhdGEgLSBCbG9iIG9yIEJsb2JbXSB0byBiZSBjb252ZXJ0ZWQgdG8gYXVkaW8vd2F2ZSBCbG9iXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXMzMkJpdEZsb2F0IC0gQ29udmVydCB0byAxNi1iaXQgb3IgMzItYml0IGZpbGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVuYW1lIC0gTmFtZSBvZiB0aGUgZmlsZVxyXG4gKiBAcGFyYW0ge0F1ZGlvQ29udGV4dE9wdGlvbnN9IGNvbnRleHRPcHRpb25zIC0gYXVkaW8gY29udGV4dCBvcHRpb25zIGZvciBlbmNvZGluZ1xyXG4gKiBAcmV0dXJuc1xyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gZG93bmxvYWRXYXYoXHJcbiAgICBibG9iRGF0YSwgYXMzMkJpdEZsb2F0LCBmaWxlbmFtZSA9IG51bGwsIGNvbnRleHRPcHRpb25zID0gdW5kZWZpbmVkXHJcbikge1xyXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IGdldFdhdmVCbG9iKGJsb2JEYXRhLCBhczMyQml0RmxvYXQsIGNvbnRleHRPcHRpb25zKTtcclxuXHJcbiAgICBjb25zdCBhbmNob3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgYW5jaG9yRWxlbWVudC5ocmVmID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICBhbmNob3JFbGVtZW50LmRvd25sb2FkID0gZmlsZW5hbWUgfHwgYHJlY29yZGluZygnJHthczMyQml0RmxvYXQgPyAnMzJiaXQnIDogJzE2Yml0J30pLndhdmA7XHJcbiAgICBhbmNob3JFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFuY2hvckVsZW1lbnQpO1xyXG4gICAgYW5jaG9yRWxlbWVudC5jbGljaygpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhbmNob3JFbGVtZW50KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkb3dubG9hZFdhdjsiLCJtb2R1bGUuZXhwb3J0cy5XYXZSZWNvcmRlciA9IHJlcXVpcmUoXCIuL1dhdlJlY29yZGVyXCIpO1xyXG5tb2R1bGUuZXhwb3J0cy5nZXRXYXZlQmxvYiA9IHJlcXVpcmUoXCIuL3dhdkJsb2JVdGlsXCIpO1xyXG5tb2R1bGUuZXhwb3J0cy5kb3dubG9hZFdhdiA9IHJlcXVpcmUoXCIuL2Rvd25sb2FkVXRpbFwiKTsiLCJmdW5jdGlvbiBfd3JpdGVTdHJpbmdUb0FycmF5KGFTdHJpbmcsIHRhcmdldEFycmF5LCBvZmZzZXQpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYVN0cmluZy5sZW5ndGg7ICsraSlcclxuICAgICAgICB0YXJnZXRBcnJheVtvZmZzZXQgKyBpXSA9IGFTdHJpbmcuY2hhckNvZGVBdChpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gX3dyaXRlSW50MTZUb0FycmF5KGFOdW1iZXIsIHRhcmdldEFycmF5LCBvZmZzZXQpIHtcclxuICAgIGFOdW1iZXIgPSBNYXRoLmZsb29yKGFOdW1iZXIpO1xyXG4gICAgdGFyZ2V0QXJyYXlbb2Zmc2V0ICsgMF0gPSBhTnVtYmVyICYgMjU1OyAgICAgICAgICAvLyBieXRlIDFcclxuICAgIHRhcmdldEFycmF5W29mZnNldCArIDFdID0gKGFOdW1iZXIgPj4gOCkgJiAyNTU7ICAgLy8gYnl0ZSAyXHJcbn1cclxuXHJcbmZ1bmN0aW9uIF93cml0ZUludDMyVG9BcnJheShhTnVtYmVyLCB0YXJnZXRBcnJheSwgb2Zmc2V0KSB7XHJcbiAgICBhTnVtYmVyID0gTWF0aC5mbG9vcihhTnVtYmVyKTtcclxuICAgIHRhcmdldEFycmF5W29mZnNldCArIDBdID0gYU51bWJlciAmIDI1NTsgICAgICAgICAgLy8gYnl0ZSAxXHJcbiAgICB0YXJnZXRBcnJheVtvZmZzZXQgKyAxXSA9IChhTnVtYmVyID4+IDgpICYgMjU1OyAgIC8vIGJ5dGUgMlxyXG4gICAgdGFyZ2V0QXJyYXlbb2Zmc2V0ICsgMl0gPSAoYU51bWJlciA+PiAxNikgJiAyNTU7ICAvLyBieXRlIDNcclxuICAgIHRhcmdldEFycmF5W29mZnNldCArIDNdID0gKGFOdW1iZXIgPj4gMjQpICYgMjU1OyAgLy8gYnl0ZSA0XHJcbn1cclxuXHJcbi8vIFJldHVybiB0aGUgYml0cyBvZiB0aGUgZmxvYXQgYXMgYSAzMi1iaXQgaW50ZWdlciB2YWx1ZS4gIFRoaXNcclxuLy8gcHJvZHVjZXMgdGhlIHJhdyBiaXRzOyBubyBpbnRlcHJldGF0aW9uIG9mIHRoZSB2YWx1ZSBpcyBkb25lLlxyXG5mdW5jdGlvbiBfZmxvYXRCaXRzKGYpIHtcclxuICAgIGNvbnN0IGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcig0KTtcclxuICAgIChuZXcgRmxvYXQzMkFycmF5KGJ1ZikpWzBdID0gZjtcclxuICAgIGNvbnN0IGJpdHMgPSAobmV3IFVpbnQzMkFycmF5KGJ1ZikpWzBdO1xyXG4gICAgLy8gUmV0dXJuIGFzIGEgc2lnbmVkIGludGVnZXIuXHJcbiAgICByZXR1cm4gYml0cyB8IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF93cml0ZUF1ZGlvQnVmZmVyVG9BcnJheShcclxuICAgIGF1ZGlvQnVmZmVyLFxyXG4gICAgdGFyZ2V0QXJyYXksXHJcbiAgICBvZmZzZXQsXHJcbiAgICBiaXREZXB0aFxyXG4pIHtcclxuICAgIGxldCBpbmRleCA9IDAsIGNoYW5uZWwgPSAwO1xyXG4gICAgY29uc3QgbGVuZ3RoID0gYXVkaW9CdWZmZXIubGVuZ3RoO1xyXG4gICAgY29uc3QgY2hhbm5lbHMgPSBhdWRpb0J1ZmZlci5udW1iZXJPZkNoYW5uZWxzO1xyXG4gICAgbGV0IGNoYW5uZWxEYXRhLCBzYW1wbGU7XHJcblxyXG4gICAgLy8gQ2xhbXBpbmcgc2FtcGxlcyBvbnRvIHRoZSAxNi1iaXQgcmVzb2x1dGlvbi5cclxuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgKytpbmRleCkge1xyXG4gICAgICAgIGZvciAoY2hhbm5lbCA9IDA7IGNoYW5uZWwgPCBjaGFubmVsczsgKytjaGFubmVsKSB7XHJcbiAgICAgICAgICAgIGNoYW5uZWxEYXRhID0gYXVkaW9CdWZmZXIuZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbCk7XHJcblxyXG4gICAgICAgICAgICAvLyBCcmFuY2hlcyB1cG9uIHRoZSByZXF1ZXN0ZWQgYml0IGRlcHRoXHJcbiAgICAgICAgICAgIGlmIChiaXREZXB0aCA9PT0gMTYpIHtcclxuICAgICAgICAgICAgICAgIHNhbXBsZSA9IGNoYW5uZWxEYXRhW2luZGV4XSAqIDMyNzY4LjA7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2FtcGxlIDwgLTMyNzY4KVxyXG4gICAgICAgICAgICAgICAgICAgIHNhbXBsZSA9IC0zMjc2ODtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNhbXBsZSA+IDMyNzY3KVxyXG4gICAgICAgICAgICAgICAgICAgIHNhbXBsZSA9IDMyNzY3O1xyXG4gICAgICAgICAgICAgICAgX3dyaXRlSW50MTZUb0FycmF5KHNhbXBsZSwgdGFyZ2V0QXJyYXksIG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChiaXREZXB0aCA9PT0gMzIpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoaXMgYXNzdW1lcyB3ZSdyZSBnb2luZyB0byBvdXQgMzItZmxvYXQsIG5vdCAzMi1iaXQgbGluZWFyLlxyXG4gICAgICAgICAgICAgICAgc2FtcGxlID0gX2Zsb2F0Qml0cyhjaGFubmVsRGF0YVtpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgX3dyaXRlSW50MzJUb0FycmF5KHNhbXBsZSwgdGFyZ2V0QXJyYXksIG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gNDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIGJpdCBkZXB0aCBmb3IgUENNIGVuY29kaW5nLicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gQ29udmVydHMgdGhlIEJsb2IgZGF0YSB0byBBdWRpb0J1ZmZlclxyXG5hc3luYyBmdW5jdGlvbiBfZ2V0QXVkaW9CdWZmZXIoYmxvYkRhdGEsIGNvbnRleHRPcHRpb25zID0gdW5kZWZpbmVkKSB7XHJcbiAgICBsZXQgYmxvYiA9IGJsb2JEYXRhO1xyXG5cclxuICAgIGlmICghKGJsb2IgaW5zdGFuY2VvZiBCbG9iKSkgYmxvYiA9IG5ldyBCbG9iKFtibG9iRGF0YV0pO1xyXG5cclxuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xyXG5cclxuICAgIGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKTtcclxuXHJcbiAgICBjb25zdCBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KGNvbnRleHRPcHRpb25zKTtcclxuXHJcbiAgICBjb25zdCBhdWRpb0J1ZmZlciA9IGF3YWl0IGF1ZGlvQ29udGV4dC5kZWNvZGVBdWRpb0RhdGEoYXJyYXlCdWZmZXIpXHJcblxyXG4gICAgcmV0dXJuIGF1ZGlvQnVmZmVyO1xyXG59XHJcblxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSB7QmxvYiB8IEJsb2JbXX0gYmxvYkRhdGEgLSBCbG9iIG9yIEJsb2JbXSB0byBiZSBjb252ZXJ0ZWQgdG8gYXVkaW8vd2F2ZSBCbG9iXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXMzMkJpdEZsb2F0IC0gQ29udmVydCB0byAxNi1iaXQgb3IgMzItYml0IGZpbGUsIGRlZmF1bHQgMTYtYml0XHJcbiAqIEBwYXJhbSB7QXVkaW9Db250ZXh0T3B0aW9uc30gY29udGV4dE9wdGlvbnMgLSBvcHRpb3NuIG5lZWRzIHRvIGJlIHVzZWQgZm9yIGVuY29kaW5nXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gZ2V0V2F2ZUJsb2IoXHJcbiAgICBibG9iRGF0YSwgYXMzMkJpdEZsb2F0LCBjb250ZXh0T3B0aW9ucyA9IHVuZGVmaW5lZFxyXG4pIHtcclxuICAgIGNvbnN0IGF1ZGlvQnVmZmVyID0gYXdhaXQgX2dldEF1ZGlvQnVmZmVyKGJsb2JEYXRhLCBjb250ZXh0T3B0aW9ucyk7XHJcblxyXG4gICAgLy8gRW5jb2Rpbmcgc2V0dXAuXHJcbiAgICBjb25zdCBmcmFtZUxlbmd0aCA9IGF1ZGlvQnVmZmVyLmxlbmd0aDtcclxuICAgIGNvbnN0IG51bWJlck9mQ2hhbm5lbHMgPSBhdWRpb0J1ZmZlci5udW1iZXJPZkNoYW5uZWxzO1xyXG4gICAgY29uc3Qgc2FtcGxlUmF0ZSA9IGF1ZGlvQnVmZmVyLnNhbXBsZVJhdGU7XHJcbiAgICBjb25zdCBiaXRzUGVyU2FtcGxlID0gYXMzMkJpdEZsb2F0ID8gMzIgOiAxNjtcclxuICAgIGNvbnN0IGJ5dGVzUGVyU2FtcGxlID0gYml0c1BlclNhbXBsZSAvIDg7XHJcbiAgICBjb25zdCBieXRlUmF0ZSA9IHNhbXBsZVJhdGUgKiBudW1iZXJPZkNoYW5uZWxzICogYml0c1BlclNhbXBsZSAvIDg7XHJcbiAgICBjb25zdCBibG9ja0FsaWduID0gbnVtYmVyT2ZDaGFubmVscyAqIGJpdHNQZXJTYW1wbGUgLyA4O1xyXG4gICAgY29uc3Qgd2F2RGF0YUJ5dGVMZW5ndGggPSBmcmFtZUxlbmd0aCAqIG51bWJlck9mQ2hhbm5lbHMgKiBieXRlc1BlclNhbXBsZTtcclxuICAgIGNvbnN0IGhlYWRlckJ5dGVMZW5ndGggPSA0NDtcclxuICAgIGNvbnN0IHRvdGFsTGVuZ3RoID0gaGVhZGVyQnl0ZUxlbmd0aCArIHdhdkRhdGFCeXRlTGVuZ3RoO1xyXG4gICAgY29uc3Qgd2F2ZUZpbGVEYXRhID0gbmV3IFVpbnQ4QXJyYXkodG90YWxMZW5ndGgpO1xyXG4gICAgY29uc3Qgc3ViQ2h1bmsxU2l6ZSA9IDE2O1xyXG4gICAgY29uc3Qgc3ViQ2h1bmsyU2l6ZSA9IHdhdkRhdGFCeXRlTGVuZ3RoO1xyXG4gICAgY29uc3QgY2h1bmtTaXplID0gNCArICg4ICsgc3ViQ2h1bmsxU2l6ZSkgKyAoOCArIHN1YkNodW5rMlNpemUpO1xyXG5cclxuICAgIF93cml0ZVN0cmluZ1RvQXJyYXkoJ1JJRkYnLCB3YXZlRmlsZURhdGEsIDApO1xyXG4gICAgX3dyaXRlSW50MzJUb0FycmF5KGNodW5rU2l6ZSwgd2F2ZUZpbGVEYXRhLCA0KTtcclxuICAgIF93cml0ZVN0cmluZ1RvQXJyYXkoJ1dBVkUnLCB3YXZlRmlsZURhdGEsIDgpO1xyXG4gICAgX3dyaXRlU3RyaW5nVG9BcnJheSgnZm10ICcsIHdhdmVGaWxlRGF0YSwgMTIpO1xyXG5cclxuICAgIC8vIFN1YkNodW5rMVNpemUgKDQpXHJcbiAgICBfd3JpdGVJbnQzMlRvQXJyYXkoc3ViQ2h1bmsxU2l6ZSwgd2F2ZUZpbGVEYXRhLCAxNik7XHJcbiAgICAvLyBBdWRpb0Zvcm1hdCAoMik6IDMgbWVhbnMgMzItYml0IGZsb2F0LCAxIG1lYW5zIGludGVnZXIgUENNLlxyXG4gICAgX3dyaXRlSW50MTZUb0FycmF5KGFzMzJCaXRGbG9hdCA/IDMgOiAxLCB3YXZlRmlsZURhdGEsIDIwKTtcclxuICAgIC8vIE51bUNoYW5uZWxzICgyKVxyXG4gICAgX3dyaXRlSW50MTZUb0FycmF5KG51bWJlck9mQ2hhbm5lbHMsIHdhdmVGaWxlRGF0YSwgMjIpO1xyXG4gICAgLy8gU2FtcGxlUmF0ZSAoNClcclxuICAgIF93cml0ZUludDMyVG9BcnJheShzYW1wbGVSYXRlLCB3YXZlRmlsZURhdGEsIDI0KTtcclxuICAgIC8vIEJ5dGVSYXRlICg0KVxyXG4gICAgX3dyaXRlSW50MzJUb0FycmF5KGJ5dGVSYXRlLCB3YXZlRmlsZURhdGEsIDI4KTtcclxuICAgIC8vIEJsb2NrQWxpZ24gKDIpXHJcbiAgICBfd3JpdGVJbnQxNlRvQXJyYXkoYmxvY2tBbGlnbiwgd2F2ZUZpbGVEYXRhLCAzMik7XHJcbiAgICAvLyBCaXRzUGVyU2FtcGxlICg0KVxyXG4gICAgX3dyaXRlSW50MzJUb0FycmF5KGJpdHNQZXJTYW1wbGUsIHdhdmVGaWxlRGF0YSwgMzQpO1xyXG4gICAgX3dyaXRlU3RyaW5nVG9BcnJheSgnZGF0YScsIHdhdmVGaWxlRGF0YSwgMzYpO1xyXG4gICAgLy8gU3ViQ2h1bmsyU2l6ZSAoNClcclxuICAgIF93cml0ZUludDMyVG9BcnJheShzdWJDaHVuazJTaXplLCB3YXZlRmlsZURhdGEsIDQwKTtcclxuXHJcbiAgICAvLyBXcml0ZSBhY3R1YWwgYXVkaW8gZGF0YSBzdGFydGluZyBhdCBvZmZzZXQgNDQuXHJcbiAgICBfd3JpdGVBdWRpb0J1ZmZlclRvQXJyYXkoYXVkaW9CdWZmZXIsIHdhdmVGaWxlRGF0YSwgNDQsIGJpdHNQZXJTYW1wbGUpO1xyXG5cclxuICAgIHJldHVybiBuZXcgQmxvYihbd2F2ZUZpbGVEYXRhXSwge1xyXG4gICAgICAgIHR5cGU6ICdhdWRpby93YXZlJ1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2V0V2F2ZUJsb2I7XHJcbiIsInZhciBnbG9iYWwgPVxuICAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbFRoaXMpIHx8XG4gICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZikgfHxcbiAgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbClcblxudmFyIHN1cHBvcnQgPSB7XG4gIHNlYXJjaFBhcmFtczogJ1VSTFNlYXJjaFBhcmFtcycgaW4gZ2xvYmFsLFxuICBpdGVyYWJsZTogJ1N5bWJvbCcgaW4gZ2xvYmFsICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICBibG9iOlxuICAgICdGaWxlUmVhZGVyJyBpbiBnbG9iYWwgJiZcbiAgICAnQmxvYicgaW4gZ2xvYmFsICYmXG4gICAgKGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3IEJsb2IoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpLFxuICBmb3JtRGF0YTogJ0Zvcm1EYXRhJyBpbiBnbG9iYWwsXG4gIGFycmF5QnVmZmVyOiAnQXJyYXlCdWZmZXInIGluIGdsb2JhbFxufVxuXG5mdW5jdGlvbiBpc0RhdGFWaWV3KG9iaikge1xuICByZXR1cm4gb2JqICYmIERhdGFWaWV3LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKG9iailcbn1cblxuaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgdmFyIHZpZXdDbGFzc2VzID0gW1xuICAgICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICAnW29iamVjdCBVaW50MzJBcnJheV0nLFxuICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nXG4gIF1cblxuICB2YXIgaXNBcnJheUJ1ZmZlclZpZXcgPVxuICAgIEFycmF5QnVmZmVyLmlzVmlldyB8fFxuICAgIGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWUpIHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgIG5hbWUgPSBTdHJpbmcobmFtZSlcbiAgfVxuICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5eX2B8fiFdL2kudGVzdChuYW1lKSB8fCBuYW1lID09PSAnJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lOiBcIicgKyBuYW1lICsgJ1wiJylcbiAgfVxuICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gIH1cbiAgcmV0dXJuIHZhbHVlXG59XG5cbi8vIEJ1aWxkIGEgZGVzdHJ1Y3RpdmUgaXRlcmF0b3IgZm9yIHRoZSB2YWx1ZSBsaXN0XG5mdW5jdGlvbiBpdGVyYXRvckZvcihpdGVtcykge1xuICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdmFsdWUgPSBpdGVtcy5zaGlmdCgpXG4gICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICB9XG4gIH1cblxuICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvclxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpdGVyYXRvclxufVxuXG5leHBvcnQgZnVuY3Rpb24gSGVhZGVycyhoZWFkZXJzKSB7XG4gIHRoaXMubWFwID0ge31cblxuICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgIH0sIHRoaXMpXG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXJzKSkge1xuICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgIHRoaXMuYXBwZW5kKGhlYWRlclswXSwgaGVhZGVyWzFdKVxuICAgIH0sIHRoaXMpXG4gIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGhlYWRlcnMpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSlcbiAgICB9LCB0aGlzKVxuICB9XG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG4gIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdXG4gIHRoaXMubWFwW25hbWVdID0gb2xkVmFsdWUgPyBvbGRWYWx1ZSArICcsICcgKyB2YWx1ZSA6IHZhbHVlXG59XG5cbkhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgcmV0dXJuIHRoaXMuaGFzKG5hbWUpID8gdGhpcy5tYXBbbmFtZV0gOiBudWxsXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICBmb3IgKHZhciBuYW1lIGluIHRoaXMubWFwKSB7XG4gICAgaWYgKHRoaXMubWFwLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKVxuICAgIH1cbiAgfVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpdGVtcyA9IFtdXG4gIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgIGl0ZW1zLnB1c2gobmFtZSlcbiAgfSlcbiAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGl0ZW1zID0gW11cbiAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaXRlbXMucHVzaCh2YWx1ZSlcbiAgfSlcbiAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpdGVtcyA9IFtdXG4gIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgIGl0ZW1zLnB1c2goW25hbWUsIHZhbHVlXSlcbiAgfSlcbiAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxufVxuXG5pZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gSGVhZGVycy5wcm90b3R5cGUuZW50cmllc1xufVxuXG5mdW5jdGlvbiBjb25zdW1lZChib2R5KSB7XG4gIGlmIChib2R5LmJvZHlVc2VkKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICB9XG4gIGJvZHkuYm9keVVzZWQgPSB0cnVlXG59XG5cbmZ1bmN0aW9uIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdClcbiAgICB9XG4gICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICByZXR1cm4gcHJvbWlzZVxufVxuXG5mdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYilcbiAgcmV0dXJuIHByb21pc2Vcbn1cblxuZnVuY3Rpb24gcmVhZEFycmF5QnVmZmVyQXNUZXh0KGJ1Zikge1xuICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgdmFyIGNoYXJzID0gbmV3IEFycmF5KHZpZXcubGVuZ3RoKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmlldy5sZW5ndGg7IGkrKykge1xuICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxuICB9XG4gIHJldHVybiBjaGFycy5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBidWZmZXJDbG9uZShidWYpIHtcbiAgaWYgKGJ1Zi5zbGljZSkge1xuICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgfSBlbHNlIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zi5ieXRlTGVuZ3RoKVxuICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpXG4gICAgcmV0dXJuIHZpZXcuYnVmZmVyXG4gIH1cbn1cblxuZnVuY3Rpb24gQm9keSgpIHtcbiAgdGhpcy5ib2R5VXNlZCA9IGZhbHNlXG5cbiAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgLypcbiAgICAgIGZldGNoLW1vY2sgd3JhcHMgdGhlIFJlc3BvbnNlIG9iamVjdCBpbiBhbiBFUzYgUHJveHkgdG9cbiAgICAgIHByb3ZpZGUgdXNlZnVsIHRlc3QgaGFybmVzcyBmZWF0dXJlcyBzdWNoIGFzIGZsdXNoLiBIb3dldmVyLCBvblxuICAgICAgRVM1IGJyb3dzZXJzIHdpdGhvdXQgZmV0Y2ggb3IgUHJveHkgc3VwcG9ydCBwb2xseWZpbGxzIG11c3QgYmUgdXNlZDtcbiAgICAgIHRoZSBwcm94eS1wb2xseWZpbGwgaXMgdW5hYmxlIHRvIHByb3h5IGFuIGF0dHJpYnV0ZSB1bmxlc3MgaXQgZXhpc3RzXG4gICAgICBvbiB0aGUgb2JqZWN0IGJlZm9yZSB0aGUgUHJveHkgaXMgY3JlYXRlZC4gVGhpcyBjaGFuZ2UgZW5zdXJlc1xuICAgICAgUmVzcG9uc2UuYm9keVVzZWQgZXhpc3RzIG9uIHRoZSBpbnN0YW5jZSwgd2hpbGUgbWFpbnRhaW5pbmcgdGhlXG4gICAgICBzZW1hbnRpYyBvZiBzZXR0aW5nIFJlcXVlc3QuYm9keVVzZWQgaW4gdGhlIGNvbnN0cnVjdG9yIGJlZm9yZVxuICAgICAgX2luaXRCb2R5IGlzIGNhbGxlZC5cbiAgICAqL1xuICAgIHRoaXMuYm9keVVzZWQgPSB0aGlzLmJvZHlVc2VkXG4gICAgdGhpcy5fYm9keUluaXQgPSBib2R5XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keVxuICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgIHRoaXMuX2JvZHlCbG9iID0gYm9keVxuICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5mb3JtRGF0YSAmJiBGb3JtRGF0YS5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkudG9TdHJpbmcoKVxuICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keS5idWZmZXIpXG4gICAgICAvLyBJRSAxMC0xMSBjYW4ndCBoYW5kbGUgYSBEYXRhVmlldyBib2R5LlxuICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcbiAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgKEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpIHx8IGlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpKSkge1xuICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5ID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGJvZHkpXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUJsb2IgJiYgdGhpcy5fYm9keUJsb2IudHlwZSkge1xuICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCB0aGlzLl9ib2R5QmxvYi50eXBlKVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoc3VwcG9ydC5ibG9iKSB7XG4gICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgIHZhciBpc0NvbnN1bWVkID0gY29uc3VtZWQodGhpcylcbiAgICAgICAgaWYgKGlzQ29uc3VtZWQpIHtcbiAgICAgICAgICByZXR1cm4gaXNDb25zdW1lZFxuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcodGhpcy5fYm9keUFycmF5QnVmZmVyKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoXG4gICAgICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIuYnVmZmVyLnNsaWNlKFxuICAgICAgICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIuYnl0ZU9mZnNldCxcbiAgICAgICAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyLmJ5dGVPZmZzZXQgKyB0aGlzLl9ib2R5QXJyYXlCdWZmZXIuYnl0ZUxlbmd0aFxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgIHJldHVybiByZWFkQmxvYkFzVGV4dCh0aGlzLl9ib2R5QmxvYilcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWFkQXJyYXlCdWZmZXJBc1RleHQodGhpcy5fYm9keUFycmF5QnVmZmVyKSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlUZXh0KVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdXBwb3J0LmZvcm1EYXRhKSB7XG4gICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuanNvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbnZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2QpIHtcbiAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICByZXR1cm4gbWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEgPyB1cGNhc2VkIDogbWV0aG9kXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZXF1ZXN0KGlucHV0LCBvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXF1ZXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1BsZWFzZSB1c2UgdGhlIFwibmV3XCIgb3BlcmF0b3IsIHRoaXMgRE9NIG9iamVjdCBjb25zdHJ1Y3RvciBjYW5ub3QgYmUgY2FsbGVkIGFzIGEgZnVuY3Rpb24uJylcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5XG5cbiAgaWYgKGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJylcbiAgICB9XG4gICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gaW5wdXQuY3JlZGVudGlhbHNcbiAgICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBpbnB1dC5tZXRob2RcbiAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgdGhpcy5zaWduYWwgPSBpbnB1dC5zaWduYWxcbiAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgIGJvZHkgPSBpbnB1dC5fYm9keUluaXRcbiAgICAgIGlucHV0LmJvZHlVc2VkID0gdHJ1ZVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLnVybCA9IFN0cmluZyhpbnB1dClcbiAgfVxuXG4gIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHMgfHwgJ3NhbWUtb3JpZ2luJ1xuICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gIH1cbiAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpXG4gIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbFxuICB0aGlzLnNpZ25hbCA9IG9wdGlvbnMuc2lnbmFsIHx8IHRoaXMuc2lnbmFsXG4gIHRoaXMucmVmZXJyZXIgPSBudWxsXG5cbiAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgfVxuICB0aGlzLl9pbml0Qm9keShib2R5KVxuXG4gIGlmICh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykge1xuICAgIGlmIChvcHRpb25zLmNhY2hlID09PSAnbm8tc3RvcmUnIHx8IG9wdGlvbnMuY2FjaGUgPT09ICduby1jYWNoZScpIHtcbiAgICAgIC8vIFNlYXJjaCBmb3IgYSAnXycgcGFyYW1ldGVyIGluIHRoZSBxdWVyeSBzdHJpbmdcbiAgICAgIHZhciByZVBhcmFtU2VhcmNoID0gLyhbPyZdKV89W14mXSovXG4gICAgICBpZiAocmVQYXJhbVNlYXJjaC50ZXN0KHRoaXMudXJsKSkge1xuICAgICAgICAvLyBJZiBpdCBhbHJlYWR5IGV4aXN0cyB0aGVuIHNldCB0aGUgdmFsdWUgd2l0aCB0aGUgY3VycmVudCB0aW1lXG4gICAgICAgIHRoaXMudXJsID0gdGhpcy51cmwucmVwbGFjZShyZVBhcmFtU2VhcmNoLCAnJDFfPScgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE90aGVyd2lzZSBhZGQgYSBuZXcgJ18nIHBhcmFtZXRlciB0byB0aGUgZW5kIHdpdGggdGhlIGN1cnJlbnQgdGltZVxuICAgICAgICB2YXIgcmVRdWVyeVN0cmluZyA9IC9cXD8vXG4gICAgICAgIHRoaXMudXJsICs9IChyZVF1ZXJ5U3RyaW5nLnRlc3QodGhpcy51cmwpID8gJyYnIDogJz8nKSArICdfPScgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5SZXF1ZXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFJlcXVlc3QodGhpcywge2JvZHk6IHRoaXMuX2JvZHlJbml0fSlcbn1cblxuZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICBib2R5XG4gICAgLnRyaW0oKVxuICAgIC5zcGxpdCgnJicpXG4gICAgLmZvckVhY2goZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGlmIChieXRlcykge1xuICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpXG4gICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKVxuICAgICAgfVxuICAgIH0pXG4gIHJldHVybiBmb3JtXG59XG5cbmZ1bmN0aW9uIHBhcnNlSGVhZGVycyhyYXdIZWFkZXJzKSB7XG4gIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKVxuICAvLyBSZXBsYWNlIGluc3RhbmNlcyBvZiBcXHJcXG4gYW5kIFxcbiBmb2xsb3dlZCBieSBhdCBsZWFzdCBvbmUgc3BhY2Ugb3IgaG9yaXpvbnRhbCB0YWIgd2l0aCBhIHNwYWNlXG4gIC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMwI3NlY3Rpb24tMy4yXG4gIHZhciBwcmVQcm9jZXNzZWRIZWFkZXJzID0gcmF3SGVhZGVycy5yZXBsYWNlKC9cXHI/XFxuW1xcdCBdKy9nLCAnICcpXG4gIC8vIEF2b2lkaW5nIHNwbGl0IHZpYSByZWdleCB0byB3b3JrIGFyb3VuZCBhIGNvbW1vbiBJRTExIGJ1ZyB3aXRoIHRoZSBjb3JlLWpzIDMuNi4wIHJlZ2V4IHBvbHlmaWxsXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9naXRodWIvZmV0Y2gvaXNzdWVzLzc0OFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNzUxXG4gIHByZVByb2Nlc3NlZEhlYWRlcnNcbiAgICAuc3BsaXQoJ1xccicpXG4gICAgLm1hcChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgIHJldHVybiBoZWFkZXIuaW5kZXhPZignXFxuJykgPT09IDAgPyBoZWFkZXIuc3Vic3RyKDEsIGhlYWRlci5sZW5ndGgpIDogaGVhZGVyXG4gICAgfSlcbiAgICAuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCc6JylcbiAgICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpLnRyaW0oKVxuICAgICAgaWYgKGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBwYXJ0cy5qb2luKCc6JykudHJpbSgpXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgdmFsdWUpXG4gICAgICB9XG4gICAgfSlcbiAgcmV0dXJuIGhlYWRlcnNcbn1cblxuQm9keS5jYWxsKFJlcXVlc3QucHJvdG90eXBlKVxuXG5leHBvcnQgZnVuY3Rpb24gUmVzcG9uc2UoYm9keUluaXQsIG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlc3BvbnNlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1BsZWFzZSB1c2UgdGhlIFwibmV3XCIgb3BlcmF0b3IsIHRoaXMgRE9NIG9iamVjdCBjb25zdHJ1Y3RvciBjYW5ub3QgYmUgY2FsbGVkIGFzIGEgZnVuY3Rpb24uJylcbiAgfVxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge31cbiAgfVxuXG4gIHRoaXMudHlwZSA9ICdkZWZhdWx0J1xuICB0aGlzLnN0YXR1cyA9IG9wdGlvbnMuc3RhdHVzID09PSB1bmRlZmluZWQgPyAyMDAgOiBvcHRpb25zLnN0YXR1c1xuICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXG4gIHRoaXMuc3RhdHVzVGV4dCA9IG9wdGlvbnMuc3RhdHVzVGV4dCA9PT0gdW5kZWZpbmVkID8gJycgOiAnJyArIG9wdGlvbnMuc3RhdHVzVGV4dFxuICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgdGhpcy5faW5pdEJvZHkoYm9keUluaXQpXG59XG5cbkJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cblJlc3BvbnNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICBzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG4gICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICB1cmw6IHRoaXMudXJsXG4gIH0pXG59XG5cblJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXNwb25zZSA9IG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiAwLCBzdGF0dXNUZXh0OiAnJ30pXG4gIHJlc3BvbnNlLnR5cGUgPSAnZXJyb3InXG4gIHJldHVybiByZXNwb25zZVxufVxuXG52YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF1cblxuUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICBpZiAocmVkaXJlY3RTdGF0dXNlcy5pbmRleE9mKHN0YXR1cykgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiBzdGF0dXMsIGhlYWRlcnM6IHtsb2NhdGlvbjogdXJsfX0pXG59XG5cbmV4cG9ydCB2YXIgRE9NRXhjZXB0aW9uID0gZ2xvYmFsLkRPTUV4Y2VwdGlvblxudHJ5IHtcbiAgbmV3IERPTUV4Y2VwdGlvbigpXG59IGNhdGNoIChlcnIpIHtcbiAgRE9NRXhjZXB0aW9uID0gZnVuY3Rpb24obWVzc2FnZSwgbmFtZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2VcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgdmFyIGVycm9yID0gRXJyb3IobWVzc2FnZSlcbiAgICB0aGlzLnN0YWNrID0gZXJyb3Iuc3RhY2tcbiAgfVxuICBET01FeGNlcHRpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpXG4gIERPTUV4Y2VwdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBET01FeGNlcHRpb25cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoKGlucHV0LCBpbml0KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuXG4gICAgaWYgKHJlcXVlc3Quc2lnbmFsICYmIHJlcXVlc3Quc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgIHJldHVybiByZWplY3QobmV3IERPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpXG4gICAgfVxuXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICBmdW5jdGlvbiBhYm9ydFhocigpIHtcbiAgICAgIHhoci5hYm9ydCgpXG4gICAgfVxuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICB9XG4gICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpXG4gICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpXG4gICAgICB9LCAwKVxuICAgIH1cblxuICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfSwgMClcbiAgICB9XG5cbiAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfSwgMClcbiAgICB9XG5cbiAgICB4aHIub25hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBET01FeGNlcHRpb24oJ0Fib3J0ZWQnLCAnQWJvcnRFcnJvcicpKVxuICAgICAgfSwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaXhVcmwodXJsKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gdXJsID09PSAnJyAmJiBnbG9iYWwubG9jYXRpb24uaHJlZiA/IGdsb2JhbC5sb2NhdGlvbi5ocmVmIDogdXJsXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB1cmxcbiAgICAgIH1cbiAgICB9XG5cbiAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgZml4VXJsKHJlcXVlc3QudXJsKSwgdHJ1ZSlcblxuICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXG4gICAgfSBlbHNlIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnb21pdCcpIHtcbiAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZVxuICAgIH1cblxuICAgIGlmICgncmVzcG9uc2VUeXBlJyBpbiB4aHIpIHtcbiAgICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgc3VwcG9ydC5hcnJheUJ1ZmZlciAmJlxuICAgICAgICByZXF1ZXN0LmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSAmJlxuICAgICAgICByZXF1ZXN0LmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKS5pbmRleE9mKCdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbml0ICYmIHR5cGVvZiBpbml0LmhlYWRlcnMgPT09ICdvYmplY3QnICYmICEoaW5pdC5oZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGluaXQuaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIG5vcm1hbGl6ZVZhbHVlKGluaXQuaGVhZGVyc1tuYW1lXSkpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3Quc2lnbmFsKSB7XG4gICAgICByZXF1ZXN0LnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0WGhyKVxuXG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIERPTkUgKHN1Y2Nlc3Mgb3IgZmFpbHVyZSlcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgcmVxdWVzdC5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydFhocilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gIH0pXG59XG5cbmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxuXG5pZiAoIWdsb2JhbC5mZXRjaCkge1xuICBnbG9iYWwuZmV0Y2ggPSBmZXRjaFxuICBnbG9iYWwuSGVhZGVycyA9IEhlYWRlcnNcbiAgZ2xvYmFsLlJlcXVlc3QgPSBSZXF1ZXN0XG4gIGdsb2JhbC5SZXNwb25zZSA9IFJlc3BvbnNlXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9