export function redirectBack(session: any) {
  if (window.opener) {
    window.opener.location.href = session.peer.metadata.url;
    window.close();
  }
}
