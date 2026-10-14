// Future analytics adapters subscribe here after obtaining any required consent.
// No external tracker or Meta Pixel is loaded by this project.
export function trackContact(method) {
  window.dispatchEvent(new CustomEvent('nox:contact', {
    detail: { method, pathname: window.location.pathname },
  }));
}
