export default function Head() {
  // Create a data URI for the favicon
  const faviconDataURI = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#3f51b5"/>
      <text x="50" y="70" fontFamily="Arial, sans-serif" fontSize="50" fontWeight="bold" fill="white" textAnchor="middle">EK</text>
    </svg>
  `;

  const encodedFavicon = Buffer.from(faviconDataURI).toString("base64");

  return (
    <>
      <link
        rel="icon"
        href={`data:image/svg+xml;base64,${encodedFavicon}`}
        type="image/svg+xml"
      />
      <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
    </>
  );
}
