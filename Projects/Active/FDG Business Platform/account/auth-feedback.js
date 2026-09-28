// Map provider codes, never raw messages (which can contain account details).
export function authLinkFeedback(href) {
  const url = new URL(href);
  const fragment = new URLSearchParams(url.hash.slice(1));
  const sources = [url.searchParams, fragment];
  if (!sources.some(params => params.has('error') || params.has('error_code'))) return null;
  const expired = sources.some(params => params.get('error_code') === 'otp_expired');
  for (const params of sources) {
    for (const key of ['error', 'error_code', 'error_description']) params.delete(key);
  }
  url.hash = fragment.toString();
  return {
    message: expired
      ? 'This email link is invalid or has expired. Request a fresh confirmation or password recovery email, then open it in the browser where you requested it.'
      : 'This email link could not be verified. Request a new link and open it in the browser where you requested it. If this continues, contact FDG.',
    cleanUrl: url.href
  };
}

export function authErrorMessage(error, action = 'signup') {
  if (error?.code === 'over_email_send_rate_limit') return 'Email sending is temporarily limited. Wait before trying again; repeated attempts will not help. If this continues, FDG needs to configure its email service.';
  if (error?.code === 'over_request_rate_limit' || error?.status === 429) return 'Too many requests. Please wait before trying again.';
  if (error?.code === 'email_address_not_authorized') return 'Confirmation and recovery emails are not yet available for this address. FDG must connect its email-sending service before you can continue.';
  if (error?.code === 'weak_password') return 'Choose a stronger password with at least 12 characters. Avoid common or reused passwords.';
  if (error?.code === 'email_address_invalid' || error?.code === 'validation_failed') return 'Check that your email address and password meet the form requirements.';
  if (error?.code === 'signup_disabled') return 'New account registration is currently unavailable. Please contact FDG.';
  if (error?.name === 'AuthRetryableFetchError') return 'Could not reach the account service. Check your connection and try again.';
  return action === 'recovery'
    ? 'Recovery email could not be sent. Try later or contact FDG to check email delivery.'
    : 'Account creation could not be completed. Try again later or contact FDG. If you already registered, try signing in or recovering your password.';
}

export function bindPasswordVisibility(root) {
  const buttons = [...root.querySelectorAll('[data-password-toggle]')];
  function setVisibility(button, visible) {
    const input = root.querySelector(`#${button.getAttribute('aria-controls')}`);
    if (!input) return;
    input.type = visible ? 'text' : 'password';
    button.textContent = visible ? 'Hide password' : 'Show password';
    button.setAttribute('aria-pressed', String(visible));
  }
  for (const button of buttons) {
    setVisibility(button, false);
    button.addEventListener('click', () => setVisibility(button, button.getAttribute('aria-pressed') !== 'true'));
  }
  const hide = () => buttons.forEach(button => setVisibility(button, false));
  root.addEventListener('submit', hide);
  root.addEventListener('reset', hide);
  return hide;
}
