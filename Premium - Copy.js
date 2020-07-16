/***********************************************************************************************************************

# Synchtube Premium © 2016-2019 by ZimnyLech

# ABOUT
_______

# Synchtube Premium is a powerful JavaScript application for CyTube (or any server based on CyTube API) channels
# Multi-functional - adds to your channel over 100 missing features, functions, and enhancements
# Minimal layout interference - maximum channel boost by adding only few buttons and menus
# User-oriented - gives single user almost infinite possibilities to set layout and look of the channel
# Ready-to-use - doesn't require any configuration to work (see: INSTALLATION)
# Relatively small filesize - less than 305 kB of code

# INSTALLATION
______________

# 1. Log as an admin to your channel, and go to: Channel Settings > Admin Settings
# 2. Paste following URL to "External Javascript": https://dl.dropboxusercontent.com/s/1dyazoq6t7wh808/Premium.js
#    Installation finished!

# RELEASE
_________

# Version:		2.12.2
# Release date:		2019-03-07
# License:		Creative Commons CC-BY-NC-SA 4.0
# License URL:		http://creativecommons.org/licenses/by-nc-sa/4.0/

# API CONTENTS
______________

# [SECTION 1]		INITIAL GLOBAL VARIABLES
# [SECTION 2]		GLOBAL FUNCTIONS
# [SECTION 3]		USER INTERFACE
# [SECTION 4]		USER INTERFACE EVENTS
# [SECTION 5]		SYNCHTUBE API EXTENSION
# [SECTION 6]		IMGUR API
# [SECTION 7]		OEKAKI API
# [SECTION 8]		CSS AND FINAL LAYOUT

***********************************************************************************************************************/

// ***** API activation control ***** //

START = new Date().getTime();
setTimeout(function() {
	if (typeof LOADED === "undefined") {
		var msg = 'Synchtube Premium error! Application hasn\'t been loaded properly, some functions '
			+ 'may not work. If there\'s a problem with media player, try to refresh the page. '
			+ 'Otherwise, ask channel administrator, or disable script access.';
		addChatNotification(msg);
	}
}, 10000);

// Reload after unexpected site error (if API was already loaded), to prevent duplication of the elements
// It fixes also incompability with enabled "Chat Only" layout

if (typeof LOADED !== "undefined" || $("body").hasClass('chatOnly')) document.location.reload();


// ***** BASIC CUSTOMIZATION ***** //

/*
For advanced admins (own hosting required). Absolutely DO NOT DELETE any given variable, or the API may not work.

# FaviconURL		| URL of an optional channel favicon
# ChannelName		| custom channel name in the navigation bar instead of default server name
# MiniLogoURL		| custom mini logo in the navigation bar
			| height: 36px (logo will be automatically resized)
# CustomWelcomeText	| custom navigation bar "Welcome" message
# WelcomeSoundFileURL	| URL of an optional welcome sound file played on load
			| recommended: .ogg file (best support by browsers)
# MOTDAlteredElement	| ID of the optional specific MOTD element, that will be altered after script loading
			| e.g.: 'altered-div'
# MOTDAlteredHTML	| new HTML content of the specific MOTD element mentioned above
# AnnouncementHTML	| HTML/text of an optional announcement/message below MOTD
# JoinMessage		| "user joined" message displayed on chat
# LeaveMessage		| "user left" message displayed on chat
			| user can enable/disable displaying join/leave messages in: Premium Settings > Advanced
# NowPlaying		| "now playing" message in Radio Mode
# PlayingNext		| "playing next" message in Radio Mode
# PlayerCoveringURL	| custom URL of the player covering image for "Hide Player Until Next" function
# CustomTitleCaption	| custom title caption (default: 'Currently Playing:')
# CustomFooterHTML	| HTML or text of an optional, additional custom footer
# AnswersArray		| answers for "!ask" chat command
# FortunesArray		| prophecies for "!fortune" chat command
# SoundFiltersArray	| list of optional chat soundfilters (audio files played after sending certain text on chat)
			| syntax: 'chat_text':'sound_file_URL',
			| recommended: .ogg files (best support by browsers)
# FactsArray		| list of optional funny facts about users for undocummented "!fact" command
			| don't use usernames, user will be randomly selected from the userlist
# ImgurClientID		| imgur client ID for images upload (leave default ID if you don't have your own one)
# GiphyAPIKey		| giphy API key for images search (leave default key if you don't have your own one)
# ExternalScriptURL	| URL of an optional, additional external JavaScript file
*/

FaviconURL		= 'https://files.catbox.moe/xeupn2.gif';

ChannelName		= 'Chillware Cinema';

MiniLogoURL		= 'https://files.catbox.moe/xeupn2.gif';

CustomWelcomeText	= 'Welcome Gamer';

WelcomeSoundFileURL	= '';

MOTDAlteredElement	= '';

MOTDAlteredHTML		= '';

AnnouncementHTML	= '';

JoinMessage		= 'rage joined';

LeaveMessage		= 'rq';

NowPlaying		= 'Now playing';

PlayingNext		= 'Playing next';

PlayerCoveringURL	= '';

CustomTitleCaption	= '';

CustomFooterHTML	= 'Copyright 2019: Israelite is poliohaver and Stick is a cringe failer. Enzic is chad.';

AnswersArray		= [
	'definitely yes', 'yes', 'rather yes', '50/50', 'rather not',
	'no', 'definitely no', 'ask again', 'I will not answer'
];

FortunesArray		= [
	'great blessing', 'small blessing', 'end of blessing', 'great curse', 'small curse', 'end of curse',
	'your wish come true', 'your wish won\'t come true', 'you will meet a person you wished',
	'you won\'t meet a person you wished', 'you will find a thing you\'ve lost', 'you will lost something',
	'luck in business', 'bad luck in business', 'luck in learning', 'bad luck in learning', 'a quarrel is coming',
	'romantic relationship is waiting for you', 'sickness is coming', 'you will have a simple, normal day',
	'no fortune for you this time'
];

SoundFiltersArray	= {
'!shut':'https://files.catbox.moe/j8py9t.ogg',
'!badumtss':'https://www.myinstants.com/media/sounds/badumtsss.mp3',
'!honk':'https://okaycool.africa/honk.mp3',
'!boost':'http://okaycool.africa/u/bruh/1NP0MeIZKj.mp3',
'!oboost':'http://okaycool.africa/u/bruh/cj9AfOq8g3.mp3',
'!jail': 'http://okaycool.africa/u/bruh/L7PYRQGX9z.mp3',
'!stfu': 'http://okaycool.africa/u/bruh/FUNc2o74i6.mp3',
'!popoff': 'http://okaycool.africa/u/bruh/cLHCtDw8XO.mp3',
'!yoo' : 'https://www.myinstants.com/media/sounds/yoooooooooooooooooooooooooooohhhhhhhhhhhhhhhhhhhhhhhhhhhhhh.mp3'
,};

FFactsArray		= [
    'is gay', 'is a poliohaver', 'is a chad', 'sucks dick', 'is cute :3',
	'doesnt know what to do with a soccer ball', 'doesnt know how to do anything right', 'is a paster',
	'uses nullcore', 'is inferior to me', 'is mad', 'is fat',
	'is a nigger', 'is not a nigger', 'go to sleep its too late', 'likes cp', 'loves to be buttfucked',
	'is a good guy', 'needs a hug', 'is alpha', 'is a jew', 'uses lmaobox', 'is a liberal', 'is failing pretty hard', 'passed tor on the cringe bingo', 'is cringe', 'is a beta', 'has a nigger slave', 
];

ImgurClientID		= 'a11c2b9fbdd104a';

GiphyAPIKey		= 'dc6zaTOxFJmzC';

ExternalScriptURL	= 'https://dl.dropboxusercontent.com/s/p8zfj6wpng5l3nj/Modulos2.js';

// ***** END OF BASIC CUSTOMIZATION ***** //


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ---------- [SECTION 1] INITIAL GLOBAL VARIABLES ---------- */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Set channel path for emergency situations

if (typeof CHANNELPATH === "undefined") CHANNELPATH = 'r';

// Get default layout settings for the first-timers

_USERTHEME	= document.getElementById("usertheme").getAttribute("href");
_COMPACT	= ['fluid', 'synchtube-fluid'].indexOf(USEROPTS.layout) < 0 ? true : false;
_SINGLECOLUMN	= USEROPTS.layout == "hd" ? true : false;
_SYNCH		= USEROPTS.layout.indexOf("synchtube") > -1 ? true : false;
_SHOWELEMENTS	= '{"header":1,"logo":1,"motd":1,"announcements":1,"mainheader":1,"playerlabels":1,"chatlabels":1,'
		+ '"playercontrols":1,"playlistbtns":1,"playlistmenu":1,"playermenu":1,"playerbtns":1,'
		+ '"mediadbbtns":1,"chatcontrols":1,"pollemotebtns":1,"colorsbtn":1,"chatbtns":1,'
		+ '"chatmenus":1,"plmeta":1,"playlistlabels":1,"footer":1}';

// Get and set global variables stored in localStorage/cookies, or set default values

BIGPROFILES	= getOrDefault('SP_bigprofiles',	false);
CHATBG		= getOrDefault('SP_chatbg',		'');
CHATFONTSIZE	= getOrDefault('SP_chatfontsize',	100);
CHATMAXSIZE	= getOrDefault('SP_chatmaxsize',	100);
CHATSTYLE	= getOrDefault('SP_chatstyle',		'');
CHATUSERNAME	= getOrDefault('SP_chatusername',	false);
COMPACT		= getOrDefault('SP_compact',		_COMPACT);
CUSTOMPING	= getOrDefault('SP_customping',		false);
CUSTOMPINGFILE	= getOrDefault('SP_custompingfile',	'');
CUSTOMPINGLVL	= getOrDefault('SP_custompinglvl',	1);
EXECCSS		= getOrDefault('SP_execcss',		false);
EXPANDPL	= getOrDefault('SP_expandpl',		false);
FULLTITLE	= getOrDefault('SP_fulltitle',		false);
HIDEAFKUSERS	= getOrDefault('SP_hideafkusers',	false);
HIDEPLS		= getOrDefault('SP_hidepls',		false);
HIDEPLSBTNS	= getOrDefault('SP_hideplsbtns',	false);
HIDETSTAMPS	= getOrDefault('SP_hidetstamps',	false);
IGNOREAVATARS	= getOrDefault('SP_ignoreavatars',	false);
IGNORECOLORS	= getOrDefault('SP_ignorecolors',	false);
IGNORECSS	= getOrDefault('SP_ignorecss',		false);
IGNOREEMOTES	= getOrDefault('SP_ignoreemotes',	false);
IGNORESERVER	= getOrDefault('SP_ignoreserver',	false);
IGNORETHISCSS	= getOrDefault('SP_ignorethiscss',	'');
LARGECHAT	= getOrDefault('SP_largechat',		false);
LARGEPLAYER	= getOrDefault('SP_largeplayer',	false);
MINIATURES	= getOrDefault('SP_miniatures',		false);
MOTDBOTTOM	= getOrDefault('SP_motdbottom',		false);
MSGSEPARATOR	= getOrDefault('SP_msgseparator',	'');
MUTECHAT	= getOrDefault('SP_mutechat',		false);
NOAUTOSCROLL	= getOrDefault('SP_noautoscroll',	false);
PLAYERTEXT	= getOrDefault('SP_playertext',		false);
PLAYWELCOME	= getOrDefault('SP_playwelcome',	true);
PLSNOSCROLL	= getOrDefault('SP_plsnoscroll',	false);
PLSNUMBERS	= getOrDefault('SP_plsnumbers',		false);
PROGRESSBAR	= getOrDefault('SP_progressbar',	true);
RADIOMODE	= getOrDefault('SP_radiomode',		false);
SAVEMENTIONS	= getOrDefault('SP_savementions',	true);
SCROLLNAVBAR	= getOrDefault('SP_scrollnavbar',	false);
SHOWCONTRIBS	= getOrDefault('SP_showcontribs',	false);
SHOWIMAGES	= getOrDefault('SP_showimages',		false);
SHOWMASCOT	= getOrDefault('SP_showmascot',		false);
SHOWOEKAKI	= getOrDefault('SP_showoekaki',		false);
SHOWVIDEOS	= getOrDefault('SP_showvideos',		false);
SINGLECOLUMN	= getOrDefault('SP_singlecolumn',	false);
SOUNDSLVL	= getOrDefault('SP_soundslvl',		6);
SYNCH		= getOrDefault('SP_synch',		_SYNCH);
TEXTTOSPEECH	= getOrDefault('SP_texttospeech',	false);
THEATREMODE	= getOrDefault('SP_theatremode',	false);
TIMELEFT	= getOrDefault('SP_timeleft',		false);
TOOLSENABLED	= getOrDefault('SP_toolsenabled',	false);
TTSLANGUAGE	= getOrDefault('SP_ttslanguage',	'en');
ULISTRIGHT	= getOrDefault('SP_ulistright',		_SYNCH);
USERCSS		= getOrDefault('SP_usercss',		'');
USERFONT	= getOrDefault('SP_userfont',		'');
USERPATTERN	= getOrDefault('SP_userpattern',	'');
USERTHEME	= getOrDefault('SP_usertheme',		_USERTHEME);
VISITS		= getOrDefault('SP_visits',		0);

// Premium Settings

AUTOPLAYEMBEDS	= getOrDefault('SP_autoplayembeds',	false);
AVATARSLIST	= getOrDefault('SP_avatarslist',	false);
CHATHIDESCROLL	= getOrDefault('SP_chathidescroll',	false);
CHATTOTOP	= getOrDefault('SP_chattotop',		false);
COLLAPSEMOTD	= getOrDefault('SP_collapsemotd',	false);
COLLAPSEULIST	= getOrDefault('SP_collapseulist',	false);
CUSTOMDBURL	= getOrDefault('SP_customdburl',	'');
CUSTOMHTML	= getOrDefault('SP_customhtml',		'');
EMOTESCACHE	= getOrDefault('SP_emotescache',	false);
EMOTESPERPAGE	= getOrDefault('SP_emotesperpage',	100);
EMOTESPREVPOS	= getOrDefault('SP_emotesprevpos',	'b-left');
EXECDB		= getOrDefault('SP_execdb',		false);
EXECFILTERS	= getOrDefault('SP_execfilters',	false);
EXECHTML	= getOrDefault('SP_exechtml',		false);
GLUELAYOUT	= getOrDefault('SP_gluelayout',		false);
HIDEINDICATOR	= getOrDefault('SP_hideindicator',	false);
HIDEPLAYERURL	= getOrDefault('SP_hideplayerurl',	'');
IGNORECHATMODE	= getOrDefault('SP_ignorechatmode',	3);
IMAGEURLACCEPT	= getOrDefault('SP_imageurlaccept',	false);
NONOTIFIER	= getOrDefault('SP_nonotifier',		false);
PREMIUMNOTMODE	= getOrDefault('SP_premiumnotmode',	4);
SEPARATEULIST	= getOrDefault('SP_separateulist',	false);
TABMODE		= getOrDefault('SP_tabmode',		0);
TRANSPARENTNAV	= getOrDefault('SP_transparentnav',	false);
USERNAMEMARK	= getOrDefault('SP_usernamemark',	':');

CUSTOMFILTERS	= getOrDefault('SP_customfilters_' + CLIENT.name, '[{"before":"synchtube","after":"Synchtube"}]');
SHOWELEMENTS	= getOrDefault('SP_showelements_' + CLIENT.name, _SHOWELEMENTS);

// Session global variables

CHATMENTIONS	= [];
CHATMSGNUM	= 0;
CHATUNRNUM	= 0;
COMMAND 	= false;
COMMANDSTSTAMPS	= [];
HIDDENPLR	= false;
HIDDENVWRAP	= false;
LASTPLAYED 	= [];
MUTEDVOICES	= [];
NOPLAYER	= false;
ONLINETIME 	= 0;
PREVTIME	= 0;
SORTMODE	= {"chatHistory":"new", "mediaAdded":"new", "mediaCurrent":"old", "mediaHistory":"new",
		  "mentionsCurrent":"new", "mentionsHistory":"new", "msgCurrent":"old", "msgHistory":"new"};
VISIBLETAB	= {"chats":CHANNEL.name, "commands":1, "emotes":1, "lastmedia":1,
		  "mentions":1, "messages":1, "options":1, "tools":1, "unicode":1}

// Constants

DROPBOX		= 'https://dl.dropboxusercontent.com/s/';
VERSION		= '2.12.2';

// Allowed link extensions that can be displayed directly on chat by a user

ImageExtensions		= 'a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], '
			+ 'a[href*=".tiff"], a[href*=".gif"], a[href*=".svg"]';
MediaExtensions		= 'a[href*=".webm"], a[href*=".mp4"], a[href*=".mp3"], a[href*=".ogg"]';

// List of HTML colors for "Colors" button

ColorsArray = [
	'white', 'papayawhip', 'silver', 'gray', 'black', 'yellow', 'gold', 'orange', 'orangered', 'tomato',
	'pink', 'red', 'crimson', 'deeppink', 'magenta', 'violet', 'darkviolet', 'purple', 'brown', 'saddlebrown',
	'turquoise', 'limegreen', 'green', 'olive', 'darkkhaki', 'aqua', 'dodgerblue', 'blue', 'midnightblue',
	'darkslateblue',
];

// Lists for "Unicode Charaters" menu option, '|' character will make a new line for tables of symbols and letters
// Emoji are displayed automatically by 5 in a row

UnicodeSymbolsArray = [
	'←', '→', '↓', '↑', '↖', '↗', '↘', '↙', '↔', '↕', '⇦', '⇨', '⇩', '⇧', '⇒', '↵', '|',
	'☆', '★', '▲', '▼', '◐', '◒', '♥', '♦', '♠', '♣', '|',
	'○', '●', '⚪', '⚫', '□', '■', '▯', '▮', '░', '█', '|',
	'♪', '♫', '☑', '☒', '✡', '☪', '✝', '☭', '☮', '☯', '♿', '♕', '✉', '☏', '|',
	'©', '®', '™', '☼', '☾', '👍', '👎', '⁕', '✔', '❀', '⛔', '☢', '⚽', '|',
	'≠', '∞', '∆', '∫', '‰', '¥', '€'
];
UnicodeLettersArray = [
	'À', 'à', 'Á', 'á', 'Ā', 'ā', 'Ã', 'ã', 'Å', 'å', 'Ä', 'ä', 'Ą', 'ą', '|', 
	'Ć', 'ć', 'Ĉ', 'ĉ', 'Č', 'č', 'Ç', 'ç', 'Đ', 'đ', 'È', 'è', 'É', 'é', 'Ē', 'ē', 'Ę', 'ę', '|',
	'Ì', 'ì', 'Í', 'í', 'Ī', 'ī', 'I', 'ı', 'Ł', 'ł', 'Ň', 'ň', 'Ń', 'ń', '|',
	'Ò', 'ò', 'Ó', 'ó', 'Ō', 'ō', 'Ô', 'ô', 'Õ', 'õ', 'Ǫ', 'ǫ', 'Ö', 'ö', 'Ř', 'ř', 'Ś', 'ś', 'Š', 'š', '|',
	'Ù', 'ù', 'Ú', 'ú', 'Ū', 'ū', 'Ů', 'ů', 'Ü', 'ü', 'Ų', 'ų', 'Ỳ', 'ỳ', 'Ý', 'ý', '|',
	'Ž', 'ž', 'Ź', 'ź', 'Ż', 'ż', 'Æ', 'æ', 'ẞ', 'ß', 'α', 'β', 'γ', 'δ', 'ω', 'μ', 'π'
];
UnicodeEmojiArray = [
	'(>‿<)', '⋋_⋌', '(¬_¬)', '(●__●)', '(。^_・)ノ',
	'(✪‿✪)ノ', '◪_◪', '(⋟﹏⋞)', '(─‿─)', '(*^.^*)',
	'(•ө•)', '／(=∵=)＼', '(✿﹏✿)', '(｡◕‿‿◕｡)', '(ʘ‿ʘ)',
	'♥‿♥', '(ಠ_ಠ)', '(ⴲ﹏ⴲ)', '(╥﹏╥)', '(º﹃º)', 
	'(◕‿◕✿)', '♡´･ᴗ･`♡', '✿♥‿♥✿', '(╯︵╰,)', '━━━━━━★',
	' ╭∩╮(⋋‿⋌)', '♫♪˙‿˙♫♪', '┌( ಠ_ಠ)┘', 'ʕ•ᴥ•ʔ', 'ᶘᵒᴥᵒᶅ',
	'( ͡° ͜ʖ ͡°)', '¯\\_(ツ)_/¯', '(^_−)', '(－‸ლ)', '┬──┬',
	'(¦ꎌ[▓▓]'
];

// Additional layout themes/skins

ThemesArray = [
	['Cosmos',	DROPBOX + 'w75q2eqcj6p7cz4/cosmos.css'],
	['DarkCells',	DROPBOX + 'd6esvco1v8iu7ir/darkcells.css'],
	['FreshAir',	DROPBOX + 'lq14vuztxvjxqz5/freshair.css'],
	['Gray',	DROPBOX + '5z8d9rsu8hobz55/grey.css'],
	['Jungle',	DROPBOX + 'h5w9ecz1qu0ns7g/jungle.css'],
	['Postmodern',	DROPBOX + '9pp0l6x418mpch4/triangles.css'],
	['RedPlus',	DROPBOX + '9y42udvkaky59a0/redplus.css'],
	['Vichan',	DROPBOX + 'wpux079r6kfuk3k/vichan.css'],
	['White',	DROPBOX + '9qwgfgsth69c081/white.css'],
	['Winter',	DROPBOX + 'i50wsa5ghh9oc0s/winter.css'],
];

// Background pattern images

BackgroundsArray = [
	['Chequered',	DROPBOX + '9su405d9ise5e3v/chequered.png'],
	['Cosmos',	DROPBOX + 'qimrhicuocjutag/space.jpg'],
	['Damask',	DROPBOX + '8cl7edsnhh1ncun/damask.jpg'],
	['Denim',	DROPBOX + 'li4q7xkxj75ev6v/denim.jpg'],
	['Hibiscus',	DROPBOX + 'wd6wgisowlrxpfi/hibiscus.jpg'],
	['Orient',	DROPBOX + '0abr666cp2m7do7/orient.jpg'],
	['Tiles',	DROPBOX + 'wsypfghvl8s39dz/checked.png'],
	['Triangles',	DROPBOX + 'fptdsrtetoo7zoe/triangles.png'],
	['Zigzag',	DROPBOX + 'pptzler9mnf6ake/zigzag.jpg'],
];

// Google fonts

FontsArray = [
	'Arimo', 'Audiowide', 'Bitter', 'Cabin', 'Fira Sans Condensed', 'Inconsolata', 'Muli', 'Merriweather',
	'Marmelad', 'Noto Sans', 'Play', 'Quicksand', 'Raleway', 'Signika', 'Slabo 27px', 'Ubuntu'
];

// Buffer frequently used DOM elements

$body			= $("body");
$nav			= $("nav");
$chatwrap		= $("#chatwrap");
$chatheader		= $("#chatheader");
$userlisttoggle		= $("#userlisttoggle");
$userlist		= $("#userlist");
$messagebuffer		= $("#messagebuffer");
$chatline		= $("#chatline");
$videowrap		= $("#videowrap");
$videowrapHeader	= $("#videowrap-header");
$currenttitle		= $("#currenttitle");
$ytapiplayer		= $("#ytapiplayer");
$leftcontrols		= $("#leftcontrols");
$rightcontrols		= $("#rightcontrols");
$leftpane		= $("#leftpane");
$rightpane		= $("#rightpane");
$queue			= $("#queue");
$plmeta			= $("#plmeta");

/*
# List of global variables stored in localStorage/cookies, loaded dynamically (only when needed):
# ADDEDLINKS, CHATHISTORY, FAVLINKS, FAVSORTMODE, MASCOT, MASCOTPOS,
# MENTIONS, NOBACKDROP, NOTES, PLAYERHISTORY, SHORTHANDS

# List of session global variables loaded dynamically:
# BRIGHTNESS, FORTUNE, MEDIADBLOAD, NOTIFNUM, OEKAKILOAD, OETSTAMP, TTSTHROTTLE

# List of interval global variables loaded dynamically:
# ANTIAFK, BLINKBTN, CLEARING, MEDIACLOCK, PBAR, TIMELEFTCLOCK, UQI, UTCCLOCK
*/


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ---------- [SECTION 2] GLOBAL FUNCTIONS ---------- */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ***** Helper functions (in alphabetical order) ***** //

// Add personal chat notification

function addChatNotification(html) {
	setTimeout(function() {
		$('<div class="chat-msg- serverinfo"><span class="action scriptanswer">▮ ' + html + '</span></div>')
		  .appendTo($messagebuffer)
		if (SCROLLCHAT) scrollChat();
	}, 500);
}

// Change specific MOTD element after load

function alterMOTD() {
	if (MOTDAlteredElement != "" && MOTDAlteredHTML != "") $("#" + MOTDAlteredElement).html(MOTDAlteredHTML);
}

// Check if chat commands were abused

function checkCommandsAbuse() {
	var time = new Date().getTime();
	if (COMMANDSTSTAMPS.length > 4) {
		if (time - COMMANDSTSTAMPS[0] < 60000) {
			addChatNotification('Warning: abuse of the random-type commands (5 times per minute allowed)');
			COMMAND = false;
		}
		COMMANDSTSTAMPS.shift();
	}
	COMMANDSTSTAMPS.push(time);
}

// Create all user profile images panel

function createAvatarsPanel() {
	$avatarswrap = $('<div id="avatarswrap" class="col-lg-12 col-md-12 leftareas" />').insertAfter($notepadwrap);
	$avatarspanel = $('<div id="avatarspanel" class="well" />').appendTo($avatarswrap);
}

// Create panel of favourite media links

function createFavsPanel() {
 	var html = '';
	FAVSORTMODE = getOrDefault('SP_favsortmode', 'old');
	var arr = sortFavs(FAVSORTMODE);
	for (i in arr) {
		var id = arr[i]["id"];
		var link = arr[i]["link"];
		html += '<li class="queue_entry fav-' + id + '">';
		if (hasPermission("playlistadd")) {
			html += '<button class="btn btn-xs btn-default pull-left" title="Click to copy link" '
			     +  'onClick="pasteLink(\'' + link +'\')">Paste link to add</button>';
		}
		html += '<a target="_blank" href="' + link + '" class="qe_title">' + arr[i]["title"] +'</a>'
		     +  '<button class="btn btn-xs btn-danger pull-right" title="Remove from list" '
		     +  'onClick="removeFav(' + id + ')"><span class="glyphicon glyphicon-trash"></span></button>';
		var parsed = parseMediaLink(link);
		if (parsed["type"] == "yt") {
			html += '<button class="btn btn-default btn-xs pull-right" title="Click to preview" '
			     +  'onclick="previewVideo(\'' + parsed["id"] + '\')">'
			     +    '<i class="glyphicon glyphicon-film"></i> Preview</button>';
		}
		html += '<div class="qe_clear"></div></li>';
	}
	var len = arr.length;
	html += '<li id="freeslots-meta" class="queue_entry">'
	     +    '<button id="fixfavs-btn" class="btn btn-sm btn-default pull-right" '
	     +    'title="Reset/clear links if broken">Reset</button>'
	     +    '<div id="favs-sort" class="btn-group">'
	     +      '<button id="sort-old-btn" class="btn btn-sm btn-default" title="Sort: oldest first (default)">'
	     +        '<span class="glyphicon glyphicon-arrow-down"></span></button>'
	     +      '<button id="sort-new-btn" class="btn btn-sm btn-default" title="Sort: newest first">'
	     +        '<span class="glyphicon glyphicon-arrow-up"></span></button>'
	     +      '<button id="sort-az-btn" class="btn btn-sm btn-default" title="Sort alphabetically">A-Z</button>'
	     +    '</div><div id="freeslots">'
	     +      len + ' item' + ((len != 1) ? 's' : '') + ' | ' + (200 - len) + ' free slot'
	     +      ((len != 199) ? 's' : '') + ' available</div></li>';
	document.getElementById("queue-fav").innerHTML = html;
	$("#sort-" + FAVSORTMODE + "-btn").addClass('active');

	$("#sort-old-btn").on("click", function() {
		setOpt('SP_favsortmode', FAVSORTMODE = "old");
		createFavsPanel();
	});
	$("#sort-new-btn").on("click", function() {
		setOpt('SP_favsortmode', FAVSORTMODE = "new");
		createFavsPanel();
	});
	$("#sort-az-btn").on("click", function() {
		setOpt('SP_favsortmode', FAVSORTMODE = "az");
		createFavsPanel();
	});
	$("#fixfavs-btn").on("click", function() {
		var str = 'Do you really want to reset (clear) list of your favourites?\n'
			+ 'Note: use this feature if your links are broken and the list is not working properly.';
		if (confirm(str)) {
			$("#addtofav-btn").removeClass('btn-success disabled');
			$favsBtn.removeClass('btn-success active');
			$("#favscontrol").hide();
			setOpt('SP_favlinks_' + CLIENT.name, FAVLINKS = '[]');
		}
	});
}

// Create Media Database panel

function createMediaDatabase() {
	var num = 0;
	var item = 0;
	var count = 0;
	var dbcount = [];
	$dbwell.html('');
	for (i in MediaDatabase) {
		if (MediaDatabase[i][0] == "") {
			dbcount.push(count);
			count = 0;
			num++;
			var btn = $('<button id="cat-btn' + num + '" onclick="toggleDBCategory(\'' + num + '\')" />')
			  .addClass('btn btn-default btn-sm centered').appendTo($dbwell).html(MediaDatabase[i][1]);
			$('<div class="clearfix0" />').appendTo($dbwell);
			var ul = $('<ul id="cat-ul' + num + '" class="videolist" />').appendTo($dbwell).hide();
		} else {
			item++;
			count++;
			var link = MediaDatabase[i][0];
			var html = '<button class="btn btn-xs btn-default pull-left pastebtn" '
				 + 'title="Click to copy link" onClick="pasteLink(\'' + link +'\')">Paste link to add'
				 + '</button><a target="_blank" href="' + link + '" class="qe_title">'
				 + item + ' | ' + MediaDatabase[i][1] +'</a>';
			var parsed = parseMediaLink(link);
			if (parsed["type"] == "yt") {
				html += '<button class="btn btn-default btn-xs pull-right" title="Click to preview" '
				     +  'onclick="previewVideo(\'' + parsed["id"] + '\')">'
				     +    '<i class="glyphicon glyphicon-film"></i> Preview'
				     +  '</button><div class="clearfix0"></div>';
			}
			$('<li class="queue_entry" />').html(html).appendTo(ul);
		}
	}
	dbcount.push(count);
	var len = dbcount.length;
	for (var i = 1; i < len; i++) $("#cat-btn" + i).html($("#cat-btn" + i).html() + ' [' + dbcount[i] + ']');
}

// Create new modal window with selected title

function createModal(title) {
	outer = $('<div class="modal fade" />').appendTo($body).modal()
		  .on("hidden.bs.modal", function() {
			$body.removeClass('nobackdrop');
			$(this).remove();
		  });
	dialog = $('<div class="modal-dialog modal-dialog-nonfluid non-fluid" />').appendTo(outer);
	var html = '<button class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
		 + '<h4>' + title + '</h4>';
	modal = $('<div class="modal-content" />').appendTo(dialog)
		  .append('<div class="modal-header">' + html + '</div>');
	body = $('<div class="modal-body scrolled" />').appendTo(modal);
	var html = '<button id="close-modal-btn" type="button" data-dismiss="modal" class="btn btn-default">Close'
		 + '</button>';
	footer = $('<div class="modal-footer">' + html + '</div>').appendTo(modal);
	if (typeof NOBACKDROP === "undefined") NOBACKDROP = getOrDefault('SP_nobackdrop', false);
	if (NOBACKDROP) $(".modal, .modal-open, .modal-backdrop").addClass('nobackdrop');
}

// Create switchable tabs in modal window

function createModalTabs(arr, mw) {
	var group = $('<div class="group-modal btn-group" />').appendTo(body);
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		$('<div id="_c' + (i + 1) + '" class="gdiv" />').appendTo(body);
		$('<button id="_b' + (i + 1) + '" tab="' + (i + 1) + '" class="btn btn-sm btn-default gbtn" />')
		  .html(arr[i]).appendTo(group)
		  .on("click", function() {
			$(".gbtn").removeClass('btn-success');
			$(this).addClass('btn-success');
			var tab = $(this).attr('tab');
			VISIBLETAB[mw] = tab;
			$(".gdiv").hide();
			$("#_c" + tab).show();
		  });
	}
	$(".gdiv").hide();
	$("#_c" + VISIBLETAB[mw]).show();
	$("#_b" + VISIBLETAB[mw]).addClass('btn-success');
}

// Delete given element from array

function deleteFromArray(arr, el) {
	delete(arr[el]);
	var _arr = [];
	for (i in arr) {
		_arr.push(arr[i]);
	}
	return _arr;
}

// Enhance emotes displaying

function enhanceEmotes(elem) {
	elem.find("img.channel-emote").each(function() {
		$(this).attr('onClick', 'insertText("' + $(this).attr("title") + ' ")');
	});
}

// Execute chat text effects

function execTextEffects(html) {
	html = html.replace(/col:(.*?):/g, '<span style="color:$1" class="chatcolor">');
	TextFiltersArray = [
		{before:/:\+(.+?)\+:/g,	after:'<span style="font-weight:bold" class="txteffect">$1</span>'},
		{before:/:=(.+?)=:/g,	after:'<span style="font-style:italic" class="txteffect">$1</span>'},
		{before:/:@@(.+?)@@:/g,	after:'<span style="border-bottom:dotted 1px" class="txteffect">$1</span>'},
		{before:/:@(.+?)@:/g,	after:'<span style="text-decoration:underline" class="txteffect">$1</span>'},
		{before:/:-(.+?)-:/g,	after:'<span class="txteffect"><s>$1</s></span>'},
		{before:/:!(.+?)!:/g,	after:'<span style="font-size:0.8em" class="txteffect">$1</span>'},
		{before:/:\$(.+?)\$:/g,	after:'<span style="font-variant:small-caps" class="txteffect">$1</span>'},
		{before:/:%(.+?)%:/g,	after:'<span style="letter-spacing:2px" class="txteffect">$1</span>'},
		{before:/:#(.+?)#:/g,	after:'<span style="font-family:Menlo,Monaco,Consolas,\'Courier New\','
	 	 + 'monospace" class="txteffect">$1</span>'},
		{before:/:\^(.+?)\^:/g,
		 after:'<span style="outline:1px dashed #98ABB9; outline-offset:-5px; background-color:#556068; '
		 + 'box-shadow:2px 2px 2px #000; padding:5px; border-radius:2px; color:#EEE" class="txteffect">'
		 + '$1</span>'},
		{before:/:\/\/(.+?)\/\/:/g,
		 after:'<marquee behavior="scroll" scrollamount="18" class="txteffect">$1</marquee>'},
		{before:/:\/(.+?)\/:/g,
		 after:'<marquee behavior="alternate" scrollamount="15" class="txteffect">$1</marquee>'},
		{before:/\[b\](.+?)\[\/b\]/g,
		 after:'<span style="font-weight:bold" class="txteffect">$1</span>'},
		{before:/\[i\](.+?)\[\/i\]/g,
		 after:'<span style="font-style:italic" class="txteffect">$1</span>'},
		{before:/\[u\](.+?)\[\/u\]/g,
		 after:'<span style="text-decoration:underline" class="txteffect">$1</span>'},
		{before:/\[s\](.+?)\[\/s\]/g,		after:'<span class="txteffect"><s>$1</s></span>'},
		{before:/\[code\](.*?)\[\/code\]/g,	after:'<code>$1</code>'}
	];
	for (i in TextFiltersArray) html = html.replace(TextFiltersArray[i].before, TextFiltersArray[i].after);
	return html;
}

// Fix "#mainpage" padding-top if navigation bar has non-standard height

function fixMainPadding() {
	$("#mainpage").css('padding-top', ($nav.outerHeight() + 8) + 'px');
}

// Raw list of links from the playlist

function formatRawList() {
	var list = [];
	$queue.find("li").each(function() {
		list.push(formatURL($(this).data("media")));
	});
	return list.join(',');
}

// Get current time of playing media

function getTimePos() {
	if (PLAYER && PLAYER.yt && PLAYER.yt.getCurrentTime) return PLAYER.yt.getCurrentTime()
	else if (PLAYER && PLAYER.dm && PLAYER.dm.currentTime) return PLAYER.dm.currentTime
	else if (PLAYER && PLAYER.soundcloud && PLAYER.soundcloud.getPosition) {
		PLAYER.soundcloud.getPosition(function(t) {
			if (PLAYER.soundcloud) PLAYER.soundcloud.currentTime = t / 1000;
		});
		if (PLAYER.soundcloud) return PLAYER.soundcloud.currentTime;
	} else if (PLAYER && PLAYER.player && PLAYER.player.currentTime) return PLAYER.player.currentTime()
	else return -0.01;
}

// Get variable from URL of an external JS file

function getURLVar(v) {
	var link = CHANNEL.opts.externaljs.split("?");
	if (link.length < 2) return '';
	var vars = link[1].split("&");
	for (var i = 0; i < vars.length; i++) {
		var p = vars[i].split("=");
		if (p[0] == v) return p[1];
	}
	return '';
}

// Game "guess a number"

function guessNumber() {
	var rnd = Math.floor(Math.random() * 1000) + 1;
	var ans = 0;
	var n = 0;
	while (ans != rnd) {
		n++;
		ans = prompt("Guess a number between 1 and 1000 - attempt #" + n);
		if (ans != null) {
			if (ans > rnd) alert("Hint: less")
			else if (ans < rnd) alert("Hint: more")
			else {
				var pref = (n > 3) ? 'th' : ((n < 2) ? 'st' : (n < 3) ? 'nd' : 'rd');
				alert("Number " + rnd + " guessed in " + n + "" + pref + " attempt");
				socket.emit("chatMsg", {
					msg:"↳ " + CLIENT.name + " guessed a number in " + n + "" + pref + " attempt "
					  + "(type «!game» to play)",
					meta:{}
				});
				return;
			}
		} else {
			alert("Correct number: " + rnd);
			return;
		}
	}
}

// Handle behaviour after connection or log in

function handleLogin() {
	CHATHISTORY = getOrDefault('SP_chathistory_' + CLIENT.name, '{}');
	var obj = JSON.parse(CHATHISTORY);
	if (!(CHANNEL.name in obj)) obj[CHANNEL.name] = {"last":"", data:[]};
	obj[CHANNEL.name]["last"] = Date.now();
	if (obj[CHANNEL.name]["data"].length > 999) {
		obj[CHANNEL.name]["data"] = obj[CHANNEL.name]["data"].slice(-999);
	}
	obj[CHANNEL.name]["data"].push({"ts":Date.now(), "msg":'[connected]'});
	setOpt('SP_chathistory_' + CLIENT.name, CHATHISTORY = JSON.stringify(obj));
	CLIENT.name == "" ? $("#my-messages, #my-mentions").hide() : $("#my-messages, #my-mentions").show();
	NOTIFNUM = 0;
}

// Handle various options after media change

function handleMediaChange() {
	if ($queue.find(".queue_entry").length > 0) {
		var uid = $(".queue_active").data("media");
		if (['yt', 'vi', 'sc', 'gd', 'fi'].indexOf(uid.type) > -1 && uid.duration != "00:00") {
			$("#pls-3").show();
			var arr = {
				'yt':	'https://www.vidpaw.com/download/',
				'vi':	'https://www.vidpaw.com/download/?url=https://vimeo.com/',
				'sc':	'https://www.vidpaw.com/download/?url=',
				'gd':	'https://docs.google.com/file/d/',
				'fi':	'',
			}
			var link = arr[uid.type] + '' + uid.id;
			if (uid.type == "yt") $("#pls-3").attr('href', link)
			else if (uid.type == "vi") $("#pls-3").attr('href', link)
			else if (uid.type == "sc") $("#pls-3").attr('href', link)
			else if (uid.type == "gd") $("#pls-3").attr('href', link)
			else if (uid.type == "fi") $("#pls-3").attr('href', link);
		} else $("#pls-3").hide();
		var link = formatURL(uid);
		if (LASTPLAYED.length < 1 || LASTPLAYED[LASTPLAYED.length - 1]["link"] != link) {
			LASTPLAYED.push({"link":link, "title":uid.title});
			PLAYERHISTORY = getOrDefault('SP_playerhistory_' + CLIENT.name, '[]');
			var obj = JSON.parse(PLAYERHISTORY);
			var len = obj.length;
			var i = 0;
			while (i > -1 && i < len) {
				if (obj[i]["link"] == link) {
					obj = deleteFromArray(obj, i);
					i = -1;
				} else i++;
			}
			obj.push({"link":link, "title":uid.title});
			if (obj.length > 200) obj = obj.slice(-200);
			setOpt('SP_playerhistory_' + CLIENT.name, PLAYERHISTORY = JSON.stringify(obj));
		}
		if (TABMODE == 1) pageTitle();
	} else {
		$("#pls-3").hide();
		if (TABMODE == 1) pageTitle();
	}
	if (CustomTitleCaption != "") {
		$currenttitle.html($currenttitle.html().replace('Currently Playing:', CustomTitleCaption));
	}
	if ($videowrapHeader.hasClass('pbar')) {
		$videowrapHeader.css('background-size', '0% 100%');
		PREVTIME = 0;
	}
	if (HIDDENPLR) {
		$("#hidden-plr").remove();
		$videowrapHeader.show();
		$("#videowrap .embed-responsive-16by9").show();
		$("#plr-1").removeClass('activated');
		HIDDENPLR = false;
	}
	(NOPLAYER || LARGEPLAYER) ? $("#plr-13").hide() : $("#plr-13").show();
	FAVLINKS = getOrDefault('SP_favlinks_' + CLIENT.name, '[]');
	if ($queue.find(".queue_entry").length > 0 && FAVLINKS.indexOf(link) > -1) {
		$favsBtn.addClass('btn-success');
		$("#addtofav-btn").addClass('btn-success disabled');
	} else if ($queue.find(".queue_entry").length < 1) $("#addtofav-btn").addClass('disabled')
	else {
		$favsBtn.removeClass('btn-success');
		$("#addtofav-btn").removeClass('btn-success disabled');
	}
}

// Handle elements dependable on user rank

function handleRank() {
	CLIENT.rank > 2 ? $("#tools-btn, #autoclear-btn").show() : $("#tools-btn, #autoclear-btn").hide();
	hasPermission("chatclear") ? $("#clear-btn").show() : $("#clear-btn").hide();
	if (hasPermission("leaderctl")) {
		if ($("#chat-14").parent().css('display') == "none") $("#chat-15").parent().hide()
		else $("#chat-15").parent().show();
	}
	HIDEPLSBTNS ? queueButtons("hide") : queueButtons("show");
}

// Hide chat emotes

function hideEmotes(elem) {
	elem.find("img.channel-emote").each(function() {
		var span = $('<span class="span-emote">').attr('link', $(this).attr('src'))
		  .html($(this).attr('title')).insertAfter($(this));
		$(this).remove();
	});
}

// Insert and wrap code around selected text in chatline

function insertChatCode (t1, t2) {
	var l = document.getElementById("chatline");
	var a = l.selectionStart;
	var b = l.selectionEnd;
	var c = l.value;
	l.value = c.substring(0, a) + '' + t1 + '' + c.substring(a, b) + '' + t2 + '' + c.substring(b, c.length);
	$chatline.focus();
}

// Insert selected text to chatline

function insertText(str) {
	$chatline.val($chatline.val() + str).focus();
}

// Load external Media Database

function loadDatabase(link) {
	var div = $('<div class="centered" />').html('Loading external Media Database...').appendTo($dbwell);
	setTimeout(function() {
		if (typeof MediaDatabase === "undefined") {
			div.html('Database loading error or invalid link!');
			setTimeout(function() {$dbwell.find("div").remove()}, 10000);
			return;
		}
	}, 10000);
	$.getScript(link, function() {
		if (typeof MediaDatabase === "undefined") {
			var html = 'Database loading error or invalid link!';
			if (link.indexOf("www.dropbox.com") > -1) {
				html += ' Change "www.dropbox.com" to "dl.dropboxusercontent.com".';
			}
			div.html(html);
			setTimeout(function() {$dbwell.find("div").remove()}, 20000);
			return;
		}
		$dbBtn.addClass('jsloaded');
		$("#getdb-btn").show();
		createMediaDatabase();
		MEDIADBLOAD = true;
	});
}

// Show media current time when full-width title bar is enabled

function mediaClock() {
	var time = (!PLAYER || PLAYER.mediaType === undefined) ? -1 : getTimePos();
	var pos = "--:--";
	var tot = "--:--";
	if (time > -1) {
		pos = formatTime(Math.round(time));
		tot = formatTime(PLAYER.mediaLength);
		if (tot == "00:00") tot = "--:--";
	}
	$("#mediaclock").html(pos + " |&nbsp;");
	$("#totalclock").html(tot);
}

// Add premium info after media change

function nowPlaying() {
	if (PREMIUMNOTMODE < 3) return;
	if (NowPlaying == "") NowPlaying = 'Now playing';
	if (hasPermission("seeplaylist")) {
		var uid = $(".queue_active").data("media");
		var html = NowPlaying + ': ' + uid.title + ' [' + uid.duration + ']';
		if ($favsBtn.hasClass('btn-success')) html += ' <span class="glyphicon glyphicon-thumbs-up"></span>';
	} else if (PLAYER) {
		var html = NowPlaying + ': ';
		if (CustomTitleCaption != "") html += $("#currenttitle").html().replace(CustomTitleCaption, "")
		else html += $("#currenttitle").html().replace("Currently Playing: ", "");
		html += ' [' + formatTime(PLAYER.mediaLength) + ']';
	}
	if (!NOPLAYER) addChatNotification(html);
}

// Update user online time

function onlineTime() {
	ONLINETIME++;
}

// Page title

function pageTitle() {
	var title;
	if (TABMODE == 0) title = CHANNEL.opts.pagetitle
	else if (TABMODE == 1) {
		if (hasPermission("seeplaylist")) {
			if ($queue.find(".queue_entry").length > 0) title = $(".queue_active").data("media").title
			else title = '(nothing playing)';
		} else {
			if (CustomTitleCaption != "") title = $("#currenttitle").html().replace(CustomTitleCaption, "")
			else title = $("#currenttitle").html().replace("Currently Playing: ", "");
			if (!PLAYER) title = '(nothing playing)';
		}
	} else if (TABMODE == 2) title = '/' + CHANNELPATH + '/' + window.location.href.split("/").pop()
	else if (TABMODE == 3) {
		if (FOCUSED) title = '[' + CHATMSGNUM + '] chat message' + ((CHATMSGNUM != 1) ? 's' : '')
		else {
			title = '[' + CHATUNRNUM + ' | ' + CHATMSGNUM + '] unread message'
			      + ((CHATUNRNUM != 1) ? 's' : '');
		}
	}
	document.title = title;
	PAGETITLE = title;
}

// Paste link to "Add video from URL" input

function pasteLink(url) {
	if (!$("#showmediaurl").hasClass('active')) document.getElementById("showmediaurl").click();
	$("#mediaurl").val(url);
}

// Chat messages on player (NicoNico mode)

function playerText(text, classes) {
	if (!PLAYERTEXT || !$("#ytapiplayer")[0]) return;
	if (text !== null && typeof text === "string" && text.length > 0 && !(/^\$/.test(text))) {
		var size = Math.random() * 18 + 18;
		var ht = Math.floor(Math.random() * (Math.floor($("#ytapiplayer").height() / size)));
		var top = (size * ht) + 'px';
		var line = $('<div class="player-chat ' + classes + '" />').append(text)
		  .css({"visibility":"hidden", "top":top, "font-size":size + "px"});
		$("#player-chat-wrap").append(line);
		line.css("right", (0 - line.width()) + "px");
		var klass = text.length > 120 ? 'marq2' : 'marq';
		line.addClass(klass).css({"visibility":"visible", "right":$("#ytapiplayer").width() + "px"});
		line.find("span").attr('style', 'color:inherit !important');
	}
}

// Media DB help message

function prepareMediaDBHelp() {
	return '<code>MediaDatabase = [</code><br />'
	     + '<code>[\'\', \'Category name\'],</code><br />'
	     + '<code>[\'Link to media\', \'Media title\'],</code><br />'
	     + '<code>[\'Link to media\', \'Media title\'],</code><br />'
	     + '<code>[\'\', \'Category name\'],</code><br />'
	     + '<code>[\'Link to media\', \'Media title\'],</code><br />'
	     + '<code>[\'Link to media\', \'Media title\'],</code><br /><code>];</code><br /><br />'
	     + 'Copy sample code above and add your own items, set proper links and titles. '
	     + 'Leaving empty link will create a new category (like in the example above).<br />'
	     + '<span class="text-danger">Warning! Remember to change all apostrophes in titles and names '
	     +   'to <code>\\\'</code>, to avoid conflict with database structure.</span>';
}

// Preview YT video

function previewVideo(id) {
	createModal('Preview video');
	var player = $('<iframe id="previewFrame" width="500" height="281" frameborder="0" />').appendTo(body)
	  .attr('src', 'https://www.youtube.com/embed/' + id + '?wmode=transparent&enablejsapi')
	PLAYER.getVolume(function(vol) {
		CURRENTVOL = vol;
	});
	PLAYER.setVolume(0);
	$("#plr-btn").addClass('btn-danger');
	outer.on("hidden.bs.modal", function() {
		PLAYER.setVolume(CURRENTVOL);
		if (CURRENTVOL != 0) $("#plr-btn, #plr-9").removeClass('btn-danger');
		setTimeout(function() {volumeLvl()}, 500);
		outer.remove();
	});
}

// Process channel CSS

function processChannelCSS(bool) {
	if (bool == true) {
		if (CHANCSS != "") $('<style id="chancss" type="text/css">' + CHANCSS + '</style>').appendTo("head");
		if (CHANEXTERNALCSS != "") {
			$('<link id="chanexternalcss" href="' + CHANEXTERNALCSS + '" rel="stylesheet" />')
			  .appendTo("head");
		}
		if ($("#usertheme2").length > 0) $("head").append($("#usertheme2").detach());
		$("head").append($("#hardcss").detach());
		if ($("#usercss").length > 0) $("head").append($("#usercss").detach());
	} else {
		CHANCSS = $("#chancss").length > 0 ? $("#chancss").html() : '';
		CHANEXTERNALCSS = $("#chanexternalcss").length > 0 ? $("#chanexternalcss").attr('href') : '';
		$("#chanexternalcss, #chancss").remove();
	}
}

// Process various layout elements

function processLayoutElements() {
	var arr = JSON.parse(SHOWELEMENTS);
	var ids = {
		"header":"#nav-collapsible > ul > li:not(.layout-menu), #navbar-up, #navbar-unpin, #logoutform",
		"logo":".navbar-brand", "motd":"#motdrow", "announcements":"#announcements",
		"mainheader":"#chatheader, #videowrap-header", "playerlabels":"#videowrap-header .label", 
		"chatlabels":"#chatheader .label", "playercontrols":"#rightcontrols > div, #db-group",
		"playlistbtns":"#plcontrol > button", "playlistmenu":"#plcontrol > div",
		"playermenu":"#videocontrols > div", "playerbtns":"#videocontrols > button", "mediadbbtns":"#db-group",
		"chatcontrols":"#pollcontrols, #chatcontrols",
		"pollemotebtns":"#newpollbtn, #emotelistbtn", "colorsbtn":"#colors-btn",
		"chatbtns":"#chatcontrols > button", "chatmenus":"#chatcontrols > div", "plmeta":"#plmeta",
		"playlistlabels":"#plmeta .label", "footer":"#sitefooter, footer"
	}
	for (i in ids) {
		arr[i] == 0 ? $(ids[i]).addClass('hidden') : $(ids[i]).removeClass('hidden');
	}
	arr["logo"] == 1 ? $(ids["logo"]).addClass('logo') : $(ids["logo"]).removeClass('hidden logo');
}

// Update progress bar

function progressBar() {
	if (!PLAYER || PLAYER.mediaType === undefined) return;
	var a = 0;
	var b = Math.round(getTimePos());
	if (b != PREVTIME) a = b / PLAYER.mediaLength * 100;
	$videowrapHeader.css('background-size', a + '% 100%');
	PREVTIME = b;
}

// Rebuild playlist miniatures

function rebuildMiniatures() {
	if (!MINIATURES) return;
	$queue.find(".miniature").remove();
	queueMiniatures("show");
}

// Rebuild saved mentions

function rebuildSavedMentions(id) {
	var obj = JSON.parse(MENTIONS);
	if (id >= 0) {
		obj.splice(id, 1);
		setOpt('SP_mentions_' + CLIENT.name, MENTIONS = JSON.stringify(obj));
		$("#_b2").html('Saved Mentions [' + obj.length + ']');
	}
	$("#sort-txt2").html(SORTMODE.mentionsHistory == "new" ? 'newest' : 'oldest');
	obj = JSON.parse(MENTIONS);
	if (SORTMODE.mentionsHistory == "new") obj = obj.reverse();
	var len = obj.length;
	var html = '';
	for (i in obj) {
		var nr = (SORTMODE.mentionsHistory == "new") ? (parseFloat(i) + 1) : (len - i);
		var dl = (SORTMODE.mentionsHistory == "new") ? (len - i - 1) : i;
		html += '<tr><td><button class="btn btn-xs btn-default btn-danger pull-left modal-btn-xs" '
		     +    'title="Delete this mention" onclick="rebuildSavedMentions(' + dl + ')">'
		     +      '<span class="glyphicon glyphicon-trash"></span></button>' + nr + '.</td><td>'
		     +      obj[i]["date"] + ' @ /' + CHANNELPATH + '/' + obj[i]["room"] + '<br />'
		     +      obj[i]["msg"] + '</td></tr>';
	}
	$("#tbl-body2").html(html);
}

// Refresh player

function refreshPlayer() {
	PLAYER.mediaType = "";
	PLAYER.mediaId = "";
	socket.emit("playerReady");
}

// Refresh user avatars list

function refreshAvatarsList() {
	var html = '';
	$userlist.find(".userlist_item span:nth-child(2)").each(function() {
		var name = $(this).text();
		var img = findUserlistItem(name).data().profile.image;
		if (img != "") {
			html += '<img src="' + img + '" title="' + $(this).text() + '" ';
			if (name != CLIENT.name) {
				html += 'class="pointer" onClick="initPm(\'' + $(this).text() + '\')" ';
			}
			html += '/>';
		}
	});
	if (html == "") html = '<div>no profile images to display</div>';
	$avatarspanel.html(html);
}

// Remove selected link from favourites list

function removeFav(id) {
	FAVLINKS = getOrDefault('SP_favlinks_' + CLIENT.name, '[]');
	var arr = JSON.parse(FAVLINKS);
	var len = arr.length;
	var i = 0;
	while (i > -1 && i < len) {
		if (arr[i]["id"] == id) {
			var oldlink = arr[i]["link"];
			arr = deleteFromArray(arr, i);
			i = -1;
			if ($queue.find(".queue_entry").length < 1) {
				$("#favs-btn, #addtofav-btn").removeClass('btn-success');
			} else if (oldlink == formatURL($(".queue_active").data("media"))) {
				$favsBtn.removeClass('btn-success');
				$("#addtofav-btn").removeClass('btn-success disabled');
			}
		} else i++;
	}
	setOpt('SP_favlinks_' + CLIENT.name, FAVLINKS = JSON.stringify(arr));
	createFavsPanel();
}

// Scroll chat panel to top

function scrollChatToTop() {
	if ($body.hasClass('radio-mode')) {
		window.scrollTo(0, $("#videowrap-header").offset().top);
		return;
	}
	var ft = FULLTITLE ? $titlerow.offset().top : (LARGEPLAYER ? $videowrap.offset().top : $chatwrap.offset().top);
	if (NOPLAYER) ft = $chatwrap.offset().top;
	var pos = SINGLECOLUMN ? $chatwrap.offset().top : ft;
	var ht = SCROLLNAVBAR ? 0 : $nav.outerHeight();
	window.scrollTo(0, pos - ht - 2);
	$chatline.focus();
}

// Set additional (font and background pattern) CSS

function setAdditionalCSS() {
	$("#additionalcss").remove();
	var html = '';
	if (USERFONT != "") {
		html += '@import url("https://fonts.googleapis.com/css?family=' + USERFONT + '");\n'
		     +  'body, #messagebuffer {font-family:"' + USERFONT + '" !important}\n'
	}
	if (USERPATTERN != "") html += 'body {background-image:url("' + USERPATTERN + '") !important}\n';
	if (html != "") $('<style id="additionalcss" type="text/css" />').appendTo("head").html(html);
}

// Set player brightness

function setPlayerBrightness() {
	if (BRIGHTNESS == 0) return;
	$videowrap.find(".embed-responsive-16by9").append('<div id="plr-bright" class="maxwidth" />');
	var col = (BRIGHTNESS < 0) ? 0 : 255;
	var op = Math.abs(BRIGHTNESS) / 10;
	$("#plr-bright").css('background-color', 'rgba(' + col + ',' + col + ',' + col + ',' + op + ')');
}

// Show images directly on chat

function showImagesOnChat(elem) {
	elem.find(ImageExtensions).each(function() {
		var link = this.href;
		var block = false;
		if (link.indexOf("//i.imgur.com") > -1) {
			if (window.location.href.indexOf("//cytu.be/") > -1) {
				this.href = DROPBOX + 'bfp7d9u3ep06qad/blocked.png';
				block = true;
			}
		}
		var img = $('<img class="embedimg" title="Click to open in a new tab" />').attr('src', this.href)
		  .load(function() {
			if (SCROLLCHAT) scrollChat();
		  });
  		$(this).html(img).attr('href', link);
		if (block) {
			$(this).html($(this).html() + ' [[blocked by imgur, click to see]]');
			img.addClass('imgurblock');
		}
	});
}

// Show oekaki directly on chat

function showOekakiOnChat(elem) {
	elem.find('a[href$="?oekaki"]').each(function() {
		var link = this.href;
		var block = false;
		if (link.indexOf("//i.imgur.com") > -1) {
			if (window.location.href.indexOf("//cytu.be/") > -1) {
				this.href = DROPBOX + 'bfp7d9u3ep06qad/blocked.png';
				block = true;
			}
			var img = $('<img class="oekakiimg" title="Click to open in a new tab" />')
			  .attr('src', this.href)
			  .load(function() {
				if (SCROLLCHAT) scrollChat();
			  });
  			$(this).html(img).attr('href', link);
			if (block) {
				$(this).html($(this).html() + ' [[blocked by imgur, click to see]]');
				img.addClass('imgurblock');
			}
		}
	});
}

// Show videos directly on chat

function showVideosOnChat(elem) {
	elem.find(MediaExtensions).each(function() {
		var vid = $('<video class="embedvid" />').prop('loop', 'false')
		  .attr('src', this.href).attr('controls', '').load(function() {
			if (SCROLLCHAT) scrollChat();
		  }).on("click", function() {
			$(this).get(0).paused ? $(this).get(0).play() : $(this).get(0).pause();
			return false;
		  }).on("dblclick", function() {
			window.open($(this).attr('src'), "_blank");
			return false;
		  });
		if (AUTOPLAYEMBEDS) vid.attr('autoplay', '');
		$(this).html(vid);
	});
}

// Sort favourite links

function sortFavs(mode) {
	var arr = JSON.parse(getOrDefault('SP_favlinks_' + CLIENT.name, '[]'));
	if (mode == "old") arr.sort(function(a, b) {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)})
	else if (mode == "new") arr.sort(function(a, b) {return (b.id > a.id) ? 1 : ((a.id > b.id) ? -1 : 0)})
	else if (mode == "az") {
		arr.sort(function(a, b) {
			if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
			else if (b.title.toLowerCase() > a.title.toLowerCase()) return -1
			else return 0;
		});
	}
	return arr;
}

// Media time left on the title bar

function timeLeftClock() {
	var left;
	var time = (!PLAYER || PLAYER.mediaType === undefined) ? -1 : getTimePos();
	if (time < 0) left = "-:--"
	else left = formatTime(Math.round(PLAYER.mediaLength - time));
	$timeleftclock.html('[-' + left + ']');
}

// Toggle Media Database category

function toggleDBCategory(num) {
	var btn = $("#cat-btn" + num);
	if (btn.hasClass('btn-success')) $dbwell.find("#cat-ul" + num).hide()
	else {
		$("#db-well > ul").hide();
		$dbwell.find("#cat-ul" + num).show();
		$("#db-well > button").removeClass('btn-success');
	}
	btn.toggleClass('btn-success')
}

// Toggle selected element

function toggleElement(div) {
	$(div).css('display') == "none" ? $(div).show() : $(div).hide();
}

// Update media info in Radio Mode

function updateQueueInfo() {
	newplaylistheader.html($("#usercount").html());
	var html = '';
	var item = $(".queue_active");
	if (NowPlaying == "") NowPlaying = 'Now playing';
	html += '<div class="row"><div class="col-lg-2 col-sm-4">' + NowPlaying + ': </div>'
	     +    '<div class="col-lg-10 col-sm-8">' + (item.length > 0 ? item.data("media").title : '---')
	     +      ' [' + (item.length > 0 ? item.data("media").duration : '--:--') + ']</div></div>';
	var item = $(".queue_active").next();
	if (PlayingNext == "") PlayingNext = 'Playing next';
	html += '<div class="row"><div class="col-lg-2 col-sm-4">' + PlayingNext + ': </div>'
	     +    '<div class="col-lg-10 col-sm-8">' + (item.length > 0 ? item.data("media").title : '---')
	     +      ' [' + (item.length > 0 ? item.data("media").duration : '--:--') + ']</div></div>';
	newplaylist.html(html);
}

// Display UTC time

function UTCTime() {
	var date = new Date;
	var html = 'UTC: ' + date.getUTCHours() + ':'
		 + (date.getUTCMinutes() > 9 ? date.getUTCMinutes() : '0' + date.getUTCMinutes()) + ':'
		 + (date.getUTCSeconds() > 9 ? date.getUTCSeconds() : '0' + date.getUTCSeconds());
	$("#utc").html(html);
}

// Handle player volume level

function volumeLvl() {
	if (!PLAYER) return;
	PLAYER.getVolume(function(vol) {
		document.getElementById("volume-lvl").innerHTML = Math.round(vol * 100);
		if (vol == 0) {
			$("#plr-9").attr('title', 'Unmute player').addClass('btn-danger');
			$("#plr-btn").addClass('btn-danger');
		} else {
			$("#plr-9").attr('title', 'Mute player').removeClass('btn-danger');
			$("#plr-btn").removeClass('btn-danger');
		}
		if ($body.hasClass('radio-mode')) radioslider.slider('value', vol * 100);
	});
}


// ***** Functions from "Layout" menu (in order of appearance) ***** //

function compactLayout() {
	$body.addClass('fluid');
	$(".container-fluid").removeClass('container-fluid').addClass('container');
	$("#layout-3").addClass('activated');
	handleVideoResize();
	if (SCROLLCHAT) scrollChat();
}

function fluidLayout() {
	$body.removeClass('fluid');
	$(".container").removeClass('container').addClass('container-fluid');
	$("footer .container-fluid").removeClass('container-fluid').addClass('container');
	$("#layout-3").removeClass('activated');
	handleVideoResize();
	if (SCROLLCHAT) scrollChat();
}

function singleColumn() {
	if (LARGECHAT) document.getElementById("layout-7").click();
	if (LARGEPLAYER) document.getElementById("layout-8").click();
	$("#layout-7, #layout-8, #controlsrow, #playlistrow, #plr-13, #jukebox-btn").hide();
	$("#resize-video-smaller, #resize-video-larger").hide();
	$body.addClass('singlecolumn');
	var classes;
	var ratio = $(window).width() / $(window).height();
	if (ratio > 1.85) classes = 'col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2'
	else classes = 'col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1';
	$("#motdrow > div, #announcements > div, #drinkbar, #titlewrap").removeClass().addClass(classes);
	$("#videowrap, #chatwrap, #leftcontrols, #rightcontrols, #leftpane, #rightpane").removeClass()
	  .addClass(classes);
	$chatwrap.after($leftpane.detach()).after($leftcontrols.detach());
	$videowrap.after($rightpane.detach()).after($rightcontrols.detach());
	if (SYNCH) {
		$("#rightcontrols, #rightpane").addClass('margin-bottom-10');
		if (MOTDBOTTOM) $leftpane.addClass('margin-bottom-10');
	} else {
		$leftcontrols.addClass('margin-bottom-10');
		if (MOTDBOTTOM) $rightpane.addClass('margin-bottom-10');
	}
	if (FULLTITLE) {
		$videowrap.before($titlewrap.detach());
		$titlewrap.removeClass()
		  .addClass('col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1 margin-bottom-10');
	}
	$("#layout-4").addClass('activated');
	handleVideoResize();
	if (SCROLLCHAT) scrollChat();
}

function twoColumns() {
	$("#layout-7, #layout-8, #resize-video-smaller, #resize-video-larger").show();
	$("#controlsrow, #playlistrow, #plr-13, #jukebox-btn").show();
	if (NOPLAYER) $("#plr-13").hide();
	$body.removeClass('singlecolumn');
	$("#motdrow > div, #drinkbar, #titlewrap").removeClass().addClass('col-lg-12 col-md-12');
	$("#announcements > div").removeClass().addClass('col-md-12');
	$("#videowrap, #rightcontrols, #rightpane").removeClass().addClass("col-lg-7 col-md-7");
	$("#chatwrap, #leftcontrols, #leftpane").removeClass().addClass("col-lg-5 col-md-5");
	$("#leftcontrols, #rightcontrols").removeClass('margin-bottom-10');
	if (!MOTDBOTTOM) $("#leftpane, #rightpane, #playlistrow").removeClass('margin-bottom-10');
	if (FULLTITLE) {
		$titlerow.append($titlewrap.detach());
		$titlewrap.removeClass().addClass('col-lg-12 col-md-12');
	}
	if (SYNCH) {
		$("#controlsrow").append($rightcontrols.detach()).append($leftcontrols.detach());
		$("#playlistrow").append($rightpane.detach()).append($leftpane.detach());
	} else {
		$("#controlsrow").append($leftcontrols.detach()).append($rightcontrols.detach());
		$("#playlistrow").append($leftpane.detach()).append($rightpane.detach());
	}
	$("#layout-4").removeClass('activated');
	handleVideoResize();
	if (SCROLLCHAT) scrollChat();
}

function synchLayout() {
	$videowrap.after($chatwrap.detach());
	$leftcontrols.before($rightcontrols.detach());
	$rightpane.after($leftpane.detach());
	if (SINGLECOLUMN) {
		singleColumn();
		$("#leftcontrols").removeClass('margin-bottom-10');
		$("#rightcontrols, #rightpane").addClass('margin-bottom-10');
		if (MOTDBOTTOM) $leftpane.addClass('margin-bottom-10');
	}
	$("#layout-5").addClass('activated');
	if (SCROLLCHAT) scrollChat();
}

function nonSynchLayout() {
	$videowrap.before($chatwrap.detach());
	$leftcontrols.after($rightcontrols.detach());
	$rightpane.before($leftpane.detach());
	if (SINGLECOLUMN) {
		singleColumn();
		$("#rightcontrols, #rightpane").removeClass('margin-bottom-10');
		if (MOTDBOTTOM) $rightpane.addClass('margin-bottom-10')
		else {
			$("#leftcontrols").addClass('margin-bottom-10');
			$leftpane.removeClass('margin-bottom-10');
		}
	}
	$("#layout-5").removeClass('activated');
	if (SCROLLCHAT) scrollChat();
}

function bottomMOTD() {
	$("#resizewrap").before($("#motdrow").detach()).before($("#announcements").detach());
	$("#playlistrow").addClass('margin-bottom-10');
	if (SINGLECOLUMN && SYNCH) $leftpane.addClass('margin-bottom-10');
	$("#layout-6").addClass('activated');
}

function topMOTD() {
	$("#drinkbarwrap").before($("#motdrow").detach()).before($("#announcements").detach());
	$("#playlistrow").removeClass('margin-bottom-10');
	SYNCH ? $leftpane.removeClass('margin-bottom-10') : $rightpane.removeClass('margin-bottom-10');
	$("#layout-6").removeClass('activated');
}

function largeChat() {
	HIDDENVWRAP = true;
	if (LARGEPLAYER) document.getElementById("layout-8").click();
	$("#videowrap, #resize-video-smaller, #resize-video-larger, #rightcontrols, #plr-13, #jukebox-btn").hide();
	var classes;
	var ratio = $(window).width() / $(window).height();
	if (ratio > 1.85) classes = 'col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2'
	else classes = 'col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1';
	$("#chatwrap, #leftcontrols").removeClass().addClass(classes);
	chatHeight("compact");
	$("#layout-7").addClass('activated');
	var ht = $(window).height() - 100;
	if (ht > 500) ht -= 200;
	$("#messagebuffer, #userlist").height(ht);
	handleVideoResize();
	if (SCROLLCHAT) scrollChat();
}

function normalChat() {
	HIDDENVWRAP = false;
	$("#rightcontrols, #resize-video-smaller, #resize-video-larger, #plr-13, #jukebox-btn").show();
	NOPLAYER ? $("#plr-13").hide() : $("#videowrap").show();
	var match = document.getElementById("leftpane").className.match(/col-md-(\d+)/);
	var class1 = parseInt(match[1], 10);
	var class2 = 12 - parseInt(match[1], 10);
	$("#chatwrap, #leftcontrols").removeClass().addClass('col-md-' + class1 + ' col-lg-' + class1);
	$videowrap.removeClass().addClass('col-md-' + class2 + ' col-lg-' + class2);
	chatHeight("compact");
	$("#layout-7").removeClass('activated');
	handleVideoResize();
	if (SCROLLCHAT) scrollChat();
}

function largePlayer() {
	if (LARGECHAT) document.getElementById("layout-7").click();
	$("#chatwrap, #resize-video-smaller, #resize-video-larger, #leftcontrols").hide();
	$("#plr-13, #plr-14, #jukebox-btn").hide();
	var classes;
	var ratio = $(window).width() / $(window).height();
	if (ratio > 1.85) classes = 'col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2'
	else classes = 'col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1';
	$("#videowrap, #rightcontrols").removeClass().addClass(classes);
	$scrollToChat.html('To player ▴');
	$("#layout-8").addClass('activated');
	handleVideoResize();
	if (SCROLLCHAT) scrollChat();
}

function normalPlayer() {
	$("#chatwrap, #resize-video-smaller, #resize-video-larger, #leftcontrols").show();
	$("#plr-13, #plr-14, #jukebox-btn").show();
	if (NOPLAYER) $("#plr-13").hide();
	var match = document.getElementById("leftpane").className.match(/col-md-(\d+)/);
	var class1 = parseInt(match[1], 10);
	var class2 = 12 - parseInt(match[1], 10);
	$chatwrap.removeClass().addClass('col-md-' + class1 + ' col-lg-' + class1);
	$("#videowrap, #rightcontrols").removeClass().addClass('col-md-' + class2 + ' col-lg-' + class2);
	$scrollToChat.html('To chat ▴');
	chatHeight("compact");
	$("#layout-8").removeClass('activated');
	handleVideoResize();
	if (SCROLLCHAT) scrollChat();
}

function theatreMode() {
	if (LARGECHAT) normalChat();
	if (LARGEPLAYER) normalPlayer();
	if (SINGLECOLUMN) twoColumns();
	if (FULLTITLE) titlebarMode("compact");
	$(".poll-menu").remove();
	$("#chatwrap, #videowrap").show();
	$("nav, footer, #motdrow, #announcements, #drinkbarwrap, #chatheader .label, #userlist").hide();
	$("#userlisttoggle, #usercount, #videowrap-header, #controlsrow, .leftareas, #rightpane, #sitefooter").hide();
	$body.addClass('theatre-mode');
	$('<span id="theatre-void">&nbsp;</span>').appendTo($chatheader);
	$('<span id="theatre-emotes" class="label label-default pull-right pointer scroll-label" />')
	  .appendTo($chatheader).attr('title', 'Show Emote List').html('Emote List')
	  .on("click", function() {
		EMOTELISTMODAL.modal();
	  });
	$('<span id="theatre-side" class="label label-default pull-right pointer scroll-label" />')
	  .appendTo($chatheader).attr('title', 'Change Chat Side').html('Change Side')
	  .on("click", function() {
		if ($chatwrap.hasClass('tmode')) {
			$("#chatwrap, #videowrap, #pollwrap, #close-btn, #switch-btn, #tqueue").removeClass('tmode')
			  .addClass('tmode2');
		} else {
			$("#chatwrap, #videowrap, #pollwrap, #close-btn, #switch-btn, #tqueue").removeClass('tmode2')
			  .addClass('tmode');
		}
	  });
	$('<span id="theatre-queue" class="label label-default pull-right pointer scroll-label" />')
	  .appendTo($chatheader).attr('title', 'Show playlist').html('Queue')
	  .on("click", function() {
		$queue.addClass('theatre-mode');
		$tqueue = $('<div id="tqueue" />').appendTo($body).append($("#queue-parent").detach())
			    .addClass($chatwrap.hasClass('tmode') ? 'tmode' : 'tmode2');
		$tqueuecl = $('<span id="tqueue-close" class="label label-default pull-right pointer scroll-label" />')
			      .html('Close').insertAfter($scrollToCurrent)
			      .on("click", function() {
				$("#rightpane-inner").append($("#queue-parent").detach());
				$("#tqueue-close, #tqueue").remove();
				$queue.removeClass('theatre-mode');
			      })
		scrollQueue();
	  });
	$("#messagebuffer").addClass('tmode');
	$("#chatwrap, #videowrap, #pollwrap").addClass(!SYNCH ? 'tmode' : 'tmode2');
	EMOTESPREVPOS_ = EMOTESPREVPOS;
	if (EMOTESPREVPOS == "b-left") {
		$("#emote-view").removeClass('b-left').addClass('t-left bleft-old');
		EMOTESPREVPOS = "t-left";
	} else if (EMOTESPREVPOS == "b-right") {
		$("#emote-view").removeClass('b-right').addClass('t-right bright-old');
		EMOTESPREVPOS = "t-right";
	}
	if ($expandChat.hasClass('label-success')) chatHeight("compact");
	closebtn = $('<button id="close-btn" class="btn btn-danger pointer" title="Close Theatre Mode" />')
	  .addClass(!SYNCH ? 'tmode' : 'tmode2').appendTo("body")
	  .append('<span class="glyphicon glyphicon-new-window" />')
	  .on("click", function() {
		closeTheatreMode();
	  });
	switchbtn = $('<button id="switch-btn" class="btn btn-danger pointer" title="Switch to Radio Mode" />')
	  .addClass(!SYNCH ? 'tmode' : 'tmode2').appendTo("body")
	  .append('<span class="glyphicon glyphicon-headphones" />')
	  .on("click", function() {
		closeTheatreMode();
		radioMode();
	  });
	setOpt('SP_theatremode', true);
	if (SCROLLCHAT) scrollChat();
	$chatline.focus();
}

function closeTheatreMode() {
	$("#close-btn, #switch-btn").remove();
	if ($queue.hasClass('theatre-mode')) {
		$("#rightpane-inner").append($("#queue-parent").detach());
		$("#tqueue-close, #tqueue").remove();
		$queue.removeClass('theatre-mode');	
	}
	$("#theatre-void, #theatre-emotes, #theatre-side, #theatre-queue").remove();
	$("nav, footer, #motdrow, #announcements, #drinkbarwrap, #chatheader .label").show();
	$("#userlisttoggle, #usercount, #videowrap-header, #controlsrow, .leftareas, #rightpane, #sitefooter").show();
	$("body, #queue").removeClass('theatre-mode');
	processLayoutElements();
	$("#messagebuffer").removeClass('tmode');
	$("#chatwrap, #videowrap, #pollwrap").removeClass('tmode tmode2');
	if (CLIENT.rank < 2) $("#modflair").hide();
	if ($userlisttoggle.hasClass('glyphicon-chevron-down')) $userlist.show();
	if (!$("#oekaki-btn").hasClass('btn-success')) $oekakiwrap.hide();
	if (!$("#notepad-btn").hasClass('btn-success')) $notepadwrap.hide();
	if (FULLTITLE) titlebarMode("full");
	if (SINGLECOLUMN) singleColumn();
	if (LARGECHAT) largeChat();
	if (LARGEPLAYER) largePlayer();
	if (EMOTESPREVPOS_ = "b-left") {
		$("#emote-view").removeClass('t-left bleft-old').addClass('b-left');
		EMOTESPREVPOS = EMOTESPREVPOS_;
	} else if (EMOTESPREVPOS_ = "b-right") {
		$("#emote-view").removeClass('t-right bright-old').addClass('b-right');
		EMOTESPREVPOS = EMOTESPREVPOS_;
	}
	setOpt('SP_theatremode', false);
	handleVideoResize();
	scrollChatToTop();
	scrollQueue();
	if (SCROLLCHAT) {
		setTimeout(function() {
			scrollChat();
			SCROLLCHAT = true;
		}, 500);
	}
	$chatline.focus();
}

function radioMode() {
	HIDDENVWRAP = true;
	$("#player-chat-wrap").find(".marq, .marq2").remove();
	if (LARGECHAT) normalChat();
	if (LARGEPLAYER) normalPlayer();
	if (COMPACT) fluidLayout();
	if (SCROLLNAVBAR) navbarMode("static");
	if (FULLTITLE) {
		$videowrapHeader.detach().prependTo("#videowrap").removeClass('bigtitle');
		$titlerow.remove();
	}
	document.getElementById("plr-12").click();
	$("nav, footer, #motdrow, #announcements, #drinkbarwrap, #chatwrap").hide();
	$("#resize-video-smaller, #resize-video-larger, #videowrap .embed-responsive-16by9, #leftcontrols").hide();
	$("#newpollbtn, #oekaki-btn, #notepad-btn, #plcontrol, #plr-1, #plr-2, #plr-11, #plr-13, #plr-14").hide();
	$("#plr-15, #plr-16, #fullscreenbtn, #addopts-btn, #favs-btn, #jukebox-btn").hide();
	$("#plr-5").parent().parent().hide();
	$("#playlistrow, #leftpane, #oekakiwrap, #notepadwrap, #rightpane, #sitefooter").hide();
	if (NOPLAYER) $("#plr-btn").hide();
	$body.addClass('radio-mode');
	$videowrapHeader.addClass("radiotitle");
	$("#chatwrap, #videowrap, #leftcontrols, #rightcontrols, #rightpane").removeClass()
	  .addClass('col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2');
	if ($expandChat.hasClass('label-success')) chatHeight("compact");
	var html = 'You are listening to: /' + CHANNELPATH + '/' + window.location.href.split("/").pop();
	if (CHANNEL.opts.pagetitle != "") html += '<i> - ' + CHANNEL.opts.pagetitle + '</i>';
	radioheaderwrap = $('<div id="radioheaderwrap" class="col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2" />')
	  .prependTo("#main");
	radioheader = $('<div id="radioheader" />').appendTo(radioheaderwrap).html(html);
	if (PLAYER) {
		PLAYER.getVolume(function(vol) {
			CURRENTVOL = vol;
		});
	} else CURRENTVOL = 0;
	radioslider = $('<div id="radioslider" />').insertAfter("#videowrap-header").slider({
		range:"min", min:0, max:100, value:CURRENTVOL * 100,
		change: (function(event, ui) {
			if (PLAYER) PLAYER.setVolume(ui.value / 100);
		})
	});
	togglevidBtn = $('<button id="togglevid-btn" class="btn btn-default btn-sm" />').html('Player')
	  .prependTo("#videocontrols")
	  .on("click", function() {
		HIDDENVWRAP = !HIDDENVWRAP;
		if ($(this).hasClass('btn-success')) document.getElementById("plr-12").click();
		$("#videowrap .embed-responsive-16by9, #plr-1, #plr-11, #plr-15, #plr-16").toggle();
		$("#plr-5").parent().parent().toggle();
		if (!NOPLAYER) $("#fullscreenbtn").toggle();
		$(this).toggleClass('btn-success');
	  });
	toggleplBtn = $('<button id="togglepl-btn" class="btn btn-default btn-sm" />').html('Playlist')
	  .prependTo("#videocontrols")
	  .on("click", function() {
		$("#addopts-btn, #favs-btn, #playlistrow, #rightpane, #plcontrol").toggle();
		$(this).toggleClass('btn-success');
		scrollQueue();
	  });
	togglechatBtn = $('<button id="togglechat-btn" class="btn btn-default btn-sm" />').html('Chat')
	  .prependTo("#videocontrols")
	  .on("click", function() {
		if (!SYNCH) $chatwrap.insertAfter($videowrap);
		$("#chatwrap, #leftcontrols").toggle();
		$(this).toggleClass('btn-success');
		scrollChat();
		$chatline.focus();
	  });
	newplaylistwrap = $('<div id="newplaylistwrap" class="row" />').insertAfter("#controlsrow");
	newplaylistwrapper = $('<div class="col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2" />')
	  .appendTo(newplaylistwrap);
	newplaylistcontainer = $('<div class="panel panel-primary" />').appendTo(newplaylistwrapper);
	newplaylistheader = $('<div id="newplaylistheader" class="panel-heading" />').appendTo(newplaylistcontainer);
	newplaylist = $('<div id="newplaylist" class="panel-body" />').appendTo(newplaylistcontainer);
	closebtn = $('<button id="close-btn" class="btn btn-danger pointer tmode" title="Close Radio Mode" />')
	  .appendTo("body").append('<span class="glyphicon glyphicon-new-window" />')
	  .on("click", function() {
		closeRadioMode();
	  });
	switchbtn = $('<button id="switch-btn" class="btn btn-danger pointer tmode" title="Switch to Theatre Mode" />')
	  .appendTo("body").append('<span class="glyphicon glyphicon-th-list" />')
	  .on("click", function() {
		closeRadioMode();
		theatreMode();
	  });
	cssbtn = $('<button id="css-btn" class="btn btn-danger pointer" title="Theme & User CSS" />')
	  .appendTo("body").append('<span class="glyphicon glyphicon-adjust" />')
	  .on("click", function() {
		document.getElementById("layout-2").click();
	  });
	UQI = setInterval(function() {updateQueueInfo()}, 3000);
	setOpt('SP_radiomode', true);
	updateQueueInfo();
}

function closeRadioMode() {
	HIDDENVWRAP = false;
	$("#radioheaderwrap, #mediastats, #newplaylistwrap, #togglevid-btn").remove();
	$("#togglepl-btn, #togglechat-btn, #close-btn").remove();
	$("#switch-btn, #css-btn, #radioslider").remove();
	document.getElementById("plr-12").click();
	$("nav, footer, #motdrow, #announcements, #drinkbarwrap, #chatwrap").show();
	$("#resize-video-smaller, #resize-video-larger, #videowrap .embed-responsive-16by9, #leftcontrols").show();
	$("#oekaki-btn, #notepad-btn, #plcontrol, #plr-btn, #plr-1, #plr-2, #plr-11, #plr-13").show();
	$("#plr-14, #plr-15, #plr-16, #fullscreenbtn, #addopts-btn, #favs-btn, #jukebox-btn").show();
	$("#plr-5").parent().parent().show();
	$("#playlistrow, #leftpane, #rightpane, #sitefooter").show();
	if (hasPermission("pollctl")) $("#newpollbtn").show();
	if ($("#oekaki-btn").hasClass('btn-success')) $oekakiwrap.show();
	if ($("#notepad-btn").hasClass('btn-success')) $notepadwrap.show();
	$body.removeClass('radio-mode');
	$videowrapHeader.removeClass("radiotitle");
	if ($expandChat.hasClass('label-success')) $expandChat.removeClass('label-success');
	var match = document.getElementById("leftpane").className.match(/col-md-(\d+)/);
	var class1 = parseInt(match[1], 10);
	var class2 = 12 - parseInt(match[1], 10);
	$("#chatwrap, #leftcontrols").removeClass().addClass('col-md-' + class1 + ' col-lg-' + class1);
	$("#videowrap, #rightcontrols, #rightpane").removeClass().addClass('col-md-' + class2 + ' col-lg-' + class2);
	if (FULLTITLE) titlebarMode("full");
	if (SCROLLNAVBAR) navbarMode("scrollable");
	if (!SYNCH) $chatwrap.insertBefore($videowrap);
	if (SINGLECOLUMN) singleColumn();
	if (COMPACT) compactLayout();
	if (LARGECHAT) largeChat();
	if (LARGEPLAYER) largePlayer();
	setOpt('SP_radiomode', false);
	clearInterval(UQI);
	handleVideoResize();
	scrollChatToTop();
	scrollQueue();
	if (SCROLLCHAT) scrollChat();
	$chatline.focus();
}


// ***** Other layout functions (in alphabetical order) ***** //

function chatHeight(mode) {
	if (mode == "compact") {
		$expandChat.removeClass('label-success');
		var ht = $ytapiplayer.height();
		if (NOPLAYER || LARGECHAT || $("#plr-13").hasClass('activated')) ht = $(window).height() - 300;
		$("#messagebuffer, #userlist").height(ht);
		handleVideoResize();
		$(window).unbind('resize.expandchat');
	} else if (mode == "full") {
		$expandChat.addClass('label-success');
		if ($body.hasClass('radio-mode')) {
			var ht = $(window).height() - $videowrap.outerHeight() - $chatheader.outerHeight();
			ht -= $chatline.outerHeight();
			$("#messagebuffer, #userlist").height(ht - 12);
		} else {
			var ht = $(window).height() - $chatheader.outerHeight() - $chatline.outerHeight();
			if (!SCROLLNAVBAR) ht -= $nav.outerHeight();
			if (FULLTITLE && !SINGLECOLUMN) ht -= ($chatwrap.offset().top - $titlerow.offset().top);
			$("#messagebuffer, #userlist").height(ht - 6);
		}
		scrollChatToTop();
	}
	$chatline.focus();
}

function contributorsNames(mode) {
	if (mode == "hide") {
		$queue.find("li .contrib").each(function() {
			$(this).remove();
		});
	} else if (mode == "show") {
		$queue.find("li").each(function() {
			var contr = $(this).attr('title').replace('Added by: ', '');
			var time = $(this).find(".qe_time");
			time.find(".contrib").remove()
			time.html('<span class="contrib">' + contr + ' | </span>' + time.html());
		});
	}
}

function mediaTimeLeft(mode) {
	if (mode == "hide") {
		clearInterval(TIMELEFTCLOCK);
		$timeleftclock.remove();
	} else if (mode == "show") {
		$timeleftclock = $('<span id="timeleftclock">[--:--]</span>').insertAfter("#resize-video-larger");
		TIMELEFTCLOCK = setInterval(function() {timeLeftClock()}, 1000);
		timeLeftClock();
	}
}

function navbarMode(mode) {
	if (mode == "static") {
		var html = '<span class="glyphicon glyphicon-open" title="Make navigation bar scrollable"></span>';
		$(".navbar-fixed-top, #mainpage").removeClass('snav');
		$(window).bind("resize.mptop", function() {
			fixMainPadding();
		});
		fixMainPadding();
	} else if (mode == "scrollable") {
		var html = '<span class="glyphicon glyphicon-pushpin" title="Make navigation bar static"></span>';
		$(".navbar-fixed-top, #mainpage").addClass('snav');
		$(window).unbind("resize.mptop");
	}
	document.getElementById("navbar-unpin").innerHTML = html;
}

function playerMascot(mode) {
	if (mode == "hide") {
		$("#mascot").remove();
	} else if (mode == "show") {
		var arr = [
			['Swinging Miku', DROPBOX + 'slv73jrurvhkzpb/1.gif'],
			['Raving Miku', DROPBOX + 'k1f6a5h4anqbnz1/2.gif'],
			['Small Miku', DROPBOX + 'jl1984kqelw5s2n/3.gif'],
			['Rocking Miku', DROPBOX + 'r43pbglzdy2risu/4.gif'],
			['Emilia', DROPBOX + '4me121ir8yh4vr5/5.gif'],
			['Koneko', DROPBOX + 'je6owthtawuubkr/6.gif'],
			['Cirno', DROPBOX + 'ky3jex5hzvdezfl/7.gif'],
			['Haruhi', DROPBOX + '0slpa6al657bvj5/8.gif'],
			['Blue dress girl', DROPBOX + 'm2qfgwl2oc6ooha/9.gif'],
			['Braids girl', DROPBOX + 'u7tyknpaxxujlnd/10.gif'],
			['Flashing colours girl', DROPBOX + 'a9onwax8v1m7c4y/11.gif'],
			['Cheerleader girl', DROPBOX + 'tpr1ppaqxnxsrfe/12.gif']
		];
		MASCOT = getOrDefault('SP_mascot', '');
		if (MASCOT == "") MASCOT = arr[0][1];
		MASCOTPOS = getOrDefault('SP_mascotpos', 'b-left');
		$videowrap.find(".embed-responsive-16by9")
		  .append('<img id="mascot" class="' + MASCOTPOS + '" src="' + MASCOT + '" />');
		if (MASCOT == "custom") $("#mascot").attr('src', getOrDefault('SP_custommascoturl', ''));

		$("#mascot").on("click", function() {
			createModal('Mascot Settings');

			var html = '<form class="form-horizontal"><div class="form-group">'
				 +   '<label class="control-label col-sm-5">Mascot type</label>'
				 +   '<div class="col-sm-7 config-col"><select id="mascottype" class="form-control">';
			var len = arr.length;
			for (var i = 0; i < len; i++) {
				html += '<option value="' + arr[i][1] + '">' + arr[i][0] + '</option>'
			}
			html += '<option value="custom">(Custom mascot)</option>'
			     +  '</select></div></div><div class="form-group">'
			     +    '<label class="control-label col-sm-5">Custom mascot URL</label>'
			     +    '<div class="col-sm-7 config-col">'
			     +      '<input id="custommascoturl" class="form-control" type="text" '
			     +      'placeholder="Enter image URL" />'
			     +  '</div></div><div class="form-group">'
			     +    '<label class="control-label col-sm-5">Position on the player</label>'
			     +    '<div class="col-sm-7 config-col">'
			     +      '<select id="mascotpos" class="form-control">'
			     +        '<option value="b-left">bottom left</option>'
			     +        '<option value="b-center">bottom center</option>'
			     +        '<option value="b-right">bottom right</option>'
			     +        '<option value="t-left">top left</option>'
			     +        '<option value="t-right">top right</option>'
			     +        '<option value="c-center">center</option></select>'
			     +  '</div></div></form>';
			body.html(html);
			if (MASCOT != "custom") $("#custommascoturl").parent().parent().hide();

			$("#mascottype").val(MASCOT)
			  .on("change", function() {
				MASCOT = $(this).val();
				$("#mascot").attr('src', MASCOT);
				if (MASCOT != "custom") $("#custommascoturl").parent().parent().hide()
				else {
					$("#custommascoturl").parent().parent().show();
					$("#mascot").attr('src', $("#custommascoturl").val());
				}
				setOpt('SP_mascot', MASCOT);
			  });
			$("#custommascoturl").val(getOrDefault('SP_custommascoturl', ''))
			  .on("change blur", function() {
				$("#mascot").attr('src', $(this).val());
				setOpt('SP_custommascoturl', $(this).val());
			  });
			$("#mascotpos").val(MASCOTPOS)
			  .on("change", function() {
				MASCOTPOS = $(this).val();
				$("#mascot").removeClass().addClass(MASCOTPOS);
				setOpt('SP_mascotpos', MASCOTPOS);
			});

			$('<button class="btn btn-default pull-left">Hide Mascot</button>').prependTo(footer)
			  .on("click", function() {
				if (SHOWMASCOT) {
					$(this).html('Show Mascot');
					playerMascot("hide");
				} else {
					$(this).html('Hide Mascot');
					playerMascot("show");
				}
				setOpt('SP_showmascot', SHOWMASCOT = !SHOWMASCOT);
				$("#plr-17").toggleClass('activated');
			  });
		});
	}
}

function progressBarMode(mode) {
	if (mode == "show") {
		$videowrapHeader.addClass('pbar');
		PBAR = setInterval(function() {progressBar()}, 2000);
		progressBar();
	} else if (mode == "hide") {
		clearInterval(PBAR);
		$videowrapHeader.removeClass('pbar').css('background-size', '0% 100%');
	}
}

function queueButtons(mode) {
	if (mode == "show") {
		if (HIDEPLSBTNS) {
			if (hasPermission("playlistjump") || hasPermission("settemp")
			   || hasPermission ("playlistdelete")) {
				if (USEROPTS.qbtn_hide) {
					var str = 'Warning! You have disabled playlist buttons globally.\n'
						+ 'You can change it in your user preferences on the top navigation '
						+ 'bar ("Options" > "Playback").'
					alert(str);
				}
				$queue.removeClass('nobuttons');
			} else alert('You have no permission to display playlist buttons on this channel.');
		}
	} else if (mode == "hide") $queue.addClass('nobuttons');
}

function queueMiniatures(mode) {
	if (mode == "hide") $queue.find(".miniature").remove()
	else if (mode == "show") {
		$queue.find("li").each(function() {
			var link = '';
			var media = $(this).data("media");
			if (media.type == "yt") link = 'http://img.youtube.com/vi/' + media.id + '/1.jpg'
			else if (media.type == "dm") link = 'http://www.dailymotion.com/thumbnail/video/' + media.id;
			if (link != "") {
				if (USEROPTS.qbtn_idontlikechange) {
					$(this).append('<img src="' + link + '" class="miniature" />');
				} else {
					$(this).find(".btn-group")
					  .before('<img src="' + link + '" class="miniature" />');
				}
			}
		});
		scrollQueue();
	}
}

function queueMode(mode) {
	if (mode == "default") $queue.removeClass('numbered')
	else if (mode == "numbered") $queue.addClass('numbered');
}

function queueScrollbar(mode) {
	if (mode == "hide") $queue.addClass('noscroll')
	else if (mode == "show") $queue.removeClass('noscroll');
}

function titlebarMode(mode) {
	if (mode == "full") {
		$titlerow = $('<div id="titlerow" class="row" />').insertBefore("#main");
		$titlewrap = $('<div id="titlewrap" class="col-lg-12 col-md-12" />').appendTo($titlerow)
		  .html($videowrapHeader.detach().addClass('bigtitle'));
		$("#plr-2").addClass('activated');
		if (SINGLECOLUMN) {
			$videowrap.before($titlewrap.detach());
			$titlewrap.removeClass()
			  .addClass('col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1 margin-bottom-10');
		}
		var html = '<span id="totalclock" class="pull-right">--:--</span>'
			 + '<span id="mediaclock" class="pull-right">--:-- |&nbsp;</span>';
		$mediastats = $('<p id="mediastats" />').prependTo($videowrap).html('&nbsp;' + html);
		MEDIACLOCK = setInterval(function() {mediaClock()}, 1000);
		mediaClock();
	} else if (mode == "compact") {
		$videowrapHeader.detach().prependTo("#videowrap").removeClass('bigtitle');
		$("#plr-2").removeClass('activated');
		$("#titlerow, #titlewrap, #mediastats").remove();
		clearInterval(MEDIACLOCK);
	}
}

function userlistSide(mode) {
	if (mode == "left") {
		$("#chat-f4").removeClass('activated');
		$userlist.removeClass('pull-right');
		$body.removeClass('synchtube');
	} else if (mode == "right") {
		$("#chat-f4").addClass('activated');
		$userlist.addClass('pull-right');
		$body.addClass('synchtube');
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ---------- [SECTION 3] USER INTERFACE ---------- */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Add temporary videowrap for "Remove the video player" or "Remove Video" mode

if (!$("#videowrap")[0]) {
	NOPLAYER = true;
	$("#chatwrap, #chatline").removeClass('col-lg-12 col-md-12').addClass('col-lg-5 col-md-5');
	$videowrap = $('<div id="videowrap" class="col-lg-7 col-md-7" />').insertAfter("#chatwrap");
	var title = PL_CURRENT > -1 ? $(".queue_active").data("media").title : 'nothing playing';
	$videowrapHeader = $('<p id="videowrap-header" />').appendTo($videowrap);
	var html = '<span class="glyphicon glyphicon-minus pointer" id="resize-video-smaller" '
		 + 'title="Make the video smaller"></span><span class="glyphicon glyphicon-plus pointer" '
		 + 'id="resize-video-larger" title="Make the video smaller"></span>'
		 + '<span id="currenttitle">Currently Playing: ' + title + '</span>';
	$videowrapHeader.html(html);
	playerwrap = $('<div id="playerwrap" class="embed-responsive embed-responsive-16by9" />')
	  .appendTo($videowrap);
	$ytapiplayer = $('<iframe id="ytapiplayer" class="embed-responsive-item" frameborder="0" />')
	  .attr({title:'YouTube video player', allowfullscreen:'1'}).appendTo(playerwrap);
	var html = '<div id="noplayer-alert" class="alert alert-danger">'
		 +   '<button class="close pull-right">×</button><strong>No Player</strong><br />'
		 +   'According to your global User Preferences, video player is removed. '
		 +   'Select a button below, to continue hiding player or show player in this session.<br /><br />'
		 +   '</div>';
	$('<div class="col-md-12" />').appendTo(playerwrap).html(html);
	staybtn = $('<button id="stay-btn" class="btn btn-default btn-sm btn-danger" />')
	  .appendTo("#noplayer-alert").html('Stay in "Remove player" mode')
	  .on("click", function() {
		document.getElementById("plr-11").click();
		document.getElementById("plr-14").click();
	});
	videobtn = $('<button id="video-btn" class="btn btn-default btn-sm btn-success pull-right" />')
	  .appendTo("#noplayer-alert").html('Load video player')
	  .on("click", function() {
		NOPLAYER = false;
		$("#noplayer-alert").remove();
		refreshPlayer();
	});
}


// Undo HD layout if single column enabled

if (_SINGLECOLUMN) undoHDLayout();

// "Glued" layout (if enabled)

if (GLUELAYOUT) $body.addClass('glued');

// Navigation bar transparency (if enabled)

if (TRANSPARENTNAV) $nav.addClass('transparent');

// Alter brand link to channel URL, instead of homepage

$("nav .navbar-brand").attr('href', document.URL);


// Profile image and additional options in "Account" menu

var ul = $('#nav-collapsible a:contains("Account")').parent().find("ul");
if (CLIENT.rank > 0) {
	var li = $('<li class="centered" />').prependTo(ul);
	var img = findUserlistItem(CLIENT.name).data().profile.image;
	if (img == "") img = DROPBOX + 'xor4ykvsgrzys3d/noavatar.png';
	$('<a href="/account/profile" />').html('<img id="useravatar" src="' + img + '" title="' + CLIENT.name + '" />')
	  .appendTo(li);
}
$('<li class="divider" />').appendTo(ul);
var html = '<a href="javascript:void(0)"><span class="glyphicon glyphicon-calendar nav-cog"></span>My Chat History</a>';
$('<li id="my-chat"></li>').appendTo(ul).html(html);
var html = '<a href="javascript:void(0)"><span class="glyphicon glyphicon-file nav-cog"></span>My Messages</a>';
$('<li id="my-messages"></li>').appendTo(ul).html(html);
var html = '<a href="javascript:void(0)"><span class="glyphicon glyphicon-envelope nav-cog"></span>My Mentions</a>';
$('<li id="my-mentions"></li>').appendTo(ul).html(html);


// Navigation bar extended "Layout" menu

var html = '<li><a id="layout-1">Premium Settings</a></li>'
	 + '<li><a id="layout-2" class="opt"><span class="glyphicon glyphicon-ok"></span>Theme & User CSS</a></li>'
	 + '<li class="divider"></li>'
	 + '<li><a id="layout-3" class="opt"><span class="glyphicon glyphicon-ok"></span>Compact Layout</a></li>'
	 + '<li><a id="layout-4" class="opt"><span class="glyphicon glyphicon-ok"></span>Single Column Layout</a></li>'
	 + '<li><a id="layout-5" class="opt"><span class="glyphicon glyphicon-ok"></span>Old Synchtube Layout</a></li>'
	 + '<li><a id="layout-6" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Channel MOTD on Bottom</a></li>'
	 + '<li class="divider"></li>'
	 + '<li><a id="layout-7" class="opt"><span class="glyphicon glyphicon-ok"></span>Large Chat, No Player</a></li>'
	 + '<li><a id="layout-8" class="opt"><span class="glyphicon glyphicon-ok"></span>Large Player, No Chat</a></li>'
	 + '<li class="divider"></li>'
	 + '<li><a id="layout-9"><span class="glyphicon glyphicon-th-list"></span>Theatre Mode</a></li>'
	 + '<li><a id="layout-10"><span class="glyphicon glyphicon-headphones"></span>Radio Mode</a></li>';
$layoutMenu = $('#nav-collapsible a[onclick*="chatOnly"]').parent().parent().addClass('noclose').html(html)
  .parent().find("> a").prepend('<span class="glyphicon glyphicon-cog nav-cog layout-cog" />')
  .parent().addClass('layout-menu');


// Mentions indicator

NOTIFNUM = 0;
var html = '<span class="glyphicon glyphicon-envelope nav-cog text-danger"></span>'
	 + '<strong>0</strong>';
var ul = $('#nav-collapsible a:contains("Account")').parent().parent();
$notifier = $('<li id="notifier" title="Unchecked mentions" />').appendTo(ul).hide()
	      .html('<a href="javascript:void(0)">' + html + '</a>')
	      .on("click", function() {
		$("#my-mentions").trigger("click");
		$("#_b1").trigger("click");
	      });


// Navigation bar icons

$navbarUp = $('<div id="navbar-up" class="pull-right pointer navbar-text" />').appendTo("#nav-collapsible")
  .html('<span class="glyphicon glyphicon-chevron-up" title="Collapse navigation bar"></span>');
$navbarUnpin = $('<div id="navbar-unpin" class="pull-right pointer navbar-text" />').appendTo("#nav-collapsible")
  .html('<span class="glyphicon glyphicon-open" title="Make navigation bar scrollable"></span>');


// Optional custom navigation bar welcome text

if (CustomWelcomeText != "" && CLIENT.rank > 0) {
	$("#welcome").html($("#welcome").html().replace(/Welcome/, CustomWelcomeText));
}

// Collpse MOTD on load (if enabled)

if (COLLAPSEMOTD && $("#motd").css("display") != "none") document.getElementById("togglemotd").click();

// Optional Premium announcement

if (AnnouncementHTML != "") makeAlert('Channel Administrator Message', AnnouncementHTML).appendTo("#announcements");

// Full-width title (if enabled)

if (FULLTITLE) titlebarMode("full");

// Disable "New Messages Below" notification (if enabled)

if (HIDEINDICATOR) $chatwrap.addClass('noindicator');


// Chat header labels

$("#modflair").detach().prependTo($chatheader);
$scrollTop = $('<span id="scroll-top" class="label label-default pull-right pointer scroll-label" />')
  .insertBefore($userlisttoggle).attr('title', 'Scroll chat panel to top').html('Top ▴');
$scrollToPl = $('<span id="scroll-to-pl" class="label label-default pull-right pointer scroll-label" />')
  .insertBefore($userlisttoggle).attr('title', 'Scroll to playlist').html('Pl ▾');
$expandChat = $('<span id="expand-chat" class="label label-default pull-right pointer scroll-label" />')
  .insertBefore($userlisttoggle).attr('title', 'Toggle chat expanding')
  .html('<span class="glyphicon glyphicon-resize-vertical"></span>');


// Autohide chat and userlist scrolls (if enabled)

if (CHATHIDESCROLL) $("#messagebuffer, #userlist").addClass('autoscroll');

// Collapse userlist on load (if enabled)

if (COLLAPSEULIST && $("#userlist").css("display") != "none") document.getElementById("usercount").click();

// Separate userlist items (if enabled)

if (SEPARATEULIST) $userlist.addClass('separate');

// Better search query placeholder

$("#library_query").attr('placeholder', 'Search query (leave empty to display all channel library)');

// Default uncheck "Add as temporary" checkbox for users with permission

if (hasPermission("settemp")) $(".add-temp").prop('checked', false);


// Optional Media Database button and panel

if (typeof MediaDatabase !== "undefined" || getURLVar("db") != "" || (EXECDB && CUSTOMDBURL != "")) {
	dbgroup = $('<div id="db-group" class="btn-group pull-right" />').appendTo("#addfromurl .checkbox");
	$dbBtn = $('<button id="db-btn" class="btn btn-sm btn-default" title="Toggle Media Database" />')
	  .html('Media Database').appendTo(dbgroup)
	  .on("click", function() {
		if (typeof MEDIADBLOAD === "undefined") MEDIADBLOAD = false;
		if (!MEDIADBLOAD) {
			if (!$(this).hasClass('jsloaded') && EXECDB && CUSTOMDBURL != "") loadDatabase(CUSTOMDBURL)
			else if (!$(this).hasClass('jsloaded') && getURLVar("db") != "") loadDatabase(getURLVar("db"))
			else {
				$("#getdb-btn").show();
				createMediaDatabase();
				MEDIADBLOAD = true;
			}
		}
		$(this).toggleClass('btn-success');
		if ($(this).hasClass('btn-success')) {
			if (hasPermission("playlistadd")) $("#db-well").find(".pastebtn").show()
			else $("#db-well").find(".pastebtn").hide();
		}
		toggleElement($dbwell);
	  });
	$('<button id="dbreload-btn" class="btn btn-sm btn-default" />').appendTo(dbgroup)
	  .attr('title', 'Hide/reload data (if channel seems overloaded)')
	  .append('<span class="glyphicon glyphicon-refresh" />')
	  .on("click", function() {
		$dbBtn.removeClass('btn-success');
		$dbwell.hide().html('');
		MEDIADBLOAD = false;
	  });
	$('<button id="getdb-btn" class="btn btn-sm btn-default" />').appendTo(dbgroup)
	  .attr('title', 'Retrieve database code').append('<span class="glyphicon glyphicon-list-alt" />')
	  .on("click", function() {
		createModal('Media Database Code');
		var html = 'MediaDatabase = [\n';
			for (i in MediaDatabase) {
				title = MediaDatabase[i][1].replace(/'/g, '\\\'');
				html += '[\'' + MediaDatabase[i][0] + '\', \'' + title + '\']\n';
			}
		html += '];';
		var data = $('<textarea rows="10" class="form-control" />').val(html).appendTo(body);
	  });
	if (typeof MediaDatabase === "undefined") $("#getdb-btn").hide();
    	$dbwrap = $('<div id="db-wrap" class="row" />').appendTo("#addfromurl");
    	$dbwell = $('<div id="db-well" class="col-lg-12 col-md-12" />').appendTo($dbwrap).hide();
}


// Playlist options dropdown menu

var html = '<button id="pls-btn" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" '
	 + 'title="Playlist controls"><span class="glyphicon glyphicon-cog"></span> ▾</button>'
	 + '<ul id="pls-menu" class="dropdown-menu noclose">'
	 +   '<li group="1"><a id="pls-1">List of Last Media</a></li>'
	 +   '<li group="1"><a id="pls-2">Contributors Ranking</a></li>'
	 +   '<li group="1"><a id="pls-3" target="_blank">Download Current Item</a></li>'
	 +   '<li class="divider" group="1"></li>'
	 +   '<li group="1"><a id="pls-4" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Numbered Playlist Items</a></li>'
	 +   '<li group="1"><a id="pls-5" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Show Contributors Usernames</a></li>'
	 +   '<li class="divider" group="1"></li>'
	 +   '<li class="centered" group="1"><a id="pls-6"><span class="glyphicon glyphicon-chevron-down"></span>'
	 +     '</a></li>'
	 +   '<li class="centered" group="2"><a id="pls-7"><span class="glyphicon glyphicon-chevron-up"></span>'
	 +     '</a></li><li class="divider" group="2"></li>'
	 +   '<li group="2"><a id="pls-8" class="opt"><span class="glyphicon glyphicon-ok">'
	 +     '</span>Filter Playlist by Username</a></li>'
	 +   '<li class="divider" group="2"></li>'
	 +   '<li group="2"><a id="pls-9" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Hide Playlist Scrollbar</a></li>'
	 +   '<li group="2"><a id="pls-10" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Show Miniatures</a></li>'
	 +   '<li group="2"><a id="pls-11" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Hide Buttons</a></li></ul>';
$plsbtnouter = $('<div id="plsbtn-outer" class="btn-group" />').appendTo("#plcontrol").html(html);

if (PLSNUMBERS) {
	$("#pls-4").addClass('activated');
	queueMode("numbered");
}
if (SHOWCONTRIBS) {
	$("#pls-5").addClass('activated');
	contributorsNames("show");
}
if (PLSNOSCROLL) {
	$("#pls-9").addClass('activated');
	queueScrollbar("hide");
}
if (MINIATURES) {
	queueMiniatures("show");
	$("#pls-10").addClass('activated');
	var len = $queue.find("li").length;
	if (len > 500) setTimeout(function() {rebuildMiniatures()}, 7500);
	if (len > 1000) setTimeout(function() {rebuildMiniatures()}, 15000);
	scrollQueue();
}
if (HIDEPLSBTNS) {
	queueButtons("hide");
	$("#pls-11").toggleClass('activated');
}
$("#pls-menu").find("li[group=2]").hide();

if (!hasPermission("seeplaylist")) $plsbtnouter.hide();


// Player options dropup menu

var html = '<button id="plr-btn" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" '
	 + 'title="Player controls"><span class="glyphicon glyphicon-cog"></span> ▴</button>'
	 + '<ul id="plr-menu" class="dropdown-menu dropdown-menu-right noclose">'
	 +   '<li group="1"><a id="plr-1" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Hide Player Until Next</a></li>'
	 +   '<li class="divider" group="1"></li>'
	 +   '<li group="1"><a id="plr-2" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Full-width Title Bar</a></li>'
	 +   '<li group="1"><a id="plr-3" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Hide Progress Bar</a></li>'
	 +   '<li group="1"><a id="plr-4" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Show Time Left</a></li>'
	 +   '<li class="divider" group="1"></li>'
	 +   '<li class="btngr-padding" group="1"><div class="btn-group">'
	 +     '<button id="plr-5" class="btn btn-sm btn-default" title="Brightness down">'
	 +       '<span class="glyphicon glyphicon-minus"></span></button>'
	 +     '<button id="plr-6" class="btn btn-sm btn-default" title="Reset brightness">'
	 +       '<span class="glyphicon glyphicon-refresh"></span> light: <span id="light-level">0%</span>'
	 +     '<button id="plr-7" class="btn btn-sm btn-default" title="Brightness up">'
	 +       '<span class="glyphicon glyphicon-plus"></span></button></div></li>'
	 +   '<li class="divider" group="1"></li>'
	 +   '<li class="volume btngr-padding" group="1"><div class="btn-group">'
	 +     '<button id="plr-8" class="btn btn-sm btn-default" title="Volume down">'
	 +       '<span class="glyphicon glyphicon-minus"></span></button>'
	 +     '<button id="plr-9" class="btn btn-sm btn-default" title="Mute player">'
	 +       '<span class="glyphicon glyphicon-volume-up"></span> '
	 +       'volume: <span id="volume-lvl">100</span>%</button>'
	 +     '<button id="plr-10" class="btn btn-sm btn-default" title="Volume up">'
	 +       '<span class="glyphicon glyphicon-plus"></span></button></div></li>'
	 +   '<li class="divider" group="1"></li>'
	 +   '<li class="centered" group="1"><a id="plr-11"><span class="glyphicon glyphicon-chevron-down"></span>'
	 +     '</a></li>'
	 +   '<li class="centered" group="2"><a id="plr-12"><span class="glyphicon glyphicon-chevron-up"></span>'
	 +     '</a></li><li class="divider" group="2"></li>'
	 +   '<li group="2"><a id="plr-13" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Disable Player</a></li>'
	 +   '<li class="rpl" group="2"><a id="plr-14" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Remove Player</a></li>'
	 +   '<li class="divider" group="2"></li>'
	 +   '<li group="2"><a id="plr-15" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Mirror Player Horizontally</a></li>'
	 +   '<li group="2"><a id="plr-16" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Mirror Player Vertically</a></li>'
	 +   '<li class="divider" group="2"></li>'
	 +   '<li class="rpl" group="2"><a id="plr-17" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Show Player Mascot</a></li>'
	 +   '</ul>';
$plrbtnouter = $('<div id="plrbtn-outer" class="btn-group dropup" />').prependTo("#videocontrols").html(html);

if (!USEROPTS.wmode_transparent) {
	$plrbtnouter.removeClass('dropup');
	document.getElementById("plr-btn").innerHTML = '<span class="glyphicon glyphicon-cog"></span> ▾';	
}
if (FULLTITLE) $("#plr-2").addClass('activated');
PROGRESSBAR ? progressBarMode("show") : $("#plr-3").addClass('activated');
if (TIMELEFT) {
	mediaTimeLeft("show");
	$("#plr-4").addClass('activated');
}
if (SHOWMASCOT) {
	playerMascot("show");
	$("#plr-17").addClass('activated');
}
$("#plr-menu").find("li[group=2]").hide();


// Additional options button

$addoptsBtn = $('<button id="addopts-btn" class="btn btn-sm btn-default" title="Additional options" />')
  .html('<span class="glyphicon glyphicon-flash"></span> ▾').insertBefore("#mediarefresh");


// Favourite media links button

$favsBtn = $('<button id="favs-btn" class="btn btn-sm btn-default" title="Add and manage Premium favourites" />')
  .html('<span class="glyphicon glyphicon-thumbs-up"></span>').insertBefore("#mediarefresh");

if (!hasPermission("seeplaylist")) $favsBtn.attr('disabled', 'disabled');


// Poll controls wrap

$pollcontrols = $('<div id="pollcontrols" class="btn-group" />').prependTo($leftcontrols)
  .append($("#newpollbtn").detach()).append($("#emotelistbtn").detach());

$("#newpollbtn, #emotelistbtn").addClass('btn-chatctrl');


// Chat colors button and menu

var html = '<button id="colors-btn" class="btn btn-sm btn-default btn-chatctrl dropdown-toggle" '
	 + 'data-toggle="dropdown" aria-expanded="false">Colors ▴</button>'
	 + '<ul id="colors-wrap" class="dropdown-menu centered"></ul>';
$colorsMenu = $('<div id="colors-menu" class="dropup btn-group" />').appendTo($pollcontrols).html(html);

if (ColorsArray.length < 1) $colorsMenu.hide()
else if (ColorsArray.length > 50) $colorsMenu.addClass('widecm');

for (i in ColorsArray) {
	var j = ColorsArray.length > 50 ? 8 : 5;
	if (i % j == 0) var colgroup = $('<li class="btn-group btn-colors" />').appendTo("#colors-wrap");
	$('<button class="btn btn-default btn-sm cbtn" onclick="insertText(\'col:' + ColorsArray[i] + ':\')" />')
	  .css('background-color', ColorsArray[i]).html('■').appendTo(colgroup);
}


// Chat control buttons group

var html = '<button id="notepad-btn" class="btn btn-sm btn-default btn-chatctrl" title="Notepad">'
	 +   '<span class="glyphicon glyphicon-pencil"></span></button>'
	 + '<button id="sounds-btn" class="btn btn-sm btn-default btn-chatctrl" title="Chat sounds control">'
	 +   '<span class="glyphicon glyphicon-volume-down"></span></button>'
	 + '<div id="chatfunc-outer" class="dropup btn-group">'
	 +   '<button id="chatfunc-btn" class="btn btn-sm btn-default btn-chatctrl dropdown-toggle" '
	 +   'data-toggle="dropdown" title="Chat functions"><span class="glyphicon glyphicon-wrench"></span> ▴</button>'
	 +   '<ul id="chatfunc-menu" class="dropdown-menu dropdown-menu-right"></ul>'
	 + '</div><div id="chatopts-outer" class="dropup btn-group">'
	 +   '<button id="chatopts-btn" class="btn btn-sm btn-default btn-chatctrl dropdown-toggle" '
	 +   'data-toggle="dropdown" title="Chat options"><span class="glyphicon glyphicon-cog"></span> ▴</button>'
	 +   '<ul id="chatopts-menu" class="dropdown-menu dropdown-menu-right noclose"></ul></div>';
$chatcontrols = $('<div id="chatcontrols" class="btn-group pull-right" />').appendTo("#leftcontrols").html(html);

if (!TEXTTOSPEECH && jQuery.isEmptyObject(SoundFiltersArray) && WelcomeSoundFileURL == "") $("#sounds-btn").hide();
if (MUTECHAT) $("#sounds-btn").addClass('btn-danger');


// Chat functions dropdown menu

var html = '<li><a id="chat-f1">Premium Commands Help</a></li>'
	 + '<li class="divider"></li>'
	 + '<li><a id="chat-f2" class="opt"><span class="glyphicon glyphicon-ok"></span>Handy Emotes Panel</a></li>'
	 + '<li><a id="chat-f3" class="opt"><span class="glyphicon glyphicon-ok"></span>Unicode Characters</a></li>'
	 + '<li class="divider"></li>'
	 + '<li><a id="chat-f4" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Userlist on Right</a></li>'
	 + '<li><a id="chat-f5" class="opt"><span class="glyphicon glyphicon-ok"></span>Large User Profiles</a></li>'
	 + '<li class="divider"></li>'
	 + '<li><a id="chat-f6" class="opt"><span class="glyphicon glyphicon-ok"></span>Custom Ping Sound</a></li>'
	 + '<li><a id="chat-f7">Clear Chat Window</a></li>'
	 + '<li class="divider"></li>';
document.getElementById("chatfunc-menu").innerHTML = html;

if (BIGPROFILES) {
	$userlist.addClass('bigp');
	$("#chat-f5").toggleClass('activated');
}
if (CUSTOMPING && CUSTOMPINGFILE != "") {
	$("#chat-f6").addClass('activated');
	CHATSOUND = new Audio(CUSTOMPINGFILE);
}
CHATSOUND.volume = CUSTOMPINGLVL;


// Chat options dropdown menu

var html = '<li group="1"><a id="chat-1" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Convert Links to Images</a></li>'
	 + '<li group="1"><a id="chat-2" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Convert Links to Media</a></li>'
	 + '<li class="divider" group="1"></li>'
	 + '<li group="1"><a id="chat-3" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'NicoNico Mode</a></li>'
	 + '<li group="1"><a id="chat-4" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Chat Text-To-Speech</a></li>'
	 + '<li group="1"><a id="chat-5" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Separate Chat Messages</a></li>'
	 + '<li class="divider" group="1"></li>'
	 + '<li group="1"><a id="chat-6" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Ignore Avatars & Name Colors</a></li>'
	 + '<li group="1"><a id="chat-7" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Ignore Premium Notifications</a></li>'
	 + '<li group="1"><a id="chat-8" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Ignore Chat Colors</a></li>'
	 + '<li group="1"><a id="chat-9" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Ignore Emotes</a></li>'
	 + '<li class="divider" group="1"></li>'
	 + '<li class="btngr-padding" group="1"><div class="btn-group">'
	 +   '<button id="chat-10" class="btn btn-sm btn-default" title="Decrease font size">'
	 +     '<span class="glyphicon glyphicon-minus"></span></button>'
	 +   '<button id="chat-11" class="btn btn-sm btn-default" title="Reset font size">'
	 +     '<span class="glyphicon glyphicon-refresh"></span> font size: '
	 +     '<span id="chat-font-size">100</span>%</button>'
	 +   '<button id="chat-12" class="btn btn-sm btn-default" title="Increase font size">'
	 +     '<span class="glyphicon glyphicon-plus"></span></button></div></li>'
	 + '<li class="divider" group="1"></li>'
	 + '<li class="centered" group="1"><a id="chat-13"><span class="glyphicon glyphicon-chevron-down"></span>'
	 +   '</a></li>'
	 + '<li class="centered" group="2"><a id="chat-14"><span class="glyphicon glyphicon-chevron-up"></span>'
	 +   '</a></li><li class="divider" group="2"></li>'
	 + '<li group="2"><a id="chat-15" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Leader Status</a></li>'
	 + '<li group="2"><a id="chat-16" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Hide AFK Users</a></li>'
	 + '<li group="2"><a id="chat-17" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Hide Timestamps</a></li>'
	 + '<li group="2"><a id="chat-18" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Disable Autoscroll</a></li>'
	 + '<li group="2"><a id="chat-19" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Always Show Usernames</a></li>'
	 + '<li class="divider" group="2"></li>'
	 + '<li group="2"><a id="chat-20" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Matrix Style Chat</a></li>'
	 + '<li group="2"><a id="chat-21" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'White Background Chat</a></li>'
	 + '<li group="2"><a id="chat-22" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Bubbled Chat Messages</a></li>';
document.getElementById("chatopts-menu").innerHTML = html;

if (SHOWIMAGES) $("#chat-1").addClass('activated');
if (SHOWVIDEOS) $("#chat-2").addClass('activated');
if (PLAYERTEXT) {
	$("#chat-3").addClass('activated');
	$videowrap.find(".embed-responsive-16by9").prepend('<div id="player-chat-wrap" />');
}
if (TEXTTOSPEECH) $("#chat-4").addClass('activated');
if (MSGSEPARATOR == "lines") {
	$("#chat-5").addClass('activated');
	$messagebuffer.addClass('lines');
} else if (MSGSEPARATOR == "bubbles") {
	$("#chat-22").addClass('activated');
	$messagebuffer.addClass('bubbles');
}
if (IGNOREAVATARS) {
	$("#chat-6").addClass('activated');
	$messagebuffer.addClass('noavatars');
}
if (IGNORESERVER) {
	$("#chat-7").addClass('activated');
	$messagebuffer.addClass('ignoreserver');
}
if (IGNORECHATMODE == 2) $("#chat-8").html('<span class="glyphicon glyphicon-ok"></span> Ignore Text Effects')
else if (IGNORECHATMODE == 3) {
	$("#chat-8").html('<span class="glyphicon glyphicon-ok"></span> Ignore Colors & Effects');
}
if (IGNORECOLORS) {
	$("#chat-8").addClass('activated');
	if (IGNORECHATMODE != 1) $messagebuffer.addClass('noeffects');
	if (IGNORECHATMODE != 2) $messagebuffer.addClass('nocolors');
}
if (IGNOREEMOTES) {
	$("#chat-9").addClass('activated');
	$messagebuffer.addClass('noemotes');
}
if (CHATFONTSIZE != 100) {
	$messagebuffer.css('font-size', CHATFONTSIZE + '%');
	document.getElementById("chat-font-size").innerHTML = Math.round(CHATFONTSIZE);
}
if (HIDEAFKUSERS) {
	$("#chat-16").addClass('activated');
	$userlist.addClass('idleafk');
}
if (HIDETSTAMPS || !USEROPTS.show_timestamps) {
	$("#chat-17").addClass('activated');
	$messagebuffer.addClass('notstamps');
}
if (NOAUTOSCROLL) {
	$("#chat-18").addClass('activated');
	$chatwrap.addClass('noindicator');
}
if (CHATUSERNAME) $("#chat-19").addClass('activated');
if (CHATSTYLE == "matrix") {
	$("#chat-20").addClass('activated');
	$("#userlist, #messagebuffer, #chatline").addClass('matrix');
}
if (CHATBG == "white") {
	$("#chat-21").addClass('activated');
	$("#userlist, #messagebuffer, #chatline, .pm-buffer, .pm-input").addClass('whitebg');
}
$("#chatopts-menu").find("li[group=2]").hide();


// Filter playlist control panel

var html = '<div class="vertical-spacer"></div><div class="input-group">'
	 +   '<input class="form-control" id="plfilter" placeholder="Enter Username" type="text">'
	 +   '<span class="input-group-btn"><button class="btn btn-default" id="filter_playlist" '
	 +     'title="Filter playlist for items added by a specific user">Filter</button></span>'
	 +   '<span class="input-group-btn"><button class="btn btn-default" id="whole_playlist" '
	 +     'title="Show whole playlist">Show All</button></span>'
	 +   '<span class="input-group-btn"><button class="btn btn-default" id="close_plfilter" '
	 +     'title="Close panel">×</button></span></div>';
$plfiltercontrol = $('<div id="plfiltercontrol" class="col-lg-12 col-md-12 pl" />')
  .insertAfter("#queuefail").html(html).hide();


// Additional options control panel

var html = '<div class="well"><div class="btn-group">'
	 +   '<button id="tools-btn" class="btn btn-sm btn-default" title="Premium Admin Tools">'
	 +     '<span class="glyphicon glyphicon-tasks"></span> Tools</button>'
	 +   '<button id="clear-btn" class="btn btn-sm btn-default" title="Clear chat">/clear</button>'
	 +   '<button id="autoclear-btn" class="btn btn-sm btn-default" title="Toggle Autoclear function '
	 +   '(automatically deletes chat flood)">Autoclear</button>'
	 +   '<button id="antiafk-btn" class="btn btn-sm btn-default" title="Toggle Anti-AFK function '
	 +   '(prevents you from AFK status)">AntiAFK</button>'
	 +   '<button id="afk-btn" class="btn btn-sm btn-default" title="Toggle AFK status">/afk</button>'
	 + '</div><button id="jukebox-btn" class="btn btn-sm btn-default pull-right" title="Jukebox mode">'
	 +   '<span class="glyphicon glyphicon-th-list"></span> Jukebox</button>'
	 + '<div class="clearfix5"></div><div id="utc" class="pull-right" title="Universal time clock"></div>'
	 + '<div class="btn-group">'
	 +   '<button id="public-btn" class="btn btn-sm btn-default" title="Show list of public channels">'
	 +     '<span class="glyphicon glyphicon-globe"></span> Channels</button></div></div>';
$addoptswrap = $('<div id="addoptswrap" class="col-lg-12 col-md-12" />').insertAfter("#queuefail").html(html).hide();

if (!hasPermission("seeplaylist")) $("#jukebox-btn").attr('disabled', 'disabled');


// Favourite Premium links control panel

var html = '<div class="vertical-spacer"></div><div class="centered">'
	 +   '<button id="addtofav-btn" class="btn btn-default" title="Add to your Premium favourite links">'
	 +     '<span class="glyphicon glyphicon-thumbs-up"></span> Add to favourite links</button>'
	 + '</div><ul id="queue-fav" class="videolist col-lg-12 col-md-12"></ul>';
$favscontrol = $('<div id="favscontrol" class="col-lg-12 col-md-12 pl" />').insertAfter("#queuefail").html(html).hide();


// Playlist container ID

$queue.parent().attr('id', 'queue-parent');

// Show contributors (if enabled)

if (SHOWCONTRIBS) contributorsNames("show");


// Playlist labels

var html = LARGEPLAYER ? 'To player ▴' : 'To chat ▴';
$scrollToChat = $('<span id="scroll-to-chat" class="label label-default pull-right pointer scroll-label" />')
  .attr('title', 'Scroll to chat').appendTo($plmeta).html(html);
$hidePlaylist = $('<span id="hide-playlist" class="label label-default pull-right pointer scroll-label" />')
  .attr('title', 'Hide playlist').appendTo($plmeta).html('<span class="glyphicon glyphicon-ban-circle"></span>');
$expandPlaylist = $('<span id="expand-playlist" class="label label-default pull-right pointer scroll-label" />')
  .attr('title', 'Expand playlist').appendTo($plmeta).html('<span class="glyphicon glyphicon-resize-vertical"></span>');
$scrollToCurrent = $('<span id="scroll-to-current" class="label label-default pull-right pointer scroll-label" />')
  .attr('title', 'Scroll playlist to current item').appendTo($plmeta)
  .html('<span class="glyphicon glyphicon-arrow-up"></span>');

if (HIDEPLS) {
	$hidePlaylist.addClass('label-danger').attr('title', 'Show playlist');
	$queue.hide();
}
if (EXPANDPL) {
	$expandPlaylist.addClass('label-success');
	$queue.addClass('expanded');
}


// Custom HTML area (if enabled)

if (EXECHTML && CUSTOMHTML != "") {
	$customhtmlwrap =  $('<div id="customhtmlwrap" class="col-lg-12 col-md-12 leftareas" />').html(CUSTOMHTML)
	  .insertBefore("#playlistmanagerwrap");
	if (THEATREMODE) $customhtmlwrap.hide();
}


// Notepad panel

var html = '<div id="notepad-well" class="well form-horizontal"><textarea id="note-area" class="form-control" '
	 +   'rows="12" placeholder="Personal notepad: write your notes here"></textarea>'
	 +   '<div id="notesavewrap" class="text-center">'
	 +     '<button id="notesave-btn" class="btn btn-sm btn-default">Save Notes</button></div></div>';
$notepadwrap = $('<div id="notepadwrap" class="col-lg-12 col-md-12 wells leftareas" />')
  .insertBefore("#playlistmanagerwrap").html(html).hide();

$("#note-area").val(getOrDefault('SP_notes_' + CLIENT.name, ''));


// Avatars panel (if enabled)

if (AVATARSLIST) {
	createAvatarsPanel();
	refreshAvatarsList();
	if (THEATREMODE) $avatarswrap.hide();
}


// Synchtube Premium footer

var arr = VERSION.split(".");
if (arr.length == 3) arr[2] = '<span class="smallfont">' + arr[2] + '</span>';
VERSION = arr.join(".");

var html = '<br />Channel powered by: <b>Synchtube Premium</b> v. ' + VERSION + ', Copyright © 2016-2019 ZimnyLech · '
	 + '<a href="https://dl.dropboxusercontent.com/s/1dyazoq6t7wh808/Premium.js" target="_blank">Code</a> · '
	 + '<a href="https://dl.dropboxusercontent.com/s/auf78rsgm41h9cj/log.txt" target="_blank">Changelog</a> · '
	 + '<img src="http://simplehitcounter.com/hit.php?uid=2187367" title="Synchtube Premium load counter" /><br />'
	 + '<a href="http://s06.flagcounter.com/more/rze9" target="_blank">'
	 +   '<img id="spc" src="http://s06.flagcounter.com/count/rze9/bg=FFFFFF/txt=000000/'
	 +   'border=CCCCCC/columns=3/maxflags=12/viewers=0/labels=1/pageviews=1/" /></a>';
if (CustomFooterHTML != '') html += '<br />' + CustomFooterHTML;
$("footer .credit").html($("footer .credit").html() + html);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ---------- [SECTION 4] USER INTERFACE EVENTS ---------- */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Not closing selected dropdown menus ('noclose' class) after clicking an option

$(document).on('click' + '.bs.dropdown.data-api', '.dropdown-menu.noclose > li', function (e) {
	e.stopPropagation();
})


// Reload channel after global "Options" save

$("#useroptions .modal-footer button:nth-child(1)").on("click", function() {
	document.location.reload();
});


// My Chat History modal window

$("#my-chat").on("click", function() {
	createModal('My Chat History');

	var html = 'History of your chats as <b>' + (CLIENT.name != "" ? CLIENT.name : '<i>anonymous</i>') + '</b> '
		 + '(up to 1000 last messages, <span id="sort-txt"></span> first).<br /><br />'
		 + '<div id="rooms-table"><table class="table table-striped table-condensed"><thead><th>Num.</th>'
		 +   '<th>Room</th><th>Last access</th></thead><tbody id="chats-list"></tbody></table></div>'
		 + '<table class="table table-striped table-condensed"><thead>'
		 +   '<th>Num. <span id="sort-a" class="glyphicon glyphicon-sort small"></span></th>'
		 +   '<th>Message</th></thead><tbody id="tbl-body"></tbody></table>';
	body.html(html);

	CHATHISTORY = getOrDefault('SP_chathistory_' + CLIENT.name, '{}');
	var obj = JSON.parse(CHATHISTORY);
	if (!(CHANNEL.name in obj)) {
		obj[CHANNEL.name] = {"last":"", data:[]};
	}
	var arr = [];
	for (i in obj) {
		arr.push({"last":obj[i]["last"], "room":i});
	}
	arr.sort(function(a, b) {return (b.last > a.last) ? 1 : ((a.last > b.last) ? -1 : 0)});

	var num = 0;
	for (i in arr) {
		num++;
		var ts = new Date(arr[i]["last"]);
		var month = ts.getMonth() + 1;
		if (month < 10) month = '0' + month;
		var day = ts.getDate();
		if (day < 10) day = '0' + day;
		var date = ts.getFullYear() + '-' + month + '-' + day;
		var btn = $('<button id="_b_' + arr[i]["room"] + '" class="btn btn-sm btn-default gbtn" />')
		  .attr('tab', arr[i]["room"]).html(num)
		  .on("click", function() {
			$(".gbtn").removeClass('btn-success');
			$(this).addClass('btn-success');
			VISIBLETAB["chats"] = $(this).attr('tab');
			_sort();
		  });
		var td = $('<td />').append(btn);
		var path = '/' + CHANNELPATH + '/' + arr[i]["room"];
		var tr = $('<tr />').appendTo("#chats-list").append(td)
		  .append('<td><a href="..' + path + '" target="_blank">' + path + '</a></td>')
		  .append('<td>' + date + '</td>');
	}
	$("#_b_" + VISIBLETAB["chats"]).addClass('btn-success');

	function _sort() {
		$("#sort-txt").html(SORTMODE.chatHistory == "new" ? 'newest' : 'oldest');
		var arr = JSON.parse(getOrDefault('SP_chathistory_' + CLIENT.name, '{}'))[VISIBLETAB["chats"]]["data"];
		if (SORTMODE.chatHistory == "new") arr = arr.reverse();
		var len = arr.length;
		var html = '';
		for (i in arr) {
			var record;
			var ts = new Date(arr[i]["ts"]);
			var nr = (SORTMODE.chatHistory == "new") ? (parseFloat(i) + 1) : (len - i);
			var month = ts.getMonth() + 1;
			if (month < 10) month = '0' + month;
			var day = ts.getDay();
			if (day < 10) day = '0' + day;
			var h = ts.getHours();
			if (h < 10) h = '0' + h;
			var m = ts.getMinutes();
			if (m < 10) m = '0' + m;
			var date = ts.getFullYear() + '-' + month + '-' + day + ', ' + h + ':' + m;
			if (arr[i]["msg"] == "[connected]") {
				record = '<span class="glyphicon glyphicon-log-in"></span> &nbsp;'								       + '<i>[connected to channel # ' + date + ']</i>';
			}
			else record = arr[i]["msg"];
			html += '<tr><td>' + nr + '.</td><td>' + record + '</td></tr>';
		}
		$("#tbl-body").html(html);
	}
	_sort();

	$("#sort-a").on("click", function() {
		SORTMODE.chatHistory = (SORTMODE.chatHistory == "new") ? 'old' : 'new';
		_sort();
	});
});


// My Messages modal window

$("#my-messages").on("click", function() {
	createModal('My Messages');
	createModalTabs(['Current Messages', 'Messages History'], "messages");

	var html = 'List of your chat messages in current session as '
		 + '<b>' + (CLIENT.name != "" ? CLIENT.name : '<i>anonymous</i>') + '</b> '
		 + '(<span id="sort-txt1"></span> first).<br /><br />'
		 + '<table class="table table-striped table-condensed"><thead>'
		 +   '<th>Num. <span id="sort-a1" class="glyphicon glyphicon-sort small"></span></th>'
		 +   '<th>Message</th></thead><tbody id="tbl-body1"></tbody></table>';
	$("#_c1").html(html);

	function _sort1() {
		$("#sort-txt1").html(SORTMODE.msgCurrent == "old" ? 'oldest' : 'newest');
		var arr = [];
		for (i in CHATHIST) {
			if (CHATHIST[i] != "") arr.push(CHATHIST[i]);
		}
		if (SORTMODE.msgCurrent == "new") arr = arr.reverse();
		var len = arr.length;
		var html = '';
		for (i in arr) {
			var nr = (SORTMODE.msgCurrent == "new") ? (parseFloat(i) + 1) : (len - i);
			html += '<tr><td>' + nr + '.</td><td>' + arr[i] + '</td></tr>';
		}
		$("#tbl-body1").html(html);
	}
	_sort1();

	$("#sort-a1").on("click", function() {
		SORTMODE.msgCurrent = (SORTMODE.msgCurrent == "old") ? 'new' : 'old';
		_sort1();
	});

	var html = 'History of your chat messages sent as <b>'
		 + (CLIENT.name != "" ? CLIENT.name : '<i>anonymous</i>') + '</b> '
		 + '(up to 200 last messages, <span id="sort-txt2"></span> first).<br /><br />'
		 + '<table class="table table-striped table-condensed"><thead>'
		 +   '<th>Num. <span id="sort-a2" class="glyphicon glyphicon-sort small"></span></th>'
		 +   '<th>Message</th></thead><tbody id="tbl-body2"></tbody></table>';
	$("#_c2").html(html);

	function _sort2() {
		$("#sort-txt2").html(SORTMODE.msgHistory == "new" ? 'newest' : 'oldest');
		var arr = JSON.parse(getOrDefault('SP_msghistory_' + CLIENT.name, '[]'));
		if (SORTMODE.msgHistory == "new") arr = arr.reverse();
		var len = arr.length;
		var html = '';
		for (i in arr) {
			var nr = (SORTMODE.msgHistory == "new") ? (parseFloat(i) + 1) : (len - i);
			html += '<tr><td>' + nr + '.</td><td>' + arr[i] + '</td></tr>';
		}
		$("#tbl-body2").html(html);
	}
	_sort2();

	$("#sort-a2").on("click", function() {
		SORTMODE.msgHistory = (SORTMODE.msgHistory == "new") ? 'old' : 'new';
		_sort2();
	});
});


// My Mentions modal window

$("#my-mentions").on("click", function() {
	createModal('My Mentions');

	var rnd = Math.random().toString();
	MENTIONS = getOrDefault('SP_mentions_' + CLIENT.name, '[]');
	var obj = JSON.parse(MENTIONS);
	var len = 0;
	for (i in CHATHIST) {
		if (CHATHIST[i] != "") len++;
	}
	var arr = ['Current Mentions [' + CHATMENTIONS.length + ']', 'Saved Mentions [' + obj.length + ']'];
	createModalTabs(arr, "mentions");

	$("#_b1, #_b2").on("click", function() {
		if ($(this).attr('id') == "_b1") {
			NOTIFNUM = 0;
			$notifier.hide().find("strong").html('0');
		}
		if ($(this).attr('id') == "_b2") info.show()
		else info.hide();
	});

	var html = '';
	if (NOTIFNUM > 0) {
		html += '<p class="text-danger">You have <b>' + NOTIFNUM + '</b> unchecked mention'
		      + ((NOTIFNUM != 1) ? 's' : '') + '.</p>';
	}
	html += 'List of chat messages in current session that mentioned your username '
	      + '(<span id="sort-txt1"></span> first).<br /><br />'
	      + '<table class="table table-striped table-condensed"><thead>'
	      +   '<th>Num. <span id="sort-a1" class="glyphicon glyphicon-sort small"></span></th>'
	      +   '<th>Message</th></thead><tbody id="tbl-body1"></tbody></table>';
	$("#_c1").html(html);

	function _sort1() {
		$("#sort-txt1").html(SORTMODE.mentionsCurrent == "new" ? 'newest' : 'oldest');
		var arr = [];
		for (i in CHATMENTIONS) {
			arr.push(CHATMENTIONS[i]);
		}
		if (SORTMODE.mentionsCurrent == "new") arr = arr.reverse();
		var len = arr.length;
		var html = '';
		for (i in arr) {
			var nr = (SORTMODE.mentionsCurrent == "new") ? (parseFloat(i) + 1) : (len - i);
			html += '<tr><td>' + nr + '.</td><td>' + arr[i] + '</td></tr>';
		}
		$("#tbl-body1").html(html);
	}
	_sort1();

	$("#sort-a1").on("click", function() {
		SORTMODE.mentionsCurrent = (SORTMODE.mentionsCurrent == "new") ? 'old' : 'new';
		_sort1();
	});

	var html = 'History of your auto-saved mentions as '
		 + '<b>' + (CLIENT.name != "" ? CLIENT.name : '<i>anonymous</i>') + '</b> '
		 + '(up to 200 last messages, <span id="sort-txt2"></span> first).<br /><br />'
		 + '<div class="form-group"><div class="col-sm-12 config-col">'
		 +   '<label class="checkbox-inline"><input id="save-mentions" type="checkbox">'
		 +     '<span> Enable mentions auto-saving</span></label></div></div><br /><br />'
		 + '<table class="table table-striped table-condensed"><thead>'
		 +   '<th>Num. <span id="sort-a2" class="glyphicon glyphicon-sort small"></span></th>'
		 +   '<th>Message</th></thead><tbody id="tbl-body2"></tbody></table>';
	$("#_c2").html(html);

	rebuildSavedMentions(-1);

	$("#sort-a2").on("click", function() {
		SORTMODE.mentionsHistory = (SORTMODE.mentionsHistory == "new") ? 'old' : 'new';
		rebuildSavedMentions(-1);
	});

	if (SAVEMENTIONS) $("#save-mentions").prop('checked', true);
	$("#save-mentions").on("click", function() {
		setOpt('SP_savementions', SAVEMENTIONS = $("#save-mentions").prop('checked'));
	});

	txtinfo = $('<div class="text-info pull-left">Changes are applied automatically.</div>').appendTo(footer);
	if (VISIBLETAB["mentions"] != 2) {
		txtinfo.hide();
		$("#_b1").trigger("click");
	}
});


// Navigation bar mode icons events

$navbarUp.on("click", function() {
	$nav.hide();
	$navbarcollapsed = $('<div id="navbar-collapsed" class="centered maxwidth" />').appendTo("body");
	$('<div class="pointer" title="Expand navigation bar" />').appendTo($("#navbar-collapsed"))
	  .html('<span class="glyphicon glyphicon-chevron-down"></span>')
	  .on("click", function() {
		$navbarcollapsed.remove();
		$nav.show();
	  });
});

$navbarUnpin.on("click", function() {
	SCROLLNAVBAR ? navbarMode("static") : navbarMode("scrollable");
	setOpt('SP_scrollnavbar', SCROLLNAVBAR = !SCROLLNAVBAR);
});


// Layout dropdown menu events

$("#layout-1").on("click", function() {
	$layoutMenu.removeClass('open');
	createModal('Premium Settings');
	createModalTabs(['Basic', 'Advanced', 'Show/Hide', 'Filters', 'Media DB', 'HTML'], "options");

	var html = '<div class="panel panel-primary">';
	var options = [
		['', 'General layout'],
		['nobackdrop', 'Modal windows without fading background'],
		['gluelayout', 'Glue layout elements to the edge of the screen'],
		['transparentnav', 'Transparent navigation bar (opaque on mouseover)'],
		['nonotifier', 'Don\'t show notifications in the navigation bar'],
		['collapsemotd', 'Collapse MOTD on load'],
		['collapseulist', 'Collapse userlist on load'],
		['separateulist', 'Separate userlist items'],
		['', 'Chat options'],
		['chathidescroll', 'Autohide scrollbars (chat & userlist)'],
		['hideindicator', 'Don\'t display "New Messages Below" alert'],
		['autoplayembeds', 'Autoplay media embeds (if "Convert Links to Media" enabled)'],
		['avatarslist', 'Display all user profile images below chat'],
		['emotescache', 'Load emotes to cache on start'],
		['chattotop', 'Scroll chat panel to top on load'],
	];
	for (i in options) {
		if (options[i][0] == "") {
			if (i != 0) html += '</div>';
			html += '<div class="panel-heading">' + options[i][1] + '</div><div class="panel-body">';
		} else {
			html += '<div class="col-sm-12 config-col"><label class="checkbox-inline">'
			     +    '<input id="' + options[i][0] + '" type="checkbox" /><span> '
			     +      options[i][1] + '</span></label></div>';
		}
	}
	html += '</div></div>';
	$("#_c1").html('<form class="form-horizontal">' + html + '</form>');

	if (NOBACKDROP) $("#nobackdrop").prop('checked', true);
	if (GLUELAYOUT) $("#gluelayout").prop('checked', true);
	if (TRANSPARENTNAV) $("#transparentnav").prop('checked', true);
	if (NONOTIFIER) $("#nonotifier").prop('checked', true);
	if (COLLAPSEMOTD) $("#collapsemotd").prop('checked', true);
	if (COLLAPSEULIST) $("#collapseulist").prop('checked', true);
	if (SEPARATEULIST) $("#separateulist").prop('checked', true);
	if (CHATHIDESCROLL) $("#chathidescroll").prop('checked', true);
	if (HIDEINDICATOR) $("#hideindicator").prop('checked', true);
	if (AUTOPLAYEMBEDS) $("#autoplayembeds").prop('checked', true);
	if (AVATARSLIST) $("#avatarslist").prop('checked', true);
	if (EMOTESCACHE) $("#emotescache").prop('checked', true);
	if (CHATTOTOP) $("#chattotop").prop('checked', true);

	$("#nobackdrop").on("click", function() {
		setOpt('SP_nobackdrop', NOBACKDROP = $("#nobackdrop").prop('checked'));
	});
	$("#gluelayout").on("click", function() {
		GLUELAYOUT = $("#gluelayout").prop('checked');
		GLUELAYOUT ? $body.addClass('glued') : $body.removeClass('glued');
		handleVideoResize();
		setOpt('SP_gluelayout', GLUELAYOUT);
	});
	$("#transparentnav").on("click", function() {
		TRANSPARENTNAV = $("#transparentnav").prop('checked');
		TRANSPARENTNAV ? $nav.addClass('transparent') : $nav.removeClass('transparent');
		setOpt('SP_transparentnav', TRANSPARENTNAV);
	});
	$("#nonotifier").on("click", function() {
		NONOTIFIER = $("#nonotifier").prop('checked');
		if (NONOTIFIER) $notifier.hide()
		else if (NOTIFNUM > 0) $notifier.show();
		setOpt('SP_nonotifier', NONOTIFIER);
	});
	$("#collapsemotd").on("click", function() {
		setOpt('SP_collapsemotd', COLLAPSEMOTD = $("#collapsemotd").prop('checked'));
	});
	$("#collapseulist").on("click", function() {
		setOpt('SP_collapseulist', COLLAPSEULIST = $("#collapseulist").prop('checked'));
	});
	$("#separateulist").on("click", function() {
		SEPARATEULIST = $("#separateulist").prop('checked');
		if (SEPARATEULIST) $userlist.addClass('separate')
		else $userlist.removeClass('separate');
		setOpt('SP_separateulist', SEPARATEULIST);
	});
	$("#chathidescroll").on("click", function() {
		CHATHIDESCROLL = $("#chathidescroll").prop('checked');
		if (CHATHIDESCROLL) $("#userlist, #messagebuffer").addClass('autoscroll')
		else $("#userlist, #messagebuffer").removeClass('autoscroll');
		setOpt('SP_chathidescroll', CHATHIDESCROLL);
	});
	$("#hideindicator").on("click", function() {
		HIDEINDICATOR = $("#hideindicator").prop('checked');
		if (HIDEINDICATOR) $chatwrap.addClass('noindicator')
		else if (!$("#chat-18").hasClass('activated')) $chatwrap.removeClass('noindicator');
		setOpt('SP_hideindicator', HIDEINDICATOR);
	});
	$("#autoplayembeds").on("click", function() {
		AUTOPLAYEMBEDS = $("#autoplayembeds").prop('checked');
		setOpt('SP_autoplayembeds', AUTOPLAYEMBEDS);
	});
	$("#avatarslist").on("click", function() {
		if (AVATARSLIST) $avatarswrap.remove();
		AVATARSLIST = $("#avatarslist").prop('checked');
		if (AVATARSLIST) {
			createAvatarsPanel();
			refreshAvatarsList();
		}
		setOpt('SP_avatarslist', AVATARSLIST);
	});
	$("#emotescache").on("click", function() {
		setOpt('SP_emotescache', EMOTESCACHE = $("#emotescache").prop('checked'));
	});
	$("#chattotop").on("click", function() {
		setOpt('SP_chattotop', CHATTOTOP = $("#chattotop").prop('checked'));
	});

	var html = '<form class="form-horizontal"><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Browser\'s tab title</label>'
		 +   '<div class="col-sm-7 config-col">'
		 +     '<select id="tabmode" class="form-control">'
		 +       '<option value="0">page title</option>'
		 +       '<option value="1">current media title</option>'
		 +       '<option value="2">channel ID</option>'
		 +       '<option value="3">number of chat messages</option></select></div>'
		 + '</div><div class="form-group">'
	      	 +   '<label class="control-label col-sm-5">Character(s) after username in chat messages</label>'
	      	 +   '<div class="col-sm-7 config-col">'
	      	 +     '<input id="usernamemark" class="form-control" type="text" maxlength="3" /></div>'
	      	 + '</div><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Maximum number of visible chat messages</label>'
		 +   '<div class="col-sm-7 config-col">'
		 +     '<select id="chatmaxsize" class="form-control"><option value="50">50</option>'
		 +       '<option value="100">100</option><option value="200">200</option>'
		 +       '<option value="500">500</option></select></div>'
		 + '</div><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Emotes per page in Handy Emotes Panel</label>'
		 +   '<div class="col-sm-7 config-col">'
		 +     '<select id="emotesperpage" class="form-control"><option value="25">25</option>'
		 +       '<option value="50">50</option><option value="100">100</option>'
		 +       '<option value="200">200</option><option value="500">500</option></select></div>'
		 + '</div><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Emotes tab completion preview position</label>'
		 +   '<div class="col-sm-7 config-col">'
		 +     '<select id="emotesprevpos" class="form-control">'
		 +       '<option value="no-preview">don\'t show preview</option>'
		 +       '<option value="b-left">bottom left</option>'
		 +       '<option value="b-right">bottom right</option>'
		 +       '<option value="t-left">top left</option>'
		 +       '<option value="t-right">top right</option></select></div>'
		 + '</div><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Mode of additional Premium Notifications</label>'
		 +   '<div class="col-sm-7 config-col">'
		 +     '<select id="premiumnotmode" class="form-control"><option value="1">don\'t show neither</option>'
		 +       '<option value="2">show only "user joined/disconnected"</option>'
		 +       '<option value="3">show only "now playing"</option>'
		 +       '<option value="4">show both</option></select></div>'
		 + '</div><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Mode of "Ignore" chat text menu option</label>'
		 +   '<div class="col-sm-7 config-col">'
		 +     '<select id="ignorechatmode" class="form-control"><option value="1">ignore only colors</option>'
		 +       '<option value="2">ignore only text effects</option>'
		 +       '<option value="3">ignore both colors and effects</option></select></div>'
		 + '</div><div class="form-group">'
	      	 +   '<label class="control-label col-sm-5">Custom player hiding image</label>'
	      	 +   '<div class="col-sm-7 config-col">'
	      	 +     '<input id="hideplayerurl" class="form-control" type="text" placeholder="Paste image URL '
		 +       'and enable below" /></div>'
	      	 + '</div><div class="form-group">'
		 +   '<label class="control-label col-sm-5"></label>'
		 +   '<div class="col-sm-7 config-col"><label class="checkbox-inline">'
		 +     '<input id="imageurlaccept" type="checkbox"><span> Enable custom image</span>'
		 +   '</label></div></div></form>';
	$("#_c2").html(html);

	$("#tabmode").val(TABMODE);
	$("#usernamemark").val(USERNAMEMARK);
	$("#chatmaxsize").val(CHATMAXSIZE);
	$("#emotesperpage").val(EMOTESPERPAGE);
	$("#emotesprevpos").val(EMOTESPREVPOS);
	$("#premiumnotmode").val(PREMIUMNOTMODE);
	$("#ignorechatmode").val(IGNORECHATMODE);
	$("#hideplayerurl").val(HIDEPLAYERURL);
	if (IMAGEURLACCEPT) $("#imageurlaccept").prop('checked', true);

	$("#tabmode").on("change", function() {
		TABMODE = $("#tabmode").val();
		pageTitle();
		setOpt('SP_tabmode', TABMODE);
	});
	$("#usernamemark").on("change", function() {
		setOpt('SP_usernamemark', USERNAMEMARK = $("#usernamemark").val());
	});
	$("#chatmaxsize").on("change", function() {
		setOpt('SP_chatmaxsize', CHATMAXSIZE = $("#chatmaxsize").val());
	});
	$("#emotesperpage").on("change", function() {
		EMOTESPERPAGE = $("#emotesperpage").val();
		var tabs = Math.ceil(CHANNEL.emotes.length / EMOTESPERPAGE);
		if (VISIBLETAB["emotes"] > tabs) VISIBLETAB["emotes"] = 1;
		if ($("#chat-f2").hasClass('activated')) {
			document.getElementById("closechatpanel-btn").click();
			document.getElementById("chat-f2").click();
		}
		setOpt('SP_emotesperpage', EMOTESPERPAGE);
	});
	$("#emotesprevpos").on("change", function() {
		EMOTESPREVPOS = $("#emotesprevpos").val();
		$("#emote-view").removeClass().addClass(EMOTESPREVPOS);
		setOpt('SP_emotesprevpos', EMOTESPREVPOS);
	});
	$("#premiumnotmode").on("change", function() {
		setOpt('SP_premiumnotmode', PREMIUMNOTMODE = $("#premiumnotmode").val());
	});
	$("#ignorechatmode").on("change", function() {
		IGNORECHATMODE = $("#ignorechatmode").val();
		var txt;
		if (IGNORECHATMODE == 1) txt = 'Ignore Chat Colors'
		else if (IGNORECHATMODE == 2) txt = 'Ignore Text Effects'
		else if (IGNORECHATMODE == 3) txt = 'Ignore Colors & Effects';
		$("#chat-8").html('<span class="glyphicon glyphicon-ok"></span> ' + txt);
		if ($("#chat-8").hasClass('activated')) {
			$messagebuffer.removeClass('nocolors noeffects');
			if (IGNORECHATMODE != 1) $messagebuffer.addClass('noeffects');
			if (IGNORECHATMODE != 2) $messagebuffer.addClass('nocolors');
		}
		setOpt('SP_ignorechatmode', IGNORECHATMODE);
	});
	$("#hideplayerurl").on("change blur", function() {
		setOpt('SP_hideplayerurl', HIDEPLAYERURL = $("#hideplayerurl").val());
	});
	$("#imageurlaccept").on("click", function() {
		setOpt('SP_imageurlaccept', IMAGEURLACCEPT = $("#imageurlaccept").prop('checked'));
	});

	var html = 'Enable to display or disable to hide various layout elements.<br /><br />'
		 + '<div class="panel panel-primary">';
	var options = [
		['Navigation bar options', 'header', 2],
		['Channel logo (if available)', 'logo', -1],
		['MOTD', 'motd', 0],
		['Announcements', 'announcements', 0],
		['Player and chat headers', 'mainheader', 1],
		['Player header labels', 'playerlabels', -1],
		['Chat header labels', 'chatlabels', -1],
		['Player and playlist controls', 'playercontrols', 1],
		['Playlist control buttons', 'playlistbtns', -1],
		['Playlist control menu', 'playlistmenu', -1],
		['Player control menu', 'playermenu', -1],
		['Player control buttons', 'playerbtns', -1],
		['Media Database buttons (if available)', 'mediadbbtns', -1],
		['Chat controls', 'chatcontrols', 1],
		['New poll and emote list buttons', 'pollemotebtns', -1],
		['Colors button', 'colorsbtn', -1],
		['Oekaki, notepad, and chat sounds buttons', 'chatbtns', -1],
		['Chat control menus', 'chatmenus', -1],
		['Playlist footer', 'plmeta', 1],
		['Playlist footer labels', 'playlistlabels', -1],
		['Footer', 'footer', 0]
	];
	for (i in options) {
		var mode = options[i][2];
        	if (mode != -1) {
			if (i != 0) html += '</div>';
			html += '<div class="panel-heading">' + options[i][0]
			     +    '<div class="config-col pull-right"><label class="checkbox-inline elements-inline">'
			     +      '<input id="elms_' + options[i][1] + '" type="checkbox" '
			     +      'panel="' + options[i][1] + '" mode="' + mode + '" /><span> Show</span>'
			     +    '</div></div><div class="panel-body" panel="' + options[i][1] + '">';
		} else {
			html += '<div class="col-sm-12 config-col"><label class="checkbox-inline">'
			     +    '<input id="elms_' + options[i][1] + '" type="checkbox" mode="' + mode + '" />'
			     +    '<span> ' + options[i][0] + '</span></label></div>';
		}
	}
	html += '</div></div>';
	$("#_c3").html('<form class="form-horizontal">' + html + '</form>');

	var arr = JSON.parse(SHOWELEMENTS);
	for (i in arr) {
		if (arr[i] == 1) $("#elms_" + i).prop('checked', true);
	}

	for (i in options) {
		if (options[i][2] != -1) {
			var panel = $(".modal").find(".panel-body[panel=" + options[i][1] + "]");
			if (options[i][2] == 1 && !$("#elms_" + options[i][1]).prop('checked')) panel.hide()
			else if (options[i][2] == 0) panel.hide();
		}
	}

	$("input[id^='elms_']").on("click", function() {
		var arr = JSON.parse(SHOWELEMENTS);
		for (i in arr) {
			arr[i] = $("#elms_" + i).prop('checked') ? 1 : 0;
		}
		SHOWELEMENTS = JSON.stringify(arr);
		processLayoutElements();
		setOpt('SP_showelements', SHOWELEMENTS);
		if ($(this).attr('mode') == 1) {
			var attr = $(this).attr('panel');
			var panel = $(".modal").find(".panel-body[panel=" + attr + "]");
			if (panel.length > 0) panel.toggle();
		}
	});

	var html = 'Define your own chat filters. Use text or simplified regular expressions.<br />'
		 + '<span class="text-danger">Warning! Don\'t use pattern\'s external slashes and modifiers. '
		 +   'All filters will be case sensitive. Use <code>&nbsp;>&nbsp;</code> (with spaces) to separate '
		 +   'original and replacing pattern. Be careful what strings or expressions you filter, custom '
		 +   'filters may affect links and cause wrong URLs displaying. '
		 +   '<span class="glyphicon glyphicon-exclamation-sign text-danger"></span> New line = new filter. '
		 + '</span><br /><br />'
		 + '<form class="form-horizontal"><div class="col-sm-12 config-col">'
		 +   '<label class="checkbox-inline"><input id="exec-filters" type="checkbox"><span> '
		 +     'Enable custom filters</span></label><br /><br />'
	      	 +   '<textarea id="filters-area" class="form-control" type="textarea" rows="10" '
		 +   'placeholder="Enter your chat filters here" /></div></form>'
		 + '<div class="clearfix5"></div><br />'
		 + '<div class="panel panel-primary"><div class="panel-heading">'
		 +   'Simple examples of regular expressions\' filters</div>'
		 +   '<div class="panel-body"><table class="commands-tbl maxwidth">'
		 +     '<tr><td><code>abc > bcd</code> - replaces string <i>abc</i> with <i>bcd</i></td></tr>'
		 +     '<tr><td><code>abc >&nbsp;</code> - deletes string <i>abc</i> '
		 +     '(technically replaces it with empty string)</td></tr>'
		 +     '<tr><td><code>(abc|def|ghi) > xyz</code> - replaces any of <i>abc, def, ghi</i> strings '
		 +     'with <i>xyz</i>; <b>()</b> means group of characters inside, <b>|</b> means '
		 +     'alternatives</td></tr>'
		 +     '<tr><td><code>(a|b)(c|d) > xyz</code> - replaces any strings combinations '
		 +       '<i>a</i> or <i>b</i> and <i>c</i> or <i>d</i> '
		 +     '(<i>ac, ad, bc, bd</i>, but not <i>ab, cd</i> etc.)</td></tr>'
		 +     '<tr><td><code>(A|a)(B|b)(C|c) > xyz</code> - replaces any small and capital letters '
		 +     'combinations of <i>abc</i> string (<i>Abc, aBc, aBC</i> etc.)</td></tr>'
		 +     '<tr><td><code>\\bcat\\b > dog</code> - replaces only whole word <i>cat</i> with <i>dog</i>, '
		 +     'but not longer words containing this string (<i>cats, category, bobcat</i> etc.); '
		 +     '<b>\\b</b> means start or end of the single word</td></tr>'
		 +     '<tr><td><code>A(.+?)a > "A$1a"</code> - adds quotation marks to any string between capital '
		 +     'letter <i>A</i> and a small letter <i>a</i> (<i>Asia, America, Africa</i> etc.); '
		 +     '<b>(.+?)</b> means group of anything between, <b>$1</b> in replacing pattern means '
		 +     '"display content of the first group in the filter"</td></tr></table>'
		 +   '</div><div class="panel-heading">Using special characters</div>'
		 +   '<div class="panel-body"><p class="text-danger">'
		 +     'Characters such as <code>\\ ^ $ . | ? * + ( ) [ {</code> are regular expressions\' characters '
		 +     'with special meanings (read regex manuals for more info). To use it literally in filters, '
		 +     'you have to add backslash before. So if you want to filter a dot sign <code>.</code>, '
		 +     'use <code>\\.</code> (this applies only in "before" part, in replacing '
		 +     'pattern of the filter you should use single characters).</p></div></div>';
	$("#_c4").html(html);

	var _arr = [];
	var arr = JSON.parse(CUSTOMFILTERS);
	for (i in arr) {
		_arr.push(arr[i]["before"] + " > " + arr[i]["after"]);
	}
	$("#filters-area").val(_arr.join("\n"));
	if (EXECFILTERS) $("#exec-filters").prop('checked', true);

	$("#filters-area").on("change blur", function() {
		var arr = $("#filters-area").val().split("\n");
		var _arr = [];
		for (i in arr) {
			if (arr[i] != "") {
				var fil = arr[i].split(" > ");
				if (fil.length < 2) fil[1] = '';
				_arr.push({"before":fil[0],"after":fil[1]});
			}
		}
		setOpt('SP_customfilters_' + CLIENT.name, CUSTOMFILTERS = JSON.stringify(_arr));
	});
	$("#exec-filters").on("click", function() {
		setOpt('SP_execfilters', EXECFILTERS = $("#exec-filters").prop('checked'));
	});

	var html = '<form class="form-horizontal">You can create your own Media Database. New buttons will appear in '
		 +   'the "Add video from URL" panel (database will be loaded after clicking).'
		 +   '<p class="text-danger">Toggling custom Media Database or changing file URL requires channel '
		 +   'reload to take effect.</p>'
		 +   '<div class="form-group"><label class="control-label col-sm-5">Custom Media Database</label>'
		 +     '<div class="col-sm-7 config-col"><label class="checkbox-inline">'
		 +       '<input id="exec-db" type="checkbox"><span> Enable Database (it will override channel Media '
		 +       'Database if available)</span></label></div>'
	      	 +   '</div><div class="form-group"><label class="control-label col-sm-5">'
		 +     'Media Database URL</label><div class="col-sm-7 config-col">'
	      	 +       '<input id="customdburl" class="form-control" type="text" '
		 +       'placeholder="Custom Media Database file URL" /></div></div></form>'
		 + '<div class="clearfix5"></div><br />'
		 + '<div class="panel panel-primary"><div class="panel-heading">Preparing the code</div>'
		 +   '<div class="panel-body">' + prepareMediaDBHelp()
		 +   '<br />Save prepared code as .js file, upload it to your web hosting (Dropbox, Google Drive, '
		 +   'your own server, etc.) and paste direct link into the field above.</div></div>';
	$("#_c5").html(html);

	if (EXECDB) $("#exec-db").prop('checked', true);
	if (CUSTOMDBURL != "") $("#customdburl").val(CUSTOMDBURL);

	$("#exec-db").on("click", function() {
		setOpt('SP_execdb', EXECDB = $("#exec-db").prop('checked'));
	});
	$("#customdburl").on("change blur", function() {
		setOpt('SP_customdburl', CUSTOMDBURL = $("#customdburl").val());
	});

	var html = 'You can add your own HTML code to the polls area (in default layout an empty space '
		 + 'under the chat). Your code will be executed and displayed on the top of this module.<br />'
		 + '<span class="text-danger">Adding, removing, changing and toggling HTML code requires '
		 +   'channel reload to take effect.</span><br /><br />'
		 + '<form class="form-horizontal"><div class="col-sm-12 config-col">'
		 +   '<label class="checkbox-inline"><input id="exec-html" type="checkbox"><span> '
		 +     'Enable and Execute Custom HTML</span></label><br /><br />'
	      	 +   '<textarea id="customhtml" class="form-control" type="textarea" rows="10" '
		 +   'placeholder="Paste your HTML code here" /><br /></div></form>';
	$("#_c6").html(html);

	if (EXECHTML) $("#exec-html").prop('checked', true);
	if (CUSTOMHTML != "") $("#customhtml").val(CUSTOMHTML);

	$("#exec-html").on("click", function() {
		setOpt('SP_exechtml', EXECHTML = $("#exec-html").prop('checked'));
	});
	$("#customhtml").on("change blur", function() {
		setOpt('SP_customhtml',CUSTOMHTML = $("#customhtml").val());
	});

	$('<div class="text-info pull-left">Changes are applied automatically.</div>').appendTo(footer);
});

$("#layout-2").on("click", function() {
	$layoutMenu.removeClass('open');
	createModal('Theme & User CSS');

	var html = '<form class="form-horizontal"><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Theme / Skin</label>'
		 +   '<div class="col-sm-7 config-col"><select id="theme-sel" class="form-control"></select></div>'
		 + '</div><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Channel CSS</label>'
		 +   '<div class="col-sm-7 config-col"><label class="checkbox-inline">'
		 +     '<input id="ignore-css" type="checkbox"><span> Ignore Channels\' CSS</span></label><br />'
		 +     '<label class="checkbox-inline"><input id="ignore-this-css" type="checkbox"><span> '
		 +       'Ignore Only This Channel CSS</span></label><br />'
		 +       '(Sometimes selected theme may be in conflict with a custom channel CSS)';
	if (CHANNEL.opts.externalcss == "" && CHANNEL.css == "") {
		html += ' <span class="text-info">[no CSS here]</span>';
	}
	if (USEROPTS.ignore_channelcss) {
		html += '<br /><br /><p class="text-danger">Warning: channel CSS is now globally ignored. '
		     +    'You can change it in your user preferences on the top navigation bar '
		     +    '("Options" > "General").</p>';
	}
	html += '</div></div><div class="form-group">'
	     +    '<label class="control-label col-sm-5">User CSS</label>'
	     +    '<div class="col-sm-7 config-col"><label class="checkbox-inline">'
	     +      '<input id="exec-css" type="checkbox"><span> Enable and Execute User CSS Code</span></label>'
	     +    '</div></div></form>';
	body.html(html);
	if (IGNORECSS) {
		$("#ignore-css").prop('checked', true);
		$("#ignore-this-css").attr('disabled', 'disabled');
	}
	if (IGNORETHISCSS.split(",").indexOf(CHANNEL.name) > -1) $("#ignore-this-css").prop('checked', true);
	if (EXECCSS) $("#exec-css").prop('checked', true);

	var html = '<option value="" class="theme-header" disabled> :: Default Themes ::</option>'
		 + '<option value="/css/themes/bootstrap-theme.min.css"># Bootstrap</option>'
		 + '<option value="/css/themes/cyborg.css"># Cyborg</option>'
		 + '<option value="/css/themes/light.css"># Light</option>'
		 + '<option value="/css/themes/modern.css"># Modern</option>'
		 + '<option value="/css/themes/slate.css"># Slate</option>';
	if (ThemesArray.length > 0) {
		html += '<option value="" class="theme-header" disabled> :: Synchtube Premium Themes ::</option>';
		for (i in ThemesArray) {
			html += '<option value="' + ThemesArray[i][1] + '"># ' + ThemesArray[i][0] + '</option>';
		}
	}
	$("#theme-sel").html(html).val(USERTHEME)
	  .on("change", function() {
		USERTHEME = $(this).val();
		if (USERTHEME.indexOf('/css/themes') < 0) {
			$("#usertheme").attr('href', '/css/themes/slate.css');
			if ($("#usertheme2").length < 1) {
				$('<link id="usertheme2" rel="stylesheet" type="text/css" />')
				  .appendTo("head").attr('href', USERTHEME);
			} else $("#usertheme2").attr('href', USERTHEME);
		} else {
			$("#usertheme").attr("id", "usertheme_old");
			$('<link id="usertheme" rel="stylesheet" type="text/css" />').insertAfter("#usertheme_old")
			  .attr({'href':USERTHEME, 'onload':'$("#usertheme_old").remove()'});
			$("#usertheme2").remove();
		}
		if ($("#usercss").length > 0) $("head").append($("#usercss").detach());
		setAdditionalCSS();
		if (['/css/themes/light.css', '/css/themes/bootstrap-theme.min.css'].indexOf(USERTHEME) > -1) {
			$body.addClass('bright').removeClass('modern');
		} else if (USERTHEME == '/css/themes/modern.css') $body.addClass('modern').removeClass('bright')
		else $body.removeClass('bright modern');
		setOpt('SP_usertheme', USERTHEME);
		setTimeout(function() {handleVideoResize()}, 1500);
	  });
	$("#ignore-css").on("click", function() {
		IGNORECSS = !IGNORECSS;
		var ign = $("#ignore-this-css").prop('checked');
		if (!ign) processChannelCSS(!IGNORECSS);
		if (IGNORECSS) $("#ignore-this-css").attr('disabled', 'disabled')
		else $("#ignore-this-css").removeAttr('disabled');
		setOpt('SP_ignorecss', IGNORECSS);
		setTimeout(function() {handleVideoResize()}, 500);
	});
	$("#ignore-this-css").on("click", function() {
		var ign = $("#ignore-this-css").prop('checked');
		var arr = IGNORETHISCSS.length > 0 ? IGNORETHISCSS.split(",") : [];
		processChannelCSS(!ign);
		if (ign) {
			if (arr.indexOf(CHANNEL.name) < 0) arr.push(CHANNEL.name);
		} else {
			if (arr.indexOf(CHANNEL.name) > -1) arr.splice(arr.indexOf(CHANNEL.name), 1);
		}
		setOpt('SP_ignorethiscss', IGNORETHISCSS = arr.join(","));
		setTimeout(function() {handleVideoResize()}, 500);
	});
	$("#exec-css").on("click", function() {
		EXECCSS = !EXECCSS;
		if (!EXECCSS) $("#usercss").remove()
		else {
			if (USERCSS != "") {
				$("head").append('<style id="usercss" type="text/css">' + USERCSS + '</style>');
			}
		}
		$("#layout-2").toggleClass('activated');
		setOpt('SP_execcss', EXECCSS);
		setTimeout(function() {handleVideoResize()}, 500);
	});

	var text = 'Type or paste your CSS code here, and check "Execute User CSS Code" option above';
	cssarea = $('<textarea id="css-area" class="form-control" rows="10" />').attr('placeholder', text)
	  .val(USERCSS).appendTo(body)
	  .on("change blur", function() {
		USERCSS = cssarea.val();
		if (EXECCSS && USERCSS != "") {
			if ($("#usercss").length < 1) $("head").append('<style id="usercss" type="text/css" />');
			$("#usercss").html(USERCSS);
		} else $("#usercss").remove();
		var len = USERCSS.length;
		if (len > 100000) {
			var str = 'Your CSS code have ' + len + ' characters.\n'
				+ 'You have exceeded maximum length of code (100\'000 characters).';
			alert(str);
		} else setOpt('SP_usercss', USERCSS);
	  });

	var html = '<div class="form-group"><label class="control-label col-sm-5">Background pattern</label>'
		 + '<div class="col-sm-7 config-col"><select id="pattern-sel" class="form-control"></select></div>'
		 + '</div><div class="form-group"><label class="control-label col-sm-5">Google font</label>'
		 + '<div class="col-sm-7 config-col"><select id="font-sel" class="form-control"></select></div></div>';
	body.append('<div class="clearfix5" />')
	  .append('<form class="form-horizontal margin-top-15">' + html + '</form>');

	var html = '<option value="">none (or default background)</option>';
	if (BackgroundsArray.length > 0) {
		for (i in BackgroundsArray) {
			html += '<option value="' + BackgroundsArray[i][1] + '"># '
			     +  BackgroundsArray[i][0] + '</option>';
		}
	}

	$("#pattern-sel").html(html).val(USERPATTERN)
	  .on("change", function() {
		USERPATTERN = $(this).val();
		setAdditionalCSS();
		setOpt('SP_userpattern', USERPATTERN);
	  });

	var html = '<option value="">none (or default font)</option>';
	for (i in FontsArray) {
		html += '<option value="' + FontsArray[i] + '"># ' + FontsArray[i] + '</option>';
	}

	$("#font-sel").html(html).val(USERFONT)
	  .on("change", function() {
		USERFONT = $(this).val();
		setAdditionalCSS();
		setOpt('SP_userfont', USERFONT);
	  });

	$('<div class="text-info pull-left">Changes are applied automatically.</div>').appendTo(footer);
});

$("#layout-3").on("click", function() {
	COMPACT ? fluidLayout() : compactLayout();
	setOpt('SP_compact', COMPACT = !COMPACT);
	if ($expandChat.hasClass('label-success')) chatHeight("full");
});


$("#layout-4").on("click", function() {
	SINGLECOLUMN ? twoColumns() : singleColumn();
	setOpt('SP_singlecolumn', SINGLECOLUMN = !SINGLECOLUMN);
	if ($expandChat.hasClass('label-success')) chatHeight("full");
});

$("#layout-5").on("click", function() {
	SYNCH ? nonSynchLayout() : synchLayout();
	setOpt('SP_synch', SYNCH = !SYNCH);
});

$("#layout-6").on("click", function() {
	MOTDBOTTOM ? topMOTD() : bottomMOTD();
	setOpt('SP_motdbottom', MOTDBOTTOM = !MOTDBOTTOM);
});

$("#layout-7").on("click", function() {
	$layoutMenu.parent().removeClass('open');
	LARGECHAT ? normalChat() : largeChat();
	setOpt('SP_largechat', LARGECHAT = !LARGECHAT);
	scrollChatToTop();
});

$("#layout-8").on("click", function() {
	$layoutMenu.parent().removeClass('open');
	LARGEPLAYER ? normalPlayer() : largePlayer();
	setOpt('SP_largeplayer', LARGEPLAYER = !LARGEPLAYER);
	scrollChatToTop();
});

$("#layout-9").on("click", function() {
	theatreMode();
});

$("#layout-10").on("click", function() {
	radioMode();
});


// Remove chat messages from player

$('#main').on('transitionend', '#player-chat-wrap .player-chat', function() {
	$(this).remove();
});


// Video header labels events if expanded chat

$("#resize-video-larger, #resize-video-smaller").addClass('label label-default')
  .bind("click.expand", function() {
	if ($expandChat.hasClass('label-success')) chatHeight("full");
  });


// Chat header labels events

$expandChat.on("click", function() {
	if ($(this).hasClass('label-success')) chatHeight("compact")
	else {
		chatHeight("full");
		$(window).bind('resize.expandchat', function(e) {
			chatHeight("full");
		});
	}
	if (SCROLLCHAT) scrollChat();
});

$scrollToPl.on("click", function() {
	window.scrollTo(0, $queue.offset().top);
});

$("#scroll-top, #scroll-to-chat").on("click", function() {
	scrollChatToTop();
});


// Playlist options dropdown menu events

$("#pls-1").on("click", function() {
	createModal('Last Media');
	createModalTabs(['Current Media', 'Media History', 'My Added Media'], "lastmedia");

	var html = '';
	if (hasPermission("playlistadd")) {
		html += '<p class="text-info">Click "+" button to paste selected link into "Add video" input.</p>'
		     +  '<br />';
	}
	html += 'List of media played in current session (<span id="sort-txt1"></span> first).<br /><br />'
	      + '<table class="table table-striped table-condensed"><thead>'
	      +   '<th>Num. <span id="sort-a1" class="glyphicon glyphicon-sort small"></span></th>'
	      +   '<th>Title</th></thead><tbody id="tbl-body1"></tbody></table>';
	$("#_c1").html(html);

	function _sort1() {
		$("#sort-txt1").html(SORTMODE.mediaCurrent == "old" ? 'oldest' : 'newest');
		var arr = [];
		for (i in LASTPLAYED) {
			arr.push(LASTPLAYED[i]);
		}
		if (SORTMODE.mediaCurrent == "new") arr = arr.reverse();
		var len = arr.length;
		var html = '';
		for (i in arr) {
			var nr = (SORTMODE.mediaCurrent == "new") ? (parseFloat(i) + 1) : (len - i);
			html += '<tr><td>' + nr + '.</td><td>';
			if (hasPermission("playlistadd")) {
				html += '<button class="btn btn-xs btn-default pull-left modal-btn-xs" '
				      + 'title="Click to copy link" onClick="pasteLink(\'' + arr[i]["link"] + '\'); '
				      + '$(\'#close-modal-btn\').trigger(\'click\')">+</button>';
			}
			html += '<a href="' + arr[i]["link"] + '" target="_blank">'
			      + arr[i]["title"] + '</a></td></tr>';
		}
		$("#tbl-body1").html(html);
	}
	_sort1();

	$("#sort-a1").on("click", function() {
		SORTMODE.mediaCurrent = (SORTMODE.mediaCurrent == "old") ? 'new' : 'old';
		_sort1();
	});

	var html = 'History of your plays as <b>' + (CLIENT.name != "" ? CLIENT.name : '<i>anonymous</i>') + '</b> '
		 + '(up to last 200 unique media, <span id="sort-txt2"></span> first).<br /><br />'
		 + '<table class="table table-striped table-condensed"><thead>'
		 +   '<th>Num. <span id="sort-a2" class="glyphicon glyphicon-sort small"></span></th>'
		 +   '<th>Title</th></thead><tbody id="tbl-body2"></tbody></table>';
	$("#_c2").html(html);

	function _sort2() {
	var obj = JSON.parse(getOrDefault('SP_playerhistory_' + CLIENT.name, '[]'));
		$("#sort-txt2").html(SORTMODE.mediaHistory == "new" ? 'newest' : 'oldest');
		var arr = [];
		for (i in obj) {
			arr.push(obj[i]);
		}
		if (SORTMODE.mediaHistory == "new") arr = arr.reverse();
		var len = arr.length;
		var html = '';
		for (i in arr) {
			var nr = (SORTMODE.mediaHistory == "new") ? (parseFloat(i) + 1) : (len - i);
			html += '<tr><td>' + nr + '.</td><td>';
			if (hasPermission("playlistadd")) {
				html += '<button class="btn btn-xs btn-default pull-left modal-btn-xs" '
				      + 'title="Click to copy link" onClick="pasteLink(\'' + arr[i]["link"] + '\'); '
				      + '$(\'#close-modal-btn\').trigger(\'click\')">+</button>';
			}
			html += '<a href="' + arr[i]["link"] + '" target="_blank">'
			      + arr[i]["title"] + '</a></td></tr>';
		}
		$("#tbl-body2").html(html);
	}
	_sort2();

	$("#sort-a2").on("click", function() {
		SORTMODE.mediaHistory = (SORTMODE.mediaHistory == "old") ? 'new' : 'old';
		_sort2();
	});

	var html = '';
	if (hasPermission("playlistadd")) {
		html += '<p class="text-info">Click "+" button to paste selected link into "Add video" input.</p>'
		     +  '<br />';
	}
	html += 'History of your links added as <b>' + (CLIENT.name != "" ? CLIENT.name : '<i>anonymous</i>') + '</b> '
	      + '(up to last 200 unique, <span id="sort-txt3"></span> first).<br /><br />'
		 + '<table class="table table-striped table-condensed"><thead>'
		 +   '<th>Num. <span id="sort-a3" class="glyphicon glyphicon-sort small"></span></th>'
		 +   '<th>Title</th></thead><tbody id="tbl-body3"></tbody></table>';
	$("#_c3").html(html);

	function _sort3() {
	var obj = JSON.parse(getOrDefault('SP_addedlinks_' + CLIENT.name, '[]'));
		$("#sort-txt3").html(SORTMODE.mediaAdded == "new" ? 'newest' : 'oldest');
		var arr = [];
		for (i in obj) {
			arr.push(obj[i]);
		}
		if (SORTMODE.mediaAdded == "new") arr = arr.reverse();
		var len = arr.length;
		var html = '';
		for (i in arr) {
			var nr = (SORTMODE.mediaAdded == "new") ? (parseFloat(i) + 1) : (len - i);
			html += '<tr><td>' + nr + '.</td><td>';
			if (hasPermission("playlistadd")) {
				html += '<button class="btn btn-xs btn-default pull-left modal-btn-xs" '
				      + 'title="Click to copy link" onClick="pasteLink(\'' + arr[i]["link"] + '\'); '
				      + '$(\'#close-modal-btn\').trigger(\'click\')">+</button>';
			}
			html += '<a href="' + arr[i]["link"] + '" target="_blank">'
			      + arr[i]["title"] + '</a></td></tr>';
		}
		$("#tbl-body3").html(html);
	}
	_sort3();

	$("#sort-a3").on("click", function() {
		SORTMODE.mediaAdded = (SORTMODE.mediaAdded == "old") ? 'new' : 'old';
		_sort3();
	});

	$plsbtnouter.removeClass('open');

	$('<button class="btn btn-default pull-left" data-dismiss="modal">Get Links</button>').appendTo(footer)
	  .on("click", function() {
		var obj;
		if (VISIBLETAB["lastmedia"] == 1) {
			createModal('Current Media URLs');
			obj = LASTPLAYED;
			if (SORTMODE.mediaCurrent == "new") obj = obj.reverse();
		} else if (VISIBLETAB["lastmedia"] == 2) {
			createModal('Media History URLs');
			obj = JSON.parse(getOrDefault('SP_playerhistory_' + CLIENT.name, '[]'));
			if (SORTMODE.mediaHistory == "new") obj = obj.reverse();
		} else if (VISIBLETAB["lastmedia"] == 3) {
			createModal('My Added Media URLs');
			obj = JSON.parse(getOrDefault('SP_addedlinks_' + CLIENT.name, '[]'));
			if (SORTMODE.mediaAdded == "new") obj = obj.reverse();
		}
		$(".modal-dialog-nonfluid").removeClass('modal-dialog-nonfluid non-fluid');

		var data = $('<textarea rows="10" class="form-control" />').appendTo(body);
		var arr = [];
		for (i in obj) {
			arr.push(obj[i]["link"]);
		}
		data.val(arr.join(","));

		function _switch(arr, btn, sep) {
			data.val(arr.join(sep));
			$(".glinks").removeClass('btn-success');
			$(btn).addClass('btn-success');
		}

		$('<button class="btn btn-default btn-success pull-left glinks">Raw Links</button>').appendTo(footer)
		  .on("click", function() {
			var arr = [];
			for (i in obj) {
				arr.push(obj[i]["link"]);
			}
			_switch(arr, this, ',');
		  });
		$('<button class="btn btn-default pull-left glinks">Plain Text</button>').appendTo(footer)
		  .on("click", function() {
			var arr = [];
			for (i in obj) {
				arr.push((parseFloat(i) + 1) + '. ' + obj[i]["link"] + ' :: ' + obj[i]["title"]);
			}
			_switch(arr, this, '\n');
		  });
		$('<button class="btn btn-default pull-left glinks">HTML Code</button>').appendTo(footer)
		  .on("click", function() {
			var arr = ['<ol>'];
			for (i in obj) {
				var str = '<a href="' + obj[i]["link"] + '" target="_blank">'
					+ obj[i]["link"] + '</a>';
				arr.push('<li>' + obj[i]["title"] + ' - ' + str + '</li>');
			}
			arr.push('</ol>');
			_switch(arr, this, '\n');
		  });
		$('<button class="btn btn-default pull-left glinks">Ordered List</button>').appendTo(footer)
		  .on("click", function() {
			var arr = [];
			for (i in obj) {
				arr.push(obj[i]["title"] + ' ●● ' + obj[i]["link"]);
			}
			arr.sort();
			_switch(arr, this, '\n');
		  });
		$('<button class="btn btn-default pull-left glinks">Array Format</button>').appendTo(footer)
		  .on("click", function() {
			var arr = [];
			for (i in obj) {
				var re1 = new RegExp('\\\\', 'g');
				var re2 = new RegExp('\'', 'g');
				var title = obj[i]["title"].replace(re1, '\\\\').replace(re2, '\\\'');
				arr.push('[\'' + obj[i]["link"] + '\', \'' + title + '\'],');
			}
			_switch(arr, this, '\n');
		  });
	  });
});

$("#pls-2").on("click", function() {
	createModal('Contributors Ranking');

	var list = {};
	$queue.find("li").each(function() {
		var item = $(this).attr('title');
		var user = item.split('by: ')[1];
		user in list ? list[user]++ : list[user] = 1;
	});
	var list2 = [];
	for (key in list) {
		list2.push([key, list[key]]);
	}
	list2.sort(function(a, b) {return a[1] - b[1]}).reverse();
	var html = 'Ranking of users by number of items added to current playlist.<br /><br />'
		 + '<table id="contributors-list" class="table table-striped table-condensed">'
		 +   '<thead><th>Rank</th><th>Username</th><th>Playlist items</th></thead>';
	for (i in list2) {
		html += '<tr><td>' + (i * 1 + 1) + '. </td><td>' + list2[i].join('</td><td> ') + '</td></tr>';
	}
	html += '</table><br />';
	body.html(html);
	$plsbtnouter.removeClass('open');
});

$("#pls-3").on("click", function() {
	$plsbtnouter.removeClass('open');
});

$("#pls-4").on("click", function() {
	PLSNUMBERS ? queueMode("default") : queueMode("numbered");
	$(this).toggleClass('activated');
	setOpt('SP_plsnumbers', PLSNUMBERS = !PLSNUMBERS);
});

$("#pls-5").on("click", function() {
	SHOWCONTRIBS ? contributorsNames("hide") : contributorsNames("show");
	$(this).toggleClass('activated');
	setOpt('SP_showcontribs', SHOWCONTRIBS = !SHOWCONTRIBS);
});

$("#pls-6").on("click", function() {
	$("#pls-menu").find("li[group=1]").hide();
	$("#pls-menu").find("li[group=2]").show();
});

$("#pls-7").on("click", function() {
	$("#pls-menu").find("li[group=1]").show();
	$("#pls-menu").find("li[group=2]").hide();
});

$("#pls-8").on("click", function() {
	$(this).toggleClass('activated');
	toggleElement($plfiltercontrol);
	$plsbtnouter.removeClass('open');
});

$("#pls-9").on("click", function() {
	PLSNOSCROLL ?  queueScrollbar("show") : queueScrollbar("hide");
	$(this).toggleClass('activated');
	setOpt('SP_plsnoscroll', PLSNOSCROLL = !PLSNOSCROLL);
});

$("#pls-10").on("click", function() {
	MINIATURES ? queueMiniatures("hide") : queueMiniatures("show");
	$(this).toggleClass('activated');
	setOpt('SP_miniatures', MINIATURES = !MINIATURES);
	scrollQueue();
});

$("#pls-11").on("click", function() {
	if (HIDEPLSBTNS) {
		if (hasPermission("playlistjump") || hasPermission("settemp") || hasPermission("playlistdelete")) {
			if (USEROPTS.qbtn_hide) {
				var str = 'Warning! You have disabled playlist buttons globally.\n'
					+ 'You can change it in your user preferences on the top navigation bar\n'
					+ '("Options" > "Playback").'
				alert(str);
			}
			queueButtons("show");
		} else alert('You have no permission to display playlist buttons on this channel.');
	} else queueButtons("hide");
	$(this).toggleClass('activated');
	setOpt('SP_hideplsbtns', HIDEPLSBTNS = !HIDEPLSBTNS);
	scrollQueue();
});


// Player options dropdown menu events

$("#plr-1").on("click", function() {
	if (HIDDENPLR) $("#hidden-plr").remove()
	else {
		var css = 'background-image:url(\'' + PlayerCoveringURL + '\') !important';
		if (HIDEPLAYERURL != "" && IMAGEURLACCEPT) {
			css = 'background-image:url(\'' + HIDEPLAYERURL + '\') !important';
		}
		$videowrap.find(".embed-responsive-16by9")
		  .append('<div id="hidden-plr" class="maxwidth" style="' + css + '" />');
	}
	$(this).toggleClass('activated');
	HIDDENPLR = !HIDDENPLR;
});

$("#plr-2").on("click", function() {
	FULLTITLE ? titlebarMode("compact") : titlebarMode("full");
	setOpt('SP_fulltitle', FULLTITLE = !FULLTITLE);
	if ($expandChat.hasClass('label-success')) chatHeight("full");
});

$("#plr-3").on("click", function() {
	PROGRESSBAR ? progressBarMode("hide") : progressBarMode("show");
	$(this).toggleClass('activated');
	setOpt('SP_progressbar', PROGRESSBAR = !PROGRESSBAR);
});

$("#plr-4").on("click", function() {
	TIMELEFT ? mediaTimeLeft("hide") : mediaTimeLeft("show");
	$(this).toggleClass('activated');
	setOpt('SP_timeleft', TIMELEFT = !TIMELEFT);
});

$("#plr-5").on("click", function() {
	if (!PLAYER) return;
	if (typeof BRIGHTNESS === "undefined") BRIGHTNESS = 0;
	BRIGHTNESS--;
	$("#plr-bright").remove();
	$("#plr-7").removeClass('disabled');
	if (BRIGHTNESS < -8) $(this).addClass('disabled');
	$("#light-level").html((BRIGHTNESS > 0 ? '+' : '') + '' + BRIGHTNESS * 10 + '%');
	setPlayerBrightness();
});

$("#plr-6").on("click", function() {
	BRIGHTNESS = 0;
	$("#plr-bright").remove();
	$("#plr-5, #plr-7").removeClass('disabled');
	$("#light-level").html('0%');
});

$("#plr-7").on("click", function() {
	if (!PLAYER) return;
	if (typeof BRIGHTNESS === "undefined") BRIGHTNESS = 0;
	BRIGHTNESS++;
	$("#plr-bright").remove();
	$("#plr-5").removeClass('disabled');
	if (BRIGHTNESS > 8) $(this).addClass('disabled');
	var plus = BRIGHTNESS > 0 ? '+' : '';
	$("#light-level").html(plus + '' + BRIGHTNESS * 10 + '%');
	setPlayerBrightness();
});

$("#plr-8").on("click", function() {
	if (!PLAYER) return;
	PLAYER.getVolume(function(vol) {
		vol = Math.ceil(Math.round((vol - 0.04) * 100) / 4) * 0.04;
		if (vol <= 0) {
			vol = 0;
			$("#plr-9").attr('title', 'Unmute player').addClass('btn-danger');
			$("#plr-btn").addClass('btn-danger');
		}
		CURRENTVOL = vol;
		PLAYER.setVolume(vol);
		document.getElementById("volume-lvl").innerHTML = Math.round(vol * 100);
		if ($body.hasClass('radio-mode')) radioslider.slider('value', CURRENTVOL * 100);
	});
});

$("#plr-9").on("click", function() {
	if (!PLAYER) return;
	if ($(this).hasClass('btn-danger')) {
		$(this).attr('title', 'Mute player');
		if (CURRENTVOL > 0) $("#plr-btn").removeClass('btn-danger');
		$("#plr-8").removeClass('disabled');
		document.getElementById("volume-lvl").innerHTML = Math.round(CURRENTVOL * 100);
		PLAYER.setVolume(CURRENTVOL);
		if ($body.hasClass('radio-mode')) radioslider.slider('value', CURRENTVOL * 100);
	} else {
		PLAYER.getVolume(function(vol) {
			CURRENTVOL = vol;
		});
		$(this).attr('title', 'Unmute player');
		$("#plr-btn").addClass('btn-danger');
		$("#plr-8").addClass('disabled');
		document.getElementById("volume-lvl").innerHTML = '0';
		PLAYER.setVolume(0);
		if ($body.hasClass('radio-mode')) radioslider.slider('value', 0);
	}
	$(this).toggleClass('btn-danger');
});

$("#plr-10").on("click", function() {
	if (!PLAYER) return;
	PLAYER.getVolume(function(vol) {
		vol = Math.floor(Math.round((vol + 0.04) * 100) / 4) * 0.04;
		if (vol > 1) vol = 1;
		$("#plr-9").attr('title', 'Mute player').removeClass('btn-danger');
		$("#plr-btn").removeClass('btn-danger');
		$("#plr-8").removeClass('disabled');
		CURRENTVOL = vol;
		PLAYER.setVolume(vol);
		document.getElementById("volume-lvl").innerHTML = Math.round(vol * 100);
		if ($body.hasClass('radio-mode')) radioslider.slider('value', CURRENTVOL * 100);
	});
});

$("#plr-11").on("click", function() {
	$("#plr-menu").find("li[group=1]").hide();
	$("#plr-menu").find("li[group=2]").show();
});

$("#plr-12").on("click", function() {
	$("#plr-menu").find("li[group=1]").show();
	$("#plr-menu").find("li[group=2]").hide();
});

$("#plr-13").on("click", function() {
	if ($(this).hasClass('activated')) {
		HIDDENVWRAP = false;
		$("#layout-4, #layout-7, #layout-8, #layout-9, #layout-10, #videowrap, #plr-14, #jukebox-btn").show();
		$chatwrap.removeClass().addClass('col-lg-5 col-md-5');
		if (!$expandChat.hasClass('label-success')) handleVideoResize();
		if (PLAYER) PLAYER.setVolume(CURRENTVOL);
		var match = document.getElementById("leftcontrols").className.match(/col-md-(\d+)/);
		var classe = parseInt(match[1], 10);
		$chatwrap.removeClass().addClass('col-md-' + classe + ' col-lg-' + classe);
	} else {
		HIDDENVWRAP = true;
		$("#layout-4, #layout-7, #layout-8, #layout-9, #layout-10, #videowrap, #plr-14, #jukebox-btn").hide();
		$chatwrap.removeClass().addClass('col-lg-12 col-md-12');
		if (PLAYER) {
			PLAYER.getVolume(function(vol) {
				CURRENTVOL = vol;
			});
			PLAYER.setVolume(0);
		}
	}
	setTimeout(function() {volumeLvl()}, 500);
	$(this).toggleClass('activated');
	if (SCROLLCHAT) scrollChat();
});

$("#plr-14").on("click", function() {
	if ($(this).hasClass('activated')) {
		NOPLAYER = false;
		$("#layout-8, #layout-9, #layout-10, #titlerow, #videowrap, #plcontrol").show();
		$("#videocontrols > button, #plr-menu > li:not(.rpl)").show();
		$("#fullscreenbtn, #plr-17, #plr-13").show();
		document.getElementById("plr-11").click();
		if (SINGLECOLUMN || LARGECHAT || LARGEPLAYER) setTimeout(function() {$("#plr-13").hide()}, 500);
		if ($favsBtn.hasClass('active')) $favscontrol.show();
		var tmp = $('<div class="embed-responsive embed-responsive-16by9" />').appendTo($videowrap);
		$ytapiplayer = $('<iframe id="ytapiplayer" class="embed-responsive-item" frameborder="0" />')
		  .attr({title:'YouTube video player', allowfullscreen:'1'}).appendTo(tmp);
		refreshPlayer();
		if (!$expandChat.hasClass('label-success')) handleVideoResize();
		if (PLAYERTEXT) $videowrap.find(".embed-responsive-16by9").prepend('<div id="player-chat-wrap" />');
	} else {
		NOPLAYER = true;
		$videowrap.find(".embed-responsive-16by9").remove();
		$("#plr-15, #plr-16").removeClass('activated');
		$("#layout-8, #layout-9, #layout-10, #titlerow, #videowrap, #plcontrol").hide();
		$("#videocontrols > button, #plr-menu > li:not(.rpl)").hide();
		$("#fullscreenbtn, #favscontrol, #plr-13, #plr-17").hide();
		$("#plr-17").removeClass('activated');
	}
	document.getElementById("plr-6").click();
	$(this).toggleClass('activated');
});

$("#plr-15").on("click", function() {
	if (!$(this).hasClass('activated')) $("#plr-16").removeClass('activated');
	$videowrap.find(".embed-responsive-16by9").toggleClass('mX').removeClass('mY');
	$(this).toggleClass('activated');
});

$("#plr-16").on("click", function() {
	if (!$(this).hasClass('activated')) $("#plr-15").removeClass('activated');
	$videowrap.find(".embed-responsive-16by9").toggleClass('mY').removeClass('mX');
	$(this).toggleClass('activated');
});

$("#plr-17").on("click", function() {
	SHOWMASCOT ? playerMascot("hide") : playerMascot("show");
	$(this).toggleClass('activated');
	setOpt('SP_showmascot', SHOWMASCOT = !SHOWMASCOT);
});


// Favourites button events

$("#favs-btn").on("click", function() {
	toggleElement($favscontrol);
	$(this).toggleClass('active');
	$(this).hasClass('active') ? createFavsPanel() : document.getElementById("queue-fav").innerHTML = '';
});


// Notepad button events

$("#notepad-btn").on("click", function() {
	toggleElement($notepadwrap);
	$(this).toggleClass('btn-success');
});


// Chat sounds control button events

$("#sounds-btn").on("click", function() {
	createModal('Chat Sounds Control');

	if (typeof BLINKBTN !== "undefined") {
		clearInterval(BLINKBTN);
		$(this).removeClass('btn-warning');
	}

	var panel = $('<div class="panel panel-primary" />').appendTo(body);
	panel.append('<div class="panel-heading">Chat sounds volume<span id="cslvl" class="pull-right"></span></div>');
	var div = $('<div class="panel-body" />').appendTo(panel);
	chatslider = $('<div id="chatslider" />').appendTo(div).slider({
		range:"min", min:0, max:100, value:SOUNDSLVL * 10,
		change: (function(event, ui) {
			SOUNDSLVL = ui.value / 10;
			$("#cslvl").html((SOUNDSLVL * 10) + '%');
			setOpt('SP_soundslvl', SOUNDSLVL);
		})
	});
	$("#cslvl").html((SOUNDSLVL * 10) + '%');

	var lang = [
		['English', 'en'], ['Dutch', 'nl'], ['Finnish', 'fi'], ['French', 'fr'], ['German', 'de'],
		['Hungarian', 'hu'], ['Italian', 'it'], ['Japanese', 'ja'], ['Polish', 'pl'],
		['Portuguese', 'pt'], ['Romanian', 'ro'], ['Russian', 'ru'], ['Spanish', 'es']
	];

	panel.append('<div class="panel-heading">Text-to-speech language</div>');
	var html = '<div class="panel-body"><form class="form-horizontal"><div class="form-group">'
		 +   '<div class="col-sm-8 col-lg-6 config-col"><select id="tts-language" class="form-control">';
	for (i in lang) html += '<option value="' + lang[i][1] + '">' + lang[i][0] + '</option>';
	html += '</select></div></div></form></div>';
	panel.append(html);
	$("#tts-language").val(TTSLANGUAGE)
	  .on("change", function() {
		TTSLANGUAGE = $(this).val();
		setOpt('SP_ttslanguage', TTSLANGUAGE);
	  });

	if (WelcomeSoundFileURL != "") {
		panel.append('<div class="panel-heading">Welcome sound file</div>');
		var div = $('<div class="panel-body" />').appendTo(panel);
		var html = '<div class="form-group"><div class="col-sm-12 config-col">'
			 +   '<label class="checkbox-inline"><input id="play-welcome" type="checkbox">'
			 +   '<span> Play welcome sound file on load';
		html += '</span></label></div></div><br />';
		div.html(html);
		if (PLAYWELCOME) $("#play-welcome").prop('checked', true);
		$("#play-welcome").on("click", function() {
			PLAYWELCOME = $("#play-welcome").prop('checked');
			setOpt('SP_playwelcome', PLAYWELCOME);
		});
	}

	if (!jQuery.isEmptyObject(SoundFiltersArray)) {
		$('<div class="panel-heading" />').appendTo(panel)
		  .html('Chat soundfilters - select specific users to temporary mute');
		var div = $('<div class="panel-body" />').appendTo(panel);

		var wrap = $('<div />').appendTo(div);
		muteallbtn = $('<button id="muteall-btn" class="btn btn-primary btn-default" />')
		  .appendTo(wrap).html('Mute all soundfilters')
		  .on("click", function() {
			if (MUTECHAT) {
				$(this).html('Mute all soundfilters').removeClass('btn-danger');
				$("#sounds-btn").removeClass('btn-danger');
			} else {
				$(this).html('Unmute all soundfilters').addClass('btn-danger');
				$("#sounds-btn").addClass('btn-danger');
			}
			setOpt('SP_mutechat', MUTECHAT = !MUTECHAT);
	  	  });
		if (MUTECHAT) muteallbtn.html('Unmute all soundfilters').addClass('btn-danger');

		mutegroup = $('<div class="btn-group" id="mutegroup" />').appendTo(div);
		$(".userlist_item").each(function() {
			var user = $(this).find("span:nth-child(2)").html();
			var btn = $('<button class="btn btn-primary btn-default btn-sm" name="' + user + '" />')
			  .appendTo(mutegroup).html(user)
			  .on("click", function() {
				var name = $(this).attr('name');
				if (name in MUTEDVOICES && MUTEDVOICES[name] == "1") {
					$(this).removeClass('btn-danger');
					MUTEDVOICES[name] = 0;
				} else {
					$(this).addClass('btn-danger');
					MUTEDVOICES[name] = 1;
				}
	 		  });
			if (user in MUTEDVOICES && MUTEDVOICES[user] == "1") btn.addClass('btn-danger');
		});

		var html = '<div class="panel-heading">List of channel\'s chat soundfilters</div>'
			 + '<div class="panel-body">'
			 +   '<table id="soundfilters-list" class="table table-striped table-condensed">'
			 +     '<thead><th>Filter</th><th>Play file</th></thead></table></div>';
		panel.append(html);
		for (i in SoundFiltersArray) {
			var tr = $('<tr />').appendTo("#soundfilters-list");
			$('<td>' + i + '</td>').appendTo(tr);
			var td = $('<td />').appendTo(tr);
			$('<button class="btn btn-xs btn-default" title="Play sound file" type="button" />')
			  .appendTo(td)
			  .html('<span class="glyphicon glyphicon-play"></span>').attr('link', SoundFiltersArray[i])
			  .on("click", function() {
				SFILE = new Audio($(this).attr('link'));
				SFILE.volume = SOUNDSLVL * 0.1;
				SFILE.play();
			  });
		}
	}

	$('<div class="text-info pull-left">Changes are applied automatically.</div>').appendTo(footer);
});


// Chat functions dropdown menu events

$("#chat-f1").on("click", function() {
	createModal('Premium Commands Help');
	createModalTabs(['Functions', 'Text effects', 'Layout', 'Shorthands', 'Keyboard'], "commands");

	var html = '';
	if (CHANNEL.opts.chat_antiflood && CHANNEL.opts.chat_antiflood_params.burst < 2) {
		html += '<p class="text-danger">Warning! Non-playlist commands cannot be executed on this channel - '
		     +    'chat antiflood is enabled. "# of messages allowed before throttling" option in '
		     +    'Chat Settings must be above 1 to run those commands. Ask channel administrator.</p><br />';
	}
	html += '<div class="panel panel-primary"><div class="panel-heading">Random-type commands</div>'
	     +    '<div class="panel-body"><table class="commands-tbl">'
	     +      '<tr><td><code>!gif</code></td><td>get random gif from giphy.com, using selected phrase<br />'
	     +        '(e.g. <i>!gif anime</i>)</td></tr>'
	     +      '<tr><td><code>!pick</code></td><td>choose a random option from a list separated by commas<br />'
	     +        '(e.g. <i>!pick japan,korea,china</i>)</td></tr>'
	     +      '<tr><td><code>!ask</code></td><td>ask yes-no type question<br />'
	     +        '(e.g. <i>!ask Am I stupid?</i>)</td></tr>'
	     +      '<tr><td><code>!fortune</code></td><td>check your daily fate<br />'
	     +      '<tr><td><code>!emote</code></td><td>post random emote</td></tr>'
	     +      '<tr><td><code>!dice</code></td><td>roll a dice</td></tr>'
	     +      '<tr><td><code>!roll</code></td><td>roll a 6-digit number</td></tr>'
	     +      '<tr><td><code>!game</code></td><td>simple browser game - guess a number</td></tr>'
	     +    '</table></div><div class="panel-heading">Info commands</div>'
	     +    '<div class="panel-body"><table class="commands-tbl">'
	     +      '<tr><td><code>!stat</code></td><td>display current session user chat statistics</td></tr>'
	     +      '<tr><td><code>!time</code></td><td>display current local time</td></tr>'
	     +      '<tr><td><code>!now</code></td><td>display current media title</td></tr>'
	     +      '<tr><td><code>!uagent</code></td><td>display local full user agent string</td></tr>'
	     +      '<tr><td><code>!calc</code></td><td>do a simple math operation<br />'
	     +        '(+, -, *, / operations allowed, e.g. <i>!calc 5*3-4</i>)</td></tr>'
	     +    '</table></div><div class="panel-heading">Playlist commands '
	     +      '(for users with permissions)</div><div class="panel-body"><table class="commands-tbl">'
	     +        '<tr><td><code>!add</code></td><td>add a link to the end of playlist<br />'
	     +          '(e.g. <i>!add https://www.youtube.com/watch?v=9bZkp7q19f0</i>)</td></tr>'
	     +        '<tr><td><code>!skip</code></td><td>voteskip current item</td></tr>'
	     +        '<tr><td><code>!next</code></td><td>play next item</td></tr>'
	     +        '<tr><td><code>!bump</code></td><td>bump last item on the playlist to next</td></tr>'
	     +        '<tr><td><code>!movernd</code></td><td>move random item to random position '
	     +          'on the playlist</td></tr>'
	     +        '<tr><td><code>!drop</code></td><td>drop first item to the end of playlist</td></tr>'
	     +        '<tr><td><code>!deletelast</code></td><td>delete last item</td></tr>'
	     +  '</table></div></div>';
	$("#_c1").html(html);

	var ns = '<i>(some browsers may not support this effect)</i>';
	var html = 'Type and send to chat text between codes given below, to apply selected effects.<br /><br />'
		 + '<div class="panel panel-primary"><div class="panel-heading">Genuine codes</div>'
		 +   '<div class="panel-body"><table class="commands-tbl">'
		 +     '<tr><td><code>:+</code> ...... <code>+:</code></td><td><b>bold</b> text</td></tr>'
		 +     '<tr><td><code>:=</code> ...... <code>=:</code></td><td><i>italic</i> text</td></tr>'
		 +     '<tr><td><code>:@</code> ...... <code>@:</code></td><td><u>underlined</u> text</td></tr>'
		 +     '<tr><td><code>:@@</code> ...... <code>@@:</code></td><td>'
		 +	 '<span style="border-bottom:dotted 1px !important">dots-underlined</span> text</td></tr>'
		 +     '<tr><td><code>:-</code> ...... <code>-:</code></td><td><s>striked</s> text</td></tr>'
		 +     '<tr><td><code>:!</code> ...... <code>!:</code></td><td>'
		 +	 '<span style="font-size:0.8em !important">smaller</span> text</td></tr>'
		 +     '<tr><td><code>:$</code> ...... <code>$:</code></td><td>'
		 +	 '<span style="font-variant:small-caps !important">small-caps</span> text</td></tr>'
		 +     '<tr><td><code>:%</code> ...... <code>%:</code></td><td>'
		 +	 '<span style="letter-spacing:2px !important">letter-spaced</span> text</td></tr>'
		 +     '<tr><td><code>:#</code> ...... <code>#:</code></td><td>'
		 +	 '<span style="font-family:Menlo,Monaco,Consolas,\'Courier New\',monospace !important">'
		 +	    'monospaced</span> text</td></tr>'
		 +     '<tr><td><code>:^</code> ...... <code>^:</code></td><td>'
		 +	 '<span class="stitched">stitched</span> text</td></tr>'
		 +     '<tr><td><code>:/</code> ...... <code>/:</code></td><td>bouncing text ' + ns + '</td></tr>'
		 +     '<tr><td><code>://</code> ...... <code>//:</code></td><td>floating text ' + ns + '</td></tr>'
		 +   '</table></div><div class="panel-heading">BBCodes</div>'
		 +   '<div class="panel-body"><table class="commands-tbl">'
		 +     '<tr><td><code>[b]</code> ...... <code>[/b]</code></td><td><b>bold</b> text</td></tr>'
		 +     '<tr><td><code>[i]</code> ...... <code>[/i]</code></td><td><i>italic</i> text</td></tr>'
		 +     '<tr><td><code>[u]</code> ...... <code>[/u]</code></td><td><u>underlined</u> text</td></tr>'
		 +     '<tr><td><code>[s]</code> ...... <code>[/s]</code></td><td><s>striked</s> text</td></tr>'
		 +     '<tr><td><code>[code]</code> ...... <code>[/code]</code></td>'
		 +	 '<td><code>code-like</code> text</td></tr>'
		 + '</table></div></div>';
	$("#_c2").html(html);

	var html = '<div class="panel panel-primary">'
		 +    '<div class="panel-heading">Settings commands</div>'
		 +    '<div class="panel-body"><table class="commands-tbl">'
		 +      '<tr><td><code>/help</code></td><td>open this modal window</td></tr>'
		 +      '<tr><td><code>/premium</code></td><td>open "Premium Settings" modal window</td></tr>'
		 +      '<tr><td><code>/css</code></td><td>open "Theme & User CSS" modal window</td></tr>'
		 +    '</table></div><div class="panel-heading">General layout commands</div>'
		 +    '<div class="panel-body"><table class="commands-tbl">'
		 +      '<tr><td><code>/theatre</code></td><td>switch to Theatre Mode</td></tr>'
		 +      '<tr><td><code>/radio</code></td><td>switch to Radio Mode</td></tr>'
		 +      '<tr><td><code>/close</code></td><td>close Theatre or Radio Mode</td></tr>'
		 +    '</table></div><div class="panel-heading">Chat commands</div>'
		 +    '<div class="panel-body"><table class="commands-tbl">'
		 +      '<tr><td><code>/leader</code></td><td>'
		 +        'toggle your Leader status (if you have permission)</td></tr>'
		 +      '<tr><td><code>/chatclear</code></td><td>clear current content of your chat window</td></tr>'
		 +      '<tr><td><code>/emotes</code></td><td>open handy "Emotes" panel</td></tr>'
		 +      '<tr><td><code>/unicode</code></td><td>open "Unicode characters" panel</td></tr>'
		 +      '<tr><td><code>/msg</code></td><td>open "My Messages" modal window</td></tr>'
		 +      '<tr><td><code>/expchat</code></td><td>toggle chat expanding</td></tr>'
		 +      '<tr><td><code>/autoscroll</code></td><td>toggle chat autoscroll</td></tr>'
		 +      '<tr><td><code>/ulist</code></td><td>show/hide userlist</td></tr>'
		 +      '<tr><td><code>/ulistside</code></td><td>toggle userlist side</td></tr>'
		 +      '<tr><td><code>/top</code></td><td>scroll chat panel to top<td></td></tr>'
		 +    '</table></div><div class="panel-heading">Player commands</div>'
		 +    '<div class="panel-body"><table class="commands-tbl">'
		 +      '<tr><td><code>/plhide</code></td><td>toggle "Hide Player Until Next" function</td></tr>'
		 +      '<tr><td><code>/pltoggle</code></td><td>toggle player displaying</td></tr>'
		 +      '<tr><td><code>/plmute</code></td><td>toggle player muting</td></tr>'
		 +      '<tr><td><code>/nn</code></td><td>toggle NicoNico mode '
		 +        '(chat messages displayed on player)</td></tr>'
		 +      '<tr><td><code>/mascot</code></td><td>toggle player mascot</td></tr>'
		 +    '</table></div><div class="panel-heading">Playlist commands</div>'
		 +    '<div class="panel-body"><table class="commands-tbl">'
		 +      '<tr><td><code>/last</code></td><td>open "Last Played" modal window</td></tr>'
		 +      '<tr><td><code>/save</code></td><td>download current item (if available)</td></tr>'
		 +      '<tr><td><code>/fav</code></td><td>add current item to your Premium favourites</td></tr>'
		 +    '</table></div><div class="panel-heading">Account commands</div>'
		 +    '<div class="panel-body"><table class="commands-tbl">'
		 +      '<tr><td><code>/hist</code></td><td>open "My Chat History" modal window</td></tr>'
		 +      '<tr><td><code>/mentions</code></td><td>open "My Mentions" modal window</td></tr>'
		 +  '</table></div></div>';
	$("#_c3").html(html);

	var html = 'Use chatline shortcuts instead of defined long texts or code sequences.<br /><br />'
		 + '<table id="sctbl" class="commands-tbl maxwidth"></table><br /><div class="centered">'
		 +   '<button id="saveshortcuts-btn" class="btn btn-primary">Save Changes</button><br /><br /></div>';
	$("#_c4").html(html);

	SHORTHANDS = getOrDefault('SP_shorthands_' + CLIENT.name, '[]');
	var arr = JSON.parse(SHORTHANDS);
	for (var i = 0; i < 10 ; i++) {
		var html = '<td><code>//' + i + '</code></td><td>'
			 +   '<input id="shortcut' + i + '" class="form-control maxwidth" type="text" maxlength="240">'
			 + '</td>';
		$("<tr />").html(html).appendTo("#sctbl");
		$("#shortcut" + i).val(arr[i]);
	}

	$("#saveshortcuts-btn").on("click", function() {
		$(this).addClass('btn-success');
		var arr = [];
		for (var i = 0; i < 10; i++) arr[i] = $("#shortcut" + i).val();
		setOpt('SP_shorthands_' + CLIENT.name, SHORTHANDS = JSON.stringify(arr));
		setTimeout(function() {$("#saveshortcuts-btn").removeClass('btn-success')}, 500);
	});

	var html = '<div class="panel panel-primary"><div class="panel-heading">Keyboard shortcuts</div>'
		 +   '<div class="panel-body"><table class="commands-tbl">';
	var rows = [
		['1', 'Theatre Mode'], ['2', 'Radio Mode'], ['3', '"Premium Settings" modal window'],
		['4', '"Theme & User CSS" modal window'], ['5', '"Large Chat, No Player" option'],
		['6', '"Large Player, No Chat" option'], ['7', 'Toggle chat expanding'], ['8', 'Hide/show playlist'],
		['9', 'Mute player'], ['0', 'Close Theatre/Radio Mode'], ['Q', 'Volume level up'],
		['A', 'Volume level down'], ['T', 'Scroll chat panel to top'],
		['N', 'Toggle chat messages on player (NicoNico style)'],
		['I', 'Toggle converting chat links to images'], ['F', 'Add current item to your Premium favourites'],
		['H', '"Premium Commands Help" modal window']
	];
	for (i in rows) {
		html += '<tr><td><code>LeftAlt + ' + rows[i][0] + '</code></td><td>' + rows[i][1] + '</td></tr>';
	}
	html += '</table></div></div>';
	$("#_c5").html(html);
});

$("#chat-f2").on("click", function() {
	$("#chatpanel").remove();
	if (!$(this).hasClass('activated')) {
		if ($("#chat-f3").hasClass('activated')) $("#chat-f3").toggleClass('activated');
		if (!$chatheader.hasClass('darkened')) {
			$("#chatheader, #messagebuffer, #userlist").addClass('darkened');
		}

		chatpanel = $('<div id="chatpanel" class="modal-content scrolled" />').appendTo("#chatwrap")
		  .on("mouseleave", function() {
			$chatline.focus();
			$("#emotes-container").hide();
			$("#chatheader, #messagebuffer, #userlist").removeClass('darkened');
		  }).on("mouseenter", function() {
			$("#emotes-container").show();
			$("#chatheader, #messagebuffer, #userlist").addClass('darkened');
		  });
		cpheader = $('<div id="cpheader" />').appendTo(chatpanel);
		var hgr = $('<div id="chatpanelcontrol" class="btn-group pull-right" />').appendTo(cpheader);
		$('<button id="switchtounicode-btn" class="btn btn-default" title="Switch to unicode" />')
		  .html('Unicode').appendTo(hgr)
		  .on("click", function() {
			document.getElementById("chat-f3").click();
		  });
		$('<button id="closechatpanel-btn" class="btn btn-default" title="Close panel" />').html('×')
		  .appendTo(hgr)
		  .on("click", function() {
			$chatline.focus();
			$("#chatpanel").remove();
			$("#chat-f2").removeClass('activated');
			$("#chatheader, #messagebuffer, #userlist").removeClass('darkened');
		  });
		var len = CHANNEL.emotes.length;
		paneltitle = $('<div id="paneltitle" />').appendTo(cpheader)
		  .html('<b>Emotes panel</b> &middot; [' + len + ' emote' + ((len != 1) ? 's' : '') + ']</b>');
		emotesbtngroup = $('<div id="emotespages" class="btn-group">').appendTo(cpheader);
		emotesgroup = $('<div id="emotesgroup" />').appendTo(chatpanel);

		if (len < 1) {
			emotesgroup.append('<span>No emotes available on this channel.</span>');
		} else if (len <= EMOTESPERPAGE) {
			var emotescontainer = $('<div id="emotes-container" />').appendTo(emotesgroup);
			for (i in CHANNEL.emotes) {
				$('<img onclick="insertText(\'' + CHANNEL.emotes[i].name + ' \')" />')
			 	  .attr({'src':CHANNEL.emotes[i].image, 'title':CHANNEL.emotes[i].name})
			  	  .appendTo(emotescontainer);
			}
		} else {
			var arr = [];
			var gr = Math.ceil(CHANNEL.emotes.length / EMOTESPERPAGE);
			var html = '';
			for (var i = 0; i < len; i++) {
				html += '<img src="' + CHANNEL.emotes[i].image + '" '
				     +  'onclick="insertText(\'' + CHANNEL.emotes[i].name + ' \')" '
				     +  'title="' + CHANNEL.emotes[i].name + '" />';
				if (i % EMOTESPERPAGE == EMOTESPERPAGE - 1) {
					arr.push(html);
					html = '';
				}
			}
			if (len % EMOTESPERPAGE != 0) arr.push(html);
			var emotesbtnwrap = $('<div id="emotesbtnwrap" />').appendTo(emotesgroup);
			for (var i = 0; i < gr; i++) {
				var btn = $('<button class="btn btn-sm btn-default emotesbtn" group="' + i + '" />')
					  .appendTo(emotesbtngroup).html(i + 1)
					  .on("click", function() {
						$(".emotesbtn").removeClass('active');
						$(this).addClass('active');
						emotescontainer.html(arr[$(this).attr('group')]);
						VISIBLETAB["emotes"] = $(this).attr('group') * 1 + 1;
			  		  });
			}
			var tab = VISIBLETAB["emotes"];
			$("#emotespages button:nth-child(" + tab + ")").addClass('active');
			var emotescontainer = $('<div id="emotes-container">' + arr[tab - 1] + '</div>')
			  .appendTo(emotesgroup);
		}
	} else $("#chatheader, #messagebuffer, #userlist").removeClass('darkened');
	$(this).toggleClass('activated');
});

$("#chat-f3").on("click", function() {
	$("#chatpanel").remove();
	if (!$(this).hasClass('activated')) {
		if ($("#chat-f2").hasClass('activated')) $("#chat-f2").toggleClass('activated');
		if (!$chatheader.hasClass('darkened')) {
			$("#chatheader, #messagebuffer, #userlist").addClass('darkened');
		}

		chatpanel = $('<div id="chatpanel" class="modal-content scrolled" />').appendTo("#chatwrap")
		  .on("mouseleave", function() {
			$chatline.focus();
			$("#emotes-container").hide();
			$("#chatheader, #messagebuffer, #userlist").removeClass('darkened');
		  }).on("mouseenter", function() {
			$("#emotes-container").show();
			$("#chatheader, #messagebuffer, #userlist").addClass('darkened');
		  });
		cpheader = $('<div id="cpheader" />').appendTo(chatpanel);
		var hgr = $('<div id="chatpanelcontrol" class="btn-group pull-right" />').appendTo(cpheader);
		$('<button id="switchtoemotes-btn" class="btn btn-default" title="Switch to emotes" />').html('Emotes')
		  .appendTo(hgr)
		  .on("click", function() {
			document.getElementById("chat-f2").click();
		  });
		$('<button id="closechatpanel-btn" class="btn btn-default" title="Close panel" />').html('×')
		  .appendTo(hgr)
		  .on("click", function() {
			$chatline.focus();
			$("#chatpanel").remove();
			$("#chat-f3").removeClass('activated');
			$("#chatheader, #messagebuffer, #userlist").removeClass('darkened');
		  });
		paneltitle = $('<div id="paneltitle" />').html('<b>Unicode characters panel</b>').appendTo(cpheader);
		emotesbtngroup = $('<div id="emotespages" class="btn-group">').appendTo(cpheader);
		var caps = ['Symbols', 'Letters', 'Emoji', 'Fonts'];
		for (i = 0; i < 4; i++) {
			var text = caps[i];
			var btn = $('<button class="btn btn-sm btn-default emotesbtn" group="' + i + '" />')
			  .attr('title', text).appendTo(emotesbtngroup).html(text)
			  .on("click", function() {
				$(".emotesbtn").removeClass('active');
				$(this).addClass('active');
				$("#unicodeform > *").hide();
				var gr = $(this).attr('group');
				if (gr == 0) $("#symb-tbl").show()
				else if (gr == 1) $("#lett-tbl").show()
				else if (gr == 2) $("#emoji-tbl").show();
				else if (gr == 3) $("#fonts-tbl").show();
				VISIBLETAB["unicode"] = gr * 1 + 1;
			  });
		}
		emotesgroup = $('<div id="emotesgroup" />').appendTo(chatpanel);
		emotesbtnwrap = $('<div id="emotesbtnwrap" />').appendTo(emotesgroup);
		emotescontainer = $('<div id="emotes-container" />').appendTo(emotesgroup);
		unicodeform = $('<div id="unicodeform" />').appendTo(emotescontainer);

		var len = UnicodeSymbolsArray.length;
		var html = '<table id="symb-tbl"><tr>';
		for (var i = 0; i < len; i++) {
			if (UnicodeSymbolsArray[i] != "|") {
				html += '<td onclick="insertText(\'' + UnicodeSymbolsArray[i] + '\')">'
				     +  UnicodeSymbolsArray[i] + '</td>';
			} else html += '</tr><tr>';
		}
		html += '</table><table id="lett-tbl"><tr>';
		var len = UnicodeLettersArray.length;
		for (var i = 0; i < len; i++) {
			if (UnicodeLettersArray[i] != "|") {
				html += '<td onclick="insertText(\'' + UnicodeLettersArray[i] + '\')">'
				     +  UnicodeLettersArray[i] + '</td>';
			} else html += '</tr><tr>';
		}
		html += '</table><table id="emoji-tbl"><tr>';
		var len = UnicodeEmojiArray.length;
		for (var i = 0; i < len; i++) {
			if (i % 5 == 0 && i != 0) html += '<tr>';
			var emo = UnicodeEmojiArray[i].replace('\\', '\\\\');
			html += '<td onclick="insertText(\'' + emo + '\')">' + UnicodeEmojiArray[i] + '</td>';
			if (i % 5 == 4 && i != len - 1) html += '</tr>';
		}
		html += '</table><div id="fonts-tbl" class="btn-group">';
		var tbl = [
			{'c':'bold', 't1':':+', 't2':'+:', 's':'font-weight:bold'},
			{'c':'italic', 't1':':=', 't2':'=:', 's':'font-style:italic'},
			{'c':'underlined', 't1':':@', 't2':'@:', 's':'text-decoration:underline'},
			{'c':'dotted', 't1':':@@', 't2':'@@:', 's':'border-bottom:dotted 1px'},
			{'c':'striked', 't1':':-', 't2':'-:', 's':'text-decoration:line-through'},
			{'c':'small', 't1':':!', 't2':'!:', 's':'font-size:0.8em'},
			{'c':'caps', 't1':':$', 't2':'$:', 's':'font-variant:small-caps'},
			{'c':'spaced', 't1':':%', 't2':'%:', 's':'letter-spacing:2px'},
			{'c':'mono', 't1':':#', 't2':'#:',
			 's':'font-family:Menlo,Monaco,Consolas,\'Courier New\',monospace'},
			{'c':'stitched', 't1':':^', 't2':'^:', 's':'outline:1px dashed #98ABB9; outline-offset:-5px; '
			 + 'background-color:#556068; box-shadow:2px 2px 2px #000; padding:5px; '
			 + 'border-radius:2px; color:#EEE'}
		]
		var len = tbl.length;
		for (var i = 0; i < len; i++) {
			html += '<button class="btn btn-sm btn-default" '
			      +   'onclick="insertChatCode(\'' + tbl[i]["t1"] + '\', \'' + tbl[i]["t2"] + '\')">'
			      +   '<span style="' + tbl[i]["s"] + '">' + tbl[i]["c"] + '</span></button>';
		}
		html += '</div>';
		unicodeform.html(html);
		var tab = VISIBLETAB["unicode"];
		$("#emotespages button:nth-child(" + tab + ")").addClass('active');
		if (tab == 1) $("#lett-tbl, #emoji-tbl, #fonts-tbl").hide()
		else if (tab == 2) $("#symb-tbl, #emoji-tbl, #fonts-tbl").hide()
		else if (tab == 3) $("#symb-tbl, #lett-tbl, #fonts-tbl").hide();
		else if (tab == 4) $("#emoji-tbl, #symb-tbl, #lett-tbl").hide();
	} else $("#chatheader, #messagebuffer, #userlist").removeClass('darkened');
	$(this).toggleClass('activated');
});

$("#chat-f4").on("click", function() {
	ULISTRIGHT ? userlistSide("left") : userlistSide("right");
	setOpt('SP_ulistright', ULISTRIGHT = !ULISTRIGHT);
});

$("#chat-f5").on("click", function() {
	$userlist.toggleClass('bigp');
	$(this).toggleClass('activated');
	setOpt('SP_bigprofiles', BIGPROFILES = !BIGPROFILES);
});

$("#chat-f6").on("click", function() {
	createModal('Custom Ping Sound');

	var html = '<form class="form-horizontal"><div class="form-group">'
		 +   '<label class="control-label col-sm-4">Custom Sound</label>'
		 +   '<div class="col-sm-8 config-col"><label class="checkbox-inline">'
		 +     '<input id="custom-ping" type="checkbox"><span> Enable custom notification sound</span></label>';
	if (USEROPTS.boop == "never") {
		html += '<br /><br /><p class="text-danger">Warning: notification sound on new messages is now '
		     +    'globally disabled. You can change it in your user preferences on the top navigation bar '
		     +    '("Options" > "Chat").</p>';
	}
	html += '</div></div><div class="form-group">'
	     +    '<label class="control-label col-sm-4">Sound file URL</label>'
	     +    '<div class="col-sm-8 config-col">'
	     +      '<input id="custom-ping-file" class="form-control" type="text" /><br />'
	     +      '<p class="text-info">Recommended using *.ogg or *.wav files. *.mp3 files may be sometimes '
	     +        'not audible in some browsers.</p></div>'
	     +  '</div><div class="form-group">'
	     +    '<label class="control-label col-sm-4">Ping Volume</label>'
	     +    '<div class="col-sm-8 config-col"><div class="btn-group">'
	     +      '<button id="ping-down-btn" class="btn btn-sm btn-default" title="Ping volume down" type="button">'
	     +        '<span class="glyphicon glyphicon-minus"></span></button>'
	     +      '<button id="ping-mute-btn" class="btn btn-sm btn-default" title="Mute ping sound" type="button">'
	     +        '<span class="glyphicon glyphicon-refresh"></span> volume level: '
	     +        '<span id="ping-volume-level">100</span>%</button>'
	     +      '<button id="ping-up-btn" class="btn btn-sm btn-default" title="Ping volume up" type="button">'
	     +        '<span class="glyphicon glyphicon-plus"></span></button></div></div>'
	     +  '</div><div class="form-group">'
	     +    '<label class="control-label col-sm-4">Play ping file</label>'
	     +    '<div class="col-sm-8 config-col">'
	     +      '<button id="ping-play-btn" class="btn btn-sm btn-default" title="Play ping file" type="button">'
	     +        '<span class="glyphicon glyphicon-play"></span></button></div></div></form>';
	body.html(html);

	if (CUSTOMPING) $("#custom-ping").prop('checked', true);
	$("#custom-ping-file").val(CUSTOMPINGFILE);
	document.getElementById("ping-volume-level").innerHTML = Math.round(CUSTOMPINGLVL * 100);
	if (CUSTOMPINGLVL == 0) $("#ping-mute-btn").addClass('btn-danger');

	$("#custom-ping").on("click", function() {
		CUSTOMPING = $("#custom-ping").prop('checked');
		CHATSOUND = new Audio((CUSTOMPING && CUSTOMPINGFILE != "") ? CUSTOMPINGFILE : '/boop.wav');
		CHATSOUND.volume = CUSTOMPINGLVL;
		$("#chat-f6").removeClass('activated');
		if (CUSTOMPING && CUSTOMPINGFILE != "") $("#chat-f6").addClass('activated');
		setOpt('SP_customping', CUSTOMPING);
	});
	$("#custom-ping-file").on("change blur", function() {
		CUSTOMPINGFILE = $("#custom-ping-file").val();
		CHATSOUND = new Audio((CUSTOMPING && CUSTOMPINGFILE != "") ? CUSTOMPINGFILE : '/boop.wav');
		CHATSOUND.volume = CUSTOMPINGLVL;
		$("#chat-f6").removeClass('activated');
		if (CUSTOMPING && CUSTOMPINGFILE != "") $("#chat-f6").addClass('activated');
		setOpt('SP_custompingfile', CUSTOMPINGFILE);
	});
	$("#ping-down-btn").on("click", function() {
		CUSTOMPINGLVL = Math.ceil(Math.round((CUSTOMPINGLVL - 0.05) * 100) / 5) * 0.05;
		if (CUSTOMPINGLVL <= 0) {
			CUSTOMPINGLVL = 0;
			$("#ping-mute-btn").attr('title', 'Unmute ping sound').addClass('btn-danger');
		}
		CHATSOUND.volume = CUSTOMPINGLVL;
		document.getElementById("ping-volume-level").innerHTML = Math.round(CUSTOMPINGLVL * 100);
		setOpt('SP_custompinglvl', CUSTOMPINGLVL);
	});
	$("#ping-mute-btn").on("click", function() {
		if (!$(this).hasClass('btn-danger')) {
			CURRENTPINGVOL = CUSTOMPINGLVL;
			CUSTOMPINGLVL = 0;
			CHATSOUND.volume = 0;
			$("#ping-down-btn").addClass('disabled');
			$(this).attr('title', 'Unmute ping sound');
		} else {
			if (typeof CURRENTPINGVOL === "undefined") CURRENTPINGVOL = 1;
			CUSTOMPINGLVL = CURRENTPINGVOL;
			CHATSOUND.volume = CURRENTPINGVOL;
			$("#ping-down-btn").removeClass('disabled');
			$(this).attr('title', 'Mute ping sound');
		}
		$(this).toggleClass('btn-danger');
		document.getElementById("ping-volume-level").innerHTML = Math.round(CUSTOMPINGLVL * 100);
		setOpt('SP_custompinglvl', CUSTOMPINGLVL);
	});
	$("#ping-up-btn").on("click", function() {
		CUSTOMPINGLVL = Math.floor(Math.round((CUSTOMPINGLVL + 0.05) * 100) / 5) * 0.05;
		if (CUSTOMPINGLVL > 1) CUSTOMPINGLVL = 1;
		CHATSOUND.volume = CUSTOMPINGLVL;
		$("#ping-down-btn").removeClass('disabled');
		$("#ping-mute-btn").attr('title', 'Mute ping sound').removeClass('btn-danger');
		document.getElementById("ping-volume-level").innerHTML = Math.round(CUSTOMPINGLVL * 100);
		setOpt('SP_custompinglvl', CUSTOMPINGLVL);
	});
	$("#ping-play-btn").on("click", function() {
		CHATSOUND.play();
	});

	$('<div class="text-info pull-left">Changes are applied automatically.</div>').appendTo(footer);
});

$("#chat-f7").on("click", function() {
	if (confirm('Do you really want to clear current content of your chat window?')) {
		$messagebuffer.html('');
		SCROLLCHAT = true;
	}
});


// Chat options dropdown menu events

$("#chat-1").on("click", function() {
	if (SHOWIMAGES) {
		$messagebuffer.find(ImageExtensions).each(function() {
  			$(this).html(this.href);
		});
		if (SHOWOEKAKI) showOekakiOnChat($messagebuffer);
		$("#oekaki-checkbox").show();
	} else {
		showImagesOnChat($messagebuffer);
		$("#oekaki-checkbox").hide();
	}
	$(this).toggleClass('activated');
	setOpt('SP_showimages', SHOWIMAGES = !SHOWIMAGES);
	if (SCROLLCHAT) scrollChat();
});

$("#chat-2").on("click", function() {
	if (SHOWVIDEOS) {
		$messagebuffer.find(MediaExtensions).each(function() {
  			$(this).html(this.href);
		});
	} else showVideosOnChat($messagebuffer);
	$(this).toggleClass('activated');
	setOpt('SP_showvideos', SHOWVIDEOS = !SHOWVIDEOS);
	if (SCROLLCHAT) scrollChat();
});

$("#chat-3").on("click", function() {
	if (!PLAYERTEXT) {
		$videowrap.find(".embed-responsive-16by9").prepend('<div id="player-chat-wrap" />');
		addChatNotification('NicoNico mode is now on - chat messages will be displayed on the player');
	} else {
		$("#player-chat-wrap").remove();
		addChatNotification('NicoNico mode is now off');
	}
	$(this).toggleClass('activated');
	setOpt('SP_playertext', PLAYERTEXT = !PLAYERTEXT);
});

$("#chat-4").on("click", function() {
	if ($(this).hasClass('activated')) {
		if (typeof BLINKBTN !== "undefined") {
			clearInterval(BLINKBTN);
			$("#sounds-btn").removeClass('btn-warning');
		}
		if (jQuery.isEmptyObject(SoundFiltersArray) && WelcomeSoundFileURL == "") {
			$("#sounds-btn").hide();
		}
	} else {
		$("#sounds-btn").show();
		BLINKBTN = setInterval(function() {
			$("#sounds-btn").toggleClass('btn-warning');
		}, 250);
		setTimeout(function() {
			clearInterval(BLINKBTN);
			$("#sounds-btn").removeClass('btn-warning');
		}, 2000);
	}
	$(this).toggleClass('activated');
	setOpt('SP_texttospeech', TEXTTOSPEECH = !TEXTTOSPEECH);
});

$("#chat-5").on("click", function() {
	if ($(this).hasClass('activated')) {
		$messagebuffer.removeClass('lines');
		MSGSEPARATOR = '';
	} else {
		$messagebuffer.addClass('lines').removeClass('bubbles');
		$("#chat-22").removeClass('activated');
		MSGSEPARATOR = 'lines';
		if (SCROLLCHAT) scrollChat();
	}
	$(this).toggleClass('activated');
	setOpt('SP_msgseparator', MSGSEPARATOR);
});

$("#chat-6").on("click", function() {
	$messagebuffer.toggleClass('noavatars');
	$(this).toggleClass('activated');
	setOpt('SP_ignoreavatars', IGNOREAVATARS = !IGNOREAVATARS);
	if (SCROLLCHAT) scrollChat();
});

$("#chat-7").on("click", function() {
	$messagebuffer.toggleClass('ignoreserver');
	$(this).toggleClass('activated');
	setOpt('SP_ignoreserver', IGNORESERVER = !IGNORESERVER);
	if (SCROLLCHAT) scrollChat();
});

$("#chat-8").on("click", function() {
	if (!$(this).hasClass('activated')) {
		if (IGNORECHATMODE != 1) $messagebuffer.addClass('noeffects');
		if (IGNORECHATMODE != 2) $messagebuffer.addClass('nocolors');
	} else $messagebuffer.removeClass('nocolors noeffects');
	$(this).toggleClass('activated');
	setOpt('SP_ignorecolors', IGNORECOLORS = !IGNORECOLORS);
	if (SCROLLCHAT) scrollChat();
});

$("#chat-9").on("click", function() {
	if (USEROPTS.no_emotes) {
		var str = 'Warning! You have disabled chat emotes globally.\n'
			+ 'You can change it in your user preferences on the top navigation bar\n'
			+ '("Options" > "Chat").'
		alert(str);
		return;
	}
	if (IGNOREEMOTES) {
		$messagebuffer.find("span.span-emote").each(function() {
			var title = $(this).html();
			var img = $('<img class="channel-emote" />').insertBefore($(this))
			  .attr({src:$(this).attr('link'), title:title})
			  .on("click", function() {
				insertText(title + ' ');
			  }).load(function() {
				if (SCROLLCHAT) scrollChat();
			  });
			$(this).remove();
		});
	} else hideEmotes($messagebuffer);
	$messagebuffer.toggleClass('noemotes');
	$(this).toggleClass('activated');
	setOpt('SP_ignoreemotes', IGNOREEMOTES = !IGNOREEMOTES);
	if (SCROLLCHAT) scrollChat();
});

$("#chat-10").on("click", function() {
	CHATFONTSIZE *= 0.95;
	document.getElementById("chat-font-size").innerHTML = Math.round(CHATFONTSIZE);
	$messagebuffer.css('font-size', CHATFONTSIZE + '%');
	setOpt('SP_chatfontsize', CHATFONTSIZE);
});

$("#chat-11").on("click", function() {
	CHATFONTSIZE = 100;
	document.getElementById("chat-font-size").innerHTML = '100';
	$messagebuffer.css('font-size', '100%');
	setOpt('SP_chatfontsize', 100);
	if (SCROLLCHAT) scrollChat();
});

$("#chat-12").on("click", function() {
	CHATFONTSIZE /= 0.95;
	document.getElementById("chat-font-size").innerHTML = Math.round(CHATFONTSIZE);
	$messagebuffer.css('font-size', CHATFONTSIZE + '%');
	setOpt('SP_chatfontsize', CHATFONTSIZE);
	if (SCROLLCHAT) scrollChat();
});

$("#chat-13").on("click", function() {
	$("#chatopts-menu").find("li[group=1]").hide();
	$("#chatopts-menu").find("li[group=2]").show();
	if (!hasPermission("leaderctl")) $("#chat-15").parent().hide();
});

$("#chat-14").on("click", function() {
	$("#chatopts-menu").find("li[group=1]").show();
	$("#chatopts-menu").find("li[group=2]").hide();
});

$("#chat-15").on("click", function() {
	if (CLIENT.leader) {
		if (hasPermission("leaderctl")) {
			socket.emit("assignLeader", {name:''});
			$(this).removeClass('activated');
		} else {
			$("#chatopts-outer").removeClass('open');
			addChatNotification('Warning! You have no permission to resign from Leader status.');
		}
	} else {
		socket.emit("assignLeader", {name:CLIENT.name});
		$(this).addClass('activated');
	}
});

$("#chat-16").on("click", function() {
	$(this).hasClass('activated') ? $userlist.removeClass('idleafk') : $userlist.addClass('idleafk');
	$(this).toggleClass('activated');
	setOpt('SP_hideafkusers', HIDEAFKUSERS = !HIDEAFKUSERS);
});

$("#chat-17").on("click", function() {
	if ($(this).hasClass('activated')) {
		$messagebuffer.removeClass('notstamps');
		if (!USEROPTS.show_timestamps) {
			var str = 'Warning! You have disabled chat timestamps globally.\n'
				+ 'You can change it in your user preferences on the top navigation bar\n'
				+ '("Options" > "Chat").'
			alert(str);
		}
	} else $messagebuffer.addClass('notstamps');
	$(this).toggleClass('activated');
	setOpt('SP_hidetstamps', HIDETSTAMPS = !HIDETSTAMPS);
});

$("#chat-18").on("click", function() {
	if ($(this).hasClass('activated')) {
		if (!HIDEINDICATOR) $chatwrap.removeClass('noindicator');
	} else $chatwrap.addClass('noindicator');
	$(this).toggleClass('activated');
	setOpt('SP_noautoscroll', NOAUTOSCROLL = !NOAUTOSCROLL);
});

$("#chat-19").on("click", function() {
	$(this).toggleClass('activated');
	setOpt('SP_chatusername', CHATUSERNAME = !CHATUSERNAME);
});

$("#chat-20").on("click", function() {
	if ($(this).hasClass('activated')) {
		$("#userlist, #messagebuffer, #chatline").removeClass('matrix');
		CHATSTYLE = '';
	} else {
		$("#userlist, #messagebuffer, #chatline").addClass('matrix');
		CHATSTYLE = 'matrix';
	}
	$(this).toggleClass('activated');
	setOpt('SP_chatstyle', CHATSTYLE);
	if (SCROLLCHAT) scrollChat();
});

$("#chat-21").on("click", function() {
	if ($(this).hasClass('activated')) {
		$("#userlist, #messagebuffer, #chatline, .pm-buffer, .pm-input").removeClass('whitebg');
		CHATBG = '';
	} else {
		$("#userlist, #messagebuffer, #chatline, .pm-buffer, .pm-input").addClass('whitebg');	
		CHATBG = 'white';
	}
	$(this).toggleClass('activated');
	setOpt('SP_chatbg', CHATBG);
});

$("#chat-22").on("click", function() {
	if ($(this).hasClass('activated')) {
		$messagebuffer.removeClass('bubbles');
		MSGSEPARATOR = '';
	} else {
		$messagebuffer.addClass('bubbles').removeClass('lines');
		$("#chat-5").removeClass('activated');
		MSGSEPARATOR = 'bubbles';
		if (SCROLLCHAT) scrollChat();
	}
	$(this).toggleClass('activated');
	setOpt('SP_msgseparator', MSGSEPARATOR);
});


// Filter playlist input and buttons events

$("#plfilter").on("keydown", function(ev) {
	if (ev.keyCode == 13) {
		if ($(this).val() == "") document.getElementById("whole_playlist").click()
		else document.getElementById("filter_playlist").click();
	}
});

$("#filter_playlist").on("click", function() {
	var val = $("#plfilter").val();
	if (val == "") return;
	$queue.find("li").each(function() {
		var added = $(this).attr('title').split("by: ")[1];
		val != added ? $(this).hide() : $(this).show();
	});
});

$("#whole_playlist").on("click", function() {
	$queue.find("li").each(function() {
		$(this).show();
	});
});

$("#close_plfilter").on("click", function() {
	document.getElementById("pls-8").click();
});


// Add to favourites button events

$("#addtofav-btn").on("click", function() {
	if ($queue.find(".queue_entry").length < 1) return;
	var uid = $(".queue_active").data("media");
	FAVLINKS = getOrDefault('SP_favlinks_' + CLIENT.name, '[]');
	var arr = JSON.parse(FAVLINKS);
	var len = arr.length;
	if (len >= 200) {
		var html = '<strong>Warning: the list is full</strong><br />You have reached maximum limit (200) '
			 + 'of favourite links. Delete other items to add new.<br />'
			 + '<button id="close-msg-btn" class="btn btn-primary">Close</button>';
		$('<div class="alert alert-warning" />').insertBefore("#queue-fav").html(html);
		$("#close-msg-btn").on("click", function() {
			$(this).parent().remove();
		});
		return;
	}
	var newid = 1;
	if (len > 0) newid = arr[len - 1]["id"] + 1;
	$favsBtn.addClass('btn-success');
	$(this).addClass('btn-success disabled');
	arr.push({"id":newid, "title":uid.title, "link":formatURL(uid)});
	setOpt('SP_favlinks_' + CLIENT.name, FAVLINKS = JSON.stringify(arr));
	createFavsPanel();
});


// Additional options buttons events

$("#addopts-btn").on("click", function() {
	toggleElement($addoptswrap);
	if ($(this).hasClass('active')) clearInterval(UTCCLOCK)
	else {
		UTCCLOCK = setInterval(function() {UTCTime()}, 1000);
		UTCTime();
	}
	$(this).toggleClass('active');
});

$("#tools-btn").on("click", function() {
	if (!TOOLSENABLED) setOpt('SP_toolsenabled', TOOLSENABLED = true);
	createModal('Premium Admin Tools');
	var arr = ['Chat Effects', 'CSS Tips', 'MOTD Tabs', 'Soundfilters', 'Media DB', 'Customization'];
	createModalTabs(arr, "tools");

	html = '<div class="panel panel-primary"><div class="panel-heading">'
	     +   'Chat text colors for all users without accepted Premium app</div>'
	     +   '<div class="panel-body"><div id="colors-check" class="centered"></div></div>'
	     +   '<div class="panel-heading">Chat text effects for all users without accepted Premium app</div>'
	     +   '<div class="panel-body"><div id="effects-check" class="centered"></div></div></div>';
	$("#_c1").html(html);

	if (!hasPermission("filteredit")) {
		var html = 'Filter editing is blocked on this channel.<br />'
			 + 'Change permissions if you want to check colors status or install colors.';
		$("#colors-check").html('<p class="text-danger">' + html +'</p>');
		var html = 'Filter editing is blocked on this channel.<br />'
			 + 'Change permissions if you want to check effects status or install effects.';
		$("#effects-check").html('<p class="text-danger">' + html +'</p>');
	}
	var callback = function(data) {
		socket.listeners("chatFilters").splice(socket.listeners("chatFilters").indexOf(callback));
		if (JSON.stringify(data).indexOf('"col:(.*?):"') < 0) {
			$("#colors-check").html('');
			$('<button class="btn btn-primary btn-sm">Install chat text colors</button>')
			  .appendTo("#colors-check")
			  .on("click", function() {
				socket.emit("addFilter", {
					name:'chat colors (premium)', source:'col:(.*?):', flags:'g',
					replace:'<span style="color:\\1" class="chatcolor">', active:true
				});
				$("#colors-check").html('<p class="text-info">Colors installed.</p>');
			  });
		} else {
			var html = 'Chat text colors are already visible for all users.';
			$("#colors-check").html('<p class="text-info">' + html +'</p>');
		}

		var count = 0;
		var json = JSON.stringify(data);
		if (json.indexOf('":\\\\+(.+?)\\\\+:"') > -1) count++;
		if (json.indexOf('":=(.+?)=:"') > -1) count++;
		if (json.indexOf('":@@(.+?)@@:"') > -1) count++;
		if (json.indexOf('":@(.+?)@:"') > -1) count++;
		if (json.indexOf('":-(.+?)-:"') > -1) count++;
		if (json.indexOf('":!(.+?)!:"') > -1) count++;
		if (json.indexOf('":\\\\$(.+?)\\\\$:"') > -1) count++;
		if (json.indexOf('":%(.+?)%:"') > -1) count++;
		if (json.indexOf('":#(.+?)#:"') > -1) count++;
		if (json.indexOf('":\\\\^(.+?)\\\\^:"') > -1) count++;
		if (json.indexOf('"\\\\[b\\\\](.+?)\\\\[\\\\/b\\\\]"') > -1) count++;
		if (json.indexOf('"\\\\[i\\\\](.+?)\\\\[\\\\/i\\\\]"') > -1) count++;
		if (json.indexOf('"\\\\[u\\\\](.+?)\\\\[\\\\/u\\\\]"') > -1) count++;
		if (json.indexOf('"\\\\[s\\\\](.+?)\\\\[\\\\/s\\\\]"') > -1) count++;
		if (json.indexOf('"\\\\[code\\\\](.+?)\\\\[\\\\/code\\\\]"') > -1) count++;

		if (count < 1) {
			$("#effects-check").html('');
			$('<button class="btn btn-primary btn-sm">Install chat text effects</button>')
			  .appendTo("#effects-check")
			  .on("click", function() {
				socket.emit("addFilter", {
					name:'bold text (premium)', source:':\\+(.+?)\\+:', flags:'g',
					replace:'<span style="font-weight:bold" class="txteffect">\\1</span>',
					active:true
				});
				socket.emit("addFilter", {
					name:'italic text (premium)', source:':=(.+?)=:', flags:'g',
					replace:'<span style="font-style:italic" class="txteffect">\\1</span>',
					active:true
				});
				socket.emit("addFilter", {
					name:'dots-underlined text (premium)', source:':@@(.+?)@@:', flags:'g',
					replace:'<span style="border-bottom:dotted 1px" class="txteffect">\\1</span>',
					active:true
				});
				socket.emit("addFilter", {
					name:'underlined text (premium)', source:':@(.+?)@:', flags:'g',
					replace:'<span style="text-decoration:underline" class="txteffect">\\1</span>',
					active:true
				});
				socket.emit("addFilter", {
					name:'striked text (premium)', source:':-(.+?)-:', flags:'g',
					replace:'<span class="txteffect"><s>\\1</s></span>',
					active:true
				});
				socket.emit("addFilter", {
					name:'smaller text (premium)', source:':!(.+?)!:', flags:'g',
					replace:'<span style="font-size:0.8em" class="txteffect">\\1</span>',
					active:true
				});
				setTimeout(function() {
					socket.emit("addFilter", {
						name:'small-caps text (premium)', source:':\\$(.+?)\\$:', flags:'g',
						replace:'<span style="font-variant:small-caps" '
						 + 'class="txteffect">\\1</span>',
						active:true
					});
					socket.emit("addFilter", {
						name:'letter-spaced text (premium)', source:':%(.+?)%:', flags:'g',
						replace:'<span style="letter-spacing:2px" class="txteffect">\\1</span>',
						active:true
					});
					socket.emit("addFilter", {
						name:'monospaced text (premium)', source:':#(.+?)#:', flags:'g',
						replace:'<span style="font-family:Menlo,Monaco,Consolas,'
						 + '\'Courier New\',monospace" class="txteffect">\\1</span>',
						active:true
					});
					socket.emit("addFilter", {
						name:'stitched text (premium)', source:':\\^(.+?)\\^:', flags:'g',
						replace:'<span style="outline:1px dashed #98ABB9; outline-offset:-5px; '
						 + 'background-color:#556068; box-shadow:2px 2px 2px #000; '
						 + 'padding:5px; border-radius:2px; color:#EEE" '
						 + 'class="txteffect">\\1</span>',
						active:true
					});
					socket.emit("addFilter", {
						name:'floating text (premium)', source:':\\/\\/(.+?)\\/\\/:', flags:'g',
						replace:'<marquee behavior="scroll" scrollamount="18" '
						 + 'class="txteffect">\\1</marquee>',
						active:true
					});
					socket.emit("addFilter", {
						name:'bouncing text (premium)', source:':\\/(.+?)\\/:', flags:'g',
						replace:'<marquee behavior="alternate" scrollamount="15" '
						 + 'class="txteffect">\\1</marquee>',
						active:true
					});
				}, 500);
				setTimeout(function() {
					socket.emit("addFilter", {
						name:'bold text (premium BBCode)', source:'\\[b\\](.+?)\\[\\/b\\]',
						flags:'g',
						replace:'<span style="font-weight:bold" class="txteffect">\\1</span>',
						active:true
					});
					socket.emit("addFilter", {
						name:'italic text (premium BBCode)', source:'\\[i\\](.+?)\\[\\/i\\]',
						flags:'g',
						replace:'<span style="font-style:italic" class="txteffect">\\1</span>',
						active:true
					});
					socket.emit("addFilter", {
						name:'underlined text (premium BBCode)',
						source:'\\[u\\](.+?)\\[\\/u\\]', flags:'g',
						replace:'<span style="text-decoration:underline" '
						 + 'class="txteffect">\\1</span>',
						active:true
					});
					socket.emit("addFilter", {
						name:'striked text (premium BBCode)', source:'\\[s\\](.+?)\\[\\/s\\]',
						flags:'g', replace:'<span class="txteffect"><s>\\1</s></span>',
						active:true
					});
					socket.emit("addFilter", {
						name:'monospaced text (premium BBCode)',
						source:'\\[code\\](.+?)\\[\\/code\\]', flags:'g',
						replace:'<span style="font-family:Menlo,Monaco,Consolas,'
						 + '\'Courier New\',monospace" class="txteffect">\\1</span>',
						active:true
					});
				}, 1000);
				$("#effects-check").html('<p class="text-info">Effects installed.</p>');
			  });
		} else if (count < 15) {
			var html = 'Chat text effects are installed partially or not installed properly on this '
				 + 'channel.<br />Go to Chat Filters and delete all "premium" text effects '
				 + 'to prepare proper installation.';
			$("#effects-check").html('<p class="text-info">' + html +'</p>');
		} else {
			var html = 'Chat text effects are already visible for all users.';
			$("#effects-check").html('<p class="text-info">' + html +'</p>');
		}

	};
	socket.on("chatFilters", callback);
	socket.emit("requestChatFilters");

	html = '<div class="panel panel-primary"><div class="panel-heading">'
	     +   'Custom navigation bar channel name for all users without accepted Premium app</div>'
	     +   '<div class="panel-body">1. Copy code below and change <i>(name of your channel)</i> to proper name.'
	     +     '<br />2. Paste code to your channel internal CSS or external CSS file.<br /><br />'
	     +     '<code>.navbar-brand {font-size:0pt}</code><br />'
	     +     '<code>.navbar-brand:before {content:"<i>(name of your channel)</i>"; font-size:14pt}</code>'
	     +     '<br /><br />If channel name is not visible properly, try to change first line of above code to:'
	     +     '<br /><br /><code>.navbar-brand {font-size:0pt !important; width:auto !important}</code><br />'
	     +     '<br /></div><div class="panel-heading">Username color on chat</div>'
	     +   '<div class="panel-body">1. Copy code below and change <i>(user name)</i> to proper user name, '
	     +     'and <i>(CSS color)</i> to proper CSS color, repeat it for all selected users.<br />'
	     +     '2. Paste code to your channel internal CSS or external CSS file.<br /><br />'
	     +     '<code>div.chat-msg-<i>(user name)</i> .username {color:<i>(CSS color)</i>}</code><br /><br />'
	     +   '</div><div class="panel-heading">Username avatar on chat</div>'
	     +   '<div class="panel-body">1. Copy code below and change <i>(user name)</i> to proper user name, '
	     +     'and <i>(avatar URL)</i> to proper image URL, repeat it for all selected users.<br />'
	     +     '2. Paste code to your channel internal CSS or external CSS file.<br /><br />'
	     +     '<code>.chat-msg-<i>(user name)</i> .username:before {</code><br />'
	     +     '<code>background:url("<i>(avatar URL)</i>"); background-size:cover;</code><br />'
	     +     '<code>height:30px; width:30px; margin-right:4px;</code><br />'
	     +     '<code>content:""; display:inline-block; vertical-align:middle;</code><br /><code>}</code>'
	     + '</div></div>';
	$("#_c2").html(html);

	html = 'You can turn your channel MOTD into a simple homepage with subpages.<br /><br />'
	     + '<div class="panel panel-primary"><div class="panel-heading">MOTD Tabs application</div>'
	     +   '<div class="panel-body">1. Copy code from the textarea below.<br />'
	     +     '2. Change menu tab names, add more tabs or delete existed tabs if unnecessary.<br />'
	     +     '3. Change HTML content of your tabs.<br />'
	     +     '4. Set (or leave default) additional CSS (borders of HTML content, background, colors etc.) '
	     +     'according to your wishes in: <code>motd-tabs</code> - styles of menu links to subpages, '
	     +     '<code>motd-tabs-wrap</code> - subpages HTML container.<br />'
	     +     '5. Set, as above, CSS application size or leave default values (400px height and 800px max-width, '
	     +     'you can also set <i>max-width</i> in percents - 100% will make content full-width).<br />'
	     +     '6. Paste prepared HTML code into channel MOTD editor.<br /><br />'
	     +     '<textarea class="form-control" rows="12">'
	     +       '<div>\n<ul id="motd-tabs" class="nav nav-pills" style="text-align:center; max-width:800px; '
	     +       'margin:0px auto 5px">\n'
	     +       '\t<!-- Below you can set menu links to subpages -->\n\n'
	     +       '\t<li class="active"><a href="#1a" data-toggle="tab">Home</a></li>\n';
	for (i = 2; i <=10; i++) {
		html += '\t<li><a href="#' + i + 'a" data-toggle="tab">Tab #' + i + '</a></li>\n';
	}
	html += '\n</ul>\n<div id="motd-tabs-wrap" style="border:solid 2px #333; border-radius:8px; height:400px; '
	     +  'max-width:800px; margin:0 auto; overflow:auto; padding:10px">\n'
	     +  '\t<div id="motd-tabs-content" class="tab-content clearfix0">\n'
	     +  '\t<!-- Below you can set subpages HTML content -->\n\n'
	     +  '<div class="tab-pane active" id="1a">\n\tHTML content of Home tab.\n</div>\n';
	for (i = 2; i <=10; i++) {
		html += '<div class="tab-pane" id="' + i + 'a">\n\tHTML content of Tab #' + i + '.\n</div>\n';
	}
	html += '\n\t</div>\n</div>\n</div></textarea></div></div>';
	$("#_c3").html(html);

	html = 'Beside of text filters or displaying emotes you can set sound files, played after sending '
	     + 'certain text or code to chat.<br />'
	     + '<span class="text-danger">Warning! Browsers support *.ogg files best. Some browsers may have '
	     +   'problems with *.mp3 files as soundfilters.</span><br /><br />'
	     + '<div class="panel panel-primary"><div class="panel-heading">Preparing the code</div>'
	     +   '<div class="panel-body"><code>SoundFiltersArray = {</code><br />'
	     +     '<code>\'habemus\': \'https://dl.dropboxusercontent.com/s/3w1jahgffowjltz/hp.ogg\',</code><br />'
	     +     '<code>\':nyaa:\': \'https://dl.dropboxusercontent.com/s/gzsxqypc6qa7del/nyaa.ogg\',</code><br />'
	     +     '<code>\'text_or_code\': \'sound_file_URL\',</code><br />'
	     +     '<code>};</code><br /><br />'
	     +     'Copy sample code above and add your own items, set proper codes and links.'
	     +   '</div><div class="panel-heading">Installing code</div>'
	     +   '<div class="panel-body">Search for the <code>SoundFiltersArray = {</code> in the code file '
	     +     '(you have to use your own file location) and paste prepared array of sounds.<br /><br />'
	     +     'Under the chat will appear a new button to control chat sounds.'
	     + '</div></div>';
	$("#_c4").html(html);

	html = 'You can create custom channel Media Database. It will appear in the "Add video" panel.<br /><br />'
	     + '<div class="panel panel-primary"><div class="panel-heading">Preparing the code</div>'
	     +   '<div class="panel-body">' + prepareMediaDBHelp() + '</div>'
	     +   '<div class="panel-heading">Installing database</div>'
	     +   '<div class="panel-body">You can do it in two ways.<br /><br />'
	     +     'A. External file (recommended): save prepared code as .js file and upload it to your web hosting '
	     +     '(Dropbox, Google Drive, your own server, etc.). Next, add <code>db</code> parameter to your '
	     +     'current Premium script location, with database file URL as a value, like this:<br />'
	     +     '<code>https://dl.dropboxusercontent.com/s/1dyazoq6t7wh808/Premium.js?db=<i>URL</i></code><br />'
	     +     'Paste prepared link, as in the example above, to External Javascript channel option '
	     +     '(change <code><i>URL</i></code> to direct link of your .js file).<br /><br />'
	     +     'B. Internal code (not recommended if the database is large - it will significantly increase '
	     +     'Premium file size): add database code to your custom Premium script file, but before [SECTION 3] '
	     +     '(not at the end of the file - database will not load).</div></div>';
	$("#_c5").html(html);

	html = 'It is possible to customize some basic Premium Settings for your channel.<br /><br />'
	     + '<div class="panel panel-primary"><div class="panel-heading">Synchtube Premium customization</div>'
	     +   '<div class="panel-body">1. Open code file and go to <code>BASIC CUSTOMIZATION</code> section.<br />'
	     +     '2. Change selected variables according to your wishes.<br />'
	     +     '3. Save .js file to your web hosting (Dropbox, Google Drive, your own server, etc.).<br />'
	     +     '4. Paste direct link to your own file into External Javascript channel option.</div></div>';
	$("#_c6").html(html);
});

$("#clear-btn").on("click", function() {
	if (confirm('Are you sure to clear the chat window for all users?')) socket.emit("chatMsg", {msg:'/clear'});
});

$("#autoclear-btn").on("click", function() {
	if ($(this).hasClass('btn-danger')) {
		$(this).html('Autoclear');
		clearInterval(CLEARING);
	} else {
		$(this).html('Autoclear is ON!');
		CLEARING = setInterval(function() {socket.emit("chatMsg", {msg:'/clear'})}, 250);
	}
	$(this).toggleClass('btn-danger');
});

$("#antiafk-btn").on("click", function() {
	if ($(this).hasClass('btn-warning')) clearInterval(ANTIAFK)
	else {
		ANTIAFK = setInterval(function() {
			if (findUserlistItem(CLIENT.name).data().meta.afk) socket.emit("chatMsg", {msg:'/afk'});
		}, 2000);
	}
	$(this).toggleClass('btn-warning');
});

$("#afk-btn").on("click", function() {
	socket.emit("chatMsg", {msg:'/afk'});
});

$("#jukebox-btn").on("click", function() {
	$body.toggleClass('jukebox-mode');
	var queuewrap = $queue.parent();
	if (!$(this).hasClass('btn-warning')) {
		$("nav, footer, #navbar-collapsed, #motdrow, #announcements, #drinkbarwrap, #chatwrap").hide();
		$("#leftcontrols > button, #leftcontrols > div, #leftpane-inner, #sitefooter").hide();
		$("#resize-video-smaller, #resize-video-larger, #clear-btn, #autoclear-btn, #afk-btn, #plr-13").hide();
		queuewrap.after($chatwrap.detach());
		!SYNCH ? $videowrap.before(queuewrap.detach()) : $videowrap.after(queuewrap.detach());
		if (SCROLLNAVBAR) navbarMode("static");
		$("#mainpage").addClass('plmode');
		var match = document.getElementById("rightpane").className.match(/col-md-(\d+)/);
		var classe1 = 12 - parseInt(match[1], 10);
		queuewrap.removeClass().addClass('col-md-' + classe1 + ' col-lg-' + classe1);
		if ($expandPlaylist.hasClass('label-success')) $queue.removeClass('expanded');
		var ht = $videowrap.outerHeight() - $plmeta.outerHeight();
		$queue.attr('style', 'max-height:' + ht + 'px !important');
		window.scrollTo(0, 0);
		$(window).bind('resize.jukebox', function(e) {
			var ht = $videowrap.outerHeight() - $plmeta.outerHeight();
			$queue.attr('style', 'max-height:' + ht + 'px !important');
		});
	} else {
		if ($("#navbar-collapsed").length < 1) $nav.show();
		$("footer, #navbar-collapsed, #motdrow, #announcements, #drinkbarwrap, #chatwrap").show();
		$("#leftcontrols > button, #leftcontrols > div, #leftpane-inner, #sitefooter").show();
		$("#resize-video-smaller, #resize-video-larger, #afk-btn, #plr-13").show();
		handleRank();
		$chatwrap.after(queuewrap.detach());
		!SYNCH ? $videowrap.before($chatwrap.detach()) : $videowrap.after($chatwrap.detach());
		if (SCROLLNAVBAR) navbarMode("scrollable");
		$("#mainpage").removeClass('plmode');
		queuewrap.removeClass().addClass('col-md-12 col-lg-12');
		scrollChatToTop();
		$queue.removeAttr('style');
		if ($expandPlaylist.hasClass('label-success')) $queue.addClass('expanded');
		$(window).unbind('resize.jukebox');
	}
	$(this).toggleClass('btn-warning');
	if (SCROLLCHAT) scrollChat();
	scrollQueue();
});

$("#public-btn").on("click", function() {
	$("#channel-list").remove();
	if ($(this).hasClass('btn-warning')) $(this).removeClass('btn-warning')
	else {
		$.get('/', function(data) {
			var html = $(data).find("table");
			if (html) {
				$('<div id="channel-list" />').appendTo("#addoptswrap > div").html(html)
				  .append('<div class="clearfix5" />');
			}
		});
		$(this).addClass('btn-warning');
	}
});


// Playlist labels events

$scrollToCurrent.on("click", function() {
	if (EXPANDPL) {
		var pos = $(".queue_active").offset().top;
		var mp = $("#mainpage").css('padding-top').replace('px', '') * 1;
		if (!SCROLLNAVBAR) mp -= 8;
		window.scrollTo(0, pos - mp);
	} else scrollQueue();
	$(this).addClass('label-success');
	setTimeout(function() {$scrollToCurrent.removeClass('label-success')}, 1000);
});

$expandPlaylist.on("click", function() {
	$(this).attr('title', EXPANDPL ? 'Expand playlist' : 'Collapse playlist').toggleClass('label-success');
	$queue.toggleClass('expanded');
	setOpt('SP_expandpl', EXPANDPL = !EXPANDPL);
	scrollQueue();
});

$hidePlaylist.on("click", function() {
	toggleElement("#queue");
	$(this).attr('title', HIDEPLS ? 'Hide playlist' : 'Show playlist').toggleClass('label-danger');
	setOpt('SP_hidepls', HIDEPLS = !HIDEPLS);
	scrollQueue();
});



// Save notes button events

$("#notesave-btn").on("click", function() {
	var val = $("#note-area").val();
	var len = val.length;
	if (len > 1000000) {
		var str = 'Your notes have ' + len + ' characters.\n'
			+ 'You have exceeded maximum length of text (1\'000\'000 characters).';
		alert(str);
	} else setOpt('SP_notes_' + CLIENT.name, val);
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ---------- [SECTION 5] ORIGINAL SYNCHTUBE API EXTENSION ---------- */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Improved window focus
// source: "/www/js/ui.js" file

$(window).unbind("focus")
  .on("focus", function() {
	FOCUSED = true;
	clearInterval(TITLE_BLINK);
	TITLE_BLINK = false;
	CHATUNRNUM = 0;
	pageTitle();
  });


// Improved implementation of emotes tab completion
// source: "/www/js/tabcomplete.js" and "/www/js/ui.js" files

CyTube.tabCompleteMethods['Longest unique match'] = function(input, position, options, context) {
	var lower = input.toLowerCase();
	var start;
	var incomplete = '';
	for (start = position - 1; start >= 0; start--) {
		if (/\s/.test(lower[start])) break;
		incomplete = lower[start] + incomplete;
	}
	start++;

	if (!incomplete.length) return {text:input, emote:'', newPosition:position};

	var matches = options.filter(function (option) {
		return option.toLowerCase().indexOf(incomplete) === 0;
	});

	var completed;
	var isFullMatch = false;
	if (matches.length === 0) return {text:input, emote:'', newPosition:position}
	else if (matches.length === 1) {
		completed = matches[0];
		isFullMatch = true;
	} else {
		var currentPrefix = null;
		for (var i = 0; i < matches.length - 1; i++) {
			var first = matches[i];
			var second = matches[i+1];
			var nextPrefix = '';
			for (var j = 0; (currentPrefix === null || j < currentPrefix.length)
			  && j < first.length && j < second.length; j++) {
				if (first[j].toLowerCase() === second[j].toLowerCase()) nextPrefix += first[j]
				else break;
			}
			if (currentPrefix === null || nextPrefix.length < currentPrefix.length) {
				currentPrefix = nextPrefix;
			}
		}
		completed = currentPrefix;
	}

	var space = isFullMatch ? ' ' : '';
	return {
		text:input.substring(0, start) + completed + space + input.substring(position),
		emote:completed, newPosition:start + completed.length + space.length
	};
};

CyTube.tabCompleteMethods['Cycle options'] = function(input, position, options, context) {
	if (typeof context.start !== 'undefined') {
		var currentCompletion = input.substring(context.start, position - 1);
		if (currentCompletion === context.matches[context.tabIndex]) {
			context.tabIndex = (context.tabIndex + 1) % context.matches.length;
			var completed = context.matches[context.tabIndex];
			return {
				text:input.substring(0, context.start) + completed + ' ' + input.substring(position),
				emote:completed, newPosition:context.start + completed.length + 1
			};
		} else {
			delete context.matches;
			delete context.tabIndex;
			delete context.start;
		}
	}

	var lower = input.toLowerCase();
	var start;
	var incomplete = '';
	for (start = position - 1; start >= 0; start--) {
		if (/\s/.test(lower[start])) break;
		incomplete = lower[start] + incomplete;
	}
	start++;

	if (!incomplete.length) return {text:input, emote:'', newPosition:position};

	var matches = options.filter(function (option) {
		return option.toLowerCase().indexOf(incomplete) === 0;
	}).sort(function (a, b) {return a.toLowerCase() > b.toLowerCase()});

	if (matches.length === 0) return {text:input, emote:'', newPosition:position};

	context.start = start;
	context.matches = matches;
	context.tabIndex = 0;
	return {
		text:input.substring(0, start) + matches[0] + ' ' + input.substring(position),
		emote:matches[0], newPosition: start + matches[0].length + 1
	};
};

function chatTabComplete() {
	var chatline = document.getElementById("chatline");
	var currentText = chatline.value;
	var currentPosition = chatline.selectionEnd;
	if (typeof currentPosition !== 'number' || !chatline.setSelectionRange) return;
	var firstWord = !/\s/.test(currentText.trim());
	var options = [];
	var userlistElems = document.getElementById("userlist").children;
	for (var i = 0; i < userlistElems.length; i++) {
		var username = userlistElems[i].children[1].textContent;
		if (firstWord) username += ':';
		options.push(username);
	}

	CHANNEL.emotes.forEach(function (emote) {
		options.push(emote.name);
	});

	var method = USEROPTS.chat_tab_method;
	if (!CyTube.tabCompleteMethods[method]) method = "Cycle options";
	var result = CyTube.tabCompleteMethods[method](
		currentText, currentPosition, options, CyTube.chatTabCompleteData.context
	);

	chatline.value = result.text;
	if (result.emote != "") {
		var url = '';
		for (i in CHANNEL.emotes) {
			if (CHANNEL.emotes[i]["name"] == result.emote) {
				url = CHANNEL.emotes[i]["image"];
				break;
			}
		}
		if (url != "") {
			$("#emote-view").remove();
			var eview = $('<div id="emote-view" title="Click to close" />').appendTo($chatwrap)
			  .addClass(EMOTESPREVPOS).append('<img src="' + url + '" />')
			  .on("click", function() {
				$(this).remove();
				$chatline.focus();
			  });
		} else $("#emote-view").remove();
	} else $("#emote-view").remove();
	chatline.setSelectionRange(result.newPosition, result.newPosition);
}


// Chat message data buffer for commands answers

_dataBuffer = addChatMessage;
addChatMessage = function(data) {
	if (data.msg.indexOf('↳ ') == 0) {
		data.username = '[bot]';
		data.meta.addClass = 'action';
		data.meta.addClassToNameAndTimestamp = 'action';
	};
	_dataBuffer(data);
}


// Improved format chat message
// source: "/www/js/util.js" file

function formatChatMessage(data, last) {
	if (!data.meta || data.msgclass) {
		data.meta = {addClass:data.msgclass, addClassToNameAndTimestamp:data.msgclass};
	}
	var skip = data.username === last.name;
	if (CHATUSERNAME) skip = false;
	if (data.meta.addClass === "server-whisper" || data.meta.addClass === "action") skip = true;
	if (data.msg.match(/^\s*<strong>\w+\s*:\s*<\/strong>\s*/)) skip = false;
	if (data.meta.forceShowName) skip = false;

	var uname = (CLIENT.name != "") ? CLIENT.name : 'Anonymous';
	var mhist = (data.msg.toLowerCase().indexOf(uname.toLowerCase()) > -1) ? true : false;

	data.msg = stripImages(data.msg);
	data.msg = execEmotes(data.msg);

	last.name = data.username;
	var div = $('<div />');
	if (data.meta.addClass === "drink") {
		div.addClass('drink');
		data.meta.addClass = '';
	}

	if (USEROPTS.show_timestamps) {
		var time = $("<span/>").addClass("timestamp").appendTo(div);
		var timestamp = new Date(data.time).toTimeString().split(' ')[0];
		time.text('[' + timestamp + '] ');
		if (data.meta.addClass && data.meta.addClassToNameAndTimestamp) time.addClass(data.meta.addClass);
	}

	var name = $('<span class="uname_" />').appendTo(div);
	$("<strong/>").addClass('username').text(data.username + USERNAMEMARK + ' ').appendTo(name);
	if (data.meta.modflair) name.addClass(getNameColor(data.meta.modflair));
	if (data.meta.addClass && data.meta.addClassToNameAndTimestamp) name.addClass(data.meta.addClass);
	if (data.meta.superadminflair) {
		name.addClass("label").addClass(data.meta.superadminflair.labelclass);
		$('<span class="glyphicon" />').addClass(data.meta.superadminflair.icon).prependTo(name)
		  .css("margin-right", "3px");
	}

	if (EXECFILTERS) {
		var arr = JSON.parse(CUSTOMFILTERS);
		for (i in arr) {
			data.msg = data.msg.replace(RegExp(arr[i]["before"].trim(), "g"), arr[i]["after"]);
		}
	}

	if (data.meta.action) {
		name.remove();
		data.msg = data.username + ' ' + data.msg;
	}
	data.msg = execTextEffects(data.msg);

	if (!MUTECHAT && (!(data.username in MUTEDVOICES) || MUTEDVOICES[data.username] == "0")) {
		for (i in SoundFiltersArray) {
			if (data.msg.indexOf(i) > -1) {
				var aud = new Audio(SoundFiltersArray[i]);
				aud.volume = SOUNDSLVL / 10;
				aud.play();
				$("#sounds-btn").addClass('btn-success');
				setTimeout(function() {$("#sounds-btn").removeClass('btn-success')}, 1000);
			}	
		}
	}
	if (TEXTTOSPEECH) {
		if (typeof TTSTHROTTLE === "undefined") TTSTHROTTLE = 0;
		if (TTSTHROTTLE < 3) {
			TTSTHROTTLE++;
			setTimeout(function() {
				TTSTHROTTLE--;
				if (TTSTHROTTLE < 3 && !MUTECHAT) $("#sounds-btn").removeClass('btn-danger');
			}, 2000);
			var str = data.msg.replace(/(&gt;|&lt;)/g, "").replace(/&amp;/g, "");
			str = str.replace(/(!pick|!ask|!fortune|!gif|!emote|!dice|!roll)/g, "");
			str = str.replace(/(!time|!now|!stat|!uagent|!calc|!game)/g, "");
			str = str.replace(/(!add|!skip|!next|!bump|!movernd|!drop|!deletelast)/g, "");
			var _div = $('<div />').html(str);
			_div.find("img, a").remove();
			_div.find("code, strong, em, span, div").each(function() {
				$(this).replaceWith(this.childNodes);
			});
			var tts = _div.html();
			if (tts.length > 0) {
				var link = 'http://translate.google.com/translate_tts?tl=' + TTSLANGUAGE + '&q='
					 + encodeURI(tts) + '&client=tw-ob';
				var aud = new Audio(link);
				aud.volume = SOUNDSLVL / 10;
				aud.play();
				$("#sounds-btn").addClass('btn-success');
				setTimeout(function() {$("#sounds-btn").removeClass('btn-success')}, 1000);
			}
		} else $("#sounds-btn").removeClass('btn-success').addClass('btn-danger');
	}

	var message = $('<span />').appendTo(div);
	message[0].innerHTML = data.msg;

	if (data.meta.addClass) message.addClass(data.meta.addClass);
	if (data.meta.shadow) div.addClass("chat-shadow");
	if (data.msg.indexOf('↳ ') == 0) message.addClass("scriptanswer");

	if (SHOWIMAGES) showImagesOnChat(message)
	else if (SHOWOEKAKI) showOekakiOnChat(message);
	if (SHOWVIDEOS) showVideosOnChat(message);
	IGNOREEMOTES ? hideEmotes(message) : enhanceEmotes(message);

	if (PLAYERTEXT && !NOPLAYER && !HIDDENVWRAP) {
		if (!data.meta['addClass']) data.meta['addClass'] = '';
		playerText(message[0].innerHTML, data.meta.addClass);
	}

	CHATMSGNUM++;
	CHATUNRNUM = FOCUSED ? 0 : CHATUNRNUM + 1;
	if (TABMODE == 3) pageTitle();

	CHATHISTORY = getOrDefault('SP_chathistory_' + CLIENT.name, '{}');
	var obj = JSON.parse(CHATHISTORY);
	if (!(CHANNEL.name in obj)) {
		obj[CHANNEL.name] = {"last":"", data:[]};
	}
	obj[CHANNEL.name]["last"] = Date.now();
	if (obj[CHANNEL.name]["data"].length > 999) {
		obj[CHANNEL.name]["data"] = obj[CHANNEL.name]["data"].slice(-999);
	}
	obj[CHANNEL.name]["data"].push({"ts":Date.now(), "msg":div.html()});
	setOpt('SP_chathistory_' + CLIENT.name, CHATHISTORY = JSON.stringify(obj));

	if (mhist && data.username != "[server]") {
		CHATMENTIONS.push(div.html());
		NOTIFNUM++;
		if (!NONOTIFIER) $notifier.show();
		$notifier.find("strong").html(NOTIFNUM);
		if (SAVEMENTIONS) {
			var d = new Date();
			var month = d.getMonth() + 1;
			if (month < 10) month = '0' + month;
			var day = d.getDate();
			if (day < 10) day = '0' + day;
			var date = d.getFullYear() + '/' + month + '/' + day;
			MENTIONS = getOrDefault('SP_mentions_' + CLIENT.name, '[]');
			var obj = JSON.parse(MENTIONS);
			obj.push({"room":CHANNEL.name, "date":date, "msg":div.html()});
			if (obj.length > 200) obj = obj.slice(-200);
			setOpt('SP_mentions_' + CLIENT.name, JSON.stringify(obj));
		}
	}
	if (skip) div.find(".uname_").remove();
	return div;
}


// Chat commands answers

function prepareMessage(msg) {
	if (msg.indexOf('!') == 0) {
		COMMAND = true;
		if (msg.indexOf('!pick ') == 0) {
			var arr = msg.split('!pick ')[1].split(',');
			msg = arr[Math.round(Math.random() * (arr.length - 1))];
		} else if (msg.indexOf('!ask ') == 0) {
			if (AnswersArray.length < 1) AnswersArray = ['yes', 'no'];
			msg = AnswersArray[Math.round(Math.random() * (AnswersArray.length - 1))];
		} else if (msg.indexOf('!fortune') == 0) {
			if (typeof FORTUNE !== "undefined") {
				COMMAND = false;
				addChatNotification('You\'ve already got your fortune.');
			}
			if (COMMAND) {
				if (FortunesArray.length < 1) FortunesArray = ['blessing', 'curse'];
				msg = FortunesArray[Math.round(Math.random() * (FortunesArray.length - 1))];
				FORTUNE = true;
			}
		} else if (msg.indexOf('!gif ') == 0) {
			var q = msg.split('!gif ')[1];
			if (GiphyAPIKey == "") GiphyAPIKey = 'dc6zaTOxFJmzC';
			var url = 'https://api.giphy.com/v1/gifs/search?api_key=' + GiphyAPIKey + '&q='
				+ encodeURIComponent(q);
			$.getJSON(url, function(data) {
				if (data.data.length > 0) { 
					var nr = Math.floor(Math.random() * data.data.length);
					var res = data.data[nr].images.original.url;
				} else var res = '↳ No gifs found for "' + q + '"';
				if (CHANNEL.opts.chat_antiflood && CHANNEL.opts.chat_antiflood_params.burst < 2) {
					setTimeout(function() {socket.emit("chatMsg", {msg:res})}, 1000);
				} else socket.emit("chatMsg", {msg:res});
			});
			COMMAND = false;
		} else if (msg.indexOf('!emote') == 0) {
			var len = CHANNEL.emotes.length;
			if (len < 1) {
				COMMAND = false;
				addChatNotification('This channel has no emotes.');
			}
			if (COMMAND) msg = CHANNEL.emotes[Math.floor(Math.random() * len)].name;
		} else if (msg.indexOf('!dice') == 0) {
			checkCommandsAbuse();
			if (COMMAND) msg = Math.floor(Math.random() * 6) + 1;
		} else if (msg.indexOf('!roll') == 0) {
			checkCommandsAbuse();
			if (COMMAND) {
				var str = '';
				for (i = 0; i < 6; i++) str += Math.floor(Math.random() * 10);
				msg = str;
			}
		} else if (msg.indexOf('!time') == 0) {
			var h = new Date().getHours();
			if (h < 10) h = '0' + h;
			var m = new Date().getMinutes();
			if (m < 10) m = '0' + m;
			msg = 'Current local time: ' + h + ':' + m;
		} else if (msg.indexOf('!now') == 0) {
			var title;
			var len = $queue.find(".queue_entry").length;
			if (!hasPermission("seeplaylist") || len < 1) {
				if (CustomTitleCaption != "") {
					title = $("#currenttitle").html().replace(CustomTitleCaption, "");
				} else title = $("#currenttitle").html().replace("Currently Playing: ", "");
			} else title = $(".queue_active").data("media").title;
			if (NowPlaying == "") NowPlaying = 'Now playing';
			msg = NowPlaying + ': ' + title;
		} else if (msg.indexOf('!stat') == 0) {
			var num = CHATHIST.length;
			var len = 0, rnd = 0, avg = 0;
			for (i in CHATHIST) {
				len += CHATHIST[i].length;
			}
			var h = Math.floor(ONLINETIME / 60);
			var m = ONLINETIME - h * 60;
			if (m < 10) m = '0' + m;
			msg = 'online: ' + h + 'h:' + m + 'm, messages: ' + num + ', '
			    + 'characters: ' + len;
			if (num > 0) {
				var rnd = Math.round(Math.random() * (CHATHIST.length - 1));
				var avg = Math.round(len / num * 10) / 10;
				msg += ' (' + avg + ' per message), ' + 'random message: ' + CHATHIST[rnd];
			}
		} else if (msg === '!uagent') {
			msg = window.navigator.userAgent;
		} else if (msg.indexOf('!calc ') == 0) {
			try {
			  var regex = /(?:[a-z$_][a-z0-9$_]*)|(?:[;={}\[\]"'!&<>^\\?:])/ig,
			  isLegit = true;
			  msg = msg.split('!calc ')[1].replace(regex, function(f) {
				if (Math.hasOwnProperty(f)) return 'Math.' + f
        			else isLegit = false;
			  });
			  if (!isLegit) throw new Error('wrong or not allowed math formula');
			  msg = eval(msg).toPrecision(14) * 1;
			}
			catch(err) {
			  msg = 'Error: ' + err.message;
			}
		} else if (msg.indexOf('!add ') == 0) {
			if (hasPermission("playlistadd")) {
				var parsed = parseMediaLink(msg.split('!add ')[1]);
				if (parsed["id"] === null) addChatNotification('Error: invalid link')
				else socket.emit("queue", {id:parsed["id"], pos:"end", type:parsed["type"]});
			} else addChatNotification('Warning! You have no permission to add links');
			COMMAND = false;
		} else if (msg.indexOf('!skip') == 0) {
			if (hasPermission("voteskip")) {
				$("#voteskip").attr("disabled", true);
				socket.emit("voteskip");
				if ($queue.find(".queue_entry").length > 0) addChatNotification('item voteskipped')
				else if (hasPermission("seeplaylist")) {
					addChatNotification('Warning! Playlist is empty');
				}
			} else addChatNotification('Warning! You have no permission to voteskip');
			COMMAND = false;
		} else if (msg.indexOf('!next') == 0) {
			if (hasPermission("playlistjump")) {
				if (PLAYER) socket.emit("playNext")
				else if (hasPermission("seeplaylist")) {
					addChatNotification('Warning! Playlist is empty');
				}
			} else addChatNotification('Warning! You have no permission to play next item');
			COMMAND = false;
		} else if (msg.indexOf('!bump') == 0) {
			if (hasPermission("playlistmove") && hasPermission("seeplaylist")) {
				if ($queue.find(".queue_entry").length > 0) {
					var last = $queue.children().length;
					var uid = $queue.find(".queue_entry:nth-child(" + last + ")").data("uid");
					socket.emit("moveMedia", {from:uid, after:PL_CURRENT});
					addChatNotification('last item bumped to next');
				} else addChatNotification('Warning! Playlist is empty');
			} else addChatNotification('Warning! You have no permission to move playlist items');
			COMMAND = false;
		} else if (msg.indexOf('!movernd') == 0) {
			if (hasPermission("playlistmove") && hasPermission("seeplaylist")) {
				var len = $queue.find(".queue_entry").length;
				if (len > 0) {
					var r1 = Math.floor(Math.random() * len) + 1;
					var r2 = Math.floor(Math.random() * len) + 1;
					var b = $queue.find(".queue_entry:nth-child(" + r1 + ")").data("uid");
					var a = $queue.find(".queue_entry:nth-child(" + r2 + ")").data("uid");
					socket.emit("moveMedia", {from:b, after:a});
					addChatNotification('random item moved to random position');
				} else addChatNotification('Warning! Playlist is empty');
			} else addChatNotification('Warning! You have no permission to move playlist items');
			COMMAND = false;
		} else if (msg.indexOf('!drop') == 0) {
			if (hasPermission("playlistmove") && hasPermission("seeplaylist")) {
				var len = $queue.find(".queue_entry").length;
				if (len > 0) {
					var b = $queue.find(".queue_entry:nth-child(1)").data("uid");
					var a = $queue.find(".queue_entry:nth-child(" + len + ")").data("uid");
					socket.emit("moveMedia", {from:b, after:a});
					addChatNotification('first item moved to the end of playlist');
				} else addChatNotification('Warning! Playlist is empty');
			} else addChatNotification('Warning! You have no permission to move playlist items');
			COMMAND = false;
		} else if (msg.indexOf('!deletelast') == 0) {
			if (hasPermission("playlistdelete") && hasPermission("seeplaylist")) {
				var len = $queue.find(".queue_entry").length;
				if (len > 0) {
					var a = $queue.find(".queue_entry:nth-child(" + len + ")").data("uid");
					socket.emit("delete", a);
					addChatNotification('last item deleted from playlist');
				} else addChatNotification('Warning! Playlist is empty');
			} else addChatNotification('Warning! You have no permission to delete playlist items');
			COMMAND = false;
		} else if (msg.indexOf('!fact') == 0 && FactsArray.length > 0) {
			checkCommandsAbuse();
			if (COMMAND) {
				if (typeof UsersArray === "undefined") UsersArray = [];
				$(".userlist_item span:nth-child(2)").each(function() {
					UsersArray.push($(this).html());
				});
				msg = UsersArray[Math.round(Math.random() * (UsersArray.length - 1))] + ' '
				    + FactsArray[Math.round(Math.random() * (FactsArray.length - 1))];
			}
		} else COMMAND = false;
	}
	return msg;
}


// Improved chat autoscroll
// source" "/www/js/util.js" file

function scrollChat() {
	if ($("#chat-18").hasClass('activated')) return
	else {
    		scrollAndIgnoreEvent($("#messagebuffer").prop("scrollHeight"));
   		$("#newmessages-indicator").remove();
	}
}


// Handle messages sending

function sendMessage() {
	if (CHATTHROTTLE) return;
	var msg = $chatline.val();
	var ret = true;
	var cl = true;
	if (msg == "/help") document.getElementById("chat-f1").click()
	else if (msg == "!game") guessNumber()
	else if (msg == "/premium") document.getElementById("layout-1").click()
	else if (msg == "/css") document.getElementById("layout-2").click()
	else if (msg == "/leader") {
		if (hasPermission("leaderctl")) document.getElementById("chat-15").click();
		else addChatNotification('Warning! You have no permission to give yourself a Leader status');
		cl = false;
	} else if (msg == "/theatre") {
		if ($("#close-btn").length > 0) document.getElementById("close-btn").click();
		document.getElementById("layout-9").click();
	} else if (msg == "/radio") {
		if ($("#close-btn").length > 0) document.getElementById("close-btn").click();
		document.getElementById("layout-10").click();
	} else if (msg == "/close") document.getElementById("close-btn").click()
	else if (msg == "/emotes") document.getElementById("chat-f2").click()
	else if (msg == "/unicode") document.getElementById("chat-f3").click()
	else if (msg == "/msg") document.getElementById("my-messages").click()
	else if (msg == "/expchat") {
		document.getElementById("expand-chat").click();
		cl = false;
	} else if (msg == "/autoscroll") {
		document.getElementById("chat-18").click();
		if ($("#chat-18").hasClass('activated')) addChatNotification('Chat autoscroll is now off')
		else addChatNotification('Chat autoscroll is now on');
	} else if (msg == "/ulist") {
		document.getElementById("userlisttoggle").click();
		cl = false;
	} else if (msg == "/ulistside") {
		document.getElementById("chat-f4").click();
		cl = false;
	} else if (msg == "/top") document.getElementById("scroll-top").click()
	else if (msg == "/chatclear") document.getElementById("chat-f7").click()
	else if (msg == "/plhide") {
		if (NOPLAYER) addChatNotification('Warning! Unavailable command - player was removed')
		else {
			document.getElementById("plr-1").click();
			cl = false;
		}
	} else if (msg == "/pltoggle") {
		if (NOPLAYER) addChatNotification('Warning! Unavailable command - player was removed')
		else {
			document.getElementById("plr-13").click();
			cl = false;
		}
	} else if (msg == "/plmute") {
		if (NOPLAYER) addChatNotification('Warning! Unavailable command - player was removed')
		else {
			document.getElementById("plr-9").click();
			cl = false;
		}
	} else if (msg == "/nn") {
		if (NOPLAYER) addChatNotification('Warning! Unavailable command - player was removed')
		else document.getElementById("chat-3").click();
	} else if (msg == "/mascot") {
		if (NOPLAYER) addChatNotification('Warning! Unavailable command - player was removed')
		else {
			document.getElementById("plr-17").click();
			cl = false;
		}
	} else if (msg == "/last") document.getElementById("pls-1").click()
	else if (msg == "/save") {
		if ($("#pls-3").css('display') == "none") {
			addChatNotification('Warning! This item has no downloadable link');
		} else document.getElementById("pls-3").click();
	} else if (msg == "/fav") {
		if (NOPLAYER) addChatNotification('Warning! Unavailable command - player was removed')
		else {
			if (!$("#favs-btn").hasClass('btn-success')) {
				if (!$("#favs-btn").hasClass('active')) document.getElementById("favs-btn").click();
				document.getElementById("addtofav-btn").click();
			}
			cl = false;
		}
	} else if (msg == "/hist") document.getElementById("my-chat").click()
	else if (msg == "/mentions") document.getElementById("my-mentions").click()
	else ret = false;
	if (ret) {
		if (cl) $chatline.val('');
		return;
	}
	SHORTHANDS = getOrDefault('SP_shorthands_' + CLIENT.name, '[]');
	var arr = JSON.parse(SHORTHANDS);
	for (i in arr) {
		if (arr[i] != "") msg = msg.replace(RegExp('//' + i, "g"), arr[i]);
	}
	var _msg = msg;
	if (msg.trim()) {
		msg = prepareMessage(msg.trim());
		if (COMMAND) {
			var meta = {};
			if (USEROPTS.adminhat && CLIENT.rank >= 255) _msg = '/a ' + _msg
			else if (USEROPTS.modhat && CLIENT.rank >= Rank.Moderator) meta.modflair = CLIENT.rank;
			if (CLIENT.rank >= 2 && _msg.indexOf('/m ') === 0) {
				meta.modflair = CLIENT.rank;
				_msg = _msg.substring(3);
			}
			socket.emit("chatMsg", {msg:_msg, meta:meta});
			msg = '↳ ' + msg;
		}
		if (COMMAND && CHANNEL.opts.chat_antiflood && CHANNEL.opts.chat_antiflood_params.burst < 2) {
			var html = 'Warning! This command cannot be executed - chat antiflood option is enabled. '
				 + '"# of messages allowed before throttling" option in Chat Settings '
				 + 'must be above 1 to run this command. Ask channel administrator.'
			addChatNotification(html);
		} else {
			var meta = {};
			if (USEROPTS.adminhat && CLIENT.rank >= 255) msg = '/a ' + msg
			else if (USEROPTS.modhat && CLIENT.rank >= Rank.Moderator) meta.modflair = CLIENT.rank;
			if (CLIENT.rank >= 2 && msg.indexOf('/m ') === 0) {
				meta.modflair = CLIENT.rank;
				msg = msg.substring(3);
			}
			socket.emit("chatMsg", {msg:msg, meta:meta});
		}
		COMMAND = false;
		$chatline.val('');
		$("#emote-view").remove();
		CHATHIST.push(_msg);
		CHATHISTIDX = CHATHIST.length;
		MSGHISTORY = getOrDefault('SP_msghistory_' + CLIENT.name, '[]');
		var obj = JSON.parse(MSGHISTORY);
		obj.push(_msg);
		if (obj.length > 200) obj = obj.slice(-200);
		setOpt('SP_msghistory_' + CLIENT.name, MSGHISTORY = JSON.stringify(obj));
	}
	return;
}


// Improved chatline and chat button events
// source "/www/js/ui.js" file

$("#chatline, #chatbtn").unbind();

$chatline.on("keydown", function(ev) {
	if (ev.keyCode == 13) sendMessage()
	else if (ev.keyCode == 9) {
          try {
		chatTabComplete();
	  } catch (error) {
		console.error(error);
	  }
		ev.preventDefault();
		return false;
	} else if (ev.keyCode == 38) {
		if (CHATHISTIDX == CHATHIST.length) CHATHIST.push($chatline.val());
		if (CHATHISTIDX > 0) {
			CHATHISTIDX--;
			$chatline.val(CHATHIST[CHATHISTIDX]);
		}
		ev.preventDefault();
		return false;
	} else if (ev.keyCode == 40) {
		if (CHATHISTIDX < CHATHIST.length - 1) {
			CHATHISTIDX++;
			$chatline.val(CHATHIST[CHATHISTIDX]);
		}
		ev.preventDefault();
		return false;
	}
});

$("#chatbtn").on("click", function() {
	sendMessage();
});


// Improved playlist links retrieving
// source: "/www/js/ui.js" file

$("#getplaylist").unbind()
  .on("click", function() {
	createModal('Playlist URLs');
	$(".modal-dialog-nonfluid").removeClass('modal-dialog-nonfluid non-fluid');
	var data = $('<textarea rows="10" class="form-control" />').val(formatRawList()).appendTo(body);
	$('<button class="btn btn-default btn-success pull-left glinks">Raw Links</button>').appendTo(footer)
	  .on("click", function() {
		data.val(formatRawList());
		$(".glinks").removeClass('btn-success');
		$(this).addClass('btn-success');
	  });
	$('<button class="btn btn-default pull-left glinks">Plain Text</button>').appendTo(footer)
	  .on("click", function() {
		var arr = [];
		var i = 0;
		$queue.find("li").each(function() {
			i++;
			var item = $(this).data("media");
			arr.push(i + '. ' + formatURL(item) + ' :: ' + item.title + ' [' + item.duration + ']');
		});
		data.val(arr.join('\n'));
		$(".glinks").removeClass('btn-success');
		$(this).addClass('btn-success');
	  });
	$('<button class="btn btn-default pull-left glinks">HTML Code</button>').appendTo(footer)
	  .on("click", function() {
		var arr = [];
		$queue.find("li").each(function() {
			var item = $(this).data("media");
			var link = formatURL(item);
			var str = ' [' + item.duration + '] - <a href="' + link + '" target="_blank">'
				+ link + '</a>';
			arr.push('<li>' + item.title + '' + str + '</li>');
		});
		data.val('<ol>\n' + arr.join('\n') + '\n</ol>');
		$(".glinks").removeClass('btn-success');
		$(this).addClass('btn-success');
	  });
	$('<button class="btn btn-default pull-left glinks">Ordered List</button>').appendTo(footer)
	  .on("click", function() {
		var arr = [];
		$queue.find("li").each(function() {
			var item = $(this).data("media");
			arr.push(item.title + ' ●● ' + formatURL(item) + ' ●● [' + item.duration + ']');
			arr.sort();
		});
		data.val(arr.join('\n'));
		$(".glinks").removeClass('btn-success');
		$(this).addClass('btn-success');
	  });
	$('<button class="btn btn-default pull-left glinks">Array Format</button>').appendTo(footer)
	  .on("click", function() {
		var arr = [];
		$queue.find("li").each(function() {
			var item = $(this).data("media");
			var re1 = new RegExp('\\\\', 'g');
			var re2 = new RegExp('\'', 'g');
			var title = item.title.replace(re1, '\\\\').replace(re2, '\\\'');
			arr.push('[\'' + formatURL(item) + '\', \'' + title + '\'],');
		});
		data.val(arr.join('\n'));
		$(".glinks").removeClass('btn-success');
		$(this).addClass('btn-success');
	  });
});


// Keyboard shortcuts - LeftAlt + key

$(document).on('keydown', function(e) {
	if (e.altKey && !e.ctrlKey) {
		if (String.fromCharCode(e.which) === "1") {
			if ($("#close-btn").length > 0) document.getElementById("close-btn").click();
			document.getElementById("layout-9").click();
		} else if (String.fromCharCode(e.which) === "2") {
			if ($("#close-btn").length > 0) document.getElementById("close-btn").click();
			document.getElementById("layout-10").click();
		} else if (String.fromCharCode(e.which) === "3") document.getElementById("layout-1").click()
		else if (String.fromCharCode(e.which) === "4") document.getElementById("layout-2").click()
		else if (String.fromCharCode(e.which) === "5") document.getElementById("layout-7").click()
		else if (String.fromCharCode(e.which) === "6") document.getElementById("layout-8").click()
		else if (String.fromCharCode(e.which) === "7") document.getElementById("expand-chat").click()
		else if (String.fromCharCode(e.which) === "8") document.getElementById("hide-playlist").click()
		else if (String.fromCharCode(e.which) === "9") document.getElementById("plr-9").click()
		else if (String.fromCharCode(e.which) === "0") document.getElementById("close-btn").click()
		else if (String.fromCharCode(e.which) === "Q") document.getElementById("plr-10").click()
		else if (String.fromCharCode(e.which) === "A") document.getElementById("plr-8").click()
		else if (String.fromCharCode(e.which) === "T") scrollChatToTop()
		else if (String.fromCharCode(e.which) === "N") document.getElementById("chat-3").click()
		else if (String.fromCharCode(e.which) === "I") document.getElementById("chat-1").click()
		else if (String.fromCharCode(e.which) === "F") {
			if (!$("#favs-btn").hasClass('btn-success')) {
				if (!$("#favs-btn").hasClass('active')) document.getElementById("favs-btn").click();
				document.getElementById("addtofav-btn").click();
			}
		} else if (String.fromCharCode(e.which) === "H") document.getElementById("chat-f1").click()
		else if (String.fromCharCode(e.which) === "R") {
			var uname = CLIENT.name != "" ? CLIENT.name : 'Anonymous';
			createModal('Hello, ' + uname);
			var div = $('<div class="centered" />').appendTo(body);
			$('<button class="btn btn-default">Set random Premium theme</button>').appendTo(div)
			  .on("click", function() {
				$("#usertheme").attr('href', '/css/themes/slate.css');
				$("#usertheme2").remove();
				USERTHEME = ThemesArray[Math.floor(Math.random() * ThemesArray.length)][1];
				$('<link id="usertheme2" rel="stylesheet" type="text/css" />')
				  .insertAfter("#usertheme").attr('href', USERTHEME);
				outer.on("hidden.bs.modal", function() {
					outer.remove();
					handleVideoResize();
					setOpt('SP_usertheme', USERTHEME);
				});
			  });
		}
		e.preventDefault();
	}
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ---------- [SECTION 6] IMGUR API ---------- */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// API functions
// source: Synchtube API, 2014 by JAlB

IMGUR_fileset = [];
IMGUR_load = [];
IMGUR_progress = [];

function API_IMGUR_fileset(f) {
	IMGUR_fileset[IMGUR_fileset.length] = f;
}

function API_IMGUR_load(f) {
	IMGUR_load[IMGUR_load.length] = f;
}

function API_IMGUR_progress(f) {
	IMGUR_progress[IMGUR_progress.length] = f;
}

function API_IMGUR_upload(file) {
	if (!file || !file.type.match(/image.*/)) return;
	var d = new FormData();
	d.append("image", file)
	d.append("key", "6528448c258cff474ca9701c5bab6927");
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "https://api.imgur.com/3/image");
	if (ImgurClientID == "") ImgurClientID = 'a11c2b9fbdd104a';
	xhr.setRequestHeader('Authorization', 'Client-ID ' + ImgurClientID);
	xhr.onload = function() {
		var len = IMGUR_load.length;
		var res = JSON.parse(xhr.responseText).data.link;
		for (var i = 0; i < len; i++) IMGUR_load[i](res);
	}
	xhr.onerror = function(){
		alert('An error occurred during upload: ' + xhr.status);
		imageli.show();
		$("#oeup-btn").show();
		upalert.remove();
	};
	xhr.upload.onprogress = function(ev) {
		var len = IMGUR_progress.length;
		for (var i = 0; i < len; i++) IMGUR_progress[i](ev);
	};
	xhr.send(d);
}

function API_IMGUR_uploading(file) {
	if (file.type.match(/image.*/)) {
		var len = IMGUR_fileset.length;
		for (var i = 0; i < len; i++) IMGUR_fileset[i]();
		API_IMGUR_upload(file);
	} else {
		alert('Only image files are allowed.');
		imageli.show();
		$("#oeup-btn").show();
		upalert.remove();
	}
}

API_IMGUR_load(function(res) {
	insertText(res + ' ');
	imageli.show();
	$("#oeup-btn").show();
	upalert.remove();
});

API_IMGUR_fileset(function(){
	upalert.html('File uploading...');
});

API_IMGUR_progress(function(ev) {
	if (ev.lengthComputable) {
		var prog = Math.floor((ev.loaded / ev.total) * 100);
		upalert.html('File upload: ' + prog + '%');
		if (prog == 100) upalert.html('File uploaded,<br />wait for the link');
	}
});


// API HTML elements

imageli = $('<li id="chat-f8" class="opt"><a>Upload to Imgur</a></li>').appendTo("#chatfunc-menu")
  .on("click", function() {
	uploadinput.click();
  });

uploadwell = $('<div id="uploadwell" class="well">').appendTo("#leftpane-inner");

uploadinput = document.createElement("input");
uploadinput.id = "fileinput";
uploadinput.type = "file";
document.getElementById("uploadwell").appendChild(uploadinput);

uploadbtn = $('<button id="upload-btn" class="btn btn-sm btn-default">Upload image</button>').appendTo(uploadwell)
  .on("click", function() {
	uploadinput.click();
});


// Uploading files

uploadinput.onchange = function() {
	imageli.hide();
	$("#oeup-btn").hide();
	upalert = $('<div id="upalert" class="profile-box text-center upalert">File upload: 0%</div>')
	  .appendTo("#chatwrap");
	upalert.css('top', ($chatwrap.height() - upalert.height()) / 2)
	  .css('left', ($chatwrap.width() - upalert.width()) / 2);
	API_IMGUR_uploading(this.files[0]);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ---------- [SECTION 7] OEKAKI API ---------- */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// API functions
// source: drawingboard.js v0.4.6 - https://github.com/Leimi/drawingboard.js

// Copyright © 2015 Emmanuel Pelletier [Licensed MIT]

function uploadOekaki(pic) {
	upalert = $('<div id="upalert" class="profile-box text-center upalert">Oekaki drawing upload...</div>')
	  .appendTo("#chatwrap");
	upalert.css('top', ($chatwrap.height() - upalert.height()) / 2)
	  .css('left', ($chatwrap.width() - upalert.width()) / 2);
	$("#oeup-btn, #chat-f8").hide();
	if (ImgurClientID == "") ImgurClientID = 'a11c2b9fbdd104a';

	$.ajax({url:'https://api.imgur.com/3/image',
		type:'post',
		headers:{Authorization:'Client-ID ' + ImgurClientID},
		data:{image:pic.replace(/^data:image\/[a-z]+;base64,/,''), type:'base64'},
		dataType:'json',
		success:function(json) {
			socket.emit("chatMsg", {msg:json.data.link + '?oekaki'});
			upalert.remove();
			$("#oeup-btn, #chat-f8").show();
		},
		error:function(json) {
			alert('Error! Try again.');
			upalert.remove();
			$("#oeup-btn, #chat-f8").show();
		}
	});
}

function oekaki() {
	$.getScript(DROPBOX + "sbuj4e1z3dh87z1/oekaki.js", function() {
		OETSTAMP = 0;
		$("#spoekaki").html('');
		$('<link id="oekakicss" rel="stylesheet" type="text/css" />').appendTo("head")
		  .attr('href', DROPBOX + 'syendmytcl4rgzt/oekaki.css');
		var spoekaki = new DrawingBoard.Board('spoekaki', {
			controls:['Color', 'DrawingMode', 'Size', 'Navigation'],
			webStorage:"local",
			droppable:true,
			controlsPosition:"bottom center"
		});
		DrawingBoard.Control.Upload = DrawingBoard.Control.extend({
			name:'Upload',
			initialize:function() {
				$('<button id="oeup-btn" title="send to chat" />').appendTo(this.$el)
				  .html('Send <i class="glyphicon glyphicon-export"></i>')
				this.$el.on('click', '#oeup-btn', $.proxy(function(e) {
					e.preventDefault();
					var time = (new Date()).getTime();
					if ((time - OETSTAMP) > 30000) {
						OETSTAMP = time;
						uploadOekaki(this.board.getImg());
					} else alert('Warning! You can send 1 picture every 30 seconds.');
				}, this));
			}
		});
		spoekaki.addControl('Upload');
		$("#spoekaki .drawing-board-controls").after('<div id="oekaki-checkbox" class="centered" />');
		var html = '<label class="checkbox-inline"><input id="show-oekaki" type="checkbox"><span> '
			 +   'Show drawings directly on chat</span></label>';
		$("#oekaki-checkbox").html(html);
		$("#show-oekaki").on("click", function() {
			if (SHOWOEKAKI) {
				$messagebuffer.find('a[href$="?oekaki"]').each(function() {
  					$(this).html(this.href);
				});
			} else showOekakiOnChat($messagebuffer);
			setOpt('SP_showoekaki', SHOWOEKAKI = !SHOWOEKAKI);
			if (SCROLLCHAT) scrollChat();
		});
		if (SHOWOEKAKI) $("#show-oekaki").prop('checked', true);
		if (SHOWIMAGES) $("#oekaki-checkbox").hide();
		OEKAKILOAD = true;
	});
}


// API HTML elements

$oekakiwrap = $('<div id="oekakiwrap" class="col-lg-12 col-md-12 wells leftareas" />')
  .insertBefore("#notepadwrap").append('<div id="oekaki-well" class="well form-horizontal" />').hide();
$('<div id="spoekaki" class="centered">Loading drawing board...</div>').appendTo("#oekaki-well");
$('<button id="oekaki-btn" class="btn btn-sm btn-default btn-chatctrl" title="Oekaki - drawing board" />')
  .prependTo($chatcontrols).html('<span class="glyphicon glyphicon-picture"></span>')
  .on("click", function() {
	toggleElement($oekakiwrap);
	$(this).toggleClass('btn-success');
	if (typeof OEKAKILOAD === "undefined") OEKAKILOAD = false;
	if (!OEKAKILOAD) oekaki();
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ---------- [SECTION 8] CSS AND FINAL LAYOUT ---------- */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Add Synchtube Premium UI CSS

var css = '.bigtitle {\n'
	+ '  border-bottom-width:1px !important; border-bottom-left-radius:5px !important;\n'
	+ '  border-bottom-right-radius:5px !important; padding:5px; font-size:120%; text-align:center;\n'
	+ '}\n'
	+ '.btn-chatctrl {margin-right:0px !important}\n'
	+ '.btn-colors {margin-left:0px !important}\n'
	+ '.btngr-padding {padding-left:20px}\n'
	+ '.cbtn {background-image:none !important; margin-right:0px !important}\n'
	+ '.centered {text-align:center !important}\n'
	+ '.channel-emote {cursor:pointer}\n'
	+ '.clearfix0 {clear:both; margin-bottom:0px}\n'
	+ '.clearfix5 {clear:both; margin-bottom:5px}\n'
	+ '.commands-tbl td {max-width:400px; padding-right:20px}\n'
	+ '.commands-tbl tr:not(:first-child) td {padding-top:10px}\n'
	+ '.darkened {opacity:0.4 !important}\n'
	+ '.dropdown-menu .glyphicon-ok, nav .dropdown-menu .glyphicon {margin-right:8px}\n'
	+ '.dropdown-menu li {cursor:pointer}\n'
	+ '.embedimg, .oekakiimg {border-radius:10px; margin-bottom:6px !important}\n'
	+ '.embedimg, .oekakiimg, .embedvid \n'
	+ '  {max-width:200px; max-height:200px; margin-top:6px !important}\n'
	+ '.oekakiimg {border:solid 2px #000}\n'
	+ '.embedvid {border-radius:6px}\n'
	+ '.glyphicon.small {margin-left:8px; cursor:pointer}\n'
	+ '.group-modal {margin-bottom:20px}\n'
	+ '.icon-right {margin-left:8px}\n'
	+ '.margin-bottom-10 {margin-bottom:10px}\n'
	+ '.margin-top-15 {margin-top:15px}\n'
	+ '.maxwidth {width:100% !important}\n'
	+ '.miniature {max-width:120px; max-height:90px}\n'
	+ '.modal .channel-emote {max-width:50px !important; max-height:50px !important}\n'
	+ '.modal .embedimg, .modal .embedvid {max-width:100px !important; max-height:100px !important}\n'
	+ '.modal .panel-body > div:nth-child(1) .checkbox-inline, .modal .elements-inline {padding-top:0px}\n'
	+ '.modal-btn-xs {margin-right:4px}\n'
	+ '.nav-cog {margin-right:8px}\n'
	+ '.pbar {\n'
	+ '  background-image:linear-gradient(to right,#555,#555) !important; background-size:0% 100%;\n'
	+ '  background-position:0px center !important; background-repeat:no-repeat !important;\n'
	+ '}\n'
	+ 'body.bright .pbar {background-image:linear-gradient(to right,#DDD,#DDD) !important}\n'
	+ '.player-chat {\n'
	+   'color:#FFF ;font-size:2em; position:absolute; z-index:504; cursor:default; white-space:nowrap;\n'
	+   'opacity:0.75; letter-spacing:4px; user-select:none; pointer-events:none; padding:0 8px;\n'
	+   'text-shadow:0 -1px #000, 1px 0 #000, 0 1px #000, -1px 0 #000; background-color:rgba(0,0,0,0.5);\n'
	+   'border-radius:6px;\n'
	+ '}\n'
	+ '.player-chat.greentext {color:#789922}\n'
	+ '.player-chat.marq {transition:right 8s linear, left 8s linear}\n'
	+ '.player-chat.marq2 {transition:right 14s linear, left 14s linear}\n'
	+ '.player-chat.shout {color:#F00}\n'
	+ '.navbar-fixed-top.snav {position:inherit !important; margin-bottom:8px !important}\n'
	+ '.radiotitle {\n'
	+ '  border-style:solid !important; border-width:6px !important; border-radius:5px !important;\n'
	+ '  padding:10px !important; font-size:150% !important;\n'
	+ '}\n'
	+ '.scrolled {max-height:calc(100vh - 250px); overflow-y:auto}\n'
	+ '.server-msg-reconnect:after \n'
	+ '  {content:" to: /' + CHANNELPATH + '/' + window.location.href.split("/").pop() + '"}\n'
	+ '.single-checkbox {padding-left:15px; padding-top:9px}\n'
	+ '.smallfont {font-size:85%}\n'
	+ '.stitched {\n'
	+ '  outline:1px dashed #98ABB9; outline-offset:-5px; background-color:#556068;\n'
	+ '  box-shadow:2px 2px 2px #000; padding:5px; border-radius:2px; color:#EEE;\n'
	+ '}\n'
	+ '.widecm {min-width:260px}\n'
	+ 'select {cursor:pointer}\n'
	+ '#navbar-up, #navbar-unpin {margin-left:10px; margin-right:5px}\n'
	+ '@media (max-width:768px) {\n'
	+ '  #navbar-up, #navbar-unpin {margin-left:0px; margin-right:15px}\n'
	+ '}\n'
	+ '#navbar-collapsed {position:fixed; top:0px; left:0px; padding-top:0px; z-index:504}\n'
	+ '#navbar-collapsed div {\n'
	+ '  width:60px; margin:0 auto; border:solid 3px #CCC; padding:4px; background-color:#333;\n'
	+ '  border-style:none solid solid; border-bottom-left-radius:8px; border-bottom-right-radius:8px\n'
	+ '}\n'
	+ 'body.bright #navbar-collapsed div {border-color:#666; background-color:#DDD}\n'
	+ '#useravatar {max-width:60px; max-height:60px; border-radius:8px; margin-bottom:5px}\n'
	+ '#rooms-table {max-height:280px; overflow:auto; margin-bottom:5px}\n'
	+ '#usernamemark {max-width:50px; font-weight:bold}\n'
	+ '#chatmaxsize, #emotesperpage {max-width:120px}\n'
	+ '#customhtml, #css-area {font-family:Monospace}\n'
	+ '#customhtml {margin-top:8px}\n'
	+ '#notesavewrap {padding-top:5px}\n'
	+ '#titlerow {margin-bottom:10px}\n'
	+ '#userlist.separate .userlist_item {border-bottom:solid 2px #AAA; padding:2px}\n'
	+ '#mediastats {margin:0 0 1px; padding-left:1px; padding-right:1px}\n'
	+ '#player-chat-wrap img {max-width:60px; max-height:60px}\n'
	+ '#player-chat-wrap img.oekakiimg {max-width:100px; max-height:100px}\n'
	+ '#mutegroup {margin-top:10px; margin-bottom:10px}\n'
	+ '#chatpanel {\n'
	+ '  position:absolute; top:0px; left:15px; width:calc(100% - 30px);\n'
	+ '  max-height:65%; border-width:6px; padding:10px;\n'
	+ '}\n'
	+ 'body.glued #chatpanel, body.theatre-mode #chatpanel {left:0px; width:100%}\n'
	+ '#cpheader {margin-bottom:10px}\n'
	+ '#chatpanelcontrol {margin-left:10px}\n'
	+ '#emotespages {margin-top:10px}\n'
	+ '#emotes-container img {margin:5px; max-height:35px; cursor:pointer}\n'
	+ '#unicodeform table {font-family:Menlo,Monaco,Consolas,"Courier New",monospace}\n'
	+ '#unicodeform td {text-align:center; width:30px; height:30px; cursor:pointer; white-space:nowrap}\n'
	+ '#chatslider {margin-top:15px; margin-bottom:15px}\n'
	+ '#upalert {padding:10px; position:absolute; width:150px; max-width:150px; border-width:4px}\n'
	+ '#timeleftclock {float:right; margin:auto 5px}\n'
	+ '#plr-menu {min-width:215px}\n'
	+ '#plr-menu .glyphicon-refresh {margin-right:5px}\n'
	+ '#contributors-list th:nth-child(1), #contributors-list td:nth-child(1) {padding-right:15px}\n'
	+ '#contributors-list th:nth-child(3), #contributors-list td:nth-child(3) {\n'
	+ '  text-align:right; padding-left:50px\n'
	+ '}\n'
	+ '#db-well {margin-top:10px}\n'
	+ '#db-well > button {display:block; width:40%; margin:0 auto}\n'
	+ '#addoptswrap {margin-bottom:5px}\n'
	+ '#utc {padding-top:5px}\n'
	+ '#channel-list {max-height:400px; margin-top:5px; overflow:auto}\n'
	+ '#favscontrol, #addtofav-btn {margin-bottom:5px}\n'
	+ '#queue-fav {padding-left:0px; padding-right:0px; margin-bottom:10px}\n'
	+ '#queue-fav button.pull-left, #db-well button.pull-left {margin-right:4px}\n'
	+ '#previewFrame {margin:0 auto; display:block}\n'
	+ '#freeslots-meta {\n'
	+ '  font-size:100%; text-align:right; border-bottom-left-radius:4px; border-bottom-right-radius:4px;\n'
	+ '}\n'
	+ '#freeslots {float:left}\n'
	+ '#fixfavs-btn {margin-left:10px}\n'
	+ '#chatopts-menu .btn {margin-right:0px}\n'
	+ '#chatopts-menu .glyphicon-refresh, #plr-menu .glyphicon-volume-up {margin-right:5px}\n'
	+ '#plfiltercontrol button {border-radius:0}\n'
	+ '#tqueue {position:absolute; top:0; background-color:#000; z-index:1002}\n'
	+ '#tqueue.tmode {left:0}\n'
	+ '#tqueue.tmode2 {right:0}\n'
	+ '#queue img {margin-top:5px; margin-right:5px}\n'
	+ '#plmeta .label {margin-left:2px}\n'
	+ '#scroll-to-chat {margin-right:15px}\n'
	+ 'body.jukebox-mode #scroll-to-chat, body.jukebox-mode #expand-playlist {display:none}\n'
	+ 'body.jukebox-mode #hide-playlist {margin-right:15px}\n'
	+ '#oekaki-well, #notepad-well, #avatarspanel, #customhtmlwrap {margin-top:10px; margin-bottom:10px}\n'
	+ '#spoekaki {margin:0 auto; max-width:400px}\n'
	+ '#spoekaki canvas {height:235px}\n'
	+ '#spoekaki .drawing-board-control-navigation button {color:#000}\n'
	+ '#oeup-btn {font-size:10pt; color:#000}\n'
	+ '#avatarspanel {padding-bottom:9px; text-align:center}\n'
	+ '#avatarspanel div {margin-bottom:9px}\n'
	+ '#avatarspanel img {margin:0 5px 10px; border-radius:10px; max-width:50px; max-height:50px}\n'
	+ '#playlistmanagerwrap {margin-top:0px}\n'
	+ '#uploadwell {display:none !important}\n'
	+ '#spc {width:10px; height:10px; display:none}\n'
	+ '#close-btn, #switch-btn, #css-btn \n'
	+ '  {position:fixed; top:0px; z-index:1001; border:solid 4px #FFF; border-radius:8px; opacity:0.6}\n'
	+ '#close-btn:hover, #switch-btn:hover, #css-btn:hover {opacity:1}\n'
	+ '#close-btn.tmode {right:0px}\n'
	+ '#close-btn.tmode2 {left:0px}\n'
	+ 'body.bright #close-btn, body.bright #switch-btn, body.bright #css-btn {border:solid 4px #333}\n'
	+ '#switch-btn.tmode {right:50px}\n'
	+ '#switch-btn.tmode2 {left:50px}\n'
	+ '#css-btn {right:100px}\n'
	+ 'body.modern.radio-mode #videowrap-header {height:auto}\n'
	+ '#radioheader {\n'
	+ '  font-family:Menlo,Monaco,Consolas,\'Courier New\',monospace; font-size:150%; margin-bottom:15px;\n'
	+ '}\n'
	+ '#radioslider {margin-top:5px; margin-bottom:5px}\n'
	+ '#radioslider a, #chatslider a {background:none; background-color:#F00; cursor:pointer}\n';
$("link[href='/css/video-js.css']").after('<style id="premiumcss" type="text/css">' + css + '</style>');


// Set theme

if (USERTHEME.indexOf('/css/themes') < 0) {
	$("#usertheme").attr('href', '/css/themes/slate.css');
	$('<link id="usertheme2" rel="stylesheet" type="text/css" href="' + USERTHEME + '" />').appendTo("head");
} else {
	$("#usertheme").attr("id", "usertheme_old");
	$('<link id="usertheme" rel="stylesheet" type="text/css" />').insertAfter("#usertheme_old")
	  .attr({'href':USERTHEME, 'onload':'$("#usertheme_old").remove()'});
}


// Base64 encoded Synchtube logo

var synchlogo = 'url("data:image/png;base64,'
	      + 'iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAA'
	      + 'dTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAKGklEQVRYw7WYbWwcxR3GfzO7ey+5O8532MQ2jgGTOG4icgWs'
	      + 'EKVIUBVCmzRBCRKq2oYIPoBE1dBUuEV8IBIfgKZ8oKgSwRVSiQhqq4Baq6HfqiKFNI1p4oTEThRSknNIndhn+3zvuzsz/eC74/yS'
	      + '0KrtSKPd2bud55nn/zL/HfHEE09w+fJl+7HHHutNpVKrbrzxRowx1JoQAmDOs/9VE0KQyWQ4ceLE8L59+z5ub2/3BWANDAz86M47'
	      + '7+yLRqPNlmWZGgEpJUopPM8jFAphjPmvidUWWGtKKZHP5yeOHz/+8y1btrxm7d+//55169b9IpFItEoppRBCCiGklFKm02m5e/du'
	      + '2d/fL33fl6tXr5ZCCAn8210IId955x155MgReffdd8tGjBpOOByONjU13dHb23tIplKpr0QikRatdV2BWn/zzTf58MMPCYVCvPzy'
	      + 'y5w/fx7btusrbexSSoQQdQUbx0ePHuXQoUP1/87H0VoTiURaUqnUV+xkMimklAtMobUmnU5z11138fTTT/PCCy+QzWYZGhqis7OT'
	      + 'iYkJpJT4vo8xhpmZGZYuXcqyZcuYmJjg1KlTtLa2snLlSoQQKKU4fvw4iUSCW2+9dQGelJJkMinsGsv5trUsi1Qqxf79+4lEIrz7'
	      + '7rtks1l27NhBX18f7733Ht3d3aTTaY4dO0axWOTee+/lpZde4rnnnuOjjz7ihhtuYO/evTiOwyeffMKTTz5Jd3c3b731FsFgcA5e'
	      + 'jYesMZ0vozGGrVu3YlkWb7zxBkuWLCGZTBIKhRgZGWF0dJT29nZKpRI9PT1s2LCBS5cucfHiRQYHB3n22WexLIujR49ijGHFihVs'
	      + '3ryZS5cuUS6XF2DWA2kxIsYYlFJ0dXWxc+dOBgYGGBgYIBqN0tHRwcmTJ8nn83Xpk8kkyWQSAN/30Vpz22238fzzz7N+/XqUUsTj'
	      + 'cZqbm7kWXl2h6+UYz/PYunUrGzZsYO/evWSzWZYvX86xY8dQStHe3k5jMDTKb9s2jzzyCKlUalEl5rd6MFyLqeu67NmzhwMHDvD4'
	      + '44+TTqcZHh5mxYoVjI6OEo1GSSaTi04uhMDzPPr7+zl8+DBSygVErqnQtXwIYGhoiIMHDzI+Po7neeRyOTo7OwkGg3R0dLBkyZIF'
	      + 'q7RtGykl6XSa/v5+hoaG6oSuR+ZLfchxHB5++GFOnDjBrl276OrqYtWqVbS0tJBIJLjlllsIBAIEg0ECgUD9vr29nd7eXvbs2YPn'
	      + 'eaxduxbHcQgEAti2TSgUuq5C9nz7N+ahbdu2cfvtt3P16lXWrFnDsmXL+PzzzwmHw3R1dWFZFn19fdi2jeM4bNy4kUQiwSuvvMLJ'
	      + 'kydpa2ujp6eHeDyO53lEIhHuuecewuHwon5njMGuDebnIWMMlmXR29uL4zgAZLNZXn/9dfL5PD09PRhj6O7uXrCQ5uZmHnjggXoW'
	      + '7urqQimFMYa2trZ6ICzm1PZ8O87zTrTWuJ6HkJJiqcTU9DQ/fOYZ7lizBtf3F41OjAGtG1nOzm8MunpdLMrmmGwBY6A8NUVlZgbt'
	      + 'umjPQ3seP/3e95DA1aNHZyc2BlMFl1KCEBghQEosx0HYNtJxEI6DFQwSiMUIxeOI/4SQ77qM/eUvuIODOIUCQmvEbATUEhcSvpi0'
	      + '9q4QmOpzAygh0LNM0UKgpcSPRAisXUvrffdhV13h+oSE4MqhQ5gPPiDZCNpgRuaFcY2U0RpRVWlOazRtscjMH//IVcui7etfry/m'
	      + 'moS8UonS3/5G3HXxmpqgqWnu5OUyTEzM9QNjIBSCm26CTAZKpYWkGlpIKWYGB3HXrcOpbrKLExICL5/HTE7iVSq0rF9P2/btGKVm'
	      + 'xbEs8qdOceFnP8NUKnVQoxSxnh46d+0i/ctfkhscRFjWNQlhDGZiAi+fxw4GZ8eNhGoMhRC4+Twqn8fzfaaPH8evVGh58EFC7e1c'
	      + 'PnCA4j/+QSmbBa0RloX2fTCGJcZghcMopSgXCgjHQVZJaaUwSiGkRFgWAvBzObx8nnBDDb9oYvQKBdxiEen7lIeHmRweZklPD3Yi'
	      + 'weWDB3Gnpmj51rfwMhlyp07R/NBD5E+fxnXd2bCORIh94xu4k5PkT54EY4isWkU8laJ0+TLTR45gymU8Y2atwdysXU+MNSlVqYRf'
	      + 'LuNqPRsxDdWkpzXKsujYsoWZM2fIffoptzz6KOnf/pbc2bMgJW2bNhFubUW7Ln9/5hlCra2s3r0bXSrhNDVx8Xe/48Kvf42nFH6p'
	      + 'tGA/W7CX+eUynuviel69a2MwzJYjnufVM7BXNZdSCr96n/797zm/bx+BpiasRIJEby/GdRn88Y8Z/+tfafna1zDBIF6lgl8uX38v'
	      + 'E9UclB8fx65mVyElXrmM0ZpCJoM3M4P2fbxSiXwmg9GaSj5PcXoaozXTn36KFQ5jtKacy2EsC4Qg0NY261eOQ3F6msLUFL7rzomw'
	      + 'OYRqXwPK95lMp7Fct24yt1DAKMX06CiV6WmU61LJ55keHUUrRXFykpl//hOjNbmrV7Grm+fM2BjlbJbw0qXc0deHsCyy584xeeEC'
	      + 'hWyWzuoHwrXD3hhkMIgnJV4tDwK6mnldoFIdq+oYwK/eG8CrXqndWxbZzz7jg+9+F+N5YAy5bBZlWchg8MsLNCsUwnMcKlXwyjxC'
	      + 'NWBlDJ6UICV+FZzq7141P3nG4Pk+ynW5cv48t27ZwroXX8REo3i2PWva+QXaHBtqjROLocLhOhm3SqgGVtEapRQ3rlxJ7w9+QDiZ'
	      + 'xDcGD5C2zfKHHmL5N7+JAQqFAlfPnSPS2krvU0+xYutW7KYmiq6LCodxolHMvJpczmfoxGKIWGyOQsVcjkImQ1lrcsUil44dI9rZ'
	      + 'iYnFmLxwgXKpRNl1yY2NEers5Ob77+fi4cNcuXCBoQMHOPfnP/PVnTvRlsWHr77KTKGAiMdxYrEv96FANEqwvZ3y+fOz8mnNn158'
	      + 'kUAkwuTYGL7v84ef/IRwPE7uyhWali2jMDGBXyrxq02bmBkbIxSP4xWL5MfHAXh3xw7iHR2Us1lmxsYwQOjmmwlUFZpD6IvtpVqx'
	      + 'hUIs37SJi4ODVMplBFAaHa07OEAlk2Eyk0EAM2fO1J9nR0ZmS4+pqTlVQiWfJ3vmTH3sVDHsUKhOqNbsqakpEwwG64cIRmu6N2/G'
	      + 'LZUY+s1vyI+Po31/tis11+bXOpppPIiQEmnbWJaFdBxiN93EV7/zHbq//e05ZJRSTE1NGXtkZGQkFouNx+PxtrpjBQKkvv99ujdu'
	      + 'pDQ5iV+poCoVlOuiqlGjff8LctWJF5AIBrGqVzsQwA6FCCeThBKJ+h5We69QKIyPjIyMCMB6++23f7R69eq+SCTSLISoL1tUj1Qa'
	      + 'Vz5HiMX1YYFujV8X8wp8Y4woFAoTp0+f/vmOHTteE9u3b+fKlSv2tm3beleuXLkqHo//X47vFresIJvNcvbs2eH333//46VLl/r/'
	      + 'AheLFour7JxgAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTEwLTI1VDE5OjQ4OjU3KzAyOjAwSng3kQAAACV0RVh0ZGF0ZTptb2Rp'
	      + 'ZnkAMjAxNy0xMC0yNVQxOTo0ODo1NyswMjowMDsljy0AAAAASUVORK5CYII=")';


// Add UI CSS for events, it cannot be overrided by channel CSS

var chatlineHT = $chatline.outerHeight();
var chatbtnHT = (USEROPTS.chatbtn) ? $("#chatbtn").outerHeight() : 0;
if (PlayerCoveringURL == "") PlayerCoveringURL = DROPBOX + '3qp3v6ychbswqvm/stop.png';

var css = '.autoscroll {overflow-y:auto !important}\n'
	+ '.expanded {max-height:100000px !important}\n'
	+ '.hidden {display:none !important}\n'
	+ '.modal.nobackdrop, .modal-open.nobackdrop {padding-right:0px !important}\n'
	+ '.modal-open.nobackdrop {overflow-x:hidden !important; overflow-y:auto !important}\n'
	+ '.modal-backdrop.nobackdrop {background:none !important}\n'
	+ '.mX {\n'
	+ '  -webkit-transform:scaleX(-1) !important; -moz-transform:scaleX(-1) !important;\n'
	+ '  transform:scaleX(-1) !important; -ms-transform:scaleX(-1) !important;\n'
	+ '  -o-transform:scaleX(-1) !important;\n'
	+ '}\n'
	+ '.mY {\n'
	+ '  -webkit-transform:scaleY(-1) !important; -moz-transform:scaleY(-1) !important;\n'
	+ '  transform:scaleY(-1) !important; -ms-transform:scaleY(-1) !important;\n'
	+ '  -o-transform:scaleY(-1) !important;\n'
	+ '}\n'
	+ '.noscroll {overflow:hidden !important}\n'
	+ '.numbered {\n'
	+   'list-style:decimal !important; padding-left:45px !important;\n'
	+   'border-style:solid solid none !important; border-width:1px !important;\n'
	+ '}\n'
	+ 'body.bright .numbered {border-color:#AAA !important}\n'
	+ '.opt:not(.activated) .glyphicon-ok {display:none !important}\n'
	+ '.related {position:related !important}\n'
	+ 'body.glued #motdrow > div, body.glued #announcements > div, body.glued #drinkbar, body.glued #titlewrap \n'
	+ '  {padding-left:0px !important; padding-right:0px !important}\n'
	+ 'body.glued #chatwrap, body.glued #videowrap, body.glued #leftcontrols, body.glued #rightcontrols \n'
	+ '  {padding-left:0px !important; padding-right:0px !important}\n'
	+ 'body.glued #leftpane-inner > div, body.glued #rightpane-inner > div \n'
	+ '  {padding-left:0px !important; padding-right:0px !important}\n'
	+ 'body.singlecolumn #titlerow {display:none !important}\n'
	+ 'nav.transparent {opacity:0.3 !important}\n'
	+ 'nav.transparent:hover {opacity:1 !important}\n'
	+ '#mainpage.plmode {padding-top:15px !important}\n'
	+ '#mainpage.snav {padding-top:0px !important}\n'
	+ '#userlist.bigp .profile-box {\n'
	+ '  max-width:320px !important; max-height:450px !important; border-radius:10px !important;\n'
	+ '  border-width:4px !important; padding:10px !important; text-align:center !important;\n'
	+ '}\n'
	+ '#userlist.bigp .profile-image {\n'
	+ '  max-width:160px !important; max-height:160px !important; display:block !important;\n'
	+ '  box-shadow:0px 0px 8px #FFF !important; margin-left:auto !important; margin-right:auto !important;\n'
	+ '  margin-bottom:6px !important;\n'
	+ '}\n'
	+ '#userlist.bigp .profile-box strong {\n'
	+ '  display:block !important; margin-left:auto !important; margin-right:auto !important;\n'
	+ '  font-size:160% !important; padding-bottom:2px !important; border-bottom:dotted 1px #FFF !important;\n'
	+ '}\n'
	+ '#userlist.bigp .profile-box p {text-align:left !important}\n'
	+ '#userlist.matrix {font-family:Menlo,Monaco,Consolas,"Courier New",monospace !important}\n'
	+ '#userlist.whitebg, #messagebuffer.whitebg, #chatline.whitebg, .pm-buffer.whitebg, .pm-input.whitebg \n'
	+ '  {background-color:#FFF !important; background-image:none !important; color:#000 !important}\n'
	+ '#userlist.idleafk .userlist_afk {display:none !important}\n'
	+ '#chatwrap.noindicator #newmessages-indicator {display:none !important}\n'
	+ '#messagebuffer.matrix, #messagebuffer.matrix .action, #chatline.matrix \n'
	+ '  {font-family:Menlo,Monaco,Consolas,"Courier New",monospace !important; color:#32CD32 !important}\n'
	+ '#messagebuffer.matrix .server-whisper {color:limegreen !important}\n'
	+ '#messagebuffer.whitebg a, .pm-buffer.whitebg a {color:#337ab7 !important}\n'
	+ '#messagebuffer.whitebg .nick-hover, #messagebuffer.whitebg .nick-highlight \n'
	+ '  {background-color:#E9E9E9 !important; background-image:none !important; color:#000 !important}\n'
	+ '#messagebuffer.matrix.whitebg, #messagebuffer.matrix.whitebg .action, #chatline.whitebg.matrix \n'
	+ '  {color:#32CD32 !important; background-image:none !important}\n'
	+ '#messagebuffer.matrix.whitebg .nick-hover, #messagebuffer.matrix.whitebg .nick-highlight \n'
	+ '  {color:#32CD32 !important; background-image:none !important}\n'
	+ '#messagebuffer.lines div[class*="chat-msg"]:not(.drink) \n'
	+ '  {border-bottom:dotted 2px #666 !important; padding-top:4px !important; padding-bottom:4px !important}\n'
	+ '#messagebuffer.bubbles div[class*="chat-msg"]:not(.drink) {\n'
	+ '  margin:5px !important; padding:5px !important; border:solid 2px #AAA !important;\n'
	+ '  border-radius:15px !important;\n'
	+ '}\n'
	+ '#messagebuffer.bubbles .timestamp {display:block !important; float:right !important}\n'
	+ '#messagebuffer.noavatars strong.username {color:inherit !important}\n'
	+ '#messagebuffer.noavatars span[class^="userlist"] {color:inherit !important}\n'
	+ '#messagebuffer.noavatars strong.username:before {all:inherit !important}\n'
	+ '#messagebuffer.ignoreserver .serverinfo {display:none !important}\n'
	+ '#messagebuffer.nocolors .chatcolor {all:inherit !important}\n'
	+ '#messagebuffer.noeffects .txteffect, #messagebuffer.noeffects strong:not(.username)\n'
	+ '  {all:inherit !important}\n'
	+ '#messagebuffer.noeffects em, #messagebuffer.noeffects s {all:inherit !important}\n'
	+ '#messagebuffer.noemotes img:not(.embedimg):not(.oekakiimg) {display:none !important}\n'
	+ '#messagebuffer.notstamps .timestamp {display:none !important}\n'
	+ '#emote-view {\n'
	+ '  position:absolute !important; margin-top:2px !important; padding:2px !important;\n'
	+ '  min-width:20px !important; background-color:#000 !important; border:solid 2px #FFF !important;\n'
	+ '  border-radius:4px !important; z-index:1000 !important;\n'
	+ '}\n'
	+ 'body.bright #emote-view {background-color:#FFF !important; border:solid 2px #000 !important}\n'
	+ '#emote-view.no-preview {display:none !important}\n'
	+ 'body.theatre-mode #emote-view.b-left {display:none !important}\n'
	+ '#emote-view.b-right {right:15px !important}\n'
	+ '#emote-view.t-left {bottom:' + (chatlineHT + 3) + 'px !important}\n'
	+ '#emote-view.t-right {bottom:' + (chatlineHT + 3) + 'px !important; right:15px !important}\n'
	+ 'body.glued #emote-view.b-right {right:0px !important}\n'
	+ 'body.glued #emote-view.t-right, body.theatre-mode #emote-view.t-right {right:0px !important}\n'
	+ '#emote-view img {max-width:100px; max-height:100px}\n'
	+ '#hidden-plr {\n'
	+ '  height:100% !important; position:absolute !important; left:0px !important; top:0px !important;\n'
	+ '  background-color:#FFF !important; background-repeat:no-repeat !important;\n'
	+ '  background-position:center center !important; z-index:501 !important;\n'
	+ '}\n'
	+ '#plr-bright {\n'
	+ '  height:100% !important; position:absolute !important; left:0px !important; top:0px !important;\n'
	+ '  z-index:502 !important;\n'
	+ '}\n'
	+ '#mascot {\n'
	+ '  position:absolute !important; height:40% !important; cursor:pointer !important; z-index:503 !important\n'
	+ '}\n'
	+ '#mascot.b-left {left:10px !important; bottom:25px !important}\n'
	+ '#mascot.b-center {bottom:25px !important; left:0 !important; right:0 !important; margin:auto !important}\n'
	+ '#mascot.b-right {right:10px !important; bottom:25px !important}\n'
	+ '#mascot.t-left {left:10px !important; top:25px !important}\n'
	+ '#mascot.t-right {right:10px !important; top:25px !important}\n'
	+ '#mascot.c-center {\n'
	+ '  left:0 !important; right:0 !important; top:0 !important; bottom:0 !important; margin:auto !important\n'
	+ '}\n'
	+ '#queue.nobuttons .btn-group {display:none !important}\n'
	+ '#chatwrap.tmode, #chatwrap.tmode2 {\n'
	+ '  position:fixed !important; width:370px !important; height:100% !important;\n'
	+ '  top:0px !important; padding:0px !important; z-index:1000 !important;\n'
	+ '}\n'
	+ '#chatwrap.tmode, #videowrap.tmode2 {left:0px !important}\n'
	+ '#chatwrap.tmode2, #videowrap.tmode {right:0px !important}\n'
	+ '#messagebuffer.tmode {\n'
	+ '  height:calc(100% - ' + ($chatheader.outerHeight() + chatlineHT + chatbtnHT) + 'px) !important;\n'
	+ '}\n'
	+ '#videowrap.tmode,  #videowrap.tmode2 {\n'
	+ '  position:fixed !important; width:calc(100% - 370px) !important; height:100% !important;\n'
	+ '  top:0px !important; padding:0px !important; z-index:1000 !important;}\n'
	+ '#videowrap.tmode .embed-responsive, #videowrap.tmode2 .embed-responsive {\n'
	+   'width:100% !important; height:100% !important; top:0px !important;\n'
	+ '}\n'
	+ '@media (max-width:750px) {\n'
	+ '  #chatwrap.tmode, #chatwrap.tmode2 {width:270px !important}\n'
	+ '  #videowrap.tmode, #videowrap.tmode2 {width:calc(100% - 270px) !important}\n'
	+ '}\n'
	+ '#pollwrap.tmode div.active:not(.dismissed), #pollwrap.tmode2 div.active:not(.dismissed) {\n'
	+ '  position:fixed !important; top:10px !important; z-index:10000 !important; min-width:300px !important;\n'
	+ '}\n'
	+ '#pollwrap.tmode div.active:not(.dismissed) {left:400px !important}\n'
	+ '#pollwrap.tmode2 div.active:not(.dismissed) {left:50px !important}\n'
	+ '#pollwrap.tmode div.dismissed, #pollwrap.tmode div.muted {display:none !important}\n'
	+ '#pollwrap.tmode2 div.dismissed, #pollwrap.tmode2 div.muted {display:none !important}\n';

var _bg = $(".navbar-brand").css('background-image');
if (_bg != "none") synchlogo = _bg;
if (MiniLogoURL != "") synchlogo = 'url("' + MiniLogoURL + '")';
var _pd = $(".navbar-brand").css('padding-left');
var _pl = (_pd == "none" || _pd == "15px") ? 61 : _pd.replace('px', '');

css += '.navbar-brand {background-image:none !important; font-size:0pt !important; padding-left:15px !important}\n'
    +  '.navbar-brand.logo {\n'
    +  '  background-image:' + synchlogo + ' !important; background-repeat:no-repeat !important;\n'
    +  '  background-position:15px center !important; background-size:auto 36px !important;\n'
    +  '  padding-left:' + _pl + 'px !important;\n'
    +  '}\n';
var _name = (ChannelName == "") ? '/' + CHANNELPATH + '/' + window.location.href.split('/').pop() : ChannelName;
css += '.navbar-brand:before {content:"' + _name + '" !important; font-size:14pt !important}\n';

$("head").append('<style id="hardcss" type="text/css">' + css + '</style>');


// Dynamically set channel name padding, according to custom mini logo proportions

if (_bg != "none" || MiniLogoURL != "") {
	var _img = document.createElement('img');
	_img.src = synchlogo.slice(4, -1).replace(/"/g, "").replace(/'/g, "");
	_img.addEventListener('load', function() {
		var _pl = Math.round(this.naturalWidth / this.naturalHeight * 36 + 25);
		$("#hardcss").html($("#hardcss").html() + '.navbar-brand.logo {padding-left:' + _pl + 'px !important}');
	});
}


// Set optional User CSS

if (EXECCSS && USERCSS != "") {
	$("#layout-2").addClass('activated');
	$("head").append('<style id="usercss" type="text/css">' + USERCSS + '</style>');
}
if (IGNORECSS || IGNORETHISCSS.split(",").indexOf(CHANNEL.name) > -1) processChannelCSS(false);
setAdditionalCSS();


// Set additional classes and execute necessary functions

if (['/css/themes/light.css', '/css/themes/bootstrap-theme.min.css'].indexOf(USERTHEME) > -1) $body.addClass('bright')
else if (USERTHEME == '/css/themes/modern.css') $body.addClass('modern');
if (_SYNCH) $body.removeClass('synchtube');
setTimeout(function() {
	handleVideoResize();
	if ($expandChat.hasClass('label-success')) chatHeight("full");
}, 2000);


// Set final user layout

if (_SYNCH) {
	$userlist.css('float', '');
	$userlisttoggle.removeClass("glyphicon-chevron-left pull-right").addClass("glyphicon-chevron-right pull-left");
}
COMPACT ? compactLayout() : fluidLayout();
SINGLECOLUMN ? singleColumn() : twoColumns();
SYNCH ? synchLayout() : nonSynchLayout();
if (MOTDBOTTOM) bottomMOTD();
if (LARGECHAT) largeChat();
if (LARGEPLAYER) largePlayer();
if (THEATREMODE) theatreMode();
if (RADIOMODE) radioMode();
SCROLLNAVBAR ? navbarMode("scrollable") : navbarMode("static");
if (ULISTRIGHT) userlistSide("right");
processLayoutElements();


// Format old chat messages

$messagebuffer.find("div").each(function() {
	if ($(this).children().length > 0) {
		var message = $(this).children().last();
		if (message.html().indexOf('↳ ') > -1) {
			message.addClass('action scriptanswer');
			var tstamp = $(this).find(".timestamp");
			tstamp.addClass('action');
		}
		if (EXECFILTERS) {
			var arr = JSON.parse(CUSTOMFILTERS);
			for (i in arr) {
				var re = RegExp(arr[i]["before"].trim(), "g")
				message.html(message.html().replace(re, arr[i]["after"]));
			}
		}
		message.html(execTextEffects(message.html()));
		if (SHOWIMAGES) showImagesOnChat(message)
		else if (SHOWOEKAKI) showOekakiOnChat(message);
		if (SHOWVIDEOS) {
			showVideosOnChat(message);
			$(this).find("video").removeAttr('autoplay');
		}
		IGNOREEMOTES ? hideEmotes(message) : enhanceEmotes(message);
		if (CHATUSERNAME) {
			if ($(this).find(".username").length < 1) {
				var klass = $(this).attr('class');
				var uname = klass.substring(("chat-msg-").length, klass.length);
				var span = $('<span />');
				var ts = $(this).find(".timestamp");
				ts.length > 0 ? span.insertAfter(ts) : span.prependTo($(this));
				$('<strong class="username">').html(uname + ': ').appendTo(span);
			}
		}
	}
});
if (USERNAMEMARK != ":") {
	$messagebuffer.find(".username").each(function() {
		$(this).html($(this).html().slice(0, -2) + USERNAMEMARK + ' ');
	});
}


// Initialize sockets

socket.on("addUser", function(data) {
	if (PREMIUMNOTMODE == 2 || PREMIUMNOTMODE == 4) {
		if (JoinMessage == "") JoinMessage = 'joined';
		addChatNotification(data.name + ' ' + JoinMessage);
	}
	if (AVATARSLIST) refreshAvatarsList();
});
socket.on("changeMedia", function() {
	handleMediaChange();
	nowPlaying();
});
socket.on("channelCSSJS", function() {
	CHANCSS = $("#chancss").length > 0 ? $("#chancss").html() : '';
	CHANEXTERNALCSS = $("#chanexternalcss").length > 0 ? $("#chanexternalcss").attr('href') : '';
	if (IGNORECSS || IGNORETHISCSS.split(",").indexOf(CHANNEL.name) > -1) $("#chanexternalcss, #chancss").remove();
	if ($("#usertheme2").length > 0) $("head").append($("#usertheme2").detach());
	$("head").append($("#hardcss").detach());
	setAdditionalCSS();
});
socket.on("channelOpts", pageTitle);
socket.on("login", handleLogin);
socket.on("queue", function(data) {
	rebuildMiniatures();
	if (SHOWCONTRIBS) contributorsNames("show");
	if ((data.item.queueby == CLIENT.name) || (!data.item.queueby && CLIENT.name == "")) {
		var link = formatURL(data.item.media);
		ADDEDLINKS = getOrDefault('SP_addedlinks_' + CLIENT.name, '[]');
		var obj = JSON.parse(ADDEDLINKS);
		var len = obj.length;
		var i = 0;
		while (i > -1 && i < len) {
			if (obj[i]["link"] == link) {
				obj = deleteFromArray(obj, i);
				i = -1;
			} else i++;
		}
		obj.push({"link":link, "title":data.item.media.title});
		if (obj.length > 200) obj = obj.slice(-200);
		setOpt('SP_addedlinks_' + CLIENT.name, ADDEDLINKS = JSON.stringify(obj));
	}
});
socket.on("rank", handleRank);
socket.on("setLeader", function() {
	if (CLIENT.leader) {
		$("#chat-15").addClass('activated');
		addChatNotification('You are now a Leader - you can pause or scroll media.');
	} else {
		$("#chat-15").removeClass('activated');
		addChatNotification('You are not a Leader now.');
	}
});
socket.on("setMotd", alterMOTD);
socket.on("setPermissions", function() {
	if (!hasPermission("seeplaylist")) $plsbtnouter.hide()
	else $plsbtnouter.show();
	if (!hasPermission("seeplaylist")) $favsBtn.attr('disabled', 'disabled')
	else $favsBtn.removeAttr('disabled');
	if (!hasPermission("seeplaylist")) $("#jukebox-btn").attr('disabled', 'disabled')
	else $("#jukebox-btn").removeAttr('disabled');
	if (HIDEPLS) $queue.hide();
});
socket.on("setPlaylistLocked", function() {
	if (HIDEPLS) $queue.hide();
	if (HIDEPLSBTNS) setTimeout(function() {
		queueButtons("hide");
		scrollQueue();
	}, 1000);
});
socket.on("userLeave", function(data) {
	if (PREMIUMNOTMODE == 2 || PREMIUMNOTMODE == 4) {
		if (LeaveMessage == "") LeaveMessage = 'disconnected';
		addChatNotification(data.name + ' ' + LeaveMessage);
	}
	if (AVATARSLIST) refreshAvatarsList();
});


// Execute final functions

pageTitle();
alterMOTD();
volumeLvl();
handleRank();
scrollChat();
scrollQueue();
handleLogin();
handleMediaChange();
setTimeout(function() {nowPlaying()}, 1500);
setTimeout(function() {scrollChat()}, 2000);
if (CHATTOTOP) setTimeout(function() {scrollChatToTop()}, 500);


// Set intervals of live functions

setInterval(function() {volumeLvl()}, 2000);
setInterval(function() {onlineTime()}, 60000);


// Update number of user visits

setOpt('SP_visits', ++VISITS);


// Optional favicon

var defaultIcon = 'data:image/png;base64,'
		+ 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACl0lEQVR42n1Ta0iTYRR+vu+bn5emNOcVL0GiEYH/grzkpmaTmVoE'
		+ 'ElmTIAILg4KMhPpRZCUa6o+gIi21fkhkFzM1rRViBf1KKNKMkMJS5+al6eZ36Xybbs6G5+Xw/nnPc85z3udh4I5UyhrKbEoe64eT'
		+ '8jVlJeUnRilmOW5gp8EYmp6lh1ajgUqlAsMyUI4SsnJkGaIgwmK1YvCNGW97ns9JopipvOjWGQsNJysqkJuRhpDgIDCMu5BZbimv'
		+ '3ASysLiIV4Mf0NDQCHPX0x7ljePc1Tr+eFkpIqg7H6DyAKwNBUAQBExZbbhx7z4unz3tVF7KtTebULqvEJHhGnAcB2n8N5zdLyGN'
		+ 'jbkK2cRE8Pl5YGNjIEkSpm0zaOt4hlNHy1xTyvV3WlCyJx/REVrIP3/Bfv4iZBp1dTBBQQi5dAFsQjwsBNDe+QInTAfdAA3NrdhP'
		+ 'HWKjImE/UwVh8L1fCqr0HdhQe4UWacPDrl6UHz7gBmhsbsPe3TmIi4nGTOp2yA6HXwAmMBAbhz5ictqKR0Sx/NAqgOK8bMQTR1sK'
		+ 'SWLN+J4gGpqRIUxYptHR0+cFUCgU5+UggQD+HjmGpX6z3/qAXD3Ud29jYspCAP1eCvVNLSjalYNNcbGQRr5htrgEmJ/3rVarEfak'
		+ 'HVxKMsYnJvG4t9+7xLpbzSjI1SEpMcGlQuHrMBaqa7A08M7dOTMNwVWVUG1JgSCK+EE/1dln9nyjo+radd5I421N2oywUDU4lvVL'
		+ 'QSQNzM7N48vod3QRzeplIXXrjUWGUpMJ25KTEKUNRzAtywWyokjFB1Rsp+X+If6fh0fxoK3VI2WXmbIMBaEZOj0itFrwfABYhvUx'
		+ 'gyRLcDqXMGmx/GcmHzuTlNe1syiKPnb+B5QbD9annYREAAAAAElFTkSuQmCC';
$('<link id="chanfavicon" type="image/x-icon" rel="shortcut icon" />').appendTo("head")
  .attr('href', (FaviconURL != "") ? FaviconURL : defaultIcon);


// Optional welcome soundfile

if (WelcomeSoundFileURL != "" && PLAYWELCOME) {
	CHATW = new Audio(WelcomeSoundFileURL);
	if (!PLAYER) CHATW.volume = SOUNDSLVL * 0.1
	else {
		PLAYER.getVolume(function(vol) {
			CHATW.volume = SOUNDSLVL * 0.1 * vol;
		});
	}
	CHATW.play();
}


// Notification if API has been succesfully loaded

LOADED = true;
var time = Math.round(new Date().getTime() - START) / 1000;
var cust = (CHANNEL.opts.externaljs.indexOf(DROPBOX + "1dyazoq6t7wh808/Premium.js") < 0) ? ' [customized]' : '';
addChatNotification('Synchtube Premium v. ' + VERSION + '' + cust + ' activated (in ' + time + ' s.)');


// Admin notifications

if (CLIENT.rank > 2) {
	if (!TOOLSENABLED) {
		addChatNotification('You have now access to Premium Admin Tools.');
		var html = 'Open "Additional options" panel [<span class="glyphicon glyphicon-flash"></span> '
			 + 'button below player] and select "Tools".';
		addChatNotification(html);
		addChatNotification('Message above won\'t show again after entering "Tools".');
	}
	if (CHANNEL.opts.externaljs.indexOf(DROPBOX + "1dyazoq6t7wh808/Premium.js") < 0) {
		$.getScript(DROPBOX + "295oy7nkr9nv2re/check.js", function() {
			var arr = VERSION.split(".");
			var ver = arr[0] + "." + arr[1];
			if (typeof CURRENT_VERSION !== "undefined" && ver != CURRENT_VERSION) {
				var html = 'Version <b>' + CURRENT_VERSION + '</b> of Synchtube Premium '
					 + 'is now available. It is recommended to update your custom script.';
				addChatNotification(html);
			}
		});
	}
}


// Load emotes to cache on start (if enabled)

if (EMOTESCACHE) {
	var len = CHANNEL.emotes.length;
	if (len > 0) {
		var updateStatus = function(v) {
			v == "num" ? num++ : v == "err" ? err++ : '';
			document.title = num + ' / ' + len + ' [' + err + ' err.]';
			if (num + err != len) return;
			document.title = PAGETITLE;
			var html = 'Loading emotes to cache finished! ' + num + ' ' + 'emote' + ((num != 1) ? 's' : '')
				 + ' loaded, ' + err + ' error' + ((err != 1) ? 's' : '');
			addChatNotification(html);
		}
		addChatNotification('Loading emotes to cache started! Status is shown on the browser\'s tab');
		var num = 0;
		var err = 0;
		for (i in CHANNEL.emotes) {
			var _img = document.createElement('img');
			_img.src = CHANNEL.emotes[i].image;
			_img.onload = function() {
				updateStatus("num");
			}
			_img.onerror = function() {
				updateStatus("err");
			}
		}
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Append optional external script

if (ExternalScriptURL != "") $.getScript(ExternalScriptURL);

/* End of Synchtube Premium API */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
