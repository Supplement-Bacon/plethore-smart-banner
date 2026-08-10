/**
 * Pléthore Smart Banner — universal embed.
 *
 * Self-contained, vanilla, zero-dependency. Drop it on any site with:
 *   <script async src="https://smart-banner.pletho.re/embed.js" data-account="YOUR_SLUG"></script>
 *
 * Parity with the WordPress banner: mobile-only, 6-month dismiss memory,
 * locale from the browser, silent failure. Markup and styles are injected
 * by this file — it assumes nothing about the host page.
 */
(function () {
    "use strict";

    var LOCAL_STORAGE_KEY = "plethore-banner-closed-at";
    var DATA_BASE_URL = "https://smart-banner.pletho.re/";
    var MOBILE_MAX_WIDTH = 768;
    var SIX_MONTHS_MS = 6 * 30 * 24 * 60 * 60 * 1000; // approximate

    // Resolve the account slug SYNCHRONOUSLY, at load time: document.currentScript
    // is null once execution resumes after an await or for async-loaded scripts,
    // so read it now and fall back to the first tagged <script>.
    var currentScript = document.currentScript;
    var accountSlug =
        (currentScript && currentScript.dataset && currentScript.dataset.account) ||
        (function () {
            var el = document.querySelector("script[data-account]");
            return el ? el.getAttribute("data-account") : null;
        })();

    /**
     * @returns {"fr"|"en"} locale from the browser, default "en"
     */
    function getLocale() {
        var locale = (navigator.language || "en").substring(0, 2);
        return ["fr", "en"].indexOf(locale) !== -1 ? locale : "en";
    }

    /**
     * @returns {boolean} true if the banner was dismissed less than 6 months ago
     */
    function isDismissed() {
        var closedAt = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (closedAt && !isNaN(closedAt)) {
            return Number(closedAt) > Date.now() - SIX_MONTHS_MS;
        }
        return false;
    }

    /**
     * Inject the namespaced stylesheet once.
     */
    function injectStyles() {
        if (document.getElementById("plethore-banner-styles")) {
            return;
        }
        var style = document.createElement("style");
        style.id = "plethore-banner-styles";
        style.textContent = [
            ".plethore-banner{position:fixed!important;width:100%!important;top:0!important;left:0!important;z-index:2147483647!important;color:#fff!important;opacity:0;animation:plethoreBannerSlideDown .5s ease-out 1s forwards;box-sizing:border-box!important}",
            ".plethore-banner *{box-sizing:border-box!important}",
            ".plethore-banner-content-wrapper{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif!important;background:#fff!important;padding:8px!important;margin:15px!important;border-radius:10px!important;box-shadow:0 4px 8px rgba(0,0,0,.1)!important}",
            ".plethore-banner-title,.plethore-banner-subtitle{margin:0!important;padding:0!important;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif!important;text-align:left!important;color:#000!important}",
            ".plethore-banner-title{font-size:15px!important}",
            ".plethore-banner-subtitle{font-size:12px!important}",
            ".plethore-banner-close{border:none!important;color:#000!important;font-size:20px!important;line-height:1!important;cursor:pointer!important;background:none!important;margin:0!important;padding:0!important}",
            ".plethore-banner-space-h{display:flex!important;flex-direction:row!important}",
            ".plethore-banner-space-v{display:flex!important;flex-direction:column!important}",
            ".plethore-gap-10{gap:8px!important}",
            ".plethore-gap-5{gap:3px!important}",
            ".plethore-banner-app-icon{width:45px!important;height:45px!important;border-radius:10px!important;flex-shrink:0!important}",
            ".plethore-space-between{justify-content:space-between!important}",
            ".plethore-align-items-center{align-items:center!important}",
            ".plethore-banner-button{background-color:#000!important;color:#fff!important;font-weight:500!important;padding:3px 10px!important;border:none!important;border-radius:15px!important;font-size:14px!important;cursor:pointer!important;text-align:center!important;text-decoration:none!important;display:inline-block!important;white-space:nowrap!important;transition:all .3s ease!important}",
            ".plethore-banner-button:hover{transform:scale(1.05)}",
            ".plethore-w-full{width:100%!important}",
            ".plethore-align-right{text-align:right!important}",
            "@keyframes plethoreBannerSlideDown{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}"
        ].join("");
        document.head.appendChild(style);
    }

    /**
     * Build the banner DOM for the localized payload.
     * @param {{iconUrl:string,title:string,subtitle:string,buttonLabel:string,buttonUrl:string}} d
     * @returns {HTMLElement}
     */
    function buildBanner(d) {
        var root = document.createElement("div");
        root.id = "plethore-banner";
        root.className = "plethore-banner";

        var wrapper = document.createElement("div");
        wrapper.className = "plethore-banner-content-wrapper";

        var row = document.createElement("div");
        row.className =
            "plethore-banner-space-h plethore-space-between plethore-align-items-center plethore-w-full";

        // Left: icon + text
        var left = document.createElement("div");
        left.className = "plethore-banner-space-h plethore-align-items-center plethore-gap-10";

        var icon = document.createElement("img");
        icon.className = "plethore-banner-app-icon";
        icon.src = d.iconUrl;
        icon.alt = "";

        var text = document.createElement("div");
        text.className = "plethore-banner-space-v plethore-gap-5";

        var title = document.createElement("h2");
        title.className = "plethore-banner-title";
        title.textContent = d.title;

        var subtitle = document.createElement("h4");
        subtitle.className = "plethore-banner-subtitle";
        subtitle.textContent = d.subtitle;

        text.appendChild(title);
        text.appendChild(subtitle);
        left.appendChild(icon);
        left.appendChild(text);

        // Right: CTA + close
        var right = document.createElement("div");
        right.className =
            "plethore-banner-space-h plethore-align-items-center plethore-gap-5 plethore-align-right";

        var cta = document.createElement("a");
        cta.className = "plethore-banner-button";
        cta.href = d.buttonUrl;
        cta.target = "_blank";
        cta.rel = "noopener";
        cta.textContent = d.buttonLabel;

        var close = document.createElement("button");
        close.id = "plethore-banner-close";
        close.className = "plethore-banner-close";
        close.type = "button";
        close.setAttribute("aria-label", "Close");
        close.innerHTML = "&times;";
        close.addEventListener("click", function () {
            localStorage.setItem(LOCAL_STORAGE_KEY, Date.now());
            root.style.display = "none";
        });

        right.appendChild(cta);
        right.appendChild(close);

        row.appendChild(left);
        row.appendChild(right);
        wrapper.appendChild(row);
        root.appendChild(wrapper);
        return root;
    }

    async function run() {
        if (!accountSlug) {
            return;
        }
        if (window.innerWidth > MOBILE_MAX_WIDTH) {
            return;
        }
        if (isDismissed()) {
            return;
        }

        var response = await fetch(DATA_BASE_URL + accountSlug + ".json");
        var data = await response.json();
        var localized = data[getLocale()];
        if (!localized) {
            return;
        }

        injectStyles();
        document.body.prepend(buildBanner(localized));
    }

    function start() {
        // Fail silently on any error, matching the WordPress banner.
        run().catch(function (error) {
            console.error("Plethore Smart Banner error:", error);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start);
    } else {
        start();
    }
})();
