// Map provider codes, never raw messages (which can contain account details).
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
