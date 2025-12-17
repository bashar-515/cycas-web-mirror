import { UserManager } from 'oidc-client-ts';

import type { OidcClientSettings } from 'oidc-client-ts';

const config: OidcClientSettings = {
  authority: import.meta.env.VITE_AUTHORITY,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_REDIRECT_URI,
  post_logout_redirect_uri: import.meta.env.POST_LOGOUT_REDIRECT_URI,
  response_type: 'code',
  scope: 'openid profile email',
  // code_challenge_method: "S256",
};

document.addEventListener('DOMContentLoaded', async () => {
  const userManager = new UserManager(config);

  const urlSearchParams = new URLSearchParams(window.location.search);

  const code = urlSearchParams.get('code');
  const state = urlSearchParams.get('state');

  if (code && state) {
    removeQueryStringParametersFromCurrentURL();

    console.log(code);
    console.log(state);
  } else {
    const user = await userManager.getUser();

    if (!user) {
      userManager.signinRedirect();
    } else {
      console.log(user);
    }
  }
});

function removeQueryStringParametersFromCurrentURL() {
  const currentUrl = window.location.href;
  const urlObj = new URL(currentUrl);

  urlObj.search = '';

  window.history.pushState({}, '', urlObj.toString());
}
