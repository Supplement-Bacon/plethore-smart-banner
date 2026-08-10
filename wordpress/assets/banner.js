document.addEventListener("DOMContentLoaded", async function () {
    try {
        const localStorageKey = "plethore-banner-closed-at";

        // Check if the user is on a mobile device
        if (window.innerWidth > 768) {
            return;
        }

        // Check if banner has been closed before
        const closedAt = localStorage.getItem(localStorageKey);
        if (closedAt && !isNaN(closedAt)) {
            const closedTimestamp = Number(closedAt);
            const sixMonthsAgo = Date.now() - 6 * 30 * 24 * 60 * 60 * 1000; // approximate date 6 months ago
            if (closedTimestamp > sixMonthsAgo) {
                // Hide the banner if it has been closed less than 6 months ago
                return;
            }
        }

        const templateResponse = await fetch(PlethoreBannerData.templateUrl);
        const html = await templateResponse.text();

        const dataResponse = await fetch(PlethoreBannerData.dataUrl);
        const data = await dataResponse.json();
        const localizedData = data[getLocale()];

        const banner = document.createElement("div");
        banner.innerHTML = html;

        //Icon url injection
        const iconElement = banner.querySelector(".plethore-banner-app-icon");
        iconElement.src = localizedData.iconUrl;

        //Title and subtitle injection
        const titleElement = banner.querySelector(".plethore-banner-title");
        titleElement.innerText = localizedData.title;
        const subtitleElement = banner.querySelector(".plethore-banner-subtitle");
        subtitleElement.innerText = localizedData.subtitle;

        //Buton label and url injection
        const buttonElement = banner.querySelector(".plethore-banner-button");
        buttonElement.innerText = localizedData.buttonLabel;
        buttonElement.href = localizedData.buttonUrl;

        // Close event listener injection - save state in local storage
        banner.querySelector("#plethore-banner-close").addEventListener("click", function () {
            localStorage.setItem(localStorageKey, Date.now());
            const bannerElement = banner.querySelector("#plethore-banner");
            bannerElement.style.display = "none";
        });

        // Render the banner
        document.body.prepend(banner);
    } catch (error) {
        console.error("Plethore Smart Banner error:", error);
    }

    /**
     * Get locale from navigator
     * @returns 'fr' or 'en'
     */
    function getLocale() {
        const locale = navigator.language.substring(0, 2);
        const supportedLocales = ["fr", "en"];
        return supportedLocales.includes(locale) ? locale : "en";
    }
});
