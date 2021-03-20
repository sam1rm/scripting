import { LinkedInSelector } from "../enums/LinkedInSelector";
import { state } from "../constants/state";

export function addPeopleFromRecommendedForYouPage() {
  if (!state.isAutoConnectRunning) return;

  const delayBetweenClicks = 2000;
  let alreadyInvited = 0;

  const connectButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>(
      LinkedInSelector.ConnectButtonsFromRecommendedPage
    )
  );

  window.scrollTo(0, document.body.scrollHeight);

  if (connectButtons.length > 0) {
    for (const item of connectButtons) {
      setTimeout(() => {
        if (state.isAutoConnectRunning) {
          item.focus();
          item.click();
          item.disabled = true;
        }
      }, alreadyInvited++ * delayBetweenClicks);
    }
  }

  setTimeout(() => {
    addPeopleFromRecommendedForYouPage();
  }, alreadyInvited * delayBetweenClicks + 1000);
}
