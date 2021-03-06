app.factory('emoticons', function () {
	var files = [
		'3.gif',
		'allthethings.png',
		'argh.gif',
		'arya.png',
		'awthanks.png',
		'badass.png',
		'bahgawd.gif',
		'bang.gif',
		'buddy.gif',
		'burger.gif',
		'barrel.gif',
		'cacodemon.gif',
		'catdrugs.gif',
		'catstare.gif',
		'chef.gif',
		'chompy.gif',
		'clint.gif',
		'dance.gif',
		'dealwithit.gif',
		'devil.gif',
		'doge.png',
		'doomguy.gif',
		'downs.gif',
		'eel.png',
		'eng101.gif',
		'f5.gif',
		'facepalm.gif',
		'frog.gif',
		'frown.gif',
		'fwp.png',
		'fuuu.png',
		'gay.gif',
		'getin.gif',
		'golfclap.gif',
		'hattip.gif',
		'heysexy.gif',
		'hist101.gif',
		'hodor.png',
		'imp.gif',
		'indeed.png',
		'mad.gif',
		'mancubus.gif',
		'master.gif',
		'mindblown.gif',
		'munch.gif',
		'notbad.png',
		'ohdear.png',
		'okay.png',
		'orly.png',
		'parrot.gif',
		'pinky.gif',
		'psyduck.gif',
		'rageguy.png',
		'rant.gif',
		'romero.gif',
		'sadpanda.png',
		'sarge.gif',
		'sax.gif',
		'science.gif',
		'shrug.png',
		'sigh.gif',
		'siren.gif',
		'skull.gif',
		'smile.gif',
		'smith.gif',
		'smug.gif',
		'smugdog.gif',
		'soulsphere.gif',
		'stare.png',
		'successkid.png',
		'suspense.gif',
		'sweatdrop.gif',
		'tableflip.png',
		'tinfoil.gif',
		'toot.gif',
		'trollface.png',
		'waffenss.gif',
		'wat.png',
		'wink.gif',
		'woop.gif',
		'words.gif',
		'yaycloud.gif'];

	return {
		names: _.map(files, function (file) {
			return file.replace(/.\w+$/, '');
		}),
		files: files
	};
});

app.filter("emoticonName", function(){
	return function(input){
		return input.replace(/.\w+$/, '');
	};
});