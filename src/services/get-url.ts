export function getUrl(path: string) {
  const baseURL = process.env.NEXT_PUBLIC_URL || "";
  const pathname = path && path.startsWith("/") ? `${path}` : `/${path}`;

  return `${baseURL}${pathname}`;
}
