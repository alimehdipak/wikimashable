//<script>
bouncex.tryCatch(function reloadCampaigns(){
	var newCampaigns = false;
	bouncex.creatives = false;
	bouncex.brandStyles = false;
	bouncex.webfonts = false;

	if (bouncex.gbi) {
		bouncex.gbi.stacks = false;
	}

	var newCookie = {"did":"2280186432781013328","vid":1700903878722911,"v":{"ever_logged_in":false,"submitted_top_stories":false,"submitted_deals":false,"submitted_screening":false,"submitted_furtastic":false,"submitted_afterdark":false,"submitted_lightspeed":false,"ref_persist":""},"dgFirstLoad":true,"fvt":1700903878,"ao":0,"lp":"https%3A%2F%2Fmashable.com%2F","as":0,"vpv":1,"d":"d","r":"","cvt":1700903878,"sid":1,"gcr":85,"m":0,"lvt":1700903878};
	var campaignAdded = false;
	for (var campaignId in newCampaigns) {
		if (newCampaigns.hasOwnProperty(campaignId)) {
			// if campaign cookie does not exist
			if (!bouncex.cookie.campaigns) {
				bouncex.cookie.campaigns = {};
			} else {
				bouncex.cookie.campaigns = Object.assign({}, bouncex.cookie.campaigns);
			}

			if (!bouncex.cookie.campaigns[campaignId]) {
				campaignAdded = true;
				bouncex.cookie.campaigns[campaignId] = {lvt:bouncex.cookie.lvt, vv:0};
			} else if (newCookie.campaigns[campaignId]) {
				// need to set campaign cookie's activations_sessions to the new cookie as it gets modified in reloadCampaigns
				campaignAdded = true;
				bouncex.cookie.campaigns[campaignId].as = newCookie.campaigns[campaignId].as;
			}
		}
	}
	if (campaignAdded) {
		bouncex.setBounceCookie();
	}

	for (var campaignId in bouncex.campaigns) {
		if (bouncex.campaigns.hasOwnProperty(campaignId)) { //copy state vars
			if (newCampaigns[campaignId]) {
				newCampaigns[campaignId].ap = bouncex.campaigns[campaignId].ap;
				newCampaigns[campaignId].repressed = Boolean(bouncex.campaigns[campaignId].repressed);
			}

			if (newCampaigns[campaignId] &&
				bouncex.campaigns[campaignId].ad_visible &&
				newCampaigns[campaignId].html.replace(/fsa=(\d+)&|width=(\d+)&|height=(\d+)&/gi,'') == bouncex.campaigns[campaignId].html.replace(/fsa=(\d+)&|width=(\d+)&|height=(\d+)&/gi,'')) {
								newCampaigns[campaignId] = bouncex.campaigns[campaignId];
			} else if (newCampaigns[campaignId] && bouncex.isGbi2Campaign(campaignId) && bouncex.campaigns[campaignId].gbi.hasBegunAuction) {
								newCampaigns[campaignId] = bouncex.campaigns[campaignId];
			} else {
				bouncex.destroy_ad(campaignId);
			}
		}
	}

	bouncex.campaigns = newCampaigns;
	newCampaigns = {};

	bouncex.debug = false;
		bouncex.setBounceCookie();
	if (bouncex.campaigns) {
		for (var campaignId in bouncex.campaigns) {
			if (bouncex.campaigns[campaignId].ad_visible && typeof bouncex.repressCampaigns === 'function') {
				bouncex.repressCampaigns(campaignId);
			}
		}
		bouncex.loadBounceCss(bouncex.initActivationFuncs);
	}
		bouncex.loadBrandStyles();
	bouncex.loadWebfonts();

	})();
